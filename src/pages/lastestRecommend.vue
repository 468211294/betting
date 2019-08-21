<template>
  <div class="content">
    <div class="scrollContent" ref="contentWrapper">
      <!-- 头部 -->
      <div class="header">
        <div class="l_header">
          <img src="static/images/goBack.png" class="goback" @click="goback">
        </div>
        <div class="m_header">最新推荐</div>
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
      <!-- 文章列表 -->
      <div class="articleList">
        <div class="articleBox" v-for="(item,index) in articleList" @click="skip('/article',item._id)">
          <div class="l_articleBox">
            <img :src="item.cover" class="headPhoto">
          </div>
          <div class="r_articleBox">
              <div>{{item.title}}</div>
              <div class="statistics">作者:{{item.author}}<img src="static/images/time.png" class="statisticsIcon">{{item.date}}</div>
              <div class="statistics">
                <!-- <img src="static/images/eye.png" class="statisticsIcon">展示({{item.show}}) -->
                <img src="static/images/people.png" class="statisticsIcon">阅读:({{item.read}})
                <img src="static/images/zan.png" class="statisticsIcon">点赞:({{item.like}})
              </div>
          </div>
        </div>
      </div>
      
    </div>

    <!-- <div class="footer">
    <footer-nav :nav="footNav"></footer-nav>
    </div> -->
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
      page:0,
      limit:100,
      // 文章列表
      articleList:[
        // {headPhoto:"static/images/headImg.jpg",title:"文章标题1",abstract:"摘要",author:"作者1",date:"2019-1-1",show:"5",read:"6",praise:"1"},
        // {headPhoto:"static/images/headImg.jpg",title:"文章标题2",abstract:"摘要",author:"作者2",date:"2019-1-1",show:"5",read:"6",praise:"1"},
        // {headPhoto:"static/images/headImg.jpg",title:"文章标题3",abstract:"摘要",author:"作者3",date:"2019-1-1",show:"5",read:"6",praise:"1"},
        // {headPhoto:"static/images/headImg.jpg",title:"文章标题4",abstract:"摘要",author:"作者4",date:"2019-1-1",show:"5",read:"6",praise:"1"}
      ],
      // 底部导航
      // footNav:[
      //   {
      //       label:"开奖公告",
      //       state:false,
      //       imgUrl:"static/images/_announce.png",
      //       _imgUrl:"static/images/announce.png",
      //       routerPath:"/"
      //   },
      //   {
      //       label:"专家推荐",
      //       state:false,
      //       imgUrl:"static/images/_recommend.png",
      //       _imgUrl:"static/images/recommend.png",
      //       routerPath:"/expertRecommend"
      //   },
      //   {
      //       label:"我的收藏",
      //       state:false,
      //       imgUrl:"static/images/_collect.png",
      //       _imgUrl:"static/images/collect.png",
      //       routerPath:"/"
      //   },
      //   {
      //       label:"会员中心",
      //       state:false,
      //       imgUrl:"static/images/_center.png",
      //       _imgUrl:"static/images/center.png",
      //       routerPath:"/"
      //   }
      // ]
    }
  },
  created() {
    // this._getDiscList()
    this.getArticle();
  },
  methods:{
    // 初始化滚动区域
     _initScroll(){
      this.contentScroll = new BScroll(this.$refs.contentWrapper, {})
    },
    // 获取文章数据
    getArticle:function(){
      const that=this;
      that.$axios.get('/apis/betting/articles/by_audience',{
        params:{
          page:that.page,
          limit:that.limit
        }
      })
      .then(function (response) {
        console.log(response);
        if(response.data.success==true){
          that.articleList=response.data.data
          for(var i=0;i<that.articleList.length;i++){
            that.articleList[i].date=(new Date(that.articleList[i].created_at)).format("yyyy-MM-dd")
          }
          console.log(that.articleList)
        
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 文章列表模板样式 */
.statisticsIcon{
  width: 15px;
  height: 15px;
}
.statistics{
  display: flex;
  align-items: center;
}
.spanBlock{
  display: block;
}
.articleBox{
  width: 100%;
  display: flex;
  padding-top: 20px;
  padding-bottom: 20px;
  /* padding-left: 20px; */
  border-bottom: 1px solid #eeeeee;
}
.l_articleBox{
  flex: 1;
  display: flex;
  justify-content: center;
}
.r_articleBox{
  flex: 3;
  /* display: flex; */
  /* align-items: center; */
}
.headPhoto{
  width: 70px;
  height: 70px
}
/* 文章列表模板样式END */
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
.articleList{
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