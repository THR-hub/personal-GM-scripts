// ==UserScript==
// @name        网页字体替换
// @name:zh     网页字体替换
// @name:en     Replace Web Fonts
// @namespace   https://github.com/THR-hub/personal-GM-scripts
// @match       *://*/*
// @version     1.5
// @author      T_H_R
// @grant       GM_getValue
// @grant       GM_addStyle
// @noframes
// @description:zh 禁止网站使用某些字体，依赖某些未定义行为。已知问题：Firefox上网页字体设为system-ui时无效；Chrome支持不完善；Safari未作测试。
// @description:en Prevent website from using some of fonts. Know issue: When website font set to system-ui the script doesnot work; On Chrome the script doesnot work perfect; The script is not tested on Safari.
// @license     MIT
// ==/UserScript==

'use strict';

const browser = (/Firefox/.test(navigator.userAgent)) ? 'firefox' : 'chrome';

if (browser === 'firefox') {

  const replaceFont = ['Noto Sans CJK SC', 'PingFang SC', 'WenQuanYi Micro Hei',
    'Microsoft YaHei', '微软雅黑', 'Microsoft YaHei UI', 'Microsoft JhengHei', '微軟正黑體', 'Meiryo UI', 'Malgun Gothic',
    'Noto Sans SC', 'Noto Sans JP', 'Noto Sans KR', 'Source Han Sans SC',
    'Arial', 'Segoe UI', 'Roboto', 'SF Pro Display', 'Tahoma', 'Helvetica', 'Georgia', 'Verdana', // Note that Helvetica is equal to Arial on Windows, look at HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\FontSubstitutes
    'SimHei', '黑体', 'STXihei', '华文细黑', 'DengXian',
    'SimSun', '宋体',
    'Consolas', 'Menlo', 'Lucida Console', 'Courier', 'Courier New', 'DejaVu Sans Mono'];

  GM_addStyle(replaceFont.map((font) => `@font-face{font-family:"${font}";src:local("null")}`).join('\n'));

}

else if (browser === 'chrome') {

  const replaceFont = ['Arial', 'Helvetica', 'Segoe UI', 'SF Pro Display', 'Roboto', 'Microsoft YaHei', 'Microsoft YaHei UI', 'PingFang SC', 'Noto Sans CJK SC', 'Noto Sans JP'];

  // 判断默认字体，只能获取到默认字体，这里假定默认字体与sans-serif相同，并且不替换serif
  // 仅适用Chrome，在Firefox上返回的结果是sans-serif或serif
  const tempElement = document.createElement('div');
  tempElement.style.fontFamily = 'initial';
  document.body.appendChild(tempElement);
  const defaultFont = window.getComputedStyle(tempElement).fontFamily; // 注意这里返回的字符串已经包含了一对双引号
  document.body.removeChild(tempElement);

  // chrome对可变字体支持有问题，多字重实现起来也很麻烦，因此这段代码不能完全正常工作（非可变字体只有400字重，部分可变字体只有最小字重）。Windows自带的Noto正常。
  GM_addStyle(replaceFont.map((font) => `@font-face{font-family:"${font}";src:local(${defaultFont})}`).join('\n'));

}

const shadow = GM_getValue("shadow");
if (shadow?.enable) {
  // some css styles: 0.16px 0.01em 0.01em 0.02em #707070||0.24px 0 0 0.02em #80808033||- 0 0 0.3px #ACACAC||calc(calc(40px - 1em) / 170) - - - -
  GM_addStyle(`* {-webkit-text-stroke-width: ${shadow.stroke};text-shadow: ${shadow.offsetX} ${shadow.offsetY} ${shadow.blur} ${shadow.color};}`);
}

/*const showLanguage = document.createElement('div');
showLanguage.style = `all:initial;position:fixed;bottom:0;left:0;font-size:12px;background:#f7f7f7;
border:1px silver;border-style:solid solid none none;border-top-right-radius:3px;`;
showLanguage.innerHTML = document.documentElement.lang || `<span style='font-family:monospace'>lang</span> Not Set`;
document.body.appendChild(showLanguage);*/