import Vue from 'vue'
import Router from 'vue-router'
import page1 from '@/components/page1'
import home from '@/views/home/home'
import article from '@/views/article/article'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/page1',
      name: 'page1',
      component: page1
    },
    {
      path: '/article',
      name: 'article',
      component: article
    }
  ]
})
