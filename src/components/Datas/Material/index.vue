<!-- 数据管理下的 物料库存页面-->
<template>
  <main-card2 title1="数据管理" title2="物料库存">
    <div slot="content">
      <div class="material-top">
        <div class="second-line">
          <el-button class="button-primary" size="small" @click="addDialogVisible = true"><i class="iconfont icon-add"></i>物料添加</el-button>
          <el-button class="button-success" size="medium" @click="">表格导出</el-button>
        </div>
      </div>

      <!--   物料列表区, 数据展示   -->
      <el-table :data="material_list" stripe :header-cell-style="getRowClass">
        <el-table-column label="序号" prop="id"></el-table-column>
        <el-table-column label="物品名称" prop="name"></el-table-column>
        <el-table-column label="单位" prop="address"></el-table-column>
        <el-table-column label="数量" prop="name"></el-table-column>
        <el-table-column label="用途" prop="address"></el-table-column>
        <el-table-column label="入库时间" prop="name"></el-table-column>
        <el-table-column label="出库时间" prop="address"></el-table-column>
        <el-table-column label="领用人" prop="name"></el-table-column>
        <el-table-column label="备注" prop="name"></el-table-column>
        <el-table-column label="操作"  class="material-table-lastcol">
          <template slot-scope="scope">
            <span @click="showEditDialog(scope.row.id)" class="active-font font-primary">修改</span>
            <span @click="removeMaterial(scope.row.id)" class="active-font font-warning">删除</span>
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
          :total="material_total">
      </el-pagination>
    </div>
    <!--  这是添加物料的 对话框  -->
    <el-dialog class="dialog-fontweight" title="添加物料" :visible.sync="addDialogVisible" width="650px" @close="addDialogClosed">

      <el-form class="dialog-form" :model="addform" :rules="addform_rules" ref="addform_ref" label-width="100px">
        <el-form-item label="物料名称" prop="material_name">
          <el-input v-model="addform.material_name"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="material_per">
          <el-input v-model="addform.material_per"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="material_num">
          <el-input v-model="addform.material_num"></el-input>
        </el-form-item>
        <el-form-item label="用途" prop="material_use">
          <el-input v-model="addform.material_use"></el-input>
        </el-form-item>
        <el-form-item label="入库时间"  prop="material_intime">
          <el-input v-model="addform.material_intime"></el-input>
        </el-form-item>
        <el-form-item label="出库时间"  prop="material_outtime">
          <el-input v-model="addform.material_use"></el-input>
        </el-form-item>
        <el-form-item label="领用人"  prop="material_recipient">
          <el-input v-model="addform.material_recipient"></el-input>
        </el-form-item>
        <el-form-item label="备注"  prop="material_remark">
          <el-input v-model="addform.material_remark"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button class="button-primary" @click="addMaterial">确 定</el-button>
        <el-button class="button-info" @click="addDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <!--  修改物料信息的 对话框 -->
    <el-dialog class="dialog-fontweight" title="修改物料信息" :visible.sync="editDialogVisible" width="650px" @close="editDialogClosed">

      <el-form class="dialog-form" :model="editform" :rules="editform_rules" ref="editform_ref" label-width="100px">
        <el-form-item label="物料名称">
          <el-input v-model="editform.material_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="material_per">
          <el-input v-model="editform.material_per"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="material_num">
          <el-input v-model="editform.material_num"></el-input>
        </el-form-item>
        <el-form-item label="用途"  prop="material_use">
          <el-input v-model="editform.material_use"></el-input>
        </el-form-item>
        <el-form-item label="入库时间"  prop="material_intime">
          <el-input v-model="editform.material_intime"></el-input>
        </el-form-item>
        <el-form-item label="出库时间"  prop="material_outtime">
          <el-input v-model="editform.material_use"></el-input>
        </el-form-item>
        <el-form-item label="领用人"  prop="material_recipient">
          <el-input v-model="editform.material_recipient"></el-input>
        </el-form-item>
        <el-form-item label="备注"  prop="material_remark">
          <el-input v-model="editform.material_remark"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button class="button-primary" @click="editMaterial">确 定</el-button>
        <el-button class="button-info" @click="editDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

  </main-card2>
</template>

