<!-- 商户列表页面-->
<template>
  <main-card2 title1="商户列表">
    <div slot="content">
      <div class="merchant-top">
        <el-row :gutter="6">
          <el-col :span="6">
            <el-row :gutter="2">
              <el-col :span="6"><span>商户名称</span></el-col>
              <el-col :span="17">
                <el-input placeholder="请输入商户名称" v-model="queryInfo.merchantName" clearable @clear="getMerchantList"></el-input>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="6">
            <el-row :gutter="2">
              <el-col :span="4.5"><span>商户ID</span></el-col>
              <el-col :span="18">
                <el-input placeholder="请输入商户ID" v-model="queryInfo.merchantId" clearable @clear="getMerchantList"></el-input>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="2">
            <el-button class="button-warning search-button" @click="getMerchantList">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button class="button-info reset-button" @click="resetMerchant(queryInfo)">重置</el-button>
          </el-col>
        </el-row>
        <el-button class="merchant-add button-primary" @click="addDialogVisible = true"><i class="iconfont icon-add"></i>添加商户</el-button>
      </div>

      <!--   商户列表区, 数据展示   -->
      <el-table :data="merchant_list" stripe :header-cell-style="getRowClass">
        <el-table-column label="序号" prop="id"></el-table-column>
        <el-table-column label="商户名称" prop="name"></el-table-column>
        <el-table-column label="商户地址" prop="address"></el-table-column>
        <el-table-column label="账号" prop="account"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span @click="showEditDialog(scope.row)" class="active-font font-primary">编辑</span>
            <span @click="removeMerchant(scope.row.id)"  class="active-font font-warning">删除</span>
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
          :total="total">
      </el-pagination>
    </div>

    <!--  这是添加商户的 对话框  -->
    <el-dialog title="添加商户" :visible.sync="addDialogVisible" width="40%" @close="addDialogClosed">

      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
        <el-form-item label="商户名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="addForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" type="password"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button class="button-info"  @click="addDialogVisible = false">取 消</el-button>
        <el-button class="button-primary" @click="addMerchant" type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <!--  修改商户的 对话框 -->
    <el-dialog title="修改商户信息" :visible.sync="editDialogVisible" width="40%" @close="editDialogClosed">

      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">
        <el-form-item label="商户名称">
          <el-input v-model="editForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="editForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password" type="password"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button class="button-info" @click="editDialogVisible = false">取 消</el-button>
        <el-button class="button-primary" @click="editMerchant" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </main-card2>


</template>

