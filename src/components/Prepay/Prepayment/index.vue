<!-- 预缴管理下的  预缴费-->
<template>
  <main-card2 title1="预缴管理" title2="预缴费">
    <div slot="content">
      <div class="prepayment-box">
        <el-steps :active="active" align-center finish-status="success">
          <el-step title="填写预缴费"></el-step>
          <el-step title="确认订单信息"></el-step>
          <el-step title="支付成功"></el-step>
        </el-steps>

        <div class="prepayment-house"><span>|</span>房间信息</div>

        <div class="prepayment-housenum">
          <el-row :gutter="10">
            <el-col :span="3"><span>房间号</span></el-col>
            <el-col :span="5">
              <el-select v-model="queryInfo.prepayment_build" allow-create filterable clearable placeholder="楼号">
                <el-option
                    v-for="item in build_options"
                    :key="item.build_key"
                    :label="item.label"
                    :value="item.build_key">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5">
              <el-select v-model="queryInfo.prepayment_unit" allow-create filterable clearable placeholder="单元">
                <el-option
                    v-for="item in unit_options"
                    :key="item.unit_key"
                    :label="item.label"
                    :value="item.unit_key">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5">
              <el-select v-model="queryInfo.prepayment_house" allow-create filterable clearable placeholder="房间">
                <el-option
                    v-for="item in house_options"
                    :key="item.house_key"
                    :label="item.label"
                    :value="item.house_key">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>

        
        <div class="prepayment-payinfo"><span>|</span>费用信息</div>
        <div class="prepayment-payitem"><span>|</span>收费项</div>
        <div class="prepayment-total">
          总计: <span>0</span>
          <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
        </div>


      </div>

    </div>

  </main-card2>
</template>

<script>
  import Qs from 'qs'

  export default {
    name: "Prepayment",
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
        active: 0,
        queryInfo: {   // 获取预缴查询列表时 传的参数对象
          query: '',   // 查询参数,
          prepayment_pay: '',   // 查询参数,缴费项
          prepayment_build: '',   // 查询参数,楼号
          prepayment_unit: '',   // 查询参数,单元号
          prepayment_house: '',   // 查询参数,房间号
          prepayment_date: '',   // 查询参数,缴费档期
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
        prepayment_list: [],   // 存储请求回来的 预缴查询列表
        prepayment_total: 0,   // 预缴查询列表的总数

      }
    },
    created() {   // 生命周期函数, 用于初始化页面
      this.getprepaymentList()   // 调用该函数初始化预缴查询的列表区域
    },


    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      },
      async getprepaymentList() {   //获取预缴查询列表
        const { data: res } =await this.$axios.get('/api/communicate')   //,{ params: this.queryInfo}
        if(res.meta.status !==200) return this.$message.error('获取预缴查询列表失败!~')
        this.prepayment_list = res.data.communicates
        this.prepayment_total = res.data.total
      },
      resetprepaymentList(obj){   // 点击重置按钮时触发的事件
        this.clearObj(obj)   // 调用全局函数清空对象
        this.getprepaymentList()
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {   // 设置table第一行的背景色
        if(rowIndex == 0) {
          return 'background:#f0f2f5'
        }
        else { return ''}
      },
      handleSizeChange(newSize) {   // 分页显示: 监听pagesize改变的函数
        this.queryInfo.pagesize = newSize
        this.getprepaymentList()
      },
      handleCurrentChange(newPage) {   // 分页显示: 监听页码值改变的函数
        this.queryInfo.pagenum = newPage
        this.getprepaymentList()
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
  .prepayment-box { width: 45%; height: 100%; margin: 0 auto; background-color: #EFF; padding-top: 50px; }
  .prepayment-box span { color: #FF6868; font-weight: 600; font-size: 14px; }
  .prepayment-box>:nth-child(2n) { margin-bottom: 20px; }
  .prepayment-box>:nth-child(2n+1) { margin-bottom: 40px; }
  .prepayment-housenum { padding-left: 5px; }

  .el-row .el-col { line-height: 38px;}
  .el-row span { font-weight: 600; font-size: 12px; color: #000; }

  .prepayment-step { color: #FF9A9A !important; }

</style>