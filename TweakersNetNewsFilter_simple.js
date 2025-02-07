// ==UserScript==
// @name         Remove items based on text
// @namespace    http://tampermonkey.net/
// @version      07-02-2025
// @description  Remove unwanted items
// @author       You
// @match        https://tweakers.net/
// @icon         https://tweakers.net/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.querySelectorAll('div.headlineItem a').forEach(anchor => {
        if (anchor.textContent.includes("Gerucht")) {
            anchor.closest('div.headlineItem').remove();
        }
    });

    document.querySelectorAll('div.headlineItem a').forEach(anchor => {
        if (anchor.textContent.toLowerCase().includes("trump")) {
            anchor.closest('div.headlineItem').remove();
        }
    });

    document.querySelectorAll('div.headlineItem a').forEach(anchor => {
        if (anchor.textContent.toLowerCase().includes("musk")) {
            anchor.closest('div.headlineItem').remove();
        }
    });
})();
