// ==UserScript==
// @name         Warn leave page Local
// @namespace    http://tampermonkey.net/
// @version      2025-01-28
// @description  try to take over the world!
// @author       You
// @match        localhost
// @match        127.0.0.1
// @match        0.0.0.0
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener("beforeunload", function (e) {
        var confirmationMessage = 'It looks like you have been editing something. '
                                + 'If you leave before saving, your changes will be lost.';

        // Modern browsers ignore the custom message and show a generic one
        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    });
})();
