<!-- 专为home页 定制的组件,  只在home页面引入该组件-->
<template>
      <div class="homecard" :style="bgcolors">
        <div class="content-col1">
          <slot name="row1"></slot>
          <slot name="row2"></slot>
        </div>
        <div class="content-col2">
          <home-data :title="title1" :count="count1"></home-data>
          <home-data :title="title2" :count="count2"></home-data>
        </div>
      </div>
</template>

<script>
  import Homedata from '@/components/Common/Homedata'   // 在Homecard组件中 引入Homedata组件

  export default {
    name: 'Homecard',
    components: {
      'home-data': Homedata,
    },
    props: {
      title1: {
        type: String,
        required: false
      },
      title2: {
        type: String,
        required: false
      },
      count1: {
        type: String,
        required: false
      },
      count2: {
        type: String,
        required: false
      },
      bgcolors: {
        type: Object,
        required: true,
      }
    },
  }
</script>

<style scoped>
  .homecard { padding: 12px 45px; margin-bottom: 20px; background-color: #eee; border-top-right-radius: 12px; border-bottom-left-radius: 12px; display: flex; justify-content: space-between; }
  .content-col1 { display: flex; flex-direction: column; justify-content: space-around; margin-right: 20px; }
  .content-col1 i{ color: rgba(230,230,230,0.7); font-size: 24px; text-align: center; }
  .content-col2 { display: flex; flex-direction: column; justify-content: space-between; }
</style>