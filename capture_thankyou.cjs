const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function httpGet(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve(data); }
      });
    }).on('error', reject);
  });
}

function sendCDP(ws, method, params = {}, id = 1) {
  return new Promise((resolve, reject) => {
    const msg = JSON.stringify({ id, method, params });
    const handler = (event) => {
      const resp = JSON.parse(event.data);
      if (resp.id === id) {
        ws.removeEventListener('message', handler);
        if (resp.error) reject(resp.error);
        else resolve(resp.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(msg);
  });
}

async function run() {
  const port = 9348;
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    '--window-size=1280,800',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const targets = await httpGet(`http://127.0.0.1:${port}/json`);
  const pageTarget = targets.find(t => t.type === 'page');
  if (!pageTarget) throw new Error('No page target found');

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise((resolve) => ws.addEventListener('open', resolve));

  let reqId = 1;
  await sendCDP(ws, 'Page.enable', {}, reqId++);

  // 1. Desktop iPhone Mockup View
  console.log('Capturing Desktop Thank You preview...');
  await sendCDP(ws, 'Page.navigate', { url: 'http://localhost:5173/?page=thank-you' }, reqId++);
  await new Promise(r => setTimeout(r, 2000));
  const desktopResult = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' }, reqId++);
  fs.writeFileSync(path.resolve('preview_thankyou.png'), Buffer.from(desktopResult.data, 'base64'));

  // 2. Mobile View
  console.log('Capturing Mobile Thank You preview...');
  await sendCDP(ws, 'Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  }, reqId++);
  await sendCDP(ws, 'Page.navigate', { url: 'http://localhost:5173/?page=thank-you' }, reqId++);
  await new Promise(r => setTimeout(r, 2000));
  const mobileResult = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' }, reqId++);
  fs.writeFileSync(path.resolve('preview_mobile_thankyou.png'), Buffer.from(mobileResult.data, 'base64'));

  ws.close();
  chrome.kill();
  console.log('Thank You screenshots saved successfully!');
}

run().catch(console.error);
