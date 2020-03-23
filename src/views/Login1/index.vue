<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-info" @dblclick="resetLoginForm">
        <!--  头像区域  -->
        <div class="login-avatar">
          <img src="../../../public/img/avatar.png" alt="头像">
        </div>
        <!-- 登录表单的区域-->
        <div class="login-content">
          <div class="login-title">小马物业后台管理系统</div>
          <div class="login-user">用户登录</div>
          <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login-form">
            <el-form-item prop="account_name">
              <el-input v-model="loginForm.account_name" placeholder="账号" clearable
                        prefix-icon="iconfont icon-login-account"></el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input v-model="loginForm.password" placeholder="密码"
                        prefix-icon="iconfont icon-login-password"
                        :suffix-icon="eye_value"
                        :type="eye_open? 'text':'password'"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="login" class="login-btn">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 单击眼睛 -->
        <div class="eye-off" @click="eyeOff"></div>
      </div>

      <!-- 版权 -->
      <div class="copyright">
        <div>本系统由广西山园科技提供技术支持</div>
        <div>Copyright &copy; 2018-2020 &nbsp;&nbsp;广西山园信息科技有限公司&nbsp;&nbsp;版权所有</div>
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
        eye_open: false,   // 控制密码的显隐
        eye_value: 'iconfont icon-login-eyeoff'

      }
    },
    methods: {
      eyeOff() {  // 控制密码显隐的函数
        this.eye_open = !this.eye_open
        this.eye_open? this.eye_value='iconfont icon-login-eye': this.eye_value='iconfont icon-login-eyeoff'
      },
      resetLoginForm() {   // 双击登录框重置表单
        // this.$refs.loginFormRef.resetFields()
      },
      login() {   // 登录,发起Ajax请求
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
          // window.sessionStorage.setItem('token',99)   // 将token存储在本地
          this.$router.push('/xiaoma/permission/account')   // 编程式导航
          window.sessionStorage.setItem('TYPE',res.data.type)
          window.sessionStorage.setItem('GRADE',res.data.grade)
        })
      },
    },
  }
</script>

<style scoped>
  .login-container {height: 100%; background: rgba(0,0,0,0) url("../../../public/img/loginBG1.png") no-repeat scroll;background-size:100% 100%; display: flex;justify-content: flex-end; align-items: center;}

  .login-box { position: relative; right: 100px;}
  .login-info { width: 400px; height: 502px; border-radius: 4px; background-color: rgba(154,191,246,.9); position: relative; }
  .login-avatar { width:90px; height: 90px; border: 1px solid #f8f8f8; border-radius: 50%; padding: 1px;box-shadow: 0 0 10px #97B6FE; position: absolute;left: 50%;transform: translate(-50%,-50%)}
  .login-avatar img{ width: 100%; height: 100%; border-radius: 50%;}

  .login-content { width: 320px; margin: 0 auto; color: #333; font-size: 24px;}
  .login-title { text-align: center; font-size: 30px; font-weight: 700; line-height: 150px; }
  .login-user { font-size: 16px; text-indent:20px; font-weight: 600; margin-bottom: 30px; }
  .el-input__inner { height:50px !important; line-height:50px !important; border-radius:24px !important; }
  .login-btn { background-color: #235FED; width: 100%; height: 50px; border-radius: 25px; border: none; margin-top: 64px; }
  .eye-off { width: 22px; height: 38px; position: absolute; right: 51px;bottom: 200px; background-color: transparent; cursor: pointer; }

  .copyright { margin-top:24px; height: 40px; width: 100%; font-size: 12px; color: #333; display: flex; flex-direction: column; justify-content: space-between; align-items: center; }

</style>