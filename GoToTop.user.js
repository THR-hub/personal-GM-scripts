// ==UserScript==
// @name         网页回到顶部
// @namespace    https://tampermonkey.net/
// @version      0.1.7
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

GM_addStyle(`@media(prefers-color-scheme:light){#btn_p_GM{background-color:#f7f7f7 !important;color:black !important;}}
@media(prefers-color-scheme:dark){#btn_p_GM{background-color:#333 !important;color:white !important;}}`);

GM_addStyle(`#btn_p_GM{all:initial;display:inline-block;font-size:12px !important;
  writing-mode:vertical-rl;letter-spacing:.3em;cursor:pointer;position:fixed;bottom:20%;right:1em;z-index:1000}
  .btn_c_GM{block-size:auto !important;border:.1em solid grey;border-radius:.3em;padding:.3em;position:relative}
  #btn_2_GM{right:-1px}`); //边框重叠

GM_registerMenuCommand('本次隐藏', hideButton);

function hideButton() {
  document.getElementById('btn_p_GM').style.visibility='hidden';
}


let btn_p=document.createElement('div');
btn_p.id='btn_p_GM';
btn_p.lang='zh-Hans-CN';


let btn_1=document.createElement('div');
btn_1.className='btn_c_GM';
btn_1.innerHTML='回到顶部';
btn_1.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});

let btn_2=document.createElement('div');
btn_2.id='btn_2_GM';
btn_2.className='btn_c_GM';
btn_2.innerHTML='去往底部';
btn_2.onclick=()=>window.scrollTo({top:document.documentElement.scrollHeight,behavior:'smooth'});

btn_p.appendChild(btn_1);
btn_p.appendChild(btn_2);
document.body.appendChild(btn_p);
