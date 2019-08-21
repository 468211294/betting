<template>
  <div class="content">
    <div class="scrollContent" ref="contentWrapper">
      <!-- 头部 -->
      <div class="header">
        <div class="l_header">
          <!-- <img src="static/images/goBack.png" class="goback"> -->
        </div>
        <div class="m_header">我的收藏</div>
        <div class="r_header"></div>
      </div>
      <!-- 搜索 -->
      <div class="searchBox">
        <div class="l_searchBox">
          <input type="text" placeholder="搜索..." class="searchInput">
        </div>
        <div class="r_searchBox">
          <img src="static/images/search.png" class="searchIcon">
        </div>
      </div>
      <!-- 推送设置 -->
      <div class="expertList">
        <div class="tableHeader">
          <div class="l_tableHeader">标题</div>
          <div class="r_tableHeader">
            <div class="r_tableHeader_row">推送设置</div>
            <div class="r_tableHeader_row">
              <div class="collectOption">短信</div>
              <div class="collectOption">微信</div>
              <div class="collectOption">app</div>
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
  data () {
    return {
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
  },
  methods:{
    // 初始化滚动区域
     _initScroll(){
    this.contentScroll = new BScroll(this.$refs.contentWrapper, {})
   }
  }



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.collectOption{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.r_tableHeader_row{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tableHeader{
  margin-top: 15px;
  display: flex;
  height: 40px;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
}
.l_tableHeader{
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;

}
.r_tableHeader{
  flex: 1;
  display: flex;
  flex-direction: column
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
.expertList{
  width: 100%;
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