const sharp = require('sharp');
const fs = require('fs');

async function compositeWindow() {
  const windowMeta = await sharp('public/assets/venue_window_clean.png').metadata();
  const W = windowMeta.width; // 326
  const H = windowMeta.height; // 586

  // Inner aperture dimensions:
  // x: 74, y: 97, width: 178, height: 344
  const innerW = 178;
  const innerH = 344;
  const innerX = 74;
  const innerY = 97;
  const archRadius = innerW / 2; // 89
  const archCenterY = innerY + archRadius; // 186

  // Create an SVG mask for the window aperture (arched top, rectangular bottom)
  const maskSvg = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <path id="windowOpening" d="
          M ${innerX} ${archCenterY}
          A ${archRadius} ${archRadius} 0 0 1 ${innerX + innerW} ${archCenterY}
          L ${innerX + innerW} ${innerY + innerH}
          L ${innerX} ${innerY + innerH}
          Z
        " fill="white" />
      </defs>
      <use href="#windowOpening" />
    </svg>
  `);

  // Resize the palace image to cover the window aperture with slight overflow
  const palaceResized = await sharp('public/assets/venue_palace.jpg')
    .resize(innerW + 30, innerH + 30, { fit: 'cover', position: 'center' })
    .toBuffer();

  // Create a canvas with the palace image positioned
  const palacePositioned = await sharp({
    create: {
      width: W,
      height: H,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([
    {
      input: palaceResized,
      left: innerX - 15,
      top: innerY - 5
    }
  ])
  .png()
  .toBuffer();

  // Apply SVG mask
  const maskedPalace = await sharp(palacePositioned)
    .composite([
      {
        input: maskSvg,
        blend: 'dest-in'
      }
    ])
    .png()
    .toBuffer();

  // Composite the clean window frame on top of the masked palace
  await sharp(maskedPalace)
    .composite([
      {
        input: 'public/assets/venue_window_clean.png',
        blend: 'over'
      }
    ])
    .png()
    .toFile('public/assets/venue_window_framed.png');

  console.log('Successfully created public/assets/venue_window_framed.png!');
}

compositeWindow().catch(console.error);
