/*
 * @Author: your name
 * @Date: 2020-03-26 13:48:51
 * @LastEditTime: 2020-04-29 14:27:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /产品定价2020_git/src/common/imitateLogin.js
 */
// 此文件用于本地调试时模拟登录获取用户信息
import axios from 'axios';
import {setCookieItem,getCookieItem} from './js/Storage';
let imitate = function () { }
imitate.prototype.getUserInfo = () => {
  return new Promise((resolve, reject) => {

    // 本地环境开发用到，其他接口请求一样 
    //let url ="http://10.29.195.199:80/frm-secma-approval-fe/approval/index.html?taskId=8d3f4bc3-af07-11ec-a01b-005056b786b6&formId=71d4ec9725e643c1b12cc438ee43a0f6&recordType=recordadd&appType=undoTask&proc_inst_id=8d3698fc-af07-11ec-a01b-005056b786b6&proc_def_id=eiap336891:23:989d830a-ae57-11ec-9321-005056b786b6&flag=0&sid=d4f543313fb05e09#/";
    // let url_pre="http://10.29.195.199:80/frm-secma-approval-fe/approval/index.html?taskId=&formId=6f524d049bd54f32a638e41fa152f3ad&recordType=recordadd&appType=partTask&proc_inst_id=1c40af8b-4b88-11ed-b74f-005056b786b6&proc_def_id=eiap144045:51:d4ec27a6-406e-11ed-9da1-005056b786b6";
    let url_pre="http://10.29.195.199:80/frm-secma-approval-fe/approval/index.html?taskId=75e8f0a6-51fd-11ee-9b2a-005056b786b6&formId=bec40fc6219c48c2bc9a87139bf757f8&recordType=responsbillimp&appType=undoTask&proc_inst_id=75d51b5d-51fd-11ee-9b2a-005056b786b6&proc_def_id=eiap279409:12:985c4674-47de-11ee-a2a7-005056b786b6&flag=0";
    let url =url_pre+"&sid=d4f543313fb05e09#/";

    //正式环境单据
    // let url_pre="http://10.29.138.98:80/frm-secma-approval-fe/approval/index.html?taskId=a1b656aa-9a08-11ec-ab6e-005056a3f4e4&formId=4806d380edfe4e35a52e03167c87ad1f&recordType=recordadd&appType=doneTask&proc_inst_id=d245611d-99e7-11ec-ab6e-005056a3f4e4&proc_def_id=eiap332497:16:dc73a8c6-9847-11ec-ab6e-005056a3f4e4";
    // let url =url_pre+"&sid=d4f543313fb05e09#/";


    // 打包发布到手机上用到，其他接口请求一样
    //let url = window.location.href;
    let detailInfo = url.split('?')[1].split('&');
    let taskId = '';
    let recordId = '';
    let recordType = '';
    let sid = '';
    if (detailInfo.length > 0) {
      localStorage.setItem("msgId", "");//每次加载页面先将msgId置为空防止受之前单据影响
      localStorage.setItem("flag", "0");//每次加载页面先将flag置为0防止受之前单据影响
      detailInfo.forEach(item => {
        let key = item.split('=')[0];
        let val = item.split('=')[1];
        switch (key) {
          case "taskId":
            taskId = val;
            localStorage.setItem("taskId", taskId);
            break;
          case "formId":
            recordId = val;
            localStorage.setItem("recordId", recordId);
            break;
          case "recordType"://业务功能编码
            recordType = val;
            localStorage.setItem("recordType", recordType);
            if(recordType.includes('apportion')){//processType流程类型  apportion：分摊调整单  record：备案类流程 responsbillimp:分成责任单导入
              localStorage.setItem("processType", "apportion");
            }else if(recordType.includes('responsbillimp')){
              localStorage.setItem("processType", "responsbillimp");
            }else {
              localStorage.setItem("processType", "record");
            }
            break;
          case "sid":
            sid = val.split('#')[0];
            localStorage.setItem("sid", sid);
            break;
          case "appType"://我的发起：partTask   待办：undoTask  已办：doneTask  待阅：unReadTask 已阅：ReadTask
            localStorage.setItem("appType", val);
            break;
          case "proc_inst_id":
            localStorage.setItem("processInstanceId", val);
            break;
          case "proc_def_id":
            localStorage.setItem("processDefinitionId", val);
            break;
          case "msgId"://待阅已阅页面用于标识更新阅读状态
            localStorage.setItem("msgId", val);
            break;
          case "flag"://是否隐藏审批意见模块及审批按钮  1隐藏 0不隐藏
            localStorage.setItem("isShowFlag", val);
            break;
          default:
            break;
        }
      })
    }
    //let cookie = localStorage.getItem('cookie');
    let cookie =getCookieItem('cookie');
    if (!cookie) {
      // 本地环境开发用到，其他接口请求一样
      axios.get(process.env.API_ROOT+`/wbalone/uas/ticket/auth?ticket=${sid}`).then(res => {
      // 打包发布到手机上用到，其他接口请求一样
      //axios.get(`/wbalone/uas/ticket/auth?ticket=${sid}`).then(res => {
        res.data.data.forEach((item, index) => {
          if (index == 0) {
            cookie = item.name + '=' + item.value;
          } else {
            cookie = cookie + ';' + item.name + '=' + item.value
          }
        })
        resolve(cookie+';');
        //localStorage.setItem('cookie', cookie + ';');
        setCookieItem('cookie', cookie + ';',1800000);//1000*60*30=1800000 为30分钟
      }).catch(err => {
        console.log('获取cookie失败',err)
        window.location.href = this.globalConfig.comitNotRefresh_url_fc
      })
    }else{
      resolve(cookie+';');
    }
  })
}
const imitateLogin = new imitate();
export default imitateLogin;
