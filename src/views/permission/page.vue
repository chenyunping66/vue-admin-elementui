<template>
  <div>
    <div v-show="isShow" class="content">
      <div class="title">
        <h3 class="tab-title">菜单列表</h3>
        <el-button
          type="primary"
          :class="{'selected':tab === 1,'testTitle':true}"
          @click="toTab('menu')"
        >菜单添加</el-button>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column
          prop="menuId"
          label="ID"
          sortable
          width="180"
        />
        <el-table-column
          prop="menuName"
          label="菜单名称"
          sortable
          width="180"
        />
        <el-table-column
          prop="alias"
          label="路由名称"
        />
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

      <!--弹窗-->
      <el-dialog :title="dialogTitle" width="50%" :visible.sync="iconFormVisible">
        <el-form :inline="true" :model="userInfo" class="demo-form-inline" label-width="180px">
          <el-form-item label="归属菜单">
            <!-- <el-input v-model="userInfo.name" placeholder="上级部门" style="width:500px" /> -->
            <DepartmentSelect @sonChange="changeID" />

          </el-form-item>
          <el-form-item label="菜单名称">
            <el-input v-model="userInfo.menuName" placeholder="菜单名称" style="width:500px" />
          </el-form-item>
          <el-form-item label="菜单路由">
            <el-input v-model="userInfo.alias" placeholder="菜单图标" style="width:500px" />
          </el-form-item>
          <!-- <el-form-item label="显示菜单">
            <el-select v-model="userInfo.check" placeholder="显示菜单" style="width:500px">
              <el-option label="是" value="是" />
              <el-option label="否" value="否" />
            </el-select>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="userInfo.sort" placeholder="排序" style="width:500px" />
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="iconFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitUser()">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <menuadd ref="menu" @gohome="gohome" />
  </div>
</template>
<script>
import * as searchApi from '@/api/search'
// import DepartmentSelect form '../common/DepartmentSelect'
import menuadd from './menus/menuAdd'
import DepartmentSelect from '../common/DepartmentSelect'
export default {
  name: 'Menu',
  components: {
    menuadd,
    DepartmentSelect
  },
  data() {
    return {
      tab: '',
      isShow: true,
      iconFormVisible: false,
      userInfo: {
        menuName: '',
        alias: ''
      },
      dialogTitle: '增加',
      rowIndex: null,
      tableData: []
    }
  },
  mounted() {
    this.getMenusList()
  },
  methods: {
    changeID(value) {
      this.num = value
      console.log(233)
      console.log(this.num, '&&&&&')
    },
    getMenusList() {
      searchApi.MenuList()
        .then(res => {
          console.log(8888)
          console.log(res)
          this.tableData = res.data
        }).catch(error => {
          console.log(error)
        })
    },
    toTab(name, subname) {
      // this.$refs[subname].isShow = false
      this.isShow = false
      this.$nextTick(() => {
        this.$refs[name].isShow = true
      })
    },
    gohome(obj) {
      console.log('子组件传过来', obj)
      this.isShow = true
    },
    // //点击行展开
    // clickTable(row,index,e){
    //      this.$refs.refTable.toggleRowExpansion(row)
    // },
    // 删除行
    handleDelete(index, rows) {
      rows.splice(index, 1)
    },
    // 增加
    add() {
      this.dialogTitle = '增加'
      this.userInfo = {}
      this.iconFormVisible = true
    },
    // 编辑
    handleEdit(index, row) {
      this.dialogTitle = '编辑'
      this.userInfo = row
      this.iconFormVisible = true
      this.rowIndex = index
      this.userInfo = Object.assign({}, row) // 获得所有数据显示在编辑信息模态框里面
    },
    // 弹窗确定
    submitUser() {
      const from = {
        menuName: this.userInfo.menuName,
        alias: this.userInfo.alias,
        id: this.userInfo.menuId,
        parentId: this.userInfo.parentId
      }
      console.log(this.userInfo, '####')
      this.updateLoading = true
      this.userInfo = Object.assign({}, this.row) // 获得所有数据显示在编辑信息模态框里面
      // ChannelEdit(this.$qs.stringify(this.currentId, this.update)).then(res => {
      this.$http.put('/menu', this.$qs.stringify(from)).then(res => {
        // this.$message.success('修改用户资料成功！')
        if (res.data.code === 2000) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.getMenusList()
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
    },
    // 删除
    remove(index, row) {
      this.$confirm(`确定删除【${row.menuName}】用户吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // const params = {
        //   id: row.channelId
        // }
        this.$http.delete('/menu/' + row.menuId).then(result => {
          if (result.data.code === 2000) {
          // 删除成功
            this.tableData.splice(row.menuId, 1)
            // })
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            console.log('删除成功')
            this.getMenusList()
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
.dialog-footer{
  margin-top: -20px;
}
>>>.el-button--medium {
  padding: 8px 13px;
  font-size: 12px;
  margin-left: 20px;
  float: right;
  // margin-top: -20px;
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
.el-dialog__footer {
    margin-top: -63px;
}
</style>
