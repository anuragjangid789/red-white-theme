const http = require('http');
const { exec } = require('child_process');
const fs = require('fs');

const testHtml = `<!DOCTYPE html>
<html>
<head><title>Test</title></head>
<body>
<iframe id="app" src="http://localhost:5173/#home" style="width:450px;height:900px;border:none;"></iframe>
<script>
setTimeout(() => {
  const ifr = document.getElementById('app');
  try {
    const doc = ifr.contentDocument || ifr.contentWindow.document;
    const home = doc.getElementById('home');
    if (!home) {
      fetch('http://localhost:8899/results', { method: 'POST', body: JSON.stringify({ error: 'No #home element found' }) });
      return;
    }
    const images = Array.from(home.querySelectorAll('img'));
    const homeRect = home.getBoundingClientRect();
    const data = images.map(img => {
      const r = img.getBoundingClientRect();
      const computed = window.getComputedStyle(img);
      return {
        alt: img.alt,
        src: img.src.split('/').pop(),
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        display: computed.display,
        visibility: computed.visibility,
        opacity: computed.opacity,
        rectRelativeToHome: {
          top: r.top - homeRect.top,
          left: r.left - homeRect.left,
          width: r.width,
          height: r.height,
          bottom: r.bottom - homeRect.top,
          right: r.right - homeRect.left
        },
        rectInViewport: {
          top: r.top,
          left: r.left,
          width: r.width,
          height: r.height
        }
      };
    });
    fetch('http://localhost:8899/results', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ homeSize: { width: homeRect.width, height: homeRect.height }, images: data }, null, 2)
    });
  } catch(err) {
    fetch('http://localhost:8899/results', {
      method: 'POST',
      body: JSON.stringify({ error: err.message })
    });
  }
}, 3500);
</script>
</body>
</html>`;

fs.writeFileSync('public/test_runner.html', testHtml);

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      console.log('RESULTS:');
      console.log(body);
      res.end('ok');
      server.close();
      try { fs.unlinkSync('public/test_runner.html'); } catch(e){}
      try { fs.unlinkSync('test_measure.js'); } catch(e){}
      process.exit(0);
    });
  }
});

server.listen(8899, () => {
  exec('start msedge --headless=new "http://localhost:5173/test_runner.html"');
});
