/* global chrome */
'use strict';

chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.executeScript(null, {file: 'scripts/contentscript.js'});
});
