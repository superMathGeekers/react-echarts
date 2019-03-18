# rettc-echarts

组件地址：https://github.com/superMathGeekers/react-echarts/blob/master/src/components/reactEcharts/index.js

<center><img src="https://cdn.nlark.com/yuque/0/2019/png/103876/1552806063902-b3e63085-ea88-42bd-961d-492d977fe014.png?x-oss-process=image/resize,w_2000"></center>

## 特性
* 根据原生 echarts api 封装成 react 组件
* 支持原生 option 数据格式
* 默认宽度为父元素宽地，高度为350px
* 支持宽度和高度更新重选渲染徒刑
* 支持浏览器 resize 事件重新适配刷新
* 支持 document上的 ecahrtsUpdate 自定义事件

## 例子
```javascript
<ReactEcharts
    option={option}// option 为原生的 option 数据格式
    style={{ width: '100%', height: 500}}
/>
```
