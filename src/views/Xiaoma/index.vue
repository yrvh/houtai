<template>
  <el-container class="headerAside">

    <!-- 页面头部区域 -->
    <el-header height="64px">
      <div class="header-logo"><img src="@/assets/logo.png" alt="小马物业"></div>
      <div class="header-exit" :class="{activatedExit:isActivated}" @click="logout" @mouseover="overChangeColor" @mouseleave="leaveChangeColor">
        <i class="iconfont icon-headerAside-exit1"></i>
        <span>退出系统</span>
      </div>
    </el-header>


    <!--  页面主体区域    (内包含:侧边栏和 内容展示区main)-->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse? '64px':'200px'">
        <!--  侧边栏折叠按钮  -->
        <div class="toggle-button" @click="toggleCollapse">|||</div>

        <!-- 侧边栏的菜单-->
        <el-menu text-color="#fff" active-text-color="#fff"
                 :collapse="isCollapse" :collapse-transition="false"
                 router   default-active="/xiaoma/merchant"
                 unique-opened>
          <el-menu-item index="/xiaoma/home">
            <template slot="title">
              <i class="iconfont icon-headerAside-home"></i>
              <span>首页</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/xiaoma/merchant">
            <template slot="title">
              <i class="iconfont icon-headerAside-home"></i>
              <span>商户管理</span>
            </template>
          </el-menu-item>

          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont icon-headerAside-count"></i>
              <span>数据中心</span>
            </template>
            <el-menu-item-group>
              <span class="headerAside-menuGroup" slot="title">>>小区管理<<</span>
              <el-menu-item index="/xiaoma/count/comminuty1">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count1"></i>
                  <span>小区总数</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/xiaoma/count/comminuty2">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count2"></i>
                  <span>小区户数</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/xiaoma/count/comminuty3">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count3"></i>
                  <span>收款统计</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <span slot="title">>>楼群管理<<</span>
              <el-menu-item index="/xiaoma/count/buildings1">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count1"></i>
                  <span>楼栋总数</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/xiaoma/count/buildings2">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count2"></i>
                  <span>楼栋户数</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>

          <el-menu-item-group>
            <span slot="title">>>房屋管理<<</span>
            <el-menu-item index="/xiaoma/count/house1">
              <template slot="title">
                <i class="iconfont icon-headerAside-count1"></i>
                <span>房屋信息</span>
              </template>
            </el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <span slot="title">>>客户信息管理<<</span>
            <el-menu-item index="/xiaoma/count/tenement1">
              <template slot="title">
                <i class="iconfont icon-headerAside-count1"></i>
                <span>住户信息</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/xiaoma/count/tenement2">
              <template slot="title">
                <i class="iconfont icon-headerAside-count1"></i>
                <span>解除绑定</span>
              </template>
            </el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <span slot="title">>>车位管理<<</span>
            <el-menu-item index="/xiaoma/count/carport1">
              <template slot="title">
                <i class="iconfont icon-headerAside-count1"></i>
                <span>汽车车位</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/xiaoma/count/carport2">
              <template slot="title">
                <i class="iconfont icon-headerAside-count2"></i>
                <span>电动车位</span>
              </template>
            </el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <span slot="title">>>车两管理<<</span>
            <el-menu-item index="/xiaoma/count/car1">
              <template slot="title">
                <i class="iconfont icon-headerAside-count1"></i>
                <span>汽车信息</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/xiaoma/count/car2">
              <template slot="title">
                <i class="iconfont icon-headerAside-count1"></i>
                <span>电动车信息</span>
              </template>
            </el-menu-item>
          </el-menu-item-group>

          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="iconfont icon-headerAside-count"></i>
              <span>小区服务</span>
            </template>
            <el-menu-item-group>
              <span slot="title">>>公告管理<<</span>
              <el-menu-item index="/xiaoma/service/notice1">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count1"></i>
                  <span>公告管理1</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/xiaoma/service/notice2">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count2"></i>
                  <span>公告管理2</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <span slot="title">>>访客登记<<</span>
              <el-menu-item index="/xiaoma/service/visitor1">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count1"></i>
                  <span>访客登记1</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/xiaoma/service/visitor2">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count2"></i>
                  <span>访客登记2</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <span slot="title">>>短信管理<<</span>
              <el-menu-item index="/xiaoma/service/note1">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count1"></i>
                  <span>短信发送</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/xiaoma/service/note2">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count2"></i>
                  <span>单条发送</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/xiaoma/service/note3">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count2"></i>
                  <span>消息推送</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <span slot="title">>>投票管理<<</span>
              <el-menu-item index="/xiaoma/service/survey1">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count1"></i>
                  <span>问卷调查</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/xiaoma/service/survey2">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count2"></i>
                  <span>投票表决</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>


          <el-submenu index="4">
            <template slot="title">
              <i class="iconfont icon-headerAside-count"></i>
              <span>收费管理</span>
            </template>
            <el-menu-item-group>
              <span slot="title">>>基本收费项目<<</span>
              <el-menu-item index="/xiaoma/payment/basics1">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count1"></i>
                  <span>基本1</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/xiaoma/payment/basics2">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count2"></i>
                  <span>基本2</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <span slot="title">>>自定义收费项目<<</span>
              <el-menu-item index="/xiaoma/payment/custom1">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count1"></i>
                  <span>自定义1</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/xiaoma/payment/custom2">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count2"></i>
                  <span>自定义2</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <span slot="title">>>固定收费项目<<</span>
              <el-menu-item index="/xiaoma/payment/fixed1">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count1"></i>
                  <span>固定1</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/xiaoma/payment/fixed2">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count2"></i>
                  <span>固定2</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <span slot="title">>>扩展收费项目<<</span>
              <el-menu-item index="/xiaoma/payment/expand1">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count1"></i>
                  <span>扩展1</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/xiaoma/payment/expand2">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count2"></i>
                  <span>扩展2</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <span slot="title">>>每户每月账单<<</span>
              <el-menu-item index="/xiaoma/payment/bill1">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count1"></i>
                  <span>账单1</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/xiaoma/payment/bill2">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count2"></i>
                  <span>账单2</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <span slot="title">>>收费详情<<</span>
              <el-menu-item index="/xiaoma/payment/fee1">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count1"></i>
                  <span>单项收费</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/xiaoma/payment/fee2">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count2"></i>
                  <span>整体收费</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <span slot="title">>>预存<<</span>
              <el-menu-item index="/xiaoma/payment/prestore1">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count1"></i>
                  <span>固定费用单项预存</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/xiaoma/payment/prestore2">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count2"></i>
                  <span>其他预存</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <span slot="title">>>打印收据<<</span>
              <el-menu-item index="/xiaoma/payment/printer1">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count1"></i>
                  <span>打印1</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/xiaoma/payment/printer2">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count2"></i>
                  <span>打印2</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>


          <el-submenu index="5">
            <template slot="title">
              <i class="iconfont icon-headerAside-count"></i>
              <span>报表统计</span>
            </template>
            <el-menu-item-group>
              <span slot="title">>>房屋统计<<</span>
              <el-menu-item index="/xiaoma/charts/house1">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count1"></i>
                  <span>房屋1</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/xiaoma/charts/house2">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count2"></i>
                  <span>房屋2</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <span slot="title">>>住户统计<<</span>
              <el-menu-item index="/xiaoma/charts/tenement1">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count1"></i>
                  <span>住户统计1</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/xiaoma/charts/tenement2">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count2"></i>
                  <span>住户统计2</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <span slot="title">>>车位统计<<</span>
              <el-menu-item index="/xiaoma/charts/carport1">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count1"></i>
                  <span>汽车位</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/xiaoma/charts/carport2">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count2"></i>
                  <span>电动车位</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <span slot="title">>>车辆统计<<</span>
              <el-menu-item index="/xiaoma/charts/car1">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count1"></i>
                  <span>汽车</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/xiaoma/charts/car2">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count2"></i>
                  <span>电动车</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <span slot="title">>>工单统计<<</span>
              <el-menu-item index="/xiaoma/charts/worksheet1">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count1"></i>
                  <span>工单1</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/xiaoma/charts/worksheet2">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count2"></i>
                  <span>工单2</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <span slot="title">>>收费统计<<</span>
              <el-menu-item index="/xiaoma/charts/fee1">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count1"></i>
                  <span>应收统计</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/xiaoma/charts/fee2">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count2"></i>
                  <span>实收统计</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <span slot="title">>>欠费统计<<</span>
              <el-menu-item index="/xiaoma/charts/arrears1">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count1"></i>
                  <span>欠费1</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/xiaoma/charts/arrears2">
                <template slot="title">
                  <i class="iconfont icon-headerAside-count2"></i>
                  <span>欠费2</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>


          <el-submenu index="6">
            <template slot="title">
              <i class="iconfont icon-headerAside-count"></i>
              <span>报修管理</span>
            </template>
            <el-menu-item index="/xiaoma/repairs/register">
              <template slot="title">
                <i class="iconfont icon-headerAside-count1"></i>
                <span>维修师傅登记</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/xiaoma/repairs/repair">
              <template slot="title">
                <i class="iconfont icon-headerAside-count2"></i>
                <span>报修</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/xiaoma/repairs/repairsheet">
              <template slot="title">
                <i class="iconfont icon-headerAside-count1"></i>
                <span>维修单派发</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/xiaoma/repairs/settlement">
              <template slot="title">
                <i class="iconfont icon-headerAside-count2"></i>
                <span>维修单结算</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="7">
            <template slot="title">
              <i class="iconfont icon-headerAside-count"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/xiaoma/permission/account">
              <template slot="title">
                <i class="iconfont icon-headerAside-count1"></i>
                <span>子账号管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/xiaoma/permission/role">
              <template slot="title">
                <i class="iconfont icon-headerAside-count2"></i>
                <span>角色管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/xiaoma/permission/resource">
              <template slot="title">
                <i class="iconfont icon-headerAside-count2"></i>
                <span>资源管理</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="8">
            <template slot="title">
              <i class="iconfont icon-headerAside-count"></i>
              <span>营销活动</span>
            </template>
            <el-menu-item index="/xiaoma/marketing/member">
              <template slot="title">
                <i class="iconfont icon-headerAside-count1"></i>
                <span>会员权益</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/xiaoma/marketing/integral">
              <template slot="title">
                <i class="iconfont icon-headerAside-count2"></i>
                <span>积分商城</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/xiaoma/marketing/discounts">
              <template slot="title">
                <i class="iconfont icon-headerAside-count1"></i>
                <span>预存优惠</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="9">
            <template slot="title">
              <i class="iconfont icon-headerAside-count"></i>
              <span>智能硬件</span>
            </template>
            <el-menu-item index="/xiaoma/intelligent/charge">
              <template slot="title">
                <i class="iconfont icon-headerAside-count1"></i>
                <span>扫码充电</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/xiaoma/intelligent/guard">
              <template slot="title">
                <i class="iconfont icon-headerAside-count2"></i>
                <span>门禁系统</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/xiaoma/intelligent/signo">
              <template slot="title">
                <i class="iconfont icon-headerAside-count1"></i>
                <span>道闸系统</span>
              </template>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>

      <!--  页面内容区 main   -->
      <el-main>
        <keep-alive>
          <router-view/>
        </keep-alive>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
  export default {
    name: "HeaderAside",
    data() {
      return {
        isActivated: false,
        isCollapse: false
      }
    },
    methods: {
      logout() {
        // const { data:res } = await this.$axios.get('/ponyproperty-manager/login/logout')
        window.sessionStorage.clear();   // 清除token, 强制跳转到登录页 
        this.$router.push('/login');
      },
      overChangeColor() {
        this.isActivated = true;
      },
      leaveChangeColor() {
        this.isActivated = false;
      },
      toggleCollapse() {   // 点击按钮,折叠菜单
        this.isCollapse = !this.isCollapse
      }
    }
  }
