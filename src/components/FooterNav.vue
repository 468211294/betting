<template>
  <div class="footerNavBox">
    <div class="footerNav" v-for="(item,index) in nav" :key="index" @click="skipNav(index)">
      <div class="footerNav_imgDiv">
        <img :src="item.state ? item.imgUrl : item._imgUrl" class="footerNavIcon">
      </div>
      <div class="footerNav_titleDiv">
        <span :class="item.state ? 'footerNavText':'_footerNavText'">{{item.label}}</span>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
      name: "FooterNav",
      props:['nav'],
      data:function(){
        return{

        }
      },
      created(){
        const that=this;
        that.nav[that.$store.state.thisIndex].state=true;
        console.log("打印这个底部导航数组",that.nav)
      },
      methods:{
        skipNav:function (e) {
          const that=this;
          if(that.nav[e].routerPath!=""){
            for(var i=0;i<that.nav.length;i++){
              that.nav[i].state=false
            }
            that.nav[e].state=true;
            that.$store.state.thisIndex=e;
            // that.print();
            that.skip(that.nav[e].routerPath);
          }else {
            globalAlert.show({
              type:"message",
              btnCount:1,
              content:"功能暂未开放,非常抱歉!"
            });
          }
        }
      }

    }
</script>

<style scoped>
  .footerNavBox{
    width: 100%;
    display: flex;
  }
  .footerNav{
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .footerNav_imgDiv{
    width: 100%;
    /* height: 50px; */
    display: flex;
    align-items: center;
    justify-content: center;

  }
  .footerNav_titleDiv{
    width: 100%;
    /* height: 38px; */
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .footerNavIcon{
    width: 30px;
    height: 30px;
  }
  .footerNavText{
    color: #02c6ab;
    font-size: 14px;
  }
  ._footerNavText{
    font-size: 14px;
  }

</style>