<script>
  import Qs from 'qs'
  export default {
    name: "Material",
    components:{},
    data() {
      return {
        queryInfo: {   // 获取物料信息时 传的参数对象
          query: '',   // 查询参数,
          pagenum: 1,   // 当前页码
          pagesize: 2,   // 当前每页显示多少条数据
        },
        material_list: [],   // 物料列表
        material_total: 0,   // 物料信息总条数
        //==================================================================添加
        addDialogVisible: false,   // 控制添加物料的显示与隐藏
        addform: {
          material_name: '',
          material_per: '',
          material_num: '',
          material_use: '',
          material_intime: '',
          material_outtime: '',
          material_recipient: '',
          material_remark: ''
        },
        addform_rules: {   // 添加物料的校验规则
          material_name: [
            {required: true, message: '请输入物料名称!~', trigger: 'blur'}
          ],
          material_per: [
            {required: true, message: '请输入单位( 台, 个, 套...)!~', trigger: 'blur'}
          ],
          material_num: [
            {required: true, message: '请输入物料数量!~', trigger: 'blur'}
          ],
          material_use: [
            { required: true, message: '请输入物料用途!~', trigger: 'blur'},
          ],
          material_intime: [
            {required: false, message: '请输入物料入库时间!~', trigger: 'blur'},
          ],
          material_outtime: [
            {required: false, message: '请输入物料出库时间!~', trigger: 'blur'},
            { min: 2, max: 32, message: '长度在2 ~ 32个字符之间!~',trigger: 'blur'}
          ],
          material_recipient: [
            {required: false, message: '请输入物料领用人!~', trigger: 'blur'}
          ],
          material_remark: [
            {required: false, message: '请输入备注!~', trigger: 'blur'}
          ]
        },
        //====================================================================修改
        editDialogVisible: false,   // 控制修改对话框的显隐
        editform: { },   // 修改物料修改时的表单信息
        editform_rules: {   // 添加物料的校验规则
          material_name: [
            {required: true, message: '请输入物料名称!~', trigger: 'blur'}
          ],
          material_per: [
            {required: true, message: '请输入单位( 台, 个, 套...)!~', trigger: 'blur'}
          ],
          material_num: [
            {required: true, message: '请输入物料数量!~', trigger: 'blur'}
          ],
          material_use: [
            { required: true, message: '请输入物料用途!~', trigger: 'blur'},
          ],
          material_intime: [
            {required: false, message: '请输入物料入库时间!~', trigger: 'blur'},
          ],
          material_outtime: [
            {required: false, message: '请输入物料出库时间!~', trigger: 'blur'},
            { min: 2, max: 32, message: '长度在2 ~ 32个字符之间!~',trigger: 'blur'}
          ],
          material_recipient: [
            {required: false, message: '请输入物料领用人!~', trigger: 'blur'}
          ],
          material_remark: [
            {required: false, message: '请输入备注!~', trigger: 'blur'}
          ]
        },

      }
    },
    created() {
      this.getMaterialList()
    },
    methods: {
      async getMaterialList() {   //获取物料列表
        const { data: res } =await this.$axios.get('/api/communicate')   //,{ params: this.queryInfo}
        if(res.meta.status !==200) return this.$message.error('获取小区列表失败!~')
        this.material_list = res.data.communicates
        this.material_total = res.data.total
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {   // 设置table的首行背景颜色
        if(rowIndex == 0) {
          return 'background:#EEE'
        }
        else { return ''}
      },
      handleSizeChange(newSize) {   // 监听pagesize改变的函数
        this.queryInfo.pagesize = newSize
        this.getMaterialList()
      },
      handleCurrentChange(newPage) {   // 监听页码值改变的函数
        this.queryInfo.pagenum = newPage
        this.getMaterialList()
      },

      //=================================================================添加
      addDialogClosed() {   // 监听添加物料的对话框关闭事件
        this.$refs.addform_ref.resetFields()
      },
      addMaterial() {   // 添加新物料,触发的函数
        this.$refs.addform_ref.validate( (valid) => {
          if(!valid) return
          // 如果校验成功,, 可以发起网络请求???
          // if!==200 添加失败
          // this.$message.success('添加小区成功')
          this.addDialogVisible = false   // 隐藏添加小区的对话框
          // this.getMaterialList()   // 重新获取用户的列表
        })
      },
      //=================================================================修改
      async showEditDialog(row) {   // 点击修改时的,处理函数
        console.log("====================")
        this.editform = row   // 当行数据赋值给 要修改的物料
        // const {data:comm} =await this.$axios.get('/api/communicate')
        // if(comm.meta.outtime !==200) return this.$message.error('查询小区信息失败')
        // this.editform = comm.data.Material[parseInt(row.id)-1]
        this.editDialogVisible = true
      },
      editDialogClosed() {   // 监听修改物料的对话框关闭事件
        this.$refs.editform_ref.resetFields()
      },
      editMaterial() {   // 点击确定按钮, 修改物料
        this.$refs.editform_ref.validate( (valid) => {
          if(!valid) return
          // 如果校验成功,, 可以发起网络请求???
          // if!==200 添加失败
          // this.$message.success('修改物料成功')
          this.editDialogVisible = false   // 隐藏修改物料的对话框
          // this.getMaterialList()   // 重新获取用户的列表
        })
      },
      //=================================================================删除
      async removeMaterial() {   // 删除物料, 触发的函数
        // 弹框询问用户是否确认删除
        const confirmResult = await this.$confirm('此操作将永久删除该物料, 是否继续?','提示',{
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
          url:'/ponyproperty-manager/Material/deleteMaterial',
          method: 'post',
          transformRequest: [function (data) {
            return Qs.stringify(data)
          }],
          data: { material_id: this.editform.material_id }
        })
        if(res.msg !=='OK') return this.$message.error('删除物料信息失败!~')
        this.getMaterialList()   // 重新获取物料列表
        this.$message.success('删除物料成功!~')
      }
    }
  }
</script>

<style scoped>
  .el-row .el-col { line-height: 38px;}
  .el-row span { font-weight: 600; font-size: 14px;}
  /*.dialog-form{ display: flex; flex-wrap: wrap; }*/
</style>