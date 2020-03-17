<!-- 账单管理下的 账单列表页面 -->
<template>
  <main-card2 title1="账单管理" title2="账单列表">
    <div slot="content">
      <div class="bills-top">
        <el-row :gutter="6">

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

          <el-col :span="9">
            <el-row :gutter="18"  >
              <el-col :span="4.5"><span>房间号</span></el-col>
              <el-col :span="6">
                <el-select v-model="queryInfo.bills_build" allow-create filterable clearable placeholder="楼号">
                  <el-option
                      v-for="item in build_options"
                      :key="item.build_key"
                      :label="item.label"
                      :value="item.build_key">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="7">
                <el-select v-model="queryInfo.bills_unit" allow-create filterable clearable placeholder="单元">
                  <el-option
                      v-for="item in unit_options"
                      :key="item.unit_key"
                      :label="item.label"
                      :value="item.unit_key">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select v-model="queryInfo.bills_house" allow-create filterable clearable placeholder="房间">
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

          <el-col :span="5">
            <el-row :gutter="4">
              <el-col :span="7"><span>业主姓名</span></el-col>
              <el-col :span="16">
                <el-input
                    placeholder="请输入姓名"
                    v-model="queryInfo.bills_owner"
                    clearable>
                </el-input>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="4">
            <el-row :gutter="4">
              <el-col :span="7"><span>流水号</span></el-col>
              <el-col :span="16">
                <el-input
                    placeholder="请输入流水号"
                    v-model="queryInfo.bills_water"
                    clearable>
                </el-input>
              </el-col>
            </el-row>
          </el-col>

        </el-row>

        <el-row class="second-line">
          <el-col :span="6">
            <el-row :gutter="4">
              <el-col :span="5.5"><span>联系电话</span></el-col>
              <el-col :span="16">
                <el-input
                    placeholder="请输入联系电话"
                    v-model="queryInfo.bills_tel"
                    clearable>
                </el-input>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="6">
            <el-row :gutter="4">
              <el-col :span="5.5"><span>缴费状态</span></el-col>
              <el-col :span="16">
                <el-input
                    placeholder="请输入缴费状态"
                    v-model="queryInfo.bills_paystatus"
                    clearable>
                </el-input>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="6">
            <el-row :gutter="4">
              <el-col :span="5.5"><span>逾期状态</span></el-col>
              <el-col :span="16">
                <el-input
                    placeholder="请输入逾期状态"
                    v-model="queryInfo.bills_overdue"
                    clearable>
                </el-input>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="6">
            <el-row :gutter="4">
              <el-col :span="5.5"><span>缴费档期</span></el-col>
              <el-col :span="16">
                <el-input
                    placeholder="请输入缴费档期"
                    v-model="queryInfo.bills_stage"
                    clearable>
                </el-input>
              </el-col>
            </el-row>
          </el-col>

        </el-row>

        <el-row class="second-line">
          <el-col :span="8">
            <el-row :gutter="4">
              <el-col :span="5.5"><span>缴费时间</span></el-col>
              <el-col :span="6">
                <el-date-picker
                    v-model="queryInfo.bills_date"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="2">
            <el-button class="button-warning search-button" @click="getBillsList">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button class="button-info reset-button" @click="resetBillsList">重置</el-button>
          </el-col>

        </el-row>


        <div class="second-line">
          <el-button class="button-primary" size="small" @click="addDialogVisible = true"><i class="iconfont icon-add"></i>添加账单</el-button>
          <el-button class="button-primary" size="small" @click="addDialogVisible = true"><i class="iconfont icon-add"></i>缴费数据上传</el-button>
          <el-button class="button-success" size="small" @click="addDialogVisible = true"><i class="iconfont icon-add"></i>导出缴费数据</el-button>
          <el-button class="button-primary" size="small" @click="addDialogVisible = true"><i class="iconfont icon-add"></i>下载缴费模板</el-button>
          <el-button class="button-warning" size="small" @click="addDialogVisible = true"><i class="iconfont icon-add"></i>删除所选项</el-button>
        </div>
      </div>


      <!--   账单列表展示区   -->
      <el-table :data="bills_list" stripe :header-cell-style="getRowClass">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="房间号" prop="account"></el-table-column>
        <el-table-column label="用户名" prop="name"></el-table-column>
        <el-table-column label="流水号" prop="account"></el-table-column>
        <el-table-column label="缴费档期" prop="address"></el-table-column>
        <el-table-column label="缴费时间" prop="account"></el-table-column>
        <el-table-column label="物业服务费" prop="name"></el-table-column>
        <el-table-column label="垃圾费" prop="account"></el-table-column>
        <el-table-column label="总额" prop="name"></el-table-column>
        <el-table-column label="状态" prop="name"></el-table-column>
        <el-table-column label="备注" prop="name"></el-table-column>
        <el-table-column label="操作" min-width="100px">
          <template slot-scope="scope">
            <span @click="showDetailDialog(scope.row.id)" class="active-font font-primary">详情?</span>
            <span @click="" class="active-font font-warning">收据?</span>
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
          :total="bills_total">
      </el-pagination>
    </div>

    <!--  这是添加账单的 对话框  -->
    <el-dialog title="添加账单" :visible.sync="addDialogVisible" width="40%" @close="addDialogClosed">

      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
        <el-form-item label="账单名称" prop="bills_name">
          <el-input v-model="addForm.bills_name"></el-input>
        </el-form-item>
        <el-form-item label="商户ID" prop="bills_id">
          <el-input v-model="addForm.bills_id"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="concat_name">
          <el-input v-model="addForm.concat_name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="concat_phone">
          <el-input v-model="addForm.concat_phone" ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button @click="addBills" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </main-card2>
