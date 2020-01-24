<template>
  <div class="app-container">
    <div v-show="isShow">
      <div class="input">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline">
          <el-input
            v-model="search"
            style="display: inline-block;width:300px"
            placeholder="请输入搜索内容"
          /><el-button type="primary">搜索</el-button>

        </el-form>
      </div>

      <div class="content">
        <div class="title">
          <h3 class="tab-title">渠道信息</h3>
          <el-button
            type="primary"
            style="margin-left:10px;"
            class="seach"
            :class="{'selected':tab === 1,}"
            @click="toTab('ChannelsImport','AddChannel')"
          >渠道导入</el-button>
          <el-button
            type="primary"
            class="seach"
            :class="{'selected':tab === 2,}"
            @click="toTab('AddChannel','ChannelsImport')"
          >渠道添加</el-button>
        </div>
        <el-table
          ref="ChannelListData"
          :data="tables"
          style="width: 100%;margin-bottom: 20px;"
          row-key="channelId"
          border
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column prop="channelId" label="ID" sortable width="180" />
          <el-table-column prop="channelName" label="渠道名称" sortable width="180" />
          <el-table-column prop="userCount" label="职员数量" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="remove(scope.$index, scope.row)"
              >删除</el-button>
              <!-- <el-button size="mini" type="info" plain @click="handleEdit(scope.$index, scope.row)">
                <i class="el-icon-edit-outline" />
              </el-button>
              <el-button size="mini" type="info" plain @click="remove(scope.$index, scope.row)">
                <i class="el-icon-delete" />
              </el-button> -->
            </template>
          </el-table-column>
        </el-table>

        <!--分页-->
        <el-pagination
          :current-page="currentPage1"
          :page-sizes="[3, 5]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />

        <!--弹窗-->
        <el-dialog :title="dialogTitle" width="45%" :visible.sync="iconFormVisible">
          <el-form
            id="#update"
            ref="update"
            :inline="true"
            :model="update"
            :rules="updateRules"
            class="demo-form-inline"
          >
            <el-form-item label="编辑渠道">
              <el-input v-model="update.channelName" placeholder style="width:300px" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="iconFormVisible = false">取 消</el-button>
            <el-button type="primary" :loading="updateLoading" @click="submitUser()">确 定</el-button>
          </div>
        </el-dialog>

      </div>
    </div>
    <div>
      <AddChannel ref="AddChannel" :get-channal-list="getChannalList" @gohome="gohome" />
      <ChannelsImport ref="ChannelsImport" @gohome="gohome" />
      <ChannelEditing ref="ChannelEditing" @gohome="gohome" />
    </div>
  </div>
</template>

