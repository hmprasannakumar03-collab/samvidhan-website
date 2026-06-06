const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const nextDir = path.join(root, '.next');
const outDir = path.join(root, 'out');

function rmrf(target) {
  if (!fs.existsSync(target)) return;
  const stat = fs.lstatSync(target);
  if (stat.isDirectory()) {
    for (const file of fs.readdirSync(target)) {
      rmrf(path.join(target, file));
    }
    fs.rmdirSync(target);
  } else {
    fs.unlinkSync(target);
  }
}

function copy(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const file of fs.readdirSync(src)) {
      copy(path.join(src, file), path.join(dest, file));
    }
  } else {
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

rmrf(outDir);
fs.mkdirSync(outDir, { recursive: true });

const indexHtml = path.join(nextDir, 'server', 'app', 'index.html');
const notFoundHtml = path.join(nextDir, 'server', 'pages', '404.html');
const nextStatic = path.join(nextDir, 'static');
const publicDir = path.join(root, 'public');

if (!fs.existsSync(indexHtml)) {
  throw new Error('Could not find generated index.html at ' + indexHtml);
}

copy(indexHtml, path.join(outDir, 'index.html'));
if (fs.existsSync(notFoundHtml)) {
  copy(notFoundHtml, path.join(outDir, '404.html'));
}
if (fs.existsSync(nextStatic)) {
  copy(nextStatic, path.join(outDir, '_next', 'static'));
}
if (fs.existsSync(publicDir)) {
  copy(publicDir, outDir);
}

console.log('Static site prepared in out/');
