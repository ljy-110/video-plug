<template>
    <div>
        <div :id="videoId"></div>
        <div v-if="!noTip">
            <a-modal :footer="null" v-model="DHPVisible" class="dh-video-modal" :mask="false" width="280px">
                <div class="message">
                    <a-icon type="exclamation" class="messageIcon" />
                    <div class="Modalcontent">
                        <span v-if="upgradeDHP">视频插件已更新了~</span>
                        <span v-else>系统未检测到视频插件</span>
                        <a href="#" @click="downloadDhp">
                            <span v-if="upgradeDHP">更新插件</span>
                            <span v-else>下载插件</span>
                        </a>
                    </div>
                </div>
            </a-modal>
        </div>
    </div>
</template>

<script>
import '.videoPlayer'
import fn from './factory'
export default {
    name: 'DHPlayer',
    props: {
        videoId: {
            type: String,
            default: '1',
        },
        type: { //视频类型，1-实时视频，2-录像回放
            type: Number,
            default: 1,
        },
        realTimeList: { //实时预览列表
            type: Array,
            default () {
                return []
            }
        },
        videoPlayList: { //录像回放对象列表
            type: Array,
            default () {
                return []
            }
        },
        pathList: { //录像回放/实时视频路径列表
            type: Array,
            default () {
                return []
            }
        },
        windowType: { //窗口类型
            type: Number,
            default: 0,
        },
        num: { //子窗口个数
            type: Number,
            default: 1
        },
        connectTime: { //尝试连接事件，默认60s，一定时间连接断开，并弹出下载插件提示。
            type: Number,
            default: 60
        },
        outContent: { //当前窗口所处可视窗口的位置，比如iframe外部距离浏览器的位置
            type: Object,
            default () {
                return {
                    top: 0,
                    left: 0
                }
            },
        },
        downloadUrl: { //插件下载地址，ICC框架默认相对路径
            type: String,
            default: '/download/DHPlayer.zip',
        },
        showBar: { //是否显示下方控制栏。 true: 显示， false：隐藏
            type: Boolean,
            default: true
        },
        noTip: { //是否需要下载提示,默认需要，false。如果非ICC平台/未引入antd，可置为true
            type: Boolean,
            default: false
        },
        shieldClass: { //遮挡的元素class，尽量保证class元素的唯一
            type: Array,
            default () {
                return []
            }
        },
        parentIframeShieldClass: { //遮挡的父iframe元素class，尽量保证class元素的唯一
            type: Array,
            default () {
                return []
            }
        }
    },
    data() {
        return {
            videoPlayer: null,
            playbackList: [],
            DHPVisible: false,
            DHPUrl: this.downloadUrl,
            DHPVersion: '',
            upgradeDHP: false,
            api: fn(this),
            currentWindow: 0,
            divisionNum: 4
        }
    },
    beforeDestroy() {
        this.destroy()
    },
    mounted() {
        this.initVideo()
    },
    methods: {
        //销毁视频
        destroy() {
            this.videoPlayer.destroy()
        },
        //初始化视频插件
        initVideo() {
            if(this.videoPlayer) {
                this.destroy()
            }
            this.videoPlayer = new VideoPlayer({
                videoId: this.videoId,
                windowType: this.windowType,
                connectTime: this.connectTime,
                shieldClass: this.shieldClass,
                parentIframeShieldClass: this.parentIframeShieldClass,
                showBar: this.showBar,
                num: Math.pow(Math.ceil(Math.sqrt(this.pathList.length || (this.type === 1 ? this.realTimeList.length : this.videoPlayList.length))), 2) || this.num,
                outContent: this.outContent,
                connectSuccess: () => {
                    this.DHPVersion = window.dhPlayerControl.DHPlayerVersion
                    this.getVideoInfo(true)
                },
                //抓图成功
                snapshotSuccess: ({
                    base64Url,
                    path
                }) => {
                    this.$emit('picCap', {
                        base64Url,
                        path
                    })
                },
                //录像回放时间栏拖拽回调
                switchStartTime: ({
                    startTime,
                    snum
                }) => {
                    const record = this.playbackList[snum]
                    if (record) {
                        if (record.request) {
                            const videoParams = this.videoPlayList[snum]
                            let endTime = videoParams.endTime
                            if (startTime > endTime) {
                                !this.noTip && this.$message.warning('开始时间不得大于结束时间')
                                this.$emit('getError', '开始时间不得大于结束时间')
                                return false
                            }
                            this.dealRecord({
                                ...videoParams,
                                startTime
                            }, snum)
                        } else {
                            let endTime = this.getUrlParam(record.path, 'endtime') - 0
                            if (startTime > endTime) {
                                !this.noTip && this.$message.warning('开始时间不得大于结束时间')
                                this.$emit('getError', '开始时间不得大于结束时间')
                                return false
                            }
                            this.setPlayback({
                                ...record,
                                playStartTime: startTime
                            }, snum)
                        }
                    }
                    this.$emit('switchStartTime', {
                        startTime,
                        snum
                    })
                },
                replay: (snum) => { //录像回放播放结束回调，返回窗口
                    this.$emit('replay', snum)
                },
                videoDownloadSuccess: (path) => {
                    !this.noTip && this.$message.success(`本地录像已存到 ${path}`)
                    this.$emit('videoDownloadSuccess', path)
                },
                //关闭视频窗口回调
                closeWindowSuccess: ({
                    isAll,
                    snum
                }) => {
                    this.$emit('closeWindowSuccess', {
                        isAll,
                        snum
                    })
                },
                getCurrentWindow: (snum) => {
                    this.currentWindow = snum
                    this.$emit('getCurrentWindow', snum)
                },
                // 点击控件窗口触发返回当前点击的窗口index
                clickWindow: (snum) => {
                    this.currentWindow = snum
                    this.$emit('getCurrentWindow', snum)
                    console.log(`当前点击了第${snum}个窗口`);
                },
                // 控件切换窗口数量时触发此方法返回当前窗口总数
                changeDivision: (divisionNum) => {
                    this.divisionNum = divisionNum
                    this.$emit('changeDivision', divisionNum)
                },
                // 对讲
                setTalk(val, snum = 0) {
                  this.videoPlayer.talk({
                    snum,
                    path: val.path,
                    redirect: false, // 写死
                    audioType: val.audioType,
                    audioBit: val.audioBit,
                    sampleRate: val.sampleRate,
                    talkType: 1,
                  })
                },
                connectClose: () => {
                    this.videoPlayer = null
                    this.getVideoInfo(false)
                },
                createSuccess: (e) => {
                    if (!this.showBar) {
                        this.setShowBar(false)
                    }
                    if (this.pathList.length) {
                        this.loadVideo()
                    } else {
                        this.getRTSPURL()
                    }
                }
            })
        },
        getUrlParam(url, name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = url.match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return null; //返回参数值
        },
        //显隐控制栏
        setShowBar(show) {
            this.videoPlayer.showControlBar(show)
        },
        // 设置悬浮字体
        setOSDInfo(options){
            this.videoPlayer.setOSDInfo(options)
        },
        // 是否开启拖拽
        setDragEnable(enable) {
            this.videoPlayer.setWindowDragEnable({enable})
        },
        // 全屏
        setFullScreen() {
            this.videoPlayer.setFullScreen()
        },
        //根据路径获取视频
        loadVideo() {
            if (this.type === 1) {
                this.pathList.forEach((val, index) => {
                    let item = {
                        snum: index
                    }
                    if(typeof val === 'string') {
                        item.path = val
                    } else if(typeof val === 'object') {
                        item = {...item, ...val}
                    } else {
                        return val
                    }
                    this.setRealTime(item)
                })
            } else {
                const list = []
                this.pathList.forEach((val, index) => {
                    list.push({
                        ...val,
                        request: false
                    })
                    this.setPlayback(val, index)
                })
                this.playbackList = list
            }
        },
        //获取录像回放/实时预览路径
        getRTSPURL() {
            let streamType = 1
            if (this.type === 1) {
                streamType = this.realTimeList.length >= 4 ? 2 : 1
                this.realTimeList.forEach((val, index) => {
                    this.api.fetchRealRTSP({
                        data: {
                            streamType: val.streamType || streamType,
                            channelId: val.channelId,
                            dataType: val.dataType || 1
                        }
                    }).then(data => {
                        if (data.url) {
                            const url = this.dealUrl(data)
                            this.setRealTime({
                                path: url,
                                redirect: val.redirect,
                                snum: index
                            })
                        }
                    })
                })
            } else {
                streamType = this.videoPlayList.length >= 4 ? 2 : 1
                this.videoPlayList.forEach((val, index) => {
                    this.dealRecord(val, index)
                })
            }
        },
        //处理录像数据
        async dealRecord(val, index) {
            const records = await this.api.fetchRecord({
                data: {
                    ...val,
                    streamType: val.streamType || streamType,
                }
            })
            if (records.records && records.records.length) {
                const data = await this.api.fetchRTSP({
                    data: {
                        ...val,
                        streamType: val.streamType || streamType,
                        dataType: val.dataType || 1
                    }
                })
                if (data.url) {
                    const url = this.dealUrl(data)
                    const item = {
                        ...val,
                        path: url,
                        redirect: typeof val.redirect === 'boolean' ? val.redirect : url.indexOf(':9090') !== -1,
                        records: records.records
                    }
                    this.setPlayback(item, index)
                    this.playbackList[index] = {
                        ...item,
                        request: true
                    }
                }
            }
        },
        //实时预览
        setRealTime(options) {
            this.videoPlayer.realmonitor({
                ...options
            })
        },
        //录像回放
        setPlayback(val, snum = 0) {
            this.videoPlayer.playback({
                snum,
                records: val.records || [], // 内部可以设置参数，回放可进行拖动
                path: val.url || val.path,
                startTime: val.startTime,
                endTime: val.endTime,
                redirect: val.redirect,
                playStartTime: val.playStartTime || val.startTime,
                playEndTime: val.playEndTime || val.endTime
            })
        },
        // 对讲
        setTalk(val, snum = 0) {
          this.videoPlayer.talk({
            snum,
            path: val.path,
            redirect: false, // 写死
            audioType: val.audioType,
            audioBit: val.audioBit,
            sampleRate: val.sampleRate,
            talkType: 1,
          })
        },
        //rtsp路径拼接token
        dealUrl(data) {
            let path = data.url
            if (path.includes('|')) {
                path = path.split("|").map(item => {
                    return item + '?token=' + data.token
                }).reverse().join('|')
            } else {
                path = path + '?token=' + data.token
            }
            return path
        },
        //隐藏插件更新/下载提示
        hiddenDhp() {
            window.DHPVisible = this.DHPVisible = false
        },
        changeDivision(divisionNum) {
            this.videoPlayer.changeDivision(divisionNum)
        },
        //隐藏窗口
        hideWindow(callback) {
            this.videoPlayer.hide(callback)
        },
        //显示窗口
        showWindow(callback) {
            this.videoPlayer.show(callback)
        },
        //元素遮挡处理
        windowShield(option) {
            this.videoPlayer.windowShield(option)
        },
        /**
         * @method 获取录像插件版本
         * @param {Boolean} success 判断ws是否连接成功，true: 成功，比较版本号；false: 失败,下载插件
         **/
        getVideoInfo(success) {
            this.api.videoInfo().then(res => {
                this.DHPUrl = res.url
                if (res.version) {
                    res.version = '000000'
                }
                if (success && res.version > this.DHPVersion) {
                    this.upgradeDHP = true;
                    !window.DHPVisible && (window.DHPVisible = this.DHPVisible = true)
                }
                if (!success) {
                    !window.DHPVisible && (window.DHPVisible = this.DHPVisible = true)
                }
            }).catch((e) => {
                if (!success) {
                    !window.DHPVisible && (window.DHPVisible = this.DHPVisible = true)
                }
            })
        },
        downloadDhp() {
            window.location.href = this.DHPUrl
            this.hiddenDhp()
        },
    }
}
</script>
<style>
.dh-video-modal {
    width: 100%;
}

.dh-video-modal .ant-modal-content {
    border: 1px solid #ffa302;
    background: #fff7e9;
    color: #ffa302;

}

.dh-video-modal .message {
    display: flex;
    align-items: center;
}

.dh-video-modal .ant-modal-close-x {
    display: none;
}

.dh-video-modal .ant-modal-body {
    padding: 0 20px;
    font-size: 14px;
    word-wrap: break-word;
    height: 40px;
    line-height: 40px;
    margin-left: 0;
}

.dh-video-modal .messageIcon {
    background: #ffa302;
    border-radius: 50%;
    color: #fff;
    font-size: 16px;
    margin-right: 5px;
}

.dh-video-modal .Modalcontent a {
    margin-left: 15px;
}
</style>
