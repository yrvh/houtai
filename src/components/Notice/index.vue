<!-- 公告管理页面 -->
<template>
  <main-card2 title1="公告管理">
    <div slot="content">
      <div class="notice-top">
        <el-row :gutter="6">
          <el-col :span="6">
            <el-row :gutter="2">
              <el-col :span="4.5"><span>小区名称</span></el-col>
              <el-col :span="18">
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

          <el-col :span="5">
            <el-row :gutter="4" >
              <el-col :span="5.5"><span>标题</span></el-col>
              <el-col :span="18">
                <el-input
                    placeholder="请输入公告标题"
                    v-model="queryInfo.notice_title"
                    clearable>
                </el-input>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="7">
            <el-row :gutter="4" >
              <el-col :span="5.5"><span>发布时间</span></el-col>
              <el-col :span="6">
                <el-date-picker
                    v-model="queryInfo.notice_date"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="2">
            <el-button type="danger" class="button-warning notice-button" @click="getNoticeList">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="info" class="button-info notice-button" @click="resetNoticeList(queryInfo)">重置</el-button>
          </el-col>
        </el-row>
        <div class="second-line">
          <el-button class="button-primary" size="small" @click="addDialogVisible = true"><i class="iconfont icon-add"></i>添加公告</el-button>
          <el-button class="button-success" size="medium" @click="addDialogVisible = true">Excel 模板</el-button>
          <el-button class="button-primary" size="medium" @click="addDialogVisible = true">房间导入</el-button>
          <el-button class="button-success" size="medium" @click="addDialogVisible = true">房间导出</el-button>
        </div>
      </div>


      <!--   公告列表展示区   -->
      <el-table :data="notice_list" stripe :header-cell-style="getRowClass">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="标题" prop="name"></el-table-column>
        <el-table-column label="发布时间" prop="address"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span @click="" class="active-font font-primary">置顶?</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100px">
          <template slot-scope="scope">
            <span @click="showDetailDialog(scope.row.id)" class="active-font font-primary">详情?</span>
            <span @click="" class="active-font font-success">编辑?</span>
            <span @click="" class="active-font font-warning">删除?</span>
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
          :total="notice_total">
      </el-pagination>
    </div>

    <!--  这是添加公告的 对话框  -->
    <el-dialog title="添加公告公司" :visible.sync="addDialogVisible" width="40%" @close="addDialogClosed">

      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
        <el-form-item label="公告名称" prop="notice_name">
          <el-input v-model="addForm.notice_name"></el-input>
        </el-form-item>
        <el-form-item label="商户ID" prop="notice_id">
          <el-input v-model="addForm.notice_id"></el-input>
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
        <el-button @click="addNotice" type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <!--  修改公告的 对话框 -->
    <el-dialog title="修改公告信息" :visible.sync="editDialogVisible" width="40%" @close="editDialogClosed">

      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">
        <el-form-item label="公告名称">
          <el-input v-model="editForm.notice_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="商户ID">
          <el-input v-model="editForm.notice_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="concat_name">
          <el-input v-model="editForm.concat_name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="concat_phone">
          <el-input v-model="editForm.concat_phone" ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="editDialog-footer">
        <el-button @click="editDialogVisible = false" type="primary" plain class="editDialog-footer-cancel">取 消</el-button>
        <el-button @click="editnotice" type="primary" class="editDialog-footer-sure">确 定</el-button>
        <el-button @click="delNotice" type="danger" plain class="editDialog-footer-del">删 除</el-button>
      </span>
    </el-dialog>
  </main-card2>
</template>

