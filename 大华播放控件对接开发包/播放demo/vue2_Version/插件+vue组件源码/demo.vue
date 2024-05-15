<template>
    <a-tabs default-active-key="1" v-model="activeKey">
        <a-tab-pane key="1" tab="Tab 1">
            <div id="videoBox">
                <div style="margin-bottom: 10px">
                    <a-radio-group v-model="videoType">
                        <a-radio value="video1">
                            实时视频
                        </a-radio>
                        <a-radio value="video2">
                            录像回放
                        </a-radio>
                    </a-radio-group>
                </div>
                <a-button @click="destroy">销毁</a-button>
                <a-button @click="init">重新创建</a-button>
                <a-button @click="closeVideo">关闭选中视频窗口</a-button>
                <a-button @click="openAudio(true)">开启声音</a-button>
                <a-button @click="openAudio(false)">关闭声音</a-button>
                <a-button @click="snapshot">抓图</a-button>
                <a-button @click="setFullScreen">全屏</a-button>
                <template v-if="videoType === 'video2'">
                    <a-button @click="pauseVideo">录像暂停</a-button>
                    <a-button @click="continueVideo">录像继续</a-button>
                </template>
                <a-button @click="download">{{startDownload ? '停止' : '开始'}}本地录像下载</a-button>
                <div>
                    当前窗口数量：<a-input type="number" v-model="divisionNum" style="width: 100px"></a-input>
                    <a-button @click="changeDivision">确定</a-button>
                </div>
                <br />
                <div>
                  请选择窗口和是否重定向进行 {{videoType === 'video1' ? '实时视频' : '录像回放'}} 播放：<br />
                    选择窗口: <a-input type="number" v-model="currentNum" style="width: 100px"></a-input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    当前窗口是否开启重定向：<a-switch v-model="isRedirect"></a-switch> 默认关闭&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span v-if="videoType === 'video1'">实时路径：<a-input v-model="path" style="width: 500px"></a-input></span>
                    <span v-if="videoType === 'video2'">录像路径：<a-input v-model="path2" style="width: 500px"></a-input></span>
                    <a-button @click="changeUrl">确定</a-button>
                    <br />
                </div>
                <div v-if="videoType === 'video1'">
                  对讲rtsp：
                  <a-input v-model="path3" style="width: 500px"></a-input>
                  音频类型(audioType)： 
                  <a-select v-model="audioType" style="width: 150px">
                    <a-select-option value="0">default(默认)</a-select-option>
                    <a-select-option value="1">PCM</a-select-option>
                    <a-select-option value="2">G711a</a-select-option>
                    <a-select-option value="3">AMR</a-select-option>
                    <a-select-option value="4">G711U</a-select-option>
                    <a-select-option value="5">G726</a-select-option>
                    <a-select-option value="6">AAC</a-select-option>
                    <a-select-option value="7">G722</a-select-option>
                    <a-select-option value="8">G711</a-select-option>
                  </a-select>
                  位数(audioBit)：
                  <a-select v-model="audioBit" style="width: 100px">
                    <a-select-option value="8">8位</a-select-option>
                    <a-select-option value="16">16位</a-select-option>
                  </a-select>
                  采样频率(sampleRate)：
                  <a-select v-model="sampleRate" style="width:100px;">
                    <a-select-option value="8000">8000</a-select-option>
                    <a-select-option value="16000">16000</a-select-option>
                    <a-select-option value="32000">32000</a-select-option>
                    <a-select-option value="48000">48000</a-select-option>
                    <a-select-option value="8192">8192</a-select-option>
                  </a-select>
                  对讲类别(talkType)：
                  <a-select v-model="talkType" style="width: 100px;">
                    <a-select-option value="1">设备</a-select-option>
                    <a-select-option value="2">通道</a-select-option>
                  </a-select>
                    <a-button @click="setTalk">确定</a-button><br /> 注：通过上方选择窗口进行窗口选择，对讲功能需要正在实时预览且声音关闭的情况下才能进行对讲。
                </div>
                <br />
                <div style="display: flex; align-items: baseline">
                    测试遮挡：<a-select :options="[{label: '视频1', value: 1}, {label: '视频2', value: 2}, {label: '视频23', value: 4}]" dropdownClassName="test_drop" style="width: 200px;">
                    </a-select>

                    <div style="margin-left: 10px">
                        拖拽
                        <a-switch v-model="enableDrag" @change="setDragEnable" checked-children="开" un-checked-children="关" style="margin:0" />
                    </div>
                </div>
                <div class="window1" v-if="videoType === 'video1'">
                    实时视频1：<DHPlayer videoId="testPlayer" ref="video1" :pathList="pathList" :shieldClass="['test_drop']" @getCurrentWindow="getCurrentWindow" @changeDivision="getDivisionNum" @picCap="picCap" @getError="getError" ></DHPlayer>
                </div>
                <div class="window1" v-else-if="videoType === 'video2'">
                    录像回放：<DHPlayer :windowType="3" videoId="testPlayer2" ref="video2" :type="2" :pathList="pathList2" @replay="replay" @getCurrentWindow="getCurrentWindow" @changeDivision="getDivisionNum" :shieldClass="['test_drop']" @picCap="picCap" @getError="getError"></DHPlayer>
                </div>
                <div class="error-tip" v-show="errorTip">错误提示：{{errorTip}}</div>
            </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Tab 2" force-render>
            Content of Tab Pane 2
        </a-tab-pane>
        <a-tab-pane key="3" tab="Tab 3">
            Content of Tab Pane 3
        </a-tab-pane>
    </a-tabs>
