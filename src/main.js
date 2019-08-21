// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible/flexible'
import common from './publicFunction/publicFunction'
import store from './store'
import axios from 'axios'//引入axios
import $ from 'jquery'
import './plugs/imgFileupload'
import wx from 'weixin-jsapi'
// import global from './components/global'
// import BScroll from 'better-scroll'
// Vue.prototype.wx = wx;

Vue.prototype.$axios=axios;
Vue.prototype.$axios.defaults.baseURL = 'https://betting2.jhlovess.cn';
axios.defaults.withCredentials =true;//开启跨域
// 单独的axios请求
var instance = axios.create({
  baseURL:'https://betting2.jhlovess.cn',
  timeout:5000,
  headers:{'Content-Type': 'multipart/form-data'},
  // headers:{"Content-Type":"application/x-www-form-urlencoded format"},
  withCredentials: true
  // transformRequest: [function (data) {
  //   return data
  // }]
});

Vue.prototype.instance=instance;
// 封装微信分享
Vue.prototype.shareList=function(title,desc,imgUrl){
  Vue.prototype.$axios.get('/apis/betting/weixin/signature', {
    params: {
      // url:window.localStorage.getItem("firstUrl")
      url:window.location.href.split('#')[0]
    }
  })
  .then(function (response) {
    console.log("成功获取签名",response);
    if(response.data.success==true){
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx93f48aa95e1820fb', // 必填，公众号的唯一标识
        timestamp: response.data.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: response.data.data.noncestr, // 必填，生成签名的随机串
        signature: response.data.data.signature,// 必填，签名
        jsApiList: ['onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
      });
      wx.ready(function(){
        const that=this;
        wx.onMenuShareAppMessage({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: window.location.href.split('#')[0]+'#'+window.location.href.split('#')[1], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: imgUrl, // 分享图标
          success: function () {
            alert('分享成功')
            alert('appId:' + wx93f48aa95e1820fb)
            alert('timestamp:' + response.data.data.timestamp)
            alert('nonceStr:' + response.data.data.nonceStr)
            alert('signature:' + response.data.data.signature)
          }
        })



      })
      
    
    }
  })
  .catch(function (error) {
    console.log("失败获取签名",error);
  });



}
// ---------------


Vue.config.productionTip = false
Vue.use(common);
// Vue.prototype.print = function (){
//   console.log("这是一个全局方法")
// };

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // BScroll,
  components: { App },
  template: '<App/>'
})
