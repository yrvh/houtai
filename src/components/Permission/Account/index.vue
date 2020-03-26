<!-- 权限管理 下的账号管理页面 -->
<template>
  <main-card2 title1="权限管理" title2="账号管理">
    <div slot="content">
      <div class="account-top">
        <el-row :gutter="2">
          <el-col :span="7">
            <el-row :gutter="2">
              <el-col :span="5"><span>账号ID</span></el-col>
              <el-col :span="17">
                <el-input
                    placeholder="请输入账号ID"
                    v-model="queryInfo.accountId"
                    clearable
                    @clear="getAccountList">
                </el-input>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="2">
            <el-button class="button-warning search-button" @click="getAccountList">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button class="button-info reset-button" @click="resetAccountList(queryInfo)">重置</el-button>
          </el-col>
        </el-row>
        <el-button class="account-add button-primary" size="small" @click="addDialogVisible = true"><i class="iconfont icon-add"></i>新建账号</el-button>
      </div>


      <!--   账号列表展示区   -->
      <el-table :data="accountList" stripe :header-cell-style="getRowClass">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="账户名" prop="name"></el-table-column>
        <el-table-column label="密码" prop="address"></el-table-column>
        <el-table-column label="角色" prop="address"></el-table-column>
        <el-table-column label="创建时间" prop="address"></el-table-column>
        <el-table-column label="操作" min-width="100px">
          <template slot-scope="scope">
            <span @click="showDetailDialog(scope.row)" class="active-font font-success">详情?</span>
            <span @click="showEditDialog(scope.row.id)" class="active-font font-primary">修改密码</span>
            <span @click="" class="active-font font-success">重置密码</span>
            <span @click="removeAccount(scope.row.id)" class="active-font font-warning">删除</span>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageNo"
          :page-sizes="[5, 8, 15, 20, 30]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="accountTotal">
      </el-pagination>
    </div>

    <!--  这是添加账号的 对话框  -->
    <el-dialog title="添加账号" :visible.sync="addDialogVisible" width="40%" @close="addDialogClosed">

      <el-form :model="addForm" :rules="formRules" ref="addFormRef" label-width="90px">
        <el-form-item label="账号名称" prop="accountName">
          <el-input v-model="addForm.accountName"></el-input>
        </el-form-item>
        <el-form-item label="物业ID" prop="merchantId">
          <el-input v-model="addForm.merchantId"></el-input>
        </el-form-item>
        <el-form-item label="小区ID" prop="communityId">
          <el-input v-model="addForm.communityId"></el-input>
        </el-form-item>
        <el-form-item label="角色ID" prop="roleId">
          <el-input v-model="addForm.roleId"></el-input>
        </el-form-item>
        <el-form-item label="账号密码" prop="password">
          <el-input v-model="addForm.password" type="password"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button class="button-primary" @click="addAccount">确 定</el-button>
        <el-button class="button-info" @click="addDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <!--  修改账号的 对话框 -->
    <el-dialog title="修改账号信息" :visible.sync="editDialogVisible" width="40%" @close="editDialogClosed">

      <el-form :model="editform" :rules="formRules" ref="editformRef" label-width="80px">
        <el-form-item label="账号ID" prop="accountName">
          <el-input v-model="editform.accountName" disabled></el-input>
        </el-form-item>
        <el-form-item label="原密码" prop="password">
          <el-input v-model="editform.oldPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="editform.newPassword" type="password"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button class="button-primary" @click="editAccount">确 定</el-button>
        <el-button class="button-info" @click="editDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </main-card2>
</template>

