import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import index from '@/pages/index'
import expert from '@/pages/expert'
import expertRecommend from '@/pages/expertRecommend'
import lastestRecommend from '@/pages/lastestRecommend'
import channelRecommend from '@/pages/channelRecommend'
import center from '@/pages/center'
import collect from '@/pages/collect'
import openDetail from '@/pages/openDetail'
import article from '@/pages/article'
import expertArticle from '@/pages/expertArticle'
import table from '@/pages/table'
import expertMsg from '@/pages/expertMsg'

Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        isShare: true
      }
    },
    {
      path: '/expert',//专家大全
      name: 'expert',
      component: expert,
      meta: {
        isShare: true
      }
    },
    {
      path: '/expertRecommend',//专家推荐
      name: 'expert',
      component: expertRecommend,
      meta: {
        isShare: true
      }
    },
    {
      path: '/lastestRecommend',//最新推荐
      name: 'expert',
      component: lastestRecommend,
      meta: {
        isShare: true
      }
    },
    {
      path: '/channelRecommend',//频道推荐
      name: 'channelRecommend',
      component: channelRecommend,
      meta: {
        isShare: true
      }
    },
    {
      path: '/center',//个人中心
      name: 'center',
      component: center,
      meta: {
        isShare: true
      }
    },
    {
      path: '/collect',//我的收藏
      name: 'collect',
      component: collect,
      meta: {
        isShare: true
      }
    },
    {
      path: '/openDetail',//开奖详情
      name: 'openDetail',
      component: openDetail,
      meta: {
        isShare: true
      }
    },
    {
      path: '/article',//文章内容
      name: 'article',
      component: article,
      meta: {
        isShare: true
      }
    },
    {
      path: '/expertArticle',//专家文章
      name: 'expertArticle',
      component: expertArticle,
      meta: {
        isShare: true
      }
    },
    {
      path: '/table',//走势图
      name: 'table',
      component: table,
      meta: {
        isShare: true
      }
    },
    {
      path: '/expertMsg',//专家资料
      name: 'expertMsg',
      component: expertMsg,
      meta: {
        isShare: true
      }
    }
  ]
})


