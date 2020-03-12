<!-- 数据管理下的 房间信息页面-->
<template>
  <main-card2 title1="数据管理" title2="房间信息">
    <div slot="content">
      <div class="repairs-top">
        <el-row :gutter="8">
          <el-col :span="6">
            <el-row :gutter="2">
              <el-col :span="4.5"><span>物业名称</span></el-col>
              <el-col :span="18">
                <el-select v-model="merchantValue" allow-create filterable clearable placeholder="全部物业">
                  <el-option
                      v-for="item in merchantOptions"
                      :key="item.merchantKey"
                      :label="item.label"
                      :value="item.merchantKey">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="5">
            <el-row :gutter="2">
              <el-col :span="4.5"><span>小区名称</span></el-col>
              <el-col :span="17">
                <el-select v-model="value" allow-create filterable clearable placeholder="请输入小区名">
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

          <el-col :span="4">
            <el-row :gutter="4">
              <el-col :span="5.5"><span>房间号</span></el-col>
              <el-col :span="17">
                <el-input
                    placeholder="输入房间号"
                    v-model="manValue"
                    clearable>
                </el-input>
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
            <el-button type="danger" class="repair-search repair-button" @click="getCommunicateList">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="info" class="repair-clear repair-button" @click="getCommunicateList">重置</el-button>
          </el-col>
        </el-row>

        <div class="repair-nav">
          <el-button type="primary" size="small" plain>待处理</el-button>
          <el-button type="primary" size="small" plain>待分配</el-button>
          <el-button type="primary" size="small" plain>待支付</el-button>
          <el-button type="primary" size="small" plain>处理中</el-button>
          <el-button type="primary" size="small" plain>已完成</el-button>
          <el-button type="primary" size="small" plain>所有报修</el-button>
        </div>
      </div>

      <!--   小区列表区, 数据展示   -->
      <el-table :data="communicateList" stripe :header-cell-style="getRowClass">
        <el-table-column label="序号" prop="id"></el-table-column>
        <el-table-column label="小区名" prop="name"></el-table-column>
        <el-table-column label="报修时间" prop="name"></el-table-column>
        <el-table-column label="报修类型" prop="name"></el-table-column>
        <el-table-column label="报修问题">
          <template slot-scope="scope">
            <click-span @click="showEditDialog(scope.row.id)" content1="详情"></click-span>
          </template>
        </el-table-column>
        <el-table-column label="报修地点" prop="name"></el-table-column>
        <el-table-column label="报修人" prop="name"></el-table-column>
        <el-table-column label="联系电话" prop="name"></el-table-column>
        <el-table-column label="维修员" prop="address"></el-table-column>
        <el-table-column label="图片查看" prop="account"></el-table-column>
        <el-table-column label="报修时间" prop="account"></el-table-column>
        <el-table-column label="操作" min-width="120" class="repair-table-lastcol">
          <template slot-scope="scope">
            <click-span @click="showEditDialog(scope.row.id)" content1="维修反馈"></click-span>
            <click-span @click="showEditDialog(scope.row.id)" content1="线下支付"></click-span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </main-card2>
</template>

<script>

  export default {
    name: "Repair",
    components:{},
    data() {
      // 自定义校验规则
      var checkMobile = (rule, value, cb) => {
        const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/
        if(regMobile.test(value)) return cb()
        cb(new Error('请输入合法的手机号!~'))
      }

      return {
        merchantValue: '',   // 绑定当前被选中的物业公司
        merchantOptions:  [{   // 物业数据列表
          merchantKey: '选项1',
          label: '同盛物业'
        }, {
          merchantKey: '选项2',
          label: '小海物业'
        }, {
          merchantKey: '选项3',
          label: '银湾物业'
        }],
        value: '',   // 绑定当前被选中的小区
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
        repairValue: '',   // 报修类型
        repairTypeOptions: [{   // 报修类型选项
          repairKey: '选项1',
          label: '类型1'
        }, {
          repairKey: '选项2',
          label: '类型2'
        }, {
          repairKey: '选项3',
          label: '类型3'
        }, {
          repairKey: '选项4',
          label: '类型4'
        }, {
          repairKey: '选项5',
          label: '类型5'
        }],

        //================================================================
        queryInfo: {   // 获取小区列表时 传的参数对象
          query: '',   // 查询参数
          pagenum: 1,   // 当前页码
          pagesize: 2,   // 当前每页显示多少条数据
        },
        communicateList: [],   // 小区列表
        total: 0,   // 小区总数据条数
        addDialogVisible: false,   // 控制添加小区的显示与隐藏
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
          cancelButtonText: '取消',
          type: 'warning'
        }).catch( err => {return err})
        if(confirmResult !== 'confirm'){
          return this.$message.info('已取消了删除!~~')
        }
        // this.$axios.delete('')   // 用户确认删除???
        // if!==200 删除失败
        // this.$message.success('删除小区成功小区成功')
        // this.getCommunicateList()   // 重新获取用户的列表
      }
    }
  }
</script>

<style scoped>
  .repairs-top {  }
  .el-row .el-col { line-height: 38px;}
  .el-row span { font-weight: 600; font-size: 14px;}
  .repair-button { width: 70px; color: #fff; }
  .repair-search { margin-left: 10px;}
  .repair-row2 { margin: 20px 0; }

  .repair-nav { }
  .repair-nav .el-button { color: #000; border-color: #DDD; background-color: #fff;}
  .repair-nav .el-button:hover { background-color: #235FED; border-color: #235FED; color: #fff;}
  .repair-nav .el-button:focus { background-color: #235FED; border-color: #235FED; color: #fff;}
  /*.repair-nav-badge { margin: 10px 40px 0 0;}*/
</style>