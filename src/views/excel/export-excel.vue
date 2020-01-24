<template>
  <div>
    <div v-show="isShow" class="content">
      <div class="title">
        <h3 class="tab-title">部门列表</h3>
        <el-button
          type="primary"
          :class="{'selected':tab === 1,'testTitle':true}"
          @click="toTab('deparapment')"
        >部门添加</el-button>
      </div>
      <div class="wrapper">
        <el-table
          :data="DepartmentData"
          style="width: 100%"
          max-height="100%"
          row-key="departmentId"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column prop="departmentId" label="ID" width="180" />
          <el-table-column prop="departmentName" label="部门名称" width="480" />
          <el-table-column prop="userCount" label="职员数量" width="180" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="toTab('DepartmentModify',scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click.prevent="del(scope.$index, scope.row)"
              >删除</el-button>
              <!-- <el-button size="mini" type="info" plain @click="toTab('DepartmentModify',scope.row)">
                <!-- @click="handleEdit(scope.$index, scope.row)" -->
              <!-- <i class="el-icon-edit-outline" />
              </el-button>
              <el-button size="mini" type="info" plain @click.prevent="del(scope.$index, scope.row)">

                <i class="el-icon-delete" />
              </el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <deparapment ref="deparapment" :form-data="formData" @gohome="gohome" />
    <DepartmentModify ref="DepartmentModify" :row="row" @gohome="gohome" />
  </div>
</template>
<script>
import * as searchApi from '@/api/search'
import deparapment from './components/deparament'
import DepartmentModify from './components/DepartmentModify'

// import { mapState, mapActions } from 'vuex'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('my')
// console.log(mapState(['AddDepartmentData']), '----')
export default {
  components: {
    deparapment,
    DepartmentModify
  },
  data() {
    return {
      name: 'ExportExcel',
      isShow: true,
      tableData: [],
      treeDate: [],
      formData: {
        departmentName: this.departmentName
      },
      tab: '',
      row: {},
      iconFormVisible: false,
      userInfo: {},
      dialogTitle: '增加',
      rowIndex: null,
      currentPage: 1, // 初始页
      pagesize: 7, //    每页的数据
      userList: [],
      DepartmentData: []

    }
  },
  computed: {
    ...mapState(['AddDepartmentData'])
  },
  created() {
    this.getDepartmentData()
  },
  methods: {
    ...mapActions([
      'AddDepart' // 触发actions里的 getInfo 函数，调动接口
    ]),
    getDepartmentData() {
      searchApi.DepartmentList()
        .then(res => {
          console.log(res, '999')
          this.DepartmentData = res.data
        }).catch(error => {
          console.log(error)
        })
    },
    gohome(obj) {
      console.log('子组件传过来', obj)
      this.isShow = true
    },
    buildTree(list) {
      const temp = {}
      const tree = {}
      for (const i in list) {
        temp[list[i].departmentId] = list[i]
      }
      for (const i in temp) {
        if (temp[i].parentId) {
          if (!temp[temp[i].parentId].children) {
            // eslint-disable-next-line no-new-object
            // eslint-disable-next-line no-array-constructor
            temp[temp[i].parentId].children = new Array()
          }
          temp[temp[i].parentId].children[temp[i].departmentId] = temp[i]
        } else {
          tree[temp[i].departmentId] = temp[i]
        }
      }
      return tree
    },
    // 转扁平
    treeToList(tree) {
      var queen = []
      var out = []
      queen = queen.concat(tree)
      while (queen.length) {
        var first = queen.shift()
        if (first.children) {
          queen = queen.concat(first.children)
          delete first['children']
        }
        out.push(first)
      }
      return out
    },
    del(index, row) { // 删除
      this.$confirm(`确定删除【${row.departmentName}】部门吗?, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // const params = {
        //   id: row.channelId
        // }
        this.$http.delete('/department/' + row.departmentId).then(result => {
          if (result.data.code === 2000) {
          // 删除成功
            this.DepartmentData.splice(row.departmentId, 1)
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            console.log('删除成功')
            this.getDepartmentData()
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
    },
    // 编辑
    handleEdit(index, row) {
      this.dialogTitle = '编辑'
      this.userInfo = row
      this.iconFormVisible = true
      this.rowIndex = index
    },
    toTab(name, row) {
      const that = this
      that.row = row
      // console.log(row.departmentName)
      // this.$refs[subname].isShow = false;
      this.isShow = false
      this.$nextTick(() => {
        this.$refs[name].isShow = true
        this.$refs.row
        this.$refs.deparapment.say()
      })
    }
  }
}
</script>
<style lang="scss"  scoped>
  .wrapper{
        height: calc(100% -80px);
    }

>>>.el-button--medium {
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
.main-footer {
  height: 60px;
  line-height: 40px;
  position: fixed;
  float: right;
  z-index: 10;
  right: 0;
  bottom: 0;
  width: 86.5%;
color: #525759;
  margin: 0; /*很重要*/
}
.main-footer span{
  margin-left: 10px;
}
.versions{
  float: right;
  margin-right: 10px;
}
>>> .el-table thead {
    color: #131314 !important;
}
>>> .el-button--medium {
    margin-top: 5px!important;
    margin-left: 20px!important;
}

</style>
