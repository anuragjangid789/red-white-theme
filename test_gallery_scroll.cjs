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
  const port = 9360;
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

  console.log('Navigating to gallery on desktop mockup...');
  await sendCDP(ws, 'Page.navigate', { url: 'http://localhost:5173/#gallery' }, reqId++);
  await new Promise(r => setTimeout(r, 2000));

  // Measure initial dimensions and attempt scroll
  const scrollTest = await sendCDP(ws, 'Runtime.evaluate', {
    expression: `(() => {
      const scrollEl = document.querySelector('.inner-app-scroll');
      const gallery = document.getElementById('gallery');
      
      const before = {
        scrollEl: scrollEl ? { scrollHeight: scrollEl.scrollHeight, clientHeight: scrollEl.clientHeight, scrollTop: scrollEl.scrollTop, overflowY: window.getComputedStyle(scrollEl).overflowY } : null,
        gallery: gallery ? { scrollHeight: gallery.scrollHeight, clientHeight: gallery.clientHeight, scrollTop: gallery.scrollTop, overflowY: window.getComputedStyle(gallery).overflowY } : null,
      };

      if (scrollEl) scrollEl.scrollTop = 500;
      if (gallery) gallery.scrollTop = 500;

      const after = {
        scrollElScrollTop: scrollEl ? scrollEl.scrollTop : 0,
        galleryScrollTop: gallery ? gallery.scrollTop : 0
      };

      return JSON.stringify({ before, after });
    })()`
  }, reqId++);

  console.log('Desktop Gallery Scroll Measurements:', scrollTest.result.value);

  const desktopScreenshot = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' }, reqId++);
  fs.writeFileSync(path.resolve('preview_gallery_fixed.png'), Buffer.from(desktopScreenshot.data, 'base64'));
  console.log('Saved preview_gallery_fixed.png');

  // Now Mobile View
  console.log('Testing Mobile view 390x844...');
  await sendCDP(ws, 'Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  }, reqId++);
  await sendCDP(ws, 'Page.navigate', { url: 'http://localhost:5173/#gallery' }, reqId++);
  await new Promise(r => setTimeout(r, 2000));

  const mobileScrollTest = await sendCDP(ws, 'Runtime.evaluate', {
    expression: `(() => {
      const scrollEl = document.querySelector('.inner-app-scroll');
      const gallery = document.getElementById('gallery');

      const before = {
        scrollEl: scrollEl ? { scrollHeight: scrollEl.scrollHeight, clientHeight: scrollEl.clientHeight, scrollTop: scrollEl.scrollTop, overflowY: window.getComputedStyle(scrollEl).overflowY } : null,
        gallery: gallery ? { scrollHeight: gallery.scrollHeight, clientHeight: gallery.clientHeight, scrollTop: gallery.scrollTop, overflowY: window.getComputedStyle(gallery).overflowY } : null,
      };

      if (scrollEl) scrollEl.scrollTop = 500;
      if (gallery) gallery.scrollTop = 500;

      const after = {
        scrollElScrollTop: scrollEl ? scrollEl.scrollTop : 0,
        galleryScrollTop: gallery ? gallery.scrollTop : 0
      };

      return JSON.stringify({ before, after });
    })()`
  }, reqId++);

  console.log('Mobile Gallery Scroll Measurements:', mobileScrollTest.result.value);

  const mobileScreenshot = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' }, reqId++);
  fs.writeFileSync(path.resolve('preview_mobile_gallery_fixed.png'), Buffer.from(mobileScreenshot.data, 'base64'));
  console.log('Saved preview_mobile_gallery_fixed.png');

  ws.close();
  chrome.kill();
}

run().catch(console.error);
