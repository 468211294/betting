
<template>
  <div class="content">
    <div class="scrollContent" ref="contentWrapper">
      <!-- 头部 -->
      <div class="header">
        <div class="l_header">
          <img src="static/images/goBack.png" class="goback" @click="goback">
        </div>
        <div class="m_header">文章</div>
        <div class="r_header">
          <img src="static/images/no_collect.png" class="goback">
        </div>
      </div>
      <div class="articleContent">
        <div class="title">{{article.title}}</div>
        <div class="authorRow">
          <div class="l_authorRow">{{article.date}}</div>
          <div class="m_authorRow"></div>
          <div class="r_authorRow">{{article.author}}</div>
        </div>
        <div>{{article.content}}</div>
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
      article:{
        title:"",
        date:"",
        author:"",
        content:""
      }
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
      //       routerPath:"/collect"
      //   },
      //   {
      //       label:"会员中心",
      //       state:false,
      //       imgUrl:"static/images/_center.png",
      //       _imgUrl:"static/images/center.png",
      //       routerPath:"/center"
      //   }
      // ]
    }
  },
  mounted(){
    console.log("打印路由参数",this.$route.query.id)
    this.getData()
  },
  created() {
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
      const id=that.$route.query.id;
      that.$axios.get('/apis/betting/articles/'+id+'/by_audience', {
        params: {
          
        }
      })
      .then(function (response) {
        console.log(response);
        if(response.data.success==true){
          const data=response.data.data
          that.article.title=data.title;//文章标题
          that.article.date=new Date(data.updated_at).format("yyyy-MM-dd hh:mm:ss");
          that.article.author=data.user.username;
          that.article.content=data.content;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      
    },
    
  }
  

    
  }



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 文章样式 */
.authorRow{
  display: flex;
  padding-bottom: 10px;
  border-bottom:1px dashed black;
}
.articleContent{
  padding-left:20px;
  padding-right:20px;
}
.title{
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  height: 40px;
}
.l_authorRow{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.m_authorRow{
  flex: 1;
}
.r_authorRow{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
  color: #aaa;
  margin-left: 10px;
}
.type{
  font-size: 16px;
}
.content{
  display: flex;
  flex-direction: column;
  /* width: 100%; */
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