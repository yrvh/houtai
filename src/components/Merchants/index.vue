<!-- 商户列表页面-->
<template>
  <main-card2 title1="商户列表">
    <div slot="content">
      <div class="merchant-top">
        <el-row :gutter="6">
          <el-col :span="7">
            <el-row :gutter="2">
              <el-col :span="6"><span>物业名称</span></el-col>
              <el-col :span="17">
                <el-input placeholder="请输入物业名称" v-model="queryInfo.merchantName" clearable @clear="getMerchantList"></el-input>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="2">
            <el-button class="button-warning search-button" @click="getMerchantList">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button class="button-info reset-button" @click="resetMerchantList(queryInfo)">重置</el-button>
          </el-col>
        </el-row>
        <el-button class="merchant-add button-primary" @click="addDialogVisible = true"><i class="iconfont icon-add"></i>添加商户</el-button>
      </div>

      <!--   商户列表区, 数据展示   -->
      <el-table :data="merchantList" stripe :header-cell-style="getRowClass">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="物业ID" prop="merchantId"></el-table-column>
        <el-table-column label="物业名称" prop="merchantName"></el-table-column>
        <el-table-column label="物业地址" prop="merchantAddress"></el-table-column>
        <el-table-column label="联系人" prop="concatName"></el-table-column>
        <el-table-column label="联系电话" prop="concatPhone"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span @click="showEditDialog(scope.row)" class="active-font font-primary">修改</span>
            <span @click="removeMerchant(scope.row.merchantId)"  class="active-font font-warning">删除</span>
          </template>
        </el-table-column>
        <el-table-column label="物业主账号">
          <template slot-scope="scope">
            <span @click="showRegiDialog(scope.row.merchantId)"  class="active-font font-success">注册</span>
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
          :total="merchantTotal">
      </el-pagination>
    </div>

    <!--  这是添加商户的 对话框  -->
    <el-dialog title="添加商户" :visible.sync="addDialogVisible" width="40%" @close="addDialogClosed">

      <el-form :model="addForm" :rules="formRules" ref="addFormRef" label-width="80px">
        <el-form-item label="物业ID" prop="merchantId">
          <el-input v-model="addForm.merchantId"></el-input>
        </el-form-item>
        <el-form-item label="物业名称" prop="merchantName">
          <el-input v-model="addForm.merchantName"></el-input>
        </el-form-item>
        <el-form-item label="物业地址" prop="merchantAddress">
          <el-input v-model="addForm.merchantAddress"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="concatName">
          <el-input v-model="addForm.concatName"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="concatPhone">
          <el-input v-model="addForm.concatPhone"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button class="button-info"  @click="addDialogVisible = false">取 消</el-button>
        <el-button class="button-primary" @click="addMerchant" type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <!--  修改商户的 对话框 -->
    <el-dialog title="修改商户信息" :visible.sync="editDialogVisible" width="40%" @close="editDialogClosed">

      <el-form :model="editForm" :rules="formRules" ref="editFormRef" label-width="80px">
        <el-form-item label="物业ID">
          <el-input v-model="editForm.merchantId" disabled></el-input>
        </el-form-item>
        <el-form-item label="物业名称" prop="merchantName">
          <el-input v-model="editForm.merchantName"></el-input>
        </el-form-item>
        <el-form-item label="物业地址" prop="merchantAddress">
          <el-input v-model="editForm.merchantAddress"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="concatName">
          <el-input v-model="editForm.concatName"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="concatPhone">
          <el-input v-model="editForm.concatPhone"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button class="button-info" @click="editDialogVisible = false">取 消</el-button>
        <el-button class="button-primary" @click="editMerchant" type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <!--  注册商户主账号的 对话框 -->
    <el-dialog title="修改商户信息" :visible.sync="regiDialogVisible" width="40%" @close="regiDialogClosed">

      <el-form :model="regiform" :rules="formRules" ref="regiFormRef" label-width="80px">
        <el-form-item label="物业ID">
          <el-input v-model="regiform.merchantId" disabled></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="accountName">
          <el-input v-model="regiform.accountName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="regiform.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="regiform.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="regiform.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="说明" prop="note">
          <el-input v-model="regiform.note"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button class="button-info" @click="regiDialogVisible = false">取 消</el-button>
        <el-button class="button-primary" @click="regiMerchant" type="primary">确 定</el-button>
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
      // 自定义邮箱校验
      var checkEmail = (rule, value, cb) => {
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        if(regEmail.test(value)) return cb()
        cb(new Error('请输入合法的邮箱!~'))
      }
      return {
        formRules: {   // ====规则校验====
          merchantId: [
            {required: true, message: '请输入物业ID!~', trigger: 'blur'},
            { min: 5, max: 32, message: '长度在5 ~ 32个字符之间!~',trigger: 'blur'}
          ],
          merchantName: [
            {required: true, message: '请输入物业名称!~', trigger: 'blur'},
            { min: 2, max: 15, message: '长度在2 ~ 15符之间!~',trigger: 'blur'}
          ],
          merchantAddress: [
            {required: true, message: '请输入物业地址!~', trigger: 'blur'},
            { min: 3, max: 50, message: '长度在3 ~ 50个字符之间!~',trigger: 'blur'}
          ],
          concatName: [
            { required: true, message: '请输入物业联系人!~', trigger: 'blur'},
            { min: 2, max: 15, message: '长度在2 ~ 15个字符之间!~',trigger: 'blur'}
          ],
          concatPhone: [
            { required: true, message: '请输入物业联系人!~', trigger: 'blur'},
            { validator: checkMobile, trigger: 'blur'}
          ],
          email:[
            { required: true, message: '请输入邮箱地址!~', trigger: 'blur'},
            { validator: checkEmail, trigger: 'blur'}
          ],
          phone:[
            { required: true, message: '请输入账号绑定的电话号!~', trigger: 'blur'},
            { validator: checkMobile, trigger: 'blur'}
          ],
          accountName: [
            { required: true, message: '请输入账号!~', trigger: 'blur'},
            { min: 4, max: 30, message: '长度在4 ~ 30个字符之间!~',trigger: 'blur'}
          ],
          password: [
            { required: true, message: '请输入密码!~', trigger: 'blur'},
            { min: 6, max: 32, message: '长度在6 ~ 32个字符之间!~',trigger: 'blur'}
          ],
          note: [
            { required: false, message: '请输入账号说明!~', trigger: 'blur'},
          ],
        },
        queryInfo: {   // 获取商户列表时 传的参数对象
          merchantId: '',
          merchantName: '',
          pageNo: 1,   // 当前页码
          pageSize: 5,   // 当前每页显示多少条数据
        },
        merchantList: [],   // 商户列表
        merchantTotal: 0,   // 商户总数据条数
        addDialogVisible: false,   // 控制添加商户的显示与隐藏
        addForm: {   // 添加商户时的数据对象
          merchantId: '',
          merchantName: '',
          merchantAddress: '',
          concatName: '',
          concatPhone: ''
        },
        editDialogVisible: false,   // 修改商户对话框的显示与隐藏
        editForm: {},   // 修改商户对话框的数据对象

        regiDialogVisible: false,   // 注册商户对话框的显示与隐藏
        regiform: {
          merchantId: '',
          accountName: '',
          email: '',
          phone: '',
          note: '',
          password: '',
          type: 2,
          grade: 1,
        }   // 注册商户对话框的数据对象
      }
    },
    created() {
      this.getMerchantList()
    },
    methods: {
      async getMerchantList() {   //获取商户列表
        const {data:res} =await this.$axios({
          url:'/ponyproperty-manager/merchant/listMerchant',
          method: 'post',
          transformRequest: [function (data) {
            return Qs.stringify(data)
          }],
          data: {
            merchantName: this.queryInfo.merchantName,
            merchantId: this.queryInfo.merchantId,
            pageNo: this.queryInfo.pageNo,
            pageSize: this.queryInfo.pageSize
          }
        })
        if(res.msg !=='OK') return this.$message.error('获取商户列表失败!~')
        this.merchantList = res.data.records
        this.merchantTotal = res.data.total
      },
      resetMerchantList(obj){   // 搜索框点击重置按钮时触发的事件
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
      //==================================================================添加
      addDialogClosed() {   // 监听对话框关闭事件
        this.$refs.addFormRef.resetFields()
      },
      addMerchant() {   // 点击确定按钮, 添加新商户
        this.$refs.addFormRef.validate(async (valid) => {
          if(!valid) return
          const {data:res} =await this.$axios({   // 发起网络请求
            url:'/ponyproperty-manager/merchant/addMerchant',
            method: 'post',
            transformRequest: [function (data) {
              return Qs.stringify(data)
            }],
            data: {
              merchantId: this.addForm.merchantId,
              merchantName: this.addForm.merchantName,
              merchantAddress: this.addForm.merchantAddress,
              concatName: this.addForm.concatName,
              concatPhone: this.addForm.concatPhone,
            }
          })
          if(res.msg !=='OK') return this.$message.error('添加商户失败!~')
          this.$message.success('添加商户成功')
          this.addDialogVisible = false   // 隐藏添加商户的对话框
          this.getMerchantList()   // 重新获取商户的列表
        })
      },
      //==================================================================修改
      async showEditDialog(row) {   // 点击修改按钮, 展示修改页
        this.editForm = row   // 当行数据赋值给 要修改的商户
        this.editDialogVisible = true
      },
      editDialogClosed() {   // 监听修改商户的对话框关闭事件
        this.$refs.editFormRef.resetFields()
      },
      editMerchant() {   // 点击确定按钮, 修改商户
        this.$refs.editFormRef.validate(async (valid) => {
          if(!valid) return
          const {data:res} =await this.$axios({   // 发起网络请求
            url:'/ponyproperty-manager/merchant/updateMerchant',
            method: 'post',
            transformRequest: [function (data) {
              return Qs.stringify(data)
            }],
            data: {
              merchantId: this.editForm.merchantId,
              merchantName: this.editForm.merchantName,
              merchantAddress: this.editForm.merchantAddress,
              concatName: this.editForm.concatName,
              concatPhone: this.editForm.concatPhone,
            }
          })
          if(res.msg !=='OK') return this.$message.error('修改商户失败!~')
          this.$message.success('修改商户成功')
          this.getMerchantList()   // 重新获取商户的列表
          this.editDialogVisible = false   // 隐藏修改商户的对话框
        })
      },
      //==================================================================删除
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
        const {data:res} =await this.$axios({
          url:'/ponyproperty-manager/merchant/deleteMerchant',
          method: 'post',
          transformRequest: [function (data) {
            return Qs.stringify(data)
          }],
          data: {
            merchantId: id,
          }
        })
        // if!==200 删除失败
        if(res.msg !=='OK') return this.$message.error('删除商户失败!~')
        this.$message.success('删除商户成功')
        this.getMerchantList()   // 重新获取商户的列表
      },
      //==================================================================注册
      async showRegiDialog(id) {   // 点击修改按钮, 展示注册页
        console.log(id)
        this.regiform.merchantId = id
        this.regiDialogVisible = true
      },
      regiDialogClosed() {   // 监听注册商户账号的对话框关闭事件
        this.$refs.regiFormRef.resetFields()
      },
      regiMerchant() {   // 点击确定按钮, 注册物业账号
        this.$refs.regiFormRef.validate(async (valid) => {
          if(!valid) return
          const {data:res} =await this.$axios({   // 发起网络请求
            url:'/ponyproperty-manager/login/register',
            method: 'post',
            transformRequest: [function (data) {
              console.log(data)
              return Qs.stringify(data)
            }],
            data: {
              merchantId: this.regiform.merchantId,
              accountName: this.regiform.accountName,
              email: this.regiform.email,
              phone: this.regiform.phone,
              password: this.regiform.password,
              note: this.regiform.note,
              type: this.regiform.type,
              grade: this.regiform.grade,

            }
          })
          console.log(res)
          if(res.msg !=='OK') return this.$message.error('注册物业账号失败!~')
          this.$message.success('注册物业账号成功')
          this.regiDialogVisible = false   // 隐藏注册商户的对话框
        })
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