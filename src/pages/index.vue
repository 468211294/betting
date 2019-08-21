<template>
  <div class="content">
    <div class="scrollContent" ref="contentWrapper">
      <!-- <div>我的收藏</div>
      <div></div>
      <div>开奖公告</div> -->
      <div class="demo"  v-for="(item,index) in resultArr" @click="skip_openDetail(item.type)">
        <div class="l_demo">
          <div class="demoTitle">
          <span class="type">{{item.typeText}}</span><span class="periods">第{{item.expect}}期</span>
          </div>
          <div class="demoContent">
            <!-- :class="{{index2==item.resultArr.length-1?'redCode':'blueCode'}}" -->
            <div class="codeBox"  v-for="(item2,index2) in item.redCode">
              <div class="redCode">
                {{item2}}
              </div>
            </div>
            <div class="codeBox"  v-for="(item3,index3) in item.blueCode">
              <div class="blueCode">
                {{item3}}
              </div>
            </div>
          </div>          
        </div>
        <div class="r_demo">
          <img src="/static/images/right.png" class="rightIcon">
        </div>
        

      </div>
      <div class="gpcList">高频彩</div>
      <!-- -------高频彩列表- -->
      <div v-for="(item,index) in gpc" @click="select_gpc(index)">
        <div class="gp_demo">
          <div class="l_gp_demo">{{item.title}}</div>
          <div class="r_gp_demo">
            <img src="static/images/right.png" class="rightIcon">
          </div>
        </div>
        <div class="areaDiv" v-if="item.isSelect">
          <div class="area" v-for="(item2,index2) in item.area" @click="skip_openDetail(item2.type)">
            {{item2.title}}
          </div>
        </div>
      </div>
      <!-- ------- -->
      
     
    </div>

     <div class="footer">
      <footer-nav :nav="footNav"></footer-nav>
     </div>
  </div>
</template>

