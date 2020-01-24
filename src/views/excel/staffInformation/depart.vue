<template>
  <div>
    <!-- <el-form-item label="上级部门" style="width:990px">
    <div id="app"> -->
    <!-- <treeselect v-model="value2" :multiple="true" :options="options2" /> -->
    <div id="app">
      <!-- <treeselect v-model="value2" :multiple="true" :options="options2" /> -->
      <treeselect
        ref="DRHA_EFaultModeTree"
        v-model="userInfo.departmentId"
        :options="options33"
        :disable-branch-nodes="false"
        :show-count="true"
        :flatten-search-results="true"
        search-nested
        placeholder="深圳市中鹏教育科技股份有限公司"
        @input="change"
      />
      <!-- <button @click="change">按钮</button> -->
      <!-- <p>ids:{{ DRHA_EFaultModeTree_value }}</p> -->
    </div>
    <!-- </div>
  </el-form-item> -->

  </div>
</template>

<script>
import * as searchApi from '@/api/search'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'DepartmentSelect',
  components: {
    Treeselect
  },
  props: {
    userInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      DRHA_EFaultModeTree_value: null,
      options33: [],
      childValue: '我是子组件的数据'
    }
  },
  mounted() {
    this.queryCategoryList()
    // console.log(this.userInfo.departmentId, '测试下')
  },
  methods: {
    change() {
      // console.log(this, '895hhhh')
      this.$emit('sonChange', this.userInfo.departmentId)
    },
    // childClick() {
    //   // childByValue是在父组件on监听的方法
    //   // 第二个参数this.childValue是需要传的值
    //   this.$emit('childByValue', this.childValue)
    // },
    // toParent() {
    //   this.$emit('toParent', { 'li': 8 })
    // },
    queryCategoryList() {
      // debugger
      searchApi.DepartmentList()
        .then(res => {
          // console.log('添加成功')
          // console.log(res.data)
          this.optionsList = res.data
          const result = []
          this.categoryTreeData = res.data
          const child = this.getTree(this.categoryTreeData)
          const obj = {}
          obj.label = '作为顶级部门'
          obj.id = 0
          obj.children = child

          result.push(obj)
          this.options33 = result
          // console.log(888)
          // console.log(this.options33)
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
    }
  }
}
</script>

<style lang="scss" scoped>
.vue-treeselect {
    width: 100%;
}
</style>>
