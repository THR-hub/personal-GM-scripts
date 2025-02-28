// ==UserScript==
// @name         网页回到顶部
// @namespace    https://tampermonkey.net/
// @version      0.1.5
// @description  在网页右边增加回到顶部的按钮
// @author       T_H_R
// @match        *://*/*
// @exclude      *://profiler.firefox.com/*
// @exclude      *://web.telegram.org/*
// @noframes
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// ==/UserScript==

'use strict';

GM_addStyle(`@media(prefers-color-scheme:light){.button_GM{background-color:#f7f7f7 !important;color:black !important;}}
@media(prefers-color-scheme:dark){.button_GM{background-color:#333 !important;color:white !important;}}`);

GM_addStyle(`.button_GM{all:initial;display:inline-block;font-size:12px;block-size:auto;border:1px solid grey;border-radius:3px;padding:3px;
  writing-mode:vertical-rl;letter-spacing:.3em;cursor:pointer;position:fixed;bottom:20%;}#btnToEnd_GM{right:1em;}#btnToTop_GM{right:2.8em;}`)

GM_registerMenuCommand('本次隐藏',hideButton);

function createBtn(id,func) {
  let btn = document.createElement('div');
  btn.id=id;
  btn.className='button_GM';
  btn.lang='zh-Hans-CN';
  btn.innerHTML='去往底部';
  btn.onclick=func;
  document.body.appendChild(btn);
}

function hideButton() {
    document.getElementById('btnToTop_GM').style.visibility='hidden';
    document.getElementById('btnToEnd_GM').style.visibility='hidden';
}


createBtn('btnToTop_GM',()=>window.scrollTo({top:0,behavior:'smooth'}));
createBtn('btnToEnd_GM',()=>window.scrollTo({top:document.documentElement.scrollHeight,behavior:'smooth'}));
