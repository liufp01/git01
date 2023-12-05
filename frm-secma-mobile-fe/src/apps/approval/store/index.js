/*
 * @Author: your name
 * @Date: 2020-03-26 15:22:30
 * @LastEditTime: 2020-04-20 09:46:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /产品定价2020_git/src/apps/companies_deposits/store/index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
//挂载Vuex
Vue.use(Vuex)
//创建VueX对象
// 备案
const store = new Vuex.Store({
    state: {
        // 备案基本信息
        baseRecordInfo: {},
        // 规则列表
        ruleList: [],
        // 公共附件
        commonFile: [],
        // 专项附件
        specialFile: [],
        // 流转记录
        approveList: [],
        // 意见记录
        recordList: [],
        // 审批选择
        selected: 0,
        // 审批意见
        message: '同意',
        // 页面滚动距离
        scrollTop: 0,
    },
    mutations: {}
});

export default store
