<!-- 账单管理下的  账单审核页面 -->
<template>
  <main-card2 title1="账单管理" title2="账单审核">
    <div slot="content">
      <div class="check-top">
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
                <el-select v-model="queryInfo.check_build" allow-create filterable clearable placeholder="楼号">
                  <el-option
                      v-for="item in build_options"
                      :key="item.build_key"
                      :label="item.label"
                      :value="item.build_key">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="7">
                <el-select v-model="queryInfo.check_unit" allow-create filterable clearable placeholder="单元">
                  <el-option
                      v-for="item in unit_options"
                      :key="item.unit_key"
                      :label="item.label"
                      :value="item.unit_key">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select v-model="queryInfo.check_house" allow-create filterable clearable placeholder="房间">
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
              <el-col :span="5.5"><span>缴费档期</span></el-col>
              <el-col :span="16">
                <el-input
                    placeholder="请输入缴费档期"
                    v-model="queryInfo.check_stage"
                    clearable>
                </el-input>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="2">
            <el-button type="danger" class="button-warning search-button" @click="getCheckList">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="info" class="button-info reset-button" @click="resetCheckList(queryInfo)">重置</el-button>
          </el-col>

        </el-row>

        <div class="second-line">
          <el-button class="button-default" type="primary" size="medium" @click="">待审核</el-button>
          <el-button class="button-default" type="primary" size="medium" @click="">已审核</el-button>
        </div>
      </div>


      <!--   账单审核列表展示区   -->
      <el-table :data="check_list" stripe :header-cell-style="getRowClass">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="房间号" prop="account"></el-table-column>
        <el-table-column label="用户名" prop="name"></el-table-column>
        <el-table-column label="流水号" prop="account"></el-table-column>
        <el-table-column label="缴费档期" prop="address"></el-table-column>
        <el-table-column label="审核类型" min-width="100px">
          <template slot-scope="scope">
            <span @click="showEditDialog(scope.row.id)" class="active-font font-primary">申请修改?</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100px">
          <template slot-scope="scope">
            <span @click="showDetailDialog(scope.row.id)" class="active-font font-primary">详情?</span>
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
          :total="check_total">
      </el-pagination>
    </div>



    <!--  修改审核单的 对话框 -->
    <el-dialog title="修改账单审核信息" :visible.sync="editDialogVisible" width="40%" @close="editDialogClosed">

      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">
        <el-form-item label="账单审核名称">
          <el-input v-model="editForm.check_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="商户ID">
          <el-input v-model="editForm.check_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="concat_name">
          <el-input v-model="editForm.concat_name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="concat_phone">
          <el-input v-model="editForm.concat_phone" ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button class="button-primary" @click="editCheck">确 定</el-button>
        <el-button class="button-info" @click="editDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

  </main-card2>
</template>

<script>
  import Qs from 'qs'

  export default {
    name: "Check",
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
        queryInfo: {   // 获取账单审核列表时 传的参数对象
          query: '',   // 查询参数,
          community: '',   // 查询参数,小区
          check_build: '',   // 查询参数,楼号
          check_unit: '',   // 查询参数,单元号
          check_house: '',   // 查询参数,房间号
          check_stage: '',   // 查询参数,缴费档期
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
        check_list: [],   // 存储请求回来的 账单审核列表
        check_total: 0,   // 账单审核列表的总数
        //===========================================================================================修改
        editFormRules: {   //修改账单审核时的格式校验
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
        editForm: { },   // 修改账单审核时,用于接收 将要修改的账单审核的信息
      }
    },
    created() {   // 生命周期函数, 用于初始化页面
      this.getCheckList()   // 调用该函数初始化账单审核的列表区域
    },


    methods: {
      async getCheckList() {   //获取账单审核列表
        const { data: res } =await this.$axios.get('/api/communicate')   //,{ params: this.queryInfo}
        if(res.meta.status !==200) return this.$message.error('获取账单审核列表失败!~')
        this.check_list = res.data.communicates
        this.Check_total = res.data.total
      },
      resetCheckList(obj){   // 点击重置按钮时触发的事件
        this.clearObj(obj)   // 调用全局函数清空,对象
        this.getCheckList()
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {   // 设置table第一行的背景色
        if(rowIndex == 0) {
          return 'background:#f0f2f5'
        }
        else { return ''}
      },
      handleSizeChange(newSize) {   // 分页显示: 监听pagesize改变的函数
        this.queryInfo.pagesize = newSize
        this.getCheckList()
      },
      handleCurrentChange(newPage) {   // 分页显示: 监听页码值改变的函数
        this.queryInfo.pagenum = newPage
        this.getCheckList()
      },

      showEditDialog(row) {   // 点击修改按钮, 展示修改页
        this.editForm = row
        console.log('row赋值给editForm',this.editForm)
        this.editDialogVisible = true
      },
      editDialogClosed() {   // 监听对话框关闭事件
        this.$refs.editFormRef.resetFields()
      },
      editCheck() {   // 点击确定按钮, 修改账单审核
        this.$refs.editFormRef.validate(async (valid) => {
          if (!valid) return
          console.log('修改后的editForm',this.editForm)
          console.log(this.editForm.concat_phone)
          console.log(this.editForm.check_id)
          const {data:res} =await this.$axios({
            url:'/ponyproperty-manager/Check/updateCheck',
            method: 'post',
            transformRequest: [function (data) {
              return Qs.stringify(data)
            }],
            data: {
              concat_name: this.editForm.concat_name,
              concat_phone: this.editForm.concat_phone,
              check_id: this.editForm.check_id,
              check_name: this.editForm.check_name
            }
          })
          if(res.msg !=='OK') return this.$message.error('修改商户信息失败!~')
          this.editDialogVisible = false
          this.getCheckList()   // 重新请求最新数据, 重新渲染页面
          this.$message.success('修改商户信息成功!~')
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