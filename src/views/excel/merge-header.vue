<template>
  <div class="app-container">
    <div v-show="isShow">
      <div class="input">
        <el-input v-model="searchTableInfo" prefix-icon="iconfont icon-sousuo" placeholder="请输入搜索内容" style="width:240px" />
        <el-button class="searchbtn" type="primary">搜索</el-button>

        <!-- <el-select v-model="searchData" filterable placeholder="选择部门">
          <el-option
            v-for="item in UserListData"
            :key="item.departmentId"
            :label="item.departmentName"
            :value="item.departmentId"
          />
        </el-select>
        <el-select v-model="value2" filterable placeholder="选择职业">
          <el-option
            v-for="item in UserListData"
            :key="item.positionId"
            :label="item.positionName"
            :value="item.positionId"
          />
        </el-select>
        <el-select v-model.number="UserListData.status" filterable placeholder="选择状态">
          <el-option label="在职" :value="0" />
          <el-option label="转岗" :value="1" />
          <el-option label="离职" :value="2" />
          <el-option label="休假" :value="3" />
        </el-select>
        <el-button type="primary" @click="doFilter">搜索</el-button> -->
      </div>

      <div class="content">
        <div class="title">
          <h3 class="tab-title">职员列表</h3>
          <el-button
            type="primary"
            class="seach"
            style="margin-left:10px;"
            :class="{'selected':tab === 1,'testTitle':true}"
            @click="toTab('StaffAdd','FilenameOption')"
          >职员导入</el-button>
          <el-button
            type="primary"
            class="seach"
            :class="{'selected':tab === 2,'testTitle':true}"
            @click="toTab('FilenameOption','StaffAdd')"
          >职员添加</el-button>
          <!-- <el-button
            type="primary"
            class="seach"
            @click="openAdd"
          >职员详情添加</el-button> -->
        </div>

        <el-table
          ref="table"
          :data="UserListData"
          style="wiusernamedth: 100%;"
          row-key="id"
          border
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column prop="userId" label="ID" width="180" />
          <el-table-column prop="username" label="用户名" width="180" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="mobile" label="手机号码" />
          <!-- <el-table-column prop="departmentName" label="所属部门" /> -->
          <!-- <el-table-column label="所属部门">
            {{ departmentName }}
          </el-table-column> -->
          <el-table-column prop="departmentName" label="所属部门" />
          <el-table-column label="职位" prop="positionName" />
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0">在职</span>
              <span v-if="scope.row.status == 1">转岗</span>
              <span v-if="scope.row.status == 2">离职</span>
              <span v-if="scope.row.status == 3">休假</span>
            </template>
          </el-table-column>
          <el-table-column label="详情">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" plain @click="add('StaffDetailsAdded',scope.row)">
                <!-- <i class="el-icon-delete" /> -->
                添加
              </el-button>
              <el-button size="mini" type="warning" plain @click="open(scope.row)">
                <!-- <i class="el-icon-more" /> -->
                修改
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="info" plain @click="handleEdit(scope.$index, scope.row, scope.getUserDetail)">
                <!-- <i class="el-icon-edit-outline" /> -->
                编辑
              </el-button>
              <el-button size="mini" type="danger" @click="remove(scope.$index, scope.row)">
                <!-- <i class="el-icon-delete" /> -->
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
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
        <!--弹窗编辑职员-->
        <el-dialog :title="dialogTitle" :visible.sync="iconFormVisible">
          <el-form
            id="#userInfo"
            ref="userInfo"
            :inline="true"
            :model="userInfo"
            class="demo-form-inline"
          >
            <el-form-item label="用户名" style="margin-left:10px;">
              <el-input v-model="userInfo.username" placeholder="用户名" />
            </el-form-item>
            <el-form-item label="密码" style="margin-left:110px;">
              <el-input v-model="userInfo.password" placeholder="密码" />
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="userInfo.mobile" placeholder="联系电话" />
            </el-form-item>
            <el-form-item label="职员姓名" style="margin-left:80px;">
              <el-input v-model="userInfo.name" placeholder="职员姓名" />
            </el-form-item>
            <el-form-item label="职员状态">
              <el-select v-model.number="userInfo.status" filterable placeholder="选择状态">
                <el-option
                  v-for="item in statusSelect"
                  :key="item.status"
                  :label="item.label"
                  :value="item.status"
                  style=" min-width: 150.388px !important"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="渠道来源" style="margin-left:65px;">
              <el-select v-model="userInfo.channelId" placeholder="请选择">
                <el-option
                  v-for="item in AllChannelData"
                  :key="item.channelId"
                  :label="item.channelName"
                  :value="item.channelId"
                  style=" min-width: 200.388px !important"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="归属部门">
              <depart
                v-model="userInfo.departmentId"
                :user-info="userInfo"
                @sonChange="changeID"
              />
            </el-form-item>
            <el-form-item label="所任职位">
              <Appointment
                v-model="userInfo.positions"
                :user-info-data="UserInfoData"
                :row="row"
                @PositionID="positionIds"
              />
            </el-form-item>
            <el-form-item label="备注" style="display:block;margin-left:25px;">
              <el-input
                v-model="userInfo.remarks"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 17}"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="iconFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitUser()">确 定</el-button>
          </div>

        </el-dialog>
      </div>
      <UserDetail :show.sync="show" :row="row" :get-user-detail="getUserDetail" />
      <StaffDetailsAdded v-if="addOrderVisible" ref="StaffDetailsAdded" :visible.sync="addOrderVisible" :row="row" />
    </div>

    <div>
      <StaffAdd ref="StaffAdd" @gohome="gohome" />
      <FilenameOption ref="FilenameOption" @gohome="gohome" />
    </div>
  </div>
