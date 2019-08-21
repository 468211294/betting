<template>
  <div class="content">
    <div class="scrollContent" ref="contentWrapper">
      <!-- 头部 -->
      <div class="header">
        <div class="l_header">
          <img src="static/images/option.png" class="goback" @click="openSideBar">
        </div>
        <div class="m_header">会员中心</div>
        <div class="r_header"></div>
      </div>
      <!-- 搜索 -->
      <!-- <div class="searchBox"> -->
        <!-- <div class="l_searchBox">
          <input type="text" placeholder="搜索..." class="searchInput">
        </div>
        <div class="r_searchBox">
          <img src="static/images/search.png" class="searchIcon">
        </div>
      </div> -->
      <!-- 个人中心栏目 -->
      <div class="list">
        <!-- 侧边栏 -->
        <div :class="sideBar?'sideBar':'_sideBar'">
          <div class="ex"></div>
          <div v-if="sideBar">
            功能导航
          </div>
          <div v-for="(item,index) in sideList" @click="selectSide(index,item)">
            <div class="sideRow">
              <div class="l_sideRow">
                <img :src="item.icon" class="sideIcon">
                <span>{{item.title}}</span>
              </div>
              <div class="r_sideRow">
                <img src="static/images/right.png" class="sideIcon" v-if="item.childArr.length>0">
              </div>
            </div>
            <div class="childList" v-if="item.isSelect">
              <div class="childListRow" v-for="(item2,index) in item.childArr" @click="selectChildSide(item2)">
                <img :src="item2.icon" class="sideIcon">
                <span>{{item2.title}}</span>

              </div>
            </div>
          </div>

        </div>
        <!-- 微信个人信息,头像,名称 -->
        <div class="wxMsg">
          <div class="l_wxMsg">
            <img :src="wxMsg.headImg" class="headImg">
          </div>
          <div class="r_wxMsg">
            <div class="wxname">{{wxMsg.name}}({{wxMsg.userid}})</div>

          </div>

        </div>
        <div v-for="(item,index) in list" class="listBox">
          <div class="listRow" v-for="(item2,index2) in item">
            <div class="l_listRow">
              <img :src="item2.icon" class="icon">
            </div>
            <div class="m_listRow">
              <span>{{item2.title}}</span>
            </div>
            <div class="r_listRow">
              <img :src="item2.right" class="icon">
            </div>
          </div>

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
      wxMsg:{
        name:"",
        headImg:"",
        userid:""
      },
      sideBar:false,
      sideList:[
        {title:"首页",icon:"static/images/house.png",childArr:[],routePath:"/"},
        {title:"用户专区",icon:"static/images/user.png",childArr:[
          {title:"我的资料",icon:"static/images/zl.png",routePath:""},
          {title:"我的收益",icon:"static/images/sy.png",routePath:""},
          {title:"我的推广",icon:"static/images/tg.png",routePath:""},
          {title:"我的产品",icon:"static/images/cp.png",routePath:""}
        ],isSelect:false},
        {title:"专家专区",icon:"static/images/expert2.png",childArr:[
          {title:"我的频道",icon:"static/images/pd.png",routePath:""},
          {title:"我的资料",icon:"static/images/zl.png" ,routePath:"/expertMsg"},
          {title:"绑定TV用户",icon:"static/images/tv2.png" ,routePath:""},
          {title:"我的粉丝",icon:"static/images/fs.png" ,routePath:""}
        ],isSelect:false},
      ],
      // 个人中心栏目
      list:[
        // [
        //   {icon:"static/images/money.png",title:"我的余额",right:"static/images/right.png"},
        //   {icon:"static/images/money.png",title:"未结算收益",right:"static/images/right.png"}
        // ],
        [
          {icon:"static/images/shopCar.png",title:"我的产品",right:"static/images/right.png"},
          {icon:"static/images/tg.png",title:"我的推广",right:"static/images/right.png"},
        ],
        [
          {icon:"static/images/expert.png",title:"我的粉丝",right:"static/images/right.png"}
        ]
        
        
        
      ],
      // 专家列表
      expertList:[
        {name:"专家1",headPhoto:"static/images/_announce.png"},
        {name:"专家2",headPhoto:"static/images/_announce.png"},
        {name:"专家3",headPhoto:"static/images/_announce.png"},
        {name:"专家4",headPhoto:"static/images/_announce.png"},
        {name:"专家5",headPhoto:"static/images/_announce.png"},
        {name:"专家6",headPhoto:"static/images/_announce.png"},
        {name:"专家7",headPhoto:"static/images/_announce.png"},
        {name:"专家8",headPhoto:"static/images/_announce.png"},
        {name:"专家9",headPhoto:"static/images/_announce.png"},
        {name:"专家10",headPhoto:"static/images/_announce.png"}
      ],
      // 底部导航
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
  created() {
    // this._getDiscList()
    this.wxMsg.name=window.localStorage.getItem('wx_username');
    this.wxMsg.headImg=window.localStorage.getItem('wx_headImg');
    this.wxMsg.userid=window.localStorage.getItem('userid');
    
  },
  methods:{
    // 打开侧边栏
    openSideBar:function(){
      const that=this;
      that.sideBar=!(that.sideBar);
    },
    // 初始化滚动区域
     _initScroll(){
    this.contentScroll = new BScroll(this.$refs.contentWrapper, {})
   },
   selectSide:function(idx,item){
     const that=this;
     item.isSelect=!(item.isSelect);
     if(item.childArr.length==0){
       that.sideBar=false;
       that.skip(item.routePath);
       that.$store.state.thisIndex=0;
     }
   },
   selectChildSide(item2){
     const that=this;
     that.sideBar=false;
       that.skip(item2.routePath);
   }
  }



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wxname{
  /* margin-top: 20px; */
}
.headImg{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.l_wxMsg{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-bottom: 20px; */

}
.r_wxMsg{
  flex: 5;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.wxMsg{
  display: flex;
  height: 80px;
  background-color: white;
  margin-bottom: 20px;
}
.childListRow{
  display: flex;
  align-items: center;
  height: 20px;
}
.sideRow{
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
}
.l_sideRow{
  flex: 6;
  display: flex;
  align-items: center;
}
.r_sideRow{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sideIcon{
  width: 16px;
  height: 16px;
}
.ex{
  width: 200px;
}
.sideBar{
  /* width: 0px; */
  height: 100%;
  max-width: 400px;
  padding: 15px;
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999px;
  transition: max-width 4s;
  display: block;
}

._sideBar{
  /* width: 200px; */
  max-width:0px;
  position: absolute;
  /* padding: 15px; */
  top:0;
  left: 0;
  z-index: 999;
  background-color: white;
  display: none;
  /* transition: max-width 3s; */
}
.icon{
  width: 20px;
  height: 20px
}
.listRow{
  /* width: 100%; */
  display: flex;
  height: 40px;
  background-color: white;
  border: 1px solid #eee;
}
.l_listRow{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.m_listRow{
  flex: 7;
  display: flex;
  align-items: center;
}
.r_listRow{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.listBox{
  margin-bottom: 20px;
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
/* 头部样式结束 */
/* 搜索栏样式 */
.searchBox{
  /* width: 100%; */
  height: 40px;
  display: flex;
  border: 1px solid #dddddd;
  border-radius: 4px;
}
.l_searchBox{
  flex: 9;
  display: flex;
  align-items: center;
}
.r_searchBox{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:#dddddd;
}
.searchInput{
  width: 300px;
  outline: none;
  border: none;
  font-size: 20px;
}
.searchIcon{
  width: 20px;
  height: 20px;
}
/* 搜索栏样式END */
/* 专家列表样式 */
.list{
  width: 100%;
  height: 100%;
  position: relative;
  /* display: flex;
  flex-wrap: wrap; */
}
.expertBox{
  width: 24%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.expertHead{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  
  background-size: 30px 30px;
  background-repeat: no-repeat;
  background-position: center;
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
  background-color: #eee;
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
  border-radius: 100%;
  font-size: 25px;
  border:2px solid blue;
  display: flex;
  align-items: center;
  justify-content: center;
}
.redCode{
  width: 30px;
  height: 30px;
  margin-left: 5px;
  border-radius: 100%;
  font-size: 25px;
  border:2px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
}
.codeBox{
  display: inline-block;
}


</style>