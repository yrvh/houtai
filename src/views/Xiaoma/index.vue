<template>
  <el-container class="containerXiaoma">

    <!-- 侧边栏 -->
    <el-aside :width="isCollapse? '64px':'246px'">
      <!--侧边栏小马logo-->
      <div class="aside-logo"><img src="@/assets/logo.png" alt="小马物业"></div>
      <!--  侧边栏折叠按钮  -->
      <div class="toggle-button" @click="toggleCollapse">|||</div>

      <!-- 侧边栏的菜单-->
      <el-menu text-color="#fff" active-text-color="#235FED"
               :collapse="isCollapse" :collapse-transition="false"
               router   default-active="/xiaoma/home"
               unique-opened>
        <el-menu-item index="/xiaoma/home">
          <template slot="title">
            <i class="iconfont icon-containerXiaoma-home"></i>
            <span>首页</span>
          </template>
        </el-menu-item>

        <el-menu-item index="/xiaoma/swipers">
          <template slot="title">
            <i class="iconfont icon-containerXiaoma-home"></i>
            <span>轮播图</span>
          </template>
        </el-menu-item>

        <el-submenu index="3">
          <template slot="title">
            <i class="iconfont icon-containerXiaoma-count"></i>
            <span>小区管理</span>
          </template>
          <el-menu-item index="/xiaoma/community/list">
            <template slot="title">
              <i class="iconfont icon-containerXiaoma-count1"></i>
              <span>小区列表</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/xiaoma/community/seting">
            <template slot="title">
              <i class="iconfont icon-containerXiaoma-count2"></i>
              <span>小区设置</span>
            </template>
          </el-menu-item>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="iconfont icon-containerXiaoma-count"></i>
            <span>数据管理</span>
          </template>
          <el-menu-item index="/xiaoma/datas/house">
            <template slot="title">
              <i class="iconfont icon-containerXiaoma-count1"></i>
              <span>房间信息</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/xiaoma/datas/car">
            <template slot="title">
              <i class="iconfont icon-containerXiaoma-count2"></i>
              <span>车位信息</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/xiaoma/datas/equipment">
            <template slot="title">
              <i class="iconfont icon-containerXiaoma-count2"></i>
              <span>公共设备</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/xiaoma/datas/material">
            <template slot="title">
              <i class="iconfont icon-containerXiaoma-count2"></i>
              <span>物料库存</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/xiaoma/datas/door">
            <template slot="title">
              <i class="iconfont icon-containerXiaoma-count2"></i>
              <span>门禁信息</span>
            </template>
          </el-menu-item>
        </el-submenu>

        <el-menu-item index="/xiaoma/notice">
          <template slot="title">
            <i class="iconfont icon-containerXiaoma-count1"></i>
            <span>公告管理</span>
          </template>
        </el-menu-item>

        <el-submenu index="6">
          <template slot="title">
            <i class="iconfont icon-containerXiaoma-count"></i>
            <span>账单管理</span>
          </template>
          <el-menu-item index="/xiaoma/bill/bills">
            <template slot="title">
              <i class="iconfont icon-containerXiaoma-count1"></i>
              <span>账单列表</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/xiaoma/bill/collection">
            <template slot="title">
              <i class="iconfont icon-containerXiaoma-count1"></i>
              <span>催收单</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/xiaoma/bill/check">
            <template slot="title">
              <i class="iconfont icon-containerXiaoma-count1"></i>
              <span>账单审核</span>
            </template>
          </el-menu-item>
        </el-submenu>

        <el-submenu index="7">
          <template slot="title">
            <i class="iconfont icon-containerXiaoma-count"></i>
            <span>预缴管理</span>
          </template>
          <el-menu-item index="/xiaoma/prepay/prepayment">
            <template slot="title">
              <i class="iconfont icon-containerXiaoma-count1"></i>
              <span>预缴费</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/xiaoma/prepay/payquery">
            <template slot="title">
              <i class="iconfont icon-containerXiaoma-count2"></i>
              <span>预缴查询</span>
            </template>
          </el-menu-item>
        </el-submenu>

        <el-submenu index="8">
          <template slot="title">
            <i class="iconfont icon-containerXiaoma-count"></i>
            <span>交易管理</span>
          </template>
          <el-menu-item index="/xiaoma/deal/dealpayment">
            <template slot="title">
              <i class="iconfont icon-containerXiaoma-count1"></i>
              <span>后台缴费</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/xiaoma/deal/deals">
            <template slot="title">
              <i class="iconfont icon-containerXiaoma-count2"></i>
              <span>交易列表</span>
            </template>
          </el-menu-item>
        </el-submenu>

        <el-menu-item index="/xiaoma/repair">
          <template slot="title">
            <i class="iconfont icon-containerXiaoma-count1"></i>
            <span>报修管理</span>
          </template>
        </el-menu-item>

        <el-submenu index="10">
          <template slot="title">
            <i class="iconfont icon-containerXiaoma-count"></i>
            <span>财务报表</span>
          </template>
          <el-menu-item index="/xiaoma/finance/finance1">
            <template slot="title">
              <i class="iconfont icon-containerXiaoma-count1"></i>
              <span>报表1</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/xiaoma/finance/finance2">
            <template slot="title">
              <i class="iconfont icon-containerXiaoma-count2"></i>
              <span>报表2</span>
            </template>
          </el-menu-item>
        </el-submenu>

        <el-submenu index="11">
          <template slot="title">
            <i class="iconfont icon-containerXiaoma-count"></i>
            <span>会员用户</span>
          </template>
          <el-menu-item index="/xiaoma/vip/userinfo">
            <template slot="title">
              <i class="iconfont icon-containerXiaoma-count1"></i>
              <span>用户信息</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/xiaoma/vip/bindinfo">
            <template slot="title">
              <i class="iconfont icon-containerXiaoma-count2"></i>
              <span>绑定信息</span>
            </template>
          </el-menu-item>
        </el-submenu>

        <el-submenu index="12">
          <template slot="title">
            <i class="iconfont icon-containerXiaoma-count"></i>
            <span>权限管理</span>
          </template>
          <el-menu-item index="/xiaoma/permission/account">
            <template slot="title">
              <i class="iconfont icon-containerXiaoma-count1"></i>
              <span>账号管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/xiaoma/permission/role">
            <template slot="title">
              <i class="iconfont icon-containerXiaoma-count2"></i>
              <span>角色管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/xiaoma/permission/permis">
            <template slot="title">
              <i class="iconfont icon-containerXiaoma-count2"></i>
              <span>权限管理</span>
            </template>
          </el-menu-item>
        </el-submenu>

      </el-menu>
    </el-aside>


    <!--  页面主体区域    (内包含:侧边栏和 内容展示区main)-->
    <el-container class="headerMain">
      <!-- 页面头部区域 -->
      <el-header height="76px">
        <div class="header-left">
          <i class="iconfont icon-containerXiaoma-list"></i>
          <i class="iconfont icon-containerXiaoma-refresh"></i>
        </div>
        <div class="header-right">
          <div class="header-menu">
            <i class="iconfont icon-containerXiaoma-link"></i>
            <i class="iconfont icon-containerXiaoma-fullScreen"></i>
            <i class="iconfont icon-containerXiaoma-share"></i>
            <i class="iconfont icon-containerXiaoma-help"></i>
            <i class="iconfont icon-containerXiaoma-hint"></i>
          </div>
          <div class="header-admin">
            <i class="iconfont icon-containerXiaoma-avatar"></i>
            <span>admin</span>
            <i class="iconfont icon-containerXiaoma-arrows"></i>
          </div>
        </div>
        <!--<div class="header-exit" :class="{activatedExit:isActivated}" @click="logout" @mouseover="overChangeColor" @mouseleave="leaveChangeColor">-->
          <!--<i class="iconfont icon-containerXiaoma-exit1"></i>-->
          <!--<span>退出系统</span>-->
        <!--</div>-->
      </el-header>

      <!--页面内容区 main-->
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
    name: "containerXiaoma",
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
  .containerXiaoma  {height: 100%;}
  .el-aside { width: 246px; height: 100%; background-color: #235FED; color: #fff !important; }
  .aside-logo{ width: 100%; }
  .aside-logo img{ margin: 20px auto;width: 74px;height: 65px;}
  .toggle-button { margin-top: 30px; background-color: rgba(192,192,192,0.2); text-align: center; line-height: 30px; font-size: 10px; cursor: pointer; letter-spacing: 2px;}

  .el-menu { border-right: none; }
  .el-menu i { color: #fff; }
  .el-submenu { background-color: #235FED; }
  /*.el-submenu.is-active { color:#ff0 !important; }*/
  /*.el-submenu:hover { color:#F00 !important; }*/
  /*.el-submenu__title:hover {background-color: #F00 !important; }*/
  /*.el-menu-item-group span { color: #fff !important; }*/
  /*.el-menu-item-group { background-color: #132C4B !important; border-top: 1px solid #475e79; }*/
  .el-menu-item { background-color: #235FED; }
  .el-menu-item.is-active { background-color: #FFF !important; color: #235FED !important; }
  .el-menu-item.is-active i{ color: #235FED !important; }
  .el-menu-item:hover { font-weight: bolder !important; }

  .headerMain { width: 100%; height: 100%;}
  .el-header { height: 76px; width: 100%; border-bottom: 1px solid #eee; background-color: #FFF; display: flex; justify-content: space-between; align-items: center; padding: 0 20px;}
  .header-left { color: #333; line-height: 38px; }
  .header-left i {margin-right: 30px; cursor: pointer; font-size: 22px;}

  /*.header-right {background-color: crimson; }*/
  .header-menu { color: #ccc; line-height: 38px; float: left;}
  .header-menu i {margin-left: 30px; cursor: pointer; font-size: 20px;}
  .header-admin { line-height: 38px; margin-left:20px; float: right; cursor: pointer;}
  .header-admin i{ font-size: 20px; color: #ccc; margin: 0 0 0 5px;}
  .header-admin span{ color: #999; margin-left: 10px;}

  .el-main { background-color: #eee; padding: 20px; }
</style>