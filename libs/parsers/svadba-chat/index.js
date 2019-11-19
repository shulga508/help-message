

'use strict';
window.addEventListener('load', function () {
    const head = document.body || document.getElementsByTagName("body")[0];

    const script = document.createElement('script');
    script.setAttribute("type", "module");
    script.setAttribute("src", chrome.runtime.getURL('/libs/parsers/svadba-chat/app.js'));

    head.appendChild(script);
})
