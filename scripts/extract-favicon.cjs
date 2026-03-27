const fs = require('fs');
const path = require('path');
const svgPath = path.join(__dirname, '..', 'public', 'favicon-v2.svg');
if (!fs.existsSync(svgPath)) {
  console.error('SVG not found:', svgPath);
  process.exit(2);
}
const s = fs.readFileSync(svgPath, 'utf8');
const m = s.match(/data:image\/png;base64,([^\"]+)/);
if (!m) {
  console.error('No base64 PNG found in', svgPath);
  process.exit(3);
}
const b = Buffer.from(m[1], 'base64');
const out = path.join(__dirname, '..', 'public', 'favicon.png');
fs.writeFileSync(out, b);
console.log('Wrote', out, b.length, 'bytes');