</template>

<script>
// import { fetchList } from '@/api/article'
import * as User from '@/api/search'
import StaffAdd from './components/StaffAdd'
import FilenameOption from './components/FilenameOption'
import UserDetail from './staffInformation/userDetail'
import Appointment from './position/positionAppointment'
import depart from './staffInformation/depart'
import StaffDetailsAdded from './staffInformation/StaffDetailsAdded'

export default {
  name: 'MergeHeader',
  components: {
    StaffAdd,
    FilenameOption,
    UserDetail,
    Appointment,
    depart,
    StaffDetailsAdded
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      tab: '',
      isShow: true,
      show: false,
      departmentName: '',
      showDialog: '',
      positionName: '',
      value: '',
      value2: '',
      iconFormVisible: false,
      userInfo: {},
      UserInfoData: {},
      getUserDetail: {},
      row: {},
      dialogTitle: '增加',
      rowIndex: null,
      UserListData: [],
      addOrderVisible: false,
      positions: [],
      AllChannelData: [],
      data: [],
      total: 0,
      searchData: '',
      // 搜索条件
      searchTableInfo: '',
      currentPage1: 1,
      pageSize: 5, // 默认每页显示1条数据
      getSearchInfo: [],
      value3: '',
      statusSelect: [
        {
          status: 0,
          label: '在职'
        }, {
          status: 1,
          label: '转岗'
        }, {
          status: 2,
          label: '离职'
        }, {
          status: 3,
          label: '休假'
        }]
    }
  },
  computed: {
    // 根据计算属性模糊搜索
    tableData() {
      const searchTableInfo = this.searchTableInfo
      if (searchTableInfo) {
        return this.UserListData.filter(data => {
          console.log('success' + data)
          return Object.keys(data).some(key => {
            // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
            // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
            return String(data[key]).toLowerCase().indexOf(searchTableInfo) > -1
          })
        })
      }
      return this.UserListData
    }
  },
  created() {
    this.UserList()
    // /    console.log(this.positionsId, '测试id')
  },
  methods: {
    UserList() {
      User.UserList({
        pageNum: this.currentpage1,
        pageSize: this.pageSize
      })
        .then(res => {
          this.total = res.data.total
          console.log(res, '列表')
          this.detailId = res.data.list.detailId
          this.currentpage1 = res.data.pageNum
          const UserListData = res.data.list || []
          this.UserListData = UserListData.map(item => {
            const positions = []
            item.positions.map(k => {
              positions.push(k.positionName)
            })
            return {
              ...item,
              departmentName: item.department.departmentName,
              positionName: positions.join(' ')
            }
          })
        }).catch(error => {
          console.log(error)
        })
    },
    // 添加用户详情接口请求
    add(refForm, row) {
      // if (this.$refs[refForm]) {
      //   this.$refs[refForm].initForm()
      // }
      this.addOrderVisible = true
      this.row = row
    },
    // 模态框传来的row值
    open(row, getUserDetail) {
      // const that = this
      this.row = row
      this.userId = row.userId
      // console.log(this.row)
      // 120.25.219.238:8888/userDetail/1
      debugger
      this.$http.post('/userDetail/' + this.userId)
        .then(res => {
          const res2 = res && res.data && res.data.data || {}
          this.getUserDetail = res.data.data
          if (!res2.idCard) {
            this.$message.error('修改身份证号码不能为空,请先添加')
            this.show = false
          } else if (res.data.code === 2000) {
            console.log('请求成功')
            this.show = true
          }
        }).catch(error => {
          console.log(error)
        })
    },
    // 修改模态框部门Id
    changeID(val) {
      this.departmentID = val
      console.log(`部门ID: ${val}`)
    },
    // 职位ID
    positionIds(arr) {
      this.optionsId = arr
      console.log(' 职位ID', arr)
    },
    gohome(obj) {
      console.log('lll子组件传过来', obj)
      this.AddpositionId = obj
      this.isShow = true
    },
    // 渠道
    getAllChannel() {
      User.AllChannel()
        .then(res => {
          this.AllChannelData = res.data
        }).catch(error => {
          console.log(error)
        })
    },
    // 编辑
    handleEdit(index, row) {
      this.getAllChannel()
      this.dialogTitle = '编辑'
      this.userInfo = Object.assign({}, row)
      this.UserInfoData = this.userInfo
      console.log(this.UserInfoData, '获取id')

      this.iconFormVisible = true
      this.rowIndex = index
    },
    // 弹窗确定
    submitUser() {
      this.$refs.userInfo.validate((valid) => {
        // this.userInfo = Object.assign({}, this.row)
        // console.log('打印参数33:', this.AddpositionId)
        const studenteList = this.userInfo
        const userInfoform = {
          'user': {
            userId: this.userInfo.userId,
            username: this.userInfo.username,
            password: this.userInfo.password,
            name: this.userInfo.name,
            mobile: this.userInfo.mobile,
            status: this.userInfo.status,
            channelId: this.userInfo.channelId,
            departmentId: this.departmentID,
            remarks: this.userInfo.remarks,
            detailId: this.detailId
          },
          'positions': this.optionsId
        }
        console.log(userInfoform, '修改职员')
        const { username, userId, optionsId } = studenteList
        if (username === '' || userId === '' || optionsId === '') {
          this.$message.error('修改内容不能为空')
        } else if (valid) {
          this.updateLoading = true
          this.$http.put('/user', userInfoform).then(res => {
            // this.$message.success('修改用户资料成功！')
            if (res.data.code === 2000) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.UserList()
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
          }).catch((error) => {
            this.updateLoading = false
            console.log(error)
          })
        } else {
          return false
        }
      })
    },
    // 删除
    remove(index, row) {
      this.$confirm(`确定删除【${row.username}】用户吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // const params = {
        //   id: row.channelId
        // }
        this.$http.delete('/user/' + row.userId).then(result => {
          if (result.data.code === 2000) {
          // 删除成功
            this.positionListData.splice(row.userId, 1)
            // })
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            console.log('删除成功')
            this.UserList()
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
    clickTable(row) {
      this.$refs.table.toggleRowExpansion(row)
    },
    btnClick() {
      const vm = this
      vm.$router.replace({ name: '/StaffAdd', params: { id: 10 }})
    },
    toTab(name, subname) {
      this.$refs[subname].isShow = false
      this.isShow = false
      this.$nextTick(() => {
        this.$refs[name].isShow = true
      })
    },
    // 前端搜索功能需要区分是否检索,因为对应的字段的索引不同
    // 用两个变量接收currentChangePage函数的参数
    doFilter() {
      // debugger
      if (this.tableDataName === '') {
        this.$message.warning('查询条件不能为空！')
        return
      }
      this.tableDataEnd = []
      // 每次手动将数据置空,因为会出现多次点击搜索情况
      this.filterTableDataEnd = []
      this.UserListData.forEach((value, index) => {
        if (value.name) {
          if (value.name.indexOf(this.tableDataName1) >= 0) {
            this.filterTableDataEnd.push(value)
            console.log(value.name)
          }
        }
      })
      // this.flag = true
      return this.filterTableDataEnd
      // eslint-disable-next-line no-unreachable
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pageSize = size
      // this.pageNo = 1
      this.UserList()
      console.log(this.pageSize) // 每页下拉显示数据
    },
    handleCurrentChange: function(val) {
      this.currentpage1 = val
      this.UserList()
      console.log(this.currentpage1) // 点击第几页
    },
    stateFormat(row, column) {
      console.log(row.status)
      // <!-- = status在岗 1=转岗 2=离职 3=休假 -->
      if (row.status === '0') {
        return '在岗'
      } else if (row.status === '1') {
        return '转岗'
      } else if (row.status === '2') {
        return '离职'
      } else if (row.status === '3') {
        return '休假'
      }
    }
  }
}
</script>
<style lang="scss"  scoped>
>>> .el-button--mini {
    padding: 7px 10px;
    font-size: 10px;
    margin-left: -4px;
    border-radius: 3px;
}
.cell button{
  margin-left: 5px;
}
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
  display: table-cell;
}
>>> .el-table thead {
  color: #131314 !important;
}
>>> .el-button--medium {
  margin-top: -23px !important;
  margin-left: 20px !important;
  margin-bottom: 10px;
}
 .el-form--inline >>>.el-form-item {
  // display: block;;
  margin-right: 20px;
}
// >>> .vue-treeselect__menu-container {
//     width: 50%;
// }
>>>.vue-treeselect__control {
    // width: 49%;
}
>>>.vue-treeselect {
    width: 400px;
}
// >>>.staff {
//     width: 40px;
// }
.el-form-item--medium >>>.el-form-item__content {
    line-height: 36px;
    margin-left: 19px;
}
.vue-treeselect__menu-container {
    // width: 48%;
    // height: 20px;
}
>>> .vue-treeselect__menu{
 height: 150px;
 max-height:80px;
}
</style>
