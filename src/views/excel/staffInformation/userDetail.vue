<template>
  <div>
    <el-dialog
      title="编辑职员资料"
      :visible.sync="visible"
      width="50%"
      :show="show"
      @close="$emit('update:show', false)"
    >
      <el-form ref="Datailform" :inline="true" :model="getUserDetail" label-width="80px" class="form">
        <!-- {{row.positionName}} -->
        <el-form-item label="身份证号">
          <el-input v-model="getUserDetail.idCard" placeholder style="width:88%" />
        </el-form-item>
        <el-form-item label="身份证出生日期">
          <el-date-picker
            v-model="getUserDetail.cardBirthday"
            value-format=" yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            style="width:72%"
          />
        </el-form-item>
        <el-form-item label="身份证地址">
          <el-input v-model="getUserDetail.cardAddress" placeholder style="width:88%" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="getUserDetail.sex" placeholder="请选择" style="width:78%">
            <el-option
              v-for="item in sexSelect"
              :key="item.sex"
              :label="item.label"
              :value="item.sex"
              style=" min-width: 150.388px !important"
            />
          </el-select>
          <!-- <template>
            <span v-if="Datailform.sexValue == 1">男性</span>
            <span v-if="Datailform.sexValue == 2">女性</span>
          </template> -->
        </el-form-item>
        <el-form-item label="籍贯">
          <el-input v-model="getUserDetail.nativePlace" placeholder style="width:88%" />
        </el-form-item>
        <el-form-item label="婚否">
          <el-select v-model="getUserDetail.marriage" placeholder="请选择" style="width:78%">
            <el-option
              v-for="item in marriageSelect"
              :key="item.marriage"
              :label="item.label"
              :value="item.marriage"
              style=" min-width:150.388px !important;"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="实际生日">
          <el-date-picker
            v-model="getUserDetail.birthday"
            value-format=" yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            style="width:78%"
          />
        </el-form-item>
        <el-form-item label="身高" style="margin-left: -31px;">
          <el-input v-model="getUserDetail.height" placeholder style="width:88%" />
        </el-form-item>
        <el-form-item label="血型">
          <el-input v-model="getUserDetail.bloodGroup" placeholder style="width:88%" />
        </el-form-item>
        <el-form-item label="政治面貌">
          <el-input v-model="getUserDetail.political" placeholder style="width:90%" />
        </el-form-item>
        <el-form-item label="紧急联系人">
          <el-input v-model="getUserDetail.contact" placeholder style="width:90%" />
        </el-form-item>
        <el-form-item label="紧急联系人电话">
          <el-input v-model="getUserDetail.contactPhone" placeholder style="width:88%" />
        </el-form-item>
        <el-form-item label="紧急联系地址">
          <el-input v-model="getUserDetail.contactAddress" placeholder style="width:88%" />
        </el-form-item>
        <el-form-item label="学历">
          <el-select v-model="getUserDetail.education" placeholder="请选择" style="width:78%">
            <el-option
              v-for="item in educationSelect"
              :key="item.education"
              :label="item.label"
              :value="item.education"
              style=" min-width: 150.388px !important"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="毕业院校">
          <el-input v-model="getUserDetail.school" placeholder style="width:88%" />
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="getUserDetail.major" placeholder style="width:88%" />
        </el-form-item>
        <el-form-item label="毕业时间">
          <!-- <el-input v-model="row.positionName" placeholder style="width:88%" /> -->
          <el-date-picker
            v-model="getUserDetail.graduationTime"
            value-format=" yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            style="width:78%"
          />
        </el-form-item>
        <el-form-item label="入职时间" style="margin-left: -31px;">
          <!-- <el-input v-model="row.positionName" placeholder style="width:88%" /> -->
          <el-date-picker
            v-model="getUserDetail.entryTime"
            value-format=" yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            style="width:78%"
          />
        </el-form-item>
        <el-form-item label="转正时间">
          <!-- <el-input v-model="row.positionName" placeholder style="width:88%" /> -->
          <el-date-picker
            v-model="getUserDetail.positiveTime"
            value-format=" yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            style="width:78%"
          />
        </el-form-item>
        <el-form-item label="离职时间" style="margin-left: -31px;">
          <!-- <el-input v-model="row.positionName" placeholder style="width:88%" /> -->
          <el-date-picker
            v-model="getUserDetail.quitTime"
            value-format=" yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            style="width:78%"
          />
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
export default {
  name: 'ChannelDialog',
  components: {

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
    },
    getUserDetail: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      channelId: '',
      AllChannelData: [],
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      visible: this.show,
      updateLoading: false,
      iconFormVisible: false,
      sexValue: '',
      id_card: '',
      marriageVlaue: '',
      educationValue: '',
      setMinWidthEmpty: '',
      Datailform: {
        named: '',
        departmentName: ''
      },
      sexSelect: [{
        sex: 1,
        label: '男'
      }, {
        sex: 2,
        label: '女'
      }],
      marriageSelect: [{
        marriage: 1,
        label: '否'
      }, {
        marriage: 2,
        label: '是'
      }],
      educationSelect: [{
        education: 1,
        label: '小学和初中'
      }, {
        education: 2,
        label: '高中和中专'
      }, {
        education: 3,
        label: '大专'
      }, {
        education: 4,
        label: '本科'
      }, {
        education: 5,
        label: '硕士'
      }, {
        education: 6,
        label: '博士'
      }, {
        education: 7,
        label: '博士后'
      }]
    }
  },
  watch: {
    show() {
      this.visible = this.show
    }
  },
  mounted() {
    this.getAllChannel()
    // console.log(this.row, '++++++++++++++')
  },
  methods: {
    // seltctGet(vId) {
    //   let obj = {}
    //   obj = this.selectList.find((item) => {
    //     return item.sex === vId
    //   })
    //   console.log(obj.sex, '性别')
    //   console.log(obj.label, '性别label')
    // },
    // 渠道
    getAllChannel() {
      searchApi.AllChannel()
        .then(res => {
          this.AllChannelData = res.data
        }).catch(error => {
          console.log(error)
        })
    },
    // getUserDetail() {
    //   this.update = Object.assign({}, this.row)
    //   this.$http.post('/userDetail/', this.update.userId).then(res => {
    //     console.log(res, '999获取用户详情')
    //   }).catch(error => {
    //     console.log(error)
    //   })
    // },
    // 修改
    submitUser() {
      // this.$refs.update.validate((valid) => {
      // this.update = Object.assign({}, this.row) // 获得所有数据显示在编辑信息模态框里面
      this.update = Object.assign({}, this.getUserDetail) // 获得所有数据显示在编辑信息模态框里面
      const studenteList = this.update
      this.$delete(this.update, 'createdAt')
      this.$delete(this.update, 'updatedAt')

      console.log(this.update, '删除')
      const { idCard } = studenteList
      if (idCard === '') {
        this.$message.error('修改身份证号码不能为空')
      } else {
        this.updateLoading = true
        // ChannelEdit(this.$qs.stringify(this.currentId, this.update)).then(res => {
        this.$http.put('/userDetail', this.$qs.stringify(this.update)).then(res => {
          // this.$message.success('修改用户资料成功！')
          if (res.data.code === 2000) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            // this.ChannelList()
            this.$emit('update:show', false)
            this.updateLoading = false
          } else {
            // 失败了
            // alert('添加失败！')
            this.$message({
              message: '添加失败！',
              type: 'warning'
            })
            this.$emit('update:show', false)
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
      }
      // else {
      //   return false
      // }
      // })
    }
  }
}
</script>
<style lang="scss" scoped>
#app {
    width: 80%;
}
.form{
//  display: inline-block
}
>>> .el-form--inline .el-form-item {
    margin-right: 0px;
}
>>> .from  .el-form-item .el-form-item--medium{
  display:inline-block
}
>>> .el-form-item--medium .el-form-item__label {
    line-height: 36px;
    width:140px !important;
}
>>> .el-form--inline .el-form-item {
  // display: block;
}
>>> .el-form--inline .el-form-item {
  // display: block;
}
.el-form--inline .el-form-item {
    display: inline-block;
}
.el-form-item__content{
  width: 70%;
}
>>>.el-scrollbar .el-scrollbar__wrap {
    width: 162px;
}
>>> .el-scrollbar {
    width: 155px;
}
.el-select-dropdown__list {
    width: 100px;
}
</style>
