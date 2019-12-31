<template>
  <div class="box">
    <el-card>
      <div class="count1-title">小区总数</div>
        <el-row class="count1-communityName" :gutter="20">
          <el-col :span="4">
            <el-input placeholder="请输入小区名" v-model="inf">
              <template slot="prepend">小区名</template>
            </el-input>
          </el-col>
          <el-col :span="1.3">
            <el-button type="" class="count1-search"><i class="iconfont icon-search"></i>搜索</el-button>
          </el-col>
          <el-button type="" class="count1-add"><i class="iconfont icon-add"></i>添加小区</el-button>
        </el-row>
    </el-card>
  </div>
</template>

<script>

  export default {
    name: "Count1",
    data() {
      return {
        inf: "全部小区"
      }
    },
    ctreated() {
      this.getCommunicateList()
    },
    methods: {
      getcommunicateList() {
        this.$axios.get('/api/communicate')
      }
    }
  }
</script>

<style scoped>
  .el-card { width: 100%; }
  .el-row { margin: 0 !important; }

  .count1-communityName { height: 92px; position: relative; }
  .count1-communityName .el-col { margin-top: 27px; }
  .count1-title { width: 100%; height: 40px; background-color: #FFF; font-size: 18px; border-bottom: 1px solid #ddd;}
  .count1-search { background-color: #0D9CF4; color: #fff;}
  .iconfont { margin-right: 8px;}
  .count1-add { position: absolute; right: 0; top: 36px; background-color: #06D673; color: #fff;}
</style>