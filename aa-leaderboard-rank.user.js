// ==UserScript==
// @name         AA Leaderboard Rank
// @name:zh-CN   Artificial Analysis 排行榜序号
// @namespace    https://github.com/guanyme/aa-leaderboard-rank
// @version      1.0.0
// @description  Show each model's rank on the Artificial Analysis LLM leaderboard, renumbered on sort and filter
// @description:zh-CN 在 Artificial Analysis 的 LLM 排行榜里给每个模型显示当前排序下的名次，排序、筛选后自动重新编号
// @author       Guany
// @license      MIT
// @homepageURL  https://github.com/guanyme/aa-leaderboard-rank
// @supportURL   https://github.com/guanyme/aa-leaderboard-rank/issues
// @downloadURL  https://raw.githubusercontent.com/guanyme/aa-leaderboard-rank/main/aa-leaderboard-rank.user.js
// @updateURL    https://raw.githubusercontent.com/guanyme/aa-leaderboard-rank/main/aa-leaderboard-rank.user.js
// @match        https://artificialanalysis.ai/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

;(function () {
  'use strict'

  // 允许带语言前缀，如 /zh/leaderboards/models
  const PAGE_RE = /^\/(?:[a-z]{2}(?:-[a-z]{2})?\/)?leaderboards\/models\/?$/i
  const ATTR = 'data-aa-rank'

  // 序号完全由 CSS counter 生成，不改动 React 管理的 DOM，
  // 所以行被排序、筛选、重新渲染后序号会自动按当前顺序刷新
  const style = document.createElement('style')
  style.textContent = `
    table[${ATTR}] > tbody { counter-reset: aa-rank; }
    table[${ATTR}] > tbody > tr { counter-increment: aa-rank; }
    table[${ATTR}] > tbody > tr > td:first-child > div::before {
      content: counter(aa-rank);
      display: inline-block;
      min-width: 1.9em;
      margin-right: .45em;
      padding: 0 .3em;
      border-radius: 6px;
      background: #eef0f3;
      color: #475467;
      font-size: 12px;
      font-weight: 600;
      line-height: 1.7;
      text-align: center;
      font-variant-numeric: tabular-nums;
      vertical-align: 1px;
    }
    table[${ATTR}] > tbody > tr:nth-child(1) > td:first-child > div::before { background: #fde68a; color: #78350f; }
    table[${ATTR}] > tbody > tr:nth-child(2) > td:first-child > div::before { background: #e5e7eb; color: #374151; }
    table[${ATTR}] > tbody > tr:nth-child(3) > td:first-child > div::before { background: #fed7aa; color: #7c2d12; }
  `
  document.head.appendChild(style)

  // 站点是单页应用，切换页面不刷新：只在排行榜页给表格打标记，离开后撤掉
  function update() {
    const onPage = PAGE_RE.test(location.pathname)
    for (const table of document.querySelectorAll('table')) {
      const want = onPage && !!table.tHead
      if (want !== table.hasAttribute(ATTR)) table.toggleAttribute(ATTR, want)
    }
  }

  // 用 rAF 合并同一帧内的多次变动；后台标签页里 rAF 会暂停，但在下一次绘制前一定会执行
  let queued = false
  new MutationObserver(() => {
    if (queued) return
    queued = true
    requestAnimationFrame(() => {
      queued = false
      update()
    })
  }).observe(document.documentElement, { childList: true, subtree: true })

  update()
})()
