<template>
  <div v-show="isShow" class="staff">
    <div class="title">
      <span class="export">编辑渠道</span>
      <span class="right">
        <span @click="goback">渠道列表</span> /<a href="#">编辑渠道</a>
      </span>
      <!-- @click="listPersonal='mergeHeader'" -->
    </div>
    <div class="mainexcle">
      <el-form ref="form" :model="form" label-width="80px" class="form">
        <el-form-item
          label="渠道名称"
          style="width:990px"
          prop="name"
          :rules="[
            { required: true, message: '渠道名称不能为空'}
          ]"
        >
          <el-input v-model="form.name" />
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
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('channelList')
export default {
  name: 'ChannelEditing',
  components: {

  },
  data() {
    return {
      tab: '',
      isShow: false,
      listPersonal: '',
      value: '',
      readonly: true,
      // props: {
      //   ChannelList: {
      //     type: Object
      //   }
      // },
      props: [this.ChannelList],
      form: {
        name: '',
        region: '',
        user: ''
      }
    }
  },
  mounted() {
    this.$el.addEventListener('animationend', this.resizeSelect)
  },
  methods: {

  },
  // eslint-disable-next-line no-dupe-keys
  methods: {
    ...mapActions([
      'ChannelList' // 触发actions里的 getInfo 函数，调动接口
    ]),
    // gohome() {
    //   this.isShow = false;
    //   this.$emit('gohome',{a:1})
    //   // this.$router.push({ name: 'Login' })
    // },
    // toTab(index) {
    //   debugger
    //   this.tab = index
    //   this.isShow = !this.isShow
    //   console.log(this.tab)
    // },
    goback() {
      this.isShow = false
      this.$emit('gohome', '跳转成功')
    },
    gohome() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form = {
            channelName: this.form.name
          }
          this.isShow = false

          this.$http.put('/channel', this.$qs.stringify(this.form)).then(result => {
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
              // console.log(this.ChannelList())
              // this.ChannelList()
              this.ChannelList()
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
      this.tab = index
      this.isShow = !this.isShow
    },
    setMinWidthEmpty(val) {
    // 无数据的情况下，给请选择提示设置最小宽度
      const domEmpty = document.getElementsByClassName('el-select-dropdown__empty')
      if (domEmpty.length > 0) {
        domEmpty[0].style['min-width'] = val.srcElement.clientWidth + 2 + 'px'
      }
    },
    resizeSelect() {
      this.$refs.selectInput.resetInputWidth()
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
</style>
