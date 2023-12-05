/*
 * @Author: ly
 * @Date: 2019-04-07 13:43:25
 * @LastEditTime: 2020-05-28 14:14:17
 * @LastEditors: Please set LastEditors
 * @Description: 发送请求功能，在线使用axios，离线使用原生发送，集成的项目使用在线的。修改globalConfig状态即可
 * @FilePath: /prodect_pricing/src/common/callHelper.js
 */
import axios from "axios";
import Vue from 'vue';
import {getCookieItem} from './js/Storage';

const callHelper = (ev,options)=>{
    
    return new Promise((resolve,reject)=>{
        if(ev.options&&ev.options.loading===true){
            Vue.prototype.$showLoading({text:"加载中"})
        }
        let taskId = localStorage.getItem("taskId");
        let recordId = localStorage.getItem("recordId");
        let recordType = localStorage.getItem("recordType");
        let params = `taskId=${taskId}&recordId=${recordId}&recordType=${recordType}`
        // 解决移动端第一次进入详情页获取不到cookie的情况
        //let userToken = localStorage.getItem('cookie') || Vue.prototype.userInfo;
        let userToken = getCookieItem('cookie') || Vue.prototype.userInfo;
       //请求是携带用户信息用于查询用户权限 liufp 20221010
        if (Vue.prototype.userInfo.length > 0) {
            let userInfo_=Vue.prototype.userInfo.split(";");
            userInfo_.forEach(item => {
              let key = item.split('=')[0];
              let val = item.split('=')[1];
              switch (key) {
                case "_A_P_userLoginName":
                  params=params+`&userCode=${val}`;
                  break;
                }
            })
        }

        if(ev.params.jsonData) {
            // 本地环境开发用到，其他接口请求一样            
            axios.post(process.env.API_ROOT+`${ev.params.url}`, ev.params.jsonData, {
            // // 打包发布到手机上用到，其他接口请求一样
            // axios.post(`${ev.params.url}`, ev.params.jsonData, {
                headers: {
                    "Authority": userToken,
                }
            }).then(res => {
                resolve(res)
            });
        } else {
            if(userToken) {
                // 本地环境开发用到，其他接口请求一样 
                axios.get(process.env.API_ROOT+`${ev.params.url}`+`${params}`, { 
                // 打包发布到手机上用到，其他接口请求一样
                // axios.get(`${ev.params.url}`+`${params}`, { 
                    headers: {
                        "Authority": userToken
                    }
                }).then(res => {
                    //console.log("res===", res)
                    resolve(res.data);
                }).catch(err => {
                    console.log("用户信息失效，请退出重试")
                    localStorage.removeItem('cookie');
                    window.location.reload();
                });
            }else {
                alert("登录失效，请退出重试")
                    //window.location.reload();
            }
        }
    })
}
Vue.prototype.callService = callHelper;
