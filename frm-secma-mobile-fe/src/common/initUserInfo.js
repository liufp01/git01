/*
 * @Author: your name
 * @Date: 2019-09-27 09:19:31
 * @LastEditTime: 2020-04-28 11:16:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /prodect_pricing/src/common/initUserInfo.js
 */
import Vue from 'vue'
import global_config from "./globalConfig"
import imitateLogin from './imitateLogin'
//配置项检测:
// if(!global_config.ma_url){
//     console.error("配置项缺失:请在globalConfig.js中配置ma_url值");
// }
if(!global_config.type){
    console.error("配置项缺失:请在globalConfig.js中配置type值");
}
export const initUserInfo = (ev)=>{
    return new Promise((resolve,reject)=>{
        imitateLogin.getUserInfo().then((res)=>{
            Vue.prototype.userInfo = res;
            resolve(res)
        }).catch(err => {
            alert("获取用户信息失败!")
        })
    })
}
