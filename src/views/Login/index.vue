<template>
  <div class="login-container">
    <div class="login-box" @dblclick="resetLoginForm">
      <div class="login-avatar">
        <img src="../../../public/img/avatar.png" alt="">
      </div>
      <!-- 登录表单区域-->
      <div class="login-content">
        <div class="login-title">小马物业后台管理系统</div>
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login-form">
          <el-form-item prop="username">账号
            <el-input v-model="loginForm.username"
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
  export default {
    name: "Login",
    data() {
      return {
        loginForm: {
          username: "",
          password: ""
        },
        loginFormRules: {
          username: [
            { required: true, message: '请输入登录账号!~', trigger: 'blur'},
            { min: 5, max: 20, message: '长度在5 ~ 20个字符之间!~',trigger: 'blur'}
          ],
          password: [
            { required: true, message: '请输入登录密码!~', trigger: 'blur'},
            { min: 5, max: 20, message: '长度在8 ~ 32个字符之间!~',trigger: 'blur'}
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
          const res =await this.$axios.post("/api/loginInfo",this.loginForm)
          //const {data: res2} =await this.$axios.post("/api/loginInfo",this.loginForm)  后端接口文档写好后用这个
          if(res.status !== 200) return this.$message.error('登录失败!~')
          this.$message.success('登录成功!~')
          console.log(res)
          window.sessionStorage.setItem('token',99)   // 将token存储在本地
          this.$router.push('/home')   // 编程式导航
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