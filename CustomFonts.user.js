// ==UserScript==
// @name        网页字体替换
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @version     1.4
// @author      T_H_R
// @grant       GM_getValue
// @grant       GM_addStyle
// @description 禁止网站使用某些字体，依赖某些未定义行为。\n已知问题：Firefox上网页字体设为system-ui时无效；Chrome支持不完善；Safari未作测试。
// ==/UserScript==

'use strict';

const browser = (/Firefox/.test(navigator.userAgent)) ? 'firefox' : 'chrome';

const replaceFont = ['Microsoft YaHei', '微软雅黑', 'Microsoft JhengHei', '微軟正黑體', 'Noto Sans CJK SC', 'PingFang SC',
                     'Noto Sans SC', 'Noto Sans JP', 'Noto Sans KR',
                     'Arial', 'Segoe UI', 'Roboto', 'SF Pro Display',
                     'SimSun','宋体', 'SimHei', '黑体'];

if (browser === 'firefox') {

  GM_addStyle(replaceFont.map((font) => `@font-face{font-family:"${font}";src:local("null")}`).join('\n'));

  if (/^https:\/\/.+\.zhihu.com\//.test(document.URL)) GM_addStyle('body{font-family:sans-serif}') // 知乎不知道为什么还是会用Arial显示，先凑合着

}

else if (browser === 'chrome') {

  // 判断默认字体
  // 仅适用Chrome，在Firefox上返回的结果是sans-serif或serif
  const tempElement = document.createElement('div');
  tempElement.style.fontFamily = 'initial';
  document.body.appendChild(tempElement);
  const defaultFont = window.getComputedStyle(tempElement).fontFamily; // 注意这里返回的字符串已经包含了一对双引号
  document.body.removeChild(tempElement);

  // chrome对可变字体支持有问题，多字重实现起来也很麻烦，因此这段代码不能完全正常工作（非可变字体只有400字重，可变字体只有最小字重）。
  GM_addStyle(replaceFont.map((font) => `@font-face{font-family:"${font}";src:local(${defaultFont})}`).join('\n'));

}

const shadow = GM_getValue("shadow");
if (shadow.enable) {
  // some css styles: 0.16px 0.01em 0.01em 0.02em #707070||0.24px 0 0 0.02em #80808033||- 0 0 0.3px #ACACAC||calc(calc(40px - 1em) / 170) - - - -
  GM_addStyle(`* {-webkit-text-stroke-width: ${shadow.stroke};text-shadow: ${shadow.offsetX} ${shadow.offsetY} ${shadow.blur} ${shadow.color};}`);
}