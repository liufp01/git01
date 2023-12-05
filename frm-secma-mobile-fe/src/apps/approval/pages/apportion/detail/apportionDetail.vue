<!--
* @Author:liufp
* @Date: 2022/04/06 10:21:52
* @LastEditors: 
* @LastEditTime: 2022/04/06 10:21:52
* @Description:分摊调整单待办已办详情页
-->
<template>
  <!--已提交详情页-->
  <div class="container" id="container">
    <div class="title-container">
      <div class="title">分摊调整单{{ dataDetail.code }}</div>
      <div class="meeting">
        <span >分摊调整单</span>
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
        <van-cell title="调整单编码:" :value="dataDetail.code"></van-cell>
        <van-cell title="管会年度:" :value="dataDetail.year_now"></van-cell>
        <van-cell title="管会期间:" :value="dataDetail.period"></van-cell>
        <van-cell title="单据日期:" :value="dataDetail.adjustDate"></van-cell>
        <van-cell title="发起单位:" :value="dataDetail.costcenterName"></van-cell>
        <van-cell title="发起人:" :value="dataDetail.createUserName"></van-cell>
        <van-cell title="业务组:" :value="dataDetail.busiClassName"></van-cell>
        <!-- <van-cell title="是否最终结果:" :value="dataDetail.subProcessingEnumValue"></van-cell>
        <van-cell title="标识:" :value="dataDetail.singleBilateralEnumValue"></van-cell> -->
        <van-cell class="last-commom" title="备注:" :value="dataDetail.description"></van-cell>
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

    <!-- 附件 -->
    <Attachment 
      :commonFile="commonFile"  
      :specialFile="specialFile"  
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
import Attachment from '../../../components/detail/Attachment'
import OptionRecord from '../../../components/detail/OptionRecord'
import OpinionApproval from '../../../components/detail/OpinionApproval'
import InternalList from '../../../components/detail/InternalList'
import DisplayInfo from '../../../components/detail/DisplayInfo'
import Vue from "vue";
import { Field,  Collapse, Cell, Toast, Loading, Overlay } from "vant";
Vue.use(Field).use(Toast).use(Collapse).use(Cell).use(Loading).use(Overlay);
export default {
  name: "apportionDetail",
  components:{Attachment,OptionRecord,OpinionApproval,InternalList,DisplayInfo},
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
      //上传附件
      commonFile: [
        // { filename: "专项V1.2.3.pdf", filetype: "pdf", filesize: "383.79KB" },
        // { filename: "专项附件V1.2.3.docx", filetype: "pdf", filesize: "383.79KB" },
        // { filename: "附件V1.2.3.xlsx", filetype: "pdf", filesize: "383.79KB" },
        // { filename: "专项.doc", filetype: "pdf", filesize: "383.79KB" },
      ],
      // 专项附件-暂时未用
      specialFile: [
      ],
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

        // 获取公共附件
        this.callService({
          params: {
            url:
              "/iuap-saas-filesystem-service/file/query?filepath=" +
              this.dataDetail.code +
              "&groupname=" +
              "yddemo",
            jsonData: this.dataDetail,
          },
        }).then((res) => {
          let commonFile = res.data.data;
          if (commonFile.length) {
            commonFile.forEach((item) => {
              this.commonFile.push(item);
            });
          }
        });


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
