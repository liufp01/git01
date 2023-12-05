/*
 * @Author:ly
 * @Date: 2020-03-12 16:56:17
 * @LastEditTime: 2020-03-18 13:48:20
 * @LastEditors: Please set LastEditors
 * @Description: 入口文件
 * @FilePath: /prodect_pricing/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './route'
import store from './store/index'

import '@src/common/nativeHelper'
import {initUserInfo} from "@src/common/initUserInfo"
Vue.config.productionTip = false
// import Vuex from 'vuex';
// import store from "./store";
//解决低版本浏览器不兼容问题⬇
// import Es6Promise from 'es6-promise'
// require('es6-promise').polyfill();
import '@src/common/callHelper'
import 'vant/lib/index.css';
import '@src/common/style/public.css';
import './style/public.css';
import * as filters from '@src/common/filter'
import 'lib-flexible'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

initUserInfo().then(()=>{
	new Vue({
    render: h => h(App),
    router,
    store
  }).$mount('#app')
})
