// ==UserScript==
// @name        网页字体替换
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @version     1.2
// @author      T_H_R
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_addStyle
// @description 将网站自定义字体替换为指定字体。目前只支持已测试的特定字体（微软雅黑、苹方、思源黑体、更纱黑体）。懒得做图形配置界面，请自行写入配置（Violent Monkey可以编辑脚本-修改数据）。首次运行会生成默认配置，可供参考。
// ==/UserScript==

if(GM_getValue('customFont') === undefined || GM_getValue('customFontUI') === undefined) {
  GM_setValue('customFont', "Microsoft YaHei");
  GM_setValue("customFontUI", "Microsoft YaHei UI");
  GM_setValue("replaceFont", ["Noto Sans CJK SC", "PingFang SC"]);
  GM_setValue("replaceFontUI", ["PingFang UI SC"]);
}

const customFont = GM_getValue('customFont');
const customFontUI = GM_getValue('customFontUI');

/* 测试用例：（x代表无后缀，与Regular不同）
 * Firefox/Windows11/微软雅黑:100-300,Light;400-500,x;600-900,Bold
 * Firefox/Windows11/更纱黑体旧:1-200,XLight;3,Light;4-5,x;6,SemiBold;7-9,Bold
 * Firefox/Windows11/苹方简:1,UltraLight;2,Thin;3,Light;4,Regular;5,Medium;6-9,SemiBold
 * Firefox/Windows11/思源黑体简:1-2,Thin;3,Light;4,x;5,Medium;6-7,Bold;8-9,Black
 */

const fonts = new Map([ // 截断是为了匹配类似字体，比如不同字形
  ['Micros', new Map([[' Light', '1 300'], ['', '400 500'], [' Bold','600 900']])],
  ['Sarasa', new Map([[' XLight', '1 200'], [' Light','300'], ['','400 500'],[' SemiBold','600'],[' Bold','700 900']])],
  ['PingFa', new Map([[' UltraLight', '100'], [' Thin','200'],[' Light','300'],[' Regular','400'],[' Medium','500'],[' SemiBold','600 1000']])],
  ['Noto S', new Map([[' Thin', '1 200'], [' Light','300'],['','400'],[' Medium','500'],[' Bold','600 700'],[' Black','800 1000']])]
]);

function newCSS(toBeDef, toDef) {
  /*return `@font-face{font-family:"${toBeDef}";font-weight:1 1000;src:local("${toDef}")${td2}}
@font-face{font-family:"${toBeDef}";font-weight:1 300;src:local("${toDef} Light")${td2}}
@font-face{font-family:"${toBeDef}";font-weight:100 200;src:local("${toDef} XLight")${td2}}
@font-face{font-family:"${toBeDef}";font-weight:100;src:local("${toDef} UltraLight")${td2}}
@font-face{font-family:"${toBeDef}";font-weight:200;src:local("${toDef} Thin")${td2}}
@font-face{font-family:"${toBeDef}";font-weight:400 500;src:local("${toDef} Regular")${td2}}
@font-face{font-family:"${toBeDef}";font-weight:500;src:local("${toDef} Medium")${td2}}
@font-face{font-family:"${toBeDef}";font-weight:600 1000;src:local("${toDef} Bold")${td2}}
@font-face{font-family:"${toBeDef}";font-weight:600 1000;src:local("${toDef} SemiBold")${td2}}
@font-face{font-family:"${toBeDef}";font-weight:700 1000;src:local("${toDef} Bold")${td2}}
@font-face{font-family:"${toBeDef}";font-weight:600;src:local("${toDef} SemiBold")${td2}}
`;
旧方案，支持msyh pf 更纱*/
  let _css = '';
  for(let s of fonts.get(toDef.substring(0,6))) {
    _css += `@font-face{font-family:"${toBeDef}";font-weight:${s[1]};src:local("${toDef}${s[0]}")}\n`;
  }
  return _css;
}

let _css = '';
for (let s of GM_getValue('replaceFont')) {
  _css += newCSS(s, customFont);
}
for (let s of GM_getValue('replaceFontUI')) {
  _css += newCSS(s, customFontUI);
}
// Firefox/Chrome（Windows）里sans-serif、system-ui无效，前者可设默认字体，后者不越过浏览器暂时没找到解决方法。
//_css += newCSS('sans-serif',customFont);
//_css += newCSS('system-ui',customFontUI);
_css += newCSS('ui-sans-serif',customFontUI);

GM_addStyle(_css);
