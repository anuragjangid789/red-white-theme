const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'public', 'assets');
const images = [
  'mayra png.webp',
  'haldi png.webp',
  'sangeet png.webp',
  'wedding png.webp',
  'wedding png 2.webp',
  'red flower.webp',
  'pearl png.webp',
];

async function processAll() {
  for (const imgName of images) {
    const inputPath = path.join(assetsDir, imgName);
    const outName = imgName.replace('.webp', '_clean.png').replace(' png', '');
    const outputPath = path.join(assetsDir, outName);

    console.log(`Processing: ${imgName} -> ${outName}`);

    const image = sharp(inputPath);
    const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;

    for (let i = 0; i < data.length; i += channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      if (a === 0) continue;

      const avg = (r + g + b) / 3;
      const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));

      // Check if it's near-white / background
      if (avg > 240 && maxDiff < 14) {
        data[i + 3] = 0; // completely transparent
      } else if (avg > 224 && maxDiff < 18) {
        const factor = (avg - 224) / 16;
        data[i + 3] = Math.floor(a * (1 - factor));
      }
    }

    await sharp(data, {
      raw: {
        width,
        height,
        channels,
      },
    })
      .png({ quality: 100, compressionLevel: 8 })
      .toFile(outputPath);

    console.log(`✓ Generated: ${outName}`);
  }
}

processAll()
  .then(() => console.log('ALL DONE!'))
  .catch((err) => console.error(err));
