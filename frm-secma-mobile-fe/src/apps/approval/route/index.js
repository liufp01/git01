import Vue from 'vue';
import recordDetail from '../pages/record/detail/recordDetail'
import detailListPage from '../pages/common/detail_list/detail_list'
import detailContentPage from '../pages/record/detail_content/detail_content'

import approveFlowPage from '../pages/common/approve_flow/approval_flow'
import previewPage from '../pages/common/preview/preview'
import fileList from '../pages/common/file_list/file_list'

import apportionDetail from '../pages/apportion/detail/apportionDetail'
import apportionDetailContentPage from '../pages/apportion/detail_content/apportion_detail_content'

import responsbillimpDetail from '../pages/responsbillimp/detail/responsbillimpDetail'
import responsbillimpDetailContentPage from '../pages/responsbillimp/detail_content/responsbillimp_detail_content'

import VueRouter from "vue-router";
Vue.use(VueRouter);
let mainRouter = new VueRouter({
    //mode:'history',//默认为hash模式  history请求地址后面不带#/但需要配合后台或nginx配置才可解决舒心报404问题
    routes: [ 
      //备案相关路由
      {// 备案详情页
        path: '/',
        name: 'record_detail',
        component: recordDetail,
        meta:{isAuth:true,
              keepAlive:true}   //meta可配置元数据，供程序员后面使用 类似params及query
      },
      {// 规则列表页
        path: '/detail_list',
        name: 'detail_list',
        component: detailListPage,
        meta:{keepAlive:true}  //keepAlive:true 表示保持该路由的状态
      },
      {// 规则详情页
        path: '/detail_content',
        name: 'detail_content',
        component: detailContentPage,
      },

      // 成本分摊相关路由
      {
        path: '/apportion_detail',
        name: 'apportion_detail',
        component: apportionDetail,
        meta:{isAuth:true,
          keepAlive:true} 
      },
      {
        path: '/apportion_detail_content',
        name: 'apportion_detail_content',
        component: apportionDetailContentPage,
      },

      // 分成责任单导入相关路由
      {
        path: '/responsbillimp_detail',
        name: 'responsbillimp_detail',
        component: responsbillimpDetail,
        meta:{isAuth:true,
          keepAlive:true} 
      },
      {
        path: '/responsbillimp_detail_content',
        name: 'responsbillimp_detail_content',
        component: responsbillimpDetailContentPage,
      },
      
      //公共路由
      {// 附件列表页
        path: '/file_list',
        name: 'file_list',
        component: fileList,
      },
      {// 流转/意见记录页
        path: '/approve_flow',
        name: 'approve_flow',
        component: approveFlowPage,
      },
      {// 预览页 暂时未用
        path: '/preview',
        name: 'preview',
        component: previewPage,
      },

    ]
  })

//全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
  mainRouter.beforeEach((to,from,next)=>{
    if(to.meta.isAuth){ //判断是否需要鉴权
      if(localStorage.getItem('processType') =='apportion' &&to.path==='/'){
        next({path:'/apportion_detail'})  
      }else if(localStorage.getItem('processType') =='responsbillimp' &&to.path==='/'){
        next({path:'/responsbillimp_detail'}) 
      }else{
        next()
      }
    }else{
      next()
    }
  })

//全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
// mainRouter.afterEach((to,from)=>{
// })
export  default  mainRouter;
