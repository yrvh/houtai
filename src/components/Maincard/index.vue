<template>
  <div class="box">
    <el-card>
      <div class="title">{{title}}</div>
      <slot name="content" />
    </el-card>
    <slot />
  </div>
</template>

<script>
  export default {
    name: "Maincard",
    props: {
      title: {type: String, required: true}
    }
  }
</script>

<style scoped>
  .box { height: 100%; }
  .el-card { width: 100%; }
  .title { width: 100%; height: 40px; background-color: #FFF; font-size: 18px; border-bottom: 1px solid #ddd;}
</style>