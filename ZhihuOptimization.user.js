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
    var noBreakFlag=0,continueFlag=0;
    var loop=()=>{
        var title=document.title;
        var search_ans=title.search(/条消息\) /);
        if(search_ans+1)document.title=title.slice(search_ans+5);}
    var interval=setInterval(loop,200);
    setTimeout(()=>clearInterval(interval),2000);
})();
