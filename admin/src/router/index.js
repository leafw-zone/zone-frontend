import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/article',
    component: Layout,
    redirect: 'noredirect',
    name: '文章管理',
    meta: { title: '文章管理', icon: 'chart' },
    children: [
      {
        path: 'articleList',
        name: '所有文章',
        component: () => import('@/views/article/articleList'),
        meta: { title: '所有文章', icon: 'documentation' }
      },
      {
        path: 'edit',
        name: '写文章',
        component: () => import('@/views/article/edit'),
        meta: { title: '写文章', icon: 'documentation' }
      },
      {
        path: 'catagories',
        name: '分类目录',
        component: () => import('@/views/tree/index'),
        meta: { title: '分类目录', icon: 'documentation' }
      },
      {
        path: 'tags',
        name: '标签',
        component: () => import('@/views/tree/index'),
        meta: { title: '标签', icon: 'documentation' }
      }
    ]
  },

  {
    path: '/media',
    component: Layout,
    redirect: '/media/table',
    name: 'Media',
    meta: { title: '媒体', icon: 'guide' },
    children: [
      {
        path: 'media',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '媒体库', icon: 'component' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '添加', icon: 'tree' }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'todoList',
    meta: { title: '任务清单', icon: 'documentation' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '所有清单', icon: 'nested' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '任务管理', icon: 'lock' }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'propertyManager',
    meta: { title: '账务管理', icon: 'money' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '账单管理', icon: 'zip' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '账本导入', icon: 'excel' }
      }
    ]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '评论管理', icon: 'message' }
      }
    ]
  },

  {
    path: '/userManager',
    component: Layout,
    redirect: '/userManager/user',
    name: 'userManager',
    meta: { title: '用户管理', icon: 'peoples' },
    children: [
      {
        path: 'userinfo',
        name: 'Userinfo',
        component: () => import('@/views/userinfo/userinfo'),
        meta: { title: '用户', icon: 'peoples' }
      },
      {
        path: 'userlist',
        name: 'userlist',
        component: () => import('@/views/userlist/userlist'),
        meta: { title: '用户列表', icon: 'peoples' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

