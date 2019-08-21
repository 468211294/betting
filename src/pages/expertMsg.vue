<template>
  <div class="content">
    <div class="scrollContent" ref="contentWrapper">
      <!-- 头部 -->
      <div class="header">
        <div class="l_header">
          <img src="static/images/option.png" class="goback" @click="openSideBar">
        </div>
        <div class="m_header">专家资料</div>
        <div class="r_header"></div>
      </div>
      <!-- 内容 -->
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
        <div class="formContent">
          <!-- 专家提示 -->
          <div class="promptDiv" v-if="wxMsg.role=='audience'">
            <span class="prompt">您现在还不是专家,请认真填写资料,免费成为专家</span>
            <span class="prompt2">红色星好标致为必填项</span>
          </div>
          <!-- 基本信息 -->
          <div class="basicMsg" v-if="wxMsg.role=='expert'">
            <div class="headImgBox">
              <img :src="wxMsg.headImg" class="headImg">
              <span class="mywxname">{{wxMsg.name}}</span>
              <span class="signature">{{wxMsg.signature}}</span>

            </div>
          </div>
          <!-- 修改信息 -->
          <div class="changeBox">
            <div class="tabTitleList" v-if="wxMsg.role=='expert'">
              <div class="l_tabTitleList">基本资料</div>
              <div class="r_tabTitleList"></div>
            </div>
            <div class="changeBoxContent">
              <div class="formBox">
                <div class="label">头像<span class="red">*</span></div>
                <form enctype="multipart/form-data" name="fileinfo" id="myForm">
                <div class="uploadImg">
                  
                  <label>
                    <div class="uploadIcon">
                      <img :src="takephoto" class="uploadIcon">
                    </div>
                    
                    
                    <input type="file" name="file" accept="image/png,image/jpeg,image/gif,image/jpg" limit="1" style="filter: alpha(opacity=0); opacity: 0; width:0; height:0;" @change="uploadImg($event)"/>
                    <input type="text" name="type" v-model="headphotos" value="headphotos" style="display:none">
                    
                    
                  </label>
                </div>
                <div class="btnList" v-if="btnList">
                  <div class="l_btnList">
                    <img src="static/images/close.png" class="btnIcon" @click="cancel">
                  </div>
                  <div class="r_btnList">
                    <img src="static/images/confirm.png" class="btnIcon" @click="submitForm($event)">
                  </div>
                    <!-- <button @click="submitForm($event)">提交</button> -->
                  </div>
                </form>
                <div class="label">专家名称<span class="red">*</span></div>
                <div class="expertName">
                  <input type="text" :disabled="able" class="expertNameInput" v-model="wxMsg.name">
                </div>

                <div class="label">个性签名</div>
                <div class="textareaRow">
                  <textarea class="textarea" rows="5" v-model="wxMsg.signature"></textarea>
                </div>
                
                <div class="label">擅长领域</div>
                <div class="textareaRow">
                  <textarea class="textarea" rows="5" v-model="wxMsg.field"></textarea>
                </div>
                <div class="label">自我介绍</div>
                <div class="textareaRow">
                  <textarea class="textarea" rows="5" v-model="wxMsg.introduction"></textarea>
                </div>
                <div class="saveBtn" @click="save">保存</div>
              </div>
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
import "../plugs/imgFileupload.js"
import FooterNav from '../components/FooterNav'
import BScroll from 'better-scroll'
import qs from 'qs'
export default {
  name: 'Index',
  components:{FooterNav,BScroll},
  data () {
    return {
      btnList:false,
      headphotos:"headphotos",
      takephoto:"",
      able:false,
      wxMsg:{
        name:"",
        headImg:"",
        userid:"",
        introd:"",
      },
      expertForm:{

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
        [
          {icon:"static/images/money.png",title:"我的余额",right:"static/images/right.png"},
          {icon:"static/images/money.png",title:"未结算收益",right:"static/images/right.png"}
        ],
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
    // this.wxMsg.name=window.localStorage.getItem('wx_username');
    // this.wxMsg.headImg=window.localStorage.getItem('wx_headImg');
    this.getBasicMsg();
    // this._getDiscList()
  },
  mounted(){
    // this.uploadImg();
  },
  methods:{
    // 取消
    cancel:function(){
      const that=this;
      that.takephoto="static/images/camera.png";
      that.btnList=false;
    },
    // 保存
    save:function(){
      const that=this;
      that.$axios.put('/apis/betting/users',{
        headphoto:that.takephoto,
        username:that.wxMsg.name,
        signature:that.wxMsg.signature,
        introduction:that.wxMsg.introduction,
        field:that.wxMsg.field
      })

    },
    // 获取基本信息
    getBasicMsg:function(){
      const that=this;
      that.$axios.get('/apis/betting/users/detail',{

      }).then(function(response){
        console.log("获取个人信息",response)
        that.wxMsg.name=response.data.data.username;//名称
        that.wxMsg.headImg=response.data.data.headphoto;//头像
        that.wxMsg.signature=response.data.data.signature;//个性签名
        // that.wxMsg._signature=response.data.data.signature;//可修改的个性签名
        that.wxMsg.field=response.data.data.field;//擅长领域
        that.wxMsg.introduction=response.data.data.introduction;//自我介绍
        that.wxMsg.role=response.data.data.role;//角色
        if(that.wxMsg.role=="audience"){
          that.takephoto="static/images/camera.png";
          that.able=false;
        }else{
          that.takephoto=that.wxMsg.headImg;
          that.able=true;
        }

      }).catch(function(response){

      })

    },
    submitForm:function(event){
      const that=this;
      event.preventDefault();
        let formData = new FormData();
        formData.append('file', that.file);
        formData.append('type', that.headphotos);
        console.log("打印formData",formData.get('file'))
        let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              },
              // data:{
              //   _id:window.localStorage.getItem('_id'),
              //   type:"headphotos"
              // }
            }

         if(that.file!=""){
          that.$axios.post('/apis/betting/files',formData,config
          )
          .then(function (response) {
            console.log("上传图片后接口返回参数",response);
            if(response.status==200){
              that.takephoto=response.data.data;
              that.btnList=false;
            }else{
              alert("上传头像失败")
            }
            
          })
          .catch(function (error) {
            console.log(error);
        });
     }

    },
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
   },
   uploadImg:function(obj){
     const that=this;
     const reader = new FileReader();
      that.file= obj.target.files[0]; 
      console.log("打印这个that.file对象",that.file);
      
      // 读取文件内容，结果用data:url的字符串形式表示
      reader.readAsDataURL(obj.target.files[0]);
      reader.onload = function(obj) {
          console.log("打印图片编码",obj.target.result);  // 上传的图片的编码
          that.takephoto=obj.target.result;
          that.btnList=true;
          // this.setState({
          //     previewPic: e.target.result
          // });
      }

     
   }
  }



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btnIcon{
  width: 20px;
  height: 20px;
}
.expertNameInput{

}
._expertNameInput{

}
.prompt{
  display: block;
  font-size: 16px;
}
.prompt2{
  display: block;
  font-size: 12px;
}
.promptDiv{
  /* border-left: 10 */
  background-color: rgb(0, 192, 234);
  padding-left: 20px;
  padding-right:20px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-left: 2px solid rgb(60,141,188);
  color: white;
  border-radius: 4px;
  margin-bottom: 20px;
}
.btnList{
  display: flex;
  /* align-items: center;
  justify-content: center; */
}
.l_btnList{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
}
.r_btnList{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;
}
.signature{
  display: block;
  text-align: center;
}
.mywxname{
  text-align: center;
  padding-top: 5px;
}
.headImg{
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
/* jq插件样式 */
/* .imgFileUploade .imgAll{
			width: 100%;    margin-top: 5px;
		}
		.imgFileUploade .imgAll ul:after{ 
				visibility: hidden;  display: block; font-size: 0; content: ".";  clear: both; height: 0
		} 
		.imgFileUploade .imgAll li{
			width: 100px;height: 100px;border:solid 1px #ccc;margin:8px 5px;float: left;position: relative;box-shadow: 0 0 10px #eee;
		}
		.imgFileUploade .imgAll li img{
			position: absolute;top:0;left:0;width: 100%;height: 100%;display: block;
		}
		.delImg{
			position: absolute;top:-10px;right:-7px;width: 22px;height: 22px;background: #000;border-radius: 50%;display: block;text-align:  center;line-height: 22px;color:#fff;font-weight: 700;font-style:normal;cursor: pointer;
		} */

/* jq插件样式END */
.saveBtn{
  width: 100%;
  height: 40px;
  color: white;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: #3c8dbc;
  margin-top: 20px;
}
label{
  display: flex;
  align-items: center;
  justify-content: center;
}
.uploadIcon{
  width: 50px;
  height: 50px;
}
.uploadImg{
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.headImgBox{
  display: flex;
  flex-direction: column;
  
}
.textareaRow{
  padding-right: 8px;
}
.textarea{
  width: 100%;
  /* min-width: 80px; */
  outline: none;
}
.label{
  font-size: 14px;
  font-weight: bold;
}
.red{
  color: red;
}
.changeBoxContent{
  padding: 8px;
}
.changeBox{
  margin-top: 20px;
  background-color: white;
}
.tabTitleList{
  display: flex;
  height: 35px;
  background-color: white;
}
.l_tabTitleList{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #eeeeee;
  border-top:4px solid rgb(60,141,188);
}
.r_tabTitleList{
  flex: 4;
  border-bottom: 1px solid #eeeeee;
}
.basicMsg{
  background-color: white;
  border-radius: 3px;
  min-height: 166px;
  border-top:4px solid rgb(60,141,188);
  display: flex;
  align-items: center;
  justify-content: center;
}
.formBox{
  background-color: white;
  border-radius: 3px;
  min-height: 166px;
  border-top:4px solid rgb(60,141,188);
}
.formContent{
  padding: 20px;
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
  background-color:rgb(60,141,188);
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
  background-color: #eeeeee;
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