/* deepseek-harness 学习库互动层：章节进度 + 前置依赖 + 前后导航 + 首页仪表盘 */
(function () {
  'use strict';

  var STORAGE_KEY = 'dsh-learning-progress';

  // 章节元数据：key 唯一、dir 对应目录名、depends 为前置依赖章 key
  var CHAPTERS = [
    { key: '00', title: '学习路线',           dir: '00-curriculum',         icon: '🧭', depends: [] },
    { key: '01', title: '数学基础',           dir: '01-math-foundations',   icon: '01', depends: [] },
    { key: '02', title: '编程基础',           dir: '02-programming-basics', icon: '02', depends: [] },
    { key: '03', title: '机器学习',           dir: '03-machine-learning',   icon: '03', depends: ['01', '02'] },
    { key: '04', title: '深度学习',           dir: '04-deep-learning',      icon: '04', depends: ['03'] },
    { key: '05', title: 'NLP 与 Transformer', dir: '05-nlp-transformers',   icon: '05', depends: ['04', '01'] },
    { key: '06', title: 'LLM 原理',           dir: '06-llm-fundamentals',   icon: '06', depends: ['05'] },
    { key: '07', title: 'LLM 工程',           dir: '07-llm-engineering',    icon: '07', depends: ['06'] },
    { key: '08', title: 'Agent 基础',         dir: '08-agent-foundations',  icon: '08', depends: ['06', '07'] },
    { key: '09', title: 'Agent 架构',         dir: '09-agent-architecture', icon: '09', depends: ['08'] },
    { key: '10', title: '实战 Lab',           dir: '10-practical-lab',      icon: '10', depends: ['09'] },
    { key: '11', title: '安全与治理',         dir: '11-safety-governance',  icon: '11', depends: ['09'] }
  ];
  var BY_KEY = {};
  CHAPTERS.forEach(function (c) { BY_KEY[c.key] = c; });

  // 状态枚举
  var STATUS = { TODO: 'todo', DOING: 'doing', DONE: 'done' };

  // ---------- 状态存取 ----------
  function loadProgress() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }
  function saveProgress(p) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch (e) {}
  }
  function getStatus(key) {
    var p = loadProgress();
    return p[key] && p[key].status ? p[key].status : STATUS.TODO;
  }
  function setStatus(key, status) {
    var p = loadProgress();
    p[key] = { status: status, updated: Date.now() };
    saveProgress(p);
  }

  // ---------- 依赖逻辑 ----------
  function isDone(key) { return getStatus(key) === STATUS.DONE; }
  function chapterReady(c) {
    return c.depends.every(function (k) { return isDone(k); });
  }

  // ---------- 当前章节识别 ----------
  // docsify 路由形如 "/01-math-foundations/01-01-linear-algebra"
  function currentChapter() {
    var path = (location.hash || '').replace(/^#\/?/, '');
    for (var i = 0; i < CHAPTERS.length; i++) {
      var c = CHAPTERS[i];
      if (path === c.dir + '/README' || path.indexOf(c.dir + '/') === 0) {
        return c;
      }
    }
    if (path === '' || path === '/' || path === 'README') {
      return { key: 'home', title: '首页', dir: '', icon: '🏠', depends: [] };
    }
    return null;
  }

  // ---------- 链接工具 ----------
  function chapterHref(c) {
    return '#/' + c.dir + '/README';
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }

  // ---------- 渲染：章节页顶部状态条 ----------
  function renderStatusBar(chapter) {
    var status = getStatus(chapter.key);
    var ready = chapterReady(chapter);
    var html = '';

    if (chapter.icon === '🏠') {
      html = renderHomeDashboard();
      return html;
    }

    html += '<div class="study-status" data-key="' + chapter.key + '">';
    html += '<div class="study-status__meta">';
    html += '<span class="study-status__chip">第 ' + esc(chapter.key) + ' 章 · ' + esc(chapter.title) + '</span>';
    if (chapter.depends.length) {
      var depChips = chapter.depends.map(function (k) {
        var d = BY_KEY[k];
        var done = isDone(k);
        return '<span class="study-dep' + (done ? ' is-done' : '') + '" title="' +
          (done ? '已完成' : '尚未完成') + '">' + esc(d.title) + (done ? ' ✓' : '') + '</span>';
      }).join('');
      var blocked = !ready;
      html += '<div class="study-status__deps' + (blocked ? ' is-blocked' : '') + '"><span class="study-status__deplabel">前置：</span>' +
        depChips + '</div>';
    }
    html += '</div>';
    html += '<div class="study-status__actions">';
    var done = status === STATUS.DONE;
    html += '<button class="study-btn" data-action="doing"' + (done ? ' disabled' : '') + '>学习中</button>';
    html += '<button class="study-btn study-btn--primary" data-action="done"' + (done ? ' aria-pressed="true"' : '') + '>已完成</button>';
    html += '<button class="study-btn" data-action="todo"' + (status === STATUS.TODO ? ' aria-pressed="true"' : '') + '>未开始</button>';
    html += '</div>';
    html += '</div>';
    return html;
  }

  // ---------- 渲染：首页仪表盘 ----------
  function renderHomeDashboard() {
    var total = CHAPTERS.length;
    var doneCount = CHAPTERS.filter(function (c) { return isDone(c.key); }).length;
    var pct = Math.round(doneCount / total * 100);
    var rows = CHAPTERS.map(function (c) {
      var status = getStatus(c.key);
      var ready = chapterReady(c);
      var label = status === STATUS.DONE ? '已完成' : (status === STATUS.DOING ? '学习中' : '未开始');
      return '<a class="dash-row" href="' + chapterHref(c) + '">' +
        '<span class="dash-row__num">' + esc(c.icon) + '</span>' +
        '<span class="dash-row__name">' + esc(c.title) + '</span>' +
        '<span class="dash-row__dep' + (ready ? ' is-ready' : '') + '">' +
          (c.depends.length ? c.depends.map(function(k){return esc(BY_KEY[k].title);}).join(' + ') : '无前置') +
        '</span>' +
        '<span class="dash-row__badge is-' + status + '">' + label + '</span>' +
        '</a>';
    }).join('');

    var html = '<div class="study-dashboard">';
    html += '<div class="dash-hero">';
    html += '<div class="dash-hero__ring" style="--p:' + pct + '">' +
      '<div class="dash-hero__ring-inner"><strong>' + pct + '%</strong><span>完成度</span></div></div>';
    html += '<div class="dash-hero__text">';
    html += '<h2 class="dash-hero__title">你的学习进度</h2>';
    html += '<p class="dash-hero__desc">已学完 <strong>' + doneCount + '</strong> / ' + total +
      ' 章。每章读完点击「已完成」，前置章完成后即可解锁下一层。</p>';
    html += '<div class="dash-hero__bar"><span style="width:' + pct + '%"></span></div>';
    html += '</div></div>';
    html += '<div class="dash-list">' + rows + '</div>';
    html += '</div>';
    return html;
  }

  // ---------- 渲染：底部前后导航 ----------
  function renderNav(chapter) {
    if (!chapter || chapter.key === 'home') return '';
    var idx = CHAPTERS.findIndex(function (c) { return c.key === chapter.key; });
    var prev = idx > 0 ? CHAPTERS[idx - 1] : null;
    var next = idx < CHAPTERS.length - 1 ? CHAPTERS[idx + 1] : null;
    var html = '<nav class="study-nav">';
    if (prev) {
      html += '<a class="study-nav__item" href="' + chapterHref(prev) + '">' +
        '<span class="study-nav__dir">← 上一章</span>' +
        '<span class="study-nav__label">' + esc(prev.title) + '</span></a>';
    } else {
      html += '<span class="study-nav__item is-empty"></span>';
    }
    if (next) {
      html += '<a class="study-nav__item is-next" href="' + chapterHref(next) + '">' +
        '<span class="study-nav__dir">下一章 →</span>' +
        '<span class="study-nav__label">' + esc(next.title) + '</span></a>';
    } else {
      html += '<span class="study-nav__item is-empty"></span>';
    }
    html += '</nav>';
    return html;
  }

  // ---------- 渲染入口 ----------
  function renderAll() {
    var chapter = currentChapter();
    var content = document.querySelector('.markdown-section');
    if (!content) return;

    // 清理旧注入
    var oldStatus = content.querySelector('.study-status');
    var oldNav = content.querySelector('.study-nav');
    if (oldStatus) oldStatus.remove();
    if (oldNav) oldNav.remove();

    if (chapter && chapter.key === 'home') {
      content.insertAdjacentHTML('afterbegin', renderHomeDashboard());
    } else if (chapter) {
      content.insertAdjacentHTML('afterbegin', renderStatusBar(chapter));
      content.insertAdjacentHTML('beforeend', renderNav(chapter));
    }
    bindEvents();
  }

  function bindEvents() {
    document.querySelectorAll('.study-status button[data-action]').forEach(function (btn) {
      if (btn.dataset.bound) return;
      btn.dataset.bound = '1';
      btn.addEventListener('click', function () {
        var statusEl = btn.closest('.study-status');
        if (!statusEl) return;
        var key = statusEl.getAttribute('data-key');
        setStatus(key, btn.getAttribute('data-action'));
        renderAll();
      });
    });
  }

  // 每章配一个语义图标，替代原先的数字徽章和"·"点
  var SIDEBAR_ICONS = {
    '00': 'compass',
    '01': 'sigma',
    '02': 'code-2',
    '03': 'cpu',
    '04': 'layers',
    '05': 'whole-word',
    '06': 'bot',
    '07': 'wrench',
    '08': 'network',
    '09': 'boxes',
    '10': 'flask-conical',
    '11': 'shield-check'
  };

  // 把侧边栏条目重排为"章节=图标+标题、叶子/小节=干净缩进"
  function decorateSidebar() {
    var links = document.querySelectorAll('.sidebar .sidebar-nav a');
    links.forEach(function (a) {
      if (a.classList.contains('dsh-decorated')) return; // 已处理
      a.classList.add('dsh-decorated');
      var trimmed = (a.textContent || '').replace(/\s+/g, ' ').trim();
      var leaf = trimmed.match(/^\d{2}-\d{2}\s+(.*)$/);
      var chapter = trimmed.match(/^(\d{2})\s+(.*)$/);
      var iconName = null;
      var labelText;
      if (leaf) {
        a.classList.add('dsh-si-leaf');
        labelText = trimmed;
      } else if (chapter) {
        a.classList.add('dsh-si-chapter');
        iconName = SIDEBAR_ICONS[chapter[1]] || 'book-open';
        labelText = chapter[2];
      } else if (trimmed === '首页') {
        a.classList.add('dsh-si-home');
        iconName = 'house';
        labelText = '首页';
      } else {
        a.classList.add('dsh-si-ref');
        labelText = trimmed;
      }
      var iconHtml = iconName
        ? '<span class="dsh-si-icon"><i data-lucide="' + iconName + '"></i></span>'
        : '';
      a.innerHTML = iconHtml + '<span class="dsh-si-label">' + esc(labelText) + '</span>';
    });
    applyLucide();
    groupSidebarTree();
  }

  // 把平铺的侧边栏重组成"章节 → 叶子"两层，做成可折叠树
  function groupSidebarTree() {
    var nav = document.querySelector('.sidebar .sidebar-nav');
    if (!nav) return;
    var list = (nav.querySelector(':scope > ul') || nav);
    if (list.dataset.grouped) { syncTreeState(); return; }
    list.dataset.grouped = '1';

    var chapters = [];
    var lis = Array.from(list.children);
    lis.forEach(function (li) {
      if (li.tagName !== 'LI') return;
      var a = li.querySelector(':scope > a');
      if (!a) return;
      if (a.classList.contains('dsh-si-chapter')) {
        li.classList.add('dsh-chapter-li');
        var tree = li.querySelector(':scope > .dsh-tree');
        if (!tree) {
          tree = document.createElement('ul');
          tree.className = 'dsh-tree';
          li.appendChild(tree);
        }
        if (!li.querySelector(':scope > .dsh-tree-toggle')) {
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'dsh-tree-toggle';
          btn.setAttribute('aria-label', '展开或折叠本章节');
          btn.setAttribute('aria-expanded', 'false');
          btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var holder = this.closest('.dsh-chapter-li');
            var open = !holder.classList.contains('is-open');
            setTreeOpen(holder, open);
          });
          li.appendChild(btn);
        }
        chapters = [li];
      } else if (a.classList.contains('dsh-si-leaf') && chapters.length) {
        chapters[chapters.length - 1]
          .querySelector(':scope > .dsh-tree')
          .appendChild(li);
      }
    });
    syncTreeState();
  }

  function setTreeOpen(li, open) {
    var tree = li.querySelector(':scope > .dsh-tree');
    var btn = li.querySelector(':scope > .dsh-tree-toggle');
    li.classList.toggle('is-open', !!open);
    if (tree) tree.hidden = !open;
    if (btn) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.classList.toggle('is-open', !!open);
    }
  }

  // 进入哪个章节就展开哪个，其余全部折叠（按当前 URL 的目录段识别）
  function pathSegment(h) {
    return String(h || '')
      .replace(/^[#/]+/, '')
      .split('/')[0];
  }
  function syncTreeState() {
    var nav = document.querySelector('.sidebar .sidebar-nav');
    if (!nav) return;
    var current = pathSegment(location.hash);
    nav.querySelectorAll('.dsh-chapter-li').forEach(function (li) {
      var a = li.querySelector(':scope > a');
      var href = (a && a.getAttribute('href')) || '';
      var open = !!(current && href.indexOf('/' + current + '/') !== -1);
      setTreeOpen(li, open);
    });
  }

  function applyLucide() {
    if (window.lucide && window.lucide.createIcons) {
      try { window.lucide.createIcons(); } catch (e) {}
    }
  }

  // 注册为 docsify 插件
  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = window.$docsify.plugins || [];
  window.$docsify.plugins.push(function (hook) {
    hook.doneEach(function () {
      decorateSidebar();
      renderAll();
    });
  });

  // 支持在 docsify 加载完成后兜底渲染（应对路由变化）
  window.addEventListener('hashchange', function () {
    setTimeout(renderAll, 60);
  });
})();
