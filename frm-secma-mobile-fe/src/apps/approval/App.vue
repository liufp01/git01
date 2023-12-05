<template>
  <div id="app">
    <!-- 页面跳转时对recordDetail组件进行缓存，include名字要与组件中定义的name一直，
       缓存多个组件的书写形式（v-bind）为 :include="['recordDetail','apportionDetail']" 或include="recordDetail,apportionDetail,detail_list"-->
    <!-- <keep-alive :include="['recordDetail','apportionDetail','detail_list']"> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
// import Index from "./pages/index"
export default {
  name: 'App',
  // components: {Index}
}
</script>

<style lang="scss">
  @import '@src/common/style/public.scss';

</style>
