<!-- 公告管理页面 -->
<template>
  <main-card2 title1="公告管理">
    <div slot="content">
      <div class="announcement-top">
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
                    v-model="queryInfo.announcementTitle"
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
                    v-model="queryInfo.announcementData"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="2">
            <el-button type="danger" class="button-warning search-button" @click="getAnnouncementList">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="info" class="button-info reset-button" @click="resetAnnouncementList(queryInfo)">重置</el-button>
          </el-col>
        </el-row>
        <div class="second-line">
          <el-button class="button-primary" size="small" @click="addDialogVisible = true"><i class="iconfont icon-common-add"></i>添加公告</el-button>
        </div>
      </div>


      <!--   公告列表展示区   -->
      <el-table :data="announcementList" stripe :header-cell-style="getRowClass">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="标题" prop="announcementTitle"></el-table-column>
        <el-table-column label="发布时间" prop="ctime"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span @click="" class="active-font font-primary"><i class="iconfont icon-announcement-stick"></i></span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100px">
          <template slot-scope="scope">
            <span @click="showEditDialog(scope.row)" class="active-font font-primary">修改</span>
            <span @click="removeAnnouncement(scope.row.announcementId)" class="active-font font-warning">删除</span>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageNo"
          :page-sizes="[5, 8, 15, 20, 30]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="announcementTotal">
      </el-pagination>
    </div>

    <!--  这是添加公告的 对话框  -->
    <el-dialog class="dialog-fontweight" title="添加公告" :visible.sync="addDialogVisible" width="70%" @close="addDialogClosed">

      <el-form :model="addForm" :rules="formRules" ref="addFormRef" label-width="90px">
        <el-form-item label="小区ID">
          <el-input v-model="addForm.communityId"></el-input>
        </el-form-item>
        <el-form-item label="公告标题" prop="announcementTitle">
          <el-input v-model="addForm.announcementTitle"></el-input>
        </el-form-item>
        <el-form-item label="公告内容">
          <quill-editor v-model="addForm.announcementContent"></quill-editor>
        </el-form-item>
        <el-form-item label="是否置顶" prop="isTop">
          <el-input v-model="addForm.isTop"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer"  class="dialog-footer">
        <el-button class="button-info" @click="addDialogVisible = false">取 消</el-button>
        <el-button class="button-primary" @click="addAnnouncement" >确 定</el-button>
      </span>
    </el-dialog>

    <!--  修改公告的 对话框 -->
    <el-dialog class="dialog-fontweight" title="修改公告信息" :visible.sync="editDialogVisible" width="70%" @close="editDialogClosed">

      <el-form :model="editForm" :rules="formRules" ref="editFormRef" label-width="80px">
        <el-form-item label="小区ID">
          <el-input v-model="editForm.communityId" disabled></el-input>
        </el-form-item>
        <el-form-item label="公告标题" prop="announcementTitle">
          <el-input v-model="editForm.announcementTitle"></el-input>
        </el-form-item>
        <el-form-item label="公告内容">
          <quill-editor v-model="addForm.announcementContent"></quill-editor>
        </el-form-item>
        <el-form-item label="是否置顶" prop="isTop">
          <el-input v-model="editForm.isTop"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer"  class="dialog-footer">
        <el-button class="button-info" @click="editDialogVisible = false">取 消</el-button>
        <el-button class="button-primary" @click="editAnnouncement">确 定</el-button>
      </span>
    </el-dialog>
  </main-card2>
</template>

