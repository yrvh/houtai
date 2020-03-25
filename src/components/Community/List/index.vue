<!-- 小区管理下的   小区列表-->
<template>
  <main-card2 title1="小区管理" title2="小区列表">
    <div slot="content">
      <div class="list-top">
        <el-row :gutter="2">
          <el-col :span="7">
            <el-row :gutter="2">
              <el-col :span="5"><span>小区名称</span></el-col>
              <el-col :span="17">
                <el-input
                    placeholder="请输入小区名称"
                    v-model="queryInfo.communityName"
                    clearable
                    @clear="getCommunityList">
                </el-input>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="2">
            <el-button class="button-warning search-button" @click="getCommunityList">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button class="button-info reset-button" @click="resetCommunityList(queryInfo)">重置</el-button>
          </el-col>
        </el-row>
        <el-button class="list-add button-primary" size="small" @click="addDialogVisible = true"><i class="iconfont icon-add"></i>添加小区</el-button>
      </div>

      <!--   小区列表区, 数据展示   -->
      <el-table :data="communityList" stripe :header-cell-style="getRowClass">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="物业ID" prop="merchantId"></el-table-column>
        <el-table-column label="小区ID" prop="communityId"></el-table-column>
        <el-table-column label="小区名称" prop="communityName"></el-table-column>
        <el-table-column label="小区地址" prop="communityAddr"></el-table-column>
        <el-table-column label="精确度" prop="accuracy"></el-table-column>
        <el-table-column label="生成账单" prop="autoFeebill"></el-table-column>
        <el-table-column label="单项缴费" prop="isDxjf"></el-table-column>
        <el-table-column label="需要审核" prop="isReview"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span @click="showEditDialog(scope.row)" class="active-font font-primary">修改</span>
            <span @click="removeCommunity(scope.row.communityId)"  class="active-font font-warning">删除</span>
          </template>
        </el-table-column>
        <el-table-column label="小区主账号">
          <template slot-scope="scope">
            <span @click="showRegiDialog(scope.row)" class="active-font font-primary">注册</span>
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
              :total="listTotal">
      </el-pagination>
    </div>

    <!--  这是添加小区的 对话框  -->
    <el-dialog title="添加小区" :visible.sync="addDialogVisible" width="40%" @close="addDialogClosed">

      <el-form :model="addForm" :rules="formRules" ref="addFormRef" label-width="120px">
        <el-form-item label="物业ID">
          <el-input v-model="queryInfo.merchantId" disabled></el-input>
        </el-form-item>
        <el-form-item label="小区名称" prop="communityName">
          <el-input v-model="addForm.communityName"></el-input>
        </el-form-item>
        <el-form-item label="小区地址" prop="communityAddr">
          <el-input v-model="addForm.communityAddr"></el-input>
        </el-form-item>
        <el-form-item label="精确度" prop="accuracy">
          <el-input v-model="addForm.accuracy"></el-input>
        </el-form-item>
        <el-form-item label="自动生成账单" prop="autoFeebill">
          <el-input v-model="addForm.autoFeebill"></el-input>
        </el-form-item>
        <el-form-item label="单项缴费预存" prop="isDxjf">
          <el-input v-model="addForm.isDxjf"></el-input>
        </el-form-item>
        <el-form-item label="是否需要审核" prop="isReview">
          <el-input v-model="addForm.isReview"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button class="button-info"  @click="addDialogVisible = false">取 消</el-button>
        <el-button class="button-primary" @click="addComm" type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <!--  修改小区的 对话框 -->
    <el-dialog title="修改小区信息" :visible.sync="editDialogVisible" width="40%" @close="editDialogClosed">

      <el-form :model="editForm" :rules="formRules" ref="editFormRef" label-width="120px">
        <el-form-item label="物业ID">
          <el-input v-model="editForm.merchantId" disabled></el-input>
        </el-form-item>
        <el-form-item label="小区ID">
          <el-input v-model="editForm.communityId" disabled></el-input>
        </el-form-item>
        <el-form-item label="小区名称" prop="communityName">
          <el-input v-model="editForm.communityName"></el-input>
        </el-form-item>
        <el-form-item label="小区地址" prop="communityeditr">
          <el-input v-model="editForm.communityAddr"></el-input>
        </el-form-item>
        <el-form-item label="精确度" prop="accuracy">
          <el-input v-model="editForm.accuracy"></el-input>
        </el-form-item>
        <el-form-item label="自动生成账单" prop="autoFeebill">
          <el-input v-model="editForm.autoFeebill"></el-input>
        </el-form-item>
        <el-form-item label="单项缴费预存" prop="isDxjf">
          <el-input v-model="editForm.isDxjf"></el-input>
        </el-form-item>
        <el-form-item label="是否需要审核" prop="isReview">
          <el-input v-model="editForm.isReview"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button class="button-info" @click="editDialogVisible = false">取 消</el-button>
        <el-button class="button-primary" @click="editComm" type="primary">确 定</el-button>
      </span>
    </el-dialog>


    <!--  注册小区主账号的 对话框 -->
    <el-dialog title="注册小区信息" :visible.sync="regiDialogVisible" width="40%" @close="regiDialogClosed">

      <el-form :model="regiform" :rules="formRules" ref="regiFormRef" label-width="80px">
        <el-form-item label="物业ID">
          <el-input v-model="regiform.merchantId" disabled></el-input>
        </el-form-item>
        <el-form-item label="小区ID">
          <el-input v-model="regiform.communityId" disabled></el-input>
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
        <el-button class="button-primary" @click="regiCommunity" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </main-card2>


