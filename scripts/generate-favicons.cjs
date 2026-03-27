const fs = require('fs');
const path = require('path');
const src = path.join(__dirname, '..', 'src', 'assets', 'wolf-symbol.png');
const outDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(src)) {
  console.error('Source image not found:', src);
  process.exit(2);
}
const buf = fs.readFileSync(src);
const b64 = buf.toString('base64');
const targets = ['favicon.png', 'favicon-32.png', 'favicon-16.png'];
for (const t of targets) {
  fs.writeFileSync(path.join(outDir, t), buf);
  console.log('Wrote', t);
}
const svg = `<?xml version="1.0" encoding="utf-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">\n  <image href="data:image/png;base64,${b64}" width="64" height="64" />\n</svg>\n`;
fs.writeFileSync(path.join(outDir, 'favicon.svg'), svg);
console.log('Wrote favicon.svg (embeds PNG as base64)');
console.log('Done');
