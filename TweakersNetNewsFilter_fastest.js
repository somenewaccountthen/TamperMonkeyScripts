// ==UserScript==
// @name         Remove items based on text 3
// @namespace    http://tampermonkey.net/
// @version      28-01-2025
// @description  Remove unwanted items
// @author       You
// @match        https://tweakers.net/*
// @icon         https://tweakers.net/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.info("Filtering Tweakers.Net");

    const RuleName = {
        CASE_SENSITIVE: 'CASE_SENSITIVE',
        CASE_INSENSITIVE: 'CASE_INSENSITIVE',
        CASE_SENSITIVE_START: 'CASE_SENSITIVE_START',
        CASE_SENSITIVE_END: 'CASE_SENSITIVE_END'
    };

    const filters = [
        [RuleName.CASE_SENSITIVE_START, "Gerucht"],
        [RuleName.CASE_INSENSITIVE, "musk"],
        [RuleName.CASE_INSENSITIVE, "trump"],
        [RuleName.CASE_SENSITIVE_START, "X "],
        [RuleName.CASE_SENSITIVE_END, " X"],
        [RuleName.CASE_SENSITIVE, " X "]
    ];

    // Log filters to the console
    console.info(`Rules:`);
    filters.forEach(([rulename, value]) => {
        console.info(` ${rulename}: "${value}"`);
    });


    // Query the DOM once and store the results
    const anchors = document.querySelectorAll('div.headlineItem.news.useVisitedState a');

    // Convert NodeList to Array for easier manipulation
    const anchorArray = Array.from(anchors);

    // Process each anchor element only once
    console.info(`Processing:`);
    for (let i = 0; i < anchorArray.length; i++) {
        const anchor = anchorArray[i];
        let textContent = anchor.textContent.trim();

        if (shouldFilterAnchor(textContent, filters)) {
            anchor.closest('div.headlineItem.news.useVisitedState')?.remove();
        }
    }

    function logRuleInfo(rulename, keyword, textContent) {
        console.info(` HIT - ${rulename}: "${keyword}" - "${textContent}"`);
    }

    function shouldFilterAnchor(textContent, filters) {
        let textContentLowerCase = null;
        for (let j = 0; j < filters.length; j++) {
            const [rulename, keyword] = filters[j];
            if (rulename === RuleName.CASE_SENSITIVE && textContent.includes(keyword)) {
                logRuleInfo(rulename, keyword, textContent);
                return true;
            } else if (rulename === RuleName.CASE_INSENSITIVE) {
                if (!textContentLowerCase) textContentLowerCase = textContent.toLowerCase();
                if (textContentLowerCase.includes(keyword.toLowerCase())) {
                    logRuleInfo(rulename, keyword, textContent);
                    return true;
                }
            } else if (rulename === RuleName.CASE_SENSITIVE_START && textContent.startsWith(keyword)) {
                logRuleInfo(rulename, keyword, textContent);
                return true;
            } else if (rulename === RuleName.CASE_SENSITIVE_END && textContent.endsWith(keyword)) {
                logRuleInfo(rulename, keyword, textContent);
                return true;
            }
        }
        return false;
    }

})();
