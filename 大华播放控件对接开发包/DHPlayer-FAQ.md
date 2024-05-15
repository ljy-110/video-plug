[TOC]

## `DHPlayer` 插件问题汇总以及解决方案

### 概述：

该文档将展示如下问题：

1. 对 `DHPlayer` 功能进行简要描述，以及设计 `DHPlayer` 主要核心解决问题

2.  解答目前 `DHPlayer` 所 <font color="red">支持的功能</font> 进行描述
3. 解答目前 `DHPlayer` 出现的问题进行 是否支持修复 解答，并对 **可解答问题** 提供解决方案，其他问题提出定制需求
4. 对暂无解决方案和无法定制功能进行解答



### 注意事项

1.  拼接流地址是需要重定向的**(默认支持)**， 接口返回是需要改重定向配置(无需重定向)
2.  拉流的时候，默认是按照重定向方法的
   1. `jquery`版本可以通过查看`demo.js` 文件,  在实时预览和录像回放方法中通过传递 `redirect` 字段，`true` 是代表重定向(默认为 `true`),  `false` 表示取消重定向
   2.  `vue` 版本的话需要修改源码
3.  接口返回的流地址  和  拼接的流地址的区别：
   1. 接口返回的地址，端口默认为 **9100 (实时流端口) **或  **9320(回放流端口)**， <font color="red">token时间为30s，30s内必须播放</font>，超过时间则无法播放，而且只能播一次
   2. 拼接的地址，不需要重定向，无 `token` 概念和无播放限制。 [点此查看录像流拼接规则](https://open-icc.dahuatech.com/iccdoc/enterprisebase/5.0.10/wiki/admin/videoIntercom-scheme.html#%E8%8E%B7%E5%8F%96%E5%BD%95%E5%83%8F%E6%B5%81%E5%9C%B0%E5%9D%80%E6%B5%81%E7%A8%8B%EF%BC%9BRTSP%E6%96%B9%E6%A1%88)， [点此查看实时流拼接规则](https://open-icc.dahuatech.com/iccdoc/enterprisebase/5.0.10/wiki/admin/pull-scheme.html#RTSP%E6%96%B9%E6%A1%88)
4.  在视频流传入控件过多的情况下，建议使用 **辅码流**。
5.  控件不支持拖拽



### `DHPlayer` 功能概述

1.  主要用于通过传递 `rtsp` 视频流来进行播放视频的功能
2.  可以传递多路 `rtsp` 至控件进行播放
3.  播放器可以支持  `x*y` 进行播放，例如 `2*2`, `2*3`, `5*4` 进行播放，也可以自定义播放
4.  右击可以支持 `DHPlayer` 控件全屏，全屏时右击可以控制取消全屏操作
5.  控件是出现在浏览器的上方，没有浏览器层级的概念，用户如果点击在控件上，浏览器是无法监听到点击事件的，也没有办法将控件放在某个DOM元素的下方。 如果要实现某些DOM放在控件上方，可以通过 `this.palyer.windowShield` 方法将控件进行 “挖洞” 处理，让下方的内容展示出来。
6.  控件加载过程中，一个页面建议只创建一个 `DHPlayer` 控件，如果要创建新的 `DHPlayer` 需要先把之前的`DHPlayer` 进行销毁。
7.  支持 `iframe` 嵌入 `DHPlayer`。 如果遇到跨域问题，详情见安装路径下的  `\demo\vue2_Version\跨域iframe-demo.html` 



**其他功能详细见 `demo`，地址如下：** 

- 安装 `DHPlayer` 后， 找到安装路径， 如 `D:\Program Files (x86)\DHPlayer\demo` 

- 路径下具有 `vue` 版本和 `jquery ` 版本的 `demo`。 `demo `功能都是能实现的




### DHPlayer 支持功能API

- 如下方法可在 `videoPlayer.js` 文件下找到。具体传参可在【`jquery`内】 `demo.js` 和 【`vue`内】`DHPlayer.vue` 找到。

- 实例化 `DHPlayer` 后，通过 `this.videoPlayer` =  `new DHPlayer` 文件夹下存在如下方法：
  - 发送消息：`this.player.send`
  - 创建窗口: `this.player.create`
  - 刷新窗口位置: `this.player.handleAdjust`
  - 全屏： `this.player.setFullScreen`
  - 销毁:  `this.player.destroy`
  - 隐藏控件: `this.player.hide`
  - 显示控件: `this.player.show`
  - 是否显示控制栏： `this.player.showControlBar`
  - 是否控件内拖拽: `this.player.setWindowDragEnable`
  - 是否遮挡控件: `this.palyer.windowShield`
  - 是否支持拖拽:  `this.player.setWindowDragEnable` (默认开启)
  - 所选子窗口: `this.player.chooseWindow`
  - 开启，关闭声音： `this.player.openAudio`
  - 实时预览： `this.player.realmonitor`
  - 对讲： `this.player.talk`
  - 录像回放： `this.player.playback`
  - 关闭窗口视频(指定关闭和全部关闭) :  `this.player.closeVideo`
  - 对讲关闭((指定关闭和全部关闭) )： `this.player.closeTalk`
  - 操作录像： `this.player.controlPlayback`
  - 本地录像下载： `this.player.localRecordDownload`
  - 窗口抓图： `this.player.snapshot`



### FAQ

1. 传多路视频后，如传 9 个视频流地址进入控件，当页面上分割为 `2 * 2` 时，是否能支持分页？

   **答：** ` DHPlayer` 控件是纯粹的做视频播放功能的，不支持控件分页，如需要则需要定制一个前端和控件之间关于传递当前分割数协议，通过前端实现分页，向控件传递不同的 `rtsp` 流地址去播放

2. 初始化屏幕后，在控件上点击当前已选中的窗口时，无任何反应。

   **答：** 控件目前是只支持在 `DHPlayer` 分屏情况下切换窗口时获取到当前切换到的窗口的位置，如果需要添加点击某个窗口获取到当前窗口的位置，需要添加与控件之间的点击协议。



3. `iframe` 嵌入一个页面，且页面中创建了多个 `DHPlayer`  控件，会出现控件闪屏问题和控件不出现的问题。如何解决？

   **答：** 经过验证，当页面上只有一个控件时是不会出现此问题，所以不建议在一个界面上创建多个 `DHPlayer` ，如果需要再创建 `DHPlayer` 实例，则应当调用销毁方法销毁已经创建好的 `DHPlayer` 控件，<font color="red">暂不支持</font>

   

5. 当页面上使用了`DHPlayer` 控件， 且对浏览器中的 `DOM` 元素进行全屏时，控件会一直出现在顶层，如何解决？

   **答：** 因为控件是悬浮在浏览器上方的，可以通过调用 `DHPlayer` 的隐藏方法`this.player.hide` 去隐藏控件，在退出全屏的时候去调用 `this.player.show`方法去重新显示插件。

