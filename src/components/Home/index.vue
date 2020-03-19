<!-- 首页页面 -->
<template>
  <div class="box">
    <div class="home-top">
      <home-card title1="小区总数" title2="常住人数" count1="5155" count2="34123" :bgcolors="{background:'linear-gradient(to right, #FD7676,#FD8686,#FDA6A6)'}">
        <template slot="row1"><i class="iconfont icon-home-counts" ></i></template>
        <template slot="row2"><i class="iconfont icon-home-peoples"></i></template>
      </home-card>
      <home-card :bgcolors="{background:'linear-gradient(to right, #4172F5,#6387FE,#6387FE)'}">
        <template slot="row1"><i class="home-money iconfont icon-home-counts" ></i></template>
        <template slot="row2">
          <home-data title="总钱数" count="99900" class="home-money"></home-data>
        </template>
      </home-card>
      <home-card title1="业主" title2="租客" count1="5155" count2="4123" :bgcolors="{background:'linear-gradient(to right, #9223E5,#C456FB)'}">
        <template slot="row1"><i class="iconfont icon-home-counts" ></i></template>
        <template slot="row2"><i class="iconfont icon-home-peoples"></i></template>
      </home-card>
      <home-card title1="空闲车位数" title2="未交房数" count1="5155" count2="34123" :bgcolors="{background:'linear-gradient(to right, #4172F5,#6387FE,#6387FE)'}">
        <template slot="row1">
          <home-data title="车位数" count="6900" class="home-carport"></home-data>
        </template>
        <template slot="row2">
          <home-data title="房屋数" count="9977" class="home-house"></home-data>
        </template>
      </home-card>
      <home-card title1="应收户数" title2="实收户数" count1="5155" count2="3412" :bgcolors="{background:'linear-gradient(to right, #3FD6BF,#4BE7BD)'}">
        <template slot="row1"><i class="iconfont icon-home-counts" ></i></template>
        <template slot="row2"><i class="iconfont icon-home-peoples"></i></template>
      </home-card>
    </div>

    <div class="home-info">
      <div class="home-chart home-radius">
        <div class="chart-title">近七天的收钱统计</div>
        <div id="echart" class="chart-line"></div>
      </div>

      <div class="home-schedule">
        <div class="collection home-radius">
          <div class="title">应收档期</div>
          <div class="font-primary">5324</div>
        </div>
        <div class="collection home-radius">
          <div class="title">档期总实收</div>
          <div class="font-warning">54624</div>
        </div>
        <div class="collection home-radius">
          <div class="title">档期收本期</div>
          <div class="font-success">2000</div>
        </div>
        <div class="collection home-radius">
          <div class="title">档期收往期</div>
          <div class="font-purple">5446</div>
        </div>
      </div>

    </div>

    <div class="home-bottom">

      <div class="home-payment home-radius">
        <div class="payment-title bottom-title">
          <div>缴费记录</div>
          <div>更多<i class="iconfont icon-containerXiaoma-arrows"></i></div>
        </div>
        <ul>
          <li><i class="iconfont icon-home-ul"></i><span>丽都花园_1-2-205_202002_水费104元</span></li>
          <li><i class="iconfont icon-home-ul"></i><span>丽都花园_1-2-205_202002_水费104元</span></li>
          <li><i class="iconfont icon-home-ul"></i><span>丽都花园_1-2-205_202002_水费104元</span></li>
          <li><i class="iconfont icon-home-ul"></i><span>丽都花园_1-2-205_202002_水费104元</span></li>
          <li><i class="iconfont icon-home-ul"></i><span>丽都花园_1-2-205_202002_水费104元</span></li>
        </ul>
      </div>

      <div class="home-repair home-radius">
        <div class="repair-title bottom-title">
          <div>报修记录</div>
          <div>更多<i class="iconfont icon-containerXiaoma-arrows"></i></div>
        </div>
        <ul>
          <li><i class="iconfont icon-home-ul"></i><span>丽都花园_1-2-205门坏</span></li>
          <li><i class="iconfont icon-home-ul"></i><span>丽都花园_1-2-205_厕所堵了</span></li>
          <li><i class="iconfont icon-home-ul"></i><span>丽都花园_1-2-205_20窗坏</span></li>
          <li><i class="iconfont icon-home-ul"></i><span>丽都花园_1-2-205_202空调</span></li>
          <li><i class="iconfont icon-home-ul"></i><span>丽都花园_1-2-205_2020走廊门</span></li>
        </ul>
      </div>

      <div class="home-notice home-radius">
        <div class="notice-title bottom-title">
          <div>最新公告</div>
          <div>更多<i class="iconfont icon-containerXiaoma-arrows"></i></div>
        </div>
        <ul>
          <li><i class="iconfont icon-home-ul"></i><span>丽都花园物业费因疫情影响延迟到下个月</span></li>
          <li><i class="iconfont icon-home-ul"></i><span>银河产业城水费下调元</span></li>
          <li><i class="iconfont icon-home-ul"></i><span>丽都花园水费asdfasdf</span></li>
          <li><i class="iconfont icon-home-ul"></i><span>丽都花园_1-2-205_20200</span></li>
          <li><i class="iconfont icon-home-ul"></i><span>文邦国际askdljflasd</span></li>
        </ul>
      </div>

    </div>

  </div>

