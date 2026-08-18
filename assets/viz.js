/* 可视化渲染层：Mermaid 图表 + KaTeX 公式 + 代码块语言徽标 */
(function () {
  'use strict';

  if (window.mermaid) {
    window.mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: 'base',
      themeVariables: {
        primaryColor: '#eef4fb',
        primaryTextColor: '#1c2733',
        primaryBorderColor: '#7fa8d0',
        lineColor: '#9db4cc',
        secondaryColor: '#e7f5ef',
        tertiaryColor: '#fdf3e3',
        fontSize: '14px'
      },
      flowchart: { curve: 'basis', padding: 12 },
      htmlLabels: true
    });
  }

  function renderMermaidBlocks(container) {
    if (!window.mermaid) return;
    var blocks = (container || document).querySelectorAll(
      'pre code.language-mermaid, pre code.lang-mermaid');
    blocks.forEach(function (code) {
      var pre = code.closest('pre');
      if (!pre || code.dataset.mermaidDone) return;
      code.dataset.mermaidDone = '1';
      var holder = document.createElement('div');
      holder.className = 'mermaid-host';
      var src = code.textContent;
      try {
        window.mermaid.render('mmd_' + Math.random().toString(36).slice(2, 9), src)
          .then(function (res) {
            holder.innerHTML = res.svg;
            pre.replaceWith(holder);
          })
          .catch(function (err) {
            holder.className = 'mermaid-host mermaid-error';
            holder.textContent = '图表渲染失败：' + ((err && err.message) || err);
            pre.replaceWith(holder);
          });
      } catch (e) {
        holder.className = 'mermaid-host mermaid-error';
        holder.textContent = '图表渲染失败：' + (e && e.message || e);
        pre.replaceWith(holder);
      }
    });
  }

  function renderMath(container) {
    if (!window.renderMathInElement) return;
    try {
      window.renderMathInElement(container || document.body, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    } catch (e) { /* 不阻塞 */ }
  }

  function decorateCodeBlocks(container) {
    var blocks = (container || document).querySelectorAll('pre code');
    blocks.forEach(function (code) {
      var pre = code.closest('pre');
      if (!pre || pre.querySelector('.code-lang') || pre.parentNode && pre.parentNode.classList.contains('mermaid-host')) return;
      var cls = Array.prototype.filter.call(code.classList, function (c) {
        return c.indexOf('language-') === 0 || c.indexOf('lang-') === 0;
      })[0];
      var lang = cls ? cls.replace(/^(language|lang)-/, '') : '';
      if (!lang || lang === 'mermaid') return;
      var badge = document.createElement('span');
      badge.className = 'code-lang';
      badge.textContent = lang;
      pre.appendChild(badge);
    });
  }

  // 定期检查，兜底捕捉 docsify 异步注入的代码块
  setInterval(function () {
    var content = document.querySelector('.markdown-section');
    if (!content) return;
    var pending = content.querySelectorAll(
      'pre code.language-mermaid:not([data-mermaid-done]), pre code.lang-mermaid:not([data-mermaid-done])');
    var hasMath = content.querySelector('.katex') !== null;
    var needs = pending.length > 0;
    if (needs) {
      renderMermaidBlocks(content);
      renderMath(content);
      decorateCodeBlocks(content);
    }
  }, 350);

  // 注册 docsify 插件
  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = window.$docsify.plugins || [];
  window.$docsify.plugins.push(function (hook) {
    hook.doneEach(function () {
      var content = document.querySelector('.markdown-section');
      if (!content) return;
      renderMermaidBlocks(content);
      renderMath(content);
      decorateCodeBlocks(content);
    });
  });

  window.addEventListener('hashchange', function () {
    setTimeout(function () {
      var content = document.querySelector('.markdown-section');
      if (content) {
        renderMermaidBlocks(content);
        renderMath(content);
        decorateCodeBlocks(content);
      }
    }, 80);
  });
})();
