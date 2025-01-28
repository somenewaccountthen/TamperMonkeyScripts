// ==UserScript==
// @name         Remove items based on text
// @namespace    http://tampermonkey.net/
// @version      28-01-2025
// @description  Remove unwanted items
// @author       You
// @match        https://tweakers.net/
// @icon         https://tweakers.net/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.querySelectorAll('div.headlineItem.news.useVisitedState a').forEach(anchor => {
        if (anchor.textContent.includes("Gerucht")) {
            anchor.closest('div.headlineItem.news.useVisitedState').remove();
        }
    });

    document.querySelectorAll('div.headlineItem.news.useVisitedState a').forEach(anchor => {
        if (anchor.textContent.toLowerCase().includes("trump")) {
            anchor.closest('div.headlineItem.news.useVisitedState').remove();
        }
    });

    document.querySelectorAll('div.headlineItem.news.useVisitedState a').forEach(anchor => {
        if (anchor.textContent.toLowerCase().includes("musk")) {
            anchor.closest('div.headlineItem.news.useVisitedState').remove();
        }
    });
})();
