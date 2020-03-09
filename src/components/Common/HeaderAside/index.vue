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
        <el-menu text-color="#fff" active-text-color="#fff" :collapse="isCollapse" :collapse-transition="false" router>
          <el-menu-item index="/home">
            <template slot="title">
              <i class="iconfont icon-headerAside-home"></i>
              <span>首页</span>
            </template>
          </el-menu-item>

          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont icon-headerAside-count"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="/count/1">
              <template slot="title">
                <i class="iconfont icon-headerAside-count1"></i>
                <span>小区总数</span>
              </template>
            </el-menu-item>
            <el-menu-item index="2-2">
              <template slot="title">
                <i class="iconfont icon-headerAside-count2"></i>
                <span>小区户数</span>
              </template>
            </el-menu-item>
            <el-menu-item index="2-3">
              <template slot="title">
                <i class="iconfont icon-headerAside-count3"></i>
                <span>收款统计</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-menu-item index="3">
            <template slot="title">
              <i class="iconfont icon-headerAside-notice"></i>
              <span>公告管理</span>
            </template>
          </el-menu-item>

          <el-submenu index="4">
            <template slot="title">
              <i class="iconfont icon-headerAside-clientInfo"></i>
              <span>客户信息管理</span>
            </template>
            <el-menu-item index="4-1">
              <template slot="title">
                <i class="iconfont icon-headerAside-clientInfo1"></i>
                <span>住户档案管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="4-2">
              <template slot="title">
                <i class="iconfont icon-headerAside-clientInfo2"></i>
                <span>解除绑定</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="iconfont icon-headerAside-payment"></i>
              <span>费用信息管理</span>
            </template>
            <el-menu-item index="5-1">
              <template slot="title">
                <i class="iconfont icon-headerAside-payment1"></i>
                <span>余额管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="5-2">
              <template slot="title">
                <i class="iconfont icon-headerAside-payment2"></i>
                <span>缴费管理</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-menu-item index="6">
            <template slot="title">
              <i class="iconfont icon-headerAside-repairs"></i>
              <span>故障保修</span>
            </template>
          </el-menu-item>

          <el-submenu index="7">
            <template slot="title">
              <i class="iconfont icon-headerAside-user"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="7-1">
              <template slot="title">
                <i class="iconfont icon-headerAside-user1"></i>
                <span>账号管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="7-2">
              <template slot="title">
                <i class="iconfont icon-headerAside-user2"></i>
                <span>角色管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="7-3">
              <template slot="title">
                <i class="iconfont icon-headerAside-user3"></i>
                <span>维修工人管理</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="8">
            <template slot="title">
              <i class="iconfont icon-headerAside-approval"></i>
              <span>审批管理</span>
            </template>
            <el-menu-item index="8-1">
              <template slot="title">
                <i class="iconfont icon-headerAside-approval1"></i>
                <span>账单修改审批</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="9">
            <template slot="title">
              <i class="iconfont icon-headerAside-note"></i>
              <span>短信管理</span>
            </template>
            <el-menu-item index="9-1">
              <template slot="title">
                <i class="iconfont icon-headerAside-note1"></i>
                <span>短信发送</span>
              </template>
            </el-menu-item>
            <el-menu-item index="9-2">
              <template slot="title">
                <i class="iconfont icon-headerAside-note2"></i>
                <span>单条发送</span>
              </template>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>

      <!--  页面内容区 main   -->
      <el-main>main   ===这是展示区===<slot/> </el-main>
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
        window.sessionStorage.clear();
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


  .el-aside { width: 200px; height: 100%; background-color: #132C4B; color: #fff;}
  .toggle-button { background-color: rgba(192,192,192,0.1); text-align: center; line-height: 30px; font-size: 10px; cursor: pointer; letter-spacing: 2px;}

  .el-menu { border-right: none; }
  .el-menu i { color: #fff; }
  .iconfont { margin-right: 10px; }
  .el-submenu { background-color: #132C4B; }
  .el-submenu.is-active { background: #132C4B !important; }
  .el-submenu:hover {background-color: #132C4B !important; }
  /*.el-submenu__title:hover {background-color: #FF267e !important; }*/

  .el-menu-item {background-color: #132C4B;}
  .el-menu-item.is-active { background-color: #00A8FF !important;}
  .el-menu-item:hover { background-color: #00A8FF !important; border-top: 1px solid #132C4B; border-bottom: 1px solid #132C4B;}



  .el-main { background-color: #eee; padding: 20px;}
</style>