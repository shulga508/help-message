

'use strict';
const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;

const script = document.createElement('script');
script.setAttribute("type", "module");
script.setAttribute("src", chrome.runtime.getURL('/libs/parsers/svadba-chat/app.js'));

head.insertBefore(script, head.lastChild);
