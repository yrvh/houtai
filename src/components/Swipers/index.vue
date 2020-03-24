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
            <span @click="showSwipers(scope.row)" :class="[scope.row.status? 'font-success':'font-info', 'active-font']">显示</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="120px">
          <template slot-scope="scope">
            <span @click="removeSwipers(scope.row.id)" class="active-font font-warning">删除</span>
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
          :total="total">
      </el-pagination>
    </div>

    <!--  这是添加轮播图的 对话框  -->
    <el-dialog class="dialog-fontweight" title="添加轮播图" :visible.sync="addDialogVisible" width="30%" @close="addDialogClosed">

      <el-form :model="addForm" ref="addFormRef" label-width="90px">
        <el-form-item label="排序" >
          <el-input v-model="addForm.swipers_order"></el-input>
        </el-form-item>
        <el-form-item label="轮播图" >
          <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :limit="1">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="imgDialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="状态" >
          <el-switch v-model="addForm.swipers_status" active-color="#235FED" inactive-color="#999"></el-switch>
        </el-form-item>
        <el-form-item label="类型" >
          <el-radio v-model="addForm.swipers_type" label="0" text-color="#235FED;" fill="#235FED;">图片</el-radio>
          <el-radio v-model="addForm.swipers_type" label="1" text-color="#235FED;" fill="#235FED;">外链</el-radio>
        </el-form-item>
        <el-form-item label="链接地址" >
          <el-input v-model="addForm.swipers_addr"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button class="button-primary" @click="addSwipers">确 定</el-button>
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
          query: '',
          pagenum: 1,   // 当前页码
          pagesize: 6,   // 每页显示多少条数据
        },
        swipersList: [],   // 存储请求回来的 轮播图列表
        total: 0,   // 轮播图列表的数据总数
        addDialogVisible: false,   // 控制 添加轮播图这个对话框的显隐
        addForm: {
          swipwrs_order: '',
          swipers_img: '',
          swipers_status: true,
          swipers_type: '',
          swipers_addr: '',
        },
        dialogImageUrl: '',   // 添加图片的路径
        imgDialogVisible: false   //   添加图片时的弹窗,显隐
      }
    },
    created() {   // 生命周期函数, 用于初始化页面
      this.getSwipersList()   // 调用该函数初始化轮播图的列表区域
    },
    methods: {
      async getSwipersList() {   //获取轮播图列表
        const { data: res } =await this.$axios({
          url:'/api/swipers',
          method: 'get',
          transformRequest: [function (data) {
            return Qs.stringify(data)
          }],
          data: {
            pagenum: this.queryInfo.pagenum,
          }
        })
        if(res.meta.status !==200) return this.$message.error('获取轮播图列表失败!~')
        this.swipersList = res.data.swipers
        this.total = res.data.swipers.length   // 轮播图总数
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {   // 设置table第一行的背景色
        if(rowIndex == 0) {
          return 'background:#f0f2f5'
        }
        else { return '' }
      },
      handleSizeChange(newSize) {   // 分页显示: 监听pagesize改变的函数
        this.queryInfo.pagesize = newSize
        this.getSwipersList()
      },
      handleCurrentChange(newPage) {   // 分页显示: 监听页码值改变的函数
        this.queryInfo.pagenum = newPage
        this.getSwipersList()
      },
      addDialogClosed() {   // 监听添加轮播图的对话框关闭时触发的事件
        this.$refs.addFormRef.resetFields()
      },
      addSwipers() {   // 点击确定按钮, 添加新轮播图
        console.log(this.addForm)

        this.$refs.addFormRef.validate(async (valid) => {
          if(!valid) return
          // 如果校验成功,, 可以发起网络请求. 添加轮播图
          const {data:res} = await this.$axios({
            url:'/ponyproperty-manager/swipers/addSwipers',
            method: 'post',
            transformRequest: [function (data) {
              return Qs.stringify(data)
            }],
            data: {
              concat_name: this.addForm.concat_name,
              concat_phone: this.addForm.concat_phone,
              swipers_id: this.addForm.swipers_id,
              swipers_img: this.addForm.swipers_img
            }
          })
          if(res.msg!=='OK') return this.$message.error('添加轮播图失败!~')
          this.$message.success('添加轮播图成功!~')
          this.addDialogVisible = false   // 隐藏对话框
          this.getSwipersList()   // 重新请求最新数据, 重新渲染页面
          console.log(res)
        })
      },

      handleRemove(file, fileList) {   // upload钩子函数
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {   // upload钩子函数
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log("123")
      },

      async removeSwipers(id) {   // 删除一条轮播图, 触发的函数
        //弹框询问用户是否确认删除
        const confirmResult = await this.$confirm('此操作将永久删除轮播图片,是否继续?','提示',{
          confirmButtonText: '确定',
          confirmButtonClass: 'button-primary',
          cancelButtonText: '取消',
          cancelButtonClass: 'button-info',
          type: 'warning'
        }).catch( err => { return err})
        if(confirmResult !=='confirm'){
          return this.$message.info('已取消了删除!~~')
        }
        // console.log(id)
        // this.$axios.delete('')   // 轮播图确认删除,发起ajax请求???
        // if!==200 return this.$message.error('删除轮播图信息失败!~')
        // this.$message.success('删除轮播图片成功')
        // this.getSwipersList()   // 重新获取轮播图列表
      },
      async showSwipers(row) {   // 点击'显示' 控制轮播图的显隐
        for( let i=0;i<this.swipersList.length;i++){
          if(this.swipersList[i].id==row.id){
            this.swipersList[i].status = !row.status
            console.log(this.swipersList[i].id,this.swipersList[i].status)
            break
          }
        }
        // console.log(id)
        // this.$axios.delete('')   // 轮播图显隐,发起ajax请求???
        // if!==200 return this.$message.error('轮播图显隐状态更改失败!~')
        // this.$message.success('轮播图片状态更改成功')
      }
    }
  }
</script>

<style scoped>
  .swipers-top{ }

</style>