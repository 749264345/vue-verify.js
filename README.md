# vue-verify.js

这是一个验证码工具，基于vue编写；令人兴奋的是，它只需几行代码就能实现语义、颜色、九宫格定位、图形定位以及鼠标的点击事件五大验证；

>[点击查看实例](https://749264345.github.io/vue-verify.js)

> * 验证中文的语义理解
> * 验证颜色区分
> * 验证鼠标点击事件
> * 验证九宫格定位
> * 验证图形定位

我们来尝试使用它;首先你确定已经引用了vue以及Vue-verify.js到你的项目中；
```html
<!-- html -->
<div id="app">
    <!-- 指定一个容器,验证UI将渲染到此处 -->
    <div id="verify-area"></div>
</div>
```
```javasript 
//使用插件,默认九宫格定位
//Vue.use(Verify);

//使用随机图形验证  
Vue.use(Verify,{
    mode:'shape',
    position: [
        { key: 1, label: '❈' },
        { key: 2, label: '✿' },
        { key: 3, label: '✲' },
        { key: 4, label: '☃' },
        { key: 5, label: '❀' },
        { key: 6, label: '☂' },
        { key: 7, label: '❄' },
        { key: 8, label: '✪' },
        { key: 9, label: '♧' }
    ] 
});
//必要时掺入参数
// Vue.use(Verify,{...})

new Vue({
    el: '#app',
    data: {
        //记录验证结果
        result: false
    },
    mounted: function () {

        //执行插件 传入一个容器ID 和 一个回调函数
        //回调函数返回验证结果
        this.$verify('#verify-area', (verify) => {
            //返回验证结果
            this.result = verify;
        });

    }
})
```

## 1.选项说明
```javascript
Vue.use(verify,{
    //验证模式，默认position，可选shape,使用图形验证
    mode:'position',

    //区域选项，area为一个数组，可以传入任意多个
    //key为必传参数，不可重复，value为区域颜色，label作为语义理解
    area:[
    	{key:1,value:'rgb(255, 237, 237)',label:'红色'},
    	{key:2,value:'rgb(208, 252, 223)',label:'绿色'},
    	{key:3,value:'rgb(255, 240, 199)',label:'橘黄色'}
    ],
    
    //九宫格位置选项，position为一个数组，默认为九个
    //根据需要可传入任意多个
    //key与label为必传参数，不可重复，必须一一对应
    //使用图形验证时，label为可设置形状，如☺☻❀⚘♔♕♖等特殊字符
    position:[
    	{key:1,label:'左上方位置'},
    	{key:2,label:'正上方位置'},
    	{key:3,label:'右上方位置'},
    	{key:4,label:'左边位置'},
    	{key:5,label:'中间位置'},
    	{key:6,label:'右边位置'},
    	{key:7,label:'左下方位置'},
    	{key:8,label:'正下方位置'},
    	{key:9,label:'右下方位置'}
    ],
    
    //验证成功标题
    success:'Success!',
    
    //验证成功副标题
    successSub:'Good job,dude!',
    
    //验证失败标题
    error:'Error...',
    
    //验证失败副标题,按钮
    errorSub:'Try again'
})
```
##### 九宫格方位验证
![ui](https://raw.githubusercontent.com/749264345/vue-verify.js/master/position.jpg)
##### 图形验证
![ui](https://raw.githubusercontent.com/749264345/vue-verify.js/master/shape.jpg)
##### 验证成功
![success](https://raw.githubusercontent.com/749264345/vue-verify.js/master/success.jpg)
##### 验证失败
![error](https://raw.githubusercontent.com/749264345/vue-verify.js/master/error.jpg)

## 2.获取验证结果
```javascript 
mounted: function () {

    //执行插件 传入一个容器ID 和 一个回调函数
    //回调函数返回验证结果
    this.$verify('#verify-area', (verify) => {
        //返回验证结果
        this.result = verify;
    });

} 
```