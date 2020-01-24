
<template>
  <div class="app-container">
    <div v-show="isShow">
      <div class="input">
        <!-- <el-input v-model="tableDataName" placeholder="请输入姓名" style="width:240px" />
        <el-button type="primary" @click="doFilter">搜索</el-button> -->
        <!-- 搜索框加按钮 -->
        <el-input v-model="searchData" placeholder="请搜索职位名称" prefix-icon="el-icon-search" style="width:200px;" />
        <el-button class="searchbtn" type="primary" @click="search">搜索</el-button>

      </div>

      <div class="content">
        <div class="title">
          <h3 class="tab-title">职位列表</h3>
          <el-button
            type="primary"
            class="seach"
            :class="{'selected':tab === 1,'testTitle':true}"
            @click="toTab('PositionAdd','positionLimited','OperationPermission')"
          >职位添加</el-button>
        </div>
        <div class="">
          <!-- ref="positionListData"
            :data="tables"            :data="tableDateAll" -->
          <el-table
            :data="list"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            border
            max-height="550px"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column prop="positionId" label="ID" width="180" />
            <el-table-column prop="positionName" label="职位名称" width="180" />
            <el-table-column prop="departmentName" label="所属部门" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="info"
                  plain
                  title="修改"
                  @click="open(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  size="mini"
                  type="primary"
                  plain
                  title="数据权限"
                  :class="{'selected':tab === 2,'testTitle':true}"
                  @click="toTab('positionLimited','PositionAdd','OperationPermission')"
                >
                  数据权限
                </el-button>
                <el-button
                  size="mini"
                  type="success"
                  plain
                  title="操作权限"
                  :class="{'selected':tab === 3,'testTitle':true}"
                  @click="toTab('OperationPermission','positionLimited','PositionAdd')"
                >
                  操作权限
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  plain
                  title="删除"
                  @click="remove(scope.$index, scope.row)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!--分页-->
        <el-pagination
          :current-page.sync="currentPage"
          :page-sizes="[3,5, 8]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />

        <!--弹窗-->
        <el-dialog
          :title="dialogTitle"
          width="50%"
          :visible.sync="iconFormVisible"
        >
          <el-form :inline="true" :model="userInfo" class="demo-form-inline">
            <el-form-item label="所属部门">
              <el-select v-model="userInfo.name" placeholder="归属部门">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="职位名称">
              <el-input v-model="userInfo.menuName" placeholder="职位名称" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="iconFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitUser()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- @click="handleEdit(scope.$index, scope.row)" -->
      <channelDialog :show.sync="show" :row="row" />
      <!-- <positionEdit></positionEdit> -->
    </div>

    <div>
      <position-add ref="PositionAdd" @gohome="gohome" />
      <positionLimited ref="positionLimited" @gohome="gohome" />
      <OperationPermission ref="OperationPermission" @gohome="gohome" />
    </div>
  </div>
</template>

<script>
import * as searchApi from '@/api/search'
import PositionAdd from './components/PositionAdd'
import positionLimited from './position/positionLimited'
import positionEdit from './position/positionEdit'
import channelDialog from './position/channelDialog'
import OperationPermission from './position/OperationPermission'

import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('positionList')