</template>
<script>
    import DHPlayer from "./DHPlayer"
    export default {
        components: {
            DHPlayer
        },
        data() {
            return {
                activeKey: '1',
                showModal: false,
                path: '',
                path2: '',
                path3: '',
                startDownload: false,
                videoType: 'video1',
                currentNum: 0,
                errorTip: '',
                pathList: ['rtsp://10.35.239.103:9090/dss/monitor/params?cameraid=1000021%240&substream=1&trackID=701 ',
                    {
                        path: 'rtsp://10.35.238.43:9100/dss/monitor/param/cameraid=1009412$1$0$1%240%26substream=1?token=105',
                        redirect: false
                    },
                ], //实时预览测试
                realTimeList: [{
                    channelId: '1000032$1$0$0'
                }],
                pathList2: [{ //录像测试
                    startTime: 1636994047,
                    endTime: 1637001247,
                    path: 'rtsp://10.35.239.250:9090/dss/playback/param?cameraid=1000544%240&substream=1&type=2&recordtype=1&begintime=1636994047&endtime=1637001247',
                }],
                videoPlayList: [{
                    "channelId": "1000014$1$0$0",
                    "streamType": "1",
                    "type": "hls",
                    "recordType": "1",
                    "startTime": '1637715062',
                    "endTime": '1637769062',
                    "recordSource": "2"
                }],
                enableDrag: true,
                divisionNum: 4, // 当前窗口的分割数量
                isRedirect: false, // true 是代表重定向(拼接的)  false 表示取消重定向(接口返回)
                audioType: '0',
                audioBit: '8',
                sampleRate: '8000',
                talkType: '1'
            }
        },
        watch: {
            videoType(val, oldVal) {
                this.currentNum = 0
                this.$nextTick(() => {
                    this.$refs[val].initVideo()
                })
            }
        },
        methods: {
            getError(error) {
                this.errorTip = error
            },
            replay(snum) { //录像回放播放结束监听，demo中是重新再放一遍，用户可根据自身需求使用改方法
                this.$refs[this.videoType].setPlayback(this.pathList2[snum], snum)
            },
            //修改url
            changeUrl() {
                // 选中窗口
                this.$refs[this.videoType].videoPlayer.chooseWindow(this.currentNum)
                if (this.videoType === 'video1') {
                    this.pathList[0] = this.path
                    this.$refs[this.videoType].setRealTime({path: this.path, snum: this.currentNum, redirect: this.isRedirect})
                } 
                if (this.videoType === 'video2') {
                    this.pathList2[0] = { url: this.path2 }
                    this.$refs[this.videoType].setPlayback({ path: this.path2, redirect: this.isRedirect }, this.currentNum)
                }
            },
            // 对讲
            setTalk() {
              this.$refs[this.videoType].setTalk({
                path: this.path3,
                audioType: this.audioType, // 音频类型 int  0-default 1-PCM 2-G711a 3-AMR 4-G711U 5-G726 6-AAC 7-G722 8-G711
                audioBit: this.audioBit, // 位数 int   8  16 
                sampleRate: this.sampleRate, // 采样频率  8000 16000 32000 48000 8192
                talkType: this.talkType // 对讲类型： 1 设备  2通道
              }, this.currentNum)
            },
            // 控件切换窗口数量时返回前端告知当前多少窗口
            getDivisionNum(v) {
              this.divisionNum = v 
            },
            // 修改当前控件展示的窗口数量
            changeDivision() {
              this.$refs[this.videoType].changeDivision(this.divisionNum)
            },
            //本地录像下载
            download() {
                this.startDownload = !this.startDownload
                this.$refs[this.videoType].videoPlayer.localRecordDownload(this.currentNum)
            },
            downloadFile(url, name = new Date().valueOf()) {
                var a = document.createElement("a")
                a.setAttribute("href", url)
                a.setAttribute("download", name)
                a.setAttribute("target", "_blank")
                let clickEvent = document.createEvent("MouseEvents");
                clickEvent.initEvent("click", true, true);
                a.dispatchEvent(clickEvent);
            },
            picCap({
                path
            }) {
                this.downloadFile(path, 'image_' + new Date().valueOf())
            },
            //关闭、开启声音
            openAudio(state) {
                this.$refs[this.videoType].videoPlayer.openAudio({
                    snum: this.currentNum,
                    videoType: this.videoType === 'video1' ? 0 : 1,
                    isEnable: state ? 1 : 0
                })
            },
            //抓图
            snapshot() {
                this.$refs[this.videoType].videoPlayer.snapshot(this.currentNum)
            },
            //获取当前选中的窗口
            getCurrentWindow(num) {
                this.currentNum = num
            },
            //关闭视频
            closeVideo() {
                this.$refs[this.videoType].videoPlayer.closeVideo({
                    snum: this.currentNum,
                    isAll: false
                })
            },
            //录像暂停
            pauseVideo() {
                this.$refs[this.videoType].videoPlayer.controlPlayback({
                    snum: this.currentNum,
                    state: 0
                })
            },
            //继续录像
            continueVideo() {
                this.$refs[this.videoType].videoPlayer.controlPlayback({
                    state: 1
                })
            },
            //销毁窗口
            destroy() {
                this.$refs[this.videoType].destroy()
            },
            //重建
            init() {
                this.$refs[this.videoType].initVideo()
            },
            // 设置全屏
            setFullScreen() {
                this.$refs[this.videoType].setFullScreen()
            },
            // 是否开启拖拽
            setDragEnable(value) {
                this.$refs[this.videoType].setDragEnable(value)
            },
        }
    }
</script>
<style>
    .window1,
    .window2 {
        float: left;
        margin-top: 20px;
        margin-left: 20px;
    }

    #videoBox {
        margin-left: 20px;
    }

    #videoBox button {
        margin-left: 10px;
        margin-bottom: 10px;
    }


    .error-tip {
        clear: both;
        color: red;
        margin-left: 20px;
    }

    #testPlayer,
    #testPlayer2 {
        width: 500px;
        height: 500px;
        border: 1px solid #000;
    }
</style>
