const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const events = ['mayra', 'haldi', 'sangeet', 'wedding'];

for (const ev of events) {
  const tmpProfile = path.join(os.tmpdir(), 'chrome_headless_' + ev + '_' + Date.now());
  const targetUrl = `http://localhost:5174/?page=events&event=${ev}`;
  const outFile = path.resolve(`preview_event_${ev}.png`);
  console.log(`Capturing ${ev} -> ${outFile}`);
  try {
    execSync(`"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tmpProfile}" --screenshot="${outFile}" --window-size=1200,900 --virtual-time-budget=3500 "${targetUrl}"`);
    console.log(`Done ${ev}: ${fs.existsSync(outFile)}`);
  } catch (e) {
    console.error(`Error on ${ev}:`, e.message);
  }
}
