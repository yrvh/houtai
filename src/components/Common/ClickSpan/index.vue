<template>
  <span class="click-span">{{content1}}</span>
</template>

<script>
  export default {
    name: "ClickSpan",
    props: {
      content1: {type: String, required: true}
    }
  }
</script>

<style scoped>
  .click-span { display: inline-block; color: #235FED; cursor: pointer; margin: 0 10px;}
  .click-span:hover { font-weight: 600;}
  .click-span:focus { font-weight: 600;}
</style>