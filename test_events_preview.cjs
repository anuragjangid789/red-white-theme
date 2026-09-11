const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outFile = path.resolve('preview_events_mayra.png');
const tmpProfile = path.join(os.tmpdir(), 'chrome_headless_profile');

console.log('Capturing events page...');
try {
  execSync(`"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tmpProfile}" --screenshot="${outFile}" --window-size=1200,900 --virtual-time-budget=3500 "http://localhost:5173/?page=events"`);
  console.log(`Success! File exists: ${fs.existsSync(outFile)}`);
} catch (e) {
  console.error('Error:', e.message);
}