<script>
  import Qs from 'qs'

  export default {
    name: "Notice",
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
        queryInfo: {   // 获取房间信息时 传的参数对象
          query: '',   // 查询参数,
          community: '',   // 查询参数,小区
          notice_title: '',   // 查询参数,公告标题
          notice_date: '',   // 查询参数,发公告时间
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
        notice_list: [],   // 存储请求回来的 公告列表
        notice_total: 0,   // 商户列表的总数
        //============================================================================================
        addDialogVisible: false,   // 该属性控制 添加公告这个对话框的显隐
        addForm: {
          notice_name: '',
          notice_id: '',
          concat_name: '',
          concat_phone: ''
        },
        addFormRules: {   // 添加公告时的 格式校验
          notice_name: [
            {required: true, message: '请输入公告名字!~', trigger: 'blur'},
            { min: 2, max: 15, message: '长度在2 ~ 15个字符之间!~',trigger: 'blur'}
          ],
          notice_id: [
            {required: true, message: '请输入公告appID!~', trigger: 'blur'},
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

        editFormRules: {   //修改公告时的格式校验
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
        editForm: { },   // 修改公告时,用于接收 将要修改的公告的信息
      }
    },
    created() {   // 生命周期函数, 用于初始化页面
      this.getNoticeList()   // 调用该函数初始化公告的列表区域
    },


    methods: {
      async getNoticeList() {   //获取公告列表
        const { data: res } =await this.$axios.get('/api/communicate')   //,{ params: this.queryInfo}
        if(res.meta.status !==200) return this.$message.error('获取小区列表失败!~')
        this.notice_list = res.data.communicates
        this.notice_total = res.data.total
      },
      resetNoticeList(obj){   // 点击重置按钮时触发的事件
        this.clearObj(obj)   // 调用全局函数清空对象
        this.getNoticeList()
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {   // 设置table第一行的背景色
        if(rowIndex == 0) {
          return 'background:#f0f2f5'
        }
        else { return ''}
      },
      handleSizeChange(newSize) {   // 分页显示: 监听pagesize改变的函数
        this.queryInfo.pagesize = newSize
        this.getNoticeList()
      },
      handleCurrentChange(newPage) {   // 分页显示: 监听页码值改变的函数
        this.queryInfo.pagenum = newPage
        this.getNoticeList()
      },
      addDialogClosed() {   // 监听添加商户的对话框关闭时触发的事件
        this.$refs.addFormRef.resetFields()
      },
      addNotice() {   // 点击确定按钮, 添加新公告
        this.$refs.addFormRef.validate(async (valid) => {
          if(!valid) return
          // 如果校验成功,, 可以发起网络请求. 来添加公告
          const {data:res} = await this.$axios({
            url:'/ponyproperty-manager/notice/addNotice',
            method: 'post',
            transformRequest: [function (data) {
              return Qs.stringify(data)
            }],
            data: {
              concat_name: this.addForm.concat_name,
              concat_phone: this.addForm.concat_phone,
              notice_id: this.addForm.notice_id,
              notice_name: this.addForm.notice_name
            }
          })
          if(res.msg!=='OK') return this.$message.error('添加公告失败!~')
          this.$message.success('添加公告成功!~')
          this.addDialogVisible = false   // 隐藏对话框
          this.getNoticeList()   // 重新请求最新数据, 重新渲染页面
          console.log(res)
        })
      },

      showEditDialog(row) {   // 点击修改按钮, 展示修改页
        this.editForm = row
        console.log('row赋值给editForm',this.editForm)
        this.editDialogVisible = true
      },
      editDialogClosed() {   // 监听对话框关闭事件
        this.$refs.editFormRef.resetFields()
      },
      editnotice() {   // 点击确定按钮, 修改公告
        this.$refs.editFormRef.validate(async (valid) => {
          if (!valid) return
          console.log('修改后的editForm',this.editForm)
          console.log(this.editForm.concat_phone)
          console.log(this.editForm.notice_id)
          const {data:res} =await this.$axios({
            url:'/ponyproperty-manager/notice/updatenotice',
            method: 'post',
            transformRequest: [function (data) {
              return Qs.stringify(data)
            }],
            data: {
              concat_name: this.editForm.concat_name,
              concat_phone: this.editForm.concat_phone,
              notice_id: this.editForm.notice_id,
              notice_name: this.editForm.notice_name
            }
          })
          if(res.msg !=='OK') return this.$message.error('修改商户信息失败!~')
          this.editDialogVisible = false
          this.getNoticeList()   // 重新请求最新数据, 重新渲染页面
          this.$message.success('修改商户信息成功!~')
        })
      },
      async delNotice() {   // 删除一条商户, 触发的函数
        const {data:res} =await this.$axios({
          url:'/ponyproperty-manager/notice/deletenotice',
          method: 'post',
          transformRequest: [function (data) {
            return Qs.stringify(data)
          }],
          data: { notice_id: this.editForm.notice_id }
        })
        if(res.msg !=='OK') return this.$message.error('删除商户信息失败!~')
        this.editDialogVisible = false
        this.getNoticeList()   // 重新请求最新数据, 重新渲染页面
        this.$message.success('删除键商户信息成功!~')
      },

      showRegDialog(id) {   // 点击创建公告, 展示注册页对话框
        this.regForm.notice_id = id
        this.regDialogVisible = true
      },
      regDialogClosed() {   // 监听对话框关闭事件
        this.$refs.regFormRef.resetFields()
      },
      regnotice() {   // 点击确定按钮, 注册公告
        this.$refs.regFormRef.validate(async (valid) => {
          if (!valid) return
          console.log(this.regForm.type)
          const {data:res} =await this.$axios({
            url:'/ponyproperty-manager/login/register',
            method: 'post',
            transformRequest: [function (data) {
              return Qs.stringify(data)
            }],
            data: {
              notice_id: this.regForm.notice_id,
              notice_name: this.regForm.notice_name,
              password: this.regForm.password,
              phone: this.regForm.phone,
              email: this.regForm.email,
              type: this.regForm.type,
              grade: this.regForm.grade,
            }
          })
          if(res.msg !=='OK') return this.$message.error('注册公告失败!~')
          this.regDialogVisible = false
          this.getNoticeList()   // 重新请求最新数据, 重新渲染页面
          this.$message.success('注册公告成功!~')
        })
      },
      showDetailDialog() {   // 点击详情时的,处理函数
        console.log('点击了详情')
      }

    }
  }
</script>

<style scoped>
  .editDialog-footer { display: flex; justify-content: space-around;}
  .editDialog-footer-cancel { flex: 3;}
  .editDialog-footer-sure { flex: 5;}
  .editDialog-footer-del { flex: 3;}

  .el-row .el-col { line-height: 38px;}
  .el-row span { font-weight: 600; font-size: 14px;}
  .notice-button { width: 70px; }
</style>