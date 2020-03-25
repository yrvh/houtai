<!-- 权限管理 下边的角色管理页面 -->
<template>
  <main-card2 title1="权限管理" title2="角色管理">
    <div slot="content">
      <div class="role-top">
<!--        <el-row :gutter="6">-->
<!--          <el-col :span="6">-->
<!--            <el-row :gutter="2">-->
<!--              <el-col :span="4.5"><span>小区名称</span></el-col>-->
<!--              <el-col :span="18">-->
<!--                <el-select v-model="queryInfo.community" allow-create filterable clearable placeholder="全部小区">-->
<!--                  <el-option-->
<!--                      v-for="item in comm_options"-->
<!--                      :key="item.comm_key"-->
<!--                      :label="item.label"-->
<!--                      :value="item.comm_key">-->
<!--                  </el-option>-->
<!--                </el-select>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--          </el-col>-->

<!--          <el-col :span="5">-->
<!--            <el-row :gutter="4" >-->
<!--              <el-col :span="5.5"><span>姓名</span></el-col>-->
<!--              <el-col :span="18">-->
<!--                <el-input-->
<!--                    placeholder="请输入姓名"-->
<!--                    v-model="queryInfo.accountName"-->
<!--                    clearable>-->
<!--                </el-input>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--          </el-col>-->

<!--          <el-col :span="6">-->
<!--            <el-row :gutter="2">-->
<!--              <el-col :span="4.5"><span>角色</span></el-col>-->
<!--              <el-col :span="18">-->
<!--                <el-select v-model="queryInfo.accountRole" allow-create filterable clearable placeholder="请选择角色">-->
<!--                  <el-option-->
<!--                      v-for="item in role_options"-->
<!--                      :key="item.role_key"-->
<!--                      :label="item.label"-->
<!--                      :value="item.role_key">-->
<!--                  </el-option>-->
<!--                </el-select>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--          </el-col>-->

<!--          <el-col :span="2">-->
<!--            <el-button class="button-warning search-button" @click="getAccountList">查询</el-button>-->
<!--          </el-col>-->
<!--          <el-col :span="2">-->
<!--            <el-button class="button-info reset-button" @click="resetAccountList(queryInfo)">重置</el-button>-->
<!--          </el-col>-->
<!--        </el-row>-->
      </div>


      <!--   角色列表展示区   -->
      <el-table :data="roleList" stripe :header-cell-style="getRowClass">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="角色" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="note"></el-table-column>
        <el-table-column label="操作" min-width="100px">
          <template slot-scope="scope">
            <span @click="showDetailDialog(scope.row)" class="active-font font-primary">详情</span>
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
          :total="roleTotal">
      </el-pagination>
    </div>
  </main-card2>
</template>

<script>
  import Qs from 'qs'

  export default {
    name: "Role",
    data() {
      return {
        queryInfo: {   // 获取角色列表时 传的参数对象
          query: '',   // 查询参数,
          community: '',   // 查询参数,小区
          roleName: '',   // 查询参数,角色名
          role: '',   // 查询参数,角色
          pageNo: 1,   // 当前页码
          pageSize: 2,   // 当前每页显示多少条数据
          type: '',
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
        role_options:  [{   // 角色数据下拉菜单列表
          role_key: '角色1',
          label: '小马'
        }, {
          role_key: '角色2',
          label: '角色物业'
        }, {
          role_key: '角色3',
          label: '小区'
        }],
        roleList: [],   // 存储请求回来的 角色列表
        roleTotal: 0,   // 角色列表的总数
      }
    },
    created() {   // 生命周期函数, 用于初始化页面
      this.queryInfo.type = window.sessionStorage.getItem('TYPE')
      this.getRoleList()   // 调用该函数初始化公告的列表区域
    },


    methods: {
      async getRoleList() {   //获取角色列表
        const {data:res} =await this.$axios({
          url:'/ponyproperty-manager/role/listRoles',
          method: 'post',
          transformRequest: [function (data) {
            return Qs.stringify(data)
          }],
          data: {
            roleType: this.queryInfo.type
          }
        })
        if(res.msg !=='OK') return this.$message.error('获取角色列表失败!~')
        this.roleList = res.data
        this.roleTotal = this.roleList.length || 0
      },
      resetRoleList(obj){   // 点击重置按钮时触发的事件
        this.clearObj(obj)   // 调用全局函数清空对象
        this.getRoleList()
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {   // 设置table第一行的背景色
        if(rowIndex == 0) {
          return 'background:#f0f2f5'
        }
        else { return ''}
      },
      handleSizeChange(newSize) {   // 分页显示: 监听pageSize改变的函数
        this.queryInfo.pageSize = newSize
        this.getRoleList()
      },
      handleCurrentChange(newPage) {   // 分页显示: 监听页码值改变的函数
        this.queryInfo.pageNo = newPage
        this.getRoleList()
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