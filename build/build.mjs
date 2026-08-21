import { readFileSync, writeFileSync, readdirSync, statSync, copyFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { join, relative, dirname, basename, resolve, extname } from 'node:path';
import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';

const SRC = resolve('..');            // learning/ (site root)
const OUT = resolve('../dist');       // learning/dist
const BUILD = resolve('.');

const md = MarkdownIt({ html: true, linkify: true, breaks: false })
  .use(anchor, { permalink: false, tabIndex: false });

// ---------- collect markdown pages ----------
function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    if (e === 'assets' || e === 'build' || e === 'dist' || e === '.git') continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (e.endsWith('.md') && e !== '_sidebar.md') out.push(p);
  }
  return out;
}
const pages = walk(SRC); // absolute paths

// page rel path (from dist root) -> html
function htmlRel(absMd) {
  const rel = relative(SRC, absMd).replace(/\\/g, '/');
  if (rel === 'README.md') return 'index.html';
  return rel.replace(/\.md$/, '.html');
}
const pageMap = new Map(); // htmlRel -> absMd
for (const p of pages) pageMap.set(htmlRel(p), p);

// ---------- sidebar nav from _sidebar.md ----------
const sidebarSrc = readFileSync(join(SRC, '_sidebar.md'), 'utf8');
const navItems = [];
for (const line of sidebarSrc.split(/\r?\n/)) {
  const m = line.match(/^\*\s+\[([^\]]+)\]\(([^)]+)\)\s*$/);
  if (!m) continue;
  const label = m[1].trim();
  let href = m[2].trim();
  let targetHtml;
  if (href === '/' || href === '') targetHtml = 'index.html';
  else targetHtml = href.replace(/^\//, '').replace(/\.md$/, '.html');
  navItems.push({ label, href, targetHtml });
}

// group nav into chapters for sidebar rendering
function navGroups() {
  const groups = [];  // {key,title,target,items:[{label,target}]}
  let cur = null;
  const refItems = [];
  for (const it of navItems) {
    const leaf = it.label.match(/^(\d{2}-\d{2})\s+(.*)$/);
    const chap = it.label.match(/^(\d{2})\s+(.*)$/);
    if (it.label === '首页') {
      groups.unshift({ key: 'home', title: '首页', target: 'index.html', items: [] });
    } else if (chap) {
      cur = { key: chap[1], title: chap[2], target: it.targetHtml, items: [] };
      groups.push(cur);
    } else if (leaf && cur && leaf[1].slice(0, 2) === cur.key) {
      cur.items.push({ label: leaf[0], target: it.targetHtml });
    } else {
      refItems.push({ label: it.label, target: it.targetHtml });
    }
  }
  if (refItems.length) groups.push({ key: 'ref', title: '参考资料', target: null, items: refItems });
  return groups;
}
const GROUPS = navGroups();

function relFrom(htmlRel, targetHtml) {
  const fromParts = (htmlRel === 'index.html' ? '' : dirname(htmlRel)).split('/').filter(Boolean);
  const toParts = targetHtml.split('/').filter(Boolean);
  let i = 0;
  while (i < fromParts.length && i < toParts.length && fromParts[i] === toParts[i]) i++;
  const up = fromParts.length - i;
  let r = up ? '../'.repeat(up) : '';
  r += toParts.slice(i).join('/');
  return r || targetHtml;
}
function assetsRel(htmlRel) {
  const d = dirname(htmlRel);
  const depth = d === '.' || d === '' ? 0 : d.split('/').length;
  return depth === 0 ? 'assets' : '../'.repeat(depth) + 'assets';
}

