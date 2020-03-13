<!-- 数据管理下的 房间信息页面-->
<template>
  <main-card2 title1="数据管理" title2="房间信息">
    <div slot="content">
      <div class="house-top">
        <el-row :gutter="8">
          <el-col :span="6">
            <el-row :gutter="2">
              <el-col :span="4.5"><span>物业名称</span></el-col>
              <el-col :span="18">
                <el-select v-model="queryInfo.merchant" allow-create filterable clearable placeholder="全部物业">
                  <el-option
                      v-for="item in merchant_options"
                      :key="item.merchant_key"
                      :label="item.label"
                      :value="item.merchant_key">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="5">
            <el-row :gutter="2">
              <el-col :span="4.5"><span>小区名称</span></el-col>
              <el-col :span="17">
                <el-select v-model="queryInfo.community" allow-create filterable clearable placeholder="请输入小区名">
                  <el-option
                      v-for="item in comm_options"
                      :key="item.communityKey"
                      :label="item.label"
                      :value="item.communityKey">
                  </el-option>
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
                    v-model="queryInfo.house"
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
                    v-model="queryInfo.owner"
                    clearable>
                </el-input>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="2">
            <el-button class="button-warning house-button" @click="getHouseList">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button class="button-info house-button" @click="resetHouseList">重置</el-button>
          </el-col>
        </el-row>

        <div class="second-line">
          <el-button class="button-primary" size="small" @click="addDialogVisible = true"><i class="iconfont icon-add"></i>手动添加</el-button>
          <el-button class="button-success" size="medium" @click="addDialogVisible = true">Excel   模板</el-button>
          <el-button class="button-primary" size="medium" @click="addDialogVisible = true">房间导入</el-button>
          <el-button class="button-success" size="medium" @click="addDialogVisible = true">房间导出</el-button>
        </div>
      </div>

      <!--   小区列表区, 数据展示   -->
      <el-table :data="house_list" stripe :header-cell-style="getRowClass">
        <el-table-column label="序号" prop="id"></el-table-column>
        <el-table-column label="小区名" prop="name"></el-table-column>
        <el-table-column label="房间号" prop="address"></el-table-column>
        <el-table-column label="面积" prop="name"></el-table-column>
        <el-table-column label="业主姓名" prop="name"></el-table-column>
        <el-table-column label="业主电话" prop="name"></el-table-column>
        <el-table-column label="租户姓名" prop="name"></el-table-column>
        <el-table-column label="操作"  class="house-table-lastcol">
          <template slot-scope="scope">
            <span @click="showEditDialog(scope.row.id)" class="active-font font-primary">详情</span>
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
          :total="house_total">
      </el-pagination>
    </div>
  </main-card2>
</template>

<script>

  export default {
    name: "House",
    components:{},
    data() {
      // 自定义校验规则
      var checkMobile = (rule, value, cb) => {
        const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/
        if(regMobile.test(value)) return cb()
        cb(new Error('请输入合法的手机号!~'))
      }

      return {
        queryInfo: {   // 获取房间信息时 传的参数对象
          query: '',   // 查询参数,
          merchant: '',   // 查询参数,物业公司
          community: '',   // 查询参数,小区
          house: '',   // 查询参数,房间号
          owner: '',   // 查询参数,业主姓名
          pagenum: 1,   // 当前页码
          pagesize: 2,   // 当前每页显示多少条数据
        },

        merchant_options:  [{   // 物业数据下拉菜单列表
          merchant_key: '选项1',
          label: '同盛物业'
        }, {
          merchant_key: '选项2',
          label: '小海物业'
        }, {
          merchant_key: '选项3',
          label: '银湾物业'
        }],

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
        house_list: [],   // 小区列表
        house_total: 0,   // 房间信息总数据条数
        //================================================================


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
      this.getHouseList()
    },
    methods: {
      async getHouseList() {   //获取小区列表
        const { data: res } =await this.$axios.get('/api/communicate')   //,{ params: this.queryInfo}
        if(res.meta.status !==200) return this.$message.error('获取小区列表失败!~')
        this.house_list = res.data.communicates
        this.house_total = res.data.total
      },
      resetHouseList(){   // 点击重置按钮时触发的事件
        this.queryInfo.merchant = ''
        this.queryInfo.community = ''
        this.queryInfo.house = ''
        this.queryInfo.owner = ''
        this.getHouseList()
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {   // 设置table的首行背景颜色
        if(rowIndex == 0) {
          return 'background:#EEE'
        }
        else { return ''}
      },
      handleSizeChange(newSize) {   // 监听pagesize改变的函数
        this.queryInfo.pagesize = newSize
        this.getHouseList()
      },
      handleCurrentChange(newPage) {   // 监听页码值改变的函数
        this.queryInfo.pagenum = newPage
        this.getHouseList()
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
          // this.getHouseList()   // 重新获取用户的列表
        })
      },
      async showEditDialog(row) {   // 点击修改按钮, 展示修改页
        console.log("====================")
        console.log(row)
        this.editForm = row   // 当行数据赋值给 要修改的小区
        // const {data:comm} =await this.$axios.get('/api/communicate')
        // if(comm.meta.status !==200) return this.$message.error('查询小区信息失败')
        // this.editForm = comm.data.house[parseInt(row.id)-1]
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
          // this.getHouseList()   // 重新获取用户的列表
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
        // this.getHouseList()   // 重新获取用户的列表
      }
    }
  }
</script>

<style scoped>
  .house-top {  }
  .el-row .el-col { line-height: 38px;}
  .el-row span { font-weight: 600; font-size: 14px;}
  .house-button { width: 70px; }
  
</style>