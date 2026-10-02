# Illcon prototype

Turns a filled Fluent icon into a dotted (or dithered) illustration on a 24-cell grid.

## Files
- `src/rasterize.ts` – the algorithm (sampling + path building), framework-free
- `src/Illcon.tsx` – the React component
- `src/App.tsx` – the playground page
- `build.mjs` – inlines the bundle into a single `dist/index.html`
- `serve.mjs` – dev server used by `npm start`

## Run
```
npm install
npm start
```
Serves the playground at http://localhost:3000 and rebuilds when source changes. Refresh the browser to see updates.

`npm run build` writes a single `dist/index.html` you can open directly.

To use the component in another app, copy `src/Illcon.tsx` and `src/rasterize.ts`.
