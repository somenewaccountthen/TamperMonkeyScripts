// ==UserScript==
// @name         Remove items based on text 3
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
    console.info("Filtering Tweakers.Net");

    const RuleName = {
    CASE_SENSITIVE: 'CASE_CENSITIVE',
    CASE_INSENSITIVE: 'CASE_INSENSITIVE'
    };

    const filters = [
        [RuleName.CASE_SENSITIVE, "Gerucht"],
        [RuleName.CASE_INSENSITIVE, "musk"],
        [RuleName.CASE_INSENSITIVE, "trump"]
    ];


    // Log filters to the console
    filters.forEach(([ruleName, value]) => {
    console.info(`${ruleName}: ${value}`);
    });

    // Query the DOM once and store the results
    const anchors = document.querySelectorAll('div.headlineItem.news.useVisitedState a');

    // Convert NodeList to Array for easier manipulation
    const anchorArray = Array.from(anchors);

    // Process each anchor element only once
    for (let i = 0; i < anchorArray.length; i++) {
        const anchor = anchorArray[i];
        let textContent = anchor.textContent;
        let lowerTextContent = null;

        for (let j = 0; j < filters.length; j++) {
            const [rulename, keyword] = filters[j];

            if (rulename === RuleName.CASE_SENSITIVE) {
                if (textContent.includes(keyword)) {
                    anchor.closest('div.headlineItem.news.useVisitedState')?.remove();
                    break;
                }
            } else if (rulename === RuleName.CASE_INSENSITIVE) {
                if (!lowerTextContent) lowerTextContent = textContent.toLowerCase();
                if (lowerTextContent.includes(keyword.toLowerCase())) {
                    anchor.closest('div.headlineItem.news.useVisitedState')?.remove();
                    break;
                }
            }
        }
    }

})();
