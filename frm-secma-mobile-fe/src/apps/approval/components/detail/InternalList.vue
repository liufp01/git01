<!--
* @Author:liufp
* @Date: 2022/04/01 16:35:54
* @LastEditors: 
* @LastEditTime: 2022/04/01 16:35:54
* @Description:详情中子表：备案中的规则列表；分摊中的调整单子表
-->
<template>
    <div class="detail-container">
      <div class="baseInfo">
        <div class="flagColor"></div>
        <span class="name" v-if="this.processType=='record'">分配规则/分配结果</span>
        <span class="name" v-else-if="this.processType=='apportion'">调整单子表</span>
        <span class="name" v-else-if="this.processType=='responsbillimp'">分成责任单导入</span>
      </div>

      <van-collapse v-if="ruleList.length && this.processType=='record'">
        <van-cell
          v-for="(item, index) in ruleList.slice(0, 3)"
          :key="index"
          is-link
          :title="item.busitypeName"
          @click="openDetailContentPage(item)"
        />
      </van-collapse>
      <!-- <van-collapse v-if="ruleList.length && this.processType=='apportion'">
        <van-cell 
          v-for="(item, index) in ruleList.slice(0, 3)"
          :key="index"
          is-link
          :title="item.busiTypeName"
          @click="openDetailContentPage(item)"
        />
      </van-collapse> -->
      <van-collapse v-if="ruleList.length && (this.processType=='apportion'||this.processType=='responsbillimp')">
        <van-cell
          v-for="(item, index) in ruleList.slice(0, 3)"
          :key="index"
          is-link
          :title="item.busiTypeName"
          @click="openDetailContentPage(item)"
        />
      </van-collapse>

      <div v-if="ruleList.length > 3" class="all" @click="openDetailListPage()">
        <span v-if="this.processType=='record'">查看全部规则</span>
        <span v-else-if="this.processType=='apportion' || this.processType=='responsbillimp'">查看全部子表信息</span>
        <img src="@src/assets/icon_right.png" alt="" />
      </div>
      <div v-else-if="!ruleList.length" class="record-content">
        <span v-if="this.processType=='record'">暂无分配规则...</span>
        <span v-else-if="this.processType=='apportion'">暂无调整单子表信息...</span>
        <span v-else-if="this.processType=='responsbillimp'">暂无分成责任单导入子表信息...</span>
      </div>
    </div>
</template>
<script>
export default {
  name: "InternalList",
  data(){
    return{
      //流程类型 record:备案相关流程  apportion:成本分摊相关流程
      processType:"",
    }
  },
  //声明接收组件传参
  props:['ruleList','isdisplayRole'],
  methods: {
    openDetailListPage() {
      this.$router.push({name: "detail_list",params: { detailList: this.ruleList,processType:this.processType,isdisplayRole:this.isdisplayRole},});
    },
    openDetailContentPage(item) {
      if(this.processType=="record"){//备案的规则详情
        this.$router.push({ name: "detail_content", params: { content: item,isdisplayRole:this.isdisplayRole } });
      }else if(this.processType=="apportion"){
        this.$router.push({ name: "apportion_detail_content", params: { content: item } });
      }else if(this.processType=="responsbillimp"){
        this.$router.push({ name: "responsbillimp_detail_content", params: { content: item } });
      }
    },
  },
  created () {
      this.processType=localStorage.getItem('processType');
  }
};
</script>

<style lang="scss" scoped>
@import '../../../../common/css/commonCss';
 .detail-container {
  .van-cell__title {
    font-size: 16px;
    // padding: 15px 0;
  }
  .van-cell__left-icon,
  .van-cell__right-icon {
    font-size: 16px;
    // line-height: 50px;
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
    text-align: center;
    position: relative;
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