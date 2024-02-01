// ==UserScript==
// @name         百度-根据UA自动跳转桌面版
// @version      1.0
// @description  当User-Agent信息为桌面端时，百度移动版自动跳转桌面版，特别适合安卓平板火狐。
// @author       T_H_R
// @icon         https://www.baidu.com/favicon.ico
// @match        *://m.baidu.com/s*
// @license      MIT
// @grant        none
// @run-at       document-start
// @supportURL   https://github.com/THR-hub/baidu_redirect_according_to_UA/issues
// @namespace    https://github.com/THR-hub/baidu_redirect_according_to_UA
// ==/UserScript==

(function() {
    'use strict';
    var ua_info=navigator.userAgent;
    if(/(?:Windows|Linux|Macintosh)/.test(ua_info))
    {
        var present_url=location.href;
        var jump_to_url=(present_url[4]==="s")?(present_url.substring(0,8)+"www"+present_url.substring(9)):(present_url.substring(0,7)+"www"+present_url.substring(8));
        window.location.href=jump_to_url;
    }
})();
