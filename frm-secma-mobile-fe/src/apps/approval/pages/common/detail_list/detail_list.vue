<!--
* @Author:liudan
* @Date: 2022/03/18 16:01:17
* @LastEditors: liufp
* @LastEditTime: 2022/03/23 16:01:17
* @Description:分配规则/分配结果列表页
-->
<template>
    <div class="container">
        <div class="baseInfo">
          <div class="flagColor"></div>
          <span class="name" v-if="this.processType=='record'">分配规则/分配结果</span>
          <span class="name" v-else-if="this.processType=='apportion'">调整单子表</span>
          <span class="name" v-else-if="this.processType=='responsbillimp'">分成责任单导入</span>
        </div>
       <van-list
        class="public-list"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
       >

        <van-collapse v-if="this.processType=='record' " >
          <van-cell
            v-for="(item, index) in ruleList" :key="index"
            is-link
            :title="item.busitypeName"
            @click="openDetailContentPage(item)"
          />
        </van-collapse>
         <!-- <van-collapse v-if="this.processType=='apportion'" >
          <van-cell
            v-for="(item, index) in ruleList" :key="index"
            is-link
            :title="item.busiTypeName"
            @click="openDetailContentPage(item)"
          />
        </van-collapse> -->
        <van-collapse v-if="this.processType=='apportion'  || this.processType=='responsbillimp'" >
          <van-cell
            v-for="(item, index) in ruleList" :key="index"
            is-link
            :title="item.busiTypeName"
            @click="openDetailContentPage(item)"
          />
        </van-collapse>
      </van-list>
    </div>
</template>

<script>
import Vue from "vue";
import { Field, Dialog, List, Collapse, Cell} from "vant";
Vue.use(Field)
  .use(Dialog) 
  .use(Collapse)
  .use(Cell)
  .use(List);
export default {
  name: "detail_list",
    data() {
        return {
            ruleList: [],
            //流程类型 record:备案相关流程  apportion:成本分摊相关流程
            processType:"",
            //投行备案某些字段是否可见标识
            isdisplayRole:""
        }
    },
    created() {
      this.processType=this.$route.params.processType;
      let datas = this.$route.params.detailList;
      this.isdisplayRole=this.$route.params.isdisplayRole;
      //console.log("content", this.$store.state)
      if(datas) {
        this.$store.state.ruleList = datas;
      } 
      this.ruleList =  datas || this.$store.state.ruleList;
    },
    methods: {
        onLoad() {
          //console.log("OnLoad")
        },
        openDetailContentPage(item) {
          //console.log("item", item)
          if(this.processType=="record"){//备案的规则详情
            this.$router.push({name: 'detail_content', params: {content: item,isdisplayRole:this.isdisplayRole}})
          }else if(this.processType=="apportion"){
            this.$router.push({ name: "apportion_detail_content", params: { content: item } });
          }else if(this.processType=="responsbillimp"){
            this.$router.push({ name: "responsbillimp_detail_content", params: { content: item } });
          }
        },
    }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh ;
  background: rgba(240, 240, 245, 1);
  overflow:scroll;
  box-sizing: border-box;
  .van-cell__title {
    font-size: 16px;
    // padding: 5px 0;
  }
  .van-cell__left-icon, .van-cell__right-icon{
    font-size: 16px;
    // line-height: 40px;
  }
}
.baseInfo {
    padding: 15px;
    border: 1px solid #ebedf0;
    background: #fff;
    .flagColor {
      display: inline-block;
      width: 4px;
      height: 11px;
      background: #a6c5f6;
      margin-right: 5px;
    }
    .name {
      font-size: 14px;
      color: #333333;
    } 
}
</style>
