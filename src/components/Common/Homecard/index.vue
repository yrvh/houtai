<template>
      <div class="homecard">
        <div class="homecard-content">
          <div>{{title}} <span class="homecard-content-span" :style="fontColor">  {{count}}</span></div>
          <slot name="date"/>
          <slot name="money"/>
        </div>

        <div class="homecard-log" :style="logColor">
          <slot name="log"/>
        </div>
      </div>
</template>

<script>
  export default {
    name: 'Homecard',
    props: {
      title: {
        type: String,
        required: true
      },
      count: {
        type: String,
        required: true
      },
      fontColor: {
        type: Object,
        required: true,
      },
      logColor: {
        type: Object,
        required: true
      }
    },
  }
</script>

<style scoped>
  .homecard { padding: 30px; width: 27%; margin-bottom: 20px; background-color: #fff; border-radius: 4px; display: flex; justify-content: space-between; box-shadow: 0 1px 1px rgba(0,0,0,0.15)}
  .homecard-content { height: 102px; display: flex; flex-direction: column; justify-content: space-around; }
  .homecard-content-span { font-size: 28px; }
  .homecard-log { height: 100px; width: 100px; border-radius: 50%; display: flex; justify-content: center;}
  .homecard-log i { color: #fff; font-size: 80px; line-height: 100px;}
  .iconfont { margin: 0;}

</style>