// ==UserScript==
// @name         网页回到顶部
// @namespace    https://tampermonkey.net/
// @version      0.1.3
// @description  在网页右边增加回到顶部的按钮
// @author       T_H_R
// @match        *://*/*
// @exclude      *://profiler.firefox.com/*
// @exclude      *://web.telegram.org/*
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
    var btn1 = document.createElement('div');
    btn1.id='btnToEnd';
    btn1.className='button_GM';
    //btn1.style=`all:initial;position:fixed;bottom:20%;right:31px;width:12px;
    //    border:1px solid grey;border-radius:3px;font-size:12px;padding:3px;cursor:pointer;`;
    btn1.style=`all:initial;position:fixed;bottom:20%;right:2.6em;width:1em;
        border:0.1em solid grey;border-radius:0.25em;font-size:12px;padding:0.25em;cursor:pointer;`;
    btn1.innerHTML='去往底部';
    btn1.onclick = () => window.scrollTo({top:document.documentElement.scrollHeight,behavior:'smooth'});
    document.body.appendChild(btn1);

    /* 这种写法不可取，部分网站会重设属性导致显示异常
    var btn2 =document.createElement('div');
    btn2.innerHTML = `<div id='btnToTop' class='button_GM' style='all:initial;position:fixed;bottom:20%;right:12px;width:12px;
        border:1px solid grey;border-radius:3px;font-size:12px;padding:3px;cursor:pointer;'>回到顶部</div>`;
    btn2.onclick = () => window.scrollTo({top:0,behavior:'smooth'});
    document.body.appendChild(btn2);*/
    var btn2 =document.createElement('div');
    btn2.id='btnToTop';
    btn2.className='button_GM';
    //btn2.style=`all:initial;position:fixed;bottom:20%;right:12px;width:12px;
    //    border:1px solid grey;border-radius:3px;font-size:12px;padding:3px;cursor:pointer;`;
    btn2.style=`all:initial;position:fixed;bottom:20%;right:1em;width:1em;
        border:0.1em solid grey;border-radius:0.25em;font-size:12px;padding:0.25em;cursor:pointer;`;
    btn2.innerHTML='回到顶部';
    btn2.onclick = () => window.scrollTo({top:0,behavior:'smooth'});
    document.body.appendChild(btn2);
}

function hideButton() {
    document.getElementById('btnToEnd').style.visibility='hidden';
    document.getElementById('btnToTop').style.visibility='hidden';
}
