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

//let style = document.createElement('style');
//style.type = 'text/css';

let _css=`@font-face{font-style:normal;font-family:"Arial";src:local("${customFont}"),local("Arial")}
@font-face{font-style:bolder;font-family:"Arial";src:local("${customFont}"),local("Arial")}
`;
// Firefox里sans-serif、system-ui无效，前者可设默认字体，后者无解。Chrome未测试。
for (let s of GM_getValue('replaceFont').concat('sans-serif')) {
  _css += `@font-face{font-style:normal;font-family:"${s}";src:local("${customFont}")}
@font-face{font-style:bolder;font-family:"${s}";src:local("${customFont}")}
`;
}
for (let s of GM_getValue('replaceFontUI').concat('ui-sans-serif', 'system-ui')) {
  _css += `@font-face{font-style:normal;font-family:"${s}";src:local("${customFontUI}")}
@font-face{font-style:bolder;font-family:"${s}";src:local("${customFontUI}")}`
;
}

//style.innerHTML = _css;

//document.head.appendChild(style);

GM_addStyle(_css);
