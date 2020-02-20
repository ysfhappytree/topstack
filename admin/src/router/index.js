import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'


import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

import Login from '../views/Login.vue'


Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:"登陆页",
    component:Login,
    meta:{ isPublic:true }
  },

  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      {
        path: '/categories/create',
        name: '新增分类',
        component: CategoryEdit
      },
      {
        path: '/categories/list',
        name: '分类列表',
        component: CategoryList
      },
      {
        path: '/categories/edit/:id',
        name: '分类编辑',
        component: CategoryEdit,
        props:true
      },
      
      {
        path: '/items/create/',
        name: '新增物品',
        component: ItemEdit,
        props:true
      },
      {
        path: '/items/edit/:id',
        name: '物品编辑',
        component: ItemEdit,
        props:true
      }, 
      {
        path: '/items/list',
        name: '物品列表',
        component: ItemList
      },

      {
        path: '/heros/create/',
        name: '新建英雄',
        component: HeroEdit,
        props:true
      },
      {
        path: '/heros/edit/:id',
        name: '英雄编辑',
        component: HeroEdit,
        props:true
      }, 
      {
        path: '/heros/list',
        name: '英雄列表',
        component: HeroList
      },

      {
        path: '/articles/create/',
        name: '新建文章',
        component: ArticleEdit,
        props:true
      },
      {
        path: '/articles/edit/:id',
        name: '文章编辑',
        component: ArticleEdit,
        props:true
      }, 
      {
        path: '/articles/list',
        name: '文章列表',
        component: ArticleList
      },

      {
        path: '/ads/create/',
        name: '新建广告位',
        component: AdEdit,
        props:true
      },
      {
        path: '/ads/edit/:id',
        name: '广告位编辑',
        component: AdEdit,
        props:true
      }, 
      {
        path: '/ads/list',
        name: '广告位列表',
        component: AdList
      },

      {
        path: '/admin_user/create/',
        name: '新增管理员',
        component: AdminUserEdit,
        props:true
      },
      {
        path: '/admin_user/edit/:id',
        name: '管理员管理',
        component: AdminUserEdit,
        props:true
      }, 
      {
        path: '/admin_user/list',
        name: '管理员列表',
        component: AdminUserList
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to,from,next)=>{
  if(!to.meta.isPublic && !localStorage.token){
    return next("/login")   
  }
  next()
})
export default router
