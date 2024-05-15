
###一、为什么重构?

- 原调用方法过于复杂，使用者需要花时间阅读代码、关注插件内部实现，所以需要重构，让使用者无需关心内部逻辑，轻松实现我们所支持的视频相关业务。
***
###二、设计构思
>将 <u>videoPlayer.js</u>（与C++服务进行交互的方法库） 和 <u>DHPlayer.vue</u>打成一个DHPlayer.js，非Vue环境下也可使用。两种引用方式如下：

原生h5下——引入后可直接使用VideoPlayer对象：(Vue下也可如此引用，全局vue对象会自动注册DHPlayer组件)
```javascript
    <script src="/static/DHPlayer.js"></script>
```
Vue下：
```javascript
    import DHPlayer from '../static/DHPlayer.js'
    Vue.use(DHPlayer)
```

- ####videoPlayer.js

 **基本功能：**

 **1、窗口初始化：websocket尝试连接服务，包含成功回调与失败回调**
 	- 连接规则：目前是对localhost：8000-8004端口进行遍历连接，如果全都不通就请求打开DHPlayer服务，无论点击打开还是取消（<font color="red">web无法捕获</font>），在此过程中都会进行重连，直到连通或1分钟以后自动删除重连定时器。
 	- 成功回调：触发成功回调，并创建窗口（根据是否需要创建窗口参数，默认需要创建）
 	- 失败回调：连续1分钟无法连接，触发失败回调。
 	- 注：如果创建多个视频窗口，将会在同一个websocket连接中进行通信，该websocket连接将会作为全局对象绑定到windows上。

 **2、创建/销毁窗口、窗口显示/隐藏、窗口滚动**

	> 这些基本功能都会独立的方法，可直接使用，但是一般使用场景（如下）都在内部进行封装。

 - 监听页面刷新、销毁事件，通知服务销毁窗口。
 - 监听页面显隐事件（切换浏览器页签、最小化浏览器等会触发该事件），通知服务显隐窗口。
 - 监听浏览器窗口的放大缩小、滚动事件，会重新获取传入挂载窗口dom节点的位置，通知服务调整窗口位置。

 **3、录像回放、实时预览**
 - 可通过在初始化的时候传定义好的type类型，内部根据type来调用发送对应的消息。

 **4、每个功能都会提供对应的回调方法**

 **传参params：**
 >为了使用的方便，决定在初始化的时候可以直接传入所有的参数，使用方法如下：
 
 ```javascript
 var oVideoControl = new VideoPlayer({
		videoId: 'DHVideoPlayer',
		createWindow: true,
		connectSuccess: function () {
			console.log('ws初始化成功')
		},
		connectClose: function () {
			oVideoControl = null
		},
		createSuccess(e) {
			console.log(e) //窗口创建成功
		}
	})
 ```

**传参API**

