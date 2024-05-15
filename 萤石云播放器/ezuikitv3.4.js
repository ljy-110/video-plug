/**
 * jssdk 3.4.1
 */
(function (global, factory) {

    "use strict";

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("EZUIPlayer requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }

    // Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {

    /**
     * @preserve HTML5 Shiv 3.7.3 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
     */
    ! function (a, b) {
        function c(a, b) {
            var c = a.createElement("p"),
                d = a.getElementsByTagName("head")[0] || a.documentElement;
            return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
        }

        function d() {
            var a = t.elements;
            return "string" == typeof a ? a.split(" ") : a
        }

        function e(a, b) {
            var c = t.elements;
            "string" != typeof c && (c = c.join(" ")), "string" != typeof a && (a = a.join(" ")), t.elements = c +
                " " + a, j(b)
        }

        function f(a) {
            var b = s[a[q]];
            return b || (b = {}, r++, a[q] = r, s[r] = b), b
        }

        function g(a, c, d) {
            if (c || (c = b), l) return c.createElement(a);
            d || (d = f(c));
            var e;
            return e = d.cache[a] ? d.cache[a].cloneNode() : p.test(a) ? (d.cache[a] = d.createElem(a)).cloneNode() :
                d.createElem(a), !e.canHaveChildren || o.test(a) || e.tagUrn ? e : d.frag.appendChild(e)
        }

        function h(a, c) {
            if (a || (a = b), l) return a.createDocumentFragment();
            c = c || f(a);
            for (var e = c.frag.cloneNode(), g = 0, h = d(), i = h.length; i > g; g++) e.createElement(h[g]);
            return e
        }

        function i(a, b) {
            b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag =
                b.createFrag()), a.createElement = function (c) {
                return t.shivMethods ? g(c, a, b) : b.createElem(c)
            }, a.createDocumentFragment = Function("h,f",
                "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + d().join().replace(
                    /[\w\-:]+/g,
                    function (a) {
                        return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
                    }) + ");return n}")(t, b.frag)
        }

        function j(a) {
            a || (a = b);
            var d = f(a);
            return !t.shivCSS || k || d.hasCSS || (d.hasCSS = !!c(a,
                "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}"
            )), l || i(a, d), a
        }
        var k, l, m = "3.7.3",
            n = a.html5 || {},
            o = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
            p =
            /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
            q = "_html5shiv",
            r = 0,
            s = {};
        ! function () {
            try {
                var a = b.createElement("a");
                a.innerHTML = "<xyz></xyz>", k = "hidden" in a, l = 1 == a.childNodes.length || function () {
                    b.createElement("a");
                    var a = b.createDocumentFragment();
                    return "undefined" == typeof a.cloneNode || "undefined" == typeof a.createDocumentFragment ||
                        "undefined" == typeof a.createElement
                }()
            } catch (c) {
                k = !0, l = !0
            }
        }();
        var t = {
            elements: n.elements ||
                "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
            version: m,
            shivCSS: n.shivCSS !== !1,
            supportsUnknownElements: l,
            shivMethods: n.shivMethods !== !1,
            type: "default",
            shivDocument: j,
            createElement: g,
            createDocumentFragment: h,
            addElements: e
        };
        a.html5 = t, j(b), "object" == typeof module && module.exports && (module.exports = t)
    }("undefined" != typeof window ? window : this, document);

    /*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */
    if ("document" in self) {
        if (!("classList" in document.createElement("_"))) {
            (function (j) {
                "use strict";
                if (!("Element" in j)) {
                    return
                }
                var a = "classList",
                    f = "prototype",
                    m = j.Element[f],
                    b = Object,
                    k = String[f].trim || function () {
                        return this.replace(/^\s+|\s+$/g, "")
                    },
                    c = Array[f].indexOf || function (q) {
                        var p = 0,
                            o = this.length;
                        for (; p < o; p++) {
                            if (p in this && this[p] === q) {
                                return p
                            }
                        }
                        return -1
                    },
                    n = function (o, p) {
                        this.name = o;
                        this.code = DOMException[o];
                        this.message = p
                    },
                    g = function (p, o) {
                        if (o === "") {
                            throw new n("SYNTAX_ERR", "An invalid or illegal string was specified")
                        }
                        if (/\s/.test(o)) {
                            throw new n("INVALID_CHARACTER_ERR", "String contains an invalid character")
                        }
                        return c.call(p, o)
                    },
                    d = function (s) {
                        var r = k.call(s.getAttribute("class") || ""),
                            q = r ? r.split(/\s+/) : [],
                            p = 0,
                            o = q.length;
                        for (; p < o; p++) {
                            this.push(q[p])
                        }
                        this._updateClassName = function () {
                            s.setAttribute("class", this.toString())
                        }
                    },
                    e = d[f] = [],
                    i = function () {
                        return new d(this)
                    };
                n[f] = Error[f];
                e.item = function (o) {
                    return this[o] || null
                };
                e.contains = function (o) {
                    o += "";
                    return g(this, o) !== -1
                };
                e.add = function () {
                    var s = arguments,
                        r = 0,
                        p = s.length,
                        q, o = false;
                    do {
                        q = s[r] + "";
                        if (g(this, q) === -1) {
                            this.push(q);
                            o = true
                        }
                    } while (++r < p);
                    if (o) {
                        this._updateClassName()
                    }
                };
                e.remove = function () {
                    var t = arguments,
                        s = 0,
                        p = t.length,
                        r, o = false,
                        q;
                    do {
                        r = t[s] + "";
                        q = g(this, r);
                        while (q !== -1) {
                            this.splice(q, 1);
                            o = true;
                            q = g(this, r)
                        }
                    } while (++s < p);
                    if (o) {
                        this._updateClassName()
                    }
                };
                e.toggle = function (p, q) {
                    p += "";
                    var o = this.contains(p),
                        r = o ? q !== true && "remove" : q !== false && "add";
                    if (r) {
                        this[r](p)
                    }
                    if (q === true || q === false) {
                        return q
                    } else {
                        return !o
                    }
                };
                e.toString = function () {
                    return this.join(" ")
                };
                if (b.defineProperty) {
                    var l = {
                        get: i,
                        enumerable: true,
                        configurable: true
                    };
                    try {
                        b.defineProperty(m, a, l)
                    } catch (h) {
                        if (h.number === -2146823252) {
                            l.enumerable = false;
                            b.defineProperty(m, a, l)
                        }
                    }
                } else {
                    if (b[f].__defineGetter__) {
                        m.__defineGetter__(a, i)
                    }
                }
            }(self))
        } else {
            (function () {
                var b = document.createElement("_");
                b.classList.add("c1", "c2");
                if (!b.classList.contains("c2")) {
                    var c = function (e) {
                        var d = DOMTokenList.prototype[e];
                        DOMTokenList.prototype[e] = function (h) {
                            var g, f = arguments.length;
                            for (g = 0; g < f; g++) {
                                h = arguments[g];
                                d.call(this, h)
                            }
                        }
                    };
                    c("add");
                    c("remove")
                }
                b.classList.toggle("c3", false);
                if (b.classList.contains("c3")) {
                    var a = DOMTokenList.prototype.toggle;
                    DOMTokenList.prototype.toggle = function (d, e) {
                        if (1 in arguments && !this.contains(d) === !e) {
                            return e
                        } else {
                            return a.call(this, d)
                        }
                    }
                }
                b = null
            }())
        }
    };


    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //�·�
            "d+": this.getDate(), //��
            "h+": this.getHours(), //Сʱ
            "m+": this.getMinutes(), //��
            "s+": this.getSeconds(), //��
            "q+": Math.floor((this.getMonth() + 3) / 3), //����
            "S": this.getMilliseconds() //����
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[
                k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };


    var Domain = 'https://open.ys7.com';
    var logDomain = 'https://log.ys7.com/statistics.do';

    var jqueryJS = Domain + '/sdk/js/2.0/js/jquery.min.js';
    var ckplayerJS = Domain + '/sdk/js/2.0/js/ckplayer/ckplayer.js';
    var ckplayerSWF = Domain + '/sdk/js/2.0/js/ckplayer/ckplayer.swf';
    var m3u8SWF = Domain + '/sdk/js/2.0/js/ckplayer/m3u8.swf';
    var flv_js = Domain + '/sdk/js/2.0/js/flv.min.js';
    var hlsJS = Domain + '/sdk/js/2.0/js/hls.min.js';
    var mpegJS = Domain + '/sdk/js/2.0/js/jsmpeg.min.js';
    var wav = Domain + '/sdk/js/2.0/js/wav-audio-encoder.js';


    // ��ǰҳ���Ƿ���httpsЭ��
    var isHttps = window.location.protocol === 'https:' ? true : false;
    // �Ƿ�Ϊ�ƶ���
    var isMobile = !!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|ios|SymbianOS)/i);
    var testVideo = document.createElement('video');
    // �Ƿ�֧��video��ǩ��addEventListener��������ҪΪ������ie8��
    var isModernBrowser = !!testVideo.canPlayType && !!window.addEventListener;
    // �Ƿ���ʹ��videoԭ������hls��Ŀǰֻ��safari����֧��ԭ��video���š�
    var isNativeSupportHls = isModernBrowser && testVideo.canPlayType('application/vnd.apple.mpegURL');
    // �Ƿ���ʹ��hls.js����
    var isSupportHls = false;
    // �Ƿ�ʹ��flash
    var useFlash = false;
    // ��ʼ������ʱ��
    var playStartTime = new Date().getTime();
    // ������Ϣ�ϱ�
    var LOCALINFO = 'open_netstream_localinfo';
    // Ԥ�������ϱ�
    var PLAY_MAIN = 'open_netstream_play_main';
    // ��־�ϱ�����Ӧ�ö����ϱ���
    var LOCALINFO_EZUIKIT = 'open_ezuikit_localinfo';
    var PERFORMANCE_EZUIKIT = 'open_ezuikit_performance';
    var appKey = "";

    function dclog(obj) {
        var domain = window.location.protocol + '//' + window.location.host;
        var logObj = {
            Ver: 'v.2.6.5',
            PlatAddr: domain,
            ExterVer: 'Ez.2.6.5',
            OpId: uuid(),
            CltType: 102,
            AppId: appKey,
            StartTime: (new Date()).Format('yyyy-MM-dd hh:mm:ss.S'), // ÿ����־������ǰ��ʱ��
            OS: navigator.platform
        }
        for (var i in obj) {
            logObj[i] = obj[i];
        }

        var tempArray = [];
        for (var j in logObj) {
            tempArray.push(j + '=' + logObj[j]);
        }
        var params = '?' + tempArray.join('&');
        // �ϱ�һ�α���ͳ����Ϣ
        // var img = new Image();
        // img.src = logDomain + params;
    }
    // ��־�ϱ�-2019-09-10
    function ezuikitDclog(obj) {
        var domain = window.location.protocol + '//' + window.location.host;
        var logObj = {
            version: 'v.2.6.5',
            plate_addr: domain,
            appId: appKey,
            st: new Date().getTime(), // ÿ����־������ǰ��ʱ��
        }
        for (var i in obj) {
            logObj[i] = obj[i];
        }

        var tempArray = [];
        for (var j in logObj) {
            tempArray.push(j + '=' + logObj[j]);
        }
        var params = '?' + tempArray.join('&');
        // �ϱ�һ�α���ͳ����Ϣ
        var img = new Image();
        img.src = logDomain + params;
    }

    var RTMP_REG = /^rtmp/;
    var HLS_REG = /\.m3u8/;

    // ��ȡԪ����ʽ
    function getStyle(el) {
        return window.getComputedStyle ?
            window.getComputedStyle(el, null) :
            el.currentStyle;
    }

    // ����js
    function addJs(filepath, callback) {
        var headerScript = document.getElementsByTagName('head')[0].getElementsByTagName("script");
        var isReady = false;

        for (var i = 0; i < headerScript.length; i++) {
            if (headerScript[i].getAttribute("src") == filepath) {
                isReady = true;
                callback();
            }
        }
        if (!isReady) {
            var oJs = document.createElement("script");
            oJs.setAttribute("src", filepath);
            oJs.onload = callback;
            document.getElementsByTagName("head")[0].appendChild(oJs);
        }
    }

    function addCss(filepath, callback) {
        var headerLink = document.getElementsByTagName('head')[0].getElementsByTagName("link");
        var isReady = false;

        for (var i = 0; i < headerLink.length; i++) {
            if (headerLink[i].getAttribute("href") == filepath) {
                isReady = true;
            }
        }

        if (!isReady) {
            var oJs = document.createElement('link');
            oJs.rel = 'stylesheet';
            oJs.type = 'text/css';
            oJs.href = filepath;
            oJs.onload = callback;
            document.getElementsByTagName("head")[0].appendChild(oJs);
        }
    }
    // ͨ�����󷽷�
    function request(url, method, params, header, success, error) {
        var _url = url;
        var http_request = new XMLHttpRequest();
        http_request.onreadystatechange = function () {
            if (http_request.readyState == 4) {
                if (http_request.status == 200) {
                    if (isJSON(http_request.responseText)) {
                        var _data = JSON.parse(http_request.responseText);
                        success(_data);
                    } else {
                        success(http_request.responseText)
                    }
                }
            }
        };
        http_request.open(method, _url, true);
        // http_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var data = new FormData();
        for (var i in params) {
            data.append(i, params[i]);
        }
        http_request.send(data);
    };
    /** ��ȡurl���� */
    function getQueryString(name, url) {
        var r = new RegExp("(\\?|#|&)" + name + "=(.*?)(#|&|$)");
        var m = (url || location.href).match(r);
        return decodeURIComponent(m ? m[2] : '');
    }
    /** �ж��Ƿ�Ϊpromise���� */
    function isPromise(obj) {
        return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
    }
    /** ����uuid */
    function uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
        };
        s[14] = "4";
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
    }
    /**��ȡ��������ƣ��汾 */
    function getBrowserInfo() {
        var Sys = {};
        var ua = navigator.userAgent.toLowerCase();
        var re = /(msie|firefox|chrome|opera|version).*?([\d.]+)/;
        var m = ua.match(re);
        try {
            Sys.browser = m[1].replace(/version/, "'safari");
            Sys.ver = m[2];
        } catch (e) {
            console.log("getBrowserInfo fail.")
        }
        return Sys;
    }
    /** �Ƿ�ΪJSON��ʽ�ַ��� */
    function isJSON(str) {
        if (typeof str == 'string') {
            try {
                var obj = JSON.parse(str);
                if (typeof obj == 'object' && obj) {
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                return false;
            }
        }
        console.log('It is not a string!')
    }
    /** insertAfter */
    function insertAfter(newElement, targetElement) {
        var parent = targetElement.parentNode;
        if (parent.lastChild == targetElement) {
            parent.appendChild(newElement);
        } else {
            parent.insertBefore(newElement, targetElement.nextSibling);
        }
    }



    var EZUIPlayer = function (playParams) {
        if (!isModernBrowser) {
            throw new Error('不支持ie8等低版本浏览器');
            return;
        }
        /**���岥�������� */
        this.opt = {};
        this.opt.sources = [];
        this.handlers = {};

        // �޶� - ֧��JS Decoder �������ַ���������
        if (typeof playParams === 'object' && playParams.hasOwnProperty('decoderPath')) {
            if (typeof playParams.audioId === 'undefined') {
                playParams["audioId"] = 0;
            }
            this.playParams = playParams;
            /* У�鲥�������ò����Ϸ��� */
            var oS = document.createElement('style');
            document.getElementsByTagName("head")[0].appendChild(oS);
            oS.innerHTML = '.draw-window {border: none!important}';
            // ������·��
            if (typeof playParams.decoderPath !== 'string' || typeof playParams.decoderPath === 'undefined') {
                throw new Error('EZUIDecoder requires the path of decoder');
                return;
            }
            // Id
            if (typeof playParams.id !== 'string' || typeof playParams.id === 'undefined') {
                throw new Error('EZUIDecoder requires parameter id');
                return;
            }
            if (typeof playParams.url !== 'string' || typeof playParams.url === 'undefined') {
                throw new Error('EZUIDecoder requires parameter url');
                return;
            }
            // ״̬��ʾ
            this.loadingStart = function () {
                var oS = document.createElement('style');
                document.getElementsByTagName("head")[0].appendChild(oS);
                oS.innerHTML =
                    '@keyframes antRotate {to {transform: rotate(400deg);transform-origin:50% 50%;}} .loading {display: inline-block;z-index: 1000;-webkit-animation: antRotate 1s infinite linear;animation: antRotate 1s infinite linear;}';
                if (playParams && playParams.id) {
                    var domId = playParams.id;
                    var domElement = document.getElementById(domId);
                    var windowWidth = domElement.offsetWidth;
                    var windowHeight = domElement.offsetHeight || playParams.height || 400;
                    var offsetTop = domElement.offsetTop;
                    var offsetLeft = domElement.offsetLeft;
                    // ��ִ�����loading
                    if (document.getElementById('loading-id-0')) {
                        document.getElementById('loading-id-0').parentNode.removeChild(document.getElementById(
                            'loading-id-0'))
                    }
                    var loadingContainerDOM = document.createElement('div');
                    loadingContainerDOM.setAttribute('id', 'loading-id-0');
                    var style = 'position:absolute;outline:none;'
                    style += 'width: 0px;'
                    style += 'height: 0px;'
                    style += 'top:' + offsetTop + 'px;'
                    style += 'left:' + offsetLeft + 'px;'

                    loadingContainerDOM.setAttribute('style', style);
                    var loadingContainer = document.getElementById("loading-id-0");
                    loadingContainerDOM.style.height = windowHeight;

                    loadingContainerDOM.setAttribute('class', 'loading-container');
                    // loadingContainerDOM.innerHTML= loading;


                    insertAfter(loadingContainerDOM, domElement);

                    var splitBasis = playParams.splitBasis || 1;
                    var windowLength = playParams.url.split(",").length;
                    for (var i = 0; i < windowLength; i++) {
                        var loadingContainer = document.createElement('div');
                        var loadingStatusDOM = document.createElement('div');
                        loadingContainer.setAttribute('class', 'loading-item');
                        loadingContainer.setAttribute('id', 'loading-item-' + i);
                        //loadingContainer.setAttribute('style','display:inline-flex;flex-direction:column;justify-content:center;align-items: center;width:'+(windowWidth / splitBasis)+'px;height:'+(windowHeight /splitBasis )+'px;outline:none;vertical-align: top;position:absolute');
                        var style =
                            'display:inline-flex;flex-direction:column;justify-content:center;align-items: center;width:' +
                            (windowWidth / splitBasis) + 'px;height:' + (windowHeight / splitBasis) +
                            'px;outline:none;vertical-align: top;position:absolute;';
                        style += ('left:' + calLoadingPostion(windowHeight, windowWidth, splitBasis, i).left +
                            'px;');
                        style += ('top:' + calLoadingPostion(windowHeight, windowWidth, splitBasis, i).top +
                            'px;');
                        loadingContainer.setAttribute('style', style);

                        function calLoadingPostion(windowHeight, windowWidth, splitBasis, i) {
                            var top = parseInt(i / splitBasis, 10) * (windowHeight / splitBasis);
                            var left = (i % splitBasis) * (windowWidth / splitBasis);
                            return {
                                top: top,
                                left: left
                            }
                        }
                        var loadingDOM = document.createElement('div');
                        loadingStatusDOM.innerHTML = "";
                        loadingStatusDOM.style.color = "#fff";
                        loadingDOM.setAttribute('class', 'loading');
                        var loading =
                            '<svg t="1567069979438" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2399" width="32" height="32"><path d="M538.5344 266.4448a133.12 133.12 0 1 1 133.12-133.12 133.4272 133.4272 0 0 1-133.12 133.12zM255.0144 372.1984a121.6768 121.6768 0 1 1 121.6768-121.6768 121.856 121.856 0 0 1-121.6768 121.6768zM134.72 647.424a107.3664 107.3664 0 1 1 107.3664-107.264A107.52 107.52 0 0 1 134.72 647.424z m120.32 272.4608a90.9824 90.9824 0 1 1 90.9824-90.9824A91.1616 91.1616 0 0 1 255.04 919.8848zM538.5344 1024a79.36 79.36 0 1 1 79.36-79.36 79.36 79.36 0 0 1-79.36 79.36z m287.6928-134.144a64.1792 64.1792 0 1 1 64.1792-64.1792 64.3584 64.3584 0 0 1-64.1792 64.1792z m117.76-296.704a52.6336 52.6336 0 1 1 52.6592-52.6336 52.608 52.608 0 0 1-52.6336 52.6336z m-158.72-338.7136a40.96 40.96 0 1 1 12.0064 28.8512 40.5248 40.5248 0 0 1-12.0064-28.8512z" fill="#ffffff" p-id="2400"></path></svg>';
                        if (playParams.loading && playParams.loading.svg) {
                            loading = playParams.loading.svg;
                        }
                        loadingDOM.innerHTML = loading;
                        loadingContainer.appendChild(loadingDOM);
                        // loadingContainer.appendChild(loading);
                        loadingContainer.appendChild(loadingStatusDOM);
                        loadingContainerDOM.appendChild(loadingContainer)
                    }
                }

            }
            this.loadingSet = function (index, opt) {
                var loadingContainer = document.getElementById('loading-id-0');
                if (document.getElementById('loading-item-' + index)) {
                    var textElement = document.getElementById('loading-item-' + index).childNodes[1];
                    textElement.innerHTML = opt.text;
                    if (opt.color) {
                        textElement.style.color = opt.color;
                    }
                }
            }
            this.loadingSetIcon = function (i, type) {
                var _this = this;
                if (playParams && playParams.id) {
                    var domId = playParams.id;
                    var domElement = document.getElementById(domId);
                    var windowWidth = domElement.offsetWidth;
                    var windowHeight = domElement.offsetHeight || playParams.height || 400;
                    var offsetTop = domElement.offsetTop;
                    var offsetLeft = domElement.offsetLeft;
                    // ��ִ�����loading
                    if (document.getElementById('loading-id-0')) {
                        document.getElementById('loading-id-0').parentNode.removeChild(document.getElementById(
                            'loading-id-0'))
                    }
                    var loadingContainerDOM = document.createElement('div');
                    loadingContainerDOM.setAttribute('id', 'loading-id-0');
                    var style = 'position:absolute;outline:none;'
                    style += 'width: 0px;'
                    style += 'height: 0px;'
                    style += 'top:' + offsetTop + 'px;'
                    style += 'left:' + offsetLeft + 'px;'

                    loadingContainerDOM.setAttribute('style', style);
                    var loadingContainer = document.getElementById("loading-id-0");
                    loadingContainerDOM.style.height = windowHeight;

                    loadingContainerDOM.setAttribute('class', 'loading-container');
                    insertAfter(loadingContainerDOM, domElement);

                    var splitBasis = playParams.splitBasis || 1;
                    var windowLength = playParams.url.split(",").length;
                    var loadingContainer = document.createElement('div');
                    var loadingStatusDOM = document.createElement('div');
                    loadingContainer.setAttribute('class', 'loading-item');
                    loadingContainer.setAttribute('id', 'loading-item-' + i);
                    //loadingContainer.setAttribute('style','display:inline-flex;flex-direction:column;justify-content:center;align-items: center;width:'+(windowWidth / splitBasis)+'px;height:'+(windowHeight /splitBasis )+'px;outline:none;vertical-align: top;position:absolute');
                    var style =
                        'display:inline-flex;flex-direction:column;justify-content:center;align-items: center;width:' +
                        (windowWidth / splitBasis) + 'px;height:' + (windowHeight / splitBasis) +
                        'px;outline:none;vertical-align: top;position:absolute;';
                    style += ('left:' + calLoadingPostion(windowHeight, windowWidth, splitBasis, i).left +
                        'px;');
                    style += ('top:' + calLoadingPostion(windowHeight, windowWidth, splitBasis, i).top +
                        'px;');
                    loadingContainer.setAttribute('style', style);

                    function calLoadingPostion(windowHeight, windowWidth, splitBasis, i) {
                        var top = parseInt(i / splitBasis, 10) * (windowHeight / splitBasis);
                        var left = (i % splitBasis) * (windowWidth / splitBasis);
                        return {
                            top: top,
                            left: left
                        }
                    }
                    var loadingDOM = document.createElement('div');
                    loadingStatusDOM.innerHTML = "";
                    loadingStatusDOM.style.color = "#fff";
                    loadingDOM.setAttribute('class', type);
                    var icon = '';
                    switch (type) {
                        case 'retry':
                            icon =
                                '<svg t="1590935684181" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1623" width="32" height="32"><path d="M972.8 102.4c-30.72 0-51.2 20.48-51.2 51.2v51.2c-51.2-71.68-122.88-128-204.8-158.72C460.8-66.56 158.72 51.2 46.08 307.2S51.2 865.28 307.2 977.92 865.28 972.8 977.92 716.8H972.8c0-30.72-20.48-51.2-51.2-51.2s-51.2 20.48-51.2 51.2h-5.12c-46.08 76.8-112.64 138.24-199.68 174.08-209.92 87.04-445.44-15.36-532.48-225.28S148.48 215.04 358.4 133.12c189.44-81.92 404.48 0 506.88 174.08H768c-30.72 0-51.2 20.48-51.2 51.2s20.48 51.2 51.2 51.2h204.8c30.72 0 51.2-20.48 51.2-51.2V153.6c0-30.72-20.48-51.2-51.2-51.2z" p-id="1624" fill="#ffffff"></path></svg>';
                            loadingDOM.style.cursor = 'pointer';
                            loadingDOM.onclick = function () {
                                console.log("点击重试", i);
                                // _this.loadingStart();
                                _this.play(i);
                            }
                            break;
                    }

                    loadingDOM.innerHTML = icon;
                    loadingContainer.appendChild(loadingDOM);
                    loadingContainer.appendChild(loadingStatusDOM);
                    loadingContainerDOM.appendChild(loadingContainer)

                }
            }
            this.loadingEnd = function (index) {
                var loadingItemContainerDOM = document.getElementById('loading-item-' + index);
                if (loadingItemContainerDOM) {
                    loadingItemContainerDOM.parentNode.removeChild(loadingItemContainerDOM);
                    var loadingContainerDOM = document.getElementById('loading-id-0');
                    if (loadingContainerDOM && loadingContainerDOM.children.length === 0) {
                        loadingContainerDOM.parentNode.removeChild(loadingContainerDOM);
                    }
                }
            }
            // �����ŵ�ַ������ʵ�� opt ������
            this.opt.sources.push(playParams.url);
            // JSDecoder  ֻ��һ�����ŵ�ַ
            this.opt.currentSource = this.opt.sources[0];

            /* ��ȡ�������û������� - ��ʼ */
            /** 
             * ����ģʽ����
             * ��ͨ��dev����ָ��API��������
             */
            var domain = "https://open.ys7.com";
            if (playParams.env) {
                var environmentParams = playParams.env;
                domain = environmentParams.domain;
            }

            /** ����jSPlugin ���� */
            this.jSPlugin = {};
            var _this = this;
            /** ���ݲ��Ų�����ȡ��ʵ���ŵ�ַ */
            this.loadingStart();
            playStartTime = new Date().getTime();
            // var getRealUrl = this.getRealUrl(playParams);
            var initDecoder = this.initDecoder(playParams);
            // ��ʼ��������
            _this.loadingSet(0, {
                text: _this.opt.domain !== 'open' ? 'Initialize the player...' : '初始化播放器...'
            });
            if (isPromise(initDecoder)) {
                initDecoder.then(function (data) {
                    _this.loadingSet(0, {
                        text: _this.opt.domain !== 'open' ? 'Initialization is complete' : '初始化完成'
                    });
                    _this.loadingEnd(0);
                    if (playParams.autoplay) {
                        setTimeout(function () {
                            _this.play();
                        }, 2000)
                    }
                })
            }
        } else {
            var domain = "https://open.ys7.com";
            if (playParams && playParams.env) {
                domain = playParams.env.domain;
            }
            var elementID = '';
            if (typeof playParams === 'string') { //��дģʽ new EZUIPlayer('myplayer')
                elementID = playParams;
            } else if (typeof playParams === 'object') { //��׼ģʽ new EZUIPlayer({id: 'myplayer'})
                elementID = playParams.id;
            }
            this.videoId = elementID;
            this.video = document.getElementById(elementID);
            if (!this.video) {
                throw new Error('EZUIPlayer requires parameter videoId');
            }
            var sources = this.video.getElementsByTagName('source');
            // תΪ������󣬲���removeChildӰ��
            sources = Array.prototype.slice.call(sources, 0);

            if (this.video.src) {
                // �ƶ���ɾ��rtmp��ַ
                if (isMobile && RTMP_REG.test(this.video.src)) {
                    this.video.removeAttribute('src');
                    this.video.load();
                } else {
                    this.opt.sources.push(this.video.src);
                }
            }

            var l = sources.length;
            if (l > 0) {
                for (var i = 0; i < l; i++) {
                    // �ƶ���ɾ��rtmp��ַ
                    if (isMobile && RTMP_REG.test(sources[i].src)) {
                        this.video.removeChild(sources[i]);
                    } else {
                        this.opt.sources.push(sources[i].src);
                    }
                }
            }
            if (this.opt.sources.length < 1) {
                throw new Error('no source found in video tag.');
            }
            this.opt.cur = 0;
            this.opt.poster = this.video.poster;
            var videoStyle = getStyle(this.video);
            var width = this.video.width;
            var height = this.video.height;
            if (width) {
                this.opt.width = width;
                if (height) {
                    this.opt.height = height;
                } else {
                    this.opt.height = 'auto';
                }
                this.log('video width:' + this.opt.width + ' height:' + this.opt.height);
            } else {
                this.opt.width = videoStyle.width;
                this.opt.height = videoStyle.height;
                this.log('videoStyle.width:' + videoStyle.width + ' wideoStyle.height:' + videoStyle.height);
            }
            this.opt.parentId = elementID;
            this.opt.autoplay = this.video.autoplay ? true : false;
            this.log('autoplay:' + this.video.autoplay);

            this.opt.currentSource = this.opt.sources[this.opt.cur];
            this.getRealUrl(playParams);
        }

        /* �������ţ�����ֹͣ�¼����ӣ��ϱ��û���Ϊ */
        this.handlers = {};
        this.initTime = (new Date()).getTime();
        this.on('play', function () {
            // �ϱ����ųɹ���Ϣ
            dclog({
                systemName: PLAY_MAIN,
                playurl: this.opt.currentSource,
                Time: (new Date()).Format('yyyy-MM-dd hh:mm:ss.S'),
                Enc: 0, // 0 ������ 1 ����
                PlTp: 1, // 1 ֱ�� 2 �ط�
                Via: 911, // 2 ˽���� 911 ��׼��
                ErrCd: 0,
                OpId: uuid(),
                Cost: (new Date()).getTime() - this.initTime // ������
            });
        });
        this.retry = 2;
        this.on('error', function () {
            dclog({
                systemName: PLAY_MAIN,
                playurl: this.opt.currentSource,
                cost: -1,
                ErrCd: -1,
                Via: 911, // 2 ˽���� 911 ��׼��
                OpId: uuid(),
            });
        });
        var deviceSerial = '';
        var playUid = '';
        var accessToken = '';
        var uuidReg = /[a-z0-9]{32}/;
        var deviceSerialReg = /[a-zA-Z0-9]{9}\/[0-9]{0,2}\./;
        if (typeof playParams === 'string') {
            var url = this.opt.currentSource;
            if (uuidReg.test(url)) {
                playUid = url.match(uuidReg)[0];
            } else if (deviceSerialReg.test(url)) {
                deviceSerial = url.match(deviceSerialReg)[0].split('/')[0];
            }
        } else if (typeof playParams === 'object') {
            var url = playParams.url;
            if (uuidReg.test(url)) {
                playUid = url.match(uuidReg);
            } else if (deviceSerialReg.test(url)) {
                deviceSerial = url.match(deviceSerialReg)[0].split('/')[0];
            }
            if (playParams.accessToken) {
                accessToken = playParams.accessToken;
            }
        }
        if (domain === "https://open.ys7.com") {
            var appInfoSuccess = function (data) {
                if (data.retcode === 0 && data.data) {
                    appKey = data.data.appKey;
                }
                // �ϱ�һ�α�����Ϣ
                dclog({
                    systemName: LOCALINFO,
                });
                // �ϱ�һ�α�����Ϣ-��
                // ezuikitDclog({
                //     systemName: LOCALINFO_EZUIKIT,
                //     os: navigator.platform,
                //     browser: JSON.stringify(getBrowserInfo()),
                // })
            }
            var appInfoError = function (error) {
                // �ϱ�һ�α�����Ϣ
                dclog({
                    systemName: LOCALINFO
                });
                // �ϱ�һ�α�����Ϣ-��
                // ezuikitDclog({
                //     systemName: LOCALINFO_EZUIKIT,
                //     os: navigator.platform,
                //     browser: JSON.stringify(getBrowserInfo()),
                // })
            }
            // ��ȡappKey
            request(domain + '/jssdk/ezopen/getAppInfo?uuid=' + playUid + '&accessToken=' + accessToken +
                "&deviceSerial=" + deviceSerial + "&channelNo=1",
                'GET',
                '',
                '',
                appInfoSuccess,
                appInfoError
            );
        }
        // ȫ���仯�ص�
        function fullscreenchange(data) {
            if (!data) {
                _this.jSPlugin.JS_Resize(_this.playParams.width, _this.playParams.height);
            } else {
                _this.jSPlugin.JS_Resize(document.documentElement.clientWidth, document.documentElement.clientHeight);
            }
        }
        if (typeof document.fullScreen !== "undefined") {
            document.addEventListener("fullscreenchange", function () {
                var e = document.fullscreen || false;
                fullscreenchange(e)
            })
        } else if (typeof document.webkitIsFullScreen !== "undefined") {
            document.addEventListener("webkitfullscreenchange", function () {
                var e = document.webkitIsFullScreen || false;
                console.log("EEEEEE-1", e);
                fullscreenchange(e)
            })
        } else if (typeof document.mozFullScreen !== "undefined") {
            document.addEventListener("mozfullscreenchange", function () {
                var e = document.mozFullScreen || false;
                fullscreenchange(e)
            })
        }
    };

    // �¼�����
    EZUIPlayer.prototype.on = function (eventName, callback) {
        if (typeof eventName !== 'string' || typeof callback !== 'function') {
            return;
        }
        if (typeof this.handlers[eventName] === 'undefined') {
            this.handlers[eventName] = [];
        }
        this.handlers[eventName].push(callback);
    };

    // �¼�����
    EZUIPlayer.prototype.emit = function () {
        if (this.handlers[arguments[0]] instanceof Array) {
            var handlers = this.handlers[arguments[0]];
            var l = handlers.length;
            for (var i = 0; i < l; i++) {
                handlers[i].apply(this, Array.prototype.slice.call(arguments, 1));
            }
        }
    };
    // ��־
    EZUIPlayer.prototype.log = function (msg, className) {
        this.emit('log', msg, className);
    };

    EZUIPlayer.prototype.getRealUrl = function (playParams) {
        var _this = this;
        var apiDomain = 'https://open.ys7.com';
        /** jsDecoder ��ȡ��ʵ��ַ -- ��ʼ */
        if (playParams && playParams.hasOwnProperty('decoderPath')) {
            if (playParams.url.split(",")[0].indexOf('open.ezviz.com') !== -1) { ///����
                var host = "https://open.ys7.com";
                var hostName = playParams.url.split(",")[0].match(/ezopen:\/\/(\S*)\.ezviz\.com/)[1];
                if (playParams.env) {
                    var environmentParams = playParams.env;
                    domain = environmentParams.domain;
                    if (domain.match(/https:\/\/(\S*)\.ezviz(\S*)\.com/)) {
                        hostName = domain.match(/https:\/\/(\S*)\.ezviz(\S*)\.com/)[1];
                    }
                }
                if (hostName.indexOf("@") !== -1) {
                    hostName = hostName.split("@")[1];
                }
                switch (hostName) {
                    case 'isgpopen':
                        host = "https://isgpopen.ezvizlife.com";
                        break;
                    case 'ieuopen':
                        host = "https://ieuopen.ezvizlife.com";
                        break;
                    case 'isaopen':
                        host = "https://isaopen.ezvizlife.com";
                        break;
                    case 'irusopen':
                        host = "https://irusopen.ezvizru.com";
                        break;
                    case 'testusopen':
                        host = "https://testusopen.ezvizlife.com";
                        break;
                }
                apiDomain = host;
            }
            if (playParams && playParams.env) {
                apiDomain = playParams.env.domain;
            }
            // ������״̬
            if (playParams.url.indexOf("@") === -1) {
                const deviceInfoSuccess = function (data) {
                    if (data.code == 200 && data.data) {
                        if (data.data.isEncrypt === 1) {
                            if (playParams && playParams.handleError) {
                                playParams.handleError(Object.assign({
                                    retcode: -1,
                                    msg: '设备已经加密，请输入验证码播放'
                                }));
                            }
                        }
                    }
                }
                const deviceInfoError = function (data) {

                }
                var deviceSerial = playParams.url.split("/")[3];
                request(apiDomain + '/api/lapp/device/info', 'POST', {
                    accessToken: playParams.accessToken,
                    deviceSerial: deviceSerial
                }, '', deviceInfoSuccess, deviceInfoError);
            }
            // api ��ȡ��ʵ��ַ��ʼʱ��
            var getRealUrlDurationST = new Date().getTime();
            var getRealUrlPromise = function (resolve, reject, ezopenURL) {
                var realUrl = '';
                if (!/^ezopen:\/\//.test(ezopenURL)) { // JSDecoder wsЭ�鲥��
                    resolve(ezopenURL);
                } else {
                    // ��API������ʵ��ַ
                    var apiUrl = apiDomain + "/api/lapp/live/url/ezopen";
                    var apiSuccess = function (data) {
                        if (data.code == 200 || data.retcode == 0) {
                            var playUrl = "";
                            if (data.ext && data.ext.token) {
                                realUrl += data.data;
                                stream = data.ext.token;
                                playUrl = data.data;
                            } else if (data.data && data.data.token) {
                                realUrl += data.data.url;
                                stream = data.data.token;
                                playUrl = data.data.url;
                            }
                            var type = playParams.url.indexOf('live') !== -1 ? 'live' : 'playback';
                            if (type === 'live') {
                                realUrl = realUrl + '&ssn=' + stream + '&auth=1&biz=4&cln=100';
                            } else {
                                realUrl = realUrl + '&ssn=' + stream + '&auth=1&cln=100';
                            }
                            console.log(realUrl)

                            /**�����ݴ�����  start*/
                            if (playUrl.indexOf('playback') !== -1) { //�ط�
                                var wsBegin = getQueryString('begin', playUrl) || getQueryString(
                                    'begin', playParams.url);
                                var wsEnd = getQueryString('end', playUrl) || getQueryString('end',
                                    playParams.url);
                                // ���ݸ���ʱ���ʽ
                                if (!wsBegin) {
                                    var defaultDate = new Date();
                                    realUrl = realUrl + '&begin=' + defaultDate.Format('yyyyMMdd') +
                                        'T000000Z';
                                } else {
                                    realUrl = realUrl.replace('&begin=' + getQueryString('begin',
                                        playUrl), '&begin=' + formatRecTime(wsBegin, '000000'))
                                    if (!getQueryString('begin', realUrl)) {
                                        realUrl += '&begin=' + formatRecTime(wsBegin, '000000');
                                    }
                                }
                                if (!wsEnd) {
                                    realUrl = realUrl + '&end=' + formatRecTime(getQueryString('begin',
                                        realUrl).substr(0, 8), '235959');
                                } else {
                                    realUrl = realUrl.replace('&end=' + getQueryString('end', playUrl),
                                        '&end=' + formatRecTime(wsEnd, '235959'))
                                    if (!getQueryString('end', realUrl)) {
                                        realUrl += '&end=' + formatRecTime(wsEnd, '235959');
                                    }
                                }
                                // api������
                                if (!getQueryString('stream', playUrl)) {
                                    realUrl = realUrl.replace('stream', '&stream');
                                }
                                if (playParams.url.indexOf('.cloud') !== -1) {
                                    // ���ûط�API�ӿڻ�ȡ�ط�Ƭ�� - start
                                    var recBegin = reRormatRecTime(getQueryString('begin', realUrl));
                                    var recEnd = reRormatRecTime(getQueryString('end', realUrl));
                                    var deviceSerial = getQueryString('serial', realUrl)
                                    var channelNo = getQueryString('chn', realUrl);

                                    var recSliceUrl = apiDomain + "/api/lapp/video/by/time";
                                    var recSliceParams = {
                                        accessToken: playParams.accessToken,
                                        recType: 1,
                                        deviceSerial: deviceSerial,
                                        channelNo: channelNo,
                                        startTime: recBegin,
                                        endTime: recEnd,
                                        version: '2.0'
                                    }

                                    function recAPISuccess(data) {
                                        if (data.code == 200) {
                                            var recSliceArr = [];
                                            if (data.data && data.data.files && data.data.files.length >
                                                0) {
                                                var dataArr = data.data.files;
                                                var nextFileTime = new Date().getTime();
                                                var isAll = data.data.isAll;
                                                // mock
                                                // var number = 0;
                                                //isAll = false;
                                                if (isAll) {
                                                    recSliceArr = recSliceArrFun(dataArr);
                                                    var recSliceArrJSON = JSON.stringify(recSliceArr).replace(
                                                        '\\', '');
                                                    realUrl += ('&recSlice=' + recSliceArrJSON.replace(
                                                        '\\', '')) + '&r=' + Math.random();
                                                    resolve(realUrl);
                                                } else {
                                                    recTransaction();
                                                    // �ƴ洢�ص�����
                                                    function recTransaction() {
                                                        function recAPIV2Success(data) {
                                                            if (data.data && data.data.files && data.data
                                                                .files.length > 0) {
                                                                //if(number < 2 ) {
                                                                if (data.data.isAll == false) {
                                                                    if (data.data.files) {
                                                                        dataArr = dataArr.concat(data.data
                                                                            .files);
                                                                    }
                                                                    nextFileTime = data.data.nextFileTime >
                                                                        0 ? data.data.nextFileTime :
                                                                        new Date().getTime();
                                                                    recTransaction();
                                                                } else {
                                                                    recSliceArr = recSliceArrFun(
                                                                        dataArr);
                                                                    var recSliceArrJSON = JSON.stringify(
                                                                        recSliceArr).replace('\\',
                                                                        '');
                                                                    realUrl += ('&recSlice=' +
                                                                            recSliceArrJSON.replace(
                                                                                '\\', '')) + '&r=' +
                                                                        Math.random();
                                                                    resolve(realUrl);
                                                                }
                                                                // mock
                                                                //number = number + 1;
                                                            } else {
                                                                recSliceArr = recSliceArrFun(dataArr);
                                                                var recSliceArrJSON = JSON.stringify(
                                                                    recSliceArr).replace('\\', '');
                                                                realUrl += ('&recSlice=' +
                                                                    recSliceArrJSON.replace('\\',
                                                                        '')) + '&r=' + Math.random();
                                                                resolve(realUrl);
                                                            }
                                                        }

                                                        function recAPIV2Error(err) {
                                                            console.log(err);
                                                        }
                                                        recSliceParams.startTime = nextFileTime;
                                                        request(recSliceUrl, 'POST', recSliceParams, '',
                                                            recAPIV2Success, recAPIV2Error);
                                                    }
                                                }
                                            } else {
                                                _this.log('未找到录像片段', 'error');
                                                _this.loadingSet(0, {
                                                    text: _this.opt.domain !== 'open' ?
                                                        'Get device live view address' : '获取设备播放地址ַ'
                                                })
                                                resolve(JSON.stringify({
                                                    code: -1,
                                                    msg: _this.opt.domain !== 'open' ?
                                                        'Not found video clips' : "未找到录像片段"
                                                }))
                                                // reject('δ�ҵ�¼��Ƭ��');
                                            }
                                        } else {
                                            _this.log(data.msg, 'error');
                                            _this.loadingSet(0, {
                                                text: _this.opt.domain !== 'open' ?
                                                    'Get device live view address complete' : '获取设备播放地址ַ'
                                            });
                                            resolve(JSON.stringify({
                                                code: -1,
                                                msg: _this.opt.domain !== 'open' ?
                                                    'Not found video clips' : "未找到录像片段"
                                            }))
                                            //reject('δ�ҵ�¼��Ƭ��');
                                        }

                                        function recSliceArrFun(data) {
                                            var downloadPathArr = [];
                                            var currentDP = downloadPathArr.length
                                            data.forEach(function (item, index) {
                                                if (downloadPathArr.length == 0 || (item.downloadPath !==
                                                        downloadPathArr[downloadPathArr.length -
                                                            1].downloadPath)) {
                                                    downloadPathArr.push({
                                                        downloadPath: item.downloadPath,
                                                        ownerId: item.ownerId,
                                                        iStorageVersion: item.iStorageVersion,
                                                        videoType: item.videoType,
                                                        iPlaySpeed: 0,
                                                        startTime: item.startTime,
                                                        endTime: item.endTime
                                                    })
                                                } else {
                                                    downloadPathArr[downloadPathArr.length - 1]
                                                        .endTime = item.endTime;
                                                }
                                            })
                                            return downloadPathArr;
                                        }
                                    }

                                    function recAPIError(err) {
                                        console.log("��ȡ�ط�Ƭ�δ���")
                                    }
                                    request(recSliceUrl, 'POST', recSliceParams, '', recAPISuccess,
                                        recAPIError);

                                } else { // ���ػط�
                                    //alarm rec - start
                                    if (playParams.url.indexOf('alarmId') !== -1) {
                                        console.log("进入alarmId回放")
                                        // ���ûط�API�ӿڻ�ȡ�ط�Ƭ�� - start
                                        var alarmId = getQueryString('alarmId', realUrl)
                                        var recBegin = reRormatRecTime(getQueryString('begin', realUrl));
                                        var recEnd = reRormatRecTime(getQueryString('end', realUrl));
                                        var deviceSerial = getQueryString('serial', realUrl)
                                        var channelNo = getQueryString('chn', realUrl);

                                        var recSliceUrl = apiDomain + "/api/lapp/video/by/id";
                                        var recSliceParams = {
                                            accessToken: playParams.accessToken,
                                            // recType: 1,
                                            deviceSerial: deviceSerial,
                                            channelNo: channelNo,
                                            alarmId: alarmId,
                                            // startTime:recBegin,
                                            // endTime:recEnd
                                        }

                                        function recAPISuccess(data) {
                                            if (data.code == 200) {
                                                var recSliceArr = [];
                                                if (data.data) {
                                                    recSliceArr = recSliceArrFun([data.data]);
                                                    var recSliceArrJSON = JSON.stringify(recSliceArr).replace(
                                                        '\\', '');
                                                    realUrl += ('&recSlice=' + recSliceArrJSON.replace(
                                                        '\\', ''));
                                                    console.log("realUrl", realUrl, data.data.recType);
                                                    if (data.data.recType == 1) {
                                                        realUrl = realUrl.replace('/playback',
                                                            '/cloudplayback')
                                                    } else {
                                                        realUrl = realUrl.replace('/cloudplayback',
                                                            '/playback')

                                                    }
                                                    _this.opt.sources[0] = realUrl;
                                                    resolve(realUrl);
                                                    // request(nodeUrl, 'GET', '', '', nodeSuccess, nodeError);
                                                } else {
                                                    _this.log('未找到录像片段', 'error');
                                                    _this.loadingSet(0, {
                                                        text: _this.opt.domain !== 'open' ?
                                                            'Get device live view address' : '获取设备播放地址ַ'
                                                    })
                                                    resolve(JSON.stringify({
                                                        code: -1,
                                                        msg: _this.opt.domain !== 'open' ?
                                                            'Not found video clips' : "未找到录像片段"
                                                    }))
                                                    // reject('δ�ҵ�¼��Ƭ��');
                                                }
                                            } else {
                                                _this.log(data.msg, 'error');
                                                _this.loadingSet(0, {
                                                    text: _this.opt.domain !== 'open' ?
                                                        'Get device live view address' : '获取设备播放地址ַ'
                                                });
                                                resolve(JSON.stringify({
                                                    code: -1,
                                                    msg: _this.opt.domain !== 'open' ?
                                                        'Not found video clips' : "未找到录像片段"
                                                }))
                                                //reject('δ�ҵ�¼��Ƭ��');
                                            }

                                            function recSliceArrFun(data) {
                                                var downloadPathArr = [];
                                                var currentDP = downloadPathArr.length
                                                data.forEach(function (item, index) {
                                                    if (downloadPathArr.length == 0 || (item.downloadPath !==
                                                            downloadPathArr[downloadPathArr.length -
                                                                1].downloadPath)) {
                                                        downloadPathArr.push({
                                                            downloadPath: item.downloadPath,
                                                            ownerId: item.ownerId,
                                                            iStorageVersion: item.iStorageVersion,
                                                            videoType: item.videoType,
                                                            iPlaySpeed: 0,
                                                            startTime: item.startTime,
                                                            endTime: item.endTime
                                                        })
                                                    } else {
                                                        downloadPathArr[downloadPathArr.length -
                                                            1].endTime = item.endTime;
                                                    }
                                                })
                                                console.log("downloadPathArr", downloadPathArr)
                                                return downloadPathArr;
                                            }
                                        }

                                        function recAPIError(err) {
                                            console.log("��ȡ�ط�Ƭ�δ���")
                                        }
                                        request(recSliceUrl, 'POST', recSliceParams, '', recAPISuccess,
                                            recAPIError);
                                    } else {
                                        // arlar rec - end
                                        // request(nodeUrl, 'GET', '', '', nodeSuccess, nodeError);
                                        resolve(realUrl);
                                    }
                                }

                            } else {
                                // Ԥ��ֱ�ӻ�ȡ�ط�Ƭ��
                                // request(nodeUrl, 'GET', '', '', nodeSuccess, nodeError);
                                resolve(realUrl);
                            }
                            getPlayTokenST = new Date().getTime();
                            // ִ��һ��API���������ϱ�
                            var getRealUrlDurationET = new Date().getTime();
                            // ezuikitDclog({
                            //     systemName: PERFORMANCE_EZUIKIT,
                            //     bn: 0,
                            //     browser: JSON.stringify(getBrowserInfo()),
                            //     duration: getRealUrlDurationET - getRealUrlDurationST,
                            //     rt: 200,
                            // })
                        } else {
                            // ��������Ϣ�����û��Զ������ص���
                            if (playParams && playParams.handleError) {
                                playParams.handleError(Object.assign({
                                    retcode: data.code || -1,
                                    msg: data.msg || '其他错误'
                                }));
                            }
                            // ִ��һ��API���������������ϱ�
                            var getRealUrlDurationET = new Date().getTime();
                            // ezuikitDclog({
                            //     systemName: PERFORMANCE_EZUIKIT,
                            //     bn: 0,
                            //     browser: JSON.stringify(getBrowserInfo()),
                            //     duration: getRealUrlDurationET - getRealUrlDurationST,
                            //     rt: data.code || 500,
                            //     msg: data.msg || 'δ֪�������'
                            // })
                            resolve(JSON.stringify(data), 'error')
                            //throw new Error('��ȡ�����豸��Ϣʧ��');
                        }
                        /**�����ݴ�����  end*/
                    }
                    var apiError = function (error) {
                        // ��������Ϣ�����û��Զ������ص���
                        if (playParams && playParams.handleError) {
                            playParams.handleError(Object.assign({
                                retcode: error.code || -1,
                                msg: error.msg || '其他错误'
                            }));
                        }
                        var getRealUrlDurationET = new Date().getTime();
                        // ezuikitDclog({
                        //     systemName: PERFORMANCE_EZUIKIT,
                        //     bn: 0,
                        //     browser: JSON.stringify(getBrowserInfo()),
                        //     duration: getRealUrlDurationET - getRealUrlDurationST,
                        //     rt: 500,
                        //     msg: data.msg || '�������'
                        // })
                        resolve(JSON.stringify(error))
                        //throw new Error('��ȡ�����豸��Ϣʧ��');
                    }
                    var isHttp = 'false';
                    // if (playParams && playParams.env && playParams.env.domain) {
                    //   isHttp = playParams.env.domain.indexOf('https') !== -1 ? 'false' : 'true';
                    // } else {
                    //   isHttp = window.location.href.indexOf('https') !== -1 ? 'false' : 'true';
                    // }
                    var apiParams = {
                        ezopen: ezopenURL,
                        userAgent: window.navigator.userAgent,
                        isFlv: false,
                        addressTypes: null,
                        isHttp: isHttp,
                        accessToken: playParams.accessToken,
                    }
                    request(apiUrl, 'POST', apiParams, '', apiSuccess, apiError);
                }
            }
            var urlList = playParams.url.split(',');
            var promiseTaskList = [];
            var promiseTaskFun = function (ezopenURL) {
                return new Promise(function (resolve, reject) {
                    return getRealUrlPromise(resolve, reject, ezopenURL)
                })
            };
            urlList.map(function (item, index) {
                _this.loadingSet(index, {
                    text: _this.opt.domain !== 'open' ? 'Get device live view address' : '获取设备播放地址ַ'
                });
                var adaptHost = item.match(/ezopen:\/\/(\S*)\.com/)[1] + '.com';
                if (adaptHost.indexOf("@") !== -1) {
                    adaptHost = adaptHost.split("@")[1];
                }
                var adaptItem = item.replace(adaptHost, _this.opt.domain !== 'open' ? 'open.ezviz.com' :
                    'open.ys7.com');

                promiseTaskList.push(promiseTaskFun(adaptItem));
            });
            var getRealUrlPromiseObj = Promise.all(promiseTaskList)
                .then(function (result) {
                    // ��ȡ��ʵ��ַ�ɹ��󣬸�ֵ��opt������
                    _this.opt.sources = result;
                    _this.opt.currentSource = result[0];
                    result.forEach(function (item, index) {
                        _this.loadingSet(index, {
                            text: _this.opt.domain !== 'open' ?
                                'Get live view Address Success' : '获取播放地址成功'
                        })
                    })
                })
                .catch(function (err) {
                    _this.log("获取真实地址错误" + JSON.stringify(err), 'error')
                })
            return getRealUrlPromiseObj;
        } else {
            if (!this.opt.currentSource) {
                this.log('未找到合适的播放URL', 'error');
                return;
            }
            var me = this;
            // �������ezopen��ͷ�ģ���ԭ���Ĳ���ģʽ
            if (!/^ezopen:\/\//.test(this.opt.currentSource)) {
                this.tryPlay(this.opt.currentSource);
            } else {
                // �����ezopenЭ���ַ����У��һ�µ�ַ�ĺϷ���
                if (!/^ezopen:\/\//.test(this.opt.currentSource)) {
                    throw new Error('EZOPEN地址必须要以ezopen://开头');
                    return;
                } else if (this.opt.currentSource.indexOf('.com/') === -1) {
                    throw new Error('EZOPEN地址格式不正确');
                    return;
                } else if (!/[a-z\d]{32}(\.hd)?\.live/.test(this.opt.currentSource)) {
                    throw new Error('EZOPEN地址格式uuid格式不正确');
                    return;
                } else if (/(.*.hls.*|.*.m3u8.*|.*.wss.*|.*.flv.*|.*.rtmp.*){2,}/.test(this.opt.currentSource)) {
                    throw new Error('EZOPEN地址多于两个播放协议');
                    return;
                } else if (this.opt.currentSource.search(/(.hls|.m3u8|.wss|.flv|.rtmp)/) !== -1 && !
                    /.live(.hls|.m3u8|.wss|.flv|.rtmp)/.test(this.opt.currentSource)) {
                    throw new Error('请指定正确的播放协议');
                    return;
                } else if (this.opt.currentSource.search(/(.hls|.m3u8|.wss|.flv|.rtmp)/) === -1 && !
                    /[a-z\d]{32}(\.hd)?\.live$/.test(this.opt.currentSource)) {
                    throw new Error('EZOPEN地址结尾不正确');
                    return;
                } else {
                    /* ��ȡ���ŵ�ַ - ��ʼ */
                    var that = this;
                    addJs(flv_js, function () {
                        var para = {
                            "ezopen": that.opt.currentSource,
                            "userAgent": window.navigator.userAgent,
                            "isFlv": flvjs && flvjs.isSupported() ? flvjs.isSupported() : false,
                            "addressTypes": "HLS,RTMP,WS,FLV",
                            "isHttp": window.location.protocol.indexOf('s') > 0 ? false : true,
                        };

                        dclog({
                            "ezopen": that.opt.currentSource,
                            "userAgent": window.navigator.userAgent,
                            "isFlv": flvjs && flvjs.isSupported() ? flvjs.isSupported() : false,
                            "addressTypes": "HLS,RTMP,WS,FLV",
                            "isHttp": window.location.protocol.indexOf('s') > 0 ? false : true,
                            'systemName': 'EZOPEN',
                        });

                        that.log('---------------------------------------');
                        that.log('���(ezopen)�ǣ�   ' + para.ezopen);
                        that.log('---------------------------------------');
                        that.log('���(userAgent)�ǣ�   ' + para.userAgent);
                        that.log('---------------------------------------');
                        that.log('���(isFlv)�ǣ�   ' + para.isFlv);
                        that.log('---------------------------------------');
                        that.log('���(addressTypes)�ǣ�   ' + para.addressTypes);
                        that.log('---------------------------------------');
                        that.log('���(isHttp)�ǣ�   ' + para.isHttp);
                        that.log('---------------------------------------');

                        var apiUrl = apiDomain + "/api/lapp/live/url/ezopen";
                        var apiSuccess = function (data) {
                            if (data.code == 200) {
                                that.log('���ŵ�ַ�ǣ�   ' + data.data);
                                that.video.src = data.data;
                                that.video.load();
                                that.tryPlay(data.data);
                            } else {
                                that.log('data��   ' + JSON.stringify(data));
                                throw new Error(data.msg);
                                return;
                            }
                        }
                        var apiError = function (error) {
                            console.log("getdecoder url from api error", error);
                        }
                        request(apiUrl, 'POST', para, '', apiSuccess, apiError);
                    });
                } /* ��ȡ���ŵ�ַ - ���� */
            }
        }
        // ��ʽ���ط�ʱ��
        function formatRecTime(time, defaultTime) {
            // �û���ʽ ������� => 20182626T000000Z
            // return time
            // �û���ʽ��Ҫ����
            //�û�ʱ�䳤��Ϊ 14 20181226000000  =�� 20181226000000
            // �û�����Ϊ12     201812260000    =�� 201812260000 + defaultTime����2λ
            // �û�����Ϊ10     2018122600      =�� 201812260000 + defaultTime����4λ
            // �û�����Ϊ8     20181226         =�� 201812260000 + defaultTime����6λ
            // ��� 20181226000000 14λ
            // ���� TZ
            var reg = /^[0-9]{8}T[0-9]{6}Z$/;
            if (reg.test(time)) { // �û���ʽ ������� => 20182626T000000Z
                return time;
            } else if (/[0-9]{8,14}/.test(time)) {
                var start = 6 - (14 - time.length);
                var end = defaultTime.length;
                var standardTime = time + defaultTime.substring(start, end);
                return standardTime.slice(0, 8) + 'T' + standardTime.slice(8) + 'Z';
            } else {
                throw new Error('�ط�ʱ���ʽ������ȷ��');
            }
        }

        function reRormatRecTime(time) {
            var year = time.slice(0, 4);
            var month = time.slice(4, 6);
            var day = time.slice(6, 8);
            var hour = time.slice(9, 11);
            var minute = time.slice(11, 13);
            var second = time.slice(13, 15);
            var date = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
            if (_this.opt.domain !== 'open') {
                return new Date(date.replace(/-/g, '/')).getTime() + (8 * 60 * 60 * 1000);
            }
            return new Date(date.replace(/-/g, '/')).getTime();
        }
    };

    // ���Բ���
    EZUIPlayer.prototype.tryPlay = function (playParams) {
        this.log("��ʼ���Բ��ţ��������ò���Ϊ��");
        this.log(playParams);
        var _this = this;
        // JSDecoder ����
        if (playParams && typeof playParams === 'object' && playParams.decoderPath) {
            /** ��ʼ��Decoder */
            // this.initDecoder(playParams);
            // �Զ�����
            // if(playParams.autoplay){
            //   console.log('�������Զ�����');
            //   setTimeout(function(){
            //     _this.play();
            //   },2000)   
            // }
        } else {
            this.opt.currentSource = playParams;
            var me = this;
            // �����HLS��ַ
            if (/\.m3u8/.test(playParams)) {
                // ������ֻ����������,����ԭ��֧��HLS���ŵ�,ֱ��ʹ��video��ǩ����
                // ������ʹ��hls.js���ţ�
                // ���ʹ��flash
                if (isMobile || isNativeSupportHls) {
                    this.log('ʹ��ԭ��video');
                    this.video.style.heght = this.opt.height = Number(this.opt.width.replace(/px$/g, '')) * 9 /
                        16 + 'px';
                    this.initVideoEvent();
                } else {
                    var isPlayUrlHttps = playParams.indexOf('https') !== -1;
                    if (isHttps && !isPlayUrlHttps) { //https��վ��http��ƵԴ��ȫ������Ҫflash����
                        addJs(ckplayerJS, function () {
                            me.initCKPlayer();
                        });
                    } else {
                        addJs(hlsJS, function () {
                            isSupportHls = Hls.isSupported();
                            if (isSupportHls) {
                                me.log('ʹ��hls.js');
                                me.initHLS(playParams);
                            } else {
                                useFlash = true;
                                me.log('2 ʹ��flash');
                                addJs(ckplayerJS, function () {
                                    me.initCKPlayer();
                                });
                            }
                        });
                    }
                }
            } else if (/^rtmp:/.test(playParams)) {
                if (isMobile) {
                    this.opt.cur++;
                    this.tryPlay(playParams);
                    return;
                } else {
                    addJs(ckplayerJS, function () {
                        me.initCKPlayer(playParams);
                    });
                }
            } else if (/^wss:|^ws:/.test(playParams)) {
                /*
                 *   WSЭ���JSMpeg�Ĳ�֧��IE11���µİ汾
                 *   ����ƽ̨������֧��IE8�򿪣����Թ������治���������˰汾IE9 ����IE10
                 *
                 * */
                if (!ltIE11()) {
                    addJs(mpegJS, function () {
                        me.initJSmpeg(playParams);
                    });
                } else {
                    alert('WSЭ�鲻֧��Ie11���µ����������ʹ��IE11�����߸��߰汾�������');
                    return;
                }
            } else if (/\.flv/.test(this.opt.currentSource)) {
                addJs(flv_js, function () {
                    me.log("ʹ��flv.js����");
                    me.initflv();
                });
            }
        }
    };

    // ��ʼ��hls.js
    EZUIPlayer.prototype.initHLS = function (hlsURL) {
        var me = this;
        var hls = new Hls({
            defaultAudioCodec: 'mp4a.40.2'
        }); // өʯ�豸Ĭ��ʹ�� AAC LC ��Ƶ����
        hls.loadSource(hlsURL);
        hls.attachMedia(this.video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            if (me.opt.autoplay) {
                me.video.play();
            }
            me.initVideoEvent();
        });
        hls.on(Hls.Events.ERROR, function (event, data) {
            if (data.fatal) {
                switch (data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        // try to recover network error
                        console.log("fatal network error encountered, try to recover");
                        hls.startLoad();
                        break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        console.log("fatal media error encountered, try to recover");
                        hls.recoverMediaError();
                        break;
                    default:
                        // cannot recover
                        hls.destroy();
                        break;
                }
            }
        });

        this.hls = hls;
    };


    // ��ʼ��ckplayer
    EZUIPlayer.prototype.initCKPlayer = function (url) {
        this.log('ckplayer��ʼ��');
        var me = this;
        var events = {
            'play': function () {
                me.emit('play')
            },
            'pause': function () {
                me.emit('pause')
            },
            'error': function () {
                me.emit('error')
            }
        };
        window.ckplayer_status = function () {
            me.log(arguments);
            events[arguments[0]] && events[arguments[0]]();
        };

        // ������ͬid��div��ǩ��Ȼ��ɾ��video��ǩ
        this.videoFlash = document.createElement('DIV');
        this.video.parentNode.replaceChild(this.videoFlash, this.video);
        this.video = this.videoFlash;
        this.videoFlash.id = this.opt.parentId;
        var flashvars = null;
        // ���rtmp������������������Ƶ��ͣ��Ͽ�����
        // ��Ҫ�޸�ckplayer.js  setup������30��ֵ
        // �ڲ�����ͣ���������Ƿ�����������ӵķ�ʽ
        if (/^rtmp/.test(this.opt.currentSource)) {
            flashvars = {
                f: this.opt.currentSource,
                c: 0,
                p: this.opt.autoplay ? 1 : 0,
                i: this.opt.poster,
                lv: 1,
                loaded: 'loadHandler'
            };
        } else if (/\.m3u8/.test(this.opt.currentSource)) {
            flashvars = {
                s: 4, // 4-ʹ��swf��Ƶ���������
                f: m3u8SWF,
                a: this.opt.currentSource,
                c: 0, // 0-ʹ��ckplayer.js������ 1-ʹ��ckplayer.xml������
                lv: 1, // 1-ֱ�� 0-��ͨ��ʽ
                p: this.opt.autoplay ? 1 : 0, // 1-Ĭ�ϲ��� 0-Ĭ����ͣ
                i: this.opt.poster,
                loaded: 'loadHandler'
            };
        } else {
            flashvars = {
                f: this.opt.currentSource,
                c: 0,
                p: 1,
                loaded: 'loadHandler'
            };
        }
        var params = {
            bgcolor: '#FFF',
            allowFullScreen: true,
            allowScriptAccess: 'always',
            wmode: 'transparent'
        };
        this.flashId = this.opt.parentId + 'flashId';
        window.CKobject.embedSWF(ckplayerSWF, this.opt.parentId, this.flashId, this.opt.width, this.opt.height,
            flashvars, params);
    };

    EZUIPlayer.prototype.initVideoEvent = function () {
        var me = this;
        var EVENT = {
            'loadstart': function (e) {
                me.log('loadstart...���������ʼ������Ƶ/��Ƶʱ...');
                me.emit('loadstart', e);
            },
            'durationchange': function (e) {
                me.log('durationchange...����Ƶ/��Ƶ��ʱ���Ѹ���ʱ...');
                me.emit('durationchange', e);
            },
            'loadedmetadata': function (e) {
                me.log('loadedmetadata...��������Ѽ�����Ƶ/��Ƶ��Ԫ����ʱ...');
                me.emit('loadedmetadata', e);
            },
            'loadeddata': function (e) {
                me.log('loadeddata...��������Ѽ�����Ƶ/��Ƶ�ĵ�ǰ֡ʱ...');
                me.emit('loadeddata', e);
            },
            'progress': function (e) {
                me.log('progress...�����������������Ƶ/��Ƶʱ...');
                me.emit('progress', e);
            },
            'canplay': function (e) {
                me.log('canplay...����������Բ�����Ƶ/��Ƶʱ...');
                me.emit('canplay', e);
            },
            'canplaythrough': function (e) {
                me.log('canplaythrough...����������ڲ��򻺳��ͣ�ٵ�����½��в���ʱ...');
                me.emit('canplaythrough', e);
            },
            'abort': function (e) {
                me.log('abort...����Ƶ/��Ƶ�ļ����ѷ���ʱ...');
                me.emit('abort', e);
            },
            'emptied': function (e) {
                me.log('emptied...��Ŀǰ�Ĳ����б�Ϊ��ʱ...');
                me.emit('emptied', e);
            },
            'ended': function (e) {
                me.log('ended...��Ŀǰ�Ĳ����б��ѽ���ʱ...');
                me.emit('ended', e);
            },
            'pause': function (e) {
                me.log('pause...����Ƶ/��Ƶ����ͣʱ...');
                me.emit('pause', e);
            },
            'play': function (e) {
                me.log('play...����Ƶ/��Ƶ�ѿ�ʼ������ͣʱ...');
                me.emit('play', e);
            },
            'playing': function (e) {
                me.log('playing...����Ƶ/��Ƶ�����򻺳����ͣ��ֹͣ���Ѿ���ʱ...');
                me.emit('playing', e);
            },
            'ratechange': function (e) {
                me.log('ratechange...����Ƶ/��Ƶ�Ĳ����ٶ��Ѹ���ʱ...');
                me.emit('ratechange', e);
            },
            'seeked': function (e) {
                me.log('seeked...���û����ƶ�/��Ծ����Ƶ/��Ƶ�е���λ��ʱ...');
                me.emit('seeked', e);
            },
            'seeking': function (e) {
                me.log('seeking...���û���ʼ�ƶ�/��Ծ����Ƶ/��Ƶ�е���λ��ʱ...');
                me.emit('seeking', e);
            },
            'stalled': function (e) {
                me.log('stalled...����������Ի�ȡý�����ݣ������ݲ�����ʱ...');
                me.emit('stalled', e);
            },
            'suspend': function (e) {
                me.log('suspend...����������ⲻ��ȡý������ʱ...');
                me.emit('suspend', e);
                if (me.opt.autoplay) {
                    me.video.play();
                }
            },
            'timeupdate': function (e) {
                //me.log('timeupdate...��Ŀǰ�Ĳ���λ���Ѹ���ʱ...');
                me.emit('timeupdate', e);
            },
            'volumechange': function (e) {
                me.log('volumechange...�������Ѹ���ʱ...');
                me.emit('volumechange', e);
            },
            'waiting': function (e) {
                me.log('waiting...����Ƶ������Ҫ������һ֡��ֹͣ...');
                me.emit('waiting', e);
            },
            'error': function (e) {
                me.log('error...������Ƶ/��Ƶ�����ڼ䷢������ʱ...');
                me.emit('error', e);
            }

        };
        for (var i in EVENT) {
            this.video.addEventListener(i, EVENT[i], false);
        }

        ios11Hack(this.video);

    };

    EZUIPlayer.prototype.initJSmpeg = function (jsmpegUrl) {
        this.canvasEle = document.createElement('canvas');
        this.canvasEle.style.width = this.opt.width;
        this.canvasEle.style.height = this.opt.height;
        this.video.parentNode.replaceChild(this.canvasEle, this.video);
        this.canvasEle.id = this.opt.parentId;
        var player;
        if (player && player.destroy) {
            player.destroy();
        }
        player = new JSMpeg.Player(jsmpegUrl, {
            canvas: this.canvasEle
        });
        this.JSmpeg = player;
    };

    EZUIPlayer.prototype.initflv = function () {
        if (flvjs.isSupported()) {
            var player = this.video;
            var hasControls = player.getAttribute('controls');
            if (!hasControls) {
                player.setAttribute('controls', true);
            }
            var flvPlayer = flvjs.createPlayer({
                type: 'flv',
                url: this.opt.currentSource,
                isLive: true,
            }, {
                enableStashBuffer: true,
                stashInitialSize: 128,
                enableWorker: true
            });

            flvPlayer.attachMediaElement(player);
            flvPlayer.load();
            flvPlayer.play();
        } else {
            this.log("�������֧��flv����");
            throw new Error('�������֧��flv����');
            return;
        }
        this.flv = flvPlayer;
    };
    EZUIPlayer.prototype.rePlay = function (playParams) {
        this.loadingStart();
        // _this.loadingSet(0,{text:'��ȡ�豸���ŵ�ַ'})
        var _this = this;
        var getRealUrl = this.getRealUrl(playParams);
        /**�Ƿ��Զ����� */
        if (isPromise(getRealUrl)) {
            getRealUrl.then(function (data) {
                    _this.play(playParams);
                })
                .catch(function (err) {
                    console.log("���Ŵ���", err)
                });
        }
    }

    EZUIPlayer.prototype.play = function (data) {
        if (!!window['CKobject']) {
            this.opt.autoplay = true;
            this.initCKPlayer();
        } else if (!!this.video) { // video���� ����flv, hls
            if (!!this.hls) { // hls��ʼ�������� this.hls
                this.opt.autoplay = true;
                this.hls.startLoad();
                this.video.play();
            } else if (!!this.JSmpeg) {
                this.JSmpeg.play();
            } else { // ������ʼ����ʹ��ԭ��video
                this.opt.autoplay = true;
                this.video.play();
            }
        } else if (!!this.jSPlugin) {
            this.loadingStart(0);
            var playParams = this.playParams;
            var audioId = 0
            if (playParams && playParams.audioId) {
                audioId = playParams.audioId;
            } else if (playParams && playParams.audioId === -1) {
                audioId = undefined;
            }
            if (typeof data === 'string') {
                playParams.url = data;
            } else if (typeof data === 'object') {
                playParams = Object.assign(playParams, data);
            }
            var _this = this;
            var playPromise = new Promise(function (resolve, reject) {
                var getRealUrl = _this.getRealUrl(playParams);
                getRealUrl.then(function () {
                    function getPlayParams(url) {
                        var websocketConnectUrl = url.split('?')[0].replace('/live', '').replace(
                            '/playback', '');
                        // console.log("playParams,",playParams,playParams.env.wsUrl)
                        if (playParams && playParams.env && playParams.env.wsUrl) {
                            websocketConnectUrl = playParams.env.wsUrl;
                        }
                        console.log("_this.opt.sources.", _this.opt.sources)
                        var websocketStreamingParam = (url.indexOf('/live') === -1 ? (url.indexOf(
                                'cloudplayback') !== -1 ? '/cloudplayback?' :
                            '/playback?') : '/live?') + url.split('?')[1];
                        if (playParams.websocketParams) {
                            Object.keys(playParams.websocketParams).map(function (item) {
                                websocketStreamingParam += ("&" + item + "=" +
                                    playParams.websocketParams[item]);
                            })
                        }
                        // ���ػطŽ�֧�������� - 2019-11-05 �޶�
                        if (websocketStreamingParam.indexOf('/playback') !== -1) {
                            websocketStreamingParam = websocketStreamingParam.replace(
                                "stream=2", 'stream=1');
                        }
                        // ���ػطŽ�֧��������
                        return {
                            websocketConnectUrl: websocketConnectUrl,
                            websocketStreamingParam: websocketStreamingParam
                        }
                    }
                    _this.opt.sources.forEach(function (item, index) {
                        if (getQueryString('dev', item) || item.indexOf('ws') !== -1) {
                            _this.log("开始播放, 第" + (index + 1) + '·路，' + '地址：' + item);
                            _this.loadingSet(index, {
                                text: _this.opt.domain !== 'open' ?
                                    'Ready to play...' : '准备播放...',
                                color: '#fff'
                            })
                            // ������Կ - �����ַ�а�����Կ����������ǰ���õ�JSPlugin��Ӧʵ����
                            var validateCode = getQueryString('checkCode', item);
                            if (validateCode) {
                                _this.log('设置秘钥，视频路数：' + (index + 1) + '验证码：' +
                                    validateCode)
                                _this.jSPlugin.JS_SetSecretKey(index, validateCode);
                            }
                            var playST = new Date().getTime();

                            var wsUrl = ''
                            var wsParams = ''
                            wsUrl = getPlayParams(item).websocketConnectUrl;
                            wsParams = {
                                playURL: getPlayParams(item).websocketStreamingParam
                            }
                            _this.jSPlugin.JS_Play(wsUrl, wsParams, index).then(
                                function () {
                                    _this.log('播放成功，当前播放第' + (index + 1) + '·');
                                    _this.loadingSet(index, {
                                        text: _this.opt.domain !== 'open' ?
                                            'Played successfully...' : '播放成功...'
                                    });
                                    //���β�����־�ϱ�
                                    // ezuikitDclog({
                                    //     systemName: PERFORMANCE_EZUIKIT,
                                    //     bn: 2,
                                    //     browser: JSON.stringify(
                                    //         getBrowserInfo()),
                                    //     duration: new Date().getTime() -
                                    //         playST,
                                    //     rt: 200,
                                    // })
                                    // ���ųɹ�
                                    // ezuikitDclog({
                                    //     systemName: PERFORMANCE_EZUIKIT,
                                    //     bn: 99,
                                    //     browser: JSON.stringify(
                                    //         getBrowserInfo()),
                                    //     duration: new Date().getTime() -
                                    //         playStartTime,
                                    //     rt: 200,
                                    // })
                                    _this.loadingEnd(index);
                                    // Ĭ�Ͽ�������
                                    // Ĭ�Ͽ�����һ·����
                                    if (typeof (audioId) !== "undefined" && audioId ===
                                        index) {
                                        _this.log("Ĭ�Ͽ�����1·����");
                                        setTimeout(function () {
                                            var openSoundRT = _this.openSound(
                                                0);
                                            if (isPromise(openSoundRT)) {
                                                openSoundRT.then(function () {
                                                        _this.log(
                                                            '���������ɹ�'
                                                        );
                                                    })
                                                    .catch(function (err) {
                                                        _this.log(
                                                            '��������ʧ��',
                                                            'error'
                                                        );
                                                    })
                                            } else if (openSoundRT == 0) {
                                                _this.log('���������ɹ�', data)
                                            } else {
                                                _this.log('��������ʧ��', 'error')
                                            }
                                            console.log("openSoundRT",
                                                openSoundRT)
                                        }, 100)
                                    }
                                    // ���ųɹ��ص�
                                    if (playParams && playParams.handleSuccess) {
                                        playParams.handleSuccess();
                                    }
                                    if (_this.playControls) {
                                        _this.playControls.setPlayStatus(1)
                                    }
                                    if ((index + 1) === _this.opt.sources.length) {
                                        resolve({
                                            code: 0
                                        })
                                    }
                                    // ���ųɹ���־�ϱ�
                                    var PlTp = 1;
                                    if (playParams && playParams.url) {
                                        if (playParams.url.indexOf('rec') !== -1) {
                                            PlTp = 2;
                                        }
                                    }
                                    dclog({
                                        systemName: PLAY_MAIN,
                                        playurl: encodeURIComponent(item),
                                        Time: (new Date()).Format(
                                            'yyyy-MM-dd hh:mm:ss.S'),
                                        Enc: 0, // 0 ������ 1 ����
                                        PlTp: PlTp, // 1 ֱ�� 2 �ط�
                                        Via: 2, // 2 �����ȡ��
                                        ErrCd: 0,
                                        OpId: uuid(),
                                        Cost: (new Date()).getTime() -
                                            _this.initTime, // ������
                                        Serial: getQueryString('dev', item),
                                        Channel: getQueryString('chn', item),
                                    });
                                },
                                function (err) {
                                    _this.log('����ʧ��' + JSON.stringify(err), 'error');
                                    var errorInfo = JSON.parse(_this.errorCode).find(
                                        function (item) {
                                            return item.detailCode.substr(-4) ==
                                                err.oError.errorCode
                                        });
                                    // ezuikitDclog({
                                    //     systemName: PERFORMANCE_EZUIKIT,
                                    //     bn: 2,
                                    //     browser: JSON.stringify(
                                    //         getBrowserInfo()),
                                    //     duration: new Date().getTime() -
                                    //         playStartTime,
                                    //     rt: err.oError ? err.oError.errorCode :
                                    //         500,
                                    //     msg: errorInfo ? errorInfo.description :
                                    //         (_this.opt.domain !== 'open' ?
                                    //             'Other error' : '��������')
                                    // })
                                    var msg = errorInfo ? errorInfo.description : (
                                        _this.opt.domain !== 'open' ?
                                        'Other error' : '其他错误');
                                    _this.loadingSet(index, {
                                        text: msg,
                                        color: 'red'
                                    });
                                    dclog({
                                        systemName: PLAY_MAIN,
                                        playurl: encodeURIComponent(item),
                                        cost: -1,
                                        ErrCd: (err && err.oError && err.oError
                                            .errorCode && (err.oError.errorCode +
                                                "").substr(-4)) || -1,
                                        Via: 2,
                                        OpId: uuid(),
                                        Serial: getQueryString('dev', item),
                                        Channel: getQueryString('chn', item),
                                    });
                                    if (playParams && playParams.handleError) {
                                        var errorInfo = JSON.parse(_this.errorCode)
                                            .find(function (item) {
                                                return item.detailCode.substr(-
                                                    4) == err.oError.errorCode
                                            })
                                        playParams.handleError({
                                            retcode: err.oError.errorCode,
                                            msg: errorInfo ? errorInfo.description :
                                                (_this.opt.domain !==
                                                    'open' ? 'Other error' :
                                                    '其他错误')
                                        });
                                    }
                                    if ((index + 1) === _this.opt.sources.length) {
                                        resolve({
                                            retcode: err.oError.errorCode,
                                            msg: errorInfo ? errorInfo.description :
                                                (_this.opt.domain !==
                                                    'open' ? 'Other error' :
                                                    '其他错误')
                                        })
                                    }
                                })

                        } else {
                            if (isJSON(item) && JSON.parse(item).msg) {
                                _this.loadingSet(index, {
                                    text: JSON.parse(item).msg,
                                    color: 'red'
                                })
                            }
                        }
                    })
                })
            })
            return playPromise;
        }


    };
    EZUIPlayer.prototype.initDecoder = function (playParams) {
        this.opt.id = playParams.id;
        this.log("初始化解码器---开始");
        var _this = this;
        _this.opt.domain = playParams.url.split(",")[0].match(/ezopen:\/\/(\S*)\.(ys7|ezviz)\.com/)[1];
        if (playParams.env) {
            var environmentParams = playParams.env;
            domain = environmentParams.domain;
            if (domain.match(/https:\/\/(\S*)\.ezviz(\S*)\.com/)) {
                _this.opt.domain = domain.match(/https:\/\/(\S*)\.ezviz(\S*)\.com/)[1];
            }
        }
        if (_this.opt.domain.indexOf("@") !== -1) {
            _this.opt.domain = _this.opt.domain.split("@")[1];
        }
        var initDecoderDurationST = new Date().getTime();
        // DOM id
        function initDecoder(resolve, reject) {
            // let l = '../mode/js/jsPlugin-1.2.0.min.js'
            var jsPluginPath = playParams.decoderPath + '/js/jsPlugin-1.2.0.min.js?v=20211012';
            // console.log(jsPluginPath);
            if (playParams.decoderVersion) {
                var jsPluginPath = playParams.decoderPath + '/js/versions/' + playParams.decoderVersion +
                    '/jsPlugin-1.2.0.min.js?v=20211012';
            }
            document.getElementById(playParams.id).style.width = (playParams.width || 600) + 'px';
            document.getElementById(playParams.id).style.height = (playParams.height || 400) + 'px';
            /** ��ʼ�������� */
            addJs(jsPluginPath, function () {
                _this.log("下载解码器完成，开始初始化");
                /* decoder �������� */
                _this.jSPlugin = new JSPlugin({
                    szId: playParams.id,
                    iType: 2,
                    // iMode: 0,
                    iWidth: playParams.width || 600,
                    iHeight: playParams.height || 400,
                    iMaxSplit: Math.ceil(Math.sqrt(playParams.url.split(",").length)),
                    iCurrentSplit: playParams.splitBasis || Math.ceil(Math.sqrt(playParams.url.split(
                        ",").length)),
                    szBasePath: playParams.decoderVersion ? (playParams.decoderPath +
                        '/js/versions/' + playParams.decoderVersion) : (playParams.decoderPath +
                        '/js'),
                    oStyle: {
                        border: "none",
                        background: "#000000"
                    }
                });
                _this.jSPlugin.EventCallback = {
                    loadEventHandler: function () {},
                    zoomEventResponse: function ( /*iMode, aPoint*/ ) { //���ӷŴ�ص�
                    },
                    windowEventSelect: function (iWndIndex) { //���ѡ�д��ڻص�
                    },
                    pluginErrorHandler: function (iWndIndex, iErrorCode, oError) { //�������ص�
                        console.log(iWndIndex, iErrorCode, oError);
                        if (iErrorCode === 1003) {
                            if (playParams && playParams.handleError) {
                                playParams.handleError({
                                    retcode: iErrorCode,
                                    msg: oError ? oError : '连接断开，请重试'
                                });
                                if (playParams.url.indexOf("alarmId") !== -1) {
                                    _this.loadingSetIcon(iWndIndex, 'retry');
                                    _this.loadingSet(iWndIndex, {
                                        text: '播放结束'
                                    });
                                } else {
                                    _this.loadingSetIcon(iWndIndex, 'retry');
                                    _this.loadingSet(iWndIndex, {
                                        text: '连接断开，请重试'
                                    });
                                }
                            }
                        }
                    },
                    windowEventOver: function (iWndIndex) {},
                    windowEventOut: function (iWndIndex) {},
                    windowEventUp: function (iWndIndex) {},
                    windowFullCcreenChange: function (bFull) {},
                    firstFrameDisplay: function (iWndIndex, iWidth, iHeight) {

                    },
                    performanceLack: function () {},
                    mouseEvent: function (iMouseEventType, iMouseX, iMouseY) {}
                }
                _this.jSPlugin.oEventCallback = _this.jSPlugin.EventCallback;
                // _this.jSPlugin.JS_SetWindowControlCallback({
                //   windowEventSelect: function (iWndIndex) {  //���ѡ�д��ڻص�
                //     iWind = iWndIndex;
                //   },
                //   pluginErrorHandler: function (iWndIndex, iErrorCode, oError) {  //�������ص�
                //     console.log(iWndIndex, iErrorCode, oError);
                //     if (playParams && playParams.handleError) {
                //       playParams.handleError({ retcode: iErrorCode, msg: oError ? oError : '����ʧ�ܣ�������' });
                //       if(playParams.url.indexOf("alarmId")!== -1) {
                //         _this.loadingSetIcon(iWndIndex, 'retry');
                //         _this.loadingSet(iWndIndex, { text: '���Ž���' });
                //       } else {
                //         _this.loadingSetIcon(iWndIndex, 'retry');
                //         _this.loadingSet(iWndIndex, { text: '����ʧ�ܣ�������' });
                //       }
                //     }
                //   },
                // });
                // _this.jSPlugin.JS_SetOptions({
                //   //bSupportSound: false  //�Ƿ�֧����Ƶ��Ĭ��֧��
                //   bSupporDoubleClickFull: typeof playParams.isSupporDoubleClickFull === 'undefined' ? true : playParams.isSupporDoubleClickFull,    //�Ƿ�˫������ȫ����Ĭ��֧��
                //   //bOnlySupportMSE: true  //ֻ֧��MSE
                //   bOnlySupportJSDecoder: (typeof playParams.useMSE === 'undefined' || playParams.useMSE === false)  ? true : false,    //�Ƿ�ǿ��ʹ��jsdecoder
                // }).then(function () {
                //   console.log("JS_SetOptions");
                // });
                // ע��ȫ���¼�
                // window.onresize = function () {
                //   var width = document.documentElement.clientWidth;
                //   var height = document.documentElement.clientHeight;
                //   _this.jSPlugin.JS_Resize(width || playParams.width || 600, height || playParams.height || 400);
                // }
                _this.log("初始化解码器----完成");
                if (playParams.controls && playParams.controls.length > 0) {
                    var videoControlsJsPath = playParams.decoderPath +
                        '/deviceControls/videoControls.js';
                    var videoControlsCssPath = playParams.decoderPath +
                        '/deviceControls/deviceControls.css';
                    addJs(videoControlsJsPath, function () {
                        addCss(videoControlsCssPath, function () {
                            var VideoControlsDOM = document.createElement('div')
                            VideoControlsDOM.id = "video-controls-container";
                            VideoControlsDOM.className = "video-controls-container";
                            document.getElementById(playParams.id).style.position =
                                'relative';
                            document.getElementById(playParams.id).appendChild(
                                VideoControlsDOM)
                            var setPlayStatusCallBack = function (status) {
                                console.log("setPlayStatusCallBack", status);
                                if (status === 1) {
                                    _this.play();
                                    // setTimeout(()=>{
                                    //   _this.openSound(0);
                                    // },3000);
                                } else {
                                    _this.closeSound(0);
                                    _this.stop()
                                }
                            }
                            var setVoiceStatusCallBack = function (status) {
                                console.log("setVoiceStatusCallBack", status);
                                if (status === 1) {
                                    console.log("ͼ�꿪������");
                                    _this.openSound(0);
                                } else {
                                    console.log("ͼ��ر�����")
                                    _this.closeSound(0)
                                }
                            }
                            var setHdStatusCallBack = function (status) {
                                console.log("setHdStatusCallBack", status);
                                if (status === 1) {
                                    console.log("ͼ�껻����");
                                    _this.closeSound(0);
                                    var stopPromise = _this.stop();
                                    stopPromise.then(function () {
                                        _this.play({
                                            url: playParams.url.replace(
                                                '.live',
                                                '.hd.live')
                                        })
                                    })
                                } else {
                                    _this.closeSound(0);
                                    var stopPromise = _this.stop();
                                    stopPromise.then(function () {
                                        _this.play({
                                            url: playParams.url.replace(
                                                '.hd.live',
                                                '.live')
                                        })
                                    })
                                }
                            }
                            var setFullScreenStatusCallBack = function (status) {
                                var playStatus = _this.playControls.state.playStatus;
                                console.log("setFullScreenStatusCallBack", status);
                                if (playStatus == 1) {
                                    _this.fullScreen();
                                }
                            }
                            _this.playControls = new VideoControls({
                                id: 'video-controls-container',
                                setPlayStatusCallBack: setPlayStatusCallBack,
                                setVoiceStatusCallBack: setVoiceStatusCallBack,
                                setHdStatusCallBack: setHdStatusCallBack,
                                setFullScreenStatusCallBack: setFullScreenStatusCallBack,
                                hd: (playParams.url.indexOf('.hd') !== -1) ? 1 :
                                    0,
                                controls: playParams.controls,
                            });
                        })
                    })
                }

                // ִ��һ�γ�ʼ�����������������ϱ�
                // ezuikitDclog({
                //     systemName: PERFORMANCE_EZUIKIT,
                //     bn: 1,
                //     browser: JSON.stringify(getBrowserInfo()),
                //     duration: new Date().getTime() - initDecoderDurationST,
                //     rt: 200,
                // })
                resolve('200 OK')
            });
            /** 
             * ���ش�����
             * ������ά��ƽ̨ - omm����ϵͳ
             */
            var errorCodeLan = 'zh';
            var errorCodePath = playParams.decoderPath + "/js/errorCode.json";
            var errorCodeKey = 'errorCode';
            if (_this.opt.domain !== 'open') {
                errorCodeLan = 'en';
                errorCodePath = playParams.decoderPath + "/js/errorCode-EN.json";
                errorCodeKey = "errorCode-EN"
            }

            function success(data) {
                if (data.code == 200) {
                    if (!window.localStorage) {
                        return false;
                    } else {
                        var storage = window.localStorage;
                        //д��a�ֶ�
                        storage[errorCodeKey] = JSON.stringify(data.data);
                        _this.errorCode = storage[errorCodeKey];
                    }
                }
            }
            if (!window.localStorage) {
                request(
                    errorCodePath,
                    "get", {
                        language: 1,
                        time: new Date().getTime(),
                        appKey: '26810f3acd794862b608b6cfbc32a6b8',
                    },
                    '',
                    success
                );
            } else {
                var storage = window.localStorage;
                var errorCode = storage[errorCodeKey];
                if (!errorCode) {
                    request(
                        errorCodePath,
                        "get", {
                            language: 1,
                            time: new Date().getTime(),
                            appKey: '26810f3acd794862b608b6cfbc32a6b8',
                        },
                        '',
                        success
                    );
                } else {
                    _this.errorCode = storage[errorCodeKey];
                }
            }


        }
        var initDecoderPromise = new Promise(initDecoder);

        return initDecoderPromise;
    }
    EZUIPlayer.prototype.stop = function (i, unDestory) {
        // ִ��ֹͣ
        this.log("ֹͣ停止播放" + this.opt.currentSource);
        this.opt.autoplay = false;
        if (!!window['CKobject']) {
            //CKobject.getObjectById(this.flashId).destroy();
            this.video.src = ""
            // this.video.remove();
        } else if (!!this.video) {
            if (!!this.hls) { // hlsֹͣ����this.hls
                // ͨ����ֹͣͣ����
                this.video.pause();
                this.video.src = ""
                // ֹͣȡ��
                this.hls.stopLoad();
            } else if (!!this.flv) {
                this.flv.pause();
                this.flv.unload();
                this.flv.detachMediaElement();
                this.flv.destroy();
                this.flv = null;
            } else if (!!this.JSmpeg) {
                this.JSmpeg.stop();
                // this.JSmpeg.destroy();
            }
        } else if (!!this.jSPlugin) {
            var _this = this;
            if (typeof i === "undefined") {
                _this.closeSound(0)
                return this.jSPlugin.JS_Stop(0).then(function () {
                    _this.log("ͣ停止播放成功" + _this.opt.currentSource);
                    console.log("stop success");
                    // ��������worker
                    // _this.jSPlugin.JS_DestroyWorker();
                    _this.loadingEnd(0);
                    //removeChild(0);
                    if (_this.playControls) {
                        _this.playControls.setPlayStatus(0);
                    }
                }, function () {
                    _this.log("ͣ停止播放失败" + _this.opt.currentSource);
                    console.log("stop failed");
                });
            } else {
                return this.jSPlugin.JS_Stop(i).then(function () {
                    _this.log("第" + i + "路停止播放成功" + _this.opt.currentSource);
                    _this.loadingEnd(i);
                    console.log("stop success");
                }, function () {
                    _this.log("第" + i + "·ͣ路停止播放失败" + _this.opt.currentSource);
                    _this.loadingEnd(i);
                    console.log("stop failed");
                });
                // ��������worker - �ര���ݲ�����
                // this.jSPlugin.JS_DestroyWorker();
                //removeChild(i);
            }
        }
    };
    EZUIPlayer.prototype.destroy = function (i) {
        _this.jSPlugin.JS_DestroyWorker();
    }

    // ��ȡOSDʱ��
    // EZUIPlayer.prototype.getOSDTime = function (callback, iWind) {
    //   if (!!this.jSPlugin) {
    //     this.jSPlugin.JS_GetOSDTime(iWind || 0).then(function (iTime) {
    //       callback(iTime * 1000);
    //     }, function (err) {
    //       console.log("get OSD Time error", err);
    //     });
    //   } else {
    //     throw new Error("Method  not support");
    //   }
    // }
    // ����promise��getOSDTime����
    EZUIPlayer.prototype.getOSDTime = function (wNum) {
        var _this = this;
        if (!!this.jSPlugin) {
            return _this.jSPlugin.JS_GetOSDTime(wNum || 0);
        } else {
            throw new Error("Method  not support");
        }
    }
    // ����promise��getOSDTime����
    EZUIPlayer.prototype.getVersion = function (wNum) {
        var _this = this;
        if (!!this.jSPlugin) {
            console.log(_this.jSPlugin.JS_GetSdkVersion());
        } else {
            throw new Error("Method  not support");
        }
    }

    // ��������
    EZUIPlayer.prototype.openSound = function (iWind) {
        if (!!this.jSPlugin) {
            var _this = this;
            var openSoundRT = this.jSPlugin.JS_OpenSound(iWind || 0);
            if (isPromise(openSoundRT)) {
                openSoundRT.then(function () {
                        _this.log('���������ɹ�');
                        if (_this.playControls) {
                            _this.playControls.setVoiceStatus(1)
                        }
                    })
                    .catch(function (err) {
                        _this.log('��������ʧ��', 'error');
                    })
            } else if (openSoundRT === 0) {
                _this.log('���������ɹ�');
                if (_this.playControls) {
                    _this.playControls.setVoiceStatus(1)
                }
            } else {
                _this.log('��������ʧ��', 'error');
            }
            return openSoundRT;
        } else {
            throw new Error("Method  not support");
        }
    }
    // ȫ��
    EZUIPlayer.prototype.fullScreen = function () {
        if (!!this.jSPlugin) {
            return this.jSPlugin.JS_FullScreenDisplay(1);
        } else {
            throw new Error("Method  not support");
        }
    }
    // �ر�����
    EZUIPlayer.prototype.closeSound = function (iWind) {
        if (!!this.jSPlugin) {
            var _this = this;
            var closeSoundRT = this.jSPlugin.JS_CloseSound(iWind || 0);
            if (isPromise(closeSoundRT)) {
                closeSoundRT.then(function () {
                        _this.log('�ر������ɹ�');
                        if (_this.playControls) {
                            _this.playControls.setVoiceStatus(0)
                        }
                    })
                    .catch(function (err) {
                        _this.log('�ر�����ʧ��', 'error');
                    })
            } else if (closeSoundRT === 0) {
                _this.log('�ر������ɹ�');
                if (_this.playControls) {
                    _this.playControls.setVoiceStatus(0)
                }
            } else {
                _this.log('关闭声音失败', 'error');
            }
            return closeSoundRT;
        } else {
            throw new Error("Method  not support");
        }
    }
    // ��Ƶ��ͼ
    EZUIPlayer.prototype.capturePicture = function (iWind, pictureName, callback, isUndownload) {
        if (!!this.jSPlugin) {
            return this.jSPlugin.JS_CapturePicture(iWind, pictureName, 'JPEG', callback, isUndownload);
        } else {
            throw new Error("Method  not support");
        }
    }
    // ��ʼ¼��
    EZUIPlayer.prototype.startSave = function (iWind, fileName) {
        if (!!this.jSPlugin) {
            this.log("开始录制录像");
            return this.jSPlugin.JS_StartSave(iWind, fileName)
        } else {
            throw new Error("Method  not support");
        }
    }
    // ����¼��
    EZUIPlayer.prototype.stopSave = function (iWind) {
        if (!!this.jSPlugin) {
            return this.jSPlugin.JS_StopSave(iWind);
            this.log("结束录制录像");
        } else {
            throw new Error("Method  not support");
        }
    }
    EZUIPlayer.prototype.reSize = function (width, height) {
        if (!!this.jSPlugin) {
            return this.jSPlugin.JS_Resize(width, height);
        } else {
            throw new Error("Method  not support");
        }
    }
    EZUIPlayer.prototype.pause = function () {
        this.opt.autoplay = false;
        if (!!window['CKobject']) {
            CKobject.getObjectById(this.flashId).videoPause();
        } else if (!!this.video) {
            if (!!this.JSmpeg) {
                this.JSmpeg.pause();
            } else {
                this.video.pause();
            }
        } else if (!!this.jSPlugin) {
            this.jSPlugin.JS_Pause(0).then(function () {}, function () {});
        }
    };

    EZUIPlayer.prototype.load = function () {
        if (!!window['CKobject']) {
            // flash load
        } else if (!!this.video) {
            this.video.load();
        }
    };
    // �������ӷŴ�
    EZUIPlayer.prototype.enableZoom = function (iWind) {
        if (!!this.jSPlugin) {
            return this.jSPlugin.JS_EnableZoom(iWind || 0);
        } else {
            throw new Error("Method  not support");
        }
    }
    // �رյ��ӷŴ�
    EZUIPlayer.prototype.closeZoom = function (iWind) {
        if (!!this.jSPlugin) {
            return this.jSPlugin.JS_DisableZoom(iWind || 0);
        } else {
            throw new Error("Method  not support");
        }
    }
    // ����promise��getOSDTime����
    EZUIPlayer.prototype.controlsSwitchDisabled = function (value) {
        if (this.playControls) {
            this.playControls.switchDisabled(value)
        }
    }



    // iOS11�ֻ�HLSֱ����m3u8��Ӧʱ������󲻼��������hack
    function ios11Hack(video) {
        var isloadeddata = false;
        var isPlaying = false;
        var stalledCount = 0;
        video.addEventListener('loadeddata', function () {
            isloadeddata = true;
        }, false);
        video.addEventListener('stalled', function () {
            stalledCount++;
            if (!isPlaying) {
                if (stalledCount >= 2 && !isloadeddata) {
                    video.load();
                    video.play();
                    isloadeddata = false;
                    isPlaying = false;
                    stalledCount = 0;
                }
            }
        }, false);
        video.addEventListener('playing', function () {
            isPlaying = true;
        });
    }

    function ltIE11() {
        var userAgent = navigator.userAgent;
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
        if (isIE) {
            return true;
        } else {
            return false;
        }
    }


    var EZUIKit = {
        'EZUIPlayer': EZUIPlayer,
    };
    // ����1.4 ���¾ɰ汾
    // var EZUIPlayer = EZuikit.EZUIPlayer;

    if (!noGlobal) {
        window.EZUIKit = EZUIKit;
        // ����1.4 ���¾ɰ汾
        window.EZUIPlayer = EZUIPlayer;
    }
    return EZUIKit;
});