<template>
  <div id="app" v-cloak>
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    this.saveUrl()
  },
  methods:{
    // 解决IOS,第一次进入时,url改变的问题
    saveUrl:function(){
      const u=navigator.userAgent;
      const isios=!!u.match(/\(i[^;]+;(u;)?CPU.+Mac OS X/);
      let firstUrl=localStorage.getItem('firstUrl');
      // if(isios){
        if(!!firstUrl){
        window.localStorage.removeItem("firstUrl");
        window.localStorage.setItem("firstUrl",window.location.href);
        }else{
          window.localStorage.setItem("firstUrl",window.location.href);
        }
      // }
    }
  }
}
</script>

<style>
[v-clock]{
  display: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
