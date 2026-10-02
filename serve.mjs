import * as esbuild from 'esbuild';
import fs from 'node:fs';
import http from 'node:http';
import { writeDist } from './build.mjs';

const port = Number(process.env.PORT) || 3000;

let notifyBuilt;
const firstBuild = new Promise((resolve) => {
  notifyBuilt = resolve;
});

const ctx = await esbuild.context({
  entryPoints: ['src/App.tsx'],
  bundle: true,
  format: 'iife',
  target: 'es2020',
  define: { 'process.env.NODE_ENV': '"development"' },
  outfile: 'out.js',
  plugins: [{
    name: 'write-html',
    setup(build) {
      build.onEnd((result) => {
        if (result.errors.length === 0) {
          const bytes = writeDist(fs.readFileSync('out.js', 'utf8'));
          console.log(`dist/index.html (${bytes} bytes)`);
        }
        notifyBuilt();
      });
    },
  }],
});

await ctx.watch();
await firstBuild;

const server = http.createServer((req, res) => {
  const file = 'dist/index.html';
  if (!fs.existsSync(file)) {
    res.writeHead(503, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Building…');
    return;
  }
  res.writeHead(200, {
    'content-type': 'text/html; charset=utf-8',
    'cache-control': 'no-store',
  });
  fs.createReadStream(file).pipe(res);
});

server.on('error', (err) => {
  console.error(err.message);
  process.exit(1);
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

process.on('SIGINT', async () => {
  server.close();
  await ctx.dispose();
  process.exit(0);
});
