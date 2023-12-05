<!--
* @Author:liufp
* @Date: 2023/09/11 14:49:52
* @LastEditors: 
* @LastEditTime: 2023/09/11 14:49:52
* @Description:分成责任单导入待办已办详情页
-->
<template>
  <!--已提交详情页-->
  <div class="container" id="container">
    <div class="title-container">
      <div class="title">分成责任单导入{{ dataDetail.bill_code }}</div>
      <div class="meeting">
        <span >分成责任单导入</span>
        <!-- <span>{{ dataDetail.createTime && dataDetail.createTime.substring(0,19) }}</span> -->
        <span>{{ dataDetail.createTime && dataDetail.createTime.split(/[ ]+/)[0] }}</span>
      </div>
    </div>

    <!-- 基本信息 -->
    <div class="baseInfo-container">
      <div class="baseInfo">
        <div class="flagColor"></div>
        <span class="name">基本信息</span>
      </div>
      <van-collapse>
        <!-- 表单字段 -->
        <van-cell title="事项名称:" :value="dataDetail.bill_name"></van-cell>
        <van-cell title="事项编码:" :value="dataDetail.bill_code"></van-cell>
        <van-cell title="发起人:" :value="dataDetail.bill_people_name"></van-cell>
        <van-cell title="发起日期:" :value="dataDetail.bill_date"></van-cell>
        <van-cell class="last-commom" title="事项内容概述:" :value="dataDetail.bill_memo"></van-cell>
      </van-collapse>
    </div>

    <!-- 调整单子表 -->
    <InternalList
        :ruleList="ruleList"
    />

    <!-- 意见记录 -->
    <OptionRecord
        :recordList="recordList"
        :approveList="approveList"
    />

    <!-- 审批意见 -->
    <OpinionApproval v-if="isShowFlag=='0' && billType!='unReadTask' && billType!='ReadTask'"
      :billType="billType"
      :taskId="taskId"
      :processInstanceId="processInstanceId"
      :processDefinitionId="processDefinitionId"
      :billId="billId"
    />

    <!-- 不显示审批意见模块及审批按钮时的提示信息 -->
    <DisplayInfo v-if="isShowFlag == '1'"/>

  </div>
</template>

<script>
import OptionRecord from '../../../components/detail/OptionRecord'
import OpinionApproval from '../../../components/detail/OpinionApproval'
import InternalList from '../../../components/detail/InternalList'
import DisplayInfo from '../../../components/detail/DisplayInfo'
import Vue from "vue";
import { Field,  Collapse, Cell, Toast, Loading, Overlay } from "vant";
Vue.use(Field).use(Toast).use(Collapse).use(Cell).use(Loading).use(Overlay);
export default {
  name: "apportionDetail",
  components:{OptionRecord,OpinionApproval,InternalList,DisplayInfo},
  data() {
    return {
      // taskId
      taskId: "",
      // 单据id
      billId: "",
      processInstanceId: "",
      processDefinitionId: "",
      // 详情的基本信息
      dataDetail: {},
      // 调整单子表记录
      ruleList: [],
      // 流转记录
      approveList: [],
      //意见记录
      recordList: [],
      // 单据类型
      billType: '',
      //待阅消息ID
      msgId: '',
      //是否隐藏审批意见模块及审批按钮标记  1隐藏 0不隐藏
      isShowFlag: '',
    };
  },
  created() {
    this.taskId = localStorage.getItem("taskId");
    this.isShowFlag = localStorage.getItem("isShowFlag");
    // 获取基本信息及规则列表
    this.callService({
      params: {
        url: "/frm-secma-ise/mobile/approvalbpm/getRecord?",
      },
    }).then((res) => {
      if (res.success == "success") {
        //console.log("getRecord返回值调整单",res)
        this.dataDetail = res.detailMsg.data.record;
        this.ruleList = res.detailMsg.data.child;
        this.billId = res.detailMsg.data.record.id;
        this.processInstanceId = localStorage.getItem("processInstanceId") || res.detailMsg.data.processInstanceId;
        this.processDefinitionId = localStorage.getItem("processDefinitionId") || res.detailMsg.data.processDefinitionId;


        // 获取意见/流转记录
        this.callService({
          params: {
            url: "/frm-secma-ise/mobile/approvalbpm/hisTasklist",
            jsonData: {
              billId: this.billId,
              processDefinitionId: this.processDefinitionId,
              processInstanceId: this.processInstanceId,
            },
          },
        }).then((res) => {
          if (res.data.statusCode == 200) {
            //this.approveList = res.data.data.list;
            let approveList_=res.data.data.list;
            let zhList_ = res.data.data.zhlist;
            this.approveList=zhList_.length>0?approveList_.concat(zhList_):approveList_;
            let recordArr = JSON.parse(JSON.stringify(approveList_));
            // 删除第一项提交人
            recordArr.splice(0, 1);
            // //最后一个节点如果还未审批则去除掉
            //去除还未审批的人员记录
            this.recordList= recordArr.filter((item,i)=>{
              if(item.deleteReason && !item.deleteReason.includes('流程已终止')){
                return item
              }
            })
            this.recordList.reverse();//倒序
          }
        });

        //将待阅消息状态更新为已阅
        if(this.billType=="unReadTask"){
          this.callService({
            params: {
              url: "/frm-secma-ise/mobile/approvalbpm/messageRead",
              jsonData: {
                msgId: this.msgId,
              },
            },
          }).then((res) => {
            if (res.data.statusCode == 200) {
            }else{
              console.log("待阅消息状态更新失败，消息id为："+this.msgId )
            }
          });
        }



      } else {
        Toast(res.message);
      }
    });
  },
  // beforeDestroy(){
  //   console.log("即将被销毁")
  // },
  mounted(){
    this.billType = localStorage.getItem('appType') || '';
    this.msgId = localStorage.getItem('msgId') || '';
    this.$nextTick(function () {
      // 滚动监听事件
      window.addEventListener('scroll', this.scrollMonitor, true);
    });
  },
  activated(){
      // 让页面滚动到指定位置
      let containerDOM = document.getElementById('container');
      containerDOM.scrollTo(0, this.$store.state.scrollTop);
  },
  destroyed() {
    // 移除滚动监听事件
    window.removeEventListener('scroll', this.scrollMonitor, true);
  },
  methods: {
    toPhone() {
      window.location.href = `tel://${this.dataDetail.phone}`;
    },
    // 页面滚动事件监听
    scrollMonitor(e) {
      // 记录页面滚动位置
      this.$store.state.scrollTop = e.target.scrollTop;
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../../../../common/css/commonCss';
.container {
  width: 100vw;
  height: 100vh;
  background: rgba(240, 240, 245, 1);
  overflow: scroll;
  box-sizing: border-box;
}
.baseInfo-container {
  .van-cell {
    padding: 15px 0;
    font-size: 16px;
    line-height: 16px;
  }
  .van-cell__title {
    font-size: 15px;
    color: #666666;
    margin-right: 10px;
    flex: none;
    max-width: 28%;
    line-height: normal;
  }

  .van-cell__value {
    color: #000;
    flex: inherit;
    text-align: left;
    line-height: normal;
  }
}
.last-commom::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 0.42667rem;
    border-bottom: 0.02667rem solid #ebedf0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
}
</style>
