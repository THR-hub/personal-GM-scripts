// ==UserScript==
// @name         百度-根据UA自动跳转桌面版
// @version      1.0
// @description  当User-Agent信息为桌面端时，百度移动版自动跳转桌面版，特别适合安卓平板火狐。
// @author       T_H_R
// @icon         https://www.baidu.com/favicon.ico
// @match        *://m.baidu.com/s*
// @license      MIT
// @grant        none
// @run-at       document-start
// @supportURL   https://github.com/THR-hub/personal-GM-scripts/issues
// @namespace    https://github.com/THR-hub/personal-GM-scripts
// ==/UserScript==

(function() {
    'use strict';
    if (/(?:Windows|Linux|Macintosh)/.test(navigator.userAgent)) {
        window.location.href = location.href.replace(/m\.baidu\.com/, 'www.baidu.com');
    }
})();
