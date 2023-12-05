<!--
* @Author:liufp
* @Date: 2022/03/25 14:44:30
* @LastEditors: 
* @LastEditTime: 2022/03/25 14:44:30
* @Description:
-->
<template>
  <div class="fileInfo" @click="openFile(item)">
      <img
        class="left-icon"
        v-if="fileSuffix(item) == 'pdf'"
        src="@src/assets/icon_pdf.png"
      />
      <img
        class="left-icon"
        v-else-if="fileSuffix(item) == 'docx' || fileSuffix(item) == 'doc'"
        src="@src/assets/icon_word.png"
      />
      <img
        class="left-icon"
        v-else-if="fileSuffix(item) == 'xlsx' || fileSuffix(item) == 'xls'"
        src="@src/assets/icon_excel.png"
      />
      <img
        class="left-icon"
        v-else-if="fileSuffix(item) == 'ppt'"
        src="@src/assets/icon_ppt.png"
      />
      <img
        class="left-icon"
        v-else-if="fileSuffix(item) == 'jpg' || fileSuffix(item) == 'png'"
        src="@src/assets/icon_pic.png"
      />
      <img
        class="left-icon"
        v-else-if="fileSuffix(item) == 'txt'"
        src="@src/assets/icon_txt.png"
      />
      <img
        class="left-icon"
        v-else-if="fileSuffix(item) == 'rar' || fileSuffix(item) == 'zip'"
        src="@src/assets/icon_rar.png"
      />
      <img
        class="left-icon"
        v-else-if="fileSuffix(item) == 'apk'"
        src="@src/assets/icon_apk.png"
      />
      <img
        class="left-icon"
        v-else-if="fileSuffix(item) == 'music'"
        src="@src/assets/icon_music.png"
      />
      <img
        class="left-icon"
        v-else-if="fileSuffix(item) == 'video'"
        src="@src/assets/icon_video.png"
      />
      <img
        class="left-icon"
        v-else
        src="@src/assets/icon_others.png"
      />
      <span>{{ item.filename }}</span>
      <!-- <div class="downLoad" @click.stop="downloadFile(item)">下载</div> -->
  </div>
</template>
<script>
export default {
  name: "ImgItem",
  //声明接收item
  props:['item'],
  methods: {
      openFile(file) {
          console.log('file', file);
          window.location.href = this.globalConfig.fileDownload_url_fc+`?sysName=`+this.globalConfig.GLKJBM+`&attachunid=${file.id}&&fileName=${file.filename}&prohibitDownload=0`
      },
      fileSuffix(file) {
        return file.filename.split('.').slice(-1)[0];
      },
  }
};
</script>

<style lang="scss" scoped>
    .fileInfo {
      height: 55px;
      box-sizing: border-box;
      padding: 15px 0;
      border-bottom: 1px solid #ebedf0;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      .left-icon {
        margin-right: 15px;
        width: 16px;
      }
      span {
        font-size: 16px;
        color: #333333;
      }
      .downLoad {
        color: #007aff;
        font-size: 14px;
        position: absolute;
        right: 10px;
        width: 50px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }  
</style>