function sidebarHtml(htmlRel) {
  let html = '<ul class="sidebar-nav">';
  for (const g of GROUPS) {
    html += '<li class="dsh-chapter-li">';
    if (g.target) {
      html += '<a class="dsh-nav-chapter" href="' + relFrom(htmlRel, g.target) + '">' + esc(g.title) + '</a>';
      if (g.items.length) {
        html += '<ul class="dsh-tree">';
        for (const it of g.items) html += '<li><a class="dsh-nav-leaf" href="' + relFrom(htmlRel, it.target) + '">' + esc(it.label) + '</a></li>';
        html += '</ul>';
      }
    } else {
      html += '<span class="dsh-nav-chapter">' + esc(g.title) + '</span>';
      html += '<ul class="dsh-tree">';
      for (const it of g.items) html += '<li><a class="dsh-nav-leaf" href="' + relFrom(htmlRel, it.target) + '">' + esc(it.label) + '</a></li>';
      html += '</ul>';
    }
    html += '</li>';
  }
  html += '</ul>';
  return html;
}
function esc(s) {
  return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

// ---------- content link rewrite: .md -> .html ----------
function rewriteLinks(html) {
  return html.replace(/(href=")([^"]*?)(")/g, (full, pre, url, post) => {
    const hashIdx = url.indexOf('#');
    const pathPart = hashIdx >= 0 ? url.slice(0, hashIdx) : url;
    const hash = hashIdx >= 0 ? url.slice(hashIdx) : '';
    if (/\.md($|\?)/.test(pathPart) && !/^[a-z]+:|\/\/|^#/.test(pathPart)) {
      return pre + pathPart.replace(/\.md($|\?)/, '.html$1') + hash + post;
    }
    return full;
  });
}
function rewriteImg(html, assetsPrefix) {
  // images: keep as-is (structure mirrored). Only fix any absolute /assets -> relative
  return html.replace(/(src=")\/(assets\/[^"]*)(")/g, m => m.replace(/^\//, ''));
}

// ---------- build page ----------
function buildPage(htmlRel) {
  const absMd = pageMap.get(htmlRel);
  const raw = readFileSync(absMd, 'utf8');
  let body = md.render(raw);
  body = rewriteLinks(body);
  const assets = assetsRel(htmlRel);
  const title = (body.match(/<h1[^>]*>([^<]*)<\/h1>/) || [])[1] || basename(htmlRel, '.html');
  return {
    htmlRel,
    title: (title || 'Agent 知识图谱').trim(),
    html: pageHtml(htmlRel, assets, title, body)
  };
}

function pageHtml(htmlRel, assets, title, body) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)} · Agent 知识图谱</title>
<link rel="stylesheet" href="${assets}/styles.css">
<link rel="stylesheet" href="${assets}/katex/katex.min.css">
<link rel="stylesheet" href="${assets}/static.css">
</head>
<body>
<nav class="sidebar" aria-label="章节导航">
  <h1 class="app-name"><a href="${relFrom(htmlRel,'index.html')}">Agent 知识图谱</a></h1>
  ${sidebarHtml(htmlRel)}
</nav>
<section class="content">
  <main class="markdown-section">${body}</main>
</section>
<script src="${assets}/katex/katex.min.js"></script>
<script src="${assets}/katex/auto-render.min.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function () {
    if (window.renderMathInElement) {
      try {
        renderMathInElement(document.querySelector('.markdown-section'), {
          throwOnError: false, delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false}
          ]
        });
      } catch (e) {}
    }
  });
</script>
</body>
</html>`;
}

// ---------- copy static assets ----------
function copyDir(from, to) {
  for (const e of readdirSync(from)) {
    const s = join(from, e);
    const d = join(to, e);
    if (statSync(s).isDirectory()) { mkdirSync(d, { recursive: true }); copyDir(s, d); }
    else { mkdirSync(dirname(d), { recursive: true }); copyFileSync(s, d); }
  }
}

// ---------- run ----------
if (existsSync(OUT)) rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

// copy needed assets
copyDir(join(SRC, 'assets', 'figures'), join(OUT, 'assets', 'figures'));
copyDir(join(SRC, 'assets', 'katex'), join(OUT, 'assets', 'katex'));
mkdirSync(join(OUT, 'assets'), { recursive: true });
copyFileSync(join(SRC, 'assets', 'styles.css'), join(OUT, 'assets', 'styles.css'));


copyFileSync(join(BUILD, 'static.css'), join(OUT, 'assets', 'static.css'));

// build pages
const results = [];
for (const htmlRel of pageMap.keys()) {
  results.push(buildPage(htmlRel));
}
let count = 0;
for (const r of results) {
  const outPath = join(OUT, r.htmlRel);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, r.html);
  count++;
}
console.log('Built ' + count + ' pages into ' + OUT);
console.log('Nested dist/assets relative linking enabled.');




