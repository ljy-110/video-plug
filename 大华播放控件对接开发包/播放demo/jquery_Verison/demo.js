var videoPlayer = null
var beforeType = '0'
var currentIndex = 0
var divisionNum = 4
var downloadState = false
$(function () {
	initVideo()
	$(".video-type :radio").click(function () {
		var type = $(this).val()
		if (type !== beforeType) {
			beforeType = type
			initVideo()
		}
		if (type === '0') {
			$('.record').hide()
			$('.real').show()
		} else {
			$('.record').show()
			$('.real').hide()
		}
	});

	$(".drag :radio").click(function () {
		var type = $(this).val()
		videoPlayer.setWindowDragEnable({
			enable: type === "1"
		})
	});
})


function initVideo() {
	if (videoPlayer) {
		destroy()
	}
	currentIndex = 0
	var checked = $('.hideBar').prop('checked')
	$('#windowIndex').val(0)
	videoPlayer = new VideoPlayer({
		videoId: 'DHVideoPlayer',
		shieldClass: ['saloon', 'about', 'learn'],
		num: 4, //初始化创建窗口个数
		windowType: beforeType === '0' ? 0 : 3,
		showBar: !checked,
		connectSuccess: () => {
			console.log('连接成功');
		},
		createSuccess: (e) => {
			console.log('窗口创建成功')
		},
		snapshotSuccess({
			base64Url,
			path
		}) { //抓图成功回调
		picCap({
				base64Url,
				path
			})
		},
		switchStartTime({
			startTime,
			snum
		}) { //录像回放拖拽进度条
			snum = snum + 1
			var url = $('#recordInput' + snum).val()
			let endTime = getUrlParam(url, 'endtime') - 0
			if (startTime > endTime) {
				alert('开始时间不得大于结束时间')
				return false
			}
			setPlayback(snum, startTime)
		},
		getCurrentWindow: (snum) => { //获取当前窗口
			currentIndex = snum
			$('#windowIndex').val(snum)
		},
    clickWindow: (snum) => { // 获取当前点击的窗口
      currentIndex = snum
      $("#windowIndex").val(snum)
      console.log(`当前点击了第${snum}个窗口`)
    },
    changeDivision: (division) => {
      division = division
      $("#divisionNum").val(division)
    },
		videoDownloadSuccess(path) { //本地录像下载成功提示
			alert('本地录像已下载到' + path)
		},
		replay(sum) { //监听录像回放结束消息
			alert('第'+ (snum + 1) + '个窗口录像播放结束')
		}
	})
}

//显隐控制栏
function setShowBar() {
	var checked = $('.hideBar').prop('checked')
	videoPlayer.showControlBar(!checked)
}

//抓图
function snapshot() {
	videoPlayer.snapshot(currentIndex)
}

// 全屏
function setFullScreen() {
    videoPlayer.setFullScreen()
}

// 设置悬浮字体
function setOSDInfo() {
	videoPlayer.setOSDInfo({
		R: $("#osdInfo_R")[0].value,
		G: $("#osdInfo_G")[0].value,
		B: $("#osdInfo_B")[0].value,
		fontSize: $("#osdInfo_fontSize")[0].value,
		positionX: $("#osdInfo_positionX")[0].value,
		positionY: $("#osdInfo_positionY")[0].value,
		fontWeight: $("#osdInfo_fontWeight")[0].value,
		osdInfo: $("#osdInfo")[0].value,
	})
}

//关闭选中窗口
function closeVideo() {
	videoPlayer.closeVideo({
		snum: currentIndex,
		isAll: false
	})
}

