// ==UserScript==
// @name         知乎优化（未完成）
// @namespace    http://tampermonkey.net/
// @version      2024-01-30
// @description  目前已有功能：修改标题去掉消息数（待完善）。
// @author       T_H_R
// @match        *://www.zhihu.com/*
// @icon         https://static.zhihu.com/heifetz/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var loop=()=>{document.title=document.title.match(/.+(消息|私信)\) ?(.*)/)[2]};
    var interval=setInterval(loop,200);
    setTimeout(()=>clearInterval(interval),2000);
})();
