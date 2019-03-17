# rettc-cli-soup
rettc-cli PC端web前端框架
react 技术栈

## 使用方法
### 运行环境：
1. git项目版本管理软件
2. node.js(本脚手架基于8.5.0版本建立)，确保npm已经安装
3. 编辑器推荐使用vscode

### 项目启动
**下载项目依赖包(翻墙)**
```
    npm install
```
**下载项目依赖包(<a href="https://npm.taobao.org/" target="_blank">淘宝镜像</a>)**
```
    cnpm install
```
确认完成后无报错(warning可以暂时忽略)。安装 `React Developer Tools` ，`Redux DevTools` 谷歌浏览器扩展程序

**启动项目**
```
    npm start
```  
无报错的情况下node自动进行，并且实现了热更新（代码修改保存后node及时编译并且展示对应网页）。

**常见报错情况**
* 端口已经被占用。解决办法：在 `webpack.dev.js` 中找到 `devServer.port` 的端口改成其他端口号，比如 80，8080，8090等。
* 首次执行 `npm start` 因facicon.con图标找不到报错，再次执行 `npm start`。

### 主要组件的使用方法
```
----src(源码目录)
--------index.ejs(页面模板)
--------entry(加载 views 中内容，统一输出到 index.ejs)
--------actions(Redux 中 action )
--------reducers(Redux 中 reducer )
--------views(导航，以及导航对应的页面)
```

- `src/entry/index.jsx`为入口文件，即主页的主要内容。
- `src/view/test/index.jsx`为其中一块组件，实现一个表格。
- `src/actions/test.js`对应`src/view/test/index.js`的actions文件，同时实现了一个后台接口。
- `src/reducers/test.js`对应为`src/view/test/index.js`的reducers文件，修改`src/view/test/index.js`下的数据流。
- `src/reducers/index.js`将`src/reducers/test.js`的reducer组件合并到根reducers中。
- `src/actions/actionTypes.js`中存放各种reducers命令标签。
- 样式文件建议使用less语法。
- js语法建议使用ES6或以上版本。

可以根据上述文件的形式进行改写、新增等。

### 注意事项
- 关于框架的任何问题咨询组内前端
- 组外人员请提issue