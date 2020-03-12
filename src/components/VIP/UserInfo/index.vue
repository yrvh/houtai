<!-- 会员用户下的  用户信息页面-->
<template>
  <main-card2 title1="会员用户" title2="用户信息">
    <div slot="content">
      <div class="account-top">
        <el-row :gutter="8">
          <el-col :span="6">
            <el-row :gutter="2">
              <el-col :span="4.5"><span>小区名称</span></el-col>
              <el-col :span="18">
                <el-select v-model="value" allow-create filterable clearable placeholder="全部小区">
                  <el-option-group
                      v-for="group in merchantGroups"
                      :key="group.label"
                      :label="group.label">
                    <el-option
                        v-for="item in group.options"
                        :key="item.communityKey"
                        :label="item.label"
                        :value="item.communityKey">
                    </el-option>
                  </el-option-group>
                </el-select>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="8">
            <el-row :gutter="10">
              <el-col :span="4.5"><span>房间号</span></el-col>
              <el-col :span="6">
                <el-select v-model="value" allow-create filterable clearable placeholder="楼号">
                  <el-option
                      v-for="item in repairTypeOptions"
                      :key="item.repairKey"
                      :label="item.label"
                      :value="item.repairKey">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select v-model="value" allow-create filterable clearable placeholder="单元">
                  <el-option
                      v-for="item in repairTypeOptions"
                      :key="item.repairKey"
                      :label="item.label"
                      :value="item.repairKey">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select v-model="value" allow-create filterable clearable placeholder="房间">
                  <el-option
                      v-for="item in repairTypeOptions"
                      :key="item.repairKey"
                      :label="item.label"
                      :value="item.repairKey">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="5">
            <el-row :gutter="4">
              <el-col :span="5.5"><span>业主姓名</span></el-col>
              <el-col :span="17">
                <el-input
                    placeholder="请输入业主姓名"
                    v-model="manValue"
                    clearable>
                </el-input>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="2">
            <el-button type="danger" class="account-search account-button" @click="getCommunicateList">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="info" class="account-clear account-button" @click="getCommunicateList">重置</el-button>
          </el-col>
        </el-row>
        <div class="account-add">
          <el-button type="primary" size="small" @click="addDialogVisible = true"><i class="iconfont icon-add"></i>新建账号</el-button>
        </div>
      </div>


      <!--   账号列表展示区   -->
      <el-table :data="accountList" stripe :header-cell-style="getRowClass">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="用户名" prop="account_name"></el-table-column>
        <el-table-column label="姓名" prop="account_password"></el-table-column>
        <el-table-column label="身份" prop="role_name"></el-table-column>
        <el-table-column label="房间号" prop="ctime"></el-table-column>
        <el-table-column label="手机号" prop="ctime"></el-table-column>
        <el-table-column label="注册时间" prop="ctime"></el-table-column>
        <el-table-column label="操作" min-width="120px">
          <template slot-scope="scope">
            <click-span @click="showEditDialog(scope.row.id)" content1="详情"></click-span>
            <click-span @click="showRegDialog(scope.row.account_id)" content1="修改"></click-span>
            <click-span @click="showEditDialog(scope.row.id)" content1="删除"></click-span>
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
          :total="total">
      </el-pagination>
    </div>

    <!--  这是添加账户的 对话框  -->
    <el-dialog title="添加账户公司" :visible.sync="addDialogVisible" width="40%" @close="addDialogClosed">

      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
        <el-form-item label="账户名称" prop="account_name">
          <el-input v-model="addForm.account_name"></el-input>
        </el-form-item>
        <el-form-item label="商户ID" prop="account_id">
          <el-input v-model="addForm.account_id"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="concat_name">
          <el-input v-model="addForm.concat_name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="concat_phone">
          <el-input v-model="addForm.concat_phone" ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button @click="addaccount" type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <!--  修改账户的 对话框 -->
    <el-dialog title="修改账户信息" :visible.sync="editDialogVisible" width="40%" @close="editDialogClosed">

      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">
        <el-form-item label="账户名称">
          <el-input v-model="editForm.account_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="商户ID">
          <el-input v-model="editForm.account_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="concat_name">
          <el-input v-model="editForm.concat_name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="concat_phone">
          <el-input v-model="editForm.concat_phone" ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="editDialog-footer">
        <el-button @click="editDialogVisible = false" type="primary" plain class="editDialog-footer-cancel">取 消</el-button>
        <el-button @click="editaccount" type="primary" class="editDialog-footer-sure">确 定</el-button>
        <el-button @click="delAccount" type="danger" plain class="editDialog-footer-del">删 除</el-button>
      </span>
    </el-dialog>

    <!--   注册账号的对话框 -->
    <el-dialog title="注册账号" :visible.sync="regDialogVisible" width="40%" @close="regDialogClosed">

      <el-form :model="regForm" :rules="regFormRules" ref="regFormRef" label-width="90px">
        <el-form-item label="商户ID">
          <el-input v-model="regForm.account_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="商户账号" prop="account_name">
          <el-input v-model="regForm.account_name"></el-input>
        </el-form-item>
        <el-form-item label="账号密码" prop="password">
          <el-input v-model="regForm.password"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="regForm.phone" ></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="regForm.email"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="regDialogVisible = false">取 消</el-button>
        <el-button @click="regAccount" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </main-card2>
