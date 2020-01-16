<!-- 商户管理页面 -->
<template>
  <main-card title="商户管理">
    <div slot="content">
      <div class="merchant-name">
        <el-input class="merchant-input" placeholder="全部物业" v-model="queryInfo.query" clearable @clear="getPropertyList">
          <template slot="prepend">物业名</template>
        </el-input>
        <el-button type="primary" class="merchant-search" @click="getPropertyList"><i class="iconfont icon-search"></i>搜索</el-button>
        <el-button class="merchant-add" @click="addDialogVisible = true"><i class="iconfont icon-add"></i>添加物业公司</el-button>
      </div>

      <!--   物业列表展示区   -->
      <el-table :data="propertyList" stripe :header-cell-style="getRowClass">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="商户appID" prop="merchant_id"></el-table-column>
        <el-table-column label="物业名称" prop="merchant_name"></el-table-column>
        <el-table-column label="联系人" prop="concat_name"></el-table-column>
        <el-table-column label="联系电话" prop="concat_phone"></el-table-column>
        <el-table-column label="登录账号" prop="account_name"></el-table-column>
        <el-table-column label="操作" min-width="120px">
          <template slot-scope="scope">
            <el-button type="primary" plain @click="showEditDialog({id:scope.row.merchant_id,name:scope.row.merchant_name})" size="small">修改</el-button>
            <el-button type="success" plain @click="showEditDialog(scope.row.merchant_id)" size="small">创建账号</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--       分页区域 -->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[5, 8, 15, 20, 30]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>

    <!--  这是添加物业的 对话框  -->
    <el-dialog title="添加物业公司" :visible.sync="addDialogVisible" width="40%" @close="addDialogClosed">

      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
        <el-form-item label="物业名称" prop="merchantName">
          <el-input v-model="addForm.merchantName"></el-input>
        </el-form-item>
        <el-form-item label="商户ID" prop="merchant_id">
          <el-input v-model="addForm.merchant_id"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="concatName">
          <el-input v-model="addForm.concatName"></el-input>
        </el-form-item>
        <el-form-item label="联电话" prop="concatPhone">
          <el-input v-model="addForm.concatPhone" ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button @click="addMerchant" type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <!--  修改物业的 对话框 -->
<!--    <el-dialog title="修改物业信息" :visible.sync="editDialogVisible" width="40%" @close="editDialogClosed">-->

<!--      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">-->
<!--        <el-form-item label="小区名称">-->
<!--          <el-input v-model="editForm.name" disabled></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="地址" prop="address">-->
<!--          <el-input v-model="editForm.address"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="账号" prop="account">-->
<!--          <el-input v-model="editForm.account"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="密码" prop="password">-->
<!--          <el-input v-model="editForm.password" type="password"></el-input>-->
<!--        </el-form-item>-->
<!--      </el-form>-->

<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="editDialogVisible = false">取 消</el-button>-->
<!--        <el-button @click="editMerchant" type="primary">确 定</el-button>-->
<!--        <el-button @click="delMerchant" type="danger">删 除</el-button>-->
<!--      </span>-->
<!--    </el-dialog>-->
  </main-card>
</template>

