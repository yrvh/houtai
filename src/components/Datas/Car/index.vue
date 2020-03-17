<!-- 数据管理下的  车位信息-->
<template>
  <main-card2 title1="数据管理" title2="车位信息">
    <div slot="content">
      <div class="car-top">
        <el-row :gutter="8">

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
              <el-col :span="5.5"><span>车位号</span></el-col>
              <el-col :span="17">
                <el-input
                    placeholder="输入车位号"
                    v-model="queryInfo.car"
                    clearable>
                </el-input>
              </el-col>
            </el-row>
          </el-col>
          
          <el-col :span="4">
            <el-row :gutter="4">
              <el-col :span="5.5"><span>车牌号</span></el-col>
              <el-col :span="17">
                <el-input
                    placeholder="输入车位号"
                    v-model="queryInfo.car"
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
            <el-button class="button-warning search-button" @click="getCarList">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button class="button-info reset-button" @click="resetCatList(queryInfo)">重置</el-button>
          </el-col>
        </el-row>

        <div class="second-line">
          <el-button class="button-primary" size="small" @click="addDialogVisible = true"><i class="iconfont icon-add"></i>车位添加</el-button>
        </div>

        <div class="car-nav second-line">
          <el-button type="primary" size="small" plain>汽车</el-button>
          <el-button type="primary" size="small" plain>摩托车</el-button>
          <el-button type="primary" size="small" plain>电动车</el-button>
          <el-button type="primary" size="small" plain>三轮车</el-button>
        </div>
        <div class="carport car-nav second-line">
          <el-button type="primary" size="small" plain>已租车位</el-button>
          <el-button type="primary" size="small" plain>空余车位</el-button>
        </div>
      </div>

      <!--   车位列表区, 数据展示   -->
      <el-table :data="car_list" stripe :header-cell-style="getRowClass">
        <el-table-column label="车位号" prop="id"></el-table-column>
        <el-table-column label="车牌号" prop="address"></el-table-column>
        <el-table-column label="车辆主人" prop="name"></el-table-column>
        <el-table-column label="操作"  class="car-table-lastcol">
          <template slot-scope="scope">
            <span @click="showDetailDialog(scope.row.id)" class="active-font font-primary">详情</span>
            <span @click="removeCar(scope.row.id)" class="active-font font-warning">删除</span>
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
          :total="car_total">
      </el-pagination>
    </div>
    <!--  这是添加车位的 对话框  -->
    <el-dialog class="dialog-fontweight" title="添加车位" :visible.sync="addDialogVisible" width="40%" @close="addDialogClosed">

      <el-form class="dialog-form" :model="addform" :rules="addform_rules" ref="addform_ref" label-width="80px">
        <el-form-item label="车位号"  prop="car_carport">
          <el-input v-model="addform.car_carport"></el-input>
        </el-form-item>
        <el-form-item label="车牌号"  prop="car_carnum">
          <el-input v-model="addform.car_carnum"></el-input>
        </el-form-item>
        <el-form-item label="车辆主人"  prop="car_host">
          <el-input v-model="addform.car_host"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button class="button-primary" @click="addcar">确 定</el-button>
        <el-button class="button-info" @click="addDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <!--  显示车位详情的 对话框 -->
    <el-dialog class="dialog-fontweight" title="车位详情" :visible.sync="detailDialogVisible" width="40%" @close="detailDialogClosed">

      <el-form class="dialog-form" :model="detailform" :rules="detailform_rules" ref="detailform_ref" label-width="70px">
        <el-form-item label="车位号"  prop="car_carport">
          <el-input v-model="detailform.car_carport"></el-input>
        </el-form-item>
        <el-form-item label="车牌号"  prop="car_carnum">
          <el-input v-model="detailform.car_carnum"></el-input>
        </el-form-item>
        <el-form-item label="车辆主人" disabled>
          <el-input v-model="detailform.car_host"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button class="button-primary" @click="detailcar">确 定</el-button>
        <el-button class="button-info" @click="detailDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

  </main-card2>
</template>

