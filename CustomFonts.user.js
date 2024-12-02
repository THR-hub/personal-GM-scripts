// ==UserScript==
// @name        网页字体替换
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      T_H_R
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_addStyle
// @description 将网页的字体替换为想用的字体。目前只支持替换成两种字体。懒得做图形配置界面，请自行写入配置（Violent Monkey可以编辑脚本-修改数据）。首次运行会生成默认配置，可供参考。
// ==/UserScript==

if(GM_getValue('customFont') === undefined || GM_getValue('customFontUI') === undefined) {
  GM_setValue('customFont', "Microsoft YaHei");
  GM_setValue("customFontUI", "Microsoft YaHei UI");
  GM_setValue("replaceFont", ["Noto Sans CJK SC", "PingFang SC"]);
  GM_setValue("replaceFontUI", ["PingFang UI SC"]);
}

let customFont = GM_getValue('customFont');
let customFontUI = GM_getValue('customFontUI');

/* 测试用例：
 * Firefox/Windows11/微软雅黑:100-300,Light;400-500,Regular;600-1000,Bold
 * Firefox/Windows11/更纱黑体:1-200,XLight;3,Light;4-5,Regular;6,SemiBold;7-10,Bold
 */

// Firefox里sans-serif、system-ui无效，前者可设默认字体，后者无解。Chrome未测试。
function newCSS(toBeDef, toDef, td2='') { // 不知道为什么Arial总是调用微软雅黑，先写个td2凑合吧
  return `@font-face{font-family:"${toBeDef}";font-weight:1 1000;src:local("${toDef}")${tbd2}}
@font-face{font-family:"${toBeDef}";font-weight:1 300;src:local("${toDef} Light")${tbd2}}
@font-face{font-family:"${toBeDef}";font-weight:400 500;src:local("${toDef}")${tbd2}}
@font-face{font-family:"${toBeDef}";font-weight:600 1000;src:local("${toDef} Bold")${tbd2}}
@font-face{font-family:"${toBeDef}";font-weight:100 200;src:local("${toDef} XLight")${tbd2}}
@font-face{font-family:"${toBeDef}";font-weight:300;src:local("${toDef} Light")${tbd2}}
@font-face{font-family:"${toBeDef}";font-weight:400 500;src:local("${toDef}")${tbd2}}
@font-face{font-family:"${toBeDef}";font-weight:600;src:local("${toDef} SemiBold")${tbd2}}
@font-face{font-family:"${toBeDef}";font-weight:700 1000;src:local("${toDef} Bold")${tbd2}}
`};
let _css=newCSS('Arial', customFont, ',local(\"Arial\")')
for (let s of GM_getValue('replaceFont').concat('sans-serif')) {
  _css += newCSS(s, customFont);
}
for (let s of GM_getValue('replaceFontUI').concat('ui-sans-serif', 'system-ui')) {
  _css += newCSS(s, customFontUI);
}

GM_addStyle(_css);
