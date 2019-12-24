<template>
  <div>
    <Head />
    <TabBar/>
  </div>
</template>

<script>
  import Head from '@/components/Head';
  import TabBar from '@/components/TabBar';

  export default {
    name: "ClientInfo",
    components: {
      Head,
      TabBar,
    }
  }
</script>

<style scoped>

</style>