</script>

<style scoped>
  .headerAside {height: 100%;}
  .el-header {height: 64px; width: 100%; border-bottom: 1px solid #eee; background-color: #F8F8F8; display: flex; justify-content: space-between; align-items: center;}
  .header-logo{ margin-left: 16px;}
  .header-logo img{ width: 165px;height: 45px;}
  .header-exit{ color: #666; margin-right: 35px; font-weight: 600; cursor: pointer;}
  .activatedExit{ color: #00A0E9;}


  .el-aside { width: 200px; height: 100%; background-color: #132C4B; color: #fff !important; }
  .toggle-button { background-color: rgba(192,192,192,0.1); text-align: center; line-height: 30px; font-size: 10px; cursor: pointer; letter-spacing: 2px;}

  .el-menu { border-right: none; }
  .el-menu i { color: #fff; }
  .el-submenu { background-color: #132C4B; }
  .el-submenu.is-active { background: #132C4B !important; }
  .el-submenu:hover {background-color: #132C4B !important; }
  /*.el-submenu__title:hover {background-color: #FF267e !important; }*/


  .el-menu-item-group span { color: #fff !important; }
  .el-menu-item-group { background-color: #132C4B !important; border-top: 1px solid #475e79; }
  .el-menu-item {background-color: #132C4B;}
  .el-menu-item.is-active { background-color: #00A8FF !important;}
  .el-menu-item:hover { background-color: #00A8FF !important; border-top: 1px solid #132C4B; border-bottom: 1px solid #132C4B;}



  .el-main { background-color: #eee; padding: 20px;}
</style>