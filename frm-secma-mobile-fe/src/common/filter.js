/*
 * @Author: ly
 * @Date: 2020-04-16 16:23:38
 * @LastEditTime: 2020-04-26 09:34:19
 * @LastEditors: Please set LastEditors
 * @Description: 过滤器
 * @FilePath: /产品定价2020_git/src/common/filter.js
 */
// 最大不超过6个字符
const textFilter_6 = value => {
    if(value&&value.length>6){
        return value.slice(0,6)+"...";
    } 
    else{
        return value;
    }
}
const textFilter_time_1 = value => {
    if(value){
        return value.slice(0,19)
    }
}

export {
    textFilter_6,
    textFilter_time_1
}