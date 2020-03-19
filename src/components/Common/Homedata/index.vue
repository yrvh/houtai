<!-- Homedata组件 (被Homecard组件引入)-->
<template>
  <div class="homedata">
    <div class="data-title">{{title}}</div>
    <div class="data-count">{{count}}</div>
  </div>
</template>

<script>
  export default {
    name: 'Homedata',
    props: {
      title: {
        type: String,
        required: false
      },
      count: {
        type: String,
        required: false
      }
    }
  }
</script>

<style scoped>
  .homedata { display: flex; flex-direction: column; color: #FFF; margin-bottom: 10px;}
  .data-title { font-size: 14px; text-align: center; }
  .data-count { font-size: 19px; font-weight: 600; text-align: center; }
</style>