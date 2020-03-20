<!-- 为各个页面定制的组件, 用于main展示区 -->
<template>
    <div class="box">
        <div class="title">
            <!-- 面包屑导航 区域-->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>当前位置: </el-breadcrumb-item>
                <el-breadcrumb-item>{{title1}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{title2}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card>
            <slot name="content" />
        </el-card>
        <slot />
    </div>
</template>

<script>
  export default {
    name: "Maincard",
    props: {
      title1: {type: String, required: true},
      title2: {type: String}
    }
  }
</script>

<style scoped>
    .box { height: 100%; }
    .el-card { width: 100%; height: 94%; }
    .title { width: 100%; line-height: 14px; font-size: 14px; margin-bottom: 20px; }
</style>