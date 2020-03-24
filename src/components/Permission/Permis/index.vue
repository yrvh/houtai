<!-- 权限管理 下的权限管理页面 -->
<template>
  <main-card2 title1="权限管理" title2="权限管理">
    <div slot="content">
      <!--   账号列表展示区   -->
      <el-table :data="permis_list" stripe :header-cell-style="getRowClass">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="账户名" prop="name"></el-table-column>
        <el-table-column label="密码" prop="address"></el-table-column>
        <el-table-column label="角色" prop="address"></el-table-column>
        <el-table-column label="创建时间" prop="address"></el-table-column>
        <el-table-column label="操作" min-width="100px">
          <template slot-scope="scope">
            <span @click="showEditDialog(scope.row.id)" class="active-font font-success">详情</span>
            <span @click="showEditDialog(scope.row.id)" class="active-font font-primary">修改</span>
            <span @click="showEditDialog(scope.row.id)" class="active-font font-warning">删除</span>
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
          :total="permis_total">
      </el-pagination>
    </div>

    <!--  这是添加公告的 对话框  -->
    <el-dialog title="添加公告公司" :visible.sync="addDialogVisible" width="40%" @close="addDialogClosed">

      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
        <el-form-item label="公告名称" prop="permis_name">
          <el-input v-model="addForm.permis_name"></el-input>
        </el-form-item>
        <el-form-item label="商户ID" prop="permis_id">
          <el-input v-model="addForm.permis_id"></el-input>
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
        <el-button @click="addpermis" type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <!--  修改公告的 对话框 -->
    <el-dialog title="修改公告信息" :visible.sync="editDialogVisible" width="40%" @close="editDialogClosed">

      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">
        <el-form-item label="公告名称">
          <el-input v-model="editForm.permis_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="商户ID">
          <el-input v-model="editForm.permis_id" disabled></el-input>
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
        <el-button @click="editpermis" type="primary" class="editDialog-footer-sure">确 定</el-button>
        <el-button @click="delpermis" type="danger" plain class="editDialog-footer-del">删 除</el-button>
      </span>
    </el-dialog>

    <!--   注册账号的对话框 -->
    <el-dialog title="注册账号" :visible.sync="regDialogVisible" width="40%" @close="regDialogClosed">

      <el-form :model="regForm" :rules="regFormRules" ref="regFormRef" label-width="90px">
        <el-form-item label="商户ID">
          <el-input v-model="regForm.permis_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="商户账号" prop="permis_name">
          <el-input v-model="regForm.permis_name"></el-input>
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
        <el-button @click="regpermis" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </main-card2>
</template>

