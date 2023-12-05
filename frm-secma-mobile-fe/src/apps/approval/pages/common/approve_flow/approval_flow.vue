<!--
* @Author：liudan
* @Date: 2022/03/24 13:52:51
* @LastEditors: liufp
* @LastEditTime: 2022/03/24 13:52:51
* @Description:意见记录或流转记录列表
-->
<template>
  <div class="box">
    <div
      class="approve-list"
      v-for="(item, index) in approvalData"
      :key="index"
    >
      <div v-bind:class="[showOpinion ? 'opinion-icon' : 'approve-icon']"></div>
      <div v-if="!showOpinion" class="approve-content">
        <div class="name">
          <span>流程节点:</span>
          <span>{{ item.name }}</span>
        </div>
        <div id="content" :class="[showEllipsis ? 'check-name-ellipsis' : 'check-name']">
          <span>{{ item.executionPart }}</span>
          <span v-show="item.executionPart">/</span>
          <span>{{ item.executionId }}</span>
        </div>
        <div class="date">{{ item.startTime && formatTime(item.startTime) }}</div>
      </div>

      <div v-if="showOpinion" class="approve-content">
        <div class="name">
          <span>流程节点:</span>
          <span>{{ item.name }}</span>
        </div>
        <div id="content" :class="[showEllipsis ? 'check-name-ellipsis' : 'check-name']">
          <span>{{ item.executionPart }}</span>
          <span v-show="item.executionPart">/</span>
          <span>{{ item.executionId }}</span>
        </div>
        <div class="approve-result">
           <span>{{ item.deleteReason ? formatStr(item.deleteReason): "无审批意见" }}</span> 
          </div>
        <div class="date">{{item.endTime && formatTime(item.endTime) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {formatStr,formatTime} from '@src/common/js/commonFunc';
import { Toast, Steps, Step } from "vant";
import Vue from "vue";
Vue.use(Toast).use(Steps).use(Step);

export default {
  name: "approval_flow",
  data() {
    return {
      // 意见/流转记录数据
      approvalData: [],
      // 判断是否是意见记录，true 意见记录；false 流转记录
      showOpinion: false,
      // 超出显示省略号
      showEllipsis: true,
    };
  },
  created() {
    let data = this.$route.params;
    //console.log("data===", data);
    this.approvalData = data.billInfo;
    this.showOpinion = data.isOpinionRecord;
  },
  mounted() {
    const el = document.getElementById('content');
    // 判断文字内容是否超出页面宽度
    if (el.clientWidth < el.scrollWidth) {
      this.showEllipsis = true;
    } else {
      this.showEllipsis = false;
    }
  },
  methods: {
    formatTime(d) {
      return formatTime(d);
    },
    formatStr(str){
      return formatStr(str);
    },
    // goback() {
    //   this.$router.push({ name: "index", params: { go_back: "Y" } });
    // },
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100vw;
  //height: calc(100vh - 60px);
  height: 100vh;
  overflow: scroll;
  box-sizing: border-box;
  background: #ffffff;
  padding: 15px;
}
.approve-list {
  position: relative;
  // padding-bottom: 10px;
  .approve-icon,
  .opinion-icon {
    width: 11px;
    height: 11px;
    border: 3px solid #a6c5f6;
    border-radius: 50%;
    display: inline-block;
    margin-right: 9px;
  }
  .approve-icon::after {
    content: " ";
    width: 2px;
    height: auto;
    color: #a6c5f6;
    background: #a6c5f6;
    position: absolute;
    top: 10px;
    left: 4px;
    bottom: 0;
  }

  .opinion-icon::after {
    content: " ";
    width: 2px;
    height: auto;
    color: #a6c5f6;
    background: #a6c5f6;
    position: absolute;
    top: 10px;
    left: 4px;
    bottom: 0;
  }

  .approve-content {
    margin-left: 20px;
    margin-top: -20px;
    padding-bottom: 10px;
    box-sizing: border-box;
    .name {
      font-size: 16px;
      color: #333333;
      span {
        margin-right: 5px;
      }
    }
    .check-name {
      font-family: PingFang SC;
      color: #666666;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 0;
      span {
        font-size: 14px;
      }
    }
    .check-name-ellipsis {
      font-family: PingFang SC;
      unicode-bidi: bidi-override;
      direction: rtl;
      color: #666666;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 0;
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
      background: #f2f2f2;
      color: #000000;
      display: flex;
      align-items: center;
      border-radius: 5px;
      white-space: pre-line;
      word-break: break-all;
    }
    .date {
      font-size: 12px;
      color: #666666;
      text-align: right;
    }
  }
  .approve-content > div {
    margin-bottom: 10px;
  }
}
.approve-list:last-child {
  .approve-icon::after {
    display: none;
  }

  .opinion-icon::after {
    display: none;
  }
}
</style>
