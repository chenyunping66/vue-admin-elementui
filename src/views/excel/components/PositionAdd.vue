<template>
  <div v-show="isShow" class="staff">
    <div class="title">
      <span class="export">职位添加</span>
      <span class="right">
        <a href="#" @click="goback">职业列表</a> /
        <a href="#">职位添加</a>
      </span>
      <!-- @click="listPersonal='mergeHeader'" -->
    </div>
    <div class="mainexcle">
      <el-form ref="form" :model="form" label-width="80px" class="form">
        <el-form-item label="归属部门" style="width:990px">
          <div id="app">
            <treeselect
              ref="DRHA_EFaultModeTree"
              v-model="DRHA_EFaultModeTree_value"
              :options="options33"
              :disable-branch-nodes="false"
              :show-count="true"
              :flatten-search-results="true"
              search-nested
              placeholder="深圳市中鹏教育科技股份有限公司"
            />
            <!-- <DepartmentSelect /> -->
          </div>
        </el-form-item>
        <el-form-item label="职位名称" style="width:990px">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-form>
    </div>
    <div class="truebuton2">
      <div class="truebuton">
        <el-button type="primary" @click="gohome">确认提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import DepartmentSelect from '@/views/common/DepartmentSelect'
import * as searchApi from '@/api/search'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('positionList')
export default {
  name: 'PositionAdd',
  components: {
    Treeselect,
    DepartmentSelect
  },
  data() {
    return {
      tab: '',
      isShow: false,
      listPersonal: '',
      value: '',
      readonly: true,
      DRHA_EFaultModeTree_value: null,
      options33: [],
      form: {
        name: '',
        region: '',
        user: ''
      }
    }
  },
  computed: {
    ...mapState(['AddDepartmentData'])
  },
  mounted() {
    this.$el.addEventListener('animationend', this.resizeSelect)
    this.queryCategoryList()
    console.log(this.$parent, '999父亲')
    // this.getAllList = this.$parent.getAllList
    // console.log(this.getAllList, '霓虹')
    // this.getPositionList()
  },
  // eslint-disable-next-line no-dupe-keys
  methods: {
    ...mapActions(['getPositionList']),
    goback() {
      // eslint-disable-next-line no-sequences
      this.isShow = false,
      this.$emit('gohome', { li: '返回成功' })
    },
    gohome() {
      // this.isShow = false
      // this.$emit('gohome', { a: 1 })
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form = {
            departmentId: this.DRHA_EFaultModeTree_value,
            positionName: this.form.name
          }
          this.isShow = false

          this.$http.post('/position', this.$qs.stringify(this.form)).then(result => {
            console.log(result)
            if (result.data.code === 2000) {
              // 成功了！
              // 添加完成后，只需要手动，再调用一下 getAllList 就能刷新品牌列表了
              // this.getAllList()
              // 清空 name
              // this.name = ''
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              // this.getPositionList()
              this.$parent.getAllList()
              // console.log(this.getPositionList())
              this.$emit('gohome', this.form)
            } else {
              // 失败了
              // alert('添加失败！')
              this.$message({
                message: '添加失败！',
                type: 'warning'
              })
              // this.$message('添加失败！')
            }
            this.$emit('gohome', this.form)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    toTab(index) {
      debugger
      this.tab = index
      this.isShow = !this.isShow
      console.log(this.tab)
    },
    setMinWidthEmpty(val) {
    // 无数据的情况下，给请选择提示设置最小宽度
      const domEmpty = document.getElementsByClassName('el-select-dropdown__empty')
      if (domEmpty.length > 0) {
        domEmpty[0].style['min-width'] = val.srcElement.clientWidth + 2 + 'px'
      }
    },
    resizeSelect() {
      // this.$refs.selectInput.resetInputWidth()
    },
    queryCategoryList() {
      // debugger
      searchApi.DepartmentList({
        parentId: 0,
        all: 1
      })
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
          console.log(error)
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
          if (item.children != null) {
            // console.log(item.child)
            obj.children = this.getTree(item.children)
            // console.log(obj.children)
          }

          arr.push(obj)
          // console.log(arr)
        })
      }
      return arr
    }

  }
}
</script>
<style lang="scss" scoped>
.staff {
  width: 95%;
  border: 1px solid #b6e0d8;
  // height: 160px;
  border-radius: 5px;
  margin-left: 40px;
  margin-top: 20px;
}
.title {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #e3e1e1;
}
.export {
  font-size: 20px;
  margin-left: 5px;
}

.right {
  float: right;
  font-size: 14px;
  color: darkgray;
  margin-right: 10px;
}
#hf {
  color: rgb(66, 184, 231);
  font-size: 14px;
}
.mainexcle {
  width: 100%;
  // height: 70px;
  margin-top: 20px;
  border-bottom: 1px solid #e3e1e1;
}

.truebuton {
  float: right;
  // height:60px;
  line-height: 60px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  // border: 1px solid red;
}
.truebuton2:after {
  content: "."; /*生成内容作为最后一个元素，至于content里面是什么没有影响*/
  display: block; /*使生成的元素以块级元素显示，占满剩余空间*/
  height: 0; /*避免生成的内容破坏原有空间的高度*/
  clear: both; /*闭合浮动*/
}

.truebuton2 {
  zoom: 1; /*触发IE6/7的haslayout*/
}
.form {
  margin-left: 80px;
}

>>> .el-input {
  // width: 90%;
}
.select {
  // float:left;
  // margin-left: -80px;
  margin-top: 20px;
}
.el-select {
  // margin-top: 10px;
  width: 100%;
}
>>> .el-select-dropdown {
  min-width: 515.388px;
}
.el-tree {
  width: 90%;
}
>>> .el-input {
  width: 100%;
}
</style>