<script>
  import Qs from 'qs'

  export default {
    name: "permis",
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
        queryInfo: {   // 获取房间信息时 传的参数对象
          query: '',   // 查询参数,
          community: '',   // 查询参数,小区
          permis_title: '',   // 查询参数,公告标题
          permis_date: '',   // 查询参数,发公告时间
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
        permis_list: [],   // 存储请求回来的 公告列表
        permis_total: 0,   // 商户列表的总数
        //============================================================================================


        addDialogVisible: false,   // 该属性控制 添加公告这个对话框的显隐
        addForm: {
          permis_name: '',
          permis_id: '',
          concat_name: '',
          concat_phone: ''
        },
        addFormRules: {   // 添加公告时的 格式校验
          permis_name: [
            {required: true, message: '请输入公告名字!~', trigger: 'blur'},
            { min: 2, max: 15, message: '长度在2 ~ 15个字符之间!~',trigger: 'blur'}
          ],
          permis_id: [
            {required: true, message: '请输入公告appID!~', trigger: 'blur'},
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

        editFormRules: {   //修改公告时的格式校验
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
        editForm: { },   // 修改公告时,用于接收 将要修改的公告的信息


        regForm: {   // 注册账号时, 用于存储注册表的数据
          permis_id: '',
          permis_name: '',
          password: '',
          phone: '',
          email: '',
          type: this.permis_id==''? 3:2,
          grade: 1,
        },
        regFormRules: {   // 注册账号时的 格式校验
          permis_name: [
            {required: true, message: '请输入公告名字!~', trigger: 'blur'},
            { min: 2, max: 30, message: '长度在2 ~ 30个字符之间!~',trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入公告密码!~', trigger: 'blur'},
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
      this.getpermisList()   // 调用该函数初始化公告的列表区域
    },


    methods: {
      async getpermisList() {   //获取公告列表
        const { data: res } =await this.$axios.get('/api/communicate')   //,{ params: this.queryInfo}
        if(res.meta.status !==200) return this.$message.error('获取小区列表失败!~')
        this.permis_list = res.data.communicates
        this.permis_total = res.data.total
      },
      resetPermisList(obj){   // 点击重置按钮时触发的事件
        this.clearObj(obj)   // 调用全局函数清空对象
        this.getpermisList()
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {   // 设置table第一行的背景色
        if(rowIndex == 0) {
          return 'background:#f0f2f5'
        }
        else { return ''}
      },
      handleSizeChange(newSize) {   // 分页显示: 监听pagesize改变的函数
        this.queryInfo.pagesize = newSize
        this.getpermisList()
      },
      handleCurrentChange(newPage) {   // 分页显示: 监听页码值改变的函数
        this.queryInfo.pagenum = newPage
        this.getpermisList()
      },
      addDialogClosed() {   // 监听添加商户的对话框关闭时触发的事件
        this.$refs.addFormRef.resetFields()
      },
      addpermis() {   // 点击确定按钮, 添加新公告
        this.$refs.addFormRef.validate(async (valid) => {
          if(!valid) return
          // 如果校验成功,, 可以发起网络请求. 来添加公告
          const {data:res} = await this.$axios({
            url:'/ponyproperty-manager/permis/addpermis',
            method: 'post',
            transformRequest: [function (data) {
              return Qs.stringify(data)
            }],
            data: {
              concat_name: this.addForm.concat_name,
              concat_phone: this.addForm.concat_phone,
              permis_id: this.addForm.permis_id,
              permis_name: this.addForm.permis_name
            }
          })
          if(res.msg!=='OK') return this.$message.error('添加公告失败!~')
          this.$message.success('添加公告成功!~')
          this.addDialogVisible = false   // 隐藏对话框
          this.getpermisList()   // 重新请求最新数据, 重新渲染页面
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
      editpermis() {   // 点击确定按钮, 修改公告
        this.$refs.editFormRef.validate(async (valid) => {
          if (!valid) return
          console.log('修改后的editForm',this.editForm)
          console.log(this.editForm.concat_phone)
          console.log(this.editForm.permis_id)
          const {data:res} =await this.$axios({
            url:'/ponyproperty-manager/permis/updatepermis',
            method: 'post',
            transformRequest: [function (data) {
              return Qs.stringify(data)
            }],
            data: {
              concat_name: this.editForm.concat_name,
              concat_phone: this.editForm.concat_phone,
              permis_id: this.editForm.permis_id,
              permis_name: this.editForm.permis_name
            }
          })
          if(res.msg !=='OK') return this.$message.error('修改商户信息失败!~')
          this.editDialogVisible = false
          this.getpermisList()   // 重新请求最新数据, 重新渲染页面
          this.$message.success('修改商户信息成功!~')
        })
      },
      async delpermis() {   // 删除一条商户, 触发的函数
        const {data:res} =await this.$axios({
          url:'/ponyproperty-manager/permis/deletepermis',
          method: 'post',
          transformRequest: [function (data) {
            return Qs.stringify(data)
          }],
          data: { permis_id: this.editForm.permis_id }
        })
        if(res.msg !=='OK') return this.$message.error('删除商户信息失败!~')
        this.editDialogVisible = false
        this.getpermisList()   // 重新请求最新数据, 重新渲染页面
        this.$message.success('删除键商户信息成功!~')
      },

      showRegDialog(id) {   // 点击创建账号, 展示注册页对话框
        this.regForm.permis_id = id
        this.regDialogVisible = true
      },
      regDialogClosed() {   // 监听对话框关闭事件
        this.$refs.regFormRef.resetFields()
      },
      regpermis() {   // 点击确定按钮, 注册账号
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
              permis_id: this.regForm.permis_id,
              permis_name: this.regForm.permis_name,
              password: this.regForm.password,
              phone: this.regForm.phone,
              email: this.regForm.email,
              type: this.regForm.type,
              grade: this.regForm.grade,
            }
          })
          if(res.msg !=='OK') return this.$message.error('注册账号失败!~')
          this.regDialogVisible = false
          this.getpermisList()   // 重新请求最新数据, 重新渲染页面
          this.$message.success('注册账号成功!~')
        })
      }

    }
  }
</script>

<style scoped>
  .editDialog-footer { display: flex; justify-content: space-around;}
  .editDialog-footer-cancel { flex: 3;}
  .editDialog-footer-sure { flex: 5;}
  .editDialog-footer-del { flex: 3;}

  .el-row .el-col { line-height: 38px;}
  .el-row span { font-weight: 600; font-size: 14px;}
  .permis-button { width: 70px; }
</style>