| 参数名  | 类型 | 必传 | 作用  | 默认值 |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| videoId  | String | 是 | 用户定义的 video 容器的 id 属性值 | 无 |
| createWindow  | Boolean | 否 | 是否需要初始化创建窗口 | true |
| windowType  | Number | 是 | 窗口类型：0-普通预览，1-普通回放（含分屏、不含时间轴），2-预览（不含分屏），3-录像回放（不含分屏、含时间轴） |  |
| mount  | Boolean | 否 | 挂载方式（true：挂载为浏览器子窗口；false：独立窗口） | true |
| chooseWindow  | Number | 否 | 服务支持的选择窗口功能，不知道什么应用场景，先加上 |  |
| num  | Number | 否 | 子窗口数量，可选值：1、4、9、16 | 1 |
| showBar  | Boolean | 否 | 是否显示下方控制栏。 true: 显示， false：隐藏 | true |
| shieldClass | Array | 否 | 遮挡的元素类名数组 |  |
| *windowParams*  | Array | 是 | 窗口的对象数组 | [] |
| > path  | String | 是 | 视频url |  |
| > snum  | Number | 是 | 子窗口编号（从0开始） |  |
| > type  | Number | 是 | 1-实时视频，2-录像回放 |  |
| > startTime  | Number | 是 | 当前播放的录像开始时间的时间戳 |  |
| > endTime  | Number | 是 | 当前播放的录像结束 |  |
| > redirect  | Boolean | 是 | 是否重定向 |  |
| > records | Array | 是 | 传值具体需参考大华播放控件开发手册 |  |
| > 其他传值 | -- | -- | 传值具体需参考大华播放控件开发手册 |  |
| *callback* | -------- | -- | 回调方法对象（e: 统一返回ws响应消息体；若没有触发回调，可能是插件不支持该功能） |  |
| connectSuccess  | function(e) | 否 | websocket初始化连接成功回调 |   |
| connectError  | function(e) | 否 | websocket初始化连接失败后的回调 |   |
| createSuccess  | function(e) | 否 | 创建窗口成功回调 |  |
| createError  | function(e) | 否 | 创建窗口失败回调 |   |
| destroySuccess | function(e) | 否 | 销毁成功回调 | |
| destroyError | function(e) | 否 | 销毁失败回调 | |
| switchStartTime  | function({startTime, snum}) | 否 | 拖拽录像时间轴，返回拖拽的开始时间与当前选中的子窗口，需根据返回参数重新发录像请求 |  |
| replay  | function(snum) | 否 | 重新播放录像，返回子窗口 |  |
| getCurrentWindow  | function(snum) | 否 | 视频窗口选中回调，返回当前选中子窗口，默认选中第1个子窗口 | snum 默认为 0 |
| closeWindowSuccess  | function({isAll, snum}) | 否 | 关闭窗口事件。isAll：是否全部关闭、true-全部关闭；snum：非全部关闭时，返回关闭的子窗口 |  |
| playbackSuccess  | function(e) | 否 | 录像回放成功 |  |
| playbackError  | function(e) | 否 | 录像回放失败（返回值没有 snum，所以不知道哪个失败，需要c++服务加上）|  |
| realTimeSuccess | function(e) | 否 | 实时预览成功 |  |
| realTimeError | function(e) | 否 | 实时预览失败（返回值没有 snum，多窗口所以不知道哪个失败，需要c++服务加上） |  |
| chooseWindowSuccess | function(e) | 否 | 选择窗口成功 |  |
| chooseWindowError | function(e) | 否 | 选择窗口失败 |  |
| showWindowSuccess | function(e) | 否 | 显示窗口成功 |  |
| showWindowError | function(e) | 否 | 显示窗口失败 |  |
| videoDownloadSuccess | function(path) | 否 | 本地录像下载成功回调, path:文件下载路径 |  |
| hideWindowSuccess | function(e) | 否 | 隐藏窗口成功 |  |
| hideWindowError | function(e) | 否 | 隐藏窗口失败 |  | |


**VideoPlayer对象内置属性**

| 参数名  | 类型（option: 具体参照大华播放控件开发手册） | 作用 |
| ------------ | ------------ | ------------ |
| windowState  | string  | 视频大窗口状态（wsPending-websocket正在连接,wsFail-websocket连接失败, wsSuccess-websocket连接成功, createPending-正在创建窗口, createFail-窗口创建失败, createSuccess-窗口创建成功） |
| getWindowState  | Function(callback) | 获取所有小窗口的状态，callback返回ws返回值|
| getVersion  | Function(callback) | 获取DHPlayer服务版本，callback返回ws返回值|
| create  | Function(option, callback) | 创建视频窗口 |
| chooseWindow  | Function(option, callback) | 选择视频窗口 |
| openAudio  | Function(option: {snum: 0, isEnable: 0/1, videoType: 0/1}, callback) | 开启、关闭视频声音（snum：子窗口，isEnable：0-关闭，1-开启, videoType: 0-预览音频，1-回放音频） |
| closeVideo  | Function(option: {snum: 0, isAll: false}, callback) | 关闭指定窗口视频或全部关闭（snum：子窗口，isAll：是否全部关闭） |
| controlPlayback  | Function(option: {snum: 0, state: 0/1}, callback) | 操作录像暂停/继续（snum：子窗口，state：窗口状态，0-暂停，1-继续） |
| realmonitor  | Function(option, callback) | 播放实时视频 |
| playback  | Function(option, callback) | 播放录像回放 |
| resizePage  | Function(option, callback) | 重置窗口位置、大小 |
| showControlBar  | Function(show) | 显示下方控制栏, show: true-显示，false-隐藏 |
| hide  | Function(callback) | 隐藏窗口 |
| show  | Function(callback) | 显示窗口 |
| WindowShield  | Function(option: {shieldClass: ['视频被遮挡的dom节点class']}, callback) | 视频被遮挡处理 |
| destroy  | Function(callback) | 销毁窗口 | |


- ####DHPlayer.vue

>基于 `videoPlayer.js`封装的的VUE组件，包含 <u>DOM节点</u> 和  <u>基础方法</u>(目前包含初始化窗口后播放视频)，以及获取token、对视频路径进行token拼接等业务处理。

