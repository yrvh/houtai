<!-- 首页页面 -->
<template>
  <div class="box">
    <div class="home-top">
      <home-card title="小区总户数" count="450" :fontColor="{color: '#00A8FF'}" :logColor="{backgroundColor: '#00A8FF'}">
        <div class="home-date" slot="date"> 当前月份:2019-10</div>
        <template slot="log"><i class="iconfont icon-home-top1"></i></template>
      </home-card>
      <home-card title="在住户数" count="3080" :fontColor="{color: '#FD8C40'}" :logColor="{backgroundColor: '#FD8C40'}">
        <template slot="log"><i class="iconfont icon-home-top2"></i></template>
      </home-card>
      <home-card title="月缴费总额" count="1000" :fontColor="{color: '#00A8FF'}" :logColor="{backgroundColor: '#00A8FF'}">
        <div class="home-date" slot="date"> 当前月份:2019-10</div>
        <div class="home-money" slot="money">小程序支付:<span class="home-money-font"> ¥{{1000}}</span></div>
        <template slot="log"><i class="iconfont icon-home-top3"></i></template>
      </home-card>
      <home-card title="月缴费总额" count="23800" :fontColor="{color: '#50CC43'}" :logColor="{backgroundColor: '#50CC43'}">
        <div class="home-date" slot="date"> 当前月份:2019-10</div>
        <template slot="log"><i class="iconfont icon-home-top4"></i></template>
      </home-card>
      <home-card title="已缴费户数" count="2980" :fontColor="{color: '#00A8FF'}" :logColor="{backgroundColor: '#00A8FF'}">
        <div class="home-date" slot="date"> 当前月份:2019-10</div>
        <template slot="log"><i class="iconfont icon-home-top5"></i></template>
      </home-card>
      <home-card title="未缴费户数" count="100" :fontColor="{color: '#50CC43'}" :logColor="{backgroundColor: '#50CC43'}">
        <div class="home-date" slot="date"> 当前月份:2019-10</div>
        <template slot="log"><i class="iconfont icon-home-top6"></i></template>
      </home-card>
    </div>

    <div class="home-chart">
      <div class="home-chartLine">缴费统计</div>
      <div class="home-chartNotice">最新公告</div>
    </div>
  </div>

</template>

<script>

  import Homecard from '@/components/Homecard'

  export default {
    name: "Home",
    components: {
      'home-card': Homecard
    },
    data() {
      return {
      }
    }
  }
</script>

<style scoped>
  .box { width: 100%; }
  .home-top { display: flex; flex-wrap: wrap; justify-content: space-between; width: 100%; }
  .home-date { color: #999; }
  .home-money { color: #999; }
  .home-money-font { color: #00A8FF; }

  .home-chart { width: 100%; height: 555px; display: flex; justify-content: space-between; }
  .home-chartLine { width: 66%; background-color: #fff; }
  .home-chartNotice { width: 32%; background-color: #FFF; }

</style>