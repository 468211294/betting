<template>
  <div class="content">
    <div class="scrollContent" ref="contentWrapper">
      <!-- 头部 -->
      <div class="header">
        <div class="l_header">
          <img src="static/images/goBack.png" class="goback" @click="goback">
        </div>
        <div class="m_header">{{resultArr[0].typeText}}开奖公告</div>
        <div class="r_header">
          <img src="static/images/no_collect.png" class="goback">
        </div>
      </div>
      <!-- 走势,遗漏 -->
      <div class="tableList">
        <div class="l_tableList">
          <div class="bg" @click="skip('/table')">
            <img src="static/images/zs.png" class="zsIcon">
          </div>
          <span>走势</span>
        </div>
        <div class="l_tableList2">
          <div class="bg">
            <img src="static/images/yl.png" class="zsIcon">
          </div>
          <span>遗漏</span>
        </div>
        <div class="l_tableList3">
          <div class="bg">
            <img src="static/images/tv.png" class="zsIcon">
          </div>
          <span>直播</span>
        </div>
      </div>
      <!-- <div>我的收藏</div>
      <div></div>
      <div>开奖公告</div> -->
      <div class="demo"  v-for="(item,index) in resultArr">
        <div class="l_demo">
          <div class="demoTitle">
          <!-- <span class="type">{{item.type}}</span> -->
          <span class="periods">第{{item.period}}期</span>
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
  // beforeRouteEnter(to, from, next) {
  //   if (to.path !== global.location.pathname) {
  //     location.assign(to.fullPath);
  //   }   
  //   next()
  // },
  data () {
    return {
      page:0,
      limit:100,
      resultArr:[
        
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
    var href = window.location.href;
    console.log("打印这个URL",href);
    this.getData();
    this.aaa();
  },
  created() {
    const that=this;
    console.log("连接1",window.location.href.split('#')[0])
    console.log("连接2",window.location.href.split('#')[1])
    console.log("连接3",location.href.replace(location.hash, ''))
    that.shareList('1111','','');
    console.log("打印wx对象",wx)
    // that.$axios.get('/apis/betting/weixin/signature', {
    //       params: {
    //         url:window.localStorage.getItem("firstUrl")
    //       }
    //     })
    //     .then(function (response) {
    //       console.log("成功获取签名",response);
    //       if(response.data.success==true){
    //         wx.config({
    //           debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //           appId: 'wx93f48aa95e1820fb', // 必填，公众号的唯一标识
    //           timestamp: response.data.data.timestamp, // 必填，生成签名的时间戳
    //           nonceStr: response.data.data.nonceStr, // 必填，生成签名的随机串
    //           signature: response.data.data.signature,// 必填，签名
    //           jsApiList: [updateAppMessageShareData,updateTimelineShareData] // 必填，需要使用的JS接口列表
    //         });
    //         wx.ready(function(){
    //           console.log("加载分享")
    //           wx.updateAppMessageShareData({
    //             title: '11111111111', // 分享标题
    //             desc: '', // 分享描述
    //             link: window.localStorage.getItem('firstUrl'), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //             imgUrl: '', // 分享图标
    //             success: function () {
    //               alert("设置成功")
    //               // 设置成功
    //             }
    //           })



    //         })
            
          
    //       }
    //     })
    //     .catch(function (error) {
    //       console.log("失败获取签名",error);
    //     });



    // location.reload();//刷新数据
    // this._getDiscList()

  },
  methods:{
    // 初始化滚动区域
     _initScroll(){
        this.contentScroll = new BScroll(this.$refs.contentWrapper, {})
     },
     //  获取开奖数据
    getData:function(){
      const that=this;
      that.$axios.get('/apis/betting/lotteries', {
        params: {
          type:that.$store.state.type,
          page:that.page,
          limit:that.limit
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
        // var idx=arr.length-i;//计算期数
        // console.log("打印这个idx",idx)
        // arr[i].new_expect=new Date(1565104678000).format2("yyyyMMdd");
        // arr[i].number=idx;//获取期数
        arr[i].redCode=[];
        arr[i].blueCode=[];
        arr[i]._opencode= arr[i].opencode.split(",")
        switch(arr[i].type){
          case "bjk3":
            arr[i].typeText="北京快三"
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
    // 获取cookies
    getCookie:function (cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    // 自定义事件
    aaa:function(){
      const that=this;
      var a=that.getCookie("jehadsama_betting")
      console.log("打印这个cookies",a)
    }
  }
  

    
  }



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.zsIcon{
  width: 20px;
  height: 20px;
}
.bg{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgb(73, 196, 250);
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-right: 5px; */

}

.tableList{
  display: flex;
  padding-top:10px;
  padding-bottom: 10px;
}
.l_tableList{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* padding-right: 5px; */
}
.l_tableList2{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding-right: 5px; */
}
.l_tableList3{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* padding-right: 5px; */
}
.r_tableList{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 5px;
}
/* 头部样式 */
.header{
  width: 100%;
  height: 32px;
  display: flex;
  background-color: #e36a1b;
}
.l_header{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.m_header{
  flex: 6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;

}
.r_header{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.goback{
  width: 25px;
  height: 25px;
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
  color: #323232;
  font-weight: bold;
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