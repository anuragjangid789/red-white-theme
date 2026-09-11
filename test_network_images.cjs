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
  const port = 9339;
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
  await sendCDP(ws, 'Network.enable', {}, reqId++);

  ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    if (data.method === 'Console.messageAdded') {
      console.log('[BROWSER CONSOLE]', data.params.message.text);
    }
    if (data.method === 'Network.responseReceived') {
      console.log('[NETWORK RESPONSE]', data.params.response.status, data.params.response.url);
    }
    if (data.method === 'Network.loadingFailed') {
      console.log('[NETWORK FAILED]', data.params.errorText, data.params.requestId);
    }
  });

  for (const ev of ['mayra', 'haldi', 'sangeet', 'wedding']) {
    console.log(`\n=== INSPECTING ${ev} ===`);
    await sendCDP(ws, 'Page.navigate', { url: `http://localhost:5173/?page=events&event=${ev}` }, reqId++);
    await new Promise(r => setTimeout(r, 1200));

    const evalResult = await sendCDP(ws, 'Runtime.evaluate', {
      expression: `
        Array.from(document.querySelectorAll('img')).map(img => ({
          src: img.src,
          alt: img.alt,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          displayWidth: img.clientWidth,
          displayHeight: img.clientHeight,
          rect: {
            top: img.getBoundingClientRect().top,
            left: img.getBoundingClientRect().left,
            right: img.getBoundingClientRect().right,
            bottom: img.getBoundingClientRect().bottom,
            width: img.getBoundingClientRect().width,
            height: img.getBoundingClientRect().height
          },
          opacity: window.getComputedStyle(img).opacity,
          parentOpacity: window.getComputedStyle(img.parentElement).opacity
        }))
      `,
      returnByValue: true
    }, reqId++);

    console.log('Images:', JSON.stringify(evalResult.result.value, null, 2));
  }

  ws.close();
  chrome.kill();
}

run().catch(console.error);
