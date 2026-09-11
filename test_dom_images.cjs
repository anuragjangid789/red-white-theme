const http = require('http');
const { spawn } = require('child_process');

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
  const port = 9338;
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
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise((resolve) => ws.addEventListener('open', resolve));

  let reqId = 1;
  await sendCDP(ws, 'Console.enable', {}, reqId++);
  await sendCDP(ws, 'Runtime.enable', {}, reqId++);

  console.log('Navigating to root page http://localhost:5173/#events ...');
  await sendCDP(ws, 'Page.navigate', { url: 'http://localhost:5173/#events' }, reqId++);
  await new Promise(r => setTimeout(r, 2000));

  for (let i = 0; i < 4; i++) {
    const evalResult = await sendCDP(ws, 'Runtime.evaluate', {
      expression: `
        ({
          title: document.querySelector('h2')?.innerText,
          images: Array.from(document.querySelectorAll('img')).map(img => ({
            src: img.src,
            alt: img.alt,
            complete: img.complete,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            rect: img.getBoundingClientRect(),
            opacity: window.getComputedStyle(img).opacity,
            parentOpacity: window.getComputedStyle(img.parentElement).opacity
          }))
        })
      `,
      returnByValue: true
    }, reqId++);

    console.log(`\n=== SLIDE ${i} ===`);
    console.log(JSON.stringify(evalResult.result.value, null, 2));

    // Click next button
    await sendCDP(ws, 'Runtime.evaluate', {
      expression: `
        const nextBtn = document.querySelector('button[aria-label="Next Event"]');
        if (nextBtn) nextBtn.click();
      `
    }, reqId++);
    await new Promise(r => setTimeout(r, 1000));
  }

  ws.close();
  chrome.kill();
}

run().catch(console.error);