<script>
// import * as searchApi from '@/api/search'
import { channel, ChannelEdit, delteChannel } from '@/api/search'
import AddChannel from './components/AddChannel'
import ChannelsImport from './components/ChannelsImport'
import ChannelEditing from './components/ChannelEditing'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('channelList')
export default {
  name: 'UploadExcel',
  components: {
    AddChannel,
    ChannelsImport,
    ChannelEditing
  },
  data() {
    return {
      tab: '',
      isShow: true,
      tableData: [],
      currentPage1: 1, // 初始页
      pageSize: 5, //    每页的数据
      total: 0,
      page: 1,
      pageNum: 1,
      userList: [],
      search: '',
      selected: -1, // 选择了哪条记录
      selectedlist: {}, // 选中的信息
      slist: [],
      searchlist: [],
      ChannelListData: [],
      schfilter: '',
      currentId: '',
      updateLoading: false,
      false: false,
      update: {
        channelName: '',
        currentId: ''
      },
      updateRules: {
        name: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }] },
      searchParams: {
        remark: '',
        chanelName: '',
        chanelType: '',
        pageSize: 10,
        pageIndex: 0
      },
      value: '',
      iconFormVisible: false,
      userInfo: {},
      dialogTitle: '增加',
      rowIndex: null
    }
  },
  // created() {
  // },
  computed: {
    // ...mapState({
    //   ChannelListData: state => {
    //     console.log(state.ChannelListData, '-----------')
    //     return state.ChannelListData
    //   }
    // })
    // ...mapState(['ChannelListData'])
    // 模糊搜索
    tables() {
      const search = this.search
      // var _this = this
      // _this.currentPage = 1
      //   _this.getChannalList(_this.pageNum, _this.pageSize)
      if (search) {
        return this.ChannelListData.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.ChannelListData
      // 页面初始化数据需要判断是否检索过
    }
  },
  watch: {
    // 检测表格数据过滤变化，自动跳到第一页
    tables() {
      this.pageIndex = 1
    }
  },
  created() {
  },
  mounted() {
    // this.ChannelList()
    this.getChannalList()
  },
  methods: {
    // ...mapActions([
    //   'ChannelList' // 触发actions里的 getInfo 函数，调动接口
    // ]),
    // 点击搜索按钮获取第一页数据,将分页器设置为第一页
    // getFirstList() {
    //  this.pageNum = 1
    //   this.tables()
    // },
    gohome(obj) {
      console.log('子组件传过来', obj)
      this.isShow = true
    },
    toTab(name, subname) {
      this.$refs[subname].isShow = false
      this.isShow = false
      this.$nextTick(() => {
        this.$refs[name].isShow = true
      })
    },
    getChannalList(pageNum, pageSize) {
      this.loading = true
      channel({
        pageNo: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        if (res.code === 2000) {
          console.log(res, '@@@@@')
          this.total = res.data.total
          this.ChannelListData = res.data.list
          this.currentPage1 = res.data.pageNum
          this.loading = false
        } else {
          this.loading = false
          this.$message({
            message: '请求失败',
            type: 'warning'
          })
        }
      })
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pageSize = size
      // this.pageNo = 1
      this.getChannalList()
      console.log(this.pageSize) // 每页下拉显示数据
    },
    handleCurrentChange: function(val) {
      this.pageNum = val
      this.getChannalList()
      console.log(this.pageNum) // 点击第几页
      this.currentChangePage(this.search)
    },
    // 组件自带监控当前页码
    currentChangePage(list) {
      let from = (this.currentPage - 1) * this.pageSize
      const to = this.currentPage * this.pageSize
      this.tableDataEnd = []
      for (; from < to; from++) {
        if (list[from]) {
          this.tableDataEnd.push(list[from])
        }
      }
    },
    // 编辑
    handleEdit(index, row) {
      this.dialogTitle = '编辑'
      // this.ChannelListData = row
      this.iconFormVisible = true // 编辑信息模态框显示
      this.update = Object.assign({}, row) // 获得所有数据显示在编辑信息模态框里面
      // this.rowIndex = index
      // this.ChannelList()
      // this.currentId = this.ChannelListData[index].channelId
      // this.update.name = this.ChannelListData.channelName
    },
    // 弹窗确定修改
    submitUser() {
      this.$refs.update.validate((valid) => {
        const studenteList = this.update
        const { channelName, channelId } = studenteList
        if (channelName === '' || channelId === '') {
          this.$message.error('修改内容不能为空')
        } else if (valid) {
          this.updateLoading = true
          // ChannelEdit(this.$qs.stringify(this.currentId, this.update)).then(res => {
          this.$http.put('/channel', this.$qs.stringify(this.update)).then(res => {
            // this.$message.success('修改用户资料成功！')
            if (res.data.code === 2000) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.getChannalList()
              this.iconFormVisible = false
              this.updateLoading = false
            } else {
              // 失败了
              // alert('添加失败！')
              this.$message({
                message: '修改失败！',
                type: 'warning'
              })
              this.iconFormVisible = false
            }
          }).catch((res) => {
            var data = res
            if (data instanceof Array) {
              this.$message.error(data[0]['message'])
            } else if (data instanceof Object) {
              this.$message.error(data['message'])
            }
            this.updateLoading = false
          })
        } else {
          return false
        }
      })
    },
    // 删除
    remove(index, row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // const params = {
        //   id: row.channelId
        // }
        this.$http.delete('/channel/' + row.channelId).then(result => {
          if (result.data.code === 2000) {
          // 删除成功
            // this.tableData.forEach(function(item, index, arr) {
            this.ChannelListData.splice(row.channelId, 1)
            // })
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            console.log('删除成功')
            this.getChannalList()
          } else {
            // MessageBox('删除失败！', '提示')
            this.$message({
              message: '删除失败！',
              type: 'warning'
            })
          }
        })
      })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style lang="scss"  scoped>
.input {
  width: 98%;
  border: 1px solid #b6e0d8;
  height: 60px;
  border-radius: 5px;
  line-height: 59px;
  padding-left: 15px;
}
.seach {
  padding: 8px 13px;
  font-size: 12px;
  float: right;
  margin-top: 8px;
}
.title {
  width: 99%;
  height: 32px;
  line-height: 35px;
  margin: 0 auto;
  padding-bottom: 5px;
}
.content {
  width: 98%;
  border: 1px solid #b3cdda;
  margin: 0 auto;
  margin-top: 10px;
  padding-bottom: 20px;
  border-radius: 5px;
  color: black;
  margin-left: 2px;
}
.tab {
  width: 99%;
  // border: 1px solid #fff;
  margin: 0 auto;
  margin-top: 10px;
}
.tab-title {
  color: #525759;
  display: contents;
}
>>> .el-table thead {
  color: #131314 !important;
}
>>> .el-button--medium {
  margin-top: 1px !important;
  margin-left: 20px !important;
}
</style>
