const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const events = ['mayra', 'haldi', 'sangeet', 'wedding'];

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
  const port = 9336;
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    '--window-size=1200,900',
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

  for (const ev of events) {
    const targetUrl = `http://localhost:5173/?page=events&event=${ev}`;
    const outFile = path.resolve(`preview_event_${ev}.png`);
    console.log(`Navigating to ${ev}...`);
    await sendCDP(ws, 'Page.navigate', { url: targetUrl }, reqId++);
    
    // Wait for full React render and Framer Motion staggered animations to settle
    await new Promise(r => setTimeout(r, 1800));

    const result = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' }, reqId++);
    fs.writeFileSync(outFile, Buffer.from(result.data, 'base64'));
    console.log(`Saved settled screenshot: ${outFile}`);
  }

  ws.close();
  chrome.kill();
  console.log('All 4 event screenshots successfully saved!');
}

run().catch(console.error);
