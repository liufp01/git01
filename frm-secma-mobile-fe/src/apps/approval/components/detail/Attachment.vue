<!--
* @Author:liufp
* @Date: 2022/04/01 10:33:26
* @LastEditors: 
* @LastEditTime: 2022/04/01 10:33:26
* @Description:明细页中附件模块
-->
<template>
    <div class="file-container">
      <div class="baseInfo">
        <div class="flagColor"></div>
        <span class="name">附件</span>
      </div>

      <div v-show="!isExpand">
        <!-- 公共附件 -->
        <div v-if="commonFile.length">
          <!-- 目前pc端改为只有一种附件类型（公共附件）此处无需显示名称了 -->
          <!-- <div class="commonfile">公共附件</div> -->
            <ImgItem
              v-for="(item, index) in (commonFile.length > 3 ? commonFile.slice(0, 3) : commonFile.slice(0, commonFile.length))"
              :key="index"
              :item="item" 
            />
        </div>
        <!-- 专项附件 -->
        <div v-if="specialFile.length && commonFile.length < 3">
          <div class="specialfile">专项附件</div>
            <ImgItem
              v-for="(item, index) in (commonFile.length > 3 ? null : specialFile.slice(0, 3-commonFile.length))"
              :key="index"
              :item="item" 
            />
        </div>
      </div>
      <div v-show="isExpand">
        <!-- 公共附件 -->
        <div v-if="commonFile.length">
          <!-- <div class="commonfile">公共附件</div> -->
            <ImgItem
              v-for="(item, index) in commonFile"
              :key="index"
              :item="item" 
            />
        </div>
        <!-- 专项附件 -->
        <div v-if="specialFile.length">
          <div class="specialfile">专项附件</div>
            <ImgItem
              v-for="(item, index) in specialFile"
              :key="index"
              :item="item" 
            />
        </div>
      </div>
      <!-- <div v-if="commonFile.length + specialFile.length>3" class="more" @click="showMoreFile">
        <span>查看更多</span>
        <img src="@src/assets/icon_right.png" alt="" />
      </div> -->
      <div v-show="commonFile.length + specialFile.length>3 && !isExpand" class="more" @click="showMoreFile">
        <span>查看更多</span>
        <img src="@src/assets/icon_down.png" alt="" />
      </div>
      <div v-show="commonFile.length + specialFile.length>3 && isExpand" class="more" @click="showMoreFile">
        <span>收起</span>
        <img src="@src/assets/icon_up.png" alt="" />
      </div>
      <!-- <div v-if="fileList.length>3">
        <div v-if="!isExpand" class="more" @click="showMoreFile">
          <span>展开更多</span>  
          <img
            src="@src/assets/icon_down.png"
            alt=""
          />
        </div>
        <div v-if="isExpand" class="fold" @click="showMoreFile">
          <span>收起</span>
          <img
            src="@src/assets/icon_up.png"
            alt=""
          />
        </div>
      </div> -->
      <div v-if="!(commonFile.length+specialFile.length)" class="record-content">
        <span>暂无附件</span>
      </div>
    </div>
</template>
<script>
import ImgItem from '../file_list/ImgItem'
export default {
  name: "Attachment",
  data(){
    return {
      // 附件是否展开
      isExpand: false,
    }
  },
  components:{ImgItem},
  //声明接收组件传参
  props:['commonFile','specialFile'],

  methods: {
    showMoreFile() {
      this.isExpand = !this.isExpand;
      // this.$router.push({
      //   name: 'file_list', 
      //   params: {
      //     commonFile: this.commonFile, 
      //     specialFile: this.specialFile}
      // })
    },
  }
};
</script>

<style lang="scss" scoped>
@import '../../../../common/css/commonCss';
.baseInfo {
  padding-bottom: 15px;
  border-bottom: 1px solid #ebedf0;
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
.file-container {
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 0 15px;
  padding-top: 15px;
  margin-bottom: 10px;
  .title {
    padding: 15px 0;
    font-size: 16px;
  }
  .contract-date {
    font-size: 16px;
  }
  .undertake {
    font-size: 16px;
  }
}

.file-container {
  .commonfile, .specialfile {
    color: #666666;
    font-size: 14px;
    height: auto;
    padding: 10px 0;
    border-bottom: 1px solid #ebedf0;
  }
  .expand {
    height: auto;
  }
  .unexpand {
    height: 110px;
  }
  .record-content {
    padding: 15px 0;
    text-align: center;
    span {
      font-size: 14px;
      color: #cccccc;
    }
  }
  // .fileInfo:last-child {
  //   // border-bottom: none;
  //   // padding-bottom: 0;
  // }
  .more,
  .fold {
    padding: 15px 0;
    position: relative;
    text-align: center;
    span {
      color: #007aff;
      font-size: 14px;
    }
    img {
      position: absolute;
      top: 18px;
      margin-left: 7px;
      width: 15px;
    }
  }
}
 
</style>