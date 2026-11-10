import { Liquid } from 'liquidjs';
import MarkdownIt from 'markdown-it';
import YAML from 'yaml';
import { readFile, readdir, mkdir, writeFile, cp } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (name) => readFile(path.join(root, name), 'utf8');
const markdown = new MarkdownIt({ html: true, typographer: false });
function documentParts(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  return { data: match ? YAML.parse(match[1]) : {}, body: match ? text.slice(match[0].length) : text };
}

export async function render(pathname = '/') {
  const site = YAML.parse(await read('_config.yml'));
  site.time = new Date();
  site.github = { url: site.url || '' };
  site.data = {};
  for (const name of await readdir(path.join(root, '_data'))) {
    if (/\.ya?ml$/.test(name)) site.data[name.replace(/\.ya?ml$/, '')] = YAML.parse(await read('_data/' + name));
  }
  const liquid = new Liquid({ root: [path.join(root, '_layouts')], partials: [path.join(root, '_includes')], jekyllInclude: true, strictFilters: true });
  liquid.registerFilter('relative_url', (value) => {
    const text = String(value || '');
    if (/^(https?:|mailto:)/.test(text)) return text;
    return String(site.baseurl || '').replace(/\/$/, '') + '/' + text.replace(/^\//, '');
  });
  liquid.registerFilter('absolute_url', (value) => String(site.url || '').replace(/\/$/, '') + String(site.baseurl || '').replace(/\/$/, '') + '/' + String(value || '').replace(/^\//, ''));
  liquid.registerFilter('markdownify', (value) => markdown.render(String(value || '')));
  const source = documentParts(await read(pathname.startsWith('/en') ? '_pages/about-en.md' : '_pages/about.md'));
  const page = { ...source.data, url: source.data.permalink };
  const body = await liquid.parseAndRender(source.body, { site, page });
  const content = markdown.render(body);
  const layout = documentParts(await read('_layouts/default.html')).body;
  return liquid.parseAndRender(layout, { site, page, layout: { author_profile: true }, content });
}

if (process.argv.includes('--build')) {
  const output = path.join(root, '.preview');
  await mkdir(path.join(output, 'en'), { recursive: true });
  for (const folder of ['assets', 'images']) await cp(path.join(root, folder), path.join(output, folder), { recursive: true });
  for (const [route, destination] of [['/', 'index.html'], ['/en/', 'en/index.html']]) {
    let html = await render(route);
    const prefix = route === '/' ? '' : '../';
    html = html.replaceAll('href="/assets/', 'href="' + prefix + 'assets/').replaceAll('src="/assets/', 'src="' + prefix + 'assets/');
    html = html.replaceAll('href="/images/', 'href="' + prefix + 'images/').replaceAll('src="/images/', 'src="' + prefix + 'images/');
    html = html.replaceAll('href="/en/#', 'href="' + prefix + 'en/index.html#').replaceAll('href="/en/"', 'href="' + prefix + 'en/index.html"');
    html = html.replaceAll('href="/#', 'href="' + prefix + 'index.html#').replaceAll('href="/"', 'href="' + prefix + 'index.html"');
    await writeFile(path.join(output, destination), html, 'utf8');
  }
  console.log('Chinese and English previews generated in .preview/ using the source site layout, stylesheet, fonts and script.');
  console.log('Full Jekyll build is still performed by GitHub Pages.');
} else {
  const types = { '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.pdf': 'application/pdf' };
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://127.0.0.1');
      const pathname = decodeURIComponent(url.pathname);
      if (['/', '/index.html', '/en/', '/en/index.html', '/zh/', '/about/', '/about.html'].includes(pathname)) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
        res.end(await render(pathname)); return;
      }
      if (!/^\/(assets|images|files)\//.test(pathname)) { res.writeHead(404); res.end('Not found'); return; }
      const file = path.resolve(root, '.' + pathname);
      if (!file.startsWith(root + path.sep)) { res.writeHead(403); res.end('Forbidden'); return; }
      const data = await readFile(file);
      res.writeHead(200, { 'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      res.end(data);
    } catch (error) {
      console.error(error.message);
      res.writeHead(error.code === 'ENOENT' ? 404 : 500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(error.code === 'ENOENT' ? 'Not found' : 'Preview render error: ' + error.message);
    }
  });
  const port = Number(process.env.PORT || 4322);
  server.listen(port, '127.0.0.1', () => console.log(`Academic homepage preview: http://127.0.0.1:${port}/`));
  for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
}
