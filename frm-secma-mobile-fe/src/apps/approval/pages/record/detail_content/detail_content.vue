 <!--
 * @Author:liudan
 * @Date: 2022/03/18 15:59:22
 * @LastEditors:liufp
 * @LastEditTime: 2022/03/23 15:59:22
 * @Description:分配规则/分配结果详情页
 -->
<template>
  <div class="container">
    <van-collapse v-if="recordAddType == 'FTH'">  <!-- 非投行类型 -->
      <van-cell title="业务类型" :value="ruleDetail.busitypeName"></van-cell>
      <van-cell title="转出方" :value="ruleDetail.interpartyName"></van-cell>
      <van-cell title="转入方" :value="ruleDetail.targetorgName"></van-cell>
      <van-cell title="调整方式" :value="ruleDetail.adjadtypeEnumValue"></van-cell>
      <!-- <van-cell title="收入单据" :value="ruleDetail.incomebillno"></van-cell> -->
      <van-cell title="核算要素" :value="ruleDetail.factorName"></van-cell>
      <!-- <van-cell title="调整要素" :value="ruleDetail.factorInName"></van-cell>
      <van-cell title="费用分类" :value="ruleDetail.expenseTypeName"></van-cell>
      <van-cell title="业务角色" :value="ruleDetail.businessroleName"></van-cell>
      <van-cell title="产品名称" :value="ruleDetail.productname"></van-cell>
      <van-cell title="客户名称" :value="ruleDetail.custname"></van-cell>
      <van-cell title="合约名称" :value="ruleDetail.contractname"></van-cell>
      <van-cell title="项目名称" :value="ruleDetail.projectname"></van-cell>
      <van-cell title="币种" :value="ruleDetail.currencyName"></van-cell>
      <van-cell title="事项收入" :value="ruleDetail.totalmount"></van-cell> -->
      <van-cell title="调出比例" :value="ruleDetail.adjadratio"></van-cell>
      <van-cell title="调整金额" :value="ruleDetail.adjadmount"></van-cell>
      <van-cell title="调整期间(始)" :value="ruleDetail.adjperiod"></van-cell>
      <van-cell title="调整期间(止)" :value="ruleDetail.adjperiodend"></van-cell>
      <!-- <van-cell title="是否计入考核" :value="ruleDetail.isdassessEnumValue"></van-cell>
      <van-cell title="多计标识" :value="ruleDetail.isdcountEnumValue"></van-cell>
      <van-cell title="作废标识" :value="ruleDetail.disabledEnumValue"></van-cell> -->
      <van-cell title="备注" :value="ruleDetail.memo"></van-cell>
    </van-collapse>
    <van-collapse v-else-if="recordAddType == 'FXTTH'">    <!-- 非协同备案+投行类型 -->
      <van-cell title="业务类型" :value="ruleDetail.busitypeName"></van-cell>
      <van-cell title="转出方" :value="ruleDetail.interpartyName"></van-cell>
      <van-cell title="转入方" :value="ruleDetail.targetorgName"></van-cell>
      <van-cell title="调整方式" :value="ruleDetail.adjadtypeEnumValue"></van-cell>
      <!-- <van-cell title="收入单据" :value="ruleDetail.incomebillno"></van-cell> -->
      <van-cell title="核算要素" :value="ruleDetail.factorName"></van-cell>
      <!-- <van-cell title="调整要素" :value="ruleDetail.factorInName"></van-cell>
      <van-cell title="费用分类" :value="ruleDetail.expenseTypeName"></van-cell>
      <van-cell title="业务角色" :value="ruleDetail.businessroleName"></van-cell>
      <van-cell title="产品名称" :value="ruleDetail.productname"></van-cell>
      <van-cell title="客户名称" :value="ruleDetail.custname"></van-cell>
      <van-cell title="合约名称" :value="ruleDetail.contractname"></van-cell>-->
      <van-cell title="项目编码" :value="ruleDetail.projectcode"></van-cell>
      <van-cell title="项目名称" :value="ruleDetail.projectname"></van-cell>
      <!-- <van-cell title="币种" :value="ruleDetail.currencyName"></van-cell>
      <van-cell title="事项收入" :value="ruleDetail.totalmount"></van-cell> -->
      <van-cell title="调出比例" :value="ruleDetail.adjadratio"></van-cell>
      <van-cell title="调整金额" :value="ruleDetail.adjadmount"></van-cell>
      <van-cell title="调整期间(始)" :value="ruleDetail.adjperiod"></van-cell>
      <van-cell title="调整期间(止)" :value="ruleDetail.adjperiodend"></van-cell>
      <!-- <van-cell title="是否计入考核" :value="ruleDetail.isdassessEnumValue"></van-cell>
      <van-cell title="多计标识" :value="ruleDetail.isdcountEnumValue"></van-cell>
      <van-cell title="作废标识" :value="ruleDetail.disabledEnumValue"></van-cell> -->
      <van-cell title="备注" :value="ruleDetail.memo"></van-cell>
    </van-collapse>
    <van-collapse v-else-if="recordAddType == 'XTTH'">   <!-- 协同备案+投行类型 -->
      <van-cell title="业务类型" :value="ruleDetail.busitypeName"></van-cell>
      <van-cell title="转出方" :value="ruleDetail.interpartyName"></van-cell>
      <van-cell title="转入方" :value="ruleDetail.targetorgName"></van-cell>
      <van-cell title="中转方" :value="ruleDetail.transferName"></van-cell>
      <van-cell title="分成方式" :value="ruleDetail.shareMethodsEnumValue"></van-cell>
      <van-cell title="核算要素" :value="ruleDetail.factorName"></van-cell>
      <van-cell title="项目编码" :value="ruleDetail.projectcode"></van-cell>
      <van-cell title="项目名称" :value="ruleDetail.projectname"></van-cell>
      <van-cell title="调整期间(始)" :value="ruleDetail.adjperiod"></van-cell>
      <van-cell title="是否统算期" :value="ruleDetail.iscalculationdateEnumValue"></van-cell>
      <!-- <van-cell title="责任中心" :value="ruleDetail.costcenterName"></van-cell> -->
      <van-cell title="收入入账日期" :value="ruleDetail.incomeDate"></van-cell>
      <van-cell title="收入（元）" :value="ruleDetail.incomeje"></van-cell>
      <van-cell title="分销支出（元）" :value="ruleDetail.sectionPayment"></van-cell>
      <van-cell title="分成比例%" :value="ruleDetail.shareRatio"></van-cell>
      <van-cell title="分成规则" :value="ruleDetail.shareRules"></van-cell>
      <van-cell title="分成收入（元）" :value="ruleDetail.shareIncome"></van-cell>
      <van-cell title="第三方支出（元）" :value="ruleDetail.thirdPayment"></van-cell>
      <van-cell title="其他支出（元）" :value="ruleDetail.othersPayment"></van-cell>
      <van-cell title="分成净收入（元）" :value="ruleDetail.shareNetIncome"></van-cell>
      <van-cell title="新老办法（元）" :value="ruleDetail.new_old_methodsEnumValue"></van-cell>
      <van-cell title="投行分成支出（元）" :value="ruleDetail.thSharePayment"></van-cell>
      <van-cell v-if="isdisplayRole" title="转入方分入（元）" :value="ruleDetail.transferIncome"></van-cell>
      <van-cell title="立项时间" :value="ruleDetail.approvalDate"></van-cell>
      <van-cell title="签约时间" :value="ruleDetail.contractDate"></van-cell>
      <van-cell title="备案时间" :value="ruleDetail.recordDate"></van-cell>
      <van-cell title="备注" :value="ruleDetail.memo"></van-cell>
      <van-cell title="是否需说明附件" :value="ruleDetail.descriptionfile"></van-cell>
    </van-collapse>
  </div>
</template>
<script>

import Vue from "vue";
import {
  Cell,
  Collapse
} from "vant";
Vue.use(Collapse)
  .use(Cell)
export default {
  name: "detail_content",
  components: {},
  data() {
    return {
      ruleDetail: {
      },
      //备案新增类型：协同备案+投行类型为XTTH,非协同备案+投行类型为FXTTH,非投行类型为FTH
      recordAddType: "",
      //投行备案某些字段是否可见标识
      isdisplayRole:""
    };
  },
  props: {},
  created() {
    let data = this.$route.params.content;
    this.ruleDetail = data;
    this.recordAddType=localStorage.getItem("recordAddType");
    this.isdisplayRole=this.$route.params.isdisplayRole;
    //console.log("是否隐藏字段标识",this.isdisplayRole)
  },
  mounted() {
   
  },

  methods: {

  }
};
</script>

<style lang="scss" scoped>
 @import "./detail_content.scss";
</style>
