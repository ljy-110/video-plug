## 引入

* `web-control.min.js`: IIFE 格式，用于 `<script>` 标签直接引入，通过 `window.WebControl` 获取到对象。编译到兼容 IE10 的 ES5，内置 Promise、Object.assign 的 polyfill
* `web-control.umd.min.js`: UMD 格式，一般用不到。编译到兼容 IE10 的 ES5，不包含 polyfill
* `web-control.esm.min.js`: ES Module 格式，使用 webpack 时会自动引用这个，通过 `import { WebControl } from 'web-control';` 获取到对象。保留 ES6 语法不进行编译，不包含 polyfill

## API

### 初始化

```html
<div id="playWnd"></div>
```

```js
import { WebControl } from 'web-control';

const oWebControl = new WebControl({
  // 对应 LocalServiceConfig.xml 中的 ServicePortStart 值
  iServicePortStart: 15960,
  // 对应 LocalServiceConfig.xml 中的 ServicePortEnd 值
  iServicePortEnd: 15969,
  // 页面中 div 的 id，只在 IE 加载 ocx 时用到
  szPluginContainer: 'playWnd',
  // 仅在 IE10 中使用的 ActiveX 的 clsid，不用修改
  szClassId: '23BF3B0A-2C56-4D97-9C03-0CB103AA8F11',
  // 成功回调
  cbConnectSuccess() {},
  // 错误回调
  cbConnectError() {},
  // 连接断开回调
  cbConnectClose(isNormalClose) {
    // 连接正常断开：isNormalClose === true
    // 连接异常断开：isNormalClose === false
  },
});
```

### 开启服务

```js
/**
 * @name 开启服务
 * 返回 Promise 的状态表明 dll 加载成功或失败
 *
 * @param {string} type 服务类型，当前为固定值 window
 * @param {Object} options 可选参数
 * @param {string} options.dllPath 中间件 dll 库相对于安装目录路径
 *
 * @returns {Promise}
 */
oWebControl.JS_StartService('window', { dllPath: './DllForTest.dll' })
  .then(() => {})
  .catch(() => {})
```

### 关闭服务

```js
/**
 * @name 关闭服务
 * @param {string} type 服务类型
 *
 * @returns {Promise}
 */
oWebControl.JS_StopService('window')
  .then(() => {})
  .catch(() => {})
```

### 创建窗口

```js
/**
 * @name 创建窗口
 * 开启服务成功后可调用。返回 Promise 的状态表明窗口创建成功或失败
 *
 * @param {string} id 窗口元素的 id
 * @param {number} width 窗口宽度
 * @param {number} height 窗口高度
 * @param {Object} options 可选参数
 * @param {boolean} options.bEmbed 手动指定窗口模式，如果浏览器本身不支持嵌入模式，此参数无效。true 表示嵌入，false 表示跟随
 * @param {boolean} options.bActiveXParentWnd 手动指定是否以 ActiveX 为父窗口，仅在 IE10 下有效。在 Win10 下如果遇到窗口闪烁严重，可以使用此参数。true 表示以 ActiveX 为父窗口。
 * @param {function} options.cbSetDocTitle 客户端是通过浏览器标题（document.title）来匹配对应标签页窗口的，在发请求时，web-control 会在 document.title 中设置一个 uuid，请求结束后还原。当 iframe 跨域嵌套时，可以自行实现这个逻辑，把回调参数（uuid）通过 postMessage 传递给顶层窗口，在顶层窗口设置 document.title = document.title + ' '.repeat(36) + uuid
 * @param {function} options.cbUnsetDocTitle 取消设置浏览器标题，请求结束后会调用
 * @param {string} options.HWND 窗口句柄。在网页嵌在业务客户端里的情况下，网页的标题不会显示到业务客户端窗口标题上，web-control 客户端无法找到对应的窗口。此时可以由业务客户端直接把网页所在窗口的句柄告诉前端，通过设置这个字段，web-control 客户端直接根据窗口句柄来找到窗口。该参数仅在支持的该功能的 web-control 客户端版本中生效。
 *
 * @returns {Promise}
 */
oWebControl.JS_CreateWnd('playWnd', 600, 400)
  .then(() => {})
  .catch(() => {})
```

