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
                      :key="item.comm_key"
                      :label="item.label"
                      :value="item.comm_key">
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
            <el-button class="button-warning search-button" @click="getHouseList">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button class="button-info reset-button" @click="resetHouseList(queryInfo)">重置</el-button>
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
        <el-table-column label="小区名称" prop="name"></el-table-column>
        <el-table-column label="房间号" prop="address"></el-table-column>
        <el-table-column label="面积" prop="name"></el-table-column>
        <el-table-column label="业主姓名" prop="name"></el-table-column>
        <el-table-column label="业主电话" prop="name"></el-table-column>
        <el-table-column label="租户姓名" prop="name"></el-table-column>
        <el-table-column label="操作"  class="house-table-lastcol">
          <template slot-scope="scope">
            <span @click="showDetailDialog(scope.row.id)" class="active-font font-primary">详情</span>
            <span @click="removeHouse(scope.row.id)" class="active-font font-warning">删除</span>
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
    <!--  这是添加房间的 对话框  -->
    <el-dialog class="dialog-fontweight" title="添加房间" :visible.sync="addDialogVisible" width="650px" @close="addDialogClosed">

      <el-form class="dialog-form" :model="addform" :rules="addform_rules" ref="addform_ref" label-width="100px">
        <el-form-item label="物业公司" prop="house_area">
          <el-input v-model="addform.merchant"></el-input>
        </el-form-item>
        <el-form-item label="小区名称" prop="house_community">
          <el-input v-model="addform.community"></el-input>
        </el-form-item>
        <el-form-item label="房间号" prop="house_num">
          <el-input v-model="addform.house_num"></el-input>
        </el-form-item>
        <el-form-item label="面积" prop="house_area">
          <el-input v-model="addform.house_area"></el-input>
        </el-form-item>
        <el-form-item label="业主姓名"  prop="house_owner">
          <el-input v-model="addform.owner"></el-input>
        </el-form-item>
        <el-form-item label="业主身份证"  prop="house_owner_identity">
          <el-input v-model="addform.house_owner_identity"></el-input>
        </el-form-item>
        <el-form-item label="业主电话"  prop="house_tel">
          <el-input v-model="addform.house_tel"></el-input>
        </el-form-item>
        <el-form-item label="业主电话2"  prop="house_tel2">
          <el-input v-model="addform.house_tel2"></el-input>
        </el-form-item>
        <el-form-item label="租户姓名"  prop="house_lessee">
          <el-input v-model="addform.house_area"></el-input>
        </el-form-item>
        <el-form-item label="租户身份证"  prop="house_lessee_identity">
          <el-input v-model="addform.house_lessee_identity"></el-input>
        </el-form-item>
        <el-form-item label="车牌号"  prop="house_carnum">
          <el-input v-model="addform.house_carnum"></el-input>
        </el-form-item>
        <el-form-item label="车牌号2"  prop="house_carnum">
          <el-input v-model="addform.house_carnum2"></el-input>
        </el-form-item>
        <el-form-item label="车位"  prop="house_carport">
          <el-input v-model="addform.house_carport"></el-input>
        </el-form-item>
        <el-form-item label="车位2"  prop="house_carport">
          <el-input v-model="addform.house_carport2"></el-input>
        </el-form-item>
        <el-form-item label="租入住时间"  prop="house_date">
          <el-input v-model="addform.house_date"></el-input>
        </el-form-item>
        <el-form-item label="备注"  prop="house_remark">
          <el-input v-model="addform.house_remark"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button class="button-primary" @click="addHouse">确 定</el-button>
        <el-button class="button-info" @click="addDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <!--  显示房间详情的 对话框 -->
    <el-dialog class="dialog-fontweight" title="详情页面" :visible.sync="detailDialogVisible" width="650px" @close="detailDialogClosed">

      <el-form class="dialog-form" :model="detailform" :rules="detailform_rules" ref="detailform_ref" label-width="100px">
        <el-form-item label="物业公司">
          <el-input v-model="detailform.house_merchant" disabled></el-input>
        </el-form-item>
        <el-form-item label="小区名称">
          <el-input v-model="detailform.house_community" disabled></el-input>
        </el-form-item>
        <el-form-item label="房间号">
          <el-input v-model="detailform.house_num" disabled></el-input>
        </el-form-item>
        <el-form-item label="面积"  prop="house_area">
          <el-input v-model="detailform.house_area"></el-input>
        </el-form-item>
        <el-form-item label="业主姓名"  prop="house_owner">
          <el-input v-model="detailform.owner"></el-input>
        </el-form-item>
        <el-form-item label="业主身份证"  prop="house_owner_identity">
          <el-input v-model="detailform.house_owner_identity"></el-input>
        </el-form-item>
        <el-form-item label="业主电话"  prop="house_tel">
          <el-input v-model="detailform.house_tel"></el-input>
        </el-form-item>
        <el-form-item label="业主电话2"  prop="house_tel2">
          <el-input v-model="detailform.house_tel2"></el-input>
        </el-form-item>
        <el-form-item label="租户姓名"  prop="house_lessee">
          <el-input v-model="detailform.house_area"></el-input>
        </el-form-item>
        <el-form-item label="租户身份证"  prop="house_lessee_identity">
          <el-input v-model="detailform.house_lessee_identity"></el-input>
        </el-form-item>
        <el-form-item label="车牌号"  prop="house_carnum">
          <el-input v-model="detailform.house_carnum"></el-input>
        </el-form-item>
        <el-form-item label="车牌号2"  prop="house_carnum">
          <el-input v-model="detailform.house_carnum2"></el-input>
        </el-form-item>
        <el-form-item label="车位"  prop="house_carport">
          <el-input v-model="detailform.house_carport"></el-input>
        </el-form-item>
        <el-form-item label="车位2"  prop="house_carport">
          <el-input v-model="detailform.house_carport2"></el-input>
        </el-form-item>
        <el-form-item label="租入住时间"  prop="house_date">
          <el-input v-model="detailform.house_date"></el-input>
        </el-form-item>
        <el-form-item label="备注"  prop="house_remark">
          <el-input v-model="detailform.house_remark"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button class="button-primary" @click="detailHouse">确 定</el-button>
        <el-button class="button-info" @click="detailDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

  </main-card2>
