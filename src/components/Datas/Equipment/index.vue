<!-- 数据管理下的 公共设备页面-->
<template>
  <main-card2 title1="数据管理" title2="公共设备">
    <div slot="content">
      <div class="equipment-top">
        <div class="second-line">
          <el-button class="button-primary" size="small" @click="addDialogVisible = true"><i class="iconfont icon-add"></i>设备添加</el-button>
        </div>
      </div>

      <!--   设备列表区, 数据展示   -->
      <el-table :data="equipment_list" stripe :header-cell-style="getRowClass">
        <el-table-column label="序号" prop="id"></el-table-column>
        <el-table-column label="设备名称" prop="name"></el-table-column>
        <el-table-column label="单位" prop="address"></el-table-column>
        <el-table-column label="数量" prop="name"></el-table-column>
        <el-table-column label="用途" prop="address"></el-table-column>
        <el-table-column label="安装位置" prop="name"></el-table-column>
        <el-table-column label="使用状态" prop="address"></el-table-column>
        <el-table-column label="维护周期" prop="account"></el-table-column>
        <el-table-column label="备注" prop="name"></el-table-column>
        <el-table-column label="操作"  class="equipment-table-lastcol">
          <template slot-scope="scope">
            <span @click="showEditDialog(scope.row.id)" class="active-font font-primary">修改</span>
            <span @click="removeEquipment(scope.row.id)" class="active-font font-warning">删除</span>
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
          :total="equipment_total">
      </el-pagination>
    </div>
    <!--  这是添加设备的 对话框  -->
    <el-dialog class="dialog-fontweight" title="添加设备" :visible.sync="addDialogVisible" width="650px" @close="addDialogClosed">

      <el-form class="dialog-form" :model="addform" :rules="addform_rules" ref="addform_ref" label-width="100px">
        <el-form-item label="设备名称" prop="equipment_name">
          <el-input v-model="addform.equipment_name"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="equipment_per">
          <el-input v-model="addform.equipment_per"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="equipment_num">
          <el-input v-model="addform.equipment_num"></el-input>
        </el-form-item>
        <el-form-item label="用途" prop="equipment_use">
          <el-input v-model="addform.equipment_use"></el-input>
        </el-form-item>
        <el-form-item label="安装位置"  prop="equipment_install">
          <el-input v-model="addform.equipment_install"></el-input>
        </el-form-item>
        <el-form-item label="使用状态"  prop="equipment_status">
          <el-input v-model="addform.equipment_use"></el-input>
        </el-form-item>
        <el-form-item label="维护周期"  prop="equipment_maintain">
          <el-input v-model="addform.equipment_maintain"></el-input>
        </el-form-item>
        <el-form-item label="备注"  prop="equipment_remark">
          <el-input v-model="addform.equipment_remark"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button class="button-primary" @click="addEquipment">确 定</el-button>
        <el-button class="button-info" @click="addDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <!--  修改设备信息的 对话框 -->
    <el-dialog class="dialog-fontweight" title="修改设备信息" :visible.sync="editDialogVisible" width="650px" @close="editDialogClosed">

      <el-form class="dialog-form" :model="editform" :rules="editform_rules" ref="editform_ref" label-width="100px">
        <el-form-item label="设备名称">
          <el-input v-model="editform.equipment_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="equipment_per">
          <el-input v-model="editform.equipment_per"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="equipment_num">
          <el-input v-model="editform.equipment_num"></el-input>
        </el-form-item>
        <el-form-item label="用途"  prop="equipment_use">
          <el-input v-model="editform.equipment_use"></el-input>
        </el-form-item>
        <el-form-item label="安装位置"  prop="equipment_install">
          <el-input v-model="editform.equipment_install"></el-input>
        </el-form-item>
        <el-form-item label="使用状态"  prop="equipment_status">
          <el-input v-model="editform.equipment_use"></el-input>
        </el-form-item>
        <el-form-item label="维护周期"  prop="equipment_maintain">
          <el-input v-model="editform.equipment_maintain"></el-input>
        </el-form-item>
        <el-form-item label="备注"  prop="equipment_remark">
          <el-input v-model="editform.equipment_remark"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button class="button-primary" @click="editEquipment">确 定</el-button>
        <el-button class="button-info" @click="editDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

  </main-card2>
</template>