</template>

<script>

  import Homecard from '@/components/Common/Homecard'   // 引入自定义组件
  import Homedata from '@/components/Common/Homedata'   // 引入自定义的组件Homedata
  export default {
    name: "Home",
    components: {
      'home-card': Homecard,
      'home-data': Homedata,
    },
    data() {
      return {
        option : {
          title : {
            text: '某楼盘销售情况',
            subtext: '纯属虚构'
          },
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            data:['意向','预购','成交']
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          calculable : true,
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data : ['周一','周二','周三','周四','周五','周六','周日']
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'成交',
              type:'line',
              smooth:true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data:[10, 12, 21, 54, 260, 830, 710]
            },
            {
              name:'预购',
              type:'line',
              smooth:true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data:[30, 182, 434, 791, 390, 30, 10]
            },
            {
              name:'意向',
              type:'line',
              smooth:true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data:[1320, 1132, 601, 234, 120, 90, 20]
            }
          ]
        }
      }
    }
  }
</script>

<style scoped>
  .box { width: 100%; }
  .home-top { display: flex; justify-content: space-between; width: 100%; }
  .home-money { position: relative; left: 10px; }
  .home-carport,.home-house { margin-right: 45px; }

  .home-radius { border-bottom-left-radius: 10px; border-top-right-radius: 10px; padding: 25px; background-color: #FFF; }
  .home-info,.home-bottom { width: 100%; display: flex; justify-content: space-between; }
  .home-chart { width: 65%; box-sizing: border-box; height: 390px; }
  .home-chart .chart-title { font-size: 20px; font-weight: 600; }
  .home-chart .chart-line { margin-top: 20px; background-color: #eef; width: 100%; height: 300px; }

  .home-schedule { width: 33%; height: 390px; display: flex; flex-direction: column; justify-content: space-between}
  .home-schedule .collection { display: flex; justify-content: space-between; font-size: 16px; font-weight: 600; line-height: 28px; }

  .home-bottom { margin-top: 22px; }
  .home-bottom .home-payment { width: 33.5%; box-sizing: border-box; height: 295px; }
  .home-bottom .home-repair { width: 33.5%; box-sizing: border-box; height: 295px; }
  .home-bottom .home-notice { width: 29.5%; box-sizing: border-box; height: 295px; }

  .bottom-title { display: flex; justify-content: space-between; }
  .bottom-title :first-child { font-size: 20px; font-weight: 600; }
  .bottom-title :last-child { font-size: 14px; line-height: 20px; color: #999; cursor: pointer; }
  .home-bottom ul{ margin-top: 30px; }
  .home-bottom ul li{ line-height: 35px; border-bottom: 1px dashed #aaa; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
  .home-bottom ul :last-child { border-bottom: none; }
</style>