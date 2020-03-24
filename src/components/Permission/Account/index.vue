<!-- 权限管理 下的账号管理页面 -->
<template>
  <main-card2 title1="权限管理" title2="账号管理">
    <div slot="content">
      <div class="account-top">
        <el-row :gutter="6">
          <el-col :span="6">
            <el-row :gutter="2">
              <el-col :span="4.5"><span>小区名称</span></el-col>
              <el-col :span="18">
                <el-select v-model="queryInfo.community" allow-create filterable clearable placeholder="全部小区">
                  <el-option
                      v-for="item in comm_options"
                      :key="item.comm_key"
                      :label="item.label"
                      :value="item.comm_key">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="5">
            <el-row :gutter="4" >
              <el-col :span="5.5"><span>姓名</span></el-col>
              <el-col :span="18">
                <el-input
                    placeholder="请输入姓名"
                    v-model="queryInfo.accountName"
                    clearable>
                </el-input>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="6">
            <el-row :gutter="2">
              <el-col :span="4.5"><span>角色</span></el-col>
              <el-col :span="18">
                <el-select v-model="queryInfo.accountRole" allow-create filterable clearable placeholder="请选择角色">
                  <el-option
                      v-for="item in role_options"
                      :key="item.role_key"
                      :label="item.label"
                      :value="item.role_key">
                  </el-option>
                </el-select>
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
        <div class="second-line">
          <el-button class="button-primary" size="small" @click="addDialogVisible = true"><i class="iconfont icon-add"></i>新建账号</el-button>
        </div>
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
            <span @click="showEditDialog(scope.row.id)" class="active-font font-primary">修改</span>
            <span @click="removeAccount(scope.row.id)" class="active-font font-warning">删除</span>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[5, 8, 15, 20, 30]"
          :page-size="queryInfo.pagesize"
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
            {required: true, message: '请输入商户ID!~', trigger: 'blur'},
            { min: 2, max: 32, message: '长度在2 ~ 32个字符之间!~',trigger: 'blur'}
          ],
          communityId: [
            {required: true, message: '请输入小区ID!~', trigger: 'blur'},
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
        
        queryInfo: {   // 获取账号信息时 传的参数对象
          query: '',   // 查询参数,
          community: '',   // 查询参数,小区
          accountName: '',   // 查询参数,账号姓名
          accountRole: '',   // 查询参数,账号角色
          pagenum: 1,   // 当前页码
          pagesize: 2,   // 当前每页显示多少条数据
        },

        comm_options:  [{   // 小区数据下拉菜单列表
          comm_key: '小区1',
          label: '一小区'
        }, {
          comm_key: '小区2',
          label: '二小区'
        }, {
          comm_key: '选项3',
          label: '三小区'
        }],
        role_options:  [{   // 角色数据下拉菜单列表
          role_key: '角色1',
          label: '小马'
        }, {
          role_key: '角色2',
          label: '账号物业'
        }, {
          role_key: '角色3',
          label: '小区'
        }],
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
      this.getAccountList()   // 调用该函数初始化账号的列表区域
      this.addForm.type = window.sessionStorage.getItem('TYPE')
      console.log(this.addForm.type)
    },


    methods: {
      async getAccountList() {   //获取账号列表
        const { data: res } =await this.$axios.post('/account/listAccount')   //,{ params: this.queryInfo}
        console.log(res)
        if(res.meta.status !==200) return this.$message.error('获取账号列表失败!~')
        this.accountList = res.data.communicates
        this.accountTotal = res.data.total
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
      handleSizeChange(newSize) {   // 分页显示: 监听pagesize改变的函数
        this.queryInfo.pagesize = newSize
        this.getAccountList()
      },
      handleCurrentChange(newPage) {   // 分页显示: 监听页码值改变的函数
        this.queryInfo.pagenum = newPage
        this.getAccountList()
      },
      addDialogClosed() {   // 监听添加账号的对话框关闭时触发的事件
        this.$refs.addFormRef.resetFields()
      },
      addAccount() {   // 点击确定按钮, 添加新账号
        this.$refs.addFormRef.validate(async (valid) => {
          console.log(this.addForm)
          if(!valid) return
          // 如果校验成功,, 可以发起网络请求. 来添加账号
          const {data:res} = await this.$axios({
            url:'/ponyproperty-manager/account/addAccount',
            method: 'post',
            transformRequest: [function (data) {
              return Qs.stringify(data)
            }],
            data: {
              accountName: this.addForm.accountName,
              communityId: this.addForm.communityId,
              merchantId: this.addForm.merchantId,
              roleId: this.addForm.roleId,
              password: this.addForm.password,
              type: this.addForm.type
            }
          })
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
  .el-row .el-col { line-height: 38px;}
  .el-row span { font-weight: 600; font-size: 14px;}
</style>