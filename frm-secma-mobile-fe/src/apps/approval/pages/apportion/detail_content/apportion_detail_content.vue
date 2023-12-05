<!--
* @Author:liufp
* @Date: 2022/04/06 14:51:54
* @LastEditors: 
* @LastEditTime: 2022/04/06 14:51:54
* @Description:调整单子表详情页
-->
<template>
  <div class="container">
    <van-collapse>
      <!-- <van-cell title="调整类型" :value="ruleDetail.adjustTypeEnumValue"></van-cell>
      <van-cell title="责任单据" :value="ruleDetail.billno"></van-cell> -->
      <van-cell title="业务类型" :value="ruleDetail.busiTypeName"></van-cell>
      <van-cell title="转入方" :value="ruleDetail.costCenterName"></van-cell>
      <van-cell title="转出方" :value="ruleDetail.sourceOrgName"></van-cell>
      <!-- <van-cell title="责任组织" :value="ruleDetail.costCenterName"></van-cell> -->
      <van-cell title="要素" :value="ruleDetail.factorName"></van-cell>
      <van-cell title="费用分类" :value="ruleDetail.expenseTypeName"></van-cell>
      
      <van-cell v-if="ruleDetail.isproduct=='Y'" title="产品" :value="ruleDetail.productName"></van-cell>
      <van-cell v-if="ruleDetail.isproject=='Y'" title="项目" :value="ruleDetail.projectName"></van-cell>
      <van-cell v-if="ruleDetail.iscontract=='Y'" title="合约" :value="ruleDetail.contractName"></van-cell>
      <van-cell v-if="ruleDetail.isfundacc=='Y'" title="资金账号" :value="ruleDetail.fundacc"></van-cell>
      <van-cell v-if="ruleDetail.iscust=='Y'" title="客户" :value="ruleDetail.custbaseName"></van-cell>
      <van-cell v-if="ruleDetail.ispsn=='Y'" title="人员" :value="ruleDetail.psnName"></van-cell>
      <van-cell v-if="ruleDetail.ischannel=='Y'" title="渠道" :value="ruleDetail.channelName"></van-cell>
      <van-cell v-if="ruleDetail.isbline=='Y'" title="业务条线" :value="ruleDetail.blineName"></van-cell>

      <van-cell title="调整金额" :value="ruleDetail.amount"></van-cell>
      <!-- <van-cell title="币种" :value="ruleDetail.currencyName"></van-cell>
      <van-cell title="是否计入考核" :value="ruleDetail.assessmentEnumValue"></van-cell> -->
      <van-cell title="备注" :value="ruleDetail.remark"></van-cell>
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
    //console.log("content", data)
    this.ruleDetail = data;
  },
  mounted() {
   
  },

  methods: {

  }
};
</script>

<style lang="scss" scoped>
 @import "../../record/detail_content/detail_content.scss";
</style>
