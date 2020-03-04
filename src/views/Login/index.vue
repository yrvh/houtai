<el-submenu index="2">
  <template slot="title">
    <i class="iconfont icon-containerXiaoma-count"></i>
    <span>小区管理</span>
  </template>
  <el-menu-item index="/xiaoma/count/comminuty1">
    <template slot="title">
      <i class="iconfont icon-containerXiaoma-count1"></i>
      <span>小区列表</span>
    </template>
  </el-menu-item>
  <el-menu-item index="/xiaoma/count/comminuty2">
    <template slot="title">
      <i class="iconfont icon-containerXiaoma-count2"></i>
      <span>小区设置</span>
    </template>
  </el-menu-item>
</el-submenu>


<template>
  <div class="login-container">
    <div class="login-box" @dblclick="resetLoginForm">
      <div class="login-avatar">
        <img src="../../../public/img/avatar.png" alt="头像">
      </div>
      <!-- 登录表单的区域-->
      <div class="login-content">
        <div class="login-title">小马物业后台管理系统</div>
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login-form">
          <el-form-item prop="account_name">账号
            <el-input v-model="loginForm.account_name"
                      placeholder="请输入账号"
                      prefix-icon="iconfont icon-login-account"></el-input>
          </el-form-item>

          <el-form-item prop="password">密码
            <el-input v-model="loginForm.password"
                      placeholder="请输入密码"
                      prefix-icon="iconfont icon-login-password"
                      suffix-icon="iconfont icon-login-eye"
                      type="password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="login" class="login-btn">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import Qs from 'qs'
  export default {
    name: "Login",
    data() {
      return {
        loginForm: {
          account_name: "",
          password: ""
        },
        loginFormRules: {
          account_name: [
            { required: true, message: '请输入登录账号!~', trigger: 'blur'},
            { min: 5, max: 24, message: '长度在5 ~ 24个字符之间!~',trigger: 'blur'}
          ],
          password: [
            { required: true, message: '请输入登录密码!~', trigger: 'blur'},
            { min: 6, max: 32, message: '长度在6 ~ 32个字符之间!~',trigger: 'blur'}
          ],
        },
      }
    },
    methods: {
      resetLoginForm() {
        this.$refs.loginFormRef.resetFields()
      },
      login() {
        this.$refs.loginFormRef.validate( async (valid)=> {
          if(!valid) return
          //const { data:res } = await this.$axios.post('/ponyproperty-manager/login/login',this.loginForm)   // 参数格式是json
          const {data: res} = await this.$axios({   // 保持参数格式  'Content-Type': 'application/x-www-form-urlencoded'
            url: '/ponyproperty-manager/login/login',
            method: 'post',
            transformRequest: [function (data) {
              return Qs.stringify(data)
            }],
            data: {
              account_name: this.loginForm.account_name,
              password: this.loginForm.password
            }
          })
          if(res.msg !== 'OK') return this.$message.error('登录失败!~')
          this.$message.success('登录成功!~')

          console.log("小马的数据:")
          console.log(res)
          // window.sessionStorage.setItem('token',99)   // 将token存储在本地
          this.$router.push('/xiaoma/merchant')   // 编程式导航
        })
      },
    },
  }
</script>

<style scoped>
  .login-container {height: 100%; background: rgba(0,0,0,0) url("../../../public/img/loginBG.png") no-repeat scroll;background-size:100% 100%; display: flex;justify-content: center; align-items: center;}
  .login-box {width: 350px; height: 420px; border-radius: 3px; background-color: rgba(50,50,50,0.7);}
  .login-avatar {width:99px; height: 99px; border: 1px solid #f8f8f8; border-radius: 50%; padding: 1px;box-shadow: 0 0 10px #ddd; position: absolute;left: 50%;transform: translate(-50%,-50%)}
  .login-avatar img{width: 100%; height: 100%; border-radius: 50%;}
  .login-content {width: 270px; margin: 84px auto; color: #fff; font-size: 24px;}
  .login-title {text-align: center; font-weight: 600;}
  .login-form { color: #FFF;}
  .login-input { background-color: rgba(0,0,0,0);}
  .login-btn { background-color: #FF267e; width: 100%; height: 40px; border-radius: 20px; border: none;}
</style>