</template>

<script>
  import Qs from 'qs'

  export default {
    name: "UserInfo",
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
        value: '',   //绑定当前被选中的小区
        merchantGroups: [   // 物业分组数据
          {label: '--同盛物业--',
            options: [{
              communityKey: '选项1',
              label: '银河产业城'
            }, {
              communityKey: '选项2',
              label: '恒大名都'
            }, {
              communityKey: '选项3',
              label: '大度金沙湾'
            }, {
              communityKey: '选项4',
              label: '三千海'
            }, {
              communityKey: '选项5',
              label: '碧桂园'
            }]
          },
          {label: '--小海物业--',
            options: [{
              communityKey: '选项6',
              label: '大山花园'
            }, {
              communityKey: '选项7',
              label: '世纪城'
            }, {
              communityKey: '选项8',
              label: '文邦国际'
            }, {
              communityKey: '选项9',
              label: '翰林苑'
            }, {
              communityKey: '选项10',
              label: '桐洋新城'
            }]
          }
        ],
        dateValue: '',   // 报修日期
        manValue: '',   // 报修人
        accountValue: '',   // 报修类型
        accountTypeOptions: [{   // 报修类型选项
          accountKey: '选项1',
          label: '类型1'
        }, {
          accountKey: '选项2',
          label: '类型2'
        }, {
          accountKey: '选项3',
          label: '类型3'
        }, {
          accountKey: '选项4',
          label: '类型4'
        }, {
          accountKey: '选项5',
          label: '类型5'
        }],
        //============================================================================================
        queryInfo: {   // 这是渲染table表格, 给后端接口传递的参数.   现在的接口暂时不需要传参
          query: '',
          pagenum: 1,
          pagesize: 6,
        },
        accountList: [],   // 存储请求回来的 账户列表
        total: 0,   // 商户列表的总数
        addDialogVisible: false,   // 该属性控制 添加账户这个对话框的显隐
        addForm: {
          account_name: '',
          account_id: '',
          concat_name: '',
          concat_phone: ''
        },
        addFormRules: {   // 添加账户时的 格式校验
          account_name: [
            {required: true, message: '请输入账户名字!~', trigger: 'blur'},
            { min: 2, max: 15, message: '长度在2 ~ 15个字符之间!~',trigger: 'blur'}
          ],
          account_id: [
            {required: true, message: '请输入账户appID!~', trigger: 'blur'},
            { min: 2, max: 32, message: '长度在2 ~ 32个字符之间!~',trigger: 'blur'}
          ],
          concat_name: [
            { required: false, message: '请输入联系人!~', trigger: 'blur'},
            { min: 2, max: 15, message: '长度在2 ~ 15个字符之间!~',trigger: 'blur'}
            // { validator: checkMobile, trigger: 'blur'}
          ],
          concat_phone: [
            {required: false, message: '请输入联系电话!~', trigger: 'blur'},
            { validator: checkMobile, trigger: 'blur'}
          ]
        },

        editFormRules: {   //修改账户时的格式校验
          concat_name: [
            { required: false, message: '请输入联系人!~', trigger: 'blur'},
            { min: 2, max: 15, message: '长度在2 ~ 15个字符之间!~',trigger: 'blur'}
          ],
          concat_phone: [
            {required: false, message: '请输入联系电话!~', trigger: 'blur'},
            { validatot: checkMobile,trigger: 'blur'}
          ]
        },
        editDialogVisible: false,   // 控制修改 对话框的显隐
        editForm: { },   // 修改账户时,用于接收 将要修改的账户的信息


        regForm: {   // 注册账号时, 用于存储注册表的数据
          account_id: '',
          account_name: '',
          password: '',
          phone: '',
          email: '',
          type: this.account_id==''? 3:2,
          grade: 1,
        },
        regFormRules: {   // 注册账号时的 格式校验
          account_name: [
            {required: true, message: '请输入账户名字!~', trigger: 'blur'},
            { min: 2, max: 30, message: '长度在2 ~ 30个字符之间!~',trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入账户密码!~', trigger: 'blur'},
            { min: 2, max: 32, message: '长度在2 ~ 32个字符之间!~',trigger: 'blur'}
          ],
          phone: [
            {required: false, message: '请输入联系电话!~', trigger: 'blur'},
            { validator: checkMobile, trigger: 'blur'}
          ],
          email: [
            { required: false, message: '请输入邮箱地址!~', trigger: 'blur'},
            { min: 2, max: 50, message: '长度在2 ~ 50个字符之间!~',trigger: 'blur'},
            { validator: checkEmail, trigger: 'blur'}
          ]
        },
        regDialogVisible: false,   // 控制注册对话框的显隐

      }
    },
    created() {   // 生命周期函数, 用于初始化页面
      this.getAccountList()   // 调用该函数初始化账户的列表区域
    },


    methods: {
      async getAccountList() {   //获取账户列表
        const { data: res } =await this.$axios({
          url:'/ponyproperty-manager/permission/listPerms',
          method: 'post',
          transformRequest: [function (data) {
            return Qs.stringify(data)
          }],
          data: {
            account_id: this.addForm.account_id,
          }
        })
        if(res.msg !=='OK') return this.$message.error('获取账户列表失败!~')
        this.accountList = res.data
        this.total = res.data.length
        console.log('这是账户列表',res)
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
      addDialogClosed() {   // 监听添加商户的对话框关闭时触发的事件
        this.$refs.addFormRef.resetFields()
      },
      addaccount() {   // 点击确定按钮, 添加新账户
        this.$refs.addFormRef.validate(async (valid) => {
          if(!valid) return
          // 如果校验成功,, 可以发起网络请求. 来添加账户
          const {data:res} = await this.$axios({
            url:'/ponyproperty-manager/account/addaccount',
            method: 'post',
            transformRequest: [function (data) {
              return Qs.stringify(data)
            }],
            data: {
              concat_name: this.addForm.concat_name,
              concat_phone: this.addForm.concat_phone,
              account_id: this.addForm.account_id,
              account_name: this.addForm.account_name
            }
          })
          if(res.msg!=='OK') return this.$message.error('添加账户失败!~')
          this.$message.success('添加账户成功!~')
          this.addDialogVisible = false   // 隐藏对话框
          this.getAccountList()   // 重新请求最新数据, 重新渲染页面
          console.log(res)
        })
      },

      showEditDialog(row) {   // 点击修改按钮, 展示修改页
        this.editForm = row
        console.log('row赋值给editForm',this.editForm)
        this.editDialogVisible = true
      },
      editDialogClosed() {   // 监听对话框关闭事件
        this.$refs.editFormRef.resetFields()
      },
      editaccount() {   // 点击确定按钮, 修改账户
        this.$refs.editFormRef.validate(async (valid) => {
          if (!valid) return
          console.log('修改后的editForm',this.editForm)
          console.log(this.editForm.concat_phone)
          console.log(this.editForm.account_id)
          const {data:res} =await this.$axios({
            url:'/ponyproperty-manager/account/updateaccount',
            method: 'post',
            transformRequest: [function (data) {
              return Qs.stringify(data)
            }],
            data: {
              concat_name: this.editForm.concat_name,
              concat_phone: this.editForm.concat_phone,
              account_id: this.editForm.account_id,
              account_name: this.editForm.account_name
            }
          })
          if(res.msg !=='OK') return this.$message.error('修改商户信息失败!~')
          this.editDialogVisible = false
          this.getAccountList()   // 重新请求最新数据, 重新渲染页面
          this.$message.success('修改商户信息成功!~')
        })
      },
      async delAccount() {   // 删除一条商户, 触发的函数
        const {data:res} =await this.$axios({
          url:'/ponyproperty-manager/account/deleteaccount',
          method: 'post',
          transformRequest: [function (data) {
            return Qs.stringify(data)
          }],
          data: { account_id: this.editForm.account_id }
        })
        if(res.msg !=='OK') return this.$message.error('删除商户信息失败!~')
        this.editDialogVisible = false
        this.getAccountList()   // 重新请求最新数据, 重新渲染页面
        this.$message.success('删除键商户信息成功!~')
      },

      showRegDialog(id) {   // 点击创建账号, 展示注册页对话框
        this.regForm.account_id = id
        this.regDialogVisible = true
      },
      regDialogClosed() {   // 监听对话框关闭事件
        this.$refs.regFormRef.resetFields()
      },
      regAccount() {   // 点击确定按钮, 注册账号
        this.$refs.regFormRef.validate(async (valid) => {
          if (!valid) return
          console.log(this.regForm.type)
          const {data:res} =await this.$axios({
            url:'/ponyproperty-manager/login/register',
            method: 'post',
            transformRequest: [function (data) {
              return Qs.stringify(data)
            }],
            data: {
              account_id: this.regForm.account_id,
              account_name: this.regForm.account_name,
              password: this.regForm.password,
              phone: this.regForm.phone,
              email: this.regForm.email,
              type: this.regForm.type,
              grade: this.regForm.grade,
            }
          })
          if(res.msg !=='OK') return this.$message.error('注册账号失败!~')
          this.regDialogVisible = false
          this.getAccountList()   // 重新请求最新数据, 重新渲染页面
          this.$message.success('注册账号成功!~')
        })
      }

    }
  }
</script>

<style scoped>
  .propertyAccount-select { background-color: #FF6565; padding-left: 0 !important; }
  #ttt  {line-height: 40px; background-color: #F5FAFA; color: #999; font-size: 14px; border-right: 1px solid #d00; padding: 0 18px; }

  .account-add{ margin-top: 20px;}
  .account-add .el-button { background-color: #235FED !important; color: #fff;}
  .account-add .el-button:hover { background-color: #3A77FE !important;}
  .editDialog-footer { display: flex; justify-content: space-around;}
  .editDialog-footer-cancel { flex: 3;}
  .editDialog-footer-sure { flex: 5;}
  .editDialog-footer-del { flex: 3;}

  .el-row .el-col { line-height: 38px;}
  .el-row span { font-weight: 600; font-size: 14px;}
  .account-button { width: 70px; color: #fff; }
  .account-search { margin-left: 10px;}
</style>