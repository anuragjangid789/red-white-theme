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
  const port = 9355;
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    '--window-size=1280,900',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const targets = await httpGet(`http://127.0.0.1:${port}/json`);
  const pageTarget = targets.find(t => t.type === 'page');
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise((resolve) => ws.addEventListener('open', resolve));

  let reqId = 1;
  await sendCDP(ws, 'Page.enable', {}, reqId++);
  await sendCDP(ws, 'Runtime.enable', {}, reqId++);

  console.log('Navigating to home...');
  await sendCDP(ws, 'Page.navigate', { url: 'http://localhost:5173/?page=home' }, reqId++);
  await new Promise(r => setTimeout(r, 2000));

  // Scroll to bottom of .inner-app-scroll
  const scrollRes = await sendCDP(ws, 'Runtime.evaluate', {
    expression: `(() => {
      const scrollEl = document.querySelector('.inner-app-scroll');
      const homeScroll = document.querySelector('.home-scroll-container');
      const thankYou = document.getElementById('thank-you');
      
      const beforeScroll = {
        scrollEl: scrollEl ? { scrollHeight: scrollEl.scrollHeight, clientHeight: scrollEl.clientHeight, scrollTop: scrollEl.scrollTop } : null,
        homeScroll: homeScroll ? { scrollHeight: homeScroll.scrollHeight, clientHeight: homeScroll.clientHeight, offsetHeight: homeScroll.offsetHeight } : null,
        thankYou: thankYou ? { scrollHeight: thankYou.scrollHeight, clientHeight: thankYou.clientHeight, offsetTop: thankYou.offsetTop } : null,
      };

      if (scrollEl) {
        scrollEl.scrollTop = scrollEl.scrollHeight;
      }

      return JSON.stringify({
        beforeScroll,
        afterScrollTop: scrollEl ? scrollEl.scrollTop : 0
      });
    })()`
  }, reqId++);

  console.log('Scroll measurements:', scrollRes.result.value);

  await new Promise(r => setTimeout(r, 1500));

  const screenshot = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' }, reqId++);
  fs.writeFileSync(path.resolve('preview_home_scrolled_thankyou.png'), Buffer.from(screenshot.data, 'base64'));
  console.log('Saved preview_home_scrolled_thankyou.png');

  // Now test navigating to #thank-you directly
  console.log('Navigating to dedicated thank you...');
  await sendCDP(ws, 'Page.navigate', { url: 'http://localhost:5173/?page=thank-you' }, reqId++);
  await new Promise(r => setTimeout(r, 2000));
  const thankYouDirectRes = await sendCDP(ws, 'Runtime.evaluate', {
    expression: `(() => {
      const scrollEl = document.querySelector('.inner-app-scroll');
      const thankYou = document.getElementById('thank-you');
      if (scrollEl) {
        scrollEl.scrollTop = scrollEl.scrollHeight;
      }
      return JSON.stringify({
        scrollEl: scrollEl ? { scrollHeight: scrollEl.scrollHeight, clientHeight: scrollEl.clientHeight, scrollTop: scrollEl.scrollTop } : null,
        thankYou: thankYou ? { scrollHeight: thankYou.scrollHeight, clientHeight: thankYou.clientHeight, offsetTop: thankYou.offsetTop } : null,
      });
    })()`
  }, reqId++);
  console.log('Dedicated Thank You measurements:', thankYouDirectRes.result.value);

  const screenshot2 = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' }, reqId++);
  fs.writeFileSync(path.resolve('preview_thankyou_direct_scrolled.png'), Buffer.from(screenshot2.data, 'base64'));
  console.log('Saved preview_thankyou_direct_scrolled.png');

  ws.close();
  chrome.kill();
}

run().catch(console.error);