<script>
  import Qs from 'qs'

  export default {
    name: "Announcement",
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
      var checkBool = (rule, value, cb) => {   // 布尔值校验
        const regBool = /^(0|1)$/
        if(regBool.test(value)) return cb()
        cb(new Error('该值仅为 0 或 1'))
      }

      return {
        formRules: {   // 格式校验
          communityId: [
            { required: true, message: '请输入小区ID!~', trigger: 'blur' },
          ],
          announcementTitle: [
            {required: true, message: '请输入公告标题!~', trigger: 'blur'},
            { min: 2, max: 50, message: '长度在2 ~ 50个字符之间!~',trigger: 'blur'}
          ],
          announcementContent: [
            {required: true, message: '请输入公告内容!~', trigger: 'blur'}
          ],
          isTop: [
            {required: true, message: '是否置顶 0 否, 1 置顶!~', trigger: 'blur'},
            {validator: checkBool, trigger: 'blur'}
          ]
        },
        
        queryInfo: {   // 获取房间信息时 传的参数对象
          query: '',   // 查询参数,
          community: '',   // 查询参数,小区
          announcementTitle: '',   // 查询参数,公告标题
          announcementData: '',   // 查询参数,发公告时间
          communityId: 'XQ1242702813771993088',
          merchantId:'mt111',
          pageNo: 1,   // 当前页码
          pageSize: 5,   // 当前每页显示多少条数据
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
        announcementList: [],   // 存储请求回来的 公告列表
        announcementTotal: 0,   // 商户列表的总数

        addDialogVisible: false,   // 该属性控制 添加公告这个对话框的显隐
        addForm: {
          communityId: '',
          announcementContent: '',
          announcementTitle: '',
          isTop: 0,
        },
        
        editDialogVisible: false,   // 控制修改 对话框的显隐
        editForm: { },   // 修改公告时,用于接收 将要修改的公告的信息
      }
    },
    created() {   // 生命周期函数, 用于初始化页面
      this.getAnnouncementList()   // 调用该函数初始化公告的列表区域
    },
    
    methods: {
      async getAnnouncementList() {   //获取公告列表
        const {data:res} =await this.$axios({
          url:'/ponyproperty-manager/announcement/listAnnouncement',
          method: 'post',
          transformRequest: [function (data) {
            return Qs.stringify(data)
          }],
          data: {
            communityId: this.queryInfo.communityId || '2',
            merchantId: this.queryInfo.merchantId,
            pageNo: this.queryInfo.pageNo,
            pageSize: this.queryInfo.pageSize
          }
        })
        if(res.msg !=='OK') return this.$message.error('获取公告列表失败!~')
        this.announcementList = res.data.records
        this.announcementTotal = this.announcementList.length || 0
      },

      resetAnnouncementList(obj){   // 点击重置按钮时触发的事件
        this.clearObj(obj)   // 调用全局函数清空对象
        this.getAnnouncementList()
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {   // 设置table第一行的背景色
        if(rowIndex == 0) {
          return 'background:#f0f2f5'
        }
        else { return ''}
      },
      handleSizeChange(newSize) {   // 分页显示: 监听pageSize改变的函数
        this.queryInfo.pageSize = newSize
        this.getAnnouncementList()
      },
      handleCurrentChange(newPage) {   // 分页显示: 监听页码值改变的函数
        this.queryInfo.pageNo = newPage
        this.getAnnouncementList()
      },
      //====================================================================添加
      addDialogClosed() {   // 添加公告的对话框关闭时触发的事件
        this.$refs.addFormRef.resetFields()
        console.log(this.addForm)
      },
      addAnnouncement() {   // 点击确定按钮, 添加新公告
        this.$refs.addFormRef.validate(async (valid) => {
          if(!valid) return
          // 如果校验成功,, 可以发起网络请求. 来添加公告
          const {data:res} = await this.$axios({
            url:'/ponyproperty-manager/announcement/addAnnouncement',
            method: 'post',
            transformRequest: [function (data) {
              return Qs.stringify(data)
            }],
            data: {
              merchantId: this.queryInfo.merchantId,
              communityId: this.addForm.communityId || '2',
              announcementContent: this.addForm.announcementContent,
              isTop: this.addForm.isTop,
              announcement: this.addForm.announcement,
              announcementTitle: this.addForm.announcementTitle
            }
          })
          if(res.msg!=='OK') return this.$message.error('添加公告失败!~')
          this.$message.success('添加公告成功!~')
          this.addDialogVisible = false   // 隐藏对话框
          this.getAnnouncementList()   // 重新请求最新数据, 重新渲染页面
        })
      },
      //====================================================================修改
      async showEditDialog(row) {   // 点击修改按钮, 展示修改页
        this.editForm = row   // 当行数据赋值给 要修改的公告
        this.editDialogVisible = true
      },
      editDialogClosed() {   // 监听修改小区的对话框关闭事件
        this.$refs.editFormRef.resetFields()
      },
      editAnnouncement() {   // 点击确定按钮, 修改公告
        this.$refs.editFormRef.validate(async (valid) => {
          if(!valid) return
          const {data:res} = await this.$axios({
            url:'/ponyproperty-manager/announcement/updateAnnouncement',
            method: 'post',
            transformRequest: [function (data) {
              return Qs.stringify(data)
            }],
            data: {
              merchantId: this.editForm.merchantId,
              communityId: this.editForm.communityId,
              announcementId: this.editForm.announcementId,
              announcementTitle: this.editForm.announcementTitle,
              announcementContent: this.editForm.announcementContent,
              isTop: this.editForm.isTop
            }
          })
          if(res.msg !=='OK') return this.$message.error('修改公告失败!~')
          this.$message.success('修改公告成功')
          this.editDialogVisible = false   // 隐藏修改的对话框
          this.getAnnouncementList()   // 重新获取公告列表
        })
      },
      //======================================================================删除
      async removeAnnouncement(id) {   // 删除一条帐户, 触发的函数
        // 弹框询问用户是否确认删除
        const confirmResult = await this.$confirm('此操作将永久删除该公告, 是否继续?','提示',{
          confirmButtonText: '确定',
          confirmButtonClass: 'button-primary',
          cancelButtonText: '取消',
          cancelButtonClass: 'button-info',
          type: 'warning'
        }).catch( err => {return err})
        if(confirmResult !== 'confirm'){
          return this.$message.info('已取消了删除!~~')
        }
        const {data:res} =await this.$axios({   // 发起Ajax请求
          url:'/ponyproperty-manager/announcement/deleteAnnouncement',
          method: 'post',
          transformRequest: [function (data) {
            return Qs.stringify(data)
          }],
          data: { announcementId: id }
        })
        if(res.msg !=='OK') return this.$message.error('删除公告失败!~')
        this.getAnnouncementList()   // 重新获取账号列表
        this.$message.success('删除账号成功!~')
      },

    }
  }
</script>

<style scoped>
  .el-row .el-col { line-height: 38px;}
  .el-row span { font-weight: 600; font-size: 14px;}
  .quill-editor { min-height: 200px; background-color: #f7f9f7; }
</style>