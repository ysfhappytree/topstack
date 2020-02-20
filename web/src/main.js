import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './assets/scss/sytle.scss'
import router from './router'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

import './assets/iconfont/iconfont.css'

import ListCard from "./components/ListCard";
import Card from './components/Card'
Vue.component("m-list-card", ListCard)
Vue.component("m-card", Card)

import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL:'http://localhost:3000/web/api'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
