(function () {
    window.dhPlayerControl = Object.assign({
        videoWS: null,
        wsConnectCount: 0,
        wsSession: '',
        windowState: '',
        videoList: {},
        hwndList: {},
        callBackList: {},
        wsConnect: false,
    }, window.dhPlayerControl || {}, {
        socketTimer: null,
        openPlayerFlag: false,
        noCardPlayerFlag: false,
        DHPlayerVersion: '',
    })
    //在Function的原型上自定义myBind()方法
    Function.prototype.myBind = function myBind(context) {
        //获取要操作的函数
        var _this = this
        //获取实参（context除外）
        var args = Array.prototype.slice.call(arguments, 1)

        //判断当前浏览器是否兼容bind()方法
        if ('bind' in Function.prototype) {
            //如果浏览器兼容bind()方法，则使用bind()方法，并返回bind()方法执行后的结果
            return _this.bind(context, args)
        }
        //如果不兼容bind()方法，则返回一个匿名函数
        return function () {
            _this.apply(context, args)
        }
    }

    if (!document.getElementsByClassName) {
        document.getElementsByClassName = function (className, element) {
            var children = (element || document).getElementsByTagName('*')
            var elements = new Array()
            for (var i = 0; i < children.length; i++) {
                var child = children[i]
                var classNames = child.className.split(' ')
                for (var j = 0; j < classNames.length; j++) {
                    if (classNames[j] == className) {
                        elements.push(child)
                        break
                    }
                }
            }
            return elements
        }
    }

    function getWindowSize() {
      var width = this.setting.isPIframe ? this.setting.topInnerWidth : window.top.innerWidth,
      height = this.setting.isPIframe ? this.setting.topInnerHeight : window.top.innerHeight;
        var zoom = detectZoom()
        return {
            width: width * zoom / 100,
            height: height * zoom / 100
        }
    }

    //获取url中的参数
    function getUrlParam(url, name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = url.match(reg); //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }

    //获取页面放大缩小值
    function detectZoom() {
        var ratio = 0,
            screen = window.screen,
            ua = navigator.userAgent.toLowerCase();

        if (window.devicePixelRatio !== undefined) {
            ratio = window.devicePixelRatio;
        } else if (~ua.indexOf('msie')) {
            if (screen.deviceXDPI && screen.logicalXDPI) {
                ratio = screen.deviceXDPI / screen.logicalXDPI;
            }
        } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
            ratio = window.outerWidth / window.innerWidth;
        }

        if (ratio) {
            ratio = Math.round(ratio * 100);
        }
        return ratio;
    }
    // 进程被手动杀死或者没有主动启动时，js启动win进程
    function openDHPlayer() {
        var t = document.createElement('iframe');
        t.style.display = 'none';
        t.src = 'DHPlayer://';
        document.body.appendChild(t);
        setTimeout(function () {
            document.body.removeChild(t)
        }, 1000 * 3)
    }

    function setTimeout_close() {
        var that = this
        setTimeout(function () {
            if (!sessionStorage.getItem('HikCentralWebControlPort')) {
                window.dhPlayerControl.wsConnect = false
                window.dhPlayerControl.windowState = 'wsFail'
                window.dhPlayerControl.noCardPlayerFlag = true
                that.setting.connectClose && that.setting.connectClose()
            }
        }, that.setting.connectTime * 1000)
    }
    //socket连接
    function socketPort() {
        if (window.dhPlayerControl.noCardPlayerFlag) {
            return
        }
        if (typeof WebSocket === 'undefined') {
            alert('您的浏览器不支持socket')
            return
        }
        if (sessionStorage.getItem('HikCentralWebControlPort')) {
            sessionStorage.removeItem('HikCentralWebControlPort')
        }
        var startIp = 8000
        var endIp = 8004
        var portList = []
        var portMessage = {}
        for (var i = startIp; i <= endIp; i++) {
            portList.push(i)
        }
        var len = portList.length
        var map = {}
        var eLen = 0
        var id = 0
        var startIndex = 0
        var setTimeoutFlag = false
        window.dhPlayerControl.socketTimer && window.clearTimeout(window.dhPlayerControl.socketTimer)
        window.dhPlayerControl.windowState = 'wsPending'

        function ecallback(e) {
            window.dhPlayerControl.DHPlayerVersion = Number(e.data.ver)
            var o = sessionStorage.getItem('HikCentralWebControlPort')
            map['ws' + o].close()
            setTimeoutFlag = true
            socketOpen()
        }

        function esuccess(evt) {
            var port = evt.target.url.split(':').length == 3 ? evt.target.url.split(':')[2].replace('/', '') : '80'
            var json = {
                method: 'common.version',
                info: {},
                id,
                session: window.dhPlayerControl.wsSession,
            }
            map['ws' + port] && map['ws' + port].readyState == 1 && map['ws' + port].send(JSON.stringify(json))
        }

        function eerror(evt) {
            if(!window.dhPlayerControl.DHPlayerVersion) {
              alert('插件未安装!');
              return;
            }
            eLen++
            var port = evt.target.url.split(':').length == 3 ? evt.target.url.split(':')[2].replace('/', '') : '80'
            map['ws' + port].close()
            if (!window.dhPlayerControl.noCardPlayerFlag) {
                startIndex = startIndex == len - 1 ? 0 : startIndex + 1;
                estart();
            }
            if (eLen == len) {
                if (!window.dhPlayerControl.openPlayerFlag) {
                    window.dhPlayerControl.openPlayerFlag = true
                    openDHPlayer()
                }
            }
        }

        function emessage(evt) {
            var data = evt && evt.data ? JSON.parse(evt.data) : {}
            if (data.id == id) {
                window.dhPlayerControl.openPlayerFlag = true
                var port = evt.target.url.split(':').length == 3 ? evt.target.url.split(':')[2].replace('/', '') : '80'
                sessionStorage && sessionStorage.setItem('HikCentralWebControlPort', port)
                portMessage[portList[startIndex]] = 1
                ecallback(data)
            } else {
                eerror(evt)
            }
        }

        function estart() {
            map['ws' + portList[startIndex]] = new WebSocket('ws://localhost:' + portList[startIndex])
            map['ws' + portList[startIndex]].onopen = esuccess
            map['ws' + portList[startIndex]].onerror = eerror
            map['ws' + portList[startIndex]].onmessage = emessage
        }

        estart()

        //如果端口被占用，状态不返回，主动去获取再判断
        window.dhPlayerControl.socketTimer = setTimeout(function () {
            if (!setTimeoutFlag) {
                var count = 0
                for (var i = 0; i < portList.length; i++) {
                    if (portMessage[portList[startIndex]] != 1) {
                        count++
                    }
                    if (count == portList.length) {
                        if (!window.dhPlayerControl.openPlayerFlag) {
                            window.dhPlayerControl.openPlayerFlag = true
                            openDHPlayer()
                        }
                    }
                }
            }
        }, 20 * 1000)
    }

    function socketOpen() {
        var o = sessionStorage.getItem('HikCentralWebControlPort')
        window.dhPlayerControl.videoWS = new WebSocket('ws:127.0.0.1:' + o)
        window.dhPlayerControl.videoWS.onopen = function () {
            window.dhPlayerControl.windowState = 'wsSuccess'
            // heartbeat.call(that)
            for (var key in window.dhPlayerControl.videoList) {
                var currentThis = window.dhPlayerControl.videoList[key]
                currentThis && currentThis.setting.connectSuccess()
                currentThis.create()
            }
        }
        window.dhPlayerControl.videoWS.onerror = socketOpen
        window.dhPlayerControl.videoWS.onmessage = socketMessage
    }

    //心跳
    function heartbeat() {
        var that = this
        window.wsHeart = window.setInterval(function () {
            that.send({
                method: 'common.heartbeat',
                info: {},
                id: window.dhPlayerControl.wsConnectCount++,
                session: window.dhPlayerControl.wsSession,
            })
        }, 30 * 1000)
    }

    function dataURLtoBlob(dataurl) {
        var mime = 'image/jpeg',
            bstr = atob(dataurl),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {
            type: mime
        });
    }
    function downloadFileByBase64(base64, name) {
        var myBlob = dataURLtoBlob(base64)
        var myUrl = URL.createObjectURL(myBlob)
        return myUrl
    }

    // 连接成功，信息返回
    function socketMessage(evt) {
		console.log(evt.data)
        // this.setting.heartCount = 0 // 心跳计数至为0
        if (evt.data == null || evt.data == '') {
            return
        }
        var data = JSON.parse(evt.data)
        if (data.info) {
            var hwndInfo = window.dhPlayerControl.hwndList[data.info.hwnd]
            switch (data.method) {
                case 'web.seekRecord':
                    hwndInfo.switchStartTime && hwndInfo.switchStartTime({
                        startTime: data.info.seekTime,
                        snum: data.info.snum
                    })
                    break
                case 'web.replay':
                    hwndInfo.replay && hwndInfo.replay(data.info.snum)
                    break
                case 'window.selected':
                    hwndInfo.snum = data.info.snum
                    hwndInfo.getCurrentWindow && hwndInfo.getCurrentWindow(data.info.snum)
                    break
                case 'video.close':
                    hwndInfo.snum = data.info.wndId
                    hwndInfo.closeWindowSuccess && hwndInfo.closeWindowSuccess({
                        isAll: data.info.isAll,
                        snum: hwndInfo.snum
                    })
                    break
                case 'talk.close':
                    hwndInfo.snum = data.info.wndId
                    hwndInfo.closeTalkSuccess && hwndInfo.closeTalkSuccess({
                        isAll: data.info.isAll,
                        snum: hwndInfo.snum
                    })
                    break
                case 'web.captureCallBack':
                    var imageUrl = data.info.PicBuf ? downloadFileByBase64(data.info.PicBuf) : ''
                    hwndInfo.snapshotSuccess && hwndInfo.snapshotSuccess({
                        base64Url: data.info.PicBuf,
                        path: imageUrl
                    })
                    break
                case 'window.LocalRecordFinish':
                    hwndInfo.videoDownloadSuccess && hwndInfo.videoDownloadSuccess(data.info.path)
                    break;
                case 'video.window.clicked':
                    hwndInfo.clickWindow && hwndInfo.clickWindow(data.info.wndIndex)
                    break;
                case 'video.division.change':
                    hwndInfo.changeDivision && hwndInfo.changeDivision(data.info.division)
                      // data.info.row  data.info.col
                    break;
                default:
                  break;
                }
            }
        var onError = null
        var onSuccess = null
        if (window.dhPlayerControl.callBackList[data['id']]) {
            onError = window.dhPlayerControl.callBackList[data['id']].onError
            onSuccess = window.dhPlayerControl.callBackList[data['id']].onSuccess
        }
        if (data.code != 0) {
            if (onError && typeof onError === 'function') {
                onError(data)
                delete window.dhPlayerControl.callBackList[data['id']]
            }
            return
        }
        // var option = this.setting.option_id[data.id]
        // if (!option) {
        //     return
        // }
        window.dhPlayerControl.wsSession = data.session
        if (onSuccess && typeof onSuccess === 'function') {
            onSuccess(data)
            delete window.dhPlayerControl.callBackList[data['id']]
        }
    }
    // socket /Oxc 选择
    function sendSocket(option, callBack) {
        //区分IE
        if(!['window.change', 'window.shield'].includes(option.method)) {
            console.log('web', JSON.stringify(option))
        } else {
            var paramName = 'before' + option.method.split('.')[1]
            if(this[paramName] && JSON.stringify(option.info) === JSON.stringify(this[paramName])) {
                return false
            }
            this[paramName] = option.info
        }
        window.dhPlayerControl.videoWS && window.dhPlayerControl.videoWS.readyState == 1 && window.dhPlayerControl.videoWS.send(JSON.stringify(option))
    }
    //主动关闭socket
    function socketClose() {
        window.dhPlayerControl.videoWS && window.dhPlayerControl.videoWS.close()
        window.dhPlayerControl.videoWS = null
        window.wsHeart = clearInterval(window.wsHeart)
    }

    //获取浏览器和对应浏览器版本
    function broswerInfo() {
        //前置条件
        var _broswer = function () {
            // 浏览器判断和版本号读取
            var Sys = {}
            var userAgent = navigator.userAgent.toLowerCase()
            var s;
            (s = userAgent.match(/edge\/([\d.]+)/)) ?
            (Sys.edge = s[1]) :
            (s = userAgent.match(/rv:([\d.]+)\) like gecko/)) ?
            (Sys.ie = s[1]) :
            (s = userAgent.match(/msie ([\d.]+)/)) ?
            (Sys.ie = s[1]) :
            (s = userAgent.match(/firefox\/([\d.]+)/)) ?
            (Sys.firefox = s[1]) :
            (s = userAgent.match(/chrome\/([\d.]+)/)) ?
            (Sys.chrome = s[1]) :
            (s = userAgent.match(/opera.([\d.]+)/)) ?
            (Sys.opera = s[1]) :
            (s = userAgent.match(/version\/([\d.]+).*safari/)) ?
            (Sys.safari = s[1]) :
            0

            if (Sys.edge)
                return {
                    broswer: 'Edge',
                    version: Sys.edge,
                }
            if (Sys.ie)
                return {
                    broswer: 'IE',
                    version: Sys.ie,
                }
            if (Sys.firefox)
                return {
                    broswer: 'Firefox',
                    version: Sys.firefox,
                }
            if (Sys.chrome)
                return {
                    broswer: 'Chrome',
                    version: Sys.chrome,
                }
            if (Sys.opera)
                return {
                    broswer: 'Opera',
                    version: Sys.opera,
                }
            if (Sys.safari)
                return {
                    broswer: 'Safari',
                    version: Sys.safari,
                }

            return {
                broswer: '',
                version: '0',
            }
        }
        var _version = _broswer()

        if (_version.broswer == 'IE') {
            return 0
        } else if (_version.broswer == 'Chrome') {
            return 1
        } else if (_version.broswer == 'Firefox') {
            return 2
        } else {
            return -1
        }
    }

    //判断元素是否可见
    function isVisible(name, type) {
		type = type ? type : 'id';
        if(document.visibilityState == 'hidden') {
            return false
        }
        var el = null
        if (type === 'class') {
            el = document.getElementsByClassName(name)[0]
        } else {
            el = document.getElementById(name)
        }
        if (!name || !el) {
            type === 'id' && (this.setting.visible = false)
            return false
        }
        var windowWith = document.documentElement.clientWidth;
        var windowHeight = document.documentElement.clientHeight;
        var rect = getRect.call(this, type === 'id' ? '' : name)
        var left = rect.left,
            top = rect.top,
            right = rect.right,
            bottom = rect.bottom;
        if (top >= windowHeight || bottom <= 0 || right <= 0 || left >= windowWith) {
            type === 'id' && (this.setting.visible = false)
            return false
        }
        var loopable = true,
            visible = getComputedStyle(el).display != 'none' && getComputedStyle(el).visibility != 'hidden';

        while (loopable && visible) {
            el = el.parentNode;
            if (el && el != document.body) {
                visible = getComputedStyle(el).display != 'none' && getComputedStyle(el).visibility != 'hidden';
            } else {
                loopable = false;
            }
        }
        type === 'id' && (this.setting.visible = visible)
        return visible;
    }

    // 获取视频位置
    function getRect(name) {
        var el = ''
        var videoId = this.setting.videoId
        if (name) {
            el = document.getElementsByClassName(name)[0]
        } else {
            el = document.getElementById(videoId)
        }
        if(!el) {
            return {}
        }
        var windowSize = getWindowSize.call(this)
        var windowWidth = windowSize.width
        var windowHeight = windowSize.height
        var rect = el.getBoundingClientRect()
        var zoom = detectZoom()
        var outLeft = 0
        var outTop = 0
        var outHeight = 0
        var outWidth = 0
        var pOutContent;
        if(this.setting.isPIframe) {
            pOutContent = this.setting.pIframeRect
            outWidth = pOutContent.width || this.setting.outContent.width
            outHeight = pOutContent.height || this.setting.outContent.height
            outLeft = pOutContent.left
            outTop = pOutContent.top
            var scrollX = outWidth + outLeft - windowWidth
            var scrollY = outHeight + outTop - windowHeight
            outWidth = (outWidth - scrollX) * zoom / 100
            outHeight = (outHeight - scrollY) * zoom / 100
        } else {
            var iframes = window.parent.document.getElementsByTagName('iframe')
            var pIframe = null
            for (var i = 0; i < iframes.length; i++) {
                var dom = ''
                if (name) {
                    dom = iframes[i].contentWindow.document.getElementsByClassName(name)[0]
                } else {
                    dom = iframes[i].contentWindow.document.getElementById(videoId)
                }
                if (dom) {
                    pIframe = iframes[i]
                    break
                }
            }
            if (pIframe) {
                pOutContent = pIframe.getBoundingClientRect()
                outWidth = this.setting.outContent.width || pOutContent.width
                outHeight = this.setting.outContent.height || pOutContent.height
                outLeft = pOutContent.left
                outTop = pOutContent.top
                var scrollX = outWidth + outLeft - windowWidth
                var scrollY = outHeight + outTop - windowHeight
                outWidth = (outWidth - scrollX) * zoom / 100
                outHeight = (outHeight - scrollY) * zoom / 100
            }
        }
        var left = rect.left + (this.setting.outContent.left || outLeft)
        var top = rect.top + (this.setting.outContent.top || outTop)
        left = left * zoom / 100
        top = top * zoom / 100
        rect.width = rect.width * zoom / 100
        rect.height = rect.height * zoom / 100
        var right = left + rect.width
        var bottom = top + rect.height
        return {
            left,
            top,
            right,
            bottom,
            outLeft: (this.setting.outContent.left || outLeft) * zoom / 100,
            outTop: (this.setting.outContent.top || outTop) * zoom / 100,
            outWidth,
            outHeight,
            width: rect.width,
            height: rect.height,
        }
    }

    var VideoPlayer = function (option) {
        if (!option) {
            throw new Error('请传入配置参数')
        }
        if (this instanceof VideoPlayer) {
            var _setting = {
                isIE: !!window.ActiveXObject || 'ActiveXObject' in window, //判断是否为IE
                videoId: 'DHVideoPlayer',
                windowType: 0, //0-普通预览，1-普通回放（含分屏、不含时间轴），2-预览（不含分屏），3-录像回放（不含分屏、含时间轴）
                outContent: {
                    left: 0,
                    right: 0,
                    width: 0,
                    height: 0
                },
                show: true, //当前窗口显示状态，隐藏：false，显示：true
                connectTime: 60, //尝试连接时间，默认60s，60s后断开尝试连接
                connectSuccess: null, //初始化成功
                connectError: null, //初始化失败
                connectClose: null, //关闭
                option_id: {},
                heartCount: 0, //心跳失败计数
                refreshTimer: null,
                browserType: 1,
                isDestroy: false,
                version: 0,
                stopRefresh: false, //停止一直刷新
                visible: false,
                showBar: true, //是否显示下方控制栏。 true: 显示， false：隐藏
                hwnd: '', //窗口句柄
                snum: 0, //子窗口编号
                mount: true, //挂载方式 true 挂载为浏览器子窗口 false 独立窗口
                num: 1, //子窗口数
                isPIframe: false, // 默认不是iframe嵌入
                topInnerWidth: 0, // iframe模式下的顶层宽度
                topInnerHeight: 0, // iframe模式下的顶层高度
                parentIframeShieldRect: [], // iframe模式下遮罩的数据信息
                pIframeRect: [] // iframe模式下 iframe的数据信息
            }
            this.setting = Object.assign({}, _setting, option)
            if (_setting.isIE) {
                var dom = document.getElementById(this.setting.videoId)
                this.setting.ieDom = this.setting.videoId + '_box'
                var el = document.createElement('object')
                el.setAttribute('id', this.setting.ieDom)
                el.setAttribute('classid', 'clsid:1e68fa30-f1b5-4bbe-b483-8caaa2a3995a')
                el.style.width = '100%'
                el.style.height = '100%'
                dom.appendChild(el)
            }
            this.adjustCount = 0
            this.focus = false
            this.init()
        } else {
            return new VideoPlayer(option)
        }
    }
    VideoPlayer.fn = VideoPlayer.prototype = {
        //浏览器关闭或者刷新
        onbeforeunload: function () {
            this.destroy()
            socketClose()
        },
        //发送消息
        send: function (option, callBack) {
            if (callBack && Object.keys(callBack).length) {
                window.dhPlayerControl.callBackList[option['id']] = callBack
            }
            if (this.setting.isIE) {
                this.MainCall(option)
            } else {
                sendSocket.call(this, option)
            }
        },
        // 创建视频窗口
        create: function (callBack = {
            onSuccess: this.setting.createSuccess,
            onError: this.setting.createError
        }) {
            var rect = getRect.call(this)
            var _info = Object.assign({}, {}, rect)
            var windowSize = getWindowSize.call(this)
            _info.num = this.setting.num
            _info.toolBar = this.setting.showBar ? 1 : 0
            _info.windowType = this.setting.windowType
            _info.browserType = this.setting.browserType
            _info.clientAreaHeight = windowSize.height
            _info.clientAreaWidth = windowSize.width
            this.setTopBind = this.setTop.myBind(this);
            this.onbeforeunloadBind = this.onbeforeunload.myBind(this);
            this.visibilitychangeBind = this.setVisible.myBind(this);
            var that = this
            this.send({
                method: 'window.create',
                info: _info,
                id: window.dhPlayerControl.wsConnectCount++,
                session: window.dhPlayerControl.wsSession,
            }, {
                onSuccess: function (data) {
                    if (data.data && data.data.hwnd != null) {
                        var hwnd = data.data.hwnd
                        that.setting.hwnd = hwnd
                        window.dhPlayerControl.hwndList[hwnd] = that.setting
                    }
                    that.setTopBind = that.setTop.myBind(that);
                    window.addEventListener('beforeunload', that.onbeforeunload.myBind(that))
                    document.addEventListener('click', that.setTopBind)
                    that.handleAdjust()
                    document.addEventListener('visibilitychange', that.visibilitychangeBind, true)
                    callBack.onSuccess && callBack.onSuccess(data)
                },
                onError: function () {
                    callBack.onError && callBack.onError(data)
                }
            })
        },
        setVisible() {
            if (document.visibilityState == 'hidden') {
                this.hide()
            } else {
                if (isVisible.call(this, this.setting.videoId)) {
                    this.show()
                }
            }
        },
        //页面聚焦
        setTop() {
            this.focus = true
            !this.setting.isDestroy && this.browserFocusBlur()
        },
        browserFocusBlur: function (option, callBack) {
            var _option = this.extendOption(['hwnd', 'snum', 'show'], option)
            this.send({
                    method: 'browserFocusBlur',
                    info: {
                        hwnd: _option.hwnd,
                        browserType: this.setting.browserType,
                        show: this.setting.show,
                        focus: this.focus
                    },
                    session: window.dhPlayerControl.wsSession
                },
                callBack
            )
        },
        //刷新窗口位置
        handleAdjust: function () {
            if(!this.setting.isPIframe && (this.setting.stopRefresh || this.setting.isDestroy)) {
                return
            }
            var _this = this;
            // 每5帧执行一次
            if (this.adjustCount % 5) {
                this.adjustCount++;
            } else {
                this.adjustCount = 1;
                this.changePosition();
                this.windowShield(this.cover());
            }
            this.setting.refreshTimer = window.requestAnimationFrame(function () {
                return _this.handleAdjust();
            });
        },
        removeClickEventListener: function() {
            document.removeEventListener('click', this.setTopBind)
        },
        addClickEventListener: function() {
            document.addEventListener('click', this.setTopBind)
        },
        //销毁视频窗口
        destroy: function (callBack) {
            var _option = this.extendOption(['hwnd'])
            this.send({
                    method: 'window.destroy',
                    info: {
                        hwnd: _option.hwnd,
                        browserType: this.setting.browserType,
                    },
                    id: window.dhPlayerControl.wsConnectCount++,
                    session: window.dhPlayerControl.wsSession
                },
                callBack
            )
            this.setting.isDestroy = true
            this.setting.isPIframe = false;
            document.removeEventListener('click', this.setTopBind)
            document.removeEventListener('visibilitychange', this.visibilitychangeBind, true)
            window.removeEventListener('beforeunload', this.onbeforeunload.myBind(this))
        },
        // 设置屏幕悬浮文字
        setOSDInfo: function(option, callBack) {
            var _option = this.extendOption(['hwnd', 'snum'], option)
            this.send({
                    method: 'video.setOSDInfo',
                    info: {
                        hwnd: _option.hwnd,
                        snum: _option.snum,
                        R: _option.R || 255,
                        G: _option.G || 255,
                        B: _option.B || 255,
                        fontSize: _option.fontSize || 14,
                        positionX: _option.positionX || 1,
                        positionY: _option.positionY || 1,
                        osdInfo: _option.osdInfo || "",
                        fontWeight: _option.fontWeight || 0,
                    },
                    id: window.dhPlayerControl.wsConnectCount++,
                    session: window.dhPlayerControl.wsSession
                },
                callBack
            )
        },
        // 设置窗口是否支持拖拽
        setWindowDragEnable: function(option, callBack) {
            var _option = this.extendOption(['hwnd'], option)
            this.send({
                    method: 'window.enableDrag',
                    info: {
                        hwnd: _option.hwnd,
                        enable: _option.enable || false
                    },
                    id: window.dhPlayerControl.wsConnectCount++,
                    session: window.dhPlayerControl.wsSession
                },
                callBack
            )
        },
        // 设置全屏
        setFullScreen: function(option, callBack) {
            var _option = this.extendOption(['hwnd'], option)
            this.send({
                    method: 'video.fullScreen',
                    info: {
                        hwnd: _option.hwnd,
                    },
                    id: window.dhPlayerControl.wsConnectCount++,
                    session: window.dhPlayerControl.wsSession
                },
                callBack
            )
        },
        /**
         * @method chooseWindow 支持用户选择子窗口
         * @param { Number } snum 选择的子窗口，从0开始
         */
        chooseWindow: function (snum, callBack = {
            onSuccess: this.setting.chooseWindowSuccess,
            onError: this.setting.chooseWindowError
        }) {
            this.send({
                    method: 'window.select',
                    info: {
                        hwnd: this.setting.hwnd,
                        snum: snum
                    },
                    id: window.dhPlayerControl.wsConnectCount++,
                    session: window.dhPlayerControl.wsSession,
                },
                callBack
            )
            this.windowShield(this.cover())
        },
        /**
         * @method openAudio 开启、关闭声音
         * @param { Number } option.isEnable 0-关闭，1-开启
         * @param { Number } option.snum 选择的子窗口，从0开始
         * @param { Number } option.videoType 0-预览音频，1-回放音频
         */
        openAudio: function(option, callBack) {
            var _option = this.extendOption(['hwnd', 'snum'], option)
            this.send({
                    method: 'video.enableAudio',
                    info: {
                        hwnd: _option.hwnd,
                        snum: _option.snum,
                        isEnable: _option.isEnable,
                        videoType: _option.videoType,
                        browserType: this.setting.browserType,
                    },
                    id: window.dhPlayerControl.wsConnectCount++,
                    session: window.dhPlayerControl.wsSession,
                },
                callBack
            )
        },
        /**
         * @method realmonitor 实时预览
         * @param { Number } option.snum 选择的子窗口，从0开始
         * @param { String } option.path 预览地址
         * @param { Boolean } option.redirect 默认重定向，非重定向需用户自己传 option.redirect=false
         */
        realmonitor: function (option, callBack = {
            onSuccess: this.setting.realTimeSuccess,
            onError: this.setting.realTimeError
        }) {
            var _option = this.extendOption(['hwnd', 'snum'], option)
            var _info = {}
            _info.hwnd = _option.hwnd
            _info.snum = _option.snum
            _info.path = _option.path
            _info['browserType'] = this.setting.browserType
            _info.redirect = typeof _option.redirect === 'boolean' ? _option.redirect : true //默认重定向，非重定向需用户自己传 option.redirect=false
            this.send({
                    method: 'video.realmonitor',
                    info: _info,
                    id: window.dhPlayerControl.wsConnectCount++,
                    session: window.dhPlayerControl.wsSession,
                },
                callBack
            )
            this.windowShield(this.cover())
        },
        /**
         * @method talk 对讲
         * @param { Number } option.snum 选择的子窗口，从0开始
         * @param { String } option.path 预览地址
         */
        talk: function (option, callBack) {
            var _option = this.extendOption(['hwnd', 'snum'], option)
            _option['browserType'] = this.setting.browserType
            this.send({
                    method: 'video.starttalk',
                    info: _option,
                    id: window.dhPlayerControl.wsConnectCount++,
                    session: window.dhPlayerControl.wsSession,
                },
                callBack
            )
            this.windowShield(this.cover())
        },
        /**
         * @method playback 录像回放
         * @param { Number } option.snum 选择的子窗口，从0开始
         * @param { String } option.path 回放地址
         * @param { Array } option.records 包含某个时间段的录像文件信息
         * @param { Number } option.startTime 时间相关均为时间戳,具体参考大华播放空间开发手册
         * @param { Boolean } option.redirect 默认重定向，非重定向需用户自己传 option.redirect=false
         */
        playback: function (option, callBack = {
            onSuccess: this.setting.playbackSuccess,
            onError: this.setting.playbackError
        }) {
            var _option = this.extendOption(['hwnd', 'snum'], option)
            var _info = {}
            _info.hwnd = _option.hwnd
            _info.snum = _option.snum
            _info.path = _option.path
            _info.records = _option.records
            _info.startTime = _option.startTime
            _info.endTime = _option.endTime
            _info.playStartTime = _option.playStartTime
            _info.playEndTime = _option.playEndTime
            _info.browserType = this.setting.browserType
            _info.redirect = typeof _option.redirect === 'boolean' ? _option.redirect : true
            if (_option.playStartTime) {
                var beforeStart = getUrlParam(_info.path, 'begintime')
                _info.path = _info.path.replace(beforeStart, _option.playStartTime)
            }
            this.send({
                    method: 'video.playback',
                    info: _info,
                    id: window.dhPlayerControl.wsConnectCount++,
                    session: window.dhPlayerControl.wsSession,
                },
                callBack
            )
            this.windowShield(this.cover())
        },
        changePosition: function (option, callBack) {
            var _option = this.extendOption(['hwnd'], option)
            var windowSize = getWindowSize.call(this)
            var rect = getRect.call(this)
            var _info = Object.assign({}, {}, rect, _option)
            _info['browserType'] = this.setting.browserType
            _info.clientAreaHeight = windowSize.height
            _info.clientAreaWidth = windowSize.width
            _info.screenX = window.screenX
            _info.screenY = window.screenY
            _info.show = isVisible.call(this, this.setting.videoId)
            this.send({
                    method: 'window.change',
                    info: _info,
                    session: window.dhPlayerControl.wsSession,
                },
                callBack
            )
        },
        // 隐藏视频
        hide: function (callBack = {
            onSuccess: this.setting.hideWindowSuccess,
            onError: this.setting.hideWindowError
        }) {
            var _option = this.extendOption(['hwnd'])
            this.setting.show = false
            this.setting.stopRefresh = true
            this.send({
                    method: 'window.show',
                    info: {
                        hwnd: _option.hwnd,
                        show: false,
                        browserType: this.setting.browserType,
                    },
                    id: window.dhPlayerControl.wsConnectCount++,
                    session: window.dhPlayerControl.wsSession,
                },
                callBack
            )
        },
        //显示视频
        show: function () {
            var that = this
            var _option = this.extendOption(['hwnd'])
            this.setting.stopRefresh = false
            this.setting.show = true
            this.send({
                    method: 'window.show',
                    info: {
                        hwnd: _option.hwnd,
                        show: true,
                        browserType: this.setting.browserType,
                    },
                    id: window.dhPlayerControl.wsConnectCount++,
                    session: window.dhPlayerControl.wsSession,
                },
                {
                    onSuccess: function() {
                        if(that.setting.refreshTimer) {
                            window.cancelAnimationFrame(that.setting.refreshTimer)
                        }
                        that.handleAdjust()
                        that.setting.showWindowSuccess && that.setting.showWindowSuccess()
                    },
                    onError: this.setting.showWindowError
                }
            )
        },
		/**
         * @method downloadRecord 录像下载
         * @param { Number } option.snum 选择的子窗口，从0开始
         * @param { String } option.url 下载地址
         * @param { Array } option.records 包含某个时间段的录像文件信息
         * @param { Number } option.startTime 时间相关均为时间戳,具体参考大华播放空间开发手册
         * @param { Number } option.endTime 时间相关均为时间戳,具体参考大华播放空间开发手册
         * @param { Boolean } option.redirect 默认重定向，非重定向需用户自己传 option.redirect=false
         */
        downloadRecord: function (option, callBack = {
            onSuccess: this.setting.downloadRecordSuccess,
            onError: this.setting.downloadRecordError
        }) {
			console.log("downloadRecord1");
            var _option = this.extendOption(['hwnd', 'snum'], option)
            var _info = {}
            _info.hwnd = _option.hwnd
            _info.snum = _option.snum
            _info.url = _option.url
            _info.records = _option.records
            _info.startTime = _option.startTime
            _info.endTime = _option.endTime
            _info.browserType = this.setting.browserType
            _info.redirect = typeof _option.redirect === 'boolean' ? _option.redirect : true
            this.send({
                    method: 'video.downloadByTime',
                    info: _info,
                    id: window.dhPlayerControl.wsConnectCount++,
                    session: window.dhPlayerControl.wsSession,
                },
                callBack
            )
            this.windowShield(this.cover())
        },
        /**
         * @method closeVideo 关闭指定窗口视频或全部关闭
         * @param { Number } option.snum 选择的子窗口，从0开始
         * @param { Boolean } option.isAll 是否全部关闭
         */
        closeVideo: function (option, callBack = {
            onSuccess: this.setting.closeVideoSuccess,
            onError: this.setting.closeVideoError
        }) {
            var _option = this.extendOption(['hwnd', 'snum'], option)
            this.send({
                    method: 'video.close',
                    info: {
                        hwnd: _option.hwnd,
                        snum: _option.snum,
                        isAll: option.isAll
                    },
                    id: window.dhPlayerControl.wsConnectCount++,
                    session: window.dhPlayerControl.wsSession,
                },
                callBack
            )
        },
        /**
         * @method closeTalk 关闭指定窗口对讲或全部关闭
         * @param { Number } option.snum 选择的子窗口，从0开始
         * @param { Boolean } option.isAll 是否全部关闭
         */
        closeTalk: function (option, callBack = {
            onSuccess: this.setting.closeTalkSuccess,
            onError: this.setting.closeTalkError
        }) {
            var _option = this.extendOption(['hwnd', 'snum'], option)
            this.send({
                    method: 'video.closetalk',
                    info: {
                        hwnd: _option.hwnd,
                        snum: _option.snum,
                        isAll: option.isAll
                    },
                    id: window.dhPlayerControl.wsConnectCount++,
                    session: window.dhPlayerControl.wsSession,
                },
                callBack
            )
        },
        /**
         * @method continuePlayback 操作录像
         * @param { Number } option.snum 选择的子窗口，从0开始
         * @param { Number } option.state 窗口状态：0-暂停，1-继续
         */
        controlPlayback: function (option, callBack = {
            onSuccess: this.setting.controlPlaybackSuccess,
            onError: this.setting.controlPlaybackError
        }) {
            var _option = this.extendOption(['hwnd', 'snum'], option)
            this.send({
                    method: 'video.playbackChangeState',
                    info: {
                        hwnd: _option.hwnd,
                        snum: _option.snum,
                        state: option.state
                    },
                    id: window.dhPlayerControl.wsConnectCount++,
                    session: window.dhPlayerControl.wsSession,
                },
                callBack
            )
        },
        //显示下方控制栏, show: true-显示，false-隐藏
        showControlBar: function (show) {
            var _option = this.extendOption(['hwnd'])
            this.send({
                method: 'video.setToolBarShow',
                info: {
                    hwnd: _option.hwnd,
                    isShow: show ? 1 : 0,
                    browserType: this.setting.browserType,
                },
                id: window.dhPlayerControl.wsConnectCount++,
                session: window.dhPlayerControl.wsSession,
            })
        },
        /**
         * @method continuePlayback 本地录像下载
         * @param { Number } snum 选择的子窗口，从0开始
         */
        localRecordDownload: function (snum, callBack = {
            onSuccess: this.setting.recordDownloadSuccess,
            onError: this.setting.recordDownloadError
        }) {
            this.send({
                    method: 'vidoe.localRecord',
                    info: {
                        hwnd: this.setting.hwnd,
                        snum,
                    },
                    id: window.dhPlayerControl.wsConnectCount++,
                    session: window.dhPlayerControl.wsSession,
                },
                callBack
            )
        },
        /**
         * @method video.division.change 切换当前控件展示的窗口数量
         * @param {*} divisionNum 当前控件展示的窗口数量
         */
         changeDivision: function (divisionNum) {
          var _option = this.extendOption(['hwnd'])
          this.send({
              method: "video.division.change",
              info: {
                        "hwnd": _option.hwnd,
                        "browserType": this.setting.browserType,
                        // "row": 0, // 保留字段，暂不支持
                        // "col": 0, // 保留字段，暂不支持
                        "division": divisionNum
              },
              id: window.dhPlayerControl.wsConnectCount++,
              session: window.dhPlayerControl.wsSession,
          })
        },
        //窗口抓图
        snapshot: function (snum) {
            this.send({
                method: 'video.snapic',
                info: {
                    hwnd: this.setting.hwnd,
                    snum,
                },
                id: window.dhPlayerControl.wsConnectCount++,
                session: window.dhPlayerControl.wsSession,
            })
        },
        // 视频被遮挡处理
        windowShield: function (option, callBack) {
            var _option = this.extendOption(['hwnd'], option)
            var windowSize = getWindowSize.call(this)
            var _info = {}
            _info.hwnd = _option.hwnd
            _info['browserType'] = this.setting.browserType
            _info.region = this.getShieldRect(option)
            _info['clientAreaHeight'] = windowSize.height
            _info['clientAreaWidth'] = windowSize.width
            this.send({
                    method: 'window.shield',
                    info: _info,
                    id: window.dhPlayerControl.wsConnectCount++,
                    session: window.dhPlayerControl.wsSession,
                },
                callBack
            )
        },
        // 视频插件版本号
        version: function (callBack) {
            this.send({
                    method: 'common.version',
                    info: {},
                    id: window.dhPlayerControl.wsConnectCount++,
                    session: window.dhPlayerControl.wsSession,
                },
                callBack
            )
        },
        getWindowState: function (callBack) {
            var _option = this.extendOption(['hwnd'])
            this.send({
                    method: 'window.getWindowState',
                    info: {
                        hwnd: _option.hwnd,
                    },
                    id: window.dhPlayerControl.wsConnectCount++,
                    session: window.dhPlayerControl.wsSession,
                },
                callBack
            )
        },
        cover: function () {
            var rect = getRect.call(this)
            var windowSize = getWindowSize.call(this)
            var left = rect.left,
                top = rect.top,
                right = rect.right,
                bottom = rect.bottom + 1,
                width = rect.width,
                height = rect.height,
                outLeft = rect.outLeft,
                outTop = rect.outTop,
                outWidth = rect.outWidth,
                outHeight = rect.outHeight;
            var width_cover, height_cover, left_cover, top_cover
            var arr = []
            //判断左边
            if (left < outLeft) {
                width_cover = outLeft - left
                arr.push(left, top, width_cover, height)
            }
            if (top < outTop) {
                height_cover = outTop - top
                arr.push(left, top, width, height_cover)
            }
            var win_width = (outWidth + outLeft) || windowSize.width
            var win_height = (outHeight + outTop) || windowSize.height
            // 判断右边
            if (win_width - right < 0) {
                //页面太窄，显示不下视频的情况
                left_cover = win_width
                width_cover = right - left_cover
                arr.push(left_cover, top, width_cover, height)
            }

            if (win_height - bottom < 0) {
                //页面太低，显示不下视频的情况
                height_cover = bottom - win_height
                arr.push(left, win_height, width, height_cover)
            }

            //特殊情况 有重叠部分再传一遍
            if (win_width - right < 0 && win_height - bottom < 0) {
                //右下
                width_cover = right - left_cover
                height_cover = bottom - win_height
                arr.push(win_width, win_height, width_cover, height_cover)
            }
            if (left < 0 && top < 0) {
                // 左上
                width_cover = Math.abs(left)
                height_cover = Math.abs(top)
                arr.push(left, top, width_cover, height_cover)
            }
            if (win_width - right < 0 && top < 0) {
                //右上
                left_cover = win_width
                width_cover = right - left_cover
                height_cover = -top
                arr.push(left_cover, top, width_cover, height_cover)
            }
            if (left < 0 && win_height - bottom < 0) {
                //左下
                top_cover = win_height
                width_cover = -left
                height_cover = bottom - top_cover
                arr.push(left, top_cover, width_cover, height_cover)
            }
            return arr
        },
        // copy
        extendOption: function (ids, option) {
            var map = {}
            for (var i = 0; i < ids.length; i++) {
                map[ids[i]] = this.setting[ids[i]]
            }
            return Object.assign({}, map, option)
        },
        //遮挡部分位置获取
        getShieldRect: function (option) {
            var shieldClass = this.setting.shieldClass || []
            var rect,
                arr = option || []
            for (var i = 0; i < shieldClass.length; i++) {
                if (!isVisible.call(this, shieldClass[i], 'class')) {
                    continue
                }
                rect = getRect.call(this, shieldClass[i])
                arr.push(rect.left, rect.top, rect.width, rect.height)
            }
            if (this.setting.isPIframe) {
                arr.push(...this.getIframeShieldRect())
            } else {
                var parentIframeShieldClass = this.setting.parentIframeShieldClass || []
                for (i = 0; i < parentIframeShieldClass.length; i++) {
                    if (!isVisible.call(this, parentIframeShieldClass[i], 'class', window.document)) {
                        continue
                    }
                    rect = getParentIframeRect.call(this, parentIframeShieldClass[i])
                    arr.push(rect.left, rect.top, rect.width, rect.height)
                }
            }
            return arr
        },
        // isIframe = true 的情况下，遮挡问题处理
        getIframeShieldRect: function() {
            addEventListener('message', e => {
                if(e.data.methods == 'shieldRect') {
                  this.setting.parentIframeShieldRect = e.data.parentIframeShieldRect
                }
                
            })
          let {left, top, width, height} = this.setting.parentIframeShieldRect
          return [left, top, width, height]
        },
        //获取操作系统
        getOsInfo: function () {
            var userAgent = window.navigator.userAgent.toLowerCase()
            var version = ''
            if (userAgent.indexOf('win') > -1) {
                if (userAgent.indexOf('windows nt 5.0') > -1 || userAgent.indexOf('Windows 2000') > -1) {
                    version = 'Windows 2000'
                } else if (userAgent.indexOf('windows nt 5.1') > -1 || userAgent.indexOf('Windows XP') > -1) {
                    version = 'Windows XP'
                } else if (userAgent.indexOf('windows nt 5.2') > -1 || userAgent.indexOf('Windows 2003') > -1) {
                    version = 'Windows 2003'
                } else if (userAgent.indexOf('windows nt 6.0') > -1 || userAgent.indexOf('Windows Vista') > -1) {
                    version = 'Windows Vista'
                } else if (userAgent.indexOf('windows nt 6.1') > -1 || userAgent.indexOf('windows 7') > -1) {
                    version = 'Windows 7'
                } else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows 8') > -1) {
                    version = 'Windows 8'
                } else if (userAgent.indexOf('windows nt 6.3') > -1) {
                    version = 'Windows 8.1'
                } else if (userAgent.indexOf('windows nt 6.4') > -1 || userAgent.indexOf('windows nt 10') > -1) {
                    version = 'Windows 10'
                } else {
                    version = 'Unknown'
                }
            } else if (userAgent.indexOf('iphone') > -1) {
                version = 'Iphone'
            } else if (userAgent.indexOf('mac') > -1) {
                version = 'Mac'
            } else if (
                userAgent.indexOf('x11') > -1 ||
                userAgent.indexOf('unix') > -1 ||
                userAgent.indexOf('sunname') > -1 ||
                userAgent.indexOf('bsd') > -1
            ) {
                version = 'Unix'
            } else if (userAgent.indexOf('linux') > -1) {
                if (userAgent.indexOf('android') > -1) {
                    version = 'Android'
                } else {
                    version = 'Linux'
                }
            } else {
                version = 'Unknown'
            }
            return version
        },
        initConnect: function () {
            //初始化成功
            this.setting.connectSuccess()
            this.create()
        },
        MainCall: function (option) {
            var dom = document.getElementById(this.setting.ieDom)
            if (option['method'] == 'common.heartbeat') {
                this.setting.heartCount++
                if (this.setting.heartCount >= 3) {
                    dom = null
                    this.setting.connectClose()
                    return
                }
            } else {
                this.setting.option_id[option.id] = option
            }
            dom && dom.MainCall(option.method, JSON.stringify(option))
        },
        init: function () {
            // 这里监听父级页面(用于处理跨域iframe的问题)
            addEventListener('message', e => {
                if(e.data.isPIframe) {
                      this.setting.topInnerWidth = e.data.topInnerWidth
                      this.setting.topInnerHeight = e.data.topInnerHeight
                      this.setting.parentIframeShieldRect = e.data.parentIframeShieldRect
                      this.setting.pIframeRect = e.data.pIframeRect
                      if(!this.setting.isPIframe) {
                          this.destroy();
                          setTimeout(() => {
                              this.setting.isPIframe = e.data.isPIframe
                              this.initPlayer();
                              console.log("初始化控件！")
                          }, 3000)
                          
                      }
                }
                return
            })
            this.initPlayer();
        },
        initPlayer: function() {
            var that = this
            if (this.setting.isIE) {
                this.initConnect()
            } else {
                if (!window.dhPlayerControl.wsConnect) {
                    window.dhPlayerControl.wsConnect = true
                    window.dhPlayerControl.videoList[that.setting.videoId] = this
                    socketPort.call(that)
                    setTimeout_close.call(that)
                } else if (window.dhPlayerControl.windowState === 'wsSuccess') {
                    this.setting.connectSuccess && this.setting.connectSuccess()
                    that.create()
                } else {
                    window.dhPlayerControl.videoList[that.setting.videoId] = this
                }
            }
            this.setting.browserType = broswerInfo()
        },
    }
    window.VideoPlayer = window.VideoPlayer || VideoPlayer
})()