export default {
  name: 'SelectExcel',
  components: {
    PositionAdd,
    positionLimited,
    positionEdit,
    channelDialog,
    OperationPermission
  },
  data() {
    return {
      tableDateAll: [],
      isShow: true,
      show: false,
      tab: '',
      row: {},
      list: [],
      // search: '',
      searchData: '',
      tableDataName: '',
      pagercount: '',
      currentPage: 1, // 初始页
      pageSize: 5, //    每页的数据s
      totalItems: 0,
      keyword: '', // 搜索关键词
      tableDateAlltwo: '', // 搜索重定义数组
      total: 0,
      pages: '',
      value: '',
      iconFormVisible: false,
      userInfo: {},
      dialogTitle: '增加',
      rowIndex: null
    }
  },
  // watch: {
  // },
  computed: {
    ...mapState({
      positionListData: state => {
        console.log(state.positionListData)
        return state.positionListData
      }
    })
  },
  mounted() {
    this.getAllList()
  },
  created() {
    // 重定义数组
    this.tableDateAlltwo = this.tableDateAll
  },
  methods: {
    ...mapActions([
      'getPositionList' // 触发actions里的 getInfo 函数，调动接口
    ]),
    search3() {
      // 搜索
      var keyword = this.keyword
      if (keyword) {
        this.tableDateAlltwo = this.tableDateAll.filter(function(tableDateAll) {
          return Object.keys(tableDateAll).some(function(key) {
            return String(tableDateAll[key]).toLowerCase().indexOf(keyword) > -1
          })
        })
      } else {
        this.tableDateAlltwo = this.tableDateAll
      }
    },
    // 处理数据
    getList() {
      // debugger
      // es6过滤得到满足搜索条件的展示数据list
      const list = this.tableDateAll.filter((item, index) =>
        item.positionName.includes(this.searchData)
      )
      this.list = list.filter((item, index) =>
        index < this.currentPage * this.pageSize && index >= this.pageSize * (this.currentPage - 1)
      )
      console.log(this.total, '888')
      this.total = list.length
    },
    // 搜索过滤数据
    search() {
      this.page = 1
      this.getList()
    },
    gohome(obj) {
      // console.log('子组件传过来', obj)
      this.isShow = true
    },
    open(row) {
      const that = this
      that.row = row
      this.show = true
    },
    toTab(name, subname) {
      // this.$refs[subname].isShow = false;
      this.isShow = false
      this.$nextTick(() => {
        this.$refs[name].isShow = true
      })
    },
    getAllList(currentPage, pageSize) {
      this.loading = true
      searchApi.positions().then(res => {
        console.log(res, '-----------')
        if (res.code === 2000) {
          this.total = res.data.total
          console.log(res.data, '总数')
          this.tableDateAll = res.data.list
          this.getList()
          this.currentPage = res.data.pageNum
          this.loading = false
        } else {
          this.loading = false
          this.$message({
            message: '请求失败',
            type: 'error'
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange(val) {
      this.pageSize = val
      // console.log(size, '++++++++++++++++++++++++++++') // 点击第几页
      this.getList()
      console.log(`每页下拉显示数据:${val}`) // 每页下拉显示数据
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
      console.log(`每页下拉显示点击第几页:${val}`) // 每页下拉显示点击第几页
    },
    // 编辑
    handleEdit(index, row) {
      this.dialogTitle = '编辑'
      this.userInfo = row
      this.iconFormVisible = true
      this.rowIndex = index
    },
    // 弹窗确定
    submitUser() {
      if (this.dialogTitle === '编辑') {
        this.tableData1.splice(this.rowIndex, 1, this.userInfo)
        this.iconFormVisible = false
        return
      }
      this.tableData1.splice(0, 0, this.userInfo)
      this.iconFormVisible = false
    },
    // 删除
    remove(index, row) {
      this.$confirm(`此操作将永久删除[ ${row.positionName} ]职位, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // const params = {
        //   id: row.channelId
        // }
        this.$http.delete('/position/' + row.positionId).then(result => {
          if (result.data.code === 2000) {
          // 删除成功
            this.tableDateAll.splice(row.positionId, 1)
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            console.log('删除成功')
            this.getAllList()
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
<style lang="scss" scoped>
.input {
  width: 98%;
  border: 1px solid #b6e0d8;
  height: 60px;
  border-radius: 5px;
  line-height: 59px;
  padding-left: 15px;
}
>>>.el-button--medium {
  padding: 8px 13px;
  font-size: 12px;
  // float: right;
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
.seach {
  padding: 8px 13px;
  font-size: 12px;
  float: right;
  margin-top: 8px;
}
>>> .el-button--medium {
  margin-top: 1px !important;
  margin-left: 10px !important;
>>> .el-button--mini {
    padding: 7px 9px;
}
}
</style>
