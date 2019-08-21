import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state={
  thisIndex:0,//底部导航状态
  type:""//首页点击彩票类型进入详情
}

export default new Vuex.Store({
  state
})