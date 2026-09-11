const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');
const os = require('os');

const imagesToProcess = [
  'mayra png.webp',
  'haldi png.webp',
  'sangeet png.webp',
  'wedding png.webp',
  'wedding png 2.webp',
  'red flower.webp',
  'pearl png.webp',
];

const html = `<!DOCTYPE html>
<html>
<body>
<h1>Processing...</h1>
<script>
async function run() {
  const list = ${JSON.stringify(imagesToProcess)};
  for (const name of list) {
    try {
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const d = imgData.data;

          for (let i = 0; i < d.length; i += 4) {
            const r = d[i], g = d[i+1], b = d[i+2];
            const avg = (r + g + b) / 3;
            const diff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
            
            // Clean white / light-grey removal with feathering
            if (avg > 242 && diff < 12) {
              d[i+3] = 0;
            } else if (avg > 226 && diff < 16) {
              const factor = (avg - 226) / 16;
              d[i+3] = Math.floor(d[i+3] * (1 - factor));
            }
          }

          ctx.putImageData(imgData, 0, 0);
          const outName = name.replace('.webp', '_clean.png').replace(' png', '');
          const dataUrl = canvas.toDataURL('image/png');

          fetch('/save', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name: outName, data: dataUrl })
          }).then(resolve).catch(reject);
        };
        img.onerror = reject;
        img.src = '/asset/' + encodeURIComponent(name);
      });
    } catch(err) {
      console.error('Err on', name, err);
    }
  }
  await fetch('/done', { method: 'POST' });
}
run();
</script>
</body>
</html>`;

let completed = 0;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else if (req.url.startsWith('/asset/')) {
    const raw = decodeURIComponent(req.url.replace('/asset/', ''));
    const p = path.join(__dirname, 'public', 'assets', raw);
    if (fs.existsSync(p)) {
      res.writeHead(200, { 'Content-Type': 'image/webp' });
      res.end(fs.readFileSync(p));
    } else {
      res.writeHead(404);
      res.end();
    }
  } else if (req.url === '/save' && req.method === 'POST') {
    let b = '';
    req.on('data', c => b += c);
    req.on('end', () => {
      const { name, data } = JSON.parse(b);
      const b64 = data.replace(/^data:image\/png;base64,/, '');
      const out = path.join(__dirname, 'public', 'assets', name);
      fs.writeFileSync(out, b64, 'base64');
      completed++;
      console.log(`[${completed}/${imagesToProcess.length}] Saved transparent asset: ${name}`);
      res.end('ok');
    });
  } else if (req.url === '/done' && req.method === 'POST') {
    console.log('SUCCESS: All transparent PNGs created!');
    res.end('ok');
    setTimeout(() => {
      server.close();
      process.exit(0);
    }, 500);
  }
});

server.listen(8898, () => {
  console.log('Server running on 8898, starting Chrome...');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpProfile = path.join(os.tmpdir(), 'chrome_headless_proc_' + Date.now());
  try {
    execSync(`"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tmpProfile}" --virtual-time-budget=6000 "http://localhost:8898/"`);
  } catch (e) {
    console.error('Proc error:', e.message);
  }
});
