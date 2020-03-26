<!-- 轮播图页面-->
<template>
  <main-card2 title1="轮播图">
    <div slot="content">
      <div class="swipers-top">
        <el-button class="button-primary" type="primary" size="small" @click="addDialogVisible = true"><i class="iconfont icon-add"></i>添加轮播图</el-button>
      </div>

      <!--   轮播图列表展示区   -->
      <el-table :data="swipersList" stripe :header-cell-style="getRowClass">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="轮播图" prop="name"></el-table-column>
        <el-table-column label="状态" min-width="120px">
          <template slot-scope="scope">
            <span @click="isShow(scope.row)" :class="[scope.row.status? 'font-success':'font-info', 'active-font']">显示</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="120px">
          <template slot-scope="scope">
            <span @click="showEditDialog(scope.row.id)" class="active-font font-primary">修改</span>
            <span @click="removeSwipers(scope.row.id)" class="active-font font-warning">删除</span>
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
          :total="swipersTotal">
      </el-pagination>
    </div>

    <!--  这是添加轮播图的 对话框  -->
    <el-dialog class="dialog-fontweight" title="添加轮播图" :visible.sync="addDialogVisible" width="40%" @close="addDialogClosed">
      <el-form :model="addForm" ref="addFormRef" label-width="90px">
        <el-form-item label="排序" >
          <el-select v-model="addForm.sort" placeholder="请选择轮播图顺序">
            <el-option
                v-for="item in sortOptions"
                :key="item.sortKey"
                :label="item.label"
                :value="item.sortKey">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="轮播图" >
          <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"

              :limit="1">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="imgDialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>

        <el-form-item label="状态" >
          <el-switch v-model="addForm.status" active-color="#235FED" inactive-color="#999"></el-switch>
        </el-form-item>
        <el-form-item label="类型" >
          <el-radio v-model="addForm.type" :label="1" text-color="#235FED;" fill="#235FED;">图片</el-radio>
          <el-radio v-model="addForm.type" :label="2" text-color="#235FED;" fill="#235FED;">外链</el-radio>
        </el-form-item>
        <el-form-item label="链接地址">
          <el-input v-model="addForm.linked"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button class="button-primary" @click="addSwipers">确 定</el-button>
        <el-button class="button-info" @click="addDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <!--  这是修改轮播图的 对话框  -->
    <el-dialog class="dialog-fontweight" title="修改公告信息" :visible.sync="editDialogVisible" width="40%" @close="editDialogClosed">
      <el-form :model="editForm" ref="editFormRef" label-width="90px">
        <el-form-item label="排序" >
          <el-input v-model="editForm.sort"></el-input>
        </el-form-item>
        <el-form-item label="轮播图" >
          <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"

              :limit="1">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="imgDialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="状态" >
          <el-switch v-model="editForm.status" active-color="#235FED" inactive-color="#999"></el-switch>
        </el-form-item>
        <el-form-item label="类型" >
          <el-radio v-model="editForm.type" label="0" text-color="#235FED;" fill="#235FED;">图片</el-radio>
          <el-radio v-model="editForm.type" label="1" text-color="#235FED;" fill="#235FED;">外链</el-radio>
        </el-form-item>
        <el-form-item label="链接地址" >
          <el-input v-model="editForm.linked"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button class="button-primary" @click="editSwipers">确 定</el-button>
        <el-button class="button-info" @click="addDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

  </main-card2>
</template>

