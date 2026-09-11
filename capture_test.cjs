const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const events = ['mayra', 'haldi', 'sangeet', 'wedding'];

async function capture() {
  const port = 9222;
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    '--window-size=1200,900',
  ]);

  await new Promise(r => setTimeout(r, 1200));

  // Helper for CDP WebSocket
  for (const ev of events) {
    const url = `http://localhost:5174/?page=events&event=${ev}`;
    const outFile = path.resolve(`preview_event_${ev}.png`);

    // Create new tab via http://localhost:9222/json/new?url
    const createTab = () => new Promise((resolve, reject) => {
      http.get(`http://localhost:${port}/json/new?${encodeURIComponent(url)}`, res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(JSON.parse(data)));
      }).on('error', reject);
    });

    const tab = await createTab();
    const wsUrl = tab.webSocketDebuggerUrl;

    // Use ws to talk CDP
    const WebSocket = require('ws'); // check if ws is available or native
  }
}
