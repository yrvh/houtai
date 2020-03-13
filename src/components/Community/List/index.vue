<!-- 小区管理下的   小区列表-->
<template>
  <main-card2 title1="小区管理" title2="小区列表">
    <div slot="content">
      <el-row>
        <el-col></el-col>
      </el-row>
      <div class="list-communityName">
        <el-input class="list-input" placeholder="请输入小区名称" v-model="queryInfo.query" clearable @clear="getCommunicateList"></el-input>
        <el-button class="button-warning list-search" @click="getCommunicateList">查询</el-button>
        <el-button class="button-info list-search" @click="resetCommunicateList">重置</el-button>
        <el-button class="list-add button-primary" @click="addDialogVisible = true"><i class="iconfont icon-add"></i>添加小区</el-button>
      </div>

      <!--   小区列表区, 数据展示   -->
      <el-table :data="communicateList" stripe :header-cell-style="getRowClass">
        <el-table-column label="序号" prop="id"></el-table-column>
        <el-table-column label="小区名称" prop="name"></el-table-column>
        <el-table-column label="小区地址" prop="address"></el-table-column>
        <el-table-column label="账号" prop="account"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span @click="showEditDialog(scope.row)" class="active-font font-primary">编辑</span>
            <span @click="removeCommunicate(scope.row.id)"  class="active-font font-warning">删除</span>
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

    <!--  这是添加小区的 对话框  -->
    <el-dialog title="添加小区" :visible.sync="addDialogVisible" width="40%" @close="addDialogClosed">

      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
        <el-form-item label="小区名称" prop="name">
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
        <el-button class="button-primary" @click="addComm" type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <!--  修改小区的 对话框 -->
    <el-dialog title="修改小区信息" :visible.sync="editDialogVisible" width="40%" @close="editDialogClosed">

      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">
        <el-form-item label="小区名称">
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
        <el-button class="button-primary" @click="editComm" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </main-card2>


</template>

<script>

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

      return {
        queryInfo: {   // 获取小区列表时 传的参数对象
          query: '',   // 查询参数
          pagenum: 1,   // 当前页码
          pagesize: 2,   // 当前每页显示多少条数据
        },
        communicateList: [],   // 小区列表
        total: 0,   // 小区总数据条数
        addDialogVisible: false,   // 控制添加小区的显示与隐藏
        addForm: {   // 添加小区时的数据对象
          name: '',
          address: '',
          account: '',
          password: ''
        },
        addFormRules: {   // 添加小区时的规则校验
          name: [
            {required: true, message: '请输入小区名字!~', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请输入小区地址!~', trigger: 'blur'}
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
        editFormRules: {   // 修改小区时的规则校验
          address: [
            {required: true, message: '请输入小区地址!~', trigger: 'blur'}
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
        editDialogVisible: false,   // 修改小区对话框的显示与隐藏
        editForm: {}   // 修改小区对话框的数据对象
      }
    },
    created() {
      this.getCommunicateList()
    },
    methods: {
      async getCommunicateList() {   //获取小区列表
        const { data: comm } =await this.$axios.get('/api/communicate')   //,{ params: this.queryInfo}
        if(comm.meta.status !==200) return this.$message.error('获取小区列表失败!~')
        this.communicateList = comm.data.communicates
        this.total = comm.data.total
      },
      resetCommunicateList(){   // 搜索框点击重置按钮时触发的事件
        this.queryInfo.query=''
        this.getCommunicateList()
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {   // 设置table的首行背景颜色
        if(rowIndex == 0) {
          return 'background:#EEE'
        }
        else { return ''}
      },
      handleSizeChange(newSize) {   // 监听pagesize改变的函数
        this.queryInfo.pagesize = newSize
        this.getCommunicateList()
      },
      handleCurrentChange(newPage) {   // 监听页码值改变的函数
        this.queryInfo.pagenum = newPage
        this.getCommunicateList()
      },
      addDialogClosed() {   // 监听对话框关闭事件
        this.$refs.addFormRef.resetFields()
      },
      addComm() {   // 点击确定按钮, 添加新小区
        this.$refs.addFormRef.validate( (valid) => {
          if(!valid) return
          // 如果校验成功,, 可以发起网络请求???
          // if!==200 添加失败
          // this.$message.success('添加小区成功')
          this.addDialogVisible = false   // 隐藏添加小区的对话框
          // this.getCommunicateList()   // 重新获取用户的列表
        })
      },
      async showEditDialog(row) {   // 点击修改按钮, 展示修改页
        console.log("====================")
        console.log(row)
        this.editForm = row   // 当行数据赋值给 要修改的小区
        // const {data:comm} =await this.$axios.get('/api/communicate')
        // if(comm.meta.status !==200) return this.$message.error('查询小区信息失败')
        // this.editForm = comm.data.communicates[parseInt(row.id)-1]
        this.editDialogVisible = true
      },
      editDialogClosed() {   // 监听修改小区的对话框关闭事件
        this.$refs.editFormRef.resetFields()
      },
      editComm() {   // 点击确定按钮, 修改小区
        this.$refs.editFormRef.validate( (valid) => {
          if(!valid) return
          // 如果校验成功,, 可以发起网络请求???
          // if!==200 添加失败
          // this.$message.success('修改小区成功')
          this.editDialogVisible = false   // 隐藏修改小区的对话框
          // this.getCommunicateList()   // 重新获取用户的列表
        })
      },
      async removeCommunicate(id) {   // 删除小区的函数
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
        // this.$axios.delete('')   // 用户确认删除,发起ajax请求???
        // if!==200 删除失败
        // this.$message.success('删除小区成功小区成功')
        // this.getCommunicateList()   // 重新获取用户的列表
      }
    }
  }
</script>

<style scoped>
  .list-communityName { position: relative; display: flex; align-items: center; }
  .list-input { width: 300px; }
  .list-search { width: 80px; color: #fff; margin-left: 9px;}
  .list-add { position: absolute; right: 0; }

</style>