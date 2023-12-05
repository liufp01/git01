 <!--
 * @Author:liudan
 * @Date: 2022/03/18 16:01:47
 * @LastEditors: liufp
 * @LastEditTime: 2022/03/23 16:01:47
 * @Description:附件列表页  暂时不用了
 -->
<template>
  <div class="container">
    <div class="fileInfo-container">
      <div>
        <div class="commonfile">公共附件</div>
        <ImgItem
          v-for="(item, index) in commonFile"
          :key="index"
			    :item="item" 
        />
      </div>
      <div>
        <div class="specialfile">专项附件</div>
        <ImgItem
          v-for="(item, index) in specialFile"
          :key="index"
			    :item="item" 
        />
      </div>
    </div>
  </div>
</template>
<script>
import ImgItem from '../../../components/file_list/ImgItem'
export default {
  name: "file_list",
  components:{ImgItem},
  data() {
    return {
      // 公共附件
      commonFile: [],
      // 专项附件
      specialFile: []
    };
  },
  created() {
    let data = this.$route.params;
    //console.log("data", data);
    this.commonFile = data.commonFile;
    this.specialFile = data.specialFile;
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: #fff;
  overflow: scroll;
  box-sizing: border-box;
  padding: 15px;
}
  .fileInfo-container {
    .commonfile, .specialfile {
      color: #666666;
      font-size: 14px;
      height: auto;
      padding: 10px 0;
      border-bottom: 1px solid #ebedf0;;
    }
  }
    
</style>