**包含业务**
1. 判断本地视频插件是否安装（websocket连接1分钟后还未连接成功，提示安装插件）
2. 比较本地插件与线上的版本，如果本地插件版本低于线上插件，提示更新（在websocket连接成功后拿到版本号，再调brm的获取插件信息的接口获取版本号进行比较）【该提示基于ICC框架实现，下载地址为服务器上固定路径，UI基于ant-design-vue，第三方可自行进行修改。】
3. websocket连接成功以后，创建窗口，子窗口数量根据通道个数或者rtsp地址数量进行计算，1（length = 1）、4（1 < length <= 4）、9（4 < length <= 9）、 16（9 < length <= 16）
4. 窗口创建成功以后，
	+ 如果有rtsp路径传入（pathList），根据type去调用对应的录像回放/实时预览方法加载视频；
	+ 如果没有路径，需要传入videoPlayList/realTimeList，根据type并通过传入的streamType（不传按照路数判断，超过4路自动默认辅码流，不超过默认是主码流）、channelId 获取对应的视频流地址，如果流地址端口为9090端口时，需要重定向（redirect=true），不需要加 token，其他端口均不需要重定向，从获取rtsp接口中拿到token并拼上。然后再根据type去调用对应的方法加载视频。



**调用方法**

```javascript
<template>
	<DHPlayer :type="1" :windowType="0" :realTimeList="realTimeList"/>
</template>
<script>
	import DHPlayer from 'DHPlayer'
	export default {
		data() {
			return {
				realTimeList: [
					{streamType: 1, channelId: '111$120'},
					{streamType: 2, channelId: '111$121'}
				]
			}
		}
	}
</script>
```
**传参**

| 参数名  | 类型 | 必传 | 作用  | 默认值 |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| videoId | String  | 是 | dom节点ID |  |
| type | Number  | 是 | 1-实时视频，2-录像回放 |  |
| num | Number  | 否 | 子窗口个数 | 1 |
| connectTime | Number  | 否 | 尝试连接事件，默认60s，一定时间连接断开，并弹出下载插件提示 | 60 |
| outContent | Object  | 否 | 当前窗口所处可视窗口的位置，比如iframe外部距离浏览器的位置 | {} |
| videoPlayList | Array  | 否 | 包含多个录像回放对象 | [] |
| > ssId | String  | 是 | SS服务ID |  |
| > endTime | String  | 是 | 结束时间(时间戳：单位秒) |  |
| > startTime | String  | 是 | 开始时间(时间戳：单位秒) |  |
| > fileName | String  | 是 | 录像文件信息 |  |
| > diskId | String  | 是 | 磁盘ID |  |
| > recordSource | Number  | 是 | 录像来源：1=全部，2=设备，3=中心 |  |
| > recordType | Number  | 否 | 录像类型：0=全部，1=手动录像，2=报警录像，3=动态监测，4=视频丢失，5=视频遮挡，6=定时录像，7=全天候录像，8=文件录像转换 |  |
| > channelId | String  | 是 | 通道编码 |  |
| > playbackMode | Number  | 是 | 回放模式：0=普通回放，1=实时回放 |  |
| > streamId | String  | 是 | 码流处理 |  |
| > 一些其他参数（待收集） | String  | 是 | wiki无 |  |
| realTimeList | Array  | 否 | 包含多个实时预览对象 | [] |
| > streamType | Number  | 否 | 码流类型：1=主码流, 2=辅码流 | 不传按照路数判断，超过4路自动默认辅码流，不超过默认是主码流 |
| > channelId | String  | 是 | 通道编码 |  |
| > dataType | Number  | 否 | 视频类型：1=视频, 2=音频, 3=音视频 | 1 |
| pathList | Array | 否 | 录像回放/实时视频路径列表(实时视频-string数组['rtsp://xx/']；录像回放-对象数组[{path:'rtsp://xx/'}]，录像回放传参如下) |  |
| > path | String  | 是 | 视频路径 |  |
| > endTime | String  | 是 | 录像回放结束时间 |  |
| > startTime | String  | 是 | 录像回放结束时间 |  |
| > recordType | String  | 是 | 录像文件类型 0 所有，1 手动录像，2 报警录像，3 动态检测，4 视频丢失，5 视频遮挡，6 定时录像，7 全天候录像，8 文件录像转换，9 普通录像，11 智能录像，25 卡号录像，10 报警开始（匹配协议栈里的定义 10~300 -m -f -c 等特殊报警），1000 智能 报 警 结 束 （ 匹 配 协 议 栈 里 的 定 义300~1000 智能报警） |  |
| > recordName | String  | 是 | 录像文件名 |  |
| > fileLength | String  | 是 | 单位为 kb |  |
| windowType | Number  | 是 | 窗口类型：0-普通预览，1-普通回放（含分屏、不含时间轴），2-预览（不含分屏），3-录像回放（不含分屏、含时间轴） |  |


