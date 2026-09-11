const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const tmpProfile = path.join(os.tmpdir(), 'chrome_headless_events_' + Date.now());

// We will launch Chrome to capture the events page
const targetUrl = 'http://localhost:5173/?page=events';
const outFile = path.resolve('preview_events_final.png');

console.log('Capturing events page final...');
try {
  execSync(`"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tmpProfile}" --screenshot="${outFile}" --window-size=1200,900 --virtual-time-budget=4000 "${targetUrl}"`);
  console.log(`Success! File exists: ${fs.existsSync(outFile)}`);
} catch (e) {
  console.error('Error:', e.message);
}