</template>

<script>
  import Qs from 'qs'
  export default {
    name: "List",
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

      var checkBool = (rule, value, cb) => {   // 布尔值校验
        const regBool = /^(0|1)$/
        if(regBool.test(value)) return cb()
        cb(new Error('该值仅为 0 或 1'))
      }

      var checkAccuracy = (rule, value, cb) => {   // 精确度,元角分
        const regAccuracy = /^(1|2|3)$/
        if(regAccuracy.test(value)) return cb()
        cb(new Error('值仅为 1 或 2 或 3'))
      }

      return {
        formRules: {   // 规则校验
          communityId: [
            {required: true, message: '请输入小区ID!~', trigger: 'blur'},
            { min: 3, max: 32, message: '长度在3 ~ 32个字符之间!~',trigger: 'blur'}
          ],
          communityName: [
            {required: true, message: '请输入小区名字!~', trigger: 'blur'},
            { min: 2, max: 20, message: '长度在2 ~ 20个字符之间!~',trigger: 'blur'}
          ],
          communityAddr: [
            {required: true, message: '请输入小区地址!~', trigger: 'blur'},
            { min: 3, max: 100, message: '长度在3 ~ 100个字符之间!~',trigger: 'blur'}
          ],
          accuracy: [
            {required: true, message: '请输入精确度,1 分, 2 角, 3 元!~', trigger: 'blur'},
            { validator: checkAccuracy, trigger: 'blur'}
          ],
          autoFeebill: [
            {required: true, message: '是否开启自动生成账单: 0 不开, 1 开启 !~', trigger: 'blur'},
            { validator: checkBool, trigger: 'blur'}
          ],
          isDxjf: [
            {required: true, message: '是否开启单项缴费和预存: 0不开, 1开启 !~', trigger: 'blur'},
            { validator: checkBool, trigger: 'blur'}
          ],
          isReview: [
            {required: true, message: '是否需要审核: 0 否, 1 需要!~', trigger: 'blur'},
            { validator: checkBool, trigger: 'blur'}
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

        queryInfo: {   // 获取小区列表时 传的参数对象
          communityName: '',   // 查询参数
          merchantId: 'mw111',
          pageNo: 1,   // 当前页码
          pageSize: 5,   // 当前每页显示多少条数据
        },
        
        communityList: [],   // 小区列表
        listTotal: 0,   // 小区总数据条数
        
        addDialogVisible: false,   // 控制添加小区的显示与隐藏
        addForm: {   // 添加小区时的数据对象
          communityName: '',
          communityAddr: '',
          accuracy: 1,   // 精确度1,2,3
          autoFeebill: 1,   // 自动生成账单功能
          isDxjf: 1,   // 是否开启单项缴费和预存
          isReview: 1,   // 是否需要审核
        },

        editDialogVisible: false,   // 修改小区对话框的显示与隐藏
        editForm: {},   // 修改小区对话框的数据对象

        regiDialogVisible: false,   // 注册小区主账号对话框的显示与隐藏
        regiform: {   // 注册小区对话框的数据对象
          merchantId: '',
          communityId:'',
          accountName: '',
          email: '',
          phone: '',
          note: '',
          password: '',
          type: 3,
          grade: 1,
        }
      }
    },
    created() {
      // this.queryInfo.merchantId = window.sessionStorage.getItem('MERCHANTID')   // 获取当前登录账号的merchantId
      this.getCommunityList()
    },
    methods: {
      async getCommunityList() {   //获取小区列表
        const {data:res} = await this.$axios({
          url:'/ponyproperty-manager/community/listCommunity',
          method: 'post',
          transformRequest: [function (data) {
            return Qs.stringify(data)
          }],
          data: {
            merchantId: this.queryInfo.merchantId
          }
        })
        if(res.msg!=='OK') return this.$message.error('获取小区列表失败!~')
        this.communityList = res.data
        this.listTotal = res.data.length || 0
      },

      resetCommunityList(obj){   // 搜索框点击重置按钮时触发的事件
        this.clearObj(obj)   // 调用全局函数清空对象
        this.getCommunityList()
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {   // 设置table的首行背景颜色
        if(rowIndex == 0) {
          return 'background:#EEE'
        }
        else { return ''}
      },
      handleSizeChange(newSize) {   // 监听pageSize改变的函数
        this.queryInfo.pageSize = newSize
        this.getCommunityList()
      },
      handleCurrentChange(newPage) {   // 监听页码值改变的函数
        this.queryInfo.pageNo = newPage
        this.getCommunityList()
      },
      //===================================================================添加
      addDialogClosed() {   // 监听对话框关闭事件
        this.$refs.addFormRef.resetFields()
      },
      addComm() {   // 点击确定按钮, 添加新小区
        this.$refs.addFormRef.validate(async (valid) => {
          if(!valid) return
          const {data:res} = await this.$axios({
            url:'/ponyproperty-manager/community/addCommunity',
            method: 'post',
            transformRequest: [function (data) {
              return Qs.stringify(data)
            }],
            data: {
              communityName: this.addForm.communityName,
              communityAddr: this.addForm.communityAddr,
              merchantId: this.addForm.merchantId,
              accuracy: this.addForm.accuracy,
              autoFeebill: this.addForm.autoFeebill,
              isDxjf: this.addForm.isDxjf,
              isReview: this.addForm.isReview
            }
          })
          if(res.msg !=='OK') return this.$message.error('添加小区失败!~')
          this.$message.success('添加小区成功')
          this.addDialogVisible = false   // 隐藏添加小区的对话框
          this.getCommunityList()   // 重新获取用户的列表
        })
      },
      //===================================================================修改
      async showEditDialog(row) {   // 点击修改按钮, 展示修改页
        this.editForm = row   // 当行数据赋值给 要修改的小区
        this.editDialogVisible = true
      },
      editDialogClosed() {   // 监听修改小区的对话框关闭事件
        this.$refs.editFormRef.resetFields()
      },
      editComm() {   // 点击确定按钮, 修改小区
        this.$refs.editFormRef.validate(async (valid) => {
          if(!valid) return
          const {data:res} = await this.$axios({
            url:'/ponyproperty-manager/community/updateCommunity',
            method: 'post',
            transformRequest: [function (data) {
              return Qs.stringify(data)
            }],
            data: {
              communityId: this.editForm.communityId,
              communityName: this.editForm.communityName,
              communityAddr: this.editForm.communityAddr,
              merchantId: this.editForm.merchantId,
              accuracy: this.editForm.accuracy,
              autoFeebill: this.editForm.autoFeebill,
              isDxjf: this.editForm.isDxjf,
              isReview: this.editForm.isReview
            }
          })
          if(res.msg !=='OK') return this.$message.error('修改小区失败!~')
          this.$message.success('修改小区成功')
          this.editDialogVisible = false   // 隐藏修改小区的对话框
          this.getCommunityList()   // 重新获取用户的列表
        })
      },
      //===================================================================删除
      async removeCommunity(id) {   // 删除小区的函数
        // 弹框询问用户是否确认删除
        const confirmResult = await this.$confirm('此操作将永久删除该小区, 是否继续?','提示',{
          confirmButtonText: '确定',
          confirmButtonClass: 'button-primary',
          cancelButtonText: '取消',
          cancelButtonClass: 'button-info',
          type: 'warning'
        }).catch( err => {return err})
        if(confirmResult !== 'confirm'){
          return this.$message.info('已取消了删除!~~')
        }
        const {data:res} = await this.$axios({
          url:'/ponyproperty-manager/community/deleteCommunity',
          method: 'post',
          transformRequest: [function (data) {
            console.log(data)
            return Qs.stringify(data)
          }],
          data: {
            communityId: id
          }
        })
        if(res.msg !=='OK') return this.$message.error('删除小区失败!~')
        this.$message.success('删除小区成功')
        this.getCommunityList()   // 重新获取用户的列表
      },
      //==================================================================注册
      async showRegiDialog(row) {   // 展示注册页
        console.log(row)
        this.regiform.merchantId = row.merchantId
        this.regiform.communityId = row.communityId
        this.regiDialogVisible = true
      },
      regiDialogClosed() {   // 监听注册小区账号的对话框关闭事件
        this.$refs.regiFormRef.resetFields()
      },
      regiCommunity() {   // 点击确定按钮, 注册小区账号
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
              communityId: this.regiform.communityId,
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
          if(res.msg !=='OK') return this.$message.error('注册小区账号失败!~')
          this.$message.success('注册小区账号成功')
          this.regiDialogVisible = false   // 隐藏注册小区的对话框
        })
      }
    }
  }
</script>

<style scoped>
  .list-top { position: relative; }
  .list-add { position: absolute; right: 0; top: 0;}

  .el-row .el-col { line-height: 38px;}
  .el-row span { font-weight: 600; font-size: 14px;}

</style>