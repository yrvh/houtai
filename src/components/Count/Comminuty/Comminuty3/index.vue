<template>
  <main-card title="收款总金额">
    <div slot="content">
      <div class="count3-paymentDate">
        <el-input class="count3-input" placeholder="所属年月" v-model="queryInfo.query" clearable @clear="getCommunicateList">
          <template slot="prepend">款费日期</template>
        </el-input>
        <el-button type="primary" class="count3-search" @click="getCommunicateList"><i class="iconfont icon-search"></i>搜索</el-button>
      </div>

      <div class="count3-Date">款费所属期: {{'2019年12月'}}</div>
      <div class="count3-money">
        <div class="count3-moneyReceivable count3-moneyChild">应收总金额(元):<span> {{6544}}</span></div>
        <div class="count3-moneyReality count3-moneyChild">实收总金额(元):<span> {{5698}}</span></div>
      </div>
    </div>



    <el-card class="count3-bottomCard">
      <div class="count3-title">收款明细</div>
      <div class="count3-paymentDate">
        <el-date-picker
            class="count3-date-picker"
            v-model="dateStr"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
        </el-date-picker>

        <el-input class="count3-input" placeholder="所属年月" v-model="queryInfo.query" clearable @clear="getCommunicateList">
          <template slot="prepend">款费日期</template>
        </el-input>
        <el-button type="primary" class="count3-search" @click="getCommunicateList"><i class="iconfont icon-search"></i>搜索</el-button>
      </div>

      <div class="count3-Date">款费所属期: {{'2019年12月'}}</div>

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
    </el-card>

  </main-card>


</template>


<script>

  export default {
    name: "Count3",
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
        editForm: {},

        dateStr: '',   // 开始时间和结束时间
        pickerOptions2: {
          shortcuts: [
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }
          ]
        },
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
  .count3-paymentDate { height: 65px; display: flex; align-items: flex-end; }
  .count3-input { width: 250px; }
  .count3-search { width: 85px; color: #fff; margin-left: 20px;}
  .count3-Date { margin: 25px 0; }

  .count3-money { display: flex; justify-content: space-between;}
  .count3-moneyChild { width: 49%; height: 120px; border-radius: 4px; line-height: 120px; text-align: center;}
  .count3-moneyChild span { font-size: 24px; font-weight: 700; }
  .count3-moneyReceivable { border: 1px solid #0D9CF4; }
  .count3-moneyReceivable span{ color: #0D9CF4; }
  .count3-moneyReality { border: 1px solid #FF6565; }
  .count3-moneyReality span{ color: #FF6565; }
  .count3-export { width: 100%; height: 42px;}
  .count3-export>.el-button { float: right; }

  .count3-bottomCard { margin-top: 20px; }
  .count3-title { width: 100%; height: 40px; background-color: #FFF; font-size: 18px; border-bottom: 1px solid #ddd;}
  .el-card { width: 100%; }
  .count3-date-picker { margin-right: 20px; }
</style>