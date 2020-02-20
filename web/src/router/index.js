import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import Article from '../views/Article.vue'
import Hero from '../views/Hero.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    children:[
      {
        path:'/',
        name:"首页",
        component:Home
      },
      {
        path:'/articles/:id',
        name:"文章详情",
        component:Article,
        props:true
      }
    ]
  },
  {
    path:'/herodetail/:id',
    name:"英雄详情",
    component:Hero,
    props:true
  },
]

const router = new VueRouter({
  routes
})

export default router
