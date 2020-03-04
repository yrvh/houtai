<!-- 轮播图页面 -->
<template>
  <main-card title="轮播图管理">
    <div slot="content">
      <div class="merchant-name">
        <el-input class="merchant-input" placeholder="全部物业" v-model="queryInfo.query" clearable @clear="getPropertyList">
          <template slot="prepend">物业名</template>
        </el-input>
        <el-button type="primary" class="merchant-search" @click="getPropertyList"><i class="iconfont icon-search"></i>搜索</el-button>
        <el-button class="merchant-add" @click="addDialogVisible = true"><i class="iconfont icon-add"></i>添加物业公司</el-button>
      </div>

      <!--   物业列表展示区   -->
      <el-table :data="propertyList" stripe :header-cell-style="getRowClass">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="商户appID" prop="merchant_id"></el-table-column>
        <el-table-column label="物业名称" prop="merchant_name"></el-table-column>
        <el-table-column label="联系人" prop="concat_name"></el-table-column>
        <el-table-column label="联系电话" prop="concat_phone"></el-table-column>
        <el-table-column label="登录账号" prop="account_name"></el-table-column>
        <el-table-column label="操作" min-width="120px">
          <template slot-scope="scope">
            <el-button type="primary" plain @click="showEditDialog(scope.row)" size="small">修改</el-button>
            <el-button type="success" plain @click="showRegDialog(scope.row.merchant_id)" size="small">创建账号</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--       分页区域 -->
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

    <!--  这是添加物业的 对话框  -->
    <el-dialog title="添加物业公司" :visible.sync="addDialogVisible" width="40%" @close="addDialogClosed">

      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
        <el-form-item label="物业名称" prop="merchant_name">
          <el-input v-model="addForm.merchant_name"></el-input>
        </el-form-item>
        <el-form-item label="商户ID" prop="merchant_id">
          <el-input v-model="addForm.merchant_id"></el-input>
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
        <el-button @click="addMerchant" type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <!--  修改物业的 对话框 -->
    <el-dialog title="修改物业信息" :visible.sync="editDialogVisible" width="40%" @close="editDialogClosed">

      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">
        <el-form-item label="物业名称">
          <el-input v-model="editForm.merchant_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="商户ID">
          <el-input v-model="editForm.merchant_id" disabled></el-input>
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
        <el-button @click="editMerchant" type="primary" class="editDialog-footer-sure">确 定</el-button>
        <el-button @click="delMerchant" type="danger" plain class="editDialog-footer-del">删 除</el-button>
      </span>
    </el-dialog>

    <!--   注册账号的对话框 -->
    <el-dialog title="注册账号" :visible.sync="regDialogVisible" width="40%" @close="regDialogClosed">

      <el-form :model="regForm" :rules="regFormRules" ref="regFormRef" label-width="90px">
        <el-form-item label="商户ID">
          <el-input v-model="regForm.merchant_id" disabled></el-input>
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
  </main-card>
</template>

