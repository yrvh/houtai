<!-- 预缴管理下的  预缴查询页面 -->
<template>
  <main-card2 title1="预缴管理" title2="预缴查询">
    <div slot="content">
      <div class="payquery-top">
        <el-row :gutter="6">

          <el-col :span="9">
            <el-row :gutter="18"  >
              <el-col :span="4.5"><span>房间号</span></el-col>
              <el-col :span="6">
                <el-select v-model="queryInfo.payquery_build" allow-create filterable clearable placeholder="楼号">
                  <el-option
                      v-for="item in build_options"
                      :key="item.build_key"
                      :label="item.label"
                      :value="item.build_key">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="7">
                <el-select v-model="queryInfo.payquery_unit" allow-create filterable clearable placeholder="单元">
                  <el-option
                      v-for="item in unit_options"
                      :key="item.unit_key"
                      :label="item.label"
                      :value="item.unit_key">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select v-model="queryInfo.payquery_house" allow-create filterable clearable placeholder="房间">
                  <el-option
                      v-for="item in house_options"
                      :key="item.house_key"
                      :label="item.label"
                      :value="item.house_key">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="4">
            <el-row :gutter="2">
              <el-col :span="7"><span>缴费项</span></el-col>
              <el-col :span="16">
                <el-select v-model="queryInfo.payquery_pay" allow-create filterable clearable placeholder="缴费项">
                  <el-option
                      v-for="item in pay_options"
                      :key="item.pay_key"
                      :label="item.label"
                      :value="item.pay_key">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>


          <el-col :span="7">
            <el-row :gutter="4" >
              <el-col :span="5"><span>发布时间</span></el-col>
              <el-col :span="10">
                <el-date-picker
                    v-model="queryInfo.payquery_date"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="2">
            <el-button type="danger" class="button-warning" @click="getPayqueryList">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="info" class="button-info" @click="resetPayqueryList(queryInfo)">重置</el-button>
          </el-col>

        </el-row>
      </div>


      <!--   预缴查询列表展示区   -->
      <el-table :data="payquery_list" stripe :header-cell-style="getRowClass">
        <el-table-column label="订单号" prop="name" min-width="100px"></el-table-column>
        <el-table-column label="房间号" prop="account"></el-table-column>
        <el-table-column label="住户" prop="name"></el-table-column>
        <el-table-column label="创建日期" prop="account"></el-table-column>
        <el-table-column label="预缴金额" prop="address"></el-table-column>
        <el-table-column label="缴费项" prop="name"></el-table-column>
        <el-table-column label="操作" min-width="100px">
          <template slot-scope="scope">
            <span @click="showDetailDialog(scope.row)" class="active-font font-primary">详情?</span>
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
          :total="payquery_total">
      </el-pagination>
    </div>

  </main-card2>
</template>

<script>
  import Qs from 'qs'

  export default {
    name: "Payquery",
    components:{},
    data() {
      // 自定义手机号校验规则
      var payqueryMobile = (rule, value, cb) => {
        const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/   //电话号码的 正则
        if(regMobile.test(value)) return cb()
        cb(new Error('请输入合法的手机号!~'))
      }
      // 自定义邮箱校验
      var payqueryEmail = (rule, value, cb) => {
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        if(regEmail.test(value)) return cb()
        cb(new Error('请输入合法的邮箱!~'))
      }
      return {
        queryInfo: {   // 获取预缴查询列表时 传的参数对象
          query: '',   // 查询参数,
          payquery_pay: '',   // 查询参数,缴费项
          payquery_build: '',   // 查询参数,楼号
          payquery_unit: '',   // 查询参数,单元号
          payquery_house: '',   // 查询参数,房间号
          payquery_date: '',   // 查询参数,缴费档期
          pagenum: 1,   // 当前页码
          pagesize: 2,   // 当前每页显示多少条数据
        },

        pay_options:  [{   // 缴费项数据下拉菜单列表
          pay_key: '缴费1',
          label: '电费'
        }, {
          pay_key: '缴费2',
          label: '水费'
        }, {
          pay_key: '缴费3',
          label: '物业费'
        }],
        build_options:  [{   // 楼号数据下拉菜单列表
          build_key: '楼1',
          label: '1号楼'
        }, {
          build_key: '楼2',
          label: '1号楼'
        }, {
          build_key: '楼3',
          label: '1号楼'
        }],
        unit_options:  [{   // 单元号数据下拉菜单列表
          unit_key: '单元1',
          label: '一单元'
        }, {
          unit_key: '单元2',
          label: '二单元'
        }, {
          unit_key: '单元3',
          label: '三单元'
        }],
        house_options:  [{   // 房间数据下拉菜单列表
          house_key: '房间1',
          label: '301'
        }, {
          house_key: '房间2',
          label: '302'
        }, {
          house_key: '房间3',
          label: '303'
        }],
        payquery_list: [],   // 存储请求回来的 预缴查询列表
        payquery_total: 0,   // 预缴查询列表的总数

      }
    },
    created() {   // 生命周期函数, 用于初始化页面
      this.getPayqueryList()   // 调用该函数初始化预缴查询的列表区域
    },


    methods: {
      async getPayqueryList() {   //获取预缴查询列表
        const { data: res } =await this.$axios.get('/api/communicate')   //,{ params: this.queryInfo}
        if(res.meta.status !==200) return this.$message.error('获取预缴查询列表失败!~')
        this.payquery_list = res.data.communicates
        this.payquery_total = res.data.total
      },
      resetPayqueryList(obj){   // 点击重置按钮时触发的事件
        this.clearObj(obj)   // 调用全局函数清空对象
        this.getPayqueryList()
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {   // 设置table第一行的背景色
        if(rowIndex == 0) {
          return 'background:#f0f2f5'
        }
        else { return ''}
      },
      handleSizeChange(newSize) {   // 分页显示: 监听pagesize改变的函数
        this.queryInfo.pagesize = newSize
        this.getPayqueryList()
      },
      handleCurrentChange(newPage) {   // 分页显示: 监听页码值改变的函数
        this.queryInfo.pagenum = newPage
        this.getPayqueryList()
      },
      addDialogClosed() {   // 监听添加商户的对话框关闭时触发的事件
        this.$refs.addFormRef.resetFields()
      },
      showDetailDialog() {   // 点击详情时的,处理函数
        console.log('点击了详情')
      }
    }
  }
</script>

<style scoped>
  .el-row .el-col { line-height: 38px;}
  .el-row span { font-weight: 600; font-size: 14px;}
</style>