<script>
  import Qs from 'qs'

  export default {
    name: "Merchant",
    components:{},
    data() {
      // 自定义校验规则
      var checkMobile = (rule, value, cb) => {
        const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/   //电话号码的 正则
        if(regMobile.test(value)) return cb()
        cb(new Error('请输入合法的手机号!~'))
      }

      return {
        queryInfo: {   // 这是渲染table表格, 给后端接口传递的参数.   现在的接口暂时不需要传参
          query: '',
          pagenum: 1,
          pagesize: 6,
        },
        propertyList: [],   // 存储请求回来的 物业列表
        total: 0,   // 商户列表的总数
        addDialogVisible: false,   // 该属性控制 添加物业这个对话框的显隐
        addForm: {
          merchantName: '',
          merchant_id: '',
          concatName: '',
          concatPhone: ''
        },
        addFormRules: {   // 添加物业时的 格式校验
          merchantName: [
            {required: true, message: '请输入物业名字!~', trigger: 'blur'},
            { min: 2, max: 15, message: '长度在2 ~ 15个字符之间!~',trigger: 'blur'}
          ],
          merchant_id: [
            {required: true, message: '请输入物业merchant_id!~', trigger: 'blur'},
            { min: 2, max: 32, message: '长度在2 ~ 32个字符之间!~',trigger: 'blur'}
          ],
          concatName: [
            { required: false, message: '请输入联系人!~', trigger: 'blur'},
            { min: 2, max: 15, message: '长度在2 ~ 15个字符之间!~',trigger: 'blur'}
            // { validator: checkMobile, trigger: 'blur'}
          ],
          concatPhone: [
            {required: false, message: '请输入联系电话!~', trigger: 'blur'},
            { validator: checkMobile, trigger: 'blur'}
          ]
        },

        editFormRules: {   //修改物业时的格式校验
          address: [
            {required: true, message: '请输入物业地址!~', trigger: 'blur'}
          ],
          account: [
            { required: false, message: '请输入联系人!~', trigger: 'blur'},
            { min: 5, max: 20, message: '长度在5 ~ 20个字符之间!~',trigger: 'blur'}
            // { validator: checkMobile, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码!~', trigger: 'blur'},
            { min: 8, max: 32, message: '长度在8 ~ 32个字符之间!~',trigger: 'blur'}
          ]
        },
        editDialogVisible: false,   // 控制修改 对话框的显隐
        editForm: {}
      }
    },
    created() {   // 生命周期函数, 用于初始化页面
      this.getPropertyList()   // 调用该函数初始化物业的列表区域
    },


    methods: {
      async getPropertyList() {   //获取物业列表
        const { data: res } =await this.$axios.post('/ponyproperty-manager/merchant/listMerchant')  //,{ params: this.queryInfo}
        if(res.msg !=='OK') return this.$message.error('获取物业列表失败!~')
        this.propertyList = res.data
        this.total = res.data.length
        console.log('这是物业列表',res)
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {   // 设置table第一行的背景色
        if(rowIndex == 0) {
          return 'background:#f0f2f5'
        }
        else { return ''}
      },
      handleSizeChange(newSize) {   // 分页显示: 监听pagesize改变的函数
        this.queryInfo.pagesize = newSize
        this.getPropertyList()
      },
      handleCurrentChange(newPage) {   // 分页显示: 监听页码值改变的函数
        this.queryInfo.pagenum = newPage
        this.getPropertyList()
      },
      addDialogClosed() {   // 监听添加商户的对话框关闭时触发的事件
        this.$refs.addFormRef.resetFields()
      },
      addMerchant() {   // 点击确定按钮, 添加新物业
        this.$refs.addFormRef.validate(async (valid) => {
          if(!valid) return
          // 如果校验成功,, 可以发起网络请求. 来添加物业
          const {data:res} = await this.$axios({
            url:'/ponyproperty-manager/merchant/addMerchant',
            method: 'post',
            transformRequest: [function (data) {
              return Qs.stringify(data)
            }],
            data: {
              concat_name: this.addForm.concatName,
              concat_phone: this.addForm.concatPhone,
              merchant_id: this.addForm.merchant_id,
              merchant_name: this.addForm.merchantName
            }
          })
          if(res.msg!=='OK') return this.$message.error('添加物业失败!~')
          this.$message.success('添加物业成功!~')
          this.addDialogVisible = false   // 隐藏对话框
          this.getPropertyList()   // 重新请求最新数据, 重新渲染页面
          console.log(res)
        })
      },
      delMerchant() {   // 删除一条商户, 触发的函数

      },

      async showEditDialog(row) {   // 点击修改按钮, 展示修改页
        const {data:res} =await this.$axios({
          url:'/ponyproperty-manager/merchant/updataMerchant',
        })
        if(res.msg !=='OK') return this.$message.error('查询物业信息失败!~')
        console.log('修改成功')
        // this.editForm = res.data.propertys[parseInt(id)-1]
        // this.editDialogVisible = true
      },
      editDialogClosed() {   // 监听对话框关闭事件
        this.$refs.editFormRef.resetFields()
      },
      editMerchant() {   // 点击确定按钮, 修改物业
        this.$refs.editFormRef.validate( (valid) => {
          if(!valid) return
          // 如果校验成功,, 可以发起网络请求###
        })
      },
    }
  }
</script>

<style scoped>
  .propertyAccount-select { background-color: #FF6565; padding-left: 0 !important; }
  #ttt  {line-height: 40px; background-color: #F5FAFA; color: #999; font-size: 14px; border-right: 1px solid #d00; padding: 0 18px; }

  .merchant-input .el-input-group__prepend{ background-color: #06D673; }
  .merchant-name { height: 65px; position: relative; display: flex; align-items: flex-end;}
  .merchant-input { width: 250px; }
  .merchant-search { width: 85px; color: #fff; margin-left: 20px;}
  .merchant-add { position: absolute; right: 0; bottom: -8px; background-color: #06D673; color: #fff;}

</style>