</template>

<script>
  import Qs from 'qs'

  export default {
    name: "Bills",
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
        queryInfo: {   // 获取账单列表时 传的参数对象
          query: '',   // 查询参数,
          community: '',   // 查询参数,小区
          bills_build: '',   // 查询参数,楼号
          bills_unit: '',   // 查询参数,单元号
          bills_house: '',   // 查询参数,房间号
          bills_owner: '',   // 查询参数,业主姓名
          bills_water: '',   // 查询参数,流水号
          bills_tel: '',   // 查询参数,联系电话
          bills_paystatus: '',   // 查询参数,缴费状态
          bills_overdue: '',   // 查询参数,逾期状态
          bills_stage: '',   // 查询参数,缴费档期
          bills_date: '',   // 查询参数,缴费时间
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
        bills_list: [],   // 存储请求回来的 账单列表
        bills_total: 0,   // 账单列表的总数
        //============================================================================================


        addDialogVisible: false,   // 该属性控制 添加账单这个对话框的显隐
        addForm: {
          bills_name: '',
          bills_id: '',
          concat_name: '',
          concat_phone: ''
        },
        addFormRules: {   // 添加账单时的 格式校验
          bills_name: [
            {required: true, message: '请输入账单名字!~', trigger: 'blur'},
            { min: 2, max: 15, message: '长度在2 ~ 15个字符之间!~',trigger: 'blur'}
          ],
          bills_id: [
            {required: true, message: '请输入账单appID!~', trigger: 'blur'},
            { min: 2, max: 32, message: '长度在2 ~ 32个字符之间!~',trigger: 'blur'}
          ],
          concat_name: [
            { required: false, message: '请输入联系人!~', trigger: 'blur'},
            { min: 2, max: 15, message: '长度在2 ~ 15个字符之间!~',trigger: 'blur'}
            // { validator: checkMobile, trigger: 'blur'}
          ],
          concat_phone: [
            {required: false, message: '请输入联系电话!~', trigger: 'blur'},
            { validator: checkMobile, trigger: 'blur'}
          ]
        },

        editFormRules: {   //修改账单时的格式校验
          concat_name: [
            { required: false, message: '请输入联系人!~', trigger: 'blur'},
            { min: 2, max: 15, message: '长度在2 ~ 15个字符之间!~',trigger: 'blur'}
          ],
          concat_phone: [
            {required: false, message: '请输入联系电话!~', trigger: 'blur'},
            { validatot: checkMobile,trigger: 'blur'}
          ]
        },
        editDialogVisible: false,   // 控制修改 对话框的显隐
        editForm: { },   // 修改账单时,用于接收 将要修改的账单的信息


        regForm: {   // 注册账单时, 用于存储注册表的数据
          bills_id: '',
          bills_name: '',
          password: '',
          phone: '',
          email: '',
          type: this.bills_id==''? 3:2,
          grade: 1,
        },
        regFormRules: {   // 注册账单时的 格式校验
          bills_name: [
            {required: true, message: '请输入账单名字!~', trigger: 'blur'},
            { min: 2, max: 30, message: '长度在2 ~ 30个字符之间!~',trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入账单密码!~', trigger: 'blur'},
            { min: 2, max: 32, message: '长度在2 ~ 32个字符之间!~',trigger: 'blur'}
          ],
          phone: [
            {required: false, message: '请输入联系电话!~', trigger: 'blur'},
            { validator: checkMobile, trigger: 'blur'}
          ],
          email: [
            { required: false, message: '请输入邮箱地址!~', trigger: 'blur'},
            { min: 2, max: 50, message: '长度在2 ~ 50个字符之间!~',trigger: 'blur'},
            { validator: checkEmail, trigger: 'blur'}
          ]
        },
        regDialogVisible: false,   // 控制注册对话框的显隐

      }
    },
    created() {   // 生命周期函数, 用于初始化页面
      this.getBillsList()   // 调用该函数初始化账单的列表区域
    },


    methods: {
      async getBillsList() {   //获取账单列表
        const { data: res } =await this.$axios.get('/api/communicate')   //,{ params: this.queryInfo}
        if(res.meta.status !==200) return this.$message.error('获取账单列表失败!~')
        this.bills_list = res.data.communicates
        this.bills_total = res.data.total
      },
      resetBillsList(){   // 点击重置按钮时触发的事件
        this.queryInfo.community = ''
        this.queryInfo.bills_house = ''
        this.queryInfo.bills_unit = ''
        this.queryInfo.bills_build = ''
        this.queryInfo.bills_overdue = ''
        this.queryInfo.bills_date = ''
        this.queryInfo.bills_owner = ''
        this.queryInfo.bills_owner = ''
        this.queryInfo.bills_paystatus = ''
        this.queryInfo.bills_water = ''
        this.queryInfo.bills_tel = ''
        this.getBillsList()
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {   // 设置table第一行的背景色
        if(rowIndex == 0) {
          return 'background:#f0f2f5'
        }
        else { return ''}
      },
      handleSizeChange(newSize) {   // 分页显示: 监听pagesize改变的函数
        this.queryInfo.pagesize = newSize
        this.getBillsList()
      },
      handleCurrentChange(newPage) {   // 分页显示: 监听页码值改变的函数
        this.queryInfo.pagenum = newPage
        this.getBillsList()
      },
      addDialogClosed() {   // 监听添加商户的对话框关闭时触发的事件
        this.$refs.addFormRef.resetFields()
      },
      addBills() {   // 点击确定按钮, 添加新账单
        this.$refs.addFormRef.validate(async (valid) => {
          if(!valid) return
          // 如果校验成功,, 可以发起网络请求. 来添加账单
          const {data:res} = await this.$axios({
            url:'/ponyproperty-manager/bills/addbills',
            method: 'post',
            transformRequest: [function (data) {
              return Qs.stringify(data)
            }],
            data: {
              concat_name: this.addForm.concat_name,
              concat_phone: this.addForm.concat_phone,
              bills_id: this.addForm.bills_id,
              bills_name: this.addForm.bills_name
            }
          })
          if(res.msg!=='OK') return this.$message.error('添加账单失败!~')
          this.$message.success('添加账单成功!~')
          this.addDialogVisible = false   // 隐藏对话框
          this.getBillsList()   // 重新请求最新数据, 重新渲染页面
          console.log(res)
        })
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