// ==UserScript==
// @name         知乎优化（未完成）
// @namespace    https://github.com/THR-hub/personal-GM-scripts
// @version      2025-08-19
// @description  目前已有功能：修改标题去掉消息数，去除高亮搜索，恢复旧版[惊喜]表情。
// @author       T_H_R
// @match        *://*.zhihu.com/*
// @icon         https://static.zhihu.com/heifetz/favicon.ico
// @run-at       document-end
// @grant        none
// ==/UserScript==

addStyle = (style) => {
  const temp=document.createElement('style');temp.innerText=style;document.head.appendChild(temp);
};

(function () {
    'use strict';
    clearTitles();
    clearHighlightLink();
    oldStyleSurpriseSticker();
    // see https://www.zhihu.com/question/554983886/answer/2687877961
    addStyle(`@-moz-document url-prefix(){body{overflow-anchor:none}}`);
})();

// 参考 https://greasyfork.org/scripts/419081
function clearTitles() { // 去除标题消息提示

    const observer = new MutationObserver(() => {
        document.title = document.title.match(/.+(消息|私信)\) ?(.*)/)[2]; // 报错是正常的，否则页面会卡住
    });
    observer.observe(document.head.querySelector('title'), { childList: true });

}

function clearHighlightLink() { // 去除相关搜索

    const observer = new MutationObserver(() => {
        observer.disconnect();
        //console.log('DOM Changed');
        requestIdleCallback(() => {
            //let all = Array.from(document.getElementsByClassName('RichContent-EntityWord'));
            let all = document.querySelectorAll('.RichContent-EntityWord');
            all.forEach((e) => e.parentElement.outerHTML = e.innerText);
            observer.observe(document.body, { childList: true, subtree: true, attribute: false });
        });
    });
    observer.observe(document.body, { childList: true, subtree: true, attribute: false });

}

function oldStyleSurpriseSticker() { // 替换[惊喜]表情为旧版

    const observer = new MutationObserver(() => {
        observer.disconnect();
        //console.log('DOM Changed');
        requestIdleCallback(() => {
            //let all = Array.from(document.getElementsByClassName('sticker'));
            let all = document.querySelectorAll('.sticker');
            all.forEach((e) => {
                if (e.alt === '[惊喜]' && e.src.at(-5) === '3') { // 新版为 https://pic1.zhimg.com/v2-5c9b7521eb16507c9d2f747f3a32a813.png
                    e.src = 'https://pic1.zhimg.com/v2-3846906ea3ded1fabbf1a98c891527fb.png';
                }
            });
            observer.observe(document.body, { childList: true, subtree: true, attribute: false });
        });
    });
    observer.observe(document.body, { childList: true, subtree: true, attribute: false });

}