<script>
  import Qs from 'qs'
  export default {
    name: "Account",
    components:{},
    data() {
      // 自定义手机号校验规则
      var checkMobile = (rule, value, cb) => {
        const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/   //电话号码的 正则
        if(regMobile.test(value)) return cb()
        cb(new Error('请输入合法的手机号!~'))
      }
      // 自定义邮箱校验
      var checkEmail = (rule, value, cb) => {
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        if(regEmail.test(value)) return cb()
        cb(new Error('请输入合法的邮箱!~'))
      }
      return {
        formRules: {   //  格式校验
          accountName: [
            {required: true, message: '请输入账号名!~', trigger: 'blur'},
            { min: 3, max: 30, message: '长度在3 ~ 30个字符之间!~',trigger: 'blur'}
          ],
          merchantId: [
            {required: false, message: '请输入商户ID!~', trigger: 'blur'},
            { min: 2, max: 32, message: '长度在2 ~ 32个字符之间!~',trigger: 'blur'}
          ],
          communityId: [
            {required: false, message: '请输入小区ID!~', trigger: 'blur'},
            { min: 1, max: 32, message: '长度在1 ~ 32个字符之间!~',trigger: 'blur'}
          ],
          roleId: [
            {required: true, message: '请输入账号角色ID!~', trigger: 'blur'},
            { min: 3, max: 11, message: '长度在2 ~ 11个字符之间!~',trigger: 'blur'}
          ],
          password:[
            {required:true, message: '请输入账号密码!~',trigger: 'blur'},
            { min: 5, max: 32, message: '长度在5 ~ 32个字符之间!~',trigger: 'blur'}
          ],
          email: [
            { required: false, message: '请输入联系人!~', trigger: 'blur'},
            // { validator: checkEmail, trigger: 'blur'}
          ],
          phone: [
            {required: false, message: '请输入联系电话!~', trigger: 'blur'},
            // { validator: checkMobile, trigger: 'blur'}
          ]
        },
        
        queryInfo: {
          accountId: '',
          pageNo: 1,   // 当前页码
          pageSize: 5,   // 当前每页显示多少条数据
        },
        accountList: [],   // 存储请求回来的 账号列表
        accountTotal: 0,   // 账号列表的总数
        
        addDialogVisible: false,   // 该属性控制 添加账号这个对话框的显隐
        addForm: {   // 添加账号时的表单信息
          accountName: '',
          merchantId: '',
          communityId: '',
          roleId: '',
          password:'',
          email: '',
          phone: null,
          type: null
        },
        
        editDialogVisible: false,   // 控制修改 对话框的显隐
        editform: {   // 修改账号时的表单信息
          accountId: '',
          newPassword: '',
          oldPassword: '',
        },
        
      }
    },
    created() {   // 生命周期函数, 用于初始化页面
      this.addForm.type = window.sessionStorage.getItem('TYPE')
      this.getAccountList()   // 调用该函数初始化账号的列表区域
    },


    methods: {
      async getAccountList() {   //获取账号列表
        const { data:res } =await this.$axios({
          url:'/ponyproperty-manager/account/listAccount',
          method: 'post',
          transformRequest: [function (data) {
            return Qs.stringify(data)
          }],
          data: {
            aid: this.queryInfo.accountId
          }
        })
        console.log(res)
        if(res.code =='3000') return this.$message.warning('账号列表无数据!~')
        else if(res.msg !== 'OK') return this.$message.error('获取账号列表失败!~')
        else {
          this.accountList = res.data
          this.accountTotal = res.data.length || 0
        }
      },
      resetAccountList(obj){   // 点击重置按钮时触发的事件
        this.clearObj(obj)   // 调用全局函数清空对象
        this.getAccountList()
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {   // 设置table第一行的背景色
        if(rowIndex == 0) {
          return 'background:#f0f2f5'
        }
        else { return ''}
      },
      handleSizeChange(newSize) {   // 分页显示: 监听pageSize改变的函数
        this.queryInfo.pageSize = newSize
        this.getAccountList()
      },
      handleCurrentChange(newPage) {   // 分页显示: 监听页码值改变的函数
        this.queryInfo.pageNo = newPage
        this.getAccountList()
      },
      addDialogClosed() {   // 监听添加账号的对话框关闭时触发的事件
        this.$refs.addFormRef.resetFields()
      },
      addAccount() {   // 点击确定按钮, 添加新账号
        this.$refs.addFormRef.validate(async (valid) => {
          if(!valid) return
          // 如果校验成功,, 可以发起网络请求. 来添加账号
          const {data:res} = await this.$axios({
            url:'/ponyproperty-manager/account/addAccount',
            method: 'post',
            transformRequest: [function (data) {
              console.log(data)
              return Qs.stringify(data)
            }],
            data: {
              accountName: this.addForm.accountName,
              communityId: this.addForm.communityId,
              merchantId: this.addForm.merchantId,
              roleId: this.addForm.roleId,
              password: this.addForm.password,
              type: 2
            }
          })
          console.log(res)
          if(res.msg!=='OK') return this.$message.error('添加账号失败!~')
          this.$message.success('添加账号成功!~')
          this.addDialogVisible = false   // 隐藏对话框
          this.getAccountList()   // 重新请求最新数据, 重新渲染页面
        })
      },

      showEditDialog(id) {   // 点击修改按钮, 展示修改页
        this.editform.accountId = id
        console.log(id)
        this.editDialogVisible = true
      },
      editDialogClosed() {   // 监听对话框关闭事件
        this.$refs.editformRef.resetFields()
      },
      editAccount() {   // 点击确定按钮, 修改账号  发起Ajax请求-----------???
        this.$refs.editformRef.validate(async (valid) => {
          if (!valid) return
          console.log('修改后的editform',this.editform)
          console.log(this.editform.concatPhone)
          console.log(this.editform.accountId)
          const {data:res} =await this.$axios({
            url:'/ponyproperty-manager/account/updateaccount',
            method: 'post',
            transformRequest: [function (data) {
              return Qs.stringify(data)
            }],
            data: {
              concatName: this.editform.concatName,
              concatPhone: this.editform.concatPhone,
              accountId: this.editform.accountId,
              accountName: this.editform.accountName
            }
          })
          if(res.msg !=='OK') return this.$message.error('修改账号信息失败!~')
          this.editDialogVisible = false
          this.getAccountList()   // 重新请求最新数据, 重新渲染页面
          this.$message.success('修改账号信息成功!~')
        })
      },
      //======================================================================删除
      async removeAccount() {   // 删除一条帐户, 触发的函数
        // 弹框询问用户是否确认删除
        console.log("点击了删除")
        const confirmResult = await this.$confirm('此操作将永久删除该账号, 是否继续?','提示',{
          confirmButtonText: '确定',
          confirmButtonClass: 'button-primary',
          cancelButtonText: '取消',
          cancelButtonClass: 'button-info',
          type: 'warning'
        }).catch( err => {return err})
        if(confirmResult !== 'confirm'){
          return this.$message.info('已取消了删除!~~')
        }
        const {data:res} =await this.$axios({   // 发起Ajax请求-----------???
          url:'/ponyproperty-manager/account/deleteaccount',
          method: 'post',
          transformRequest: [function (data) {
            return Qs.stringify(data)
          }],
          data: { accountId: this.editform.accountId }
        })
        if(res.msg !=='OK') return this.$message.error('删除账号信息失败!~')
        this.getAccountList()   // 重新获取账号列表
        this.$message.success('删除账号成功!~')
      },
      showDetailDialog() {   // 点击详情时的,处理函数
        console.log('点击了详情')
      }
    }
  }
</script>

<style scoped>
  .account-top { position: relative; }
  .account-add { position: absolute; right: 0; top: 0;}

  .el-row .el-col { line-height: 38px;}
  .el-row span { font-weight: 600; font-size: 14px;}
</style>