/*
 * @Author: your name
 * @Date: 2020-03-12 13:17:10
 * @LastEditTime: 2020-04-21 19:21:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /prodect_pricing/src/common/globalConfig.js
 */
import Vue from 'vue';
let global_config;
function GLOBAL(){};
GLOBAL.prototype.controllerId = "com.ifbpmob.cpdj.controller.CPDJCommonController";
GLOBAL.prototype.appid = "companies.deposits.yonyou.com";
let protocol = window.location.protocol;
//------------ma地址配置----------------------
// let ma_url = "10.4.122.26:8130"
// let ma_url = "10.15.0.105:8030" 
//let ma_url = "10.4.122.31:8130"
// let ma_url = window.location.host   //自动获取
let ma_url = "125.35.5.229:80"
//------------ma地址配置----------------------

//------------在线or离线----------------------
// GLOBAL.prototype.type = "online";
// GLOBAL.prototype.type = "offline";
GLOBAL.prototype.type = process.env.NODE_ENV=="development"?"online":"offline";
//------------在线or离线----------------------

GLOBAL.prototype.ma_url = protocol+"//"+ma_url;

//管会移动端公共配置
//审批时所有提交成功后调用蜂巢返回待办已办列表地址
//返回后刷新列表
GLOBAL.prototype.comit_url_fc="http://M0126.workflow.finish";
//返回后不刷新列表
GLOBAL.prototype.comitNotRefresh_url_fc="http://M0126.exit";
//蜂巢附件下载接口
GLOBAL.prototype.fileDownload_url_fc="http://M0126/fileDownload.do"
//管会项目编码
GLOBAL.prototype.GLKJBM="M0126";
//是否启用浪潮预算接口
GLOBAL.prototype.lcYusuanIflag=true;//启用
// GLOBAL.prototype.lcYusuanIflag=false;//不起用

global_config=new GLOBAL();
Vue.prototype.globalConfig = global_config;
export default global_config;
