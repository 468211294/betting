<template>
  <div class="content">
    <div class="scrollContent" ref="contentWrapper">
      <!-- 头部 -->
      <div class="header">
        <div class="l_header">
          <img src="static/images/goBack.png" class="goback" @click="goback">
        </div>
        <div class="m_header">{{resultArr[0].typeText}}走势图</div>
        <div class="r_header">
          <img src="static/images/no_collect.png" class="goback">
        </div>
      </div>
      <!-- 表格 -->
      <div class="table" ref="table">
        <!-- 表1 -->
        <div class="table1">
          <div class="table1_head">
            <div class="l_table1">
              期号
            </div>
            <div class="r_table1">
              开奖
            </div>
          </div>
          <div class="table1_list" v-for="(item,index) in resultArr ">
            <div class="l_table1_list">{{item.expect}}</div>
            <div class="r_table1_list">
              <div class="codeRow">
                <div class="ball">{{item._opencode[0]}}</div>
              </div>
              <div class="codeRow">
                <div class="ball">{{item._opencode[1]}}</div>
              </div>
              <div class="codeRow">
                <div class="ball">
                  {{item._opencode[2]}}
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <!-- 号码1 -->
        <div class="table2">
          <div class="table2_head">
            <div class="l_table2_head">号码1</div>
            <div class="r_table2_head">
              <div class="code">1</div>
              <div class="code">2</div>
              <div class="code">3</div>
              <div class="code">4</div>
              <div class="code">5</div>
              <div class="code">6</div>
            </div>
          </div>
          <div class="table2_list">
            <div class="table2_codeRow"  v-for="(item,index) in resultArr">
              <div v-for="(item2,index2) in aaa" class="defaultBox">
                <span class="falseCode" v-if="item2!=item.code1">{{item2}}</span>
                <div ref="a" class="trueCode" v-if="item2==item.code1">{{item2}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 号码2 -->
        <div class="table2">
          <div class="table2_head">
            <div class="l_table2_head">号码2</div>
            <div class="r_table2_head">
              <div class="code">1</div>
              <div class="code">2</div>
              <div class="code">3</div>
              <div class="code">4</div>
              <div class="code">5</div>
              <div class="code">6</div>
            </div>
          </div>
          <div class="table2_list">
            <div class="table2_codeRow"  v-for="(item,index) in resultArr">
              <div v-for="(item2,index2) in aaa" class="defaultBox">
                <span class="falseCode" v-if="item2!=item.code2">{{item2}}</span>
                <div ref="b" class="trueCode2" v-if="item2==item.code2">{{item2}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 号码3 -->
        <div class="table2">
          <div class="table2_head">
            <div class="l_table2_head">号码3</div>
            <div class="r_table2_head">
              <div class="code">1</div>
              <div class="code">2</div>
              <div class="code">3</div>
              <div class="code">4</div>
              <div class="code">5</div>
              <div class="code">6</div>
            </div>
          </div>
          <div class="table2_list">
            <div class="table2_codeRow"  v-for="(item,index) in resultArr">
              <div v-for="(item2,index2) in aaa" class="defaultBox">
                <span class="falseCode" v-if="item2!=item.code3">{{item2}}</span>
                <div ref="c" class="trueCode3" v-if="item2==item.code3">{{item2}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      page:0,
      limit:100,
      aaa:[1,2,3,4,5,6],
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
    const that=this;
    that.getData();
  },
  created() {
    const that=this;
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
        that.transformCode(result);
        console.log("打印结果",result);
        that.threeArr(result);
        that.$nextTick(function(){
          that.initCanvas()
        })

        }
      })
      .catch(function (error) {
        console.log(error);
      });
      
    },
    //  拆分数组
    transformCode:function(arr){
      const that=this;
      for(var i=0;i<arr.length;i++){
        arr[i].redCode=[];
        arr[i].blueCode=[];
        arr[i].code1=[];
        arr[i].code2=[];
        arr[i].code3=[];
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
    // 拆分1,2,3数组
    threeArr:function(arr){
      const that=this;
      console.log("拆分1,2,3")
      for(var i=0;i<arr.length;i++){
        arr[i].code1.push(arr[i]._opencode[0]);
        arr[i].code2.push(arr[i]._opencode[1]);
        arr[i].code3.push(arr[i]._opencode[2]);
        
      }
      console.log("再次打印数组",arr)
    },
    // 初始化canvas
    initCanvas:function(){
      const that=this;
      console.log("打印节点",that.$refs.table);
      console.log("打印节点高度",that.$refs.table.clientHeight);//获取表格高度
      console.log("打印节点高度",that.$refs.table.clientWidth);//获取表格宽度
      
    }
  }
  

    
  }



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.trueCode{
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: dodgerblue;
  display: flex;
  align-items: center;
  justify-content: center;
}
.trueCode2{
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color:brown;
  display: flex;
  align-items: center;
  justify-content: center;
}
.trueCode3{
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: dodgerblue;
  display: flex;
  align-items: center;
  justify-content: center;
}
.defaultBox{
  flex: 1;
  color: #eeeeee;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #eeeeee;
}
.table2_codeRow{
  display: flex;
}
.code{
  border-right: 1px solid #eee;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.l_table2_head{
  flex: 1;
  border: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
}
.r_table2_head{
  flex: 1;
  border: 1px solid #eee;
  display: flex;
}
.table2_head{
  display: flex;
  flex-direction: column;
  height: 36px;
}
.ball{
  background-color: red;
  color:white;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.table1_head{
  display: flex;
  height: 36px;
}
.codeRow{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #eee;

}
.l_table1_list{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #eee;
}
.r_table1_list{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.table1_list{
  display: flex;
  /* height: 25px; */

}
.table1{
 width: 150px;
}
.table2,
.table3,
.table4{
  width: 200px;
}
.l_table1{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #eee;
  
}
.r_table1{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #eee;
}
.table{
  display: flex;
}
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
  padding-right: 5px;
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