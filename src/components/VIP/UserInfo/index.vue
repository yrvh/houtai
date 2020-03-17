<!-- 会员用户 下的用户信息页面 -->
<template>
  <main-card2 title1="会员用户" title2="用户信息">
    <div slot="content">
      <div class="userinfo-top">
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

          <el-col :span="9">
            <el-row :gutter="18"  >
              <el-col :span="4.5"><span>房间号</span></el-col>
              <el-col :span="6">
                <el-select v-model="queryInfo.userinfo_build" allow-create filterable clearable placeholder="楼号">
                  <el-option
                      v-for="item in build_options"
                      :key="item.build_key"
                      :label="item.label"
                      :value="item.build_key">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="7">
                <el-select v-model="queryInfo.userinfo_unit" allow-create filterable clearable placeholder="单元">
                  <el-option
                      v-for="item in unit_options"
                      :key="item.unit_key"
                      :label="item.label"
                      :value="item.unit_key">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select v-model="queryInfo.userinfo_house" allow-create filterable clearable placeholder="房间">
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
                    v-model="queryInfo.userinfo_owner"
                    clearable>
                </el-input>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="2">
            <el-button class="button-warning search-button" @click="getUserInfoList">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button class="button-info reset-button" @click="resetUserInfoList(queryInfo)">重置</el-button>
          </el-col>
        </el-row>
        <div class="second-line">
          <el-button class="button-primary" size="small" @click="addDialogVisible = true"><i class="iconfont icon-add"></i>新建账号</el-button>
        </div>
      </div>


      <!--   账号列表展示区   -->
      <el-table :data="userinfo_list" stripe :header-cell-style="getRowClass">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="用户名" prop="name"></el-table-column>
        <el-table-column label="姓名" prop="address"></el-table-column>
        <el-table-column label="房间号" prop="name"></el-table-column>
        <el-table-column label="手机号" prop="address"></el-table-column>
        <el-table-column label="注册时间" prop="account"></el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[5, 8, 15, 20, 30]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="userinfo_total">
      </el-pagination>
    </div>

    <!--  这是添加用户的 对话框  -->
    <el-dialog title="添加用户公司" :visible.sync="addDialogVisible" width="40%" @close="addDialogClosed">

      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
        <el-form-item label="用户名" prop="userinfo_name">
          <el-input v-model="addForm.userinfo_name"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="concat_name">
          <el-input v-model="addForm.concat_name"></el-input>
        </el-form-item>
        <el-form-item label="房间号" prop="userinfo_house">
          <el-input v-model="addForm.userinfo_house"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="concat_phone">
          <el-input v-model="addForm.concat_phone" ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button @click="addUserInfo" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    
  </main-card2>
</template>

<script>
  import Qs from 'qs'

  export default {
    name: "Userinfo",
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
        queryInfo: {   // 获取用户列表时 传的参数对象
          query: '',   // 查询参数,
          community: '',   // 查询参数,小区
          userinfo_build: '',   // 查询参数,楼号
          userinfo_unit: '',   // 查询参数,单元号
          userinfo_house: '',   // 查询参数,房间号
          userinfo_owner: '',   // 查询参数,业主姓名
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
        userinfo_list: [],   // 请求回来的用户列表
        userinfo_total: 0,   // 用户列表的总数
        //============================================================================================0
        addDialogVisible: false,   // 该属性控制 添加用户信息对话框的显隐
        addForm: {
          userinfo_name: '',
          userinfo_house: '',
          concat_name: '',
          concat_phone: ''
        },
        addFormRules: {   // 添加用户时的 格式校验
          userinfo_name: [
            {required: true, message: '请输入用户名!~', trigger: 'blur'},
            { min: 2, max: 15, message: '长度在2 ~ 15个字符之间!~',trigger: 'blur'}
          ],
          userinfo_house: [
            {required: true, message: '请输入房间号!~', trigger: 'blur'},
            { min: 3, max: 8, message: '长度在3 ~ 8个字符之间!~',trigger: 'blur'}
          ],
          concat_name: [
            { required: true, message: '请输入联系人姓名!~', trigger: 'blur'},
            { min: 2, max: 15, message: '长度在2 ~ 15个字符之间!~',trigger: 'blur'}
            // { validator: checkMobile, trigger: 'blur'}
          ],
          concat_phone: [
            {required: true, message: '请输入联系电话!~', trigger: 'blur'},
            { validator: checkMobile, trigger: 'blur'}
          ]
        }
      }
    },
    created() {   // 生命周期函数, 用于初始化页面
      this.getUserInfoList()   // 调用该函数初始化用户的列表区域
    },


    methods: {
      async getUserInfoList() {   //获取用户列表   发起Ajax请求-----------???
        const { data: res } =await this.$axios.get('/api/communicate')   //,{ params: this.queryInfo}
        if(res.meta.status !==200) return this.$message.error('获取小区列表失败!~')
        this.userinfo_list = res.data.communicates
        this.userinfo_total = res.data.total
      },
      resetUserInfoList(obj){   // 点击重置按钮时触发的事件
        this.clearObj(obj)   // 调用全局函数清空对象
        this.getUserInfoList()
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {   // 设置table第一行的背景色
        if(rowIndex == 0) {
          return 'background:#f0f2f5'
        }
        else { return ''}
      },
      handleSizeChange(newSize) {   // 分页显示: 监听pagesize改变的函数
        this.queryInfo.pagesize = newSize
        this.getUserInfoList()
      },
      handleCurrentChange(newPage) {   // 分页显示: 监听页码值改变的函数
        this.queryInfo.pagenum = newPage
        this.getUserInfoList()
      },
      addDialogClosed() {   // 监听添加用户的对话框关闭时触发的事件
        this.$refs.addFormRef.resetFields()
      },
      addUserInfo() {   // 点击确定按钮, 添加新用户 发起Ajax请求-----------???
        this.$refs.addFormRef.validate(async (valid) => {
          if(!valid) return
          // 如果校验成功,, 可以发起网络请求. 来添加用户
          const {data:res} = await this.$axios({
            url:'/ponyproperty-manager/UserInfo/addUserinfo',
            method: 'post',
            transformRequest: [function (data) {
              return Qs.stringify(data)
            }],
            data: {
              concat_name: this.addForm.concat_name,
              concat_phone: this.addForm.concat_phone,
              userinfo_id: this.addForm.userinfo_id,
              userinfo_name: this.addForm.userinfo_name
            }
          })
          if(res.msg!=='OK') return this.$message.error('添加用户失败!~')
          this.$message.success('添加用户成功!~')
          this.addDialogVisible = false   // 隐藏对话框
          this.getUserInfoList()   // 重新请求最新数据, 重新渲染页面
          console.log(res)
        })
      }
    }
  }
</script>

<style scoped>

  .el-row .el-col { line-height: 38px;}
  .el-row span { font-weight: 600; font-size: 14px;}
  .userinfo-button { width: 70px; }
</style>