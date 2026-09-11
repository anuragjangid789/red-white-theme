const http = require('http');
const { exec } = require('child_process');
const fs = require('fs');

// We will launch msedge to take a screenshot of preview_corners.html
exec('msedge --headless=new --screenshot="corner_screenshot.png" --window-size=600,900 "http://localhost:5173/preview_corners.html"', (err, stdout, stderr) => {
  if (err) {
    console.error('Screenshot error:', err);
  } else {
    console.log('Screenshot saved to corner_screenshot.png');
  }
});