//关闭选中窗口对讲
function closeTalk() {
	videoPlayer.closeTalk({
		snum: currentIndex,
		isAll: false
	})
}
//关闭选中视频的音频
function closeAudio() {
	videoPlayer.openAudio({
		snum: currentIndex,
		isEnable: 0,
		videoType: beforeType - 0
	})
}
//关闭选中视频的音频
function openAudio() {
	videoPlayer.openAudio({
		snum: currentIndex,
		isEnable: 1,
		videoType: beforeType - 0
	})
}
//本地录像下载
function download() {
	downloadState = !downloadState
	$('#downloadRecord').val(downloadState ? '暂停本地录像下载' : '开始本地录像下载')
	videoPlayer.localRecordDownload(currentIndex)
}

// 前端传递给控件需要展示多少个窗口 
function changeDivision() {
  videoPlayer.changeDivision($("#divisionNum").val())
}

//录像暂停
function pauseVideo() {
	videoPlayer.controlPlayback({
		state: 0,
		wndIndex: currentIndex
	})
}
//继续录像
function continueVideo() {
	videoPlayer.controlPlayback({
		state: 1,
		wndIndex: currentIndex
	})
}

//销毁窗口
function destroy() {
	if (!videoPlayer) {
		alert('请先创建视频窗口')
	}
	videoPlayer.destroy()
	videoPlayer = null
}


//实时预览
function setRealTime(snum) {
	var url = $('#realInput' + snum).val()
	snum = snum - 1
	if (!url) {
		return false
	}
	videoPlayer.realmonitor({
		snum,
		path: url,
		// redirect: false //是否重定向，true-重定向，false-非重定向，默认true
	})
}

//对讲
function talk(snum) {
	var urltalk = $('#talkInput' + snum).val()
	snum = snum - 1
	videoPlayer.talk({
		snum,
		path: urltalk,
		redirect: false,
		audioType: 1,
		audioBit: 16,
		sampleRate: 8000,
		talkType: 1,
	})
}

//获取url中的参数
function getUrlParam(url, name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = url.match(reg); //匹配目标参数
	if (r != null) return unescape(r[2]);
	return null; //返回参数值
}

//录像回放
function setPlayback(snum, playStartTime) {
	var url = $('#recordInput' + snum).val()
	if (!url) {
		return false
	}
	snum = snum - 1
	var startTime = getUrlParam(url, 'begintime')
	var endTime = getUrlParam(url, 'endtime')
	videoPlayer.playback({
		snum,
		records: [
      // {
      //   startTime: 'startTime',
      //   endTime: endTime,
      //   recordType: 0,
      //   recordName: '123',
      //   fileLength: 1024
      // }
    ],
		path: url,
		startTime: startTime,
		endTime: endTime,
		playStartTime,
		playEndTime: endTime,
		// redirect: true //是否重定向，true-重定向，false-非重定向，默认true
	})
}

//选择窗口
function chooseWindow() {
	var val = $('#windowIndex').val()
	currentIndex = val - 0
	videoPlayer.chooseWindow(val)
}

//下载图片
function downloadFile(url, name = new Date().valueOf()) {
	var a = document.createElement("a")
	a.setAttribute("href", url)
	a.setAttribute("download", name)
	a.setAttribute("target", "_blank")
	let clickEvent = document.createEvent("MouseEvents");
	clickEvent.initEvent("click", true, true);
	a.dispatchEvent(clickEvent);
}

//抓图下载
function picCap(params) {
	var path = params.path
	downloadFile(path, 'image_' + new Date().valueOf())
}

function onSelectFocus() {
	videoPlayer.removeClickEventListener();
}

function onSelectBlur() {
	videoPlayer.addClickEventListener()
}

//	录像下载
function setDownloadRecord(snum) {
	console.log("begin download record!");
	var url = $('#downloadInput' + snum).val()
	if (!url) {
		return false
	}
	snum = snum - 1
	var startTime = getUrlParam(url, 'begintime')
	var endTime = getUrlParam(url, 'endtime')
	videoPlayer.downloadRecord({
		snum,
		records: [],
		url: url,
		startTime: startTime,
		endTime: endTime
		// redirect: true //是否重定向，true-重定向，false-非重定向，默认true
	})
}