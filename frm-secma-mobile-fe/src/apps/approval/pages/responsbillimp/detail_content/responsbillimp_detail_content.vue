<!--
* @Author:liufp
* @Date: 2023/09/11 14:49:52
* @LastEditors: 
* @LastEditTime: 2023/09/11 14:49:52
* @Description:分成责任单导入子表详情页
-->
<template>
  <div class="container">
    <van-collapse>
      <van-cell title="期间" :value="ruleDetail.period"></van-cell>
      <van-cell title="业务类型" :value="ruleDetail.busiTypeName"></van-cell>
      <van-cell title="要素" :value="ruleDetail.factorName"></van-cell>
      <van-cell title="责任中心" :value="ruleDetail.costcenterName"></van-cell>
      <van-cell title="金额" :value="regexHandleNum(ruleDetail.amount)"></van-cell>
      <van-cell title="币种" :value="ruleDetail.currencyName"></van-cell>
      <van-cell title="单据日期" :value="ruleDetail.billdate"></van-cell>
      <van-cell title="是否统算期" :value="ruleDetail.iscalculationdateEnumValue"></van-cell>
      <van-cell title="来源系统" :value="ruleDetail.srcsystemName"></van-cell>
      <van-cell title="来源单据" :value="ruleDetail.srcbill"></van-cell>   
      <van-cell title="调整类型" :value="ruleDetail.dimfree9Name"></van-cell>
      <van-cell title="非调整数据来源" :value="ruleDetail.dimfree10Name"></van-cell>
      <van-cell title="非调整启动状态" :value="ruleDetail.dimfree11"></van-cell>
      <van-cell title="是否双计" :value="ruleDetail.is_double_countEnumValue"></van-cell>
      <van-cell title="是否计入考核" :value="ruleDetail.assessmentEnumValue"></van-cell>
      <van-cell title="是否原子单据" :value="ruleDetail.is_atomicEnumValue"></van-cell>
    </van-collapse>
  </div>
</template>
<script>

import Vue from "vue";
import {
  Cell,
  Toast,
  Collapse
} from "vant";
Vue.use(Collapse)
  .use(Cell)
export default {
  name: "apportion_detail_content",
  components: {},
  data() {
    return {
      ruleDetail: {

      }
    };
  },
  props: {},
  created() {
    let data = this.$route.params.content;
    this.ruleDetail = data;
  },
  mounted() {
   
  },

  methods: {
    regexHandleNum(num){//金额字段格式化：添加千分符+保留8位小数
        if(num!=null){
            num=num.toFixed(8).toString().split(".");  // 保留8位小数并分隔小数点
            //num=num.toString().split(".");  // 分隔小数点
            var intNum=num[0];
            intNum=intNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            if(num[1]){  // 如果有小数的话添加小数部分
              intNum=intNum+"."+num[1];
            }
            return intNum;
        }
      }
  }
};
</script>

<style lang="scss" scoped>
 @import "../../record/detail_content/detail_content.scss";
</style>
