import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const src = path.join(__dirname, '..', 'src', 'assets', 'wolf-symbol.png');
const outPng = path.join(__dirname, '..', 'public', 'favicon.png');
const outSvg = path.join(__dirname, '..', 'public', 'favicon.svg');

if (!fs.existsSync(src)) {
  console.error('Source image not found:', src);
  process.exit(1);
}

const buf = fs.readFileSync(src);
fs.mkdirSync(path.join(__dirname, '..', 'public'), { recursive: true });
fs.writeFileSync(outPng, buf);
const b64 = buf.toString('base64');
const svg = `<?xml version="1.0" encoding="utf-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">\n  <image href="data:image/png;base64,${b64}" width="64" height="64"/>\n</svg>`;
fs.writeFileSync(outSvg, svg, 'utf8');
console.log('Wrote', outPng, outSvg);
