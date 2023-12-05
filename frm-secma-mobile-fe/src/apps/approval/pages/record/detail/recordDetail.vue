<!--
* @Author:liudan
* @Date: 2022/03/18 16:00:30
* @LastEditors: liufp
* @LastEditTime: 2022/03/23 16:00:30
* @Description:待办已办详情页
-->
<template>
  <!--已提交详情页-->
  <div class="container" id="container">
    <div class="title-container">
      <div class="title">{{ dataDetail.eventname }}</div>
      <div class="meeting">
        <span v-if="recordType == 'recordadd'">备案新增</span>
        <span v-if="recordType == 'recordsupple'">备案追加</span>
        <span v-if="recordType == 'recordadjust'">备案调整</span>
        <span v-if="recordType == 'recordend'">备案终止</span>
        <span>{{ dataDetail.recorddate && dataDetail.recorddate.split(/[ ]+/)[0] }}</span>
      </div>
    </div>

    <!-- 基本信息 -->
    <div class="baseInfo-container">
      <div class="baseInfo">
        <div class="flagColor"></div>
        <span class="name">基本信息</span>
      </div>
      <!-- 备案新增   备案追加   备案调整   备案终止 -->
      <van-collapse>
        <!-- 公共字段 -->
        <div>
          <van-cell
            title="备案类型:"
            :value="dataDetail.recordtypeName"
          ></van-cell>
          <van-cell
            title="业务大类:"
            :value="dataDetail.busiClassName"
          ></van-cell>
          <van-cell title="备案编号:" :value="dataDetail.eventno"></van-cell>
          <van-cell title="备案名称:" :value="dataDetail.eventname"></van-cell>
          <van-cell
            title="发起单位:"
            :value="dataDetail.sponsororgName"
          ></van-cell>
          <van-cell
            title="相关方:"
            :value="dataDetail.interpartyName"
          ></van-cell>
          <!-- <van-cell
            class="last-commom"
            title="分配方式:"
            :value="dataDetail.mdistributionName"
          ></van-cell> -->
          <van-cell
            title="备案人:"
            :value="dataDetail.recordmanName"
          ></van-cell>
          <van-cell title="备案日期:" 
          :value="dataDetail.recorddate && dataDetail.recorddate.split(/[ ]+/)[0]">
          </van-cell>
          <van-cell title="管会年度:" 
          :value="dataDetail.year_now">
          </van-cell>
        </div>

        <!-- 备案新增字段 -->
        <div v-if="recordType == 'recordadd'">
          <!-- <van-cell
            title="项目对接人:"
            :value="dataDetail.contributorName"
          ></van-cell> -->
          <div v-if="(dataDetail.busiClassName == '投行业务组' || dataDetail.busiClassCode=='01')&&(dataDetail.recordtypeName=='协同备案'||dataDetail.recordtypeCode=='02')">
            <van-cell
              title="是否超建议比例:"
              :value="dataDetail.isoveradjustscale=='N'?'否':'是'"
            ></van-cell>
          </div>

          <van-cell
            title="事项内容概述:"
            :value="dataDetail.eventcontent"
          ></van-cell>
          <!-- <van-cell
            title="分配规则简述:"
            :value="dataDetail.otherrulecontent"
          ></van-cell> -->
        </div>

        <!-- 备案追加字段 -->
        <div v-if="recordType == 'recordsupple'">
          <van-cell
            title="追加编号:"
            :value="dataDetail.recordsuppleno"
          ></van-cell>
          <van-cell
            title="备案联系电话:"
            :value="dataDetail.phone"
            @click="toPhone()"
          ></van-cell>
          <van-cell
            title="单据创建人:"
            :value="dataDetail.billcreatorName"
          ></van-cell>
          <van-cell title="追加日期:" :value="dataDetail.suppleDate"></van-cell>
          <van-cell
            title="事项内容概述:"
            :value="dataDetail.eventcontent"
          ></van-cell>
          <!-- <van-cell
            title="分配规则简述:"
            :value="dataDetail.otherrulecontent"
          ></van-cell> -->
        </div>

        <!-- 备案调整字段 -->
        <div v-if="recordType == 'recordadjust'">
          <van-cell
            title="调整编号:"
            :value="dataDetail.recordadjustno"
          ></van-cell>
          <van-cell
            title="项目对接人:"
            :value="dataDetail.contributorName"
          ></van-cell>
          <van-cell
            title="备案人联系电话:"
            :value="dataDetail.phone"
            @click="toPhone"
          ></van-cell>
          <van-cell
            title="单据创建人:"
            :value="dataDetail.billcreatorName"
          ></van-cell>
          <van-cell
            title="需相关方确认:"
            :value="dataDetail.isconfirm_hEnumValue"
          ></van-cell>
          <van-cell title="调整日期:" :value="dataDetail.adjustDate"></van-cell>
          <van-cell
            title="事项内容概述:"
            :value="dataDetail.eventcontent"
          ></van-cell>
          <van-cell title="调整原因:" :value="dataDetail.reason"></van-cell>
        </div>

        <!-- 备案终止字段 -->
        <div v-if="recordType == 'recordend'">
          <van-cell
            title="终止编号:"
            :value="dataDetail.recordendno"
          ></van-cell>
          <van-cell
            title="流转部门:"
            :value="dataDetail.circuldepartName"
          ></van-cell>
          <van-cell
            title="项目对接人:"
            :value="dataDetail.contributorName"
          ></van-cell>
          <van-cell
            title="备案人联系电话:"
            :value="dataDetail.phone"
            @click="toPhone"
          ></van-cell>
          <van-cell
            title="单据创建人:"
            :value="dataDetail.billcreatorName"
          ></van-cell>
          <van-cell
            title="需相关方确认:"
            :value="dataDetail.isconfirm_hEnumValue"
          ></van-cell>
          <van-cell
            title="期望终止日期:"
            :value="dataDetail.expectEndDate"
          ></van-cell>
          <van-cell
            title="事项内容概述:"
            :value="dataDetail.eventcontent"
          ></van-cell>
          <van-cell title="终止原因:" :value="dataDetail.reason"></van-cell>
        </div>
      </van-collapse>
    </div>

    <!-- 分配规则/分配结果 -->
    <InternalList
        :ruleList="ruleList"
        :isdisplayRole="isdisplayRole"
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
// import axios from "axios";
// import fileDownLoad from "js-file-download";
import { Field, Dialog, Collapse, Cell, Toast, Loading, Overlay } from "vant";
Vue.use(Field).use(Dialog).use(Toast).use(Collapse).use(Cell).use(Loading).use(Overlay);
export default {
  name: "recordDetail",
  components:{Attachment,OptionRecord,OpinionApproval,InternalList,DisplayInfo},
  data() {
    return {
      // 备案类型
      recordType: "",
      // taskId
      taskId: "",
      // 单据id
      billId: "",
      processInstanceId: "",
      processDefinitionId: "",
      // 详情的基本信息
      dataDetail: {},
      // 分配规则
      ruleList: [],
      // 公共附件列表
      commonFile: [
        // { filename: "测试V1.2.3.pdf", filetype: "pdf", filesize: "383.79KB" },
        // { filename: "测试V1.2.3.docx", filetype: "pdf", filesize: "383.79KB" },
        // { filename: "测试V1.2.3.xlsx", filetype: "pdf", filesize: "383.79KB" },
        // { filename: "测试.doc", filetype: "pdf", filesize: "383.79KB" },
      ],
      // 专项附件
      specialFile: [
        // { filename: "专项V1.2.3.pdf", filetype: "pdf", filesize: "383.79KB" },
        // { filename: "专项附件V1.2.3.docx", filetype: "pdf", filesize: "383.79KB" },
        // { filename: "附件V1.2.3.xlsx", filetype: "pdf", filesize: "383.79KB" },
        // { filename: "专项.doc", filetype: "pdf", filesize: "383.79KB" },
      ],
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
      //用户是否有SECMA_RECORD_TOUHANG（投行备案隐藏字段可见权限）角色
      isdisplayRole:false,
    };
  },
  created() {
    // recordadjust调整; recordadd新增; recordend终止; recordsupple追加
    this.recordType = localStorage.getItem("recordType");
    this.taskId = localStorage.getItem("taskId");
    this.isShowFlag = localStorage.getItem("isShowFlag");
    // 获取基本信息及规则列表
    this.callService({
      params: {
        url: "/frm-secma-ise/mobile/approvalbpm/getRecord?",
      },
    }).then((res) => {
      if (res.success == "success") {
        //console.log("getRecord返回值",res)
        this.dataDetail = res.detailMsg.data.record;
        this.ruleList = res.detailMsg.data.child;
        this.isdisplayRole = res.detailMsg.data.isdisplayRole;
        //console.log("getRecord返回值规则数据",this.ruleList)
        this.billId = res.detailMsg.data.record.id;
        this.processInstanceId = localStorage.getItem("processInstanceId") || res.detailMsg.data.processInstanceId;
        this.processDefinitionId = localStorage.getItem("processDefinitionId") || res.detailMsg.data.processDefinitionId;
        if(this.recordType=='recordadd' && ((this.dataDetail.busiClassName == '投行业务组' || this.dataDetail.busiClassCode=='01') && (this.dataDetail.recordtypeName=='协同备案'||this.dataDetail.recordtypeCode=='02'))){
              localStorage.setItem("recordAddType", 'XTTH');//备案新增类型：协同备案+投行类型为XTTH,非协同备案+投行类型为FXTTH,非投行类型为FTH
        }else if(this.recordType=='recordadd' && ((this.dataDetail.busiClassName == '投行业务组' || this.dataDetail.busiClassCode=='01') && !(this.dataDetail.recordtypeName=='协同备案'||this.dataDetail.recordtypeCode=='02'))){
              localStorage.setItem("recordAddType", 'FXTTH');
        }else{
              localStorage.setItem("recordAddType", 'FTH');
        }

        // 获取公共附件
        this.callService({
          params: {
            url:
              "/iuap-saas-filesystem-service/file/query?filepath=" +
              this.dataDetail.eventno +
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

        // 获取专项附件
        this.callService({
          params: {
            url:
              "/iuap-saas-filesystem-service/file/query?filepath=" +
              this.dataDetail.id +
              "add" +
              this.dataDetail.billcreator +
              "&groupname=" +
              "yddemo",
            jsonData: this.dataDetail,
          },
        }).then((res) => {
          let personalFile = res.data.data;
          if (personalFile.length) {
            personalFile.forEach((item) => {
              this.specialFile.push(item);
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
        console.log("获取基本数据失败",res)
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
    // downloadFile(file) {
    //   const fileName = file.filename;
    //   axios({
    //     method: "GET",
    //     url: "/iuap-saas-filesystem-service/file/download",
    //     params: {
    //       id: file.id,
    //     },
    //     responseType: "blob",
    //     headers: {
    //       Authority: `${localStorage.getItem("cookie")};`,
    //     },
    //   }).then((res) => {
    //     fileDownLoad(res.data, fileName);
    //   });
    // },
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
