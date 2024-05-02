// ==UserScript==
// @name         网页回到顶部
// @namespace    https://tampermonkey.net/
// @version      0.1.3
// @description  在网页右边增加回到顶部的按钮
// @author       T_H_R
// @match        *://*/*
// @exclude      *://profiler.firefox.com/*
// @noframes
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// ==/UserScript==

GM_addStyle(`
@media(prefers-color-scheme: light){.button_GM{background-color: #f7f7f7 !important;color:black !important;}}
@media(prefers-color-scheme: dark){.button_GM{background-color: #333 !important;color:white !important;}}
`);
GM_registerMenuCommand('本次隐藏',hideButton);

(function() {
    'use strict';
    createButton();
})();

function createButton() {
    // 暂且保留两种写法，因为我也不知道那种比较好
    var btn1 = document.createElement('div');
    btn1.id='btnToEnd';
    btn1.style=`all:initial;position:fixed;bottom:20%;right:31px;width:12px;
        border:1px solid;border-radius:3px;font-size:12px;padding:3px;cursor:pointer;`;
    btn1.innerHTML='去往底部'
    btn1.onclick = () => window.scrollTo({top:document.documentElement.scrollHeight,behavior:'smooth'});
    document.body.appendChild(btn1);

    var btn2 =document.createElement('div');
    btn2.innerHTML = `<div id='btnToTop' style='all:initial;position:fixed;bottom:20%;right:12px;width:12px;
        border:1px solid;border-radius:3px;font-size:12px;padding:3px;cursor:pointer;'>回到顶部</div>`;
    btn2.onclick = () => window.scrollTo({top:0,behavior:'smooth'});
    document.body.appendChild(btn2);
}

function hideButton() {
    document.getElementById('btnToEnd').style.visibility='hidden';
    document.getElementById('btnToTop').style.visibility='hidden';
}
