<template>
  <div v-show="isShow" class="staff">
    <div class="title">
      <span class="export">部门添加</span>
      <span class="right">
        <a href="#" @click="goback">部门列表</a> /<span>部门添加</span>
      </span>
      <!-- @click="listPersonal='mergeHeader'" -->
    </div>
    <div class="mainexcle">
      <el-form ref="form" :model="form" label-width="80px" class="form">

        <el-form-item label="上级部门" style="width:990px">
          <div id="app">
            <!-- <treeselect v-model="value2" :multiple="true" :options="options2" /> -->
            <treeselect
              ref="departmentId"
              v-model="departmentId"
              prop="departmentId"
              :options="options33"
              :disable-branch-nodes="false"
              :show-count="true"
              :flatten-search-results="true"
              search-nested
              placeholder="深圳市中鹏教育科技股份有限公司"
            />

            <!-- <p>ids:{{ DRHA_EFaultModeTree_value }}</p> -->
          </div>
        </el-form-item>
        <!-- ,{validator:validatePass,trigger:'blur'} -->
        <el-form-item
          label="部门名称"
          style="width:990px"
          prop="departmentName"
          :rules="[
            { required: true, message: '部门名称不能为空'}
            ,{validator:validateCharacter,trigger:'blur'}]"
        >
          <el-input v-model="form.departmentName" />
        </el-form-item>
      </el-form>

    </div>
    <div class="truebuton2">
      <div class="truebuton">
        <el-button type="primary" @click="gohome(form)">确认提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// AddDepartment
import * as searchApi from '@/api/search'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'FilenameOption',
  components: {
    Treeselect
  },
  props: {
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    departmentName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // props: {
      //   formData: {
      //     type: Object,
      //     default: () => {
      //       return {}
      //     }
      //   },
      //   departmentName: {
      //     type: String,
      //     default: ''
      //   }
      // },
      childrenSay: 'hello parant',
      tab: '',
      isShow: false,
      listPersonal: '',
      select: '',
      deselect: '',
      DRHA_EFaultModeTree_lables: [],
      departmentId: null,
      value: 0,
      options33: [],
      result: [],
      value2: [],
      optionsList: [],
      readonly: true,
      form: {
        departmentId: this.departmentId,
        departmentName: ''
      }
    }
  },
  rules: {
    // departmentName: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  watch: {
  },
  mounted() {
    this.$el.addEventListener('animationend', this.resizeSelect)
    this.queryCategoryList()
  },
  methods: {
    say() {
      // console.log(this.childrenSay)
    },
    queryCategoryList() {
      // debugger
      searchApi.DepartmentList()
        .then(res => {
          // console.log('添加成功')
          // console.log(res.data)
          this.optionsList = res.data
          this.list = this.optionsList.departmentName
          // console.log(this.list)
          const result = []
          this.categoryTreeData = res.data
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
        // console.log(888787)
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
    goback() {
      // eslint-disable-next-line no-sequences
      this.isShow = false,
      this.$emit('gohome', { li: '返回成功' })
    },
    // 转换结构
    toLine(data) {
      return data.reduce((arr, { departmentId, departmentName, child = [] }) =>
    	arr.concat([{ departmentId, departmentName }], this.toLine(child)), [])
      // eslint-disable-next-line no-unreachable
      return result
    },
    // 验证字符串
    // validatePass(rule, value, callback) {
    //   // var that = this
    //   searchApi.CheckAlldepartments()
    //     .then(res => {
    //       console.log(res, '添加部门')
    //       var listarr = this.toLine(res.data)
    //       // console.log(listarr)
    //       var ret2 = listarr.find((v) => {
    //         return v.departmentName === this.form.departmentName
    //       })
    //       if (ret2 === undefined) {
    //         callback()
    //         // console.log('不重名')
    //       } else {
    //         // alert('存在相同的元素')
    //         callback(new Error('名称重复,请重新输入'))
    //       }
    //     })
    // },
    // 特殊字符过滤
    checkSpecificKey(str) {
      var specialKey = "[`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'"
      for (var i = 0; i < str.length; i++) {
        if (specialKey.indexOf(str.substr(i, 1)) != -1) {
          return false
        }
      }
      return true
    },
    // 验证字符串
    validateCharacter(rule, value, callback) {
      if (this.checkSpecificKey(value)) {
        callback()
      } else {
        callback(new Error('请不要输入特殊字符:[`~!#$^&*()=|{}\':;\',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“\'。，、？]‘\''))
      }
    },
    gohome(form) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.isShow = false
          const DeparmentData = {
            departmentId: this.departmentId,
            departmentName: this.form.departmentName
          }
          // this.$qs.stringify(
          this.$http.post('/department', this.$qs.stringify(DeparmentData)).then(result => {
            console.log(result)
            if (result.data.code === 2000) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })

              this.$parent.getDepartmentData()
              this.$emit('gohome', this.form)
              // this.getChannalList()
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

      //     this.$http.post('/department', {
      //       departmentId: this.departmentId,
      //       departmentName: this.form.departmentName
      //     }).then(result => {
      //       console.log(result.data.code)
      //       if (result.data.code === 2000) {
      //         // alert('添加成功')
      //         this.$message({
      //           message: '添加成功',
      //           type: 'success'
      //         })
      //       } else {
      //         this.$message({
      //           message: '添加失败',
      //           type: 'warning'
      //         })
      //         // console.log('error submit!!')
      //         // return false
      //       }
      //       this.isShow = false
      //       this.$emit('gohome', this.form)
      //     }).catch(error => {
      //       console.log(error)
      //     })
      //   }
      // })
    },
    toTab(index) {
      // debugger
      this.tab = index
      this.isShow = !this.isShow
      // console.log(this.tab)
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
  margin-left:40px;
  margin-top:20px;
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
  margin-top:10px;
  margin-bottom:10px;
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
.form{
  margin-left:80px;
}

>>> .el-input {
    // width: 90%;
}
 .select{
  // float:left;
      // margin-left: -80px;
       margin-top: 20px;
}
// >>>.el-form-item--medium .el-form-item__label{
//    margin-left: -80px;
//    margin-top:30px;
// }
.el-select {
    // margin-top: 10px;
    width: 100%;
}
>>>.el-select-dropdown{
      min-width: 515.388px;
}
.el-tree {
    width: 90%;
}
>>>.el-input {
   width: 100%;
}
.el-cascader--medium {
    width: 900px;
}
</style>
