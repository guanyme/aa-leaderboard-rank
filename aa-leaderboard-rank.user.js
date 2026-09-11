// ==UserScript==
// @name         AA Leaderboard Rank
// @name:zh-CN   Artificial Analysis Leaderboard Rank
// @namespace    https://github.com/guanyme/aa-leaderboard-rank
// @version      1.0.0
// @description  Show each model's rank on the Artificial Analysis LLM leaderboard, renumbered on sort and filter
// @description:zh-CN Show each model's current rank in the Artificial Analysis LLM leaderboard, automatically renumbering after sorting or filtering
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

  // Allow a language prefix, such as /zh/leaderboards/models
  const PAGE_RE = /^\/(?:[a-z]{2}(?:-[a-z]{2})?\/)?leaderboards\/models\/?$/i
  const ATTR = 'data-aa-rank'

  // Ranks are generated entirely by CSS counters, without modifying the DOM managed by React,
  // so ranks automatically update to match the current order after sorting, filtering, or rerendering
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

  // The site is a single-page app, so navigation doesn't reload the page: mark the table only on leaderboard pages, and remove the mark when leaving
  function update() {
    const onPage = PAGE_RE.test(location.pathname)
    for (const table of document.querySelectorAll('table')) {
      const want = onPage && !!table.tHead
      if (want !== table.hasAttribute(ATTR)) table.toggleAttribute(ATTR, want)
    }
  }

  // Use rAF to batch multiple changes within the same frame; rAF pauses in background tabs, but always runs before the next paint
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
