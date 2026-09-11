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
  const port = 9365;
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

  await sendCDP(ws, 'Page.navigate', { url: 'http://localhost:5173/#gallery' }, reqId++);
  await new Promise(r => setTimeout(r, 2000));

  const inspect = await sendCDP(ws, 'Runtime.evaluate', {
    expression: `(() => {
      const gallery = document.getElementById('gallery');
      const children = Array.from(gallery.children).map((c, i) => {
        const rect = c.getBoundingClientRect();
        const style = window.getComputedStyle(c);
        return {
          index: i,
          tag: c.tagName,
          className: c.className,
          top: rect.top,
          bottom: rect.bottom,
          height: rect.height,
          position: style.position,
          bottomStyle: style.bottom
        };
      });

      return JSON.stringify({
        galleryRect: gallery.getBoundingClientRect(),
        galleryScrollHeight: gallery.scrollHeight,
        galleryClientHeight: gallery.clientHeight,
        children
      });
    })()`
  }, reqId++);

  console.log('Gallery Children Details:\n', JSON.stringify(JSON.parse(inspect.result.value), null, 2));

  ws.close();
  chrome.kill();
}

run().catch(console.error);
