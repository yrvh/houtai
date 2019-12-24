<template>
  <header id="head">
    <div class="head-logo"><img src="@/assets/logo.png" alt="小马物业"></div>
    <div class="head-exit">
      <i class="iconfont icontuichu1"></i>
      <span>退出系统</span>
    </div>
  </header>
</template>

<script>
  export default {
    name: "Head"
  }
</script>

<style scoped>
  #head{ height: 64px; width: 100%; border-bottom: 1px solid #eee; background-color: #F8F8F8; display: flex; justify-content: space-between; align-items: center;}
  .head-logo{ margin-left: 16px;}
  .head-logo img{ width: 165px;height: 45px;}
  .head-exit{ color: #666; margin-right: 35px; font-weight: 500; background-color: #f00;}
</style>