<script>
  import Qs from 'qs'
  export default {
    name: "Car",
    components:{},
    data() {
      // 自定义校验规则
      var checkMobile = (rule, value, cb) => {
        const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/
        if(regMobile.test(value)) return cb()
        cb(new Error('请输入合法的手机号!~'))
      }

      return {
        queryInfo: {   // 获取车位信息时 传的参数对象
          query: '',   // 查询参数,
          merchant: '',   // 查询参数,物业公司
          community: '',   // 查询参数,小区
          car: '',   // 查询参数,车位号
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

        comm_options:  [{   // 车位数据下拉菜单列表
          comm_key: '车位1',
          label: '一车位'
        }, {
          comm_key: '车位2',
          label: '二车位'
        }, {
          comm_key: '选项3',
          label: '三车位'
        }],
        car_list: [],   // 车位列表
        car_total: 0,   // 车位信息总数据条数
        //==================================================================添加
        addDialogVisible: false,   // 控制添加车位的显示与隐藏
        addform: {
          car_carnum: '',
          car_carport: '',
          car_host: '',
        },
        addform_rules: {   // 添加车位的校验规则
          car_carport: [
            {required: true, message: '请输入车位!~', trigger: 'blur'}
          ],
          car_carnum: [
            {required: true, message: '请输入车牌号!~', trigger: 'blur'}
          ],
          car_host: [
            {required: true, message: '请输入车辆主人!~', trigger: 'blur'}
          ]
        },
        //====================================================================详情
        detailDialogVisible: false,   // 控制详情对话框的显隐
        detailform: { },   // 修改车位详情时的表单信息
        detailform_rules: {   // 添加车位的校验规则
          car_carport: [
            {required: true, message: '请输入车位!~', trigger: 'blur'}
          ],
          car_carnum: [
            {required: true, message: '请输入车牌号!~', trigger: 'blur'}
          ],
          car_host: [
            {required: true, message: '请输入车辆主人!~', trigger: 'blur'}
          ]
        },

      }
    },
    created() {
      this.getCarList()
    },
    methods: {
      async getCarList() {   //获取车位列表
        const { data: res } =await this.$axios.get('/api/communicate')   //,{ params: this.queryInfo}
        if(res.meta.status !==200) return this.$message.error('获取车位列表失败!~')
        this.car_list = res.data.communicates
        this.car_total = res.data.total
      },
      resetCatList(obj){   // 点击重置按钮时触发的事件
        this.clearObj(obj)   // 调用全局函数清空对象
        this.getCarList()
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {   // 设置table的首行背景颜色
        if(rowIndex == 0) {
          return 'background:#EEE'
        }
        else { return ''}
      },
      handleSizeChange(newSize) {   // 监听pagesize改变的函数
        this.queryInfo.pagesize = newSize
        this.getCarList()
      },
      handleCurrentChange(newPage) {   // 监听页码值改变的函数
        this.queryInfo.pagenum = newPage
        this.getCarList()
      },

      //=================================================================添加
      addDialogClosed() {   // 监听添加车位的对话框关闭事件
        this.$refs.addform_ref.resetFields()
      },
      addcar() {   // 添加新车位,触发的函数
        this.$refs.addform_ref.validate( (valid) => {
          if(!valid) return
          // 如果校验成功,, 可以发起网络请求???
          // if!==200 添加失败
          // this.$message.success('添加车位成功')
          this.addDialogVisible = false   // 隐藏添加车位的对话框
          // this.getCarList()   // 重新获取用户的列表
        })
      },
      //=================================================================删除
      async removeCar() {   // 删除车位, 触发的函数
        // 弹框询问用户是否确认删除
        console.log("点击了删除")
        const confirmResult = await this.$confirm('此操作将永久删除该车位, 是否继续?','提示',{
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
          url:'/ponyproperty-manager/car/deletecar',
          method: 'post',
          transformRequest: [function (data) {
            return Qs.stringify(data)
          }],
          data: { car_id: this.detailform.car_id }
        })
        if(res.msg !=='OK') return this.$message.error('删除车位信息失败!~')
        this.getCarList()   // 重新获取车位列表
        this.$message.success('删除车位成功!~')
      },
      //=================================================================详情
      async showDetailDialog(row) {   // 点击详情时的,处理函数
        console.log("====================")
        this.detailform = row   // 当行数据赋值给 要修改的车位
        // const {data:comm} =await this.$axios.get('/api/communicate')
        // if(comm.meta.status !==200) return this.$message.error('查询车位信息失败')
        // this.detailform = comm.data.car[parseInt(row.id)-1]
        this.detailDialogVisible = true
      },
      detailDialogClosed() {   // 监听修改车位的对话框关闭事件
        this.$refs.detailform_ref.resetFields()
      },
      detailcar() {   // 点击确定按钮, 修改车位
        this.$refs.detailform_ref.validate( (valid) => {
          if(!valid) return
          // 如果校验成功,, 可以发起网络请求???
          // if!==200 添加失败
          // this.$message.success('修改车位成功')
          this.detailDialogVisible = false   // 隐藏修改车位的对话框
          // this.getCarList()   // 重新获取用户的列表
        })
      },
    }
  }
</script>

<style scoped>
  .car-top {  }
  .el-row .el-col { line-height: 38px;}
  .el-row span { font-weight: 600; font-size: 14px;}
  /*.dialog-form{ display: flex; flex-wrap: wrap; }*/
  .car-nav .el-button { color: #000; border-color: #DDD; background-color: #fff;}
  .car-nav .el-button:hover { background-color: #235FED; border-color: #235FED; color: #fff;}
  .car-nav .el-button:focus { background-color: #235FED; border-color: #235FED; color: #fff;}

  .carport .el-button { color: #000; border-color: #DDD; background-color: #fff;}
  .carport .el-button:hover { background-color: #30D4AF; border-color: #30D4AF; color: #fff;}
  .carport .el-button:focus { background-color: #30D4AF; border-color: #30D4AF; color: #fff;}
</style>