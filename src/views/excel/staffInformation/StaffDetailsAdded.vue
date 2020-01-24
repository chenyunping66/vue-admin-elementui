<template>
  <div>
    <el-dialog
      title="添加用户详情"
      :visible.sync="visible"
      :show-close="false"
      width="50%"
    >
      <el-form ref="Datailform" :inline="true" :model="Datailform" label-width="80px" class="form">
        <!-- {{row.positionName}} -->
        <el-form-item label="身份证号">
          <el-input v-model="Datailform.idCard" placeholder style="width:88%" />
        </el-form-item>
        <el-form-item label="身份出生日期">
          <el-date-picker
            v-model="Datailform.cardBirthday"
            value-format=" yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            style="width:72%"
          />
        </el-form-item>
        <el-form-item label="身份证地址">
          <el-input v-model="Datailform.cardAddress" placeholder style="width:88%" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="Datailform.sex" placeholder="请选择" style="width:78%">
            <el-option
              v-for="item in sexSelect"
              :key="item.sex"
              :label="item.label"
              :value="item.sex"
              style=" min-width: 150.388px !important"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="籍贯">
          <el-input v-model="Datailform.nativePlace" placeholder style="width:88%" />
        </el-form-item>
        <el-form-item label="婚否">
          <el-select v-model="Datailform.marriage" placeholder="请选择" style="width:78%">
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
            v-model="Datailform.birthday"
            value-format=" yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            style="width:78%"
          />
        </el-form-item>
        <el-form-item label="身高" style="margin-left: -31px;">
          <el-input v-model="Datailform.height" placeholder style="width:88%" />
        </el-form-item>
        <el-form-item label="血型">
          <el-input v-model="Datailform.bloodGroup" placeholder style="width:88%" />
        </el-form-item>
        <el-form-item label="政治面貌">
          <el-input v-model="Datailform.political" placeholder style="width:90%" />
        </el-form-item>
        <el-form-item label="紧急联系人">
          <el-input v-model="Datailform.contact" placeholder style="width:90%" />
        </el-form-item>
        <el-form-item label="紧急联系人电话">
          <el-input v-model="Datailform.contactPhone" placeholder style="width:88%" />
        </el-form-item>
        <el-form-item label="紧急联系地址">
          <el-input v-model="Datailform.contactAddress" placeholder style="width:88%" />
        </el-form-item>
        <el-form-item label="学历">
          <el-select v-model="Datailform.education" placeholder="请选择" style="width:78%">
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
          <el-input v-model="Datailform.school" placeholder style="width:88%" />
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="Datailform.major" placeholder style="width:88%" />
        </el-form-item>
        <el-form-item label="毕业时间">
          <!-- <el-input v-model="row.positionName" placeholder style="width:88%" /> -->
          <el-date-picker
            v-model="Datailform.graduationTime"
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
            v-model="Datailform.entryTime"
            value-format=" yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            style="width:78%"
            @change="dateChangebirthday1"
          />
        </el-form-item>
        <el-form-item label="转正时间">
          <!-- <el-input v-model="row.positionName" placeholder style="width:88%" /> -->
          <el-date-picker
            v-model="Datailform.positiveTime"
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
            v-model="Datailform.quitTime"
            value-format=" yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            style="width:78%"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.stop="cancelModal">取 消</el-button>
        <el-button type="primary" :loading="updateLoading" @click="StaffDetailTrue">确 定</el-button>
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
    // show: {
    //   type: Boolean,
    //   default: false
    // },
    row: {
      type: Object,
      default() {
        return {}
      }
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      channelId: '',
      AllChannelData: [],
      // cardBirthday: '',
      Datailform: {
        cardAddress: ''
      },
      birthday: '',
      entryTime: '',
      graduationTime: '',
      positiveTime: '',
      updateLoading: false,
      iconFormVisible: false,
      // sexValue: '',
      marriageVlaue: '',
      educationValue: '',
      setMinWidthEmpty: '',
      sexSelect: [{
        sex: '1',
        label: '男'
      }, {
        sex: '2',
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
        education: '1',
        label: '小学和初中'
      }, {
        education: '2',
        label: '高中和中专'
      }, {
        education: '3',
        label: '大专'
      }, {
        education: '4',
        label: '本科'
      }, {
        education: '5',
        label: '硕士'
      }, {
        education: '6',
        label: '博士'
      }, {
        education: '7',
        label: '博士后'
      }]
    }
  },
  watch: {
    // vshow() {
    //   this.visible = this.show
    // }
  },
  mounted() {
    console.log(this.row, '父组件传来的++++++++++++++')
    console.log(this.$parent, '父亲')
  },
  methods: {
    cancelModal() {
      // 关闭弹窗，触发父组件修改visible值
      this.$emit('update:visible', false)
    },
    // 获取时间
    dateChangebirthday1(val) {
      this.startTime = val
      // console.log(this.startTime, '------------')
    },
    // 添加用户详情
    StaffDetailTrue() {
      const listData = {
        userId: this.row.userId
      }
      const testData = Object.assign(listData, this.Datailform)
      console.log(testData, '合并')

      const studenteList = this.Datailform
      // this.update = Object.assign({}, this.row) // 获得所有数据显示在编辑信息模态框里面
      const { username, idCard } = studenteList
      if (username === ''&& idCard === '') {
        this.$message.error('添加内容不能为空')
      } else {
        this.updateLoading = true
        // ChannelEdit(this.$qs.stringify(this.currentId, this.update)).then(res => {
        this.$http.post('/userDetail', this.$qs.stringify(testData)).then(res => {
          // this.$message.success('修改用户资料成功！')
          console.log(res, '----29383877')

          if (res.data.code === 2000) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            // this.ChannelList()
            this.$emit('update:visible', false)
            this.updateLoading = false
          } else {
            // 失败了
            // alert('添加失败！')
            this.$message({
              message: '添加失败！',
              type: 'warning'
            })
            this.$emit('update:visible', false)
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