<script>
import FooterNav from '../components/FooterNav'
import BScroll from 'better-scroll'
import wx from 'weixin-jsapi'
export default {
  name: 'Index',
  components:{FooterNav,BScroll},
  beforeRouteEnter(to, from, next) {
    if (to.path !== global.location.pathname) {
      location.assign(to.fullPath);
    }   
    next()
  },
  data () {
    return {
      gpc:[
        // { title:"11选5",
        //   area:[
        //     {title:"安徽11选5",type:"ah11x5"},
        //     {title:"北京11选5",type:"bj11x5"},
        //     {title:"福建11选5",type:"fj11x5"},
        //     {title:"广东11选5",type:"gd11x5"},
        //     {title:"甘肃11选5",type:"gs11x5"},
        //     {title:"广西11选5",type:"gx11x5"},
        //     {title:"贵州11选5",type:"gz11x5"},
        //     {title:"河北11选5",type:"heb11x5"},
        //     {title:"黑龙江11选5",type:"hlj11x5"},
        //     {title:"湖北11选5",type:"hub11x5"},
        //     {title:"吉林11选5",type:"jl11x5"},
        //     {title:"江苏11选5",type:"js11x5"},
        //     {title:"江西11选5",type:"jx11x5"},
        //     {title:"辽宁11选5",type:"ln11x5"},
        //     {title:"内蒙古11选5",type:"nmg11x5"},
        //     {title:"山东11选5",type:"sd11x5"},
        //     {title:"上海11选5",type:"sh11x5"},
        //     {title:"陕西11选5",type:"sx11x5"},
        //     {title:"天津11选5",type:"tj11x5"},
        //     {title:"云南11选5",type:"yn11x5"},
        //     {title:"浙江11选5",type:"zj11x5"}     
        //   ],
        //   isSelect:false
        // },
        // {
        //   title:"快3",
        //   area:[
        //     {title:"安徽快3",type:"ahk3"},
        //     {title:"北京快3",type:"bjk3"},
        //     {title:"福建快3",type:"fjk3"},
        //     {title:"甘肃快3",type:"gsk3"},
        //     {title:"广西快3",type:"gxk3"},
        //     {title:"贵州快3",type:"gzk3"},
        //     {title:"河北快3",type:"hebk3"},
        //     {title:"湖北快3",type:"hubk3"},
        //     {title:"吉林快3",type:"jlk3"},
        //     {title:"江苏快3",type:"jsk3"},
        //     {title:"江西快3",type:"jxk3"},
        //     {title:"内蒙古快3",type:"nmgk3"},
        //     {title:"上海快3",type:"shk3"}
        //   ],
        //   isSelect:false
        // },
        // {
        //   title:"快乐十分",
        //   area:[
        //     {title:"重庆快乐十分",type:"cqklsf"},
        //     {title:"广东快乐十分",type:"cqklsf"},
        //     {title:"广西快乐十分",type:"cqklsf"},
        //     {title:"黑龙江快乐十分",type:"cqklsf"},
        //     {title:"湖南快乐十分",type:"cqklsf"},
        //     {title:"陕西快乐十分",type:"sxlklsf"},
        //     {title:"天津快乐十分",type:"cqklsf"},
        //     {title:"云南快乐十分",type:"cqklsf"}
        //   ],
        //   isSelect:false
        // },
        // {
        //   title:"时时彩",
        //   area:[
        //     {title:"重庆时时彩",type:"cqssc"},
        //     {title:"黑龙江时时彩",type:"hljssc"},
        //     {title:"天津时时彩",type:"tjssc"},
        //     {title:"新疆时时彩",type:"xjssc"},
        //     {title:"云南时时彩",type:"ynssc"}
        //   ],
        //   isSelect:false
        // },
        // {
        //   title:"快乐8",
        //   area:[
        //     {title:"北京快乐8",type:"bjkl8"},
        //   ],
        //   isSelect:false
        // },
        // {title:"泳坛夺金",area:[],isSelect:false},
        // {title:"快乐彩",area:[],isSelect:false},
        // {title:"10选3",area:[],isSelect:false},
        // {title:"基诺",area:[],isSelect:false},
        // {title:"e球彩",area:[],isSelect:false},
        // {title:"扑克三",area:[],isSelect:false},
        // {title:"幸运彩",area:[],isSelect:false},
        // {title:"12选3",area:[],isSelect:false},
        // {title:"12选4",area:[],isSelect:false},
        // {title:"20选5",area:[],isSelect:false},
        // {title:"21x1",area:[],isSelect:false},
        // {title:"21选5",area:[],isSelect:false},
        // {title:"24选7",area:[],isSelect:false},
        // {title:"31选7",area:[],isSelect:false},
        // {title:"36选7",area:[],isSelect:false},
        // {title:"10选10",area:[],isSelect:false},
        // {title:"快乐十分麻将",area:[],isSelect:false},

      ],
      resultArr:[
        // {name:"双色球", periods:"2019080",resultArr:["1","2","3","4","5","6","7"]},
        // {name:"大乐透", periods:"2019080",resultArr:["1","2","3","4","5","6","7"]},
        // {name:"福彩3D", periods:"2019080",resultArr:["1","2","3","4","5","6","7"]},
        // {name:"七乐彩", periods:"2019080",resultArr:["1","2","3","4","5","6","7"]},
        // {name:"七星彩", periods:"2019080",resultArr:["1","2","3","4","5","6","7"]},
        // {name:"排列3", periods:"2019080",resultArr:["1","2","3","4","5","6","7"]},
        // {name:"排列3", periods:"2019080",resultArr:["1","2","3","4","5","6","7"]},
        // {name:"排列5", periods:"2019080",resultArr:["1","2","3","4","5","6","7"]}

      ],
      footNav:[
        {
            label:"开奖公告",
            state:false,
            imgUrl:"static/images/_announce.png",
            _imgUrl:"static/images/announce.png",
            routerPath:"/"
        },
        {
            label:"专家推荐",
            state:false,
            imgUrl:"static/images/_recommend.png",
            _imgUrl:"static/images/recommend.png",
            routerPath:"/expertRecommend"
        },
        {
            label:"我的收藏",
            state:false,
            imgUrl:"static/images/_collect.png",
            _imgUrl:"static/images/collect.png",
            routerPath:"/collect"
        },
        {
            label:"会员中心",
            state:false,
            imgUrl:"static/images/_center.png",
            _imgUrl:"static/images/center.png",
            routerPath:"/center"
        }
      ]
    }
  },
  mounted(){
    this.getCodeState();
    this.getData();
    
  },
  created() {
    this.checkCookie();
    
    // location.reload();//刷新数据
    // this._getDiscList()
  },
  methods:{
    // 解决IOS,第一次进入时,url改变的问题
    saveUrl:function(){
      const u=navigator.userAgent;
      const isios=!!u.match(/\(i[^;]+;(u;)?CPU.+Mac OS X/);
      let firstUrl=localStorage.getItem('firstUrl');
      if(!!firstUrl){
        window.localStorage.removeItem("firstUrl");
        window.localStorage.setItem("firstUrl",window.location.href);
      }else{
        window.localStorage.setItem("firstUrl",window.location.href);
      }
    },
    // 高频彩选中时展开列表
    select_gpc:function(idx){
      const that=this;
      for(var i=0; i<that.gpc.length;i++){
        if(i==idx){
          that.gpc[i].isSelect=!(that.gpc[i].isSelect)
        }
      }
    },
    // 页面重定向
     redirection:function(callback){
       const that=this;
       console.log("打印路由",that.$route.path)
       console.log("执行重定向")
      window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx93f48aa95e1820fb&redirect_uri=https%3A%2F%2Fbetting2.jhlovess.cn&response_type=code&scope=snsapi_base&state=true#wechat_redirect"
      callback();
    },
    // redirection:function(){
    //   const that=this;
    //   that.$axios.get('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx93f48aa95e1820fb&redirect_uri=https%3A%2F%2Fbetting.jhlovess.cn&response_type=code&scope=snsapi_base&state=true#wechat_redirect', {
    //     params: {
          
    //     }
    //   })
    //   .then(function (response) {
    //     console.log("11111111",response);
        
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // },
    

    // 初始化滚动区域
     _initScroll(){
        this.contentScroll = new BScroll(this.$refs.contentWrapper, {})
     },
     //  获取开奖数据
    getData:function(){
      const that=this;
      that.$axios.get('/apis/betting/lotteries/all_types', {
        params: {
          
        }
      })
      .then(function (response) {
        console.log(response);
        if(response.data.success==true){
          that.resultArr=response.data.data;
          const result = that.resultArr.map(item => {
          if (item.opencode.includes('+')) {
            const opencode = item.opencode.split('+');
            let target = opencode[0];
            let code = opencode[1].split(',');
            for (let i = 0; i < code.length; i++) {
              target = `${target},+${code[i]}`;
            }
            item.opencode = target;
          }
          return item;
        });
        console.log("打印结果",result);
        that.transformCode(result);

        }
      })
      .catch(function (error) {
        console.log(error);
      });
      
    },
    //  拆分数组
    transformCode:function(arr){
      for(var i=0;i<arr.length;i++){
        arr[i].redCode=[];
        arr[i].blueCode=[];
        arr[i]._opencode= arr[i].opencode.split(",")
        switch(arr[i].type){
          case "bjk3":
            arr[i].typeText="北京快三"
            break;
            case "ssq":
            arr[i].typeText="双色球"
            break;
          case "dlt":
            arr[i].typeText="大乐透"
            break;
          case "qlc":
            arr[i].typeText="七乐彩"
            break;
          case "qxc":
            arr[i].typeText="七星彩"
            break;
          case "pl3":
            arr[i].typeText="排列三"
            break;
          case "pl5":
            arr[i].typeText="排列五"
            break;
          case "fc3d":
            arr[i].typeText="福彩3D"
            break;   
        }
        for(var j=0;j<arr[i]._opencode.length;j++){
          if(arr[i]._opencode[j].indexOf("+")>-1){//如果存在"+"号,
          console.log("打印ij",arr[i]._opencode[j]);
            console.log("执行删除")
            arr[i]._opencode[j]=arr[i]._opencode[j].replace("+","")
            arr[i].blueCode.push(arr[i]._opencode[j]);
          }else{
            arr[i].redCode.push(arr[i]._opencode[j]);
          }
        }
        // replace()
        // for(var n=0;n<arr[i].blueCode.length;n++){
        //    arr[i].blueCode[n]=arr[i].blueCode[n].replace("+","")//删除+号
        // }
        
      }
    },
    // 跳转到详情
    skip_openDetail:function(res){
      const that=this;
      console.log("打印这个种类",res)
      // global.global.type=res
      that.$store.state.type=res;
      that.skip('/openDetail')
    },
    // 设置cookies
    setCookie:function (cname,cvalue,exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires=" + d.toGMTString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    // 获取cookies
    // getCookie:function(name) {
    //   var arr;
    //   var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    //   if (arr = document.cookie.match(reg))
    //     return unescape(arr[2]);
    //    else
    //     return null;
    //  },
    getCookie:function (cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      console.log("打印decodedCookie",decodedCookie)
      var ca = decodedCookie.split(';');
      for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
          console.log("打印c",c)
        }
        if (c.indexOf(name) == 0) {
          console.log("打印c.indexOf(name)",c.indexOf(name))
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    // 检查cookies
    checkCookie:function() {
      const that=this;
      var jehadsama_betting=that.getCookie("jehadsama_betting");
      var zss_betting=that.getCookie("zss_betting");
      var openid=window.localStorage.getItem("openid");
      console.log("打印openid",openid)
      // var code=that.getCookie("code");
      var state=that.analysis_url("state");
      console.log("打印这个url的state",state);
      // 当cookies存在
      console.log("打印是否存在cookies",!!jehadsama_betting)
      if (!!openid) {
        
      } else {//当cookies不存在
        console.log("打印state",state)
        console.log("打印布尔值",state=="true")
        if(state=="true"){
          // that.skip(that.$route.path)
        }else{
          that.redirection(function(){
            that.getCodeState();
            
          })
        }
      }
    },
    // 封装解析获取重定向URL参数方法
    analysis_url:function(name){
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
      if(r!=null)return  unescape(r[2]); return null;
    },
    // 获取code和state,并调用接口
    getCodeState:function(){
      const that=this;
      console.log("执行获取code方法")
      var b=that.getCookie("jehadsama_betting")
      console.log("打印b",b)
      var code=that.analysis_url("code")
      var state=that.analysis_url("state")
      console.log("打印code",code);
      console.log("打印state",state);
      if(state=="true"){
        that.$axios.post('/apis/betting/users/login/by_code', {//获取个人信息接口
          // headers: {'X-Custom-Header': 'foobar'},
            code:code
        })
        .then(function (response) {
          console.log("传递code成功返回的参数",response);
           window.localStorage.setItem('wx_headImg',response.data.data.headphoto);
           window.localStorage.setItem('wx_username',response.data.data.username);
           window.localStorage.setItem('userid',response.data.data.userid);
           window.localStorage.setItem('_id',response.data.data._id);
           window.localStorage.setItem('openid',response.data.data.openid);
          
        })
        .catch(function (error) {
          console.log(error);
        });
        // ------------
        that.shareList('1111','','','');
        // that.$axios.get('/apis/betting/weixin/signature', {
        //   params: {
        //     url:window.localStorage.getItem("firstUrl")
        //   }
        // })
        // .then(function (response) {
        //   console.log("成功获取签名",response);
        //   if(response.data.success==true){
        //     wx.config({
        //       debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //       appId: 'wx93f48aa95e1820fb', // 必填，公众号的唯一标识
        //       timestamp: response.data.data.timestamp, // 必填，生成签名的时间戳
        //       nonceStr: response.data.data.nonceStr, // 必填，生成签名的随机串
        //       signature: response.data.data.signature,// 必填，签名
        //       jsApiList: [updateAppMessageShareData,updateTimelineShareData] // 必填，需要使用的JS接口列表
        //     });
        //     wx.ready(function(){
        //       const that=this;
        //       wx.updateAppMessageShareData({
        //         title: '', // 分享标题
        //         desc: '', // 分享描述
        //         link: window.localStorage.getItem('firstUrl'), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        //         imgUrl: '', // 分享图标
        //         success: function () {
        //           // 设置成功
        //         }
        //       })



        //     })
            
          
        //   }
        // })
        // .catch(function (error) {
        //   console.log("失败获取签名",error);
        // });
      }


    },

  }
  

    
  }



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gpcList{
  height: 28px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border-bottom:1px solid #eeeeee;
}
.area{
  width: 33%;
  border-right:1px solid #eee;
  border-bottom:1px solid #eee;
  border-top:1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
}
.areaDiv{
  display: flex;
  flex-wrap: wrap;
}
.gp_demo{
  display: flex;
  height: 40px;
  background-color: white;
  border-bottom: 1px solid #eeeeee;
}
.l_gp_demo{
  width: 94%;
  display: flex;
  font-size: 16px;
  align-items: center;
  padding-left: 20px;
}
.r_gp_demo{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 20px
}
.rightIcon{
  width: 25px;
  height: 25px;
}
.l_demo{
  width: 94%;
}
.r_demo{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.periods{
  font-size: 14px;
  color: #aaa;
  margin-left: 10px;
}
.type{
  font-size: 16px;
}
.content{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.scrollContent{
  flex: 1;
  padding-bottom: 49px;
}
.row{
  font-size: 16px;
  height: 88px;
}
.footer{
  width: 100%;
  height: auto;
  position: fixed;
  bottom:0;
  background-color: white;
}
.demo{
  padding:20px;
  border-top:1px solid #eee;
  border-bottom:1px solid #eee;
  display: flex;
}
.demoTitle{
  display: flex;
  align-items: center;
}
.demoContent{
  padding-top: 10px;
}
.blueCode{
  width: 30px;
  height: 30px;
  margin-left: 5px;
  margin-top: 5px;
  border-radius: 100%;
  font-size: 20px;
  border:2px solid rgb(53,151,222);
  color:rgb(53,151,222);
  display: flex;
  align-items: center;
  justify-content: center;
}
.redCode{
  width: 30px;
  height: 30px;
  margin-left: 5px;
  margin-top: 5px;
  border-radius: 100%;
  font-size: 20px;
  border:2px solid red;
  color:red;
  display: flex;
  align-items: center;
  justify-content: center;
}
.codeBox{
  display: inline-block;
}


</style>
