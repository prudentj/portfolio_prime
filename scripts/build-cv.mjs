// Builds public/Jacob-Prudent-CV.pdf from the site's print stylesheet using headless Chrome.
// The ?cvdoc=1 render hides the relocation line and shows "Phone available on request".
// Usage: npm run cv   (set CHROME=/path/to/chrome if it isn't in the default macOS location)
import { createServer } from 'node:http';
import { readFile, copyFile, stat } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { join, extname, resolve } from 'node:path';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';

const root = resolve('build');
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.pdf': 'application/pdf' };
const server = createServer(async (req, res) => {
  let p = join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  try { if ((await stat(p)).isDirectory()) p = join(p, 'index.html'); res.writeHead(200, { 'content-type': types[extname(p)] || 'application/octet-stream' }); res.end(await readFile(p)); }
  catch { res.writeHead(404); res.end(); }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const url = `http://127.0.0.1:${server.address().port}/?cvdoc=1&cv=expanded`;
const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const out = resolve('public/Jacob-Prudent-CV.pdf');
const profile = mkdtempSync(join(tmpdir(), 'cv-chrome-')); // separate profile so a running Chrome can't block it
try {
  // Async on purpose: a sync spawn would block this process's own static server.
  await promisify(execFile)(chrome, ['--headless=new', '--disable-gpu', `--user-data-dir=${profile}`, '--no-first-run', '--no-default-browser-check', '--no-pdf-header-footer', '--virtual-time-budget=6000', `--print-to-pdf=${out}`, url], { timeout: 60000 });
} finally { server.close(); rmSync(profile, { recursive: true, force: true }); }
await copyFile(out, resolve('build/Jacob-Prudent-CV.pdf'));
const pages = ((await readFile(out, 'latin1')).match(/\/Type\s*\/Page[^s]/g) || []).length;
console.log(`Wrote ${out} (${pages} pages)`);
if (pages !== 2) { console.error('Expected 2 pages: tighten src/styles/print.css'); process.exitCode = 1; }
