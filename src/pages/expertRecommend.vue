<template>
  <div class="content">
    <div class="scrollContent" ref="contentWrapper">
      <!-- 频道 -->
      <div class="optionList">
        <div class="l_optionList" v-for="(item,index) in entry">
          <div class="bg" @click="skip(item.routerPath)">
            <img :src="item.icon" class="icon">
            <span>{{item.name}}</span>
          </div>
        </div>
        <!-- <div class="m_optionList">
          <div class="bg"></div>
        </div>
        <div class="r_optionList">
          <div class="bg"></div>
        </div> -->
      </div>
      <!-- tab选项 -->
      <div class="tabList">
        <div v-for="(item,index) in tab" :class="item.isSelect==true?'tabOption':'_tabOption'" @click="tabEvent(item.name)">
          <img :src="item.icon" class="tabIcon"><span>{{item.name}}</span>
        </div>
      </div>
      
      <!-- 专家列表 -->
      <div class="expertList">
        <div class="expertBox" v-for="(item,index) in expertList" @click="skip_expertArticle(item)">
          <div class="expertHead" :style="{'background-image':'url('+item.headphoto+')'}"></div>
          <!-- <div class="expertHead" :style="background:url({{item.headPhoto}})"></div> -->
          <span class="block">
            {{item.username}}
          </span>
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
      // 功能入口
      entry:[
        {name:"专家大全",icon:"static/images/expert.png",routerPath:"/expert"},
        {name:"最新推荐",icon:"static/images/record.png",routerPath:"/lastestRecommend"},
        {name:"推荐频道",icon:"static/images/road.png",routerPath:"/channelRecommend"},
      ],
      // tab
      tab:[
        {name:"编辑推荐",icon:"static/images/zan2.png",isSelect:true},
        {name:"热门专家",icon:"static/images/hot.png",isSelect:false},
        {name:"更多专家",icon:"static/images/expert.png",isSelect:false}
      ],
      // 专家列表
      expertList:[
        // {name:"专家1",headPhoto:"static/images/_announce.png"},
        // {name:"专家2",headPhoto:"static/images/_announce.png"},
        // {name:"专家3",headPhoto:"static/images/_announce.png"},
        // {name:"专家4",headPhoto:"static/images/_announce.png"},
        // {name:"专家5",headPhoto:"static/images/_announce.png"},
        // {name:"专家6",headPhoto:"static/images/_announce.png"},
        // {name:"专家7",headPhoto:"static/images/_announce.png"},
        // {name:"专家8",headPhoto:"static/images/_announce.png"},
        // {name:"专家9",headPhoto:"static/images/_announce.png"},
        // {name:"专家10",headPhoto:"static/images/_announce.png"}
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
    // this.getData(['hot','recommended']);
     this.getData(['recommended']);

    // location.reload();
    // this._getDiscList()
  },
  methods:{
    // 初始化滚动区域
     _initScroll(){
    this.contentScroll = new BScroll(this.$refs.contentWrapper, {})
    },
    getData:function(arr){//'hot', 'recommended'
      const that=this;
      that.$axios.get('/apis/betting/users/experts', {
        params: {
          q:{tags:JSON.stringify(arr)},
          limit:100,
          page:0
        }
      })
      .then(function (response) {
        console.log(response);
        if(response.data.success==true){
          that.expertList=response.data.data;
          

        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    skip_expertArticle:function(obj){
      const that=this;
      console.log("打印obj",obj)
      window.localStorage.setItem('headphoto',obj.headphoto);
      window.localStorage.setItem('introduction',obj.introduction);
      window.localStorage.setItem('username',obj.username);

      that.skip('/expertArticle',obj._id)
    },
    // tab切换事件
    tabEvent(res){
      const that=this;
      for(var i=0;i<that.tab.length;i++){
        if(that.tab[i].name==res){
          that.tab[i].isSelect=true;
        }else{
          that.tab[i].isSelect=false;
        }
      }
      switch(res){
        case "编辑推荐":
          that.getData(['recommended']);
          break;
        case "热门专家":
          that.getData(['recommended']);
          break;
        case "更多专家":
          that.skip('/expert');
          break;
      }
    }
  }



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tabIcon{
  width: 16px;
  height: 16px;
}
.tabOption{
  flex: 1;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #eeeeee;
  border-top: 1px solid #eeeeee;
  border-right: 1px solid #eeeeee;
}
._tabOption{
  flex: 1;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #eeeeee;
  
}
.tabList{
  display: flex;
  height: 35px;
}
.icon{
  width: 20px;
  height: 20px;
  display: block;
}
.bg{
  width: 90px;
  height:60px;
  border-radius: 5px;
  background-color: #eeeeee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* 头部样式 */
.l_optionList{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.m_optionList{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.r_optionList{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.optionList{
  width: 100%;
  display: flex;
  height: 120px;
}
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
  display: flex;
  flex-wrap: wrap;
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