### 销毁窗口

```js
/**
 * @name 销毁窗口
 * 窗口创建成功后可调用。返回 Promise 的状态表明窗口销毁成功或失败。中间件 dll 有实现 DestroyWnd 接口，同一页面多次调用 JS_CreateWnd 和 JS_DestroyWnd 实现业务逻辑时使用。
 *
 * @returns {Promise}
 */
oWebControl.JS_DestroyWnd()
  .then(() => {})
  .catch(() => {})
```

### 设置窗口偏移

```js
/**
 * @name 设置窗口偏移
 * 开启服务成功后可调用，之后再调用 JS_Resize 生效。当 iframe 嵌套时，需要传入该 iframe 相对最顶层窗口的位置。
 *
 * @param {Object} offset 偏移位置
 * @param {Number} offset.left 左偏移
 * @param {Number} offset.top 上偏移
 */
oWebControl.JS_SetDocOffset({ left: 100, top: 200 });
```

### 设置回调函数

```js
/**
 * @name 设置回调函数
 *
 * @param {Object} options 可选参数
 * @param {string} options.cbIntegrationCallBack 设置三方集成框架异步数据回调
 */
oWebControl.JS_SetWindowControlCallback({
  cbIntegrationCallBack(data) {
    console.log(data.responseMsg);
  },
});
```

### 透传接口

```js
/**
 * @name 透传接口
 * 窗口创建成功后可调用。返回 Promise 始终为 resolve
 *
 * @param {*} param 格式自定义，一般会包含函数名称和参数
 *
 * @returns {Promise}
 */
oWebControl.JS_RequestInterface({
  funcName: 'add',
  arguments: { arg1: 1, arg2: 2 },
})
  .then((data) => {
    console.log(data.responseMsg);
  });
```

### 唤醒 exe

```js
/**
 * @name 唤醒 exe
 * 在连接失败后调用，WebControl 的静态方法
 *
 * @param {string} protocal exe 唤醒协议，安装包时写入注册表，默认为 WebControlPlugin://
 */
WebControl.JS_WakeUp('WebControlPlugin://');
```

### 窗口大小、位置改变

```js
/**
 * @name 窗口大小、位置改变
 * 窗口创建成功后可调用。在窗口大小位置变化、resize 事件、scroll 事件触发时调用。
 *
 * @param {number} width 窗口宽度
 * @param {number} height 窗口高度
 */
oWebControl.JS_Resize(600, 400);
```

### 断开连接

```js
/**
 * @name 断开连接
 * unload 事件、路由离开页面时调用。
 *
 * @returns {Promise}
 */
oWebControl.JS_Disconnect();
```

### 扣除部分窗口

```js
/**
 * @name 扣除部分窗口
 * 窗口创建成功后可调用。当需要在窗口上叠加网页元素时可以使用，位置相对于窗口左上角。
 *
 * @param {number} x 左边距
 * @param {number} y 上边距
 * @param {number} width 窗口宽度
 * @param {number} height 窗口高度
 */
oWebControl.JS_CuttingPartWindow(0, 0, 200, 200);
```

### 还原部分窗口

```js
/**
 * @name 还原部分窗口
 * 与 JS_CuttingPartWindow 成对使用。
 *
 * @param {number} x 左边距
 * @param {number} y 上边距
 * @param {number} width 窗口宽度
 * @param {number} height 窗口高度
 */
oWebControl.JS_RepairPartWindow(0, 0, 200, 200);
```

### 隐藏窗口

```js
/**
 * @name 隐藏窗口
 * 窗口创建成功后可调用。
 */
oWebControl.JS_HideWnd();
```

### 显示窗口

```js
/**
 * @name 显示窗口
 * 窗口创建成功后可调用。
 */
oWebControl.JS_ShowWnd();
```