<script>
  import Qs from 'qs'

  export default {
    name: "Swipers",
    components:{},
    data() {
      return {
        queryInfo: {   // 这是渲染table表格, 给后端接口传递的参数.   现在的接口暂时不需要传参
          communityId: '',
          merchantId: 'mt111',
          pageNo: 1,   // 当前页码
          pageSize: 6,   // 每页显示多少条数据
        },
        swipersList: [],   // 存储请求回来的 轮播图列表
        swipersTotal: 0,   // 轮播图列表的数据总数

        addDialogVisible: false,   // 控制 添加轮播图这个对话框的显隐
        addForm: {
          linked: '',   // 链接地址
          picUrl: '',   // 轮播图片
          sort: '',   // 轮播顺序
          status: '',   // 状态
          type: '',   // 轮播图类型1纯图,  2外链接
        },
        sortOptions:  [{   // 轮播图排序的下拉菜单
          sortKey: 1,
          label: '第一'
        }, {
          sortKey: 2,
          label: '第二'
        }, {
          sortKey: 3,
          label: '第三'
        }],
        
        dialogImageUrl: '',   // 添加图片的路径
        imgDialogVisible: false,   //   添加图片时的弹窗,显隐

        editDialogVisible:false,
        editForm: {},

        showForm: {},
      }
    },
    created() {   // 生命周期函数, 用于初始化页面
      this.getSwipersList()   // 调用该函数初始化轮播图的列表区域
    },
    methods: {
      async getSwipersList() {   //获取轮播图列表
        const {data:res} =await this.$axios({
          url:'/ponyproperty-manager/swiper/listSwiper',
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
        if(res.msg !=='OK') return this.$message.error('获取轮播图列表失败!~')
        this.swipersList = res.data
        this.swipersTotal = this.swipersList.length || 0
      },

      resetSwipersList(obj){   // 点击重置按钮时触发的事件
        this.clearObj(obj)   // 调用全局函数清空对象
        this.getSwipersList()
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {   // 设置table第一行的背景色
        if(rowIndex == 0) {
          return 'background:#f0f2f5'
        }
        else { return ''}
      },
      handleSizeChange(newSize) {   // 分页显示: 监听pageSize改变的函数
        this.queryInfo.pageSize = newSize
        this.getSwipersList()
      },
      handleCurrentChange(newPage) {   // 分页显示: 监听页码值改变的函数
        this.queryInfo.pageNo = newPage
        this.getSwipersList()
      },
      //====================================================================添加
      addDialogClosed() {   // 添加轮播图的对话框关闭时触发的事件
        console.log(typeof this.addForm.type)
        this.$refs.addFormRef.resetFields()
      },
      addSwipers() {   // 点击确定按钮, 添加新轮播图
        this.$refs.addFormRef.validate(async (valid) => {
          if(!valid) return
          // 如果校验成功,, 可以发起网络请求. 来添加轮播图
          const {data:res} = await this.$axios({
            url:'/ponyproperty-manager/swiper/addSwiper',
            method: 'post',
            transformRequest: [function (data) {
              return Qs.stringify(data)
            }],
            data: {
              merchantId: this.queryInfo.merchantId,
              communityId: this.queryInfo.communityId || '2',
              swiperId: this.addForm.swiperId,
              picUrl: this.addForm.picUrl,
              sort: this.addForm.sort,
              status: this.addForm.status,
              type: this.addForm.type,
            }
          })
          if(res.msg!=='OK') return this.$message.error('添加轮播图失败!~')
          this.$message.success('添加轮播图成功!~')
          this.addDialogVisible = false   // 隐藏对话框
          this.getSwipersList()   // 重新请求最新数据, 重新渲染页面
        })
      },
      //====================================================================修改
      async showEditDialog(row) {   // 点击修改按钮, 展示修改页
        this.editForm = row   // 当行数据赋值给 要修改的轮播图
        this.editDialogVisible = true
      },
      editDialogClosed() {   // 监听修改小区的对话框关闭事件
        this.$refs.editFormRef.resetFields()
      },
      editSwipers() {   // 点击确定按钮, 修改轮播图
        this.$refs.editFormRef.validate(async (valid) => {
          if(!valid) return
          const {data:res} = await this.$axios({
            url:'/ponyproperty-manager/swiper/updateSwiper',
            method: 'post',
            transformRequest: [function (data) {
              return Qs.stringify(data)
            }],
            data: {
              merchantId: this.queryInfo.merchantId,
              communityId: this.queryInfo.communityId || '2',
              swiperId: this.editForm.swiperId,
              picUrl: this.editForm.picUrl,
              sort: this.editForm.sort,
              status: this.editForm.status+0,
              type: this.editForm.type,
            }
          })
          if(res.msg !=='OK') return this.$message.error('修改轮播图失败!~')
          this.$message.success('修改轮播图成功')
          this.editDialogVisible = false   // 隐藏修改的对话框
          this.getSwipersList()   // 重新获取轮播图列表
        })
      },
      //======================================================================删除
      async removeSwipers(id) {   // 删除一条帐户, 触发的函数
        // 弹框询问用户是否确认删除
        const confirmResult = await this.$confirm('此操作将永久删除该轮播图, 是否继续?','提示',{
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
          url:'/ponyproperty-manager/swiper/deleteSwiper',
          method: 'post',
          transformRequest: [function (data) {
            return Qs.stringify(data)
          }],
          data: { swipersId: id }
        })
        if(res.msg !=='OK') return this.$message.error('删除轮播图失败!~')
        this.getSwipersList()   // 重新获取账号列表
        this.$message.success('删除账号成功!~')
      },
      //====================================================================显示/隐藏
      async isShow(row) {   // 点击显示
        this.showForm = row
        this.showForm.status = this.showForm.status ==1? 0:1

        const {data:res} = await this.$axios({
          url:'/ponyproperty-manager/swiper/updateSwiper',
          method: 'post',
          transformRequest: [function (data) {
            console.log(data)
            return Qs.stringify(data)
          }],
          data: {
            merchantId: this.queryInfo.merchantId,
            communityId: this.queryInfo.communityId || '2',
            swiperId: this.showForm.swiperId,
            picUrl: this.showForm.picUrl,
            sort: this.showForm.sort,
            status: this.showForm.status,
            type: this.showForm.type,
          }
        })
        console.log(res)
        if(res.msg !=='OK') return this.$message.error('更改状态失败!~')
        this.$message.success('更改状态成功!~')
        this.getSwipersList()   // 重新获取轮播图列表
      },


      handleRemove(file, fileList) {   // upload钩子函数
        console.log(file, fileList);
      },
      handlePicture(file) {   // upload钩子函数
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log("123")
      },

    },
  }
</script>

<style scoped>
  .swipers-top{ }
</style>