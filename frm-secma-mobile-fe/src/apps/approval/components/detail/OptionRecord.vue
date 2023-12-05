<!--
* @Author:liufp
* @Date: 2022/04/01 11:20:48
* @LastEditors: 
* @LastEditTime: 2022/04/01 11:20:48
* @Description:明细中意见记录模块
-->
<template>
  <div class="record-container">
    <div class="baseInfo">
      <div>
        <div class="flagColor"></div>
        <span class="name">意见记录</span>
      </div>
      <div class="circulation" @click="toApproveFlow()">流转记录</div>
    </div>
    <div
      class="record"
      v-for="(item, index) in recordList.slice(0, 1)"
      :key="index"
    >
      <div class="approve-icon"></div>
      <div class="approve-content">
        <div class="name">
          <span>流程节点:</span>
          <span>{{ item.name }}</span>
        </div>
        <div class="check-name">
          <span>{{ item.executionPart }}</span>
          <span v-show="item.executionPart">/</span>
          <span>{{ item.executionId }}</span>  
        </div>
        <div class="approve-result">
          <span>{{ item.deleteReason ? formatStr(item.deleteReason): "无审批意见" }}</span>
        </div>
        <div :class="{'datePadding':recordList.length==1}" class="date">{{ item.endTime && formatTime(item.endTime) }}</div>
      </div>
    </div>
    <div v-if="recordList.length > 1" class="all" @click="openRecordPage()">
      <span>查看全部意见记录</span>
      <img src="@src/assets/icon_right.png" alt="" />
    </div>
    <div v-if="recordList.length<1" class="record-content">
      <span>暂无意见记录...</span>
    </div>
  </div>
</template>
<script>
import {formatStr,formatTime} from '@src/common/js/commonFunc'
export default {
  name: "OptionRecord",
  //声明接收组件传参
  props:["recordList","approveList"],
  methods: {
    toApproveFlow() {
      if (this.approveList.length > 0) {
        this.$router.push({
          name: "approve_flow",
          params: { isOpinionRecord: false, billInfo: this.approveList },
        });
      } else {
        Toast("暂无流转记录");
      }
    },
    openRecordPage() {
      this.$router.push({
        name: "approve_flow",
        params: { isOpinionRecord: true, billInfo: this.recordList },// isOpinionRecord:false代表流转记录，true代表意见记录
      });
    },
    formatStr(str) {
      return formatStr(str);
    },
    formatTime(d) {
      return formatTime(d);
    },
  }
};
</script>

<style lang="scss" scoped>
@import '../../../../common/css/commonCss';
.record-container {
  .baseInfo {
    display: flex;
    justify-content: space-between;
    .circulation {
      display: inline-block;
      font-size: 14px;
      color: #007aff;
    }
  }

  .record {
    padding-top: 15px;
    position: relative;
    .approve-icon {
      position: absolute;
      width: 10px;
      height: 10px;
      border: 3px solid #a6c5f6;
      border-radius: 50%;
      display: inline-block;
      margin-right: 10px;
    }

    .approve-content {
      margin-left: 15px;
      margin-top: -15px;
      // height: 100px;
      box-sizing: border-box;
      .name {
        font-size: 14px;
        color: #333333;
        span {
          margin-right: 10px;
        }
      }
      .check-name {
        font-size: 0;
        color: #666666;
        span {
          font-size: 14px;
        }
      }
      .approve-result {
        // 设置审批意见最大宽度，高度自适应
        max-width: 320px;
        height: auto;
        font-size: 14px;
        box-sizing: border-box;
        padding: 10px 8px;
        background: #F2F2F2;
        color: #000000;
        display: flex;
        align-items: center;
        border-radius: 5px;
        word-break: break-all;
        white-space:pre-line;
      }
      .date {
        font-size: 10px;
        color: #666666;
        text-align: right;
      }
    }
    .approve-content > div {
      margin-top: 10px;
    }
  }
  .datePadding{
    padding-bottom: 15px;
  }
  .record-content {
    padding: 15px 0;
    text-align: center;
    span {
      font-size: 14px;
      color: #cccccc;
    }
  }
  .all {
    padding: 15px 0;
    position: relative;
    text-align: center;
    span {
      color: #007aff;
      font-size: 14px;
    }
    img {
      width: 15px;
      position: absolute;
      top: 18px;
      margin-left: 7px;
    }
  }
}
</style>