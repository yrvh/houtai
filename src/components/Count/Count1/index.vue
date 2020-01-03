<template>
  <main-card title="小区总数">
    <div slot="content">
      <div class="count1-communityName">
        <el-input class="count1-input" placeholder="全部小区" v-model="queryInfo.query" clearable @clear="getCommunicateList">
          <template slot="prepend">小区名</template>
        </el-input>
        <el-button type="primary" class="count1-search" @click="getCommunicateList"><i class="iconfont icon-search"></i>搜索</el-button>
        <el-button class="count1-add" @click="addDialogVisible = true"><i class="iconfont icon-add"></i>添加小区</el-button>
      </div>

      <!--   小区列表区, 数据展示   -->
      <el-table :data="communicateList" stripe :header-cell-style="getRowClass">
        <el-table-column label="序号" prop="id"></el-table-column>
        <el-table-column label="小区名称" prop="name"></el-table-column>
        <el-table-column label="小区地址" prop="address"></el-table-column>
        <el-table-column label="账号" prop="account"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" plain @click="showEditDialog(scope.row.id)">修改</el-button>
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
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button @click="addComm" type="primary">确 定</el-button>
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
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button @click="editComm" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </main-card>

<!--  <div class="box">-->
<!--    <el-card>-->
<!--      <div class="count1-title">小区总数</div>-->
<!--      <el-row class="count1-communityName" :gutter="20">-->
<!--        <el-col :span="4">-->
<!--          <el-input placeholder="全部小区" v-model="queryInfo.query" clearable @clear="getCommunicateList">-->
<!--            <template slot="prepend">小区名</template>-->
<!--          </el-input>-->
<!--        </el-col>-->
<!--        <el-col :span="1.3">-->
<!--          <el-button type="" class="count1-search" @click="getCommunicateList"><i class="iconfont icon-search"></i>搜索</el-button>-->
<!--        </el-col>-->
<!--        <el-button type="" class="count1-add" @click="addDialogVisible = true"><i class="iconfont icon-add"></i>添加小区</el-button>-->
<!--      </el-row>-->

<!--      &lt;!&ndash;   小区列表区, 数据展示   &ndash;&gt;-->
<!--      <el-table :data="communicateList" stripe :header-cell-style="getRowClass">-->
<!--        <el-table-column label="序号" prop="id"></el-table-column>-->
<!--        <el-table-column label="小区名称" prop="name"></el-table-column>-->
<!--        <el-table-column label="小区地址" prop="address"></el-table-column>-->
<!--        <el-table-column label="账号" prop="account"></el-table-column>-->
<!--        <el-table-column label="操作">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button type="primary" plain @click="showEditDialog(scope.row.id)">修改</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->

<!--      &lt;!&ndash; 分页区域 &ndash;&gt;-->
<!--      <el-pagination-->
<!--          @size-change="handleSizeChange"-->
<!--          @current-change="handleCurrentChange"-->
<!--          :current-page="queryInfo.pagenum"-->
<!--          :page-sizes="[5, 8, 15, 20, 30]"-->
<!--          :page-size="queryInfo.pagesize"-->
<!--          layout="total, sizes, prev, pager, next, jumper"-->
<!--          :total="total">-->
<!--      </el-pagination>-->
<!--    </el-card>-->

<!--    &lt;!&ndash;  这是添加小区的 对话框  &ndash;&gt;-->
<!--    <el-dialog title="添加小区" :visible.sync="addDialogVisible" width="40%" @close="addDialogClosed">-->

<!--      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">-->
<!--        <el-form-item label="小区名称" prop="name">-->
<!--          <el-input v-model="addForm.name"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="地址" prop="address">-->
<!--          <el-input v-model="addForm.address"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="账号" prop="account">-->
<!--          <el-input v-model="addForm.account"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="密码" prop="password">-->
<!--          <el-input v-model="addForm.password" type="password"></el-input>-->
<!--        </el-form-item>-->
<!--      </el-form>-->

<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="addDialogVisible = false">取 消</el-button>-->
<!--        <el-button @click="addComm" type="primary">确 定</el-button>-->
<!--      </span>-->
<!--    </el-dialog>-->

<!--    &lt;!&ndash;  修改小区的 对话框 &ndash;&gt;-->
<!--    <el-dialog title="修改小区信息" :visible.sync="editDialogVisible" width="40%" @close="editDialogClosed">-->

<!--      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">-->
<!--        <el-form-item label="小区名称">-->
<!--          <el-input v-model="editForm.name" disabled></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="地址" prop="address">-->
<!--          <el-input v-model="editForm.address"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="账号" prop="account">-->
<!--          <el-input v-model="editForm.account"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="密码" prop="password">-->
<!--          <el-input v-model="editForm.password" type="password"></el-input>-->
<!--        </el-form-item>-->
<!--      </el-form>-->

<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="editDialogVisible = false">取 消</el-button>-->
<!--        <el-button @click="editComm" type="primary">确 定</el-button>-->
<!--      </span>-->
<!--    </el-dialog>-->
<!--  </div>-->
</template>

<script>

  export default {
    name: "Count1",
    components:{},
    data() {
      // 自定义校验规则
      var checkMobile = (rule, value, cb) => {
        const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/
        if(regMobile.test(value)) return cb()
        cb(new Error('请输入合法的手机号!~'))
      }

      return {
        queryInfo: {
          query: '',
          pagenum: 1,
          pagesize: 2,
        },
        communicateList: [],
        total: 0,
        addDialogVisible: false,
        addForm: {
          name: '',
          address: '',
          account: '',
          password: ''
        },
        addFormRules: {
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
        editFormRules: {
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
        editDialogVisible: false,
        editForm: {}
      }
    },
    created() {
      this.getCommunicateList()
    },
    methods: {
      async getCommunicateList() {   //获取小区列表
        const { data: comm } =await this.$axios.get('/api/communicate')   //,{ params: this.queryInfo}
        if(comm.meta.status !==200) return this.$message.error('获取用户列表失败!~')
        this.communicateList = comm.data.communicates
        this.total = comm.data.total
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {
        if(rowIndex == 0) {
          return 'background:#f0f2f5'
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
          // 如果校验成功,, 可以发起网络请求###
        })
      },
      async showEditDialog(id) {   // 点击修改按钮, 展示修改页
        const {data:comm} =await this.$axios.get('/api/communicate')
        if(comm.meta.status !==200) return this.$message.error('查询小区信息失败')
        this.editForm = comm.data.communicates[parseInt(id)-1]
        this.editDialogVisible = true
      },
      editDialogClosed() {   // 监听对话框关闭事件
        this.$refs.editFormRef.resetFields()
      },
      editComm() {   // 点击确定按钮, 修改小区
        this.$refs.editFormRef.validate( (valid) => {
          if(!valid) return
          // 如果校验成功,, 可以发起网络请求###
        })
      },
    }
  }
</script>

<style scoped>
  .count1-communityName { height: 65px; position: relative; display: flex; align-items: flex-end;}
  .count1-input { width: 250px; }
  .count1-search { width: 85px; color: #fff; margin-left: 20px;}
  .count1-add { position: absolute; right: 0; bottom: -8px; background-color: #06D673; color: #fff;}

</style>