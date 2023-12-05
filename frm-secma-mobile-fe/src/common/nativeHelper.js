/*
 * @Author: ly
 * @Date: 2020-03-13 10:28:38
 * @LastEditTime: 2020-04-28 11:11:02
 * @LastEditors: Please set LastEditors
 * @Description: 调原生功能方法
 * 示例：this.callNative.useCamera((response)=>{
          console.log(response)
        })
 * @FilePath: /prodect_pricing/src/common/nativeHelper.js
 */
import Vue from 'vue';
import global_config from "./globalConfig"
const setupWebViewJavascriptBridge = function(callback) {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge);
      }
      if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
      }
      window.WVJBCallbacks = [callback];
      var WVJBIframe = document.createElement("iframe");
      WVJBIframe.style.display = "none";
      WVJBIframe.src = "wvjbscheme://__BRIDGE_LOADED__";
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function() {
        document.documentElement.removeChild(WVJBIframe);
      }, 0);
    } else if (/(Android)/i.test(navigator.userAgent)) {
      // 这是Android
      if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge);
      } else {
        document.addEventListener(
          "WebViewJavascriptBridgeReady",
          function() {
            callback(WebViewJavascriptBridge);
          },
          false
        );
      }
    } else {
      //PC
    }
};
const callNative = function(type, json, callback) {
    setupWebViewJavascriptBridge(function(bridge) {
      bridge.callHandler(type, json, function(responseData) {
        if(typeof responseData == "string"){
          responseData = JSON.parse(responseData)
        }
        callback(responseData);
      });
    });
};
class CALLNATIVE{
    constructor(name){
        
    }
    // ----------------------获取用户信息方法---------------------------
    gerUserInfo(response){
        const params = {
            "params" : {
                "transtype" : "user_info"
            }
        }
        callNative("gotoNative", params, function(res){
            //console.log(res)
            response(res)
        });
    }
    // ----------------------通过原生调接口方法-------------------------
    callServer(data,response){
        const params = {
            "params" : {
                "transtype":"call_ma",
                "appid":global_config.appid,
                "controller":global_config.controllerId,
                "params":data         
            }
        }
        callNative("gotoNative", params, function(res){
            response(res)
        });
    }
    // ----------------------调相机方法---------------------------
    useCamera(response){
        const params = {
            "params" : {
                "transtype" : "use_camera"
            }
        }
        callNative("gotoNative", params, function(res){
            response(res)
        });
    }
    // ----------------------调相册方法---------------------------
    useAlbum(response){
        const params = {
            "params" : {
                "transtype" : "use_album"
            }
        }
        callNative("gotoNative", params, function(res){
            response(res)
        });
    }
    // ----------------------关闭应用方法---------------------------
    exitBack(){
        const params = {
            "params" : {
                "transtype" : "exit_back"
            }
        }
        callNative("gotoNative", params);
        console.log("调用原生-退出应用")
    }
    // ----------------------扫一扫方法---------------------------
    useScan(){
        const params = {
            "params" : {
                "transtype" : "use_scanner"
            }
        }
        callNative("gotoNative", params,function(res){
            response(res)
        });
    }
    // ----------------------高德地图定位方法---------------------------
    getPosition(){
        const params = {
            "params" : {
                "transtype" : "get_position"
            }
        }
        callNative("gotoNative", params,function(res){
            response(res)
        });
    }
}
let call_native = new CALLNATIVE();
Vue.prototype.callNative = call_native;