<script>
  import Qs from 'qs'
  export default {
    name: "Equipment",
    components:{},
    data() {
      return {
        queryInfo: {   // 获取设备信息时 传的参数对象
          query: '',   // 查询参数,
          pagenum: 1,   // 当前页码
          pagesize: 2,   // 当前每页显示多少条数据
        },
        equipment_list: [],   // 设备列表
        equipment_total: 0,   // 设备信息总条数
        //==================================================================添加
        addDialogVisible: false,   // 控制添加设备的显示与隐藏
        addform: {
          equipment_name: '',
          equipment_per: '',
          equipment_num: '',
          equipment_use: '',
          equipment_install: '',
          equipment_status: '',
          equipment_maintain: '',
          equipment_remark: ''
        },
        addform_rules: {   // 添加设备的校验规则
          equipment_name: [
            {required: true, message: '请输入设备名称!~', trigger: 'blur'}
          ],
          equipment_per: [
            {required: true, message: '请输入单位( 台, 个, 套...)!~', trigger: 'blur'}
          ],
          equipment_num: [
            {required: true, message: '请输入设备数量!~', trigger: 'blur'}
          ],
          equipment_use: [
            { required: true, message: '请输入设备用途!~', trigger: 'blur'},
          ],
          equipment_install: [
            {required: false, message: '请输入设备安装位置!~', trigger: 'blur'},
          ],
          equipment_status: [
            {required: false, message: '请输入设备使用状态!~', trigger: 'blur'},
            { min: 2, max: 32, message: '长度在2 ~ 32个字符之间!~',trigger: 'blur'}
          ],
          equipment_maintain: [
            {required: false, message: '请输入设备维修周期!~', trigger: 'blur'}
          ],
          equipment_remark: [
            {required: false, message: '请输入备注!~', trigger: 'blur'}
          ]
        },
        //====================================================================修改
        editDialogVisible: false,   // 控制修改对话框的显隐
        editform: { },   // 修改设备修改时的表单信息
        editform_rules: {   // 添加设备的校验规则
          equipment_name: [
            {required: true, message: '请输入设备名称!~', trigger: 'blur'}
          ],
          equipment_per: [
            {required: true, message: '请输入单位( 台, 个, 套...)!~', trigger: 'blur'}
          ],
          equipment_num: [
            {required: true, message: '请输入设备数量!~', trigger: 'blur'}
          ],
          equipment_use: [
            { required: true, message: '请输入设备用途!~', trigger: 'blur'},
          ],
          equipment_install: [
            {required: false, message: '请输入设备安装位置!~', trigger: 'blur'}
          ],
          equipment_status: [
            {required: false, message: '请输入设备使用状态!~', trigger: 'blur'},
            { min: 2, max: 32, message: '长度在2 ~ 32个字符之间!~',trigger: 'blur'}
          ],
          equipment_maintain: [
            {required: false, message: '请输入设备维修周期!~', trigger: 'blur'}
          ],
          equipment_remark: [
            {required: false, message: '请输入备注!~', trigger: 'blur'}
          ]
        },

      }
    },
    created() {
      this.getEquipmentList()
    },
    methods: {
      async getEquipmentList() {   //获取设备列表
        const { data: res } =await this.$axios.get('/api/communicate')   //,{ params: this.queryInfo}
        if(res.meta.status !==200) return this.$message.error('获取小区列表失败!~')
        this.equipment_list = res.data.communicates
        this.equipment_total = res.data.total
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {   // 设置table的首行背景颜色
        if(rowIndex == 0) {
          return 'background:#EEE'
        }
        else { return ''}
      },
      handleSizeChange(newSize) {   // 监听pagesize改变的函数
        this.queryInfo.pagesize = newSize
        this.getEquipmentList()
      },
      handleCurrentChange(newPage) {   // 监听页码值改变的函数
        this.queryInfo.pagenum = newPage
        this.getEquipmentList()
      },

      //=================================================================添加
      addDialogClosed() {   // 监听添加设备的对话框关闭事件
        this.$refs.addform_ref.resetFields()
      },
      addEquipment() {   // 添加新设备,触发的函数
        this.$refs.addform_ref.validate( (valid) => {
          if(!valid) return
          // 如果校验成功,, 可以发起网络请求???
          // if!==200 添加失败
          // this.$message.success('添加小区成功')
          this.addDialogVisible = false   // 隐藏添加小区的对话框
          // this.getEquipmentList()   // 重新获取用户的列表
        })
      },
      //=================================================================修改
      async showEditDialog(row) {   // 点击修改时的,处理函数
        console.log("====================")
        this.editform = row   // 当行数据赋值给 要修改的设备
        // const {data:comm} =await this.$axios.get('/api/communicate')
        // if(comm.meta.status !==200) return this.$message.error('查询小区信息失败')
        // this.editform = comm.data.equipment[parseInt(row.id)-1]
        this.editDialogVisible = true
      },
      editDialogClosed() {   // 监听修改设备的对话框关闭事件
        this.$refs.editform_ref.resetFields()
      },
      editEquipment() {   // 点击确定按钮, 修改设备
        this.$refs.editform_ref.validate( (valid) => {
          if(!valid) return
          // 如果校验成功,, 可以发起网络请求???
          // if!==200 添加失败
          // this.$message.success('修改设备成功')
          this.editDialogVisible = false   // 隐藏修改设备的对话框
          // this.getEquipmentList()   // 重新获取用户的列表
        })
      },
      //=================================================================删除
      async removeEquipment() {   // 删除设备, 触发的函数
        // 弹框询问用户是否确认删除
        const confirmResult = await this.$confirm('此操作将永久删除该设备, 是否继续?','提示',{
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
          url:'/ponyproperty-manager/equipment/deleteequipment',
          method: 'post',
          transformRequest: [function (data) {
            return Qs.stringify(data)
          }],
          data: { equipment_id: this.editform.equipment_id }
        })
        if(res.msg !=='OK') return this.$message.error('删除设备信息失败!~')
        this.getEquipmentList()   // 重新获取设备列表
        this.$message.success('删除设备成功!~')
      }
    }
  }
</script>

<style scoped>
  .el-row .el-col { line-height: 38px;}
  .el-row span { font-weight: 600; font-size: 14px;}
  /*.dialog-form{ display: flex; flex-wrap: wrap; }*/
</style>