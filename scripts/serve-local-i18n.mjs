import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join } from 'node:path';

const ROOT = 'dist/HomeworkTutora/browser';
const LOCALES = ['en', 'fr', 'es'];
const PORT = 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
};

async function fileExists(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

createServer(async (req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  let filePath = join(ROOT, urlPath);

  if (!(await fileExists(filePath))) {
    const locale = urlPath.split('/').filter(Boolean)[0];
    if (LOCALES.includes(locale)) {
      filePath = join(ROOT, locale, 'index.html');
    } else if (urlPath === '/' || urlPath === '') {
      filePath = join(ROOT, 'index.html');
    } else {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
  }

  try {
    const data = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(PORT, () => console.log(`Serving ${ROOT} at http://localhost:${PORT}/ (mirrors vercel.json rewrites)`));
