<!--
* @Author:liufp
* @Date: 2022/10/13 13:30:13
* @LastEditors: 
* @LastEditTime: 2022/10/13 13:30:13
* @Description:审批意见模块及审批按钮隐藏时提示信息
-->
<template>
    <!-- 不显示审批意见模块及审批按钮时的提示信息 -->
    <div class="baseInfo-container displayInfo">
      <span>请在PC端操作</span>
    </div>
</template>
<script>
export default {
  name: "DisplayInfo",
};
</script>

<style lang="scss" scoped>
@import '../../../../common/css/commonCss';
  .displayInfo{
    font-size: 12px;
    color: rgb(247, 121, 121);
    padding-bottom: 10px;
    //margin-top: -10px;
  }
</style>