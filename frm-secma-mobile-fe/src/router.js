import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
//========================= 动态调整区域
import index from './router/personal_deposits/index'

//=========================
export default new Router({
  routes: index
})
