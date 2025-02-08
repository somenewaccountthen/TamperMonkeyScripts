// ==UserScript==
// @name         Decapitalize Spans in Article
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Make the inner text inside spans inside an article tag all lowercase with the exception of the first letter.
// @author       You 🐒
// @match        https://x.com/*
// @grant        none
// @icon         https://x.com/favicon.ico
// ==/UserScript==

(function() {
    'use strict';
    function percentageCaps(inputString) {
        if (!inputString || inputString.length === 0) return 0;

        let capitalLetterCount = 0;
        const totalLength = inputString.length;

        for (let i = 0; i < totalLength; i++) {
            if (inputString[i] >= 'A' && inputString[i] <= 'Z') {
                capitalLetterCount++;
            }
        }

        return (capitalLetterCount / totalLength) * 100;
    }

    // Save state using localStorage
    function saveState(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    // Retrieve state from localStorage
    function getState(key) {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }

    // Function to capitalize the first letter and make the rest lowercase
    function capitalizeFirstLetter(span) {
        if (!span || !span.textContent)
        {
            return span; // Handle empty strings gracefully
        }
        if (span.textContent.charAt(0) === '​'){
            return;
        }

        span.textContent = '​' + span.textContent.charAt(0).toUpperCase() + span.textContent.slice(1).toLowerCase();
    }

    // Function to run periodically
    function periodicCheck() {
        const spans = document.querySelectorAll('article span, article span span, article span span span ');
        const currentSpanCount = spans.length;
        const lastSpanCount = getState('spanCount') || 0;
        if (currentSpanCount === lastSpanCount){
           return;
        }

        let count = 0;
        spans.forEach(span => {
            if (span.textContent.length > 15 && percentageCaps(span.textContent) > 30){
                count++;
                capitalizeFirstLetter(span);
            }
        });
        //console.info('Changed: ' + count);
        saveState('spanCount', currentSpanCount);
    }

    // Set interval to run the periodic check every 1 second
    setInterval(periodicCheck, 1000);
})();
