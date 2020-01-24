<template>
  <el-form-item
    label="部门名称"
    style="width:990px"
    prop="departmentName"
    :rules="[
      { required: true, message: '部门名称不能为空'}
      ,{validator:validateCharacter,trigger:'blur'}
      ,{validator:validatePass,trigger:'blur'}]"
  >
    <el-input v-model="form.departmentName" />
  </el-form-item>
</template>

<script>
import * as searchApi from '@/api/search'
export default {
  name: 'DepartmentSelect',
  components: {

  },
  data() {
    return {
      form: {
        named: '',
        departmentName: ''
      }
    }
  },
  mounted() {
    this.queryCategoryList()
  },
  methods: {
     // 验证字符串
    validatePass(rule, value, callback) {
      // var that = this
      searchApi.CheckAlldepartments()
        .then(res => {
          var listarr = this.toLine(res.data)
          // console.log(listarr)
          var ret2 = listarr.find((v) => {
            return v.departmentName === this.form.departmentName
          })
          console.log(ret2)
          // listarr.forEach(element => {
          //   that.name = element.departmentName
          //   console.log(that.name)
          //   console.log(this.form.departmentName === that.name)
          // })
          if (ret2 === undefined) {
            callback()
            // console.log('不重名')
          } else {
            // alert('存在相同的元素')
            callback(new Error('名称重复,请重新输入'))
          }
          // if (that.name) {

          // } else {

          // }
        })
    },
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
    }
  }
}
</script>

<style>

</style>