<script>
  import Qs from 'qs'
  export default {
    name: "Merchant",
    components:{},
    data() {
      // 自定义校验规则
      var checkMobile = (rule, value, cb) => {
        const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/
        if(regMobile.test(value)) return cb()
        cb(new Error('请输入合法的手机号!~'))
      }

      return {
        queryInfo: {   // 获取商户列表时 传的参数对象
          merchantId: '',
          merchantName: '',
          merchant_address:'',
          concat_name:'',
          concat_phone:'',
          pageNo: 1,   // 当前页码
          pageSize: 5,   // 当前每页显示多少条数据
        },
        merchant_list: [],   // 商户列表
        total: 0,   // 商户总数据条数
        addDialogVisible: false,   // 控制添加商户的显示与隐藏
        addForm: {   // 添加商户时的数据对象
          name: '',
          address: '',
          account: '',
          password: ''
        },
        addFormRules: {   // 添加商户时的规则校验
          name: [
            {required: true, message: '请输入商户名字!~', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请输入商户地址!~', trigger: 'blur'}
          ],
          account: [
            { required: true, message: '请输入账号!~', trigger: 'blur'},
            { min: 5, max: 20, message: '长度在5 ~ 20个字符之间!~',trigger: 'blur'}
            // { validator: checkMobile, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码!~', trigger: 'blur'},
            { min: 8, max: 32, message: '长度在8 ~ 32个字符之间!~',trigger: 'blur'}
          ]
        },
        editFormRules: {   // 修改商户时的规则校验
          address: [
            {required: true, message: '请输入商户地址!~', trigger: 'blur'}
          ],
          account: [
            { required: true, message: '请输入账号!~', trigger: 'blur'},
            { min: 5, max: 20, message: '长度在5 ~ 20个字符之间!~',trigger: 'blur'}
            // { validator: checkMobile, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码!~', trigger: 'blur'},
            { min: 8, max: 32, message: '长度在8 ~ 32个字符之间!~',trigger: 'blur'}
          ]
        },
        editDialogVisible: false,   // 修改商户对话框的显示与隐藏
        editForm: {}   // 修改商户对话框的数据对象
      }
    },
    created() {
      this.getMerchantList()
    },
    methods: {
      async getMerchantList() {   //获取商户列表
        // const { data: comm } =await this.$axios.get('/api/communicate')   //,{ params: this.queryInfo}
        const {data:res} =await this.$axios({
          url:'/ponyproperty-manager/merchant/listMerchant',
          method: 'post',
          transformRequest: [function (data) {
            return Qs.stringify(data)
          }],
          data: {
            merchantName: this.queryInfo.communityName,
            merchantId: this.queryInfo.communityId,
            pageNo: this.queryInfo.pageNo,
            pageSize: this.queryInfo.pageSize
          }
        })
        console.log(res)
        if(res.msg !=='OK') return this.$message.error('获取商户列表失败!~')
        this.merchant_list = res.data
        console.log(res.data)
        // this.total = this.merchant_list.length
      },
      resetMerchant(obj){   // 搜索框点击重置按钮时触发的事件
        this.clearObj(obj)   // 调用全局函数清空对象
        this.getMerchantList()
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {   // 设置table的首行背景颜色
        if(rowIndex == 0) {
          return 'background:#EEE'
        }
        else { return ''}
      },
      handleSizeChange(newSize) {   // 监听pageSize改变的函数
        this.queryInfo.pageSize = newSize
        this.getMerchantList()
      },
      handleCurrentChange(newPage) {   // 监听页码值改变的函数
        this.queryInfo.pageNo = newPage
        this.getMerchantList()
      },
      addDialogClosed() {   // 监听对话框关闭事件
        this.$refs.addFormRef.resetFields()
      },
      addMerchant() {   // 点击确定按钮, 添加新商户
        this.$refs.addFormRef.validate( (valid) => {
          if(!valid) return
          // 如果校验成功,, 可以发起网络请求???
          // if!==200 添加失败
          // this.$message.success('添加商户成功')
          this.addDialogVisible = false   // 隐藏添加商户的对话框
          // this.getMerchantList()   // 重新获取用户的列表
        })
      },
      async showEditDialog(row) {   // 点击修改按钮, 展示修改页
        console.log("====================")
        console.log(row)
        this.editForm = row   // 当行数据赋值给 要修改的商户
        // const {data:comm} =await this.$axios.get('/api/communicate')
        // if(comm.meta.status !==200) return this.$message.error('查询商户信息失败')
        // this.editForm = comm.data.communicates[parseInt(row.id)-1]
        this.editDialogVisible = true
      },
      editDialogClosed() {   // 监听修改商户的对话框关闭事件
        this.$refs.editFormRef.resetFields()
      },
      editMerchant() {   // 点击确定按钮, 修改商户
        this.$refs.editFormRef.validate( (valid) => {
          if(!valid) return
          // 如果校验成功,, 可以发起网络请求???
          // if!==200 添加失败
          // this.$message.success('修改商户成功')
          this.editDialogVisible = false   // 隐藏修改商户的对话框
          // this.getMerchantList()   // 重新获取用户的列表
        })
      },
      async removeMerchant(id) {   // 删除商户的函数
        // 弹框询问用户是否确认删除
        const confirmResult = await this.$confirm('此操作将永久删除该商户, 是否继续?','提示',{
          confirmButtonText: '确定',
          confirmButtonClass: 'button-primary',
          cancelButtonText: '取消',
          cancelButtonClass: 'button-info',
          type: 'warning'
        }).catch( err => {return err})
        if(confirmResult !== 'confirm'){
          return this.$message.info('已取消了删除!~~')
        }
        // this.$axios.delete('')   // 用户确认删除,发起ajax请求???
        // if!==200 删除失败
        // this.$message.success('删除商户成功商户成功')
        // this.getMerchantList()   // 重新获取用户的列表
      }
    }
  }
</script>

<style scoped>
  .merchant-top { position: relative; }
  .merchant-add { position: absolute; right: 0; top: 0;}

  .el-row .el-col { line-height: 38px;}
  .el-row span { font-weight: 600; font-size: 14px;}
</style>