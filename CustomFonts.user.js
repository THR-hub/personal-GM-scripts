// ==UserScript==
// @name        网页字体替换
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @version     1.3
// @author      T_H_R
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_addStyle
// @description 将网站自定义字体替换为默认字体。懒得做图形配置界面，请自行写入配置（Violent Monkey可以编辑脚本-修改数据）。首次运行会生成默认配置，可供参考。
// ==/UserScript==

'use strict';

if(GM_getValue('replaceFont') === undefined) {
  // ONLY FOR TEST. 不绕过浏览器暂时没法修改system-ui，但是可以修改ui-sans-serif。
  //GM_setValue('customFontUI', 'IBM Plex Sans SC');
  //GM_setValue('rule', {" Thin":"100"," ExtLt":"200"," Light":"300","":"400"," Medm":"500"," SmBld":"600"," Bold":"700 1000"});
  GM_setValue('replaceFont', ['Noto Sans CJK SC', 'PingFang SC']);
}

let css = '';
for (let s of GM_getValue('replaceFont')) {
  css += `@font-face{font-family:"${s}";src:local("null")}\n`;
}

//for (let s in GM_getValue('rule')) {
//  css += `@font-face{font-family:"ui-sans-serif";font-weight:${GM_getValue('rule')[s]};src:local("${GM_setValue('customFontUI')}${s}")}\n`;
//}

GM_addStyle(css);