<script>
  import Qs from 'qs'

  export default {
    name: "Swipers",
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
        queryInfo: {   // 这是渲染table表格, 给后端接口传递的参数.   现在的接口暂时不需要传参
          query: '',
          pagenum: 1,
          pagesize: 6,
        },
        propertyList: [],   // 存储请求回来的 物业列表
        total: 0,   // 商户列表的总数
        addDialogVisible: false,   // 该属性控制 添加物业这个对话框的显隐
        addForm: {
          merchant_name: '',
          merchant_id: '',
          concat_name: '',
          concat_phone: ''
        },
        addFormRules: {   // 添加物业时的 格式校验
          merchant_name: [
            {required: true, message: '请输入物业名字!~', trigger: 'blur'},
            { min: 2, max: 15, message: '长度在2 ~ 15个字符之间!~',trigger: 'blur'}
          ],
          merchant_id: [
            {required: true, message: '请输入物业appID!~', trigger: 'blur'},
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

        editFormRules: {   //修改物业时的格式校验
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
        editForm: { },   // 修改物业时,用于接收 将要修改的物业的信息


        regForm: {   // 注册账号时, 用于存储注册表的数据
          merchant_id: '',
          account_name: '',
          password: '',
          phone: '',
          email: '',
          type: this.merchant_id==''? 3:2,
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
      this.getPropertyList()   // 调用该函数初始化物业的列表区域
    },


    methods: {
      async getPropertyList() {   //获取物业列表
        const { data: res } =await this.$axios.post('/ponyproperty-manager/merchant/listMerchant')  //,{ params: this.queryInfo}
        if(res.msg !=='OK') return this.$message.error('获取物业列表失败!~')
        this.propertyList = res.data
        this.total = res.data.length
        console.log('这是物业列表',res)
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {   // 设置table第一行的背景色
        if(rowIndex == 0) {
          return 'background:#f0f2f5'
        }
        else { return ''}
      },
      handleSizeChange(newSize) {   // 分页显示: 监听pagesize改变的函数
        this.queryInfo.pagesize = newSize
        this.getPropertyList()
      },
      handleCurrentChange(newPage) {   // 分页显示: 监听页码值改变的函数
        this.queryInfo.pagenum = newPage
        this.getPropertyList()
      },
      addDialogClosed() {   // 监听添加商户的对话框关闭时触发的事件
        this.$refs.addFormRef.resetFields()
      },
      addMerchant() {   // 点击确定按钮, 添加新物业
        this.$refs.addFormRef.validate(async (valid) => {
          if(!valid) return
          // 如果校验成功,, 可以发起网络请求. 来添加物业
          const {data:res} = await this.$axios({
            url:'/ponyproperty-manager/merchant/addMerchant',
            method: 'post',
            transformRequest: [function (data) {
              return Qs.stringify(data)
            }],
            data: {
              concat_name: this.addForm.concat_name,
              concat_phone: this.addForm.concat_phone,
              merchant_id: this.addForm.merchant_id,
              merchant_name: this.addForm.merchant_name
            }
          })
          if(res.msg!=='OK') return this.$message.error('添加物业失败!~')
          this.$message.success('添加物业成功!~')
          this.addDialogVisible = false   // 隐藏对话框
          this.getPropertyList()   // 重新请求最新数据, 重新渲染页面
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
      editMerchant() {   // 点击确定按钮, 修改物业
        this.$refs.editFormRef.validate(async (valid) => {
          if (!valid) return
          console.log('修改后的editForm',this.editForm)
          console.log(this.editForm.concat_phone)
          console.log(this.editForm.merchant_id)
          const {data:res} =await this.$axios({
            url:'/ponyproperty-manager/merchant/updateMerchant',
            method: 'post',
            transformRequest: [function (data) {
              return Qs.stringify(data)
            }],
            data: {
              concat_name: this.editForm.concat_name,
              concat_phone: this.editForm.concat_phone,
              merchant_id: this.editForm.merchant_id,
              merchant_name: this.editForm.merchant_name
            }
          })
          if(res.msg !=='OK') return this.$message.error('修改商户信息失败!~')
          this.editDialogVisible = false
          this.getPropertyList()   // 重新请求最新数据, 重新渲染页面
          this.$message.success('修改商户信息成功!~')
        })
      },
      async delMerchant() {   // 删除一条商户, 触发的函数
        const {data:res} =await this.$axios({
          url:'/ponyproperty-manager/merchant/deleteMerchant',
          method: 'post',
          transformRequest: [function (data) {
            return Qs.stringify(data)
          }],
          data: { merchant_id: this.editForm.merchant_id }
        })
        if(res.msg !=='OK') return this.$message.error('删除商户信息失败!~')
        this.editDialogVisible = false
        this.getPropertyList()   // 重新请求最新数据, 重新渲染页面
        this.$message.success('删除键商户信息成功!~')
      },

      showRegDialog(id) {   // 点击创建账号, 展示注册页对话框
        this.regForm.merchant_id = id
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
              merchant_id: this.regForm.merchant_id,
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
          this.getPropertyList()   // 重新请求最新数据, 重新渲染页面
          this.$message.success('注册账号成功!~')
        })
      }

    }
  }
</script>

<style scoped>
  .propertyAccount-select { background-color: #FF6565; padding-left: 0 !important; }
  #ttt  {line-height: 40px; background-color: #F5FAFA; color: #999; font-size: 14px; border-right: 1px solid #d00; padding: 0 18px; }

  .merchant-input .el-input-group__prepend{ background-color: #06D673; }
  .merchant-name { height: 65px; position: relative; display: flex; align-items: flex-end;}
  .merchant-input { width: 250px; }
  .merchant-search { width: 85px; color: #fff; margin-left: 20px;}
  .merchant-add { position: absolute; right: 0; bottom: -8px; background-color: #06D673; color: #fff;}
  .editDialog-footer { display: flex; justify-content: space-around;}
  .editDialog-footer-cancel { flex: 3;}
  .editDialog-footer-sure { flex: 5;}
  .editDialog-footer-del { flex: 3;}
</style>