import fs from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function renderHtml(js) {
const safe = js.replace(/<\/script/gi,'<\\/script');
return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Illcon prototype</title>
<style>
:root{--page-bg:#fafafa;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--page-bg:#141414}}
:root[data-theme="dark"]{--page-bg:#141414}
:root[data-theme="light"]{--page-bg:#fafafa}
html{scroll-padding-top:env(safe-area-inset-top,0px);height:100%}
*,*::before,*::after{box-sizing:inherit}
body{margin:0;min-height:100%;background:var(--page-bg);font-family:"Segoe UI Variable","Segoe UI",-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue",sans-serif;overflow-x:hidden}
#root{min-height:100%}
img,svg{max-width:100%}
@media (prefers-reduced-motion: reduce){*{transition:none!important;animation:none!important}}
</style>
</head>
<body>
<div id="root"></div>
<script>${safe}</script>
</body>
</html>`;
}

export function writeDist(js) {
  const html = renderHtml(js);
  fs.mkdirSync('dist', { recursive: true });
  fs.writeFileSync('dist/index.html', html);
  return html.length;
}

const invoked = process.argv[1] ? path.resolve(process.argv[1]) : '';
const thisFile = path.resolve(fileURLToPath(import.meta.url));
if (invoked.toLowerCase() === thisFile.toLowerCase()) {
  const js = fs.readFileSync('out.js', 'utf8');
  console.log(writeDist(js));
}
