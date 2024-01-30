// ==UserScript==
// @name         网页回到顶部
// @namespace    https://tampermonkey.net/
// @version      0.1.2
// @description  在网页右边增加回到顶部的按钮
// @author       T_H_R
// @match        *://*/*
// @noframes
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    createButton();
})();

function createButton() {
    var btn1 =document.createElement('div');
    btn1.id = 'gm_btn-to-bottom';
    btn1.innerHTML = `<div id='gm_gotobottom' style='all:initial;position:fixed;bottom:20%;right:31px;width:12px;background-color:#f7f7f7;
        border:1px solid grey;color:black;border-radius:3px;font-size:12px;padding:3px;cursor:pointer;'>去往底部</div>`;
    btn1.onclick = () => window.scrollTo({top:document.documentElement.scrollHeight,behavior:'smooth'});
    document.body.appendChild(btn1);

    var btn2 =document.createElement('div');
    btn2.id = 'gm_btn-to-top';
    btn2.innerHTML = `<div id='gm_gototop' style='all:initial;position:fixed;bottom:20%;right:12px;width:12px;background-color:#f7f7f7;
        border:1px solid grey;color:black;border-radius:3px;font-size:12px;padding:3px;cursor:pointer;'>回到顶部</div>`;
    btn2.onclick = () => window.scrollTo({top:0,behavior:'smooth'});
    document.body.appendChild(btn2);
}
