<template>
  <div>
    <el-dialog
      title="修改"
      :visible.sync="visible"
      :show="show"
      @close="$emit('update:show', false)"
    >
      <el-form ref="form" :model="form" label-width="80px" class="form">
        <!-- {{row.positionName}} -->
        <el-form-item label="归属部门" style="width:990px">
          <div id="app">
            <!-- <treeselect v-model="value2" :multiple="true" :options="options2" /> -->
            <treeselect
              ref="DRHA_EFaultModeTree"
              v-model="row.departmentId"
              :options="options33"
              :disable-branch-nodes="true"
              :show-count="true"
              :flatten-search-results="true"
              search-nested
              placeholder="深圳市中鹏教育科技股份有限公司"
            />

            <!-- <p>ids:{{ row.departmentId }}</p> -->
          </div>
        </el-form-item>

        <el-form-item label="职位名称">
          <el-input v-model="row.positionName" placeholder style="width:88%" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:show', false)">取 消</el-button>
        <el-button type="primary" :loading="updateLoading" @click="submitUser">确 定</el-button>
        <!-- @click="submitUser()" -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as searchApi from '@/api/search'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'ChannelDialog',
  components: {
    Treeselect
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      visible: this.show,
      DRHA_EFaultModeTree_lables: [],
      DRHA_EFaultModeTree_value: null,
      value: 0,
      options33: [],
      // update: {
      //   channelName: '',
      //   currentId: ''
      // },
      updateLoading: false,
      iconFormVisible: false,
      form: {
        named: '',
        departmentName: ''
      }
    }
  },
  watch: {
    show() {
      this.visible = this.show
    }
  },
  mounted() {
    this.queryCategoryList()
    console.log(this.row, '++++++++++++++')
  },
  methods: {
    queryCategoryList() {
      // debugger
      searchApi.DepartmentList()
        .then(res => {
          // console.log('添加成功')
          // console.log(res.data)
          this.optionsList = res.data
          this.dataList = JSON.stringify(this.optionsList)
          this.list = this.optionsList.departmentName
          // console.log(this.list)
          const result = []
          // const children = this.categoryTreeData(res.data)

          //     console.log(res)
          this.categoryTreeData = res.data
          // console.log(res.data)

          const child = this.getTree(this.categoryTreeData)
          // console.log(res.data)
          // console.log(children)
          const obj = {}
          obj.label = '作为顶级部门'
          obj.id = 0
          obj.children = child

          result.push(obj)
          this.options33 = result
          // console.log(888)
          // console.log(result)
        }).catch(error => {
          console.log(error, '!!!!!')
        })
    },
    getTree(tree = []) {
      const arr = []
      if (tree.length !== 0) {
        // console.log(tree)
        // const item = item.child
        tree.forEach(item => {
          const obj = {}
          obj.label = item.departmentName
          obj.id = item.departmentId
          // eslint-disable-next-line no-irregular-whitespace
          if (item.children != null) {
            // console.log(item.child)
            obj.children = this.getTree(item.children)
            // console.log(obj.children)
          }

          arr.push(obj)
          // console.log(arr)
        })
      }
      return arr
    },
    // 修改
    submitUser() {
      // this.$refs.update.validate((valid) => {
      const studenteList = this
      this.update = Object.assign({}, this.row) // 获得所有数据显示在编辑信息模态框里面
      console.log(this.update, '----29383877')
      const { channelName, channelId } = studenteList
      if (channelName === '' || channelId === '') {
        this.$message.error('修改内容不能为空')
      } else {
        this.updateLoading = true
        // ChannelEdit(this.$qs.stringify(this.currentId, this.update)).then(res => {
        this.$http.put('/position', this.$qs.stringify(this.update)).then(res => {
          // this.$message.success('修改用户资料成功！')
          if (res.data.code === 2000) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            // this.ChannelList()
            this.$emit('update:show', false)
            this.updateLoading = false
          }
          // else {
          //   // 失败了
          //   // alert('添加失败！')
          //   this.$message({
          //     message: '添加失败！',
          //     type: 'warning'
          //   })
          //   this.iconFormVisible = false
          // }
        }).catch((res) => {
          var data = res
          if (data instanceof Array) {
            this.$message.error(data[0]['message'])
          } else if (data instanceof Object) {
            this.$message.error(data['message'])
          }
          this.updateLoading = false
        })
      }
      // else {
      //   return false
      // }
      // })
    }
  }
}
</script>
<style scoped>
#app {
    width: 80%;
}
</style>