</template>

<script>
  import Qs from 'qs'
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
        house_list: [],   // 房间列表
        house_total: 0,   // 房间信息总数据条数
        //==================================================================添加
        addDialogVisible: false,   // 控制添加房间的显示与隐藏
        addform: {
          house_community: '',
          house_num: '',
          house_area: '',
          house_owner: '',
          house_owner_identity: '',
          house_tel: '',
          house_tel2: '',
          house_lessee: '',
          house_lessee_identity: '',
          house_carnum: '',
          house_carport: '',
          house_date: '',
          house_remark: ''
        },
        addform_rules: {   // 添加房间的校验规则
          house_community: [
            {required: true, message: '请输入小区名字!~', trigger: 'blur'}
          ],
          house_num: [
            {required: true, message: '请输入房间号!~', trigger: 'blur'}
          ],
          house_area: [
            { required: true, message: '请输入房间面积!~', trigger: 'blur'},
          ],
          house_owner: [
            {required: true, message: '请输入业主姓名!~', trigger: 'blur'}
          ],
          house_owner_identity: [
            {required: true, message: '请输入业主身份证!~', trigger: 'blur'}
          ],
          house_tel: [
            {required: true, message: '请输入业主电话!~', trigger: 'blur'},
            { validator: checkMobile, trigger: 'blur'}
          ],
          house_tel2: [
            {required: false, message: '请输入业主电话!~', trigger: 'blur'},
            { validator: checkMobile, trigger: 'blur'}
          ],
          house_lessee: [
            {required: false, message: '请输入租户姓名!~', trigger: 'blur'},
            { min: 0, max: 8, message: '长度在0 ~ 8个字符之间!~',trigger: 'blur'}
          ],
          house_lessee_identity: [
            {required: false, message: '请输入租户身份证!~', trigger: 'blur'}
          ],
          house_carnum: [
            {required: false, message: '请输入车牌号!~', trigger: 'blur'}
          ],
          house_carport: [
            {required: false, message: '请输入车位!~', trigger: 'blur'}
          ],
          house_date: [
            {required: false, message: '请输入租户入住时间!~', trigger: 'blur'}
          ],
          house_remark: [
            {required: false, message: '请输入备注!~', trigger: 'blur'}
          ]
        },
        //====================================================================详情
        detailDialogVisible: false,   // 控制详情对话框的显隐
        detailform: { },   // 修改房间详情时的表单信息
        detailform_rules: {   // 添加房间的校验规则
          house_area: [
            { required: true, message: '请输入房间面积!~', trigger: 'blur'},
          ],
          house_owner: [
            {required: true, message: '请输入业主姓名!~', trigger: 'blur'}
          ],
          house_owner_identity: [
            {required: true, message: '请输入业主身份证!~', trigger: 'blur'}
          ],
          house_tel: [
            {required: true, message: '请输入业主电话!~', trigger: 'blur'},
            { validator: checkMobile, trigger: 'blur'}
          ],
          house_tel2: [
            {required: false, message: '请输入业主电话!~', trigger: 'blur'},
            { validator: checkMobile, trigger: 'blur'}
          ],
          house_lessee: [
            {required: false, message: '请输入租户姓名!~', trigger: 'blur'},
            { min: 0, max: 8, message: '长度在0 ~ 8个字符之间!~',trigger: 'blur'}
          ],
          house_lessee_identity: [
            {required: false, message: '请输入租户身份证!~', trigger: 'blur'}
          ],
          house_carnum: [
            {required: false, message: '请输入车牌号!~', trigger: 'blur'}
          ],
          house_carport: [
            {required: false, message: '请输入车位!~', trigger: 'blur'}
          ],
          house_date: [
            {required: false, message: '请输入租户入住时间!~', trigger: 'blur'}
          ],
          house_remark: [
            {required: false, message: '请输入备注!~', trigger: 'blur'}
          ]
        },

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
      resetHouseList(obj){   // 点击重置按钮时触发的事件
        this.clearObj(obj)   // 调用全局函数清空对象
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

      //=================================================================添加
      addDialogClosed() {   // 监听添加房间的对话框关闭事件
        this.$refs.addform_ref.resetFields()
      },
      addHouse() {   // 添加新房间,触发的函数
        this.$refs.addform_ref.validate( (valid) => {
          if(!valid) return
          // 如果校验成功,, 可以发起网络请求???
          // if!==200 添加失败
          // this.$message.success('添加小区成功')
          this.addDialogVisible = false   // 隐藏添加小区的对话框
          // this.getHouseList()   // 重新获取用户的列表
        })
      },
      //=================================================================删除
      async removeHouse() {   // 删除房间, 触发的函数
        // 弹框询问用户是否确认删除
        console.log("点击了删除")
        const confirmResult = await this.$confirm('此操作将永久删除该房间, 是否继续?','提示',{
          confirmButtonText: '确定',
          confirmButtonClass: 'button-primary',
          cancelButtonText: '取消',
          cancelButtonClass: 'button-info',
          type: 'warning'
        }).catch( err => {return err})
        if(confirmResult !== 'confirm'){
          return this.$message.info('已取消了删除!~~')
        }
        const {data:res} =await this.$axios({   // 发起Ajax请求-----------???
          url:'/ponyproperty-manager/house/deletehouse',
          method: 'post',
          transformRequest: [function (data) {
            return Qs.stringify(data)
          }],
          data: { house_id: this.detailform.house_id }
        })
        if(res.msg !=='OK') return this.$message.error('删除房间信息失败!~')
        this.getHouseList()   // 重新获取房间列表
        this.$message.success('删除房间成功!~')
      },
      //=================================================================详情
      async showDetailDialog(row) {   // 点击详情时的,处理函数
        console.log("====================")
        this.detailform = row   // 当行数据赋值给 要修改的房间
        // const {data:comm} =await this.$axios.get('/api/communicate')
        // if(comm.meta.status !==200) return this.$message.error('查询小区信息失败')
        // this.detailform = comm.data.house[parseInt(row.id)-1]
        this.detailDialogVisible = true
      },
      detailDialogClosed() {   // 监听修改房间的对话框关闭事件
        this.$refs.detailform_ref.resetFields()
      },
      detailHouse() {   // 点击确定按钮, 修改房间
        this.$refs.detailform_ref.validate( (valid) => {
          if(!valid) return
          // 如果校验成功,, 可以发起网络请求???
          // if!==200 添加失败
          // this.$message.success('修改房间成功')
          this.detailDialogVisible = false   // 隐藏修改房间的对话框
          // this.getHouseList()   // 重新获取用户的列表
        })
      },
    }
  }
</script>

<style scoped>
  .house-top {  }
  .el-row .el-col { line-height: 38px;}
  .el-row span { font-weight: 600; font-size: 14px;}
  .dialog-form{ display: flex; flex-wrap: wrap; }
</style>