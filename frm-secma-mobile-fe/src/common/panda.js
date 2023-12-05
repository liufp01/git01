/*
 * @Author: your name
 * @Date: 2020-03-12 13:17:10
 * @LastEditTime: 2020-03-13 14:03:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /prodect_pricing/src/common/panda.js
 */
import { isArray } from "util";
// import { promises } from "fs";
//tools
let panda;
function helper(){};

helper.prototype.searchData = ()=>{
    let q={};
    location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);q;
    return q;
};
helper.prototype.judgeOs = (()=>{
    let ua=navigator.userAgent.toLowerCase();
    if (ua.match(/iPhone\sOS/i) == "iphone os") {
        helper.prototype.osType = "ios";
    } else {
        helper.prototype.osType = "android";
    }
})();

helper.prototype.getStamp = ()=>{
    return Date.parse(new Date());
}

helper.prototype.getTime = (form,stamp)=>{
    stamp = new Date();
    console.log(stamp)
    var year=stamp.getFullYear(); 
    var month=stamp.getMonth()+1; 
    var date=stamp.getDate(); 
    var hour=stamp.getHours(); 
    var minute=stamp.getMinutes(); 
    var second=stamp.getSeconds(); 
    if(form=="y-m-d"){
        return year+"-"+month+"-"+date;
    }
}

// 时间格式化
helper.prototype.formatTime = (d, format)=>{
    const date = new Date(d);
    const year = date.getFullYear();
    const month = panda.p(date.getMonth() + 1);
    const day = panda.p(date.getDate());
    const hour = panda.p(date.getHours());
    const minute = panda.p(date.getMinutes());
    const second = panda.p(date.getSeconds());
    if(format == 'yyyy-MM-dd'){
        return year+"-"+month+"-"+day;
    }else if(format == 'yyyy-MM-dd HH:mm:ss'){
        return year+"-"+month+"-"+day+' '+hour+":"+minute+":"+second;
    }else if(format == 'HH:mm:ss'){
        return hour+":"+minute+":"+second;
    }
}

helper.prototype.p = (s)=>{
    return s < 10 ? '0' + s : s
}
helper.prototype.judgeObj = (res)=>{
    if(Object.keys(res).length==0){
        return false;
    }else{
        return true;
    }
}

export default panda = new helper();
// (()=>{
//     $(document).on("blur","input,textarea",function(){
//         window.scroll(0, 0);
//         window.innerHeight = window.outerHeight = document.documentElement.clientHeight;
//     });
// })();
// if(panda.osType=="android"){
//     $(document).on('click',".fieldAmount,input,textarea,.textAreaDiv",function(event){
       
//       let topScroll = $(this).parents(".mainContainer")[0].scrollTop;
//       setTimeout(() => {
//         $(".mainContainer").css({"padding-bottom":190+'px'});
//         $(".mainContainer").animate({scrollTop:topScroll+135}, 200);
//       }, 100);
//     })
//     $(document).on('blur',"input,textarea",function(event){
//       // $(".mainContainer").animate({scrollTop:0}, 100);
//       $(".mainContainer").css({"padding-bottom":0});
//     })
//     $(document).bind('keyup','input',function(event) {
//         if (event.keyCode == "13") {
//             //回车执行查询
//           $(this).blur();
//         }
//     });
//   }
