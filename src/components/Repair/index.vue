<!-- 报修管理页面-->
<template>
  <main-card2 title1="报修管理">
    <div slot="content">
      <div class="repairs-top">
        <el-row :gutter="8">

          <el-col :span="5">
            <el-row :gutter="2">
              <el-col :span="7"><span>小区名称</span></el-col>
              <el-col :span="16">
                <el-select v-model="queryInfo.community" allow-create filterable clearable placeholder="全部小区">
                  <el-option
                      v-for="item in comm_options"
                      :key="item.comm_key"
                      :label="item.label"
                      :value="item.comm_key">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>


          <el-col :span="8">
            <el-row :gutter="4">
              <el-col :span="5.5"><span>报修时间</span></el-col>
              <el-col :span="6">
                <el-date-picker
                    v-model="queryInfo.repair_date"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="5">
            <el-row :gutter="4">
              <el-col :span="7"><span>报修人</span></el-col>
              <el-col :span="16">
                <el-input
                    placeholder="请输入姓名"
                    v-model="queryInfo.repair_name"
                    clearable>
                </el-input>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="2">
            <el-button class="button-warning search-button" @click="getRepairList">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button class="button-info reset-button" @click="resetRepairList(queryInfo)">重置</el-button>
          </el-col>
        </el-row>


        <el-row class="second-line">
          <el-col :span="7">
            <el-row :gutter="2">
              <el-col :span="4.5"><span>报修类型</span></el-col>
              <el-col :span="18">
                <el-select v-model="queryInfo.repair_type" allow-create filterable clearable placeholder="请选择类型">
                  <el-option
                          v-for="item in type_options"
                          :key="item.type_key"
                          :label="item.label"
                          :value="item.type_key">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="9">
            <el-row :gutter="18"  >
              <el-col :span="4.5"><span>房间号</span></el-col>
              <el-col :span="6">
                <el-select v-model="queryInfo.repair_build" allow-create filterable clearable placeholder="楼号">
                  <el-option
                      v-for="item in build_options"
                      :key="item.build_key"
                      :label="item.label"
                      :value="item.build_key">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="7">
                <el-select v-model="queryInfo.repair_unit" allow-create filterable clearable placeholder="单元">
                  <el-option
                      v-for="item in unit_options"
                      :key="item.unit_key"
                      :label="item.label"
                      :value="item.unit_key">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select v-model="queryInfo.repair_house" allow-create filterable clearable placeholder="房间">
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
      <el-table :data="repair_list" stripe :header-cell-style="getRowClass">
        <el-table-column label="序号" prop="id"></el-table-column>
        <el-table-column label="小区名" prop="name"></el-table-column>
        <el-table-column label="报修时间" prop="name"></el-table-column>
        <el-table-column label="报修类型" prop="name"></el-table-column>
        <el-table-column label="报修问题">
          <template slot-scope="scope">
            <span @click="showEditDialog(scope.row.id)" content1="详情"></span>
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
            <span @click="showEditDialog(scope.row.id)" class="active-font font-primary">维修反馈</span>
            <span @click="showEditDialog(scope.row.id)" class="active-font font-primary">线下支付</span>
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
          :total="repair_total">
      </el-pagination>
    </div>
  </main-card2>
</template>

<script>

  export default {
    name: "Repair",
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
        queryInfo: {   // 获取报修列表时 传的参数对象
          query: '',   // 查询参数,
          community: '',   // 查询参数,小区
          repair_build: '',   // 查询参数,楼号
          repair_unit: '',   // 查询参数,单元号
          repair_house: '',   // 查询参数,房间号
          repair_name: '',   // 查询参数,报修人
          repair_date: '',   // 查询参数,报修时间
          repair_type: '',   // 查询参数, 报修类型
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
        type_options:  [{   // 报修类型数据下拉菜单列表
          type_key: '类型1',
          label: '门锁'
        }, {
          type_key: '类型2',
          label: '水管'
        }, {
          type_key: '类型3',
          label: '灯具'
        }],
        repair_list: [],   // 存储请求回来的 报修列表
        repair_total: 0,   // 报修列表的总数
      }
    },
    created() {
      this.getRepairList()
    },
    methods: {
      async getRepairList() {   //获取小区列表    发起Ajax请求-----------???
        const { data: res } =await this.$axios.get('/api/communicate')   //,{ params: this.queryInfo}
        if(res.meta.status !==200) return this.$message.error('获取小区列表失败!~')
        this.repair_list = res.data.communicates
        this.repair_total = res.data.total
      },
      resetRepairList(obj){   // 点击重置按钮时触发的事件
        this.clearObj(obj)   // 调用全局函数清空对象
        this.getRepairList()
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {   // 设置table的首行背景颜色
        if(rowIndex == 0) {
          return 'background:#EEE'
        }
        else { return ''}
      },
      handleSizeChange(newSize) {   // 监听pagesize改变的函数
        this.queryInfo.pagesize = newSize
        this.getRepairList()
      },
      handleCurrentChange(newPage) {   // 监听页码值改变的函数
        this.queryInfo.pagenum = newPage
        this.getRepairList()
      }
    }
  }
</script>

<style scoped>
  .repairs-top {  }
  .el-row .el-col { line-height: 38px;}
  .el-row span { font-weight: 600; font-size: 14px;}
  .repair-nav .el-button { color: #000; border-color: #DDD; background-color: #fff;}
  .repair-nav .el-button:hover { background-color: #235FED; border-color: #235FED; color: #fff;}
  .repair-nav .el-button:focus { background-color: #235FED; border-color: #235FED; color: #fff;}
</style>