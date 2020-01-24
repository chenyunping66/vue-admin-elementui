<template>
  <div v-show="isShow" class="staff">
    <div class="title">
      <span class="export">职员导入</span>
      <span class="right">
        <a href="#" @click="goback">职员列表</a> /<a href="#">职员导入</a>
      </span>
      <!-- @click="listPersonal='mergeHeader'" -->
    </div>
    <div class="mainexcle">
      <h4 class="importfile">导入文件</h4>
      <!-- <input type="file"/> -->
      <div class="down">
        <input id="file" type="file" value="" @change="uploadConfig">
        <!-- <el-button type="primary">上传<i class="el-icon-download el-icon--right" /></el-button> -->
        <a id="hf" href="#" download @click="downfile">导入模板下载</a>
      </div>
    </div>
    <div class="truebuton2">
      <div class="truebuton">
        <el-button type="primary" @click="gohome">确认按钮</el-button>
      </div>
    </div>
    <!-- <component :is="listPersonal" /> -->
    <!-- <div>
      <keep-alive>
        <mergeHeader v-if="tab===1" />
        <!-- <FilenameOption v-if="tab===2" /> -->
    <!-- </keep-alive>
    </div> -->
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
// import mergeHeader from './FilenameOption'
// import btn from './butn'
export default {
  name: 'StaffAdd',
  components: {

  },
  data() {
    return {
      tab: '',
      isShow: false,
      listPersonal: ''
      // isShow: true
    }
  },
  mounted() {
    // $.ajax({
    //   url: '/user/readExcel',
    //   type: 'POST',
    //   cache: false,
    //   data: new FormData($('#uploadForm')[0]),
    //   processData: false,
    //   contentType: false
    // }).done(function(res) {
    // }).fail(function(res) {})
  },
  // eslint-disable-next-line no-dupe-keys
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    uploadConfig(e) {
      e.preventDefault()// 取消默认行为
      const vm = this
      this.file = e.target.files[0]
      const formData = new FormData()
      formData.append('file', this.file)
      // 向 formData 对象中添加文件
      console.log(this.file, '888')
      vm.$http({
        url: '/user/readExcel',
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
        processData: false,
        contentType: false
      }).then((res) => {
        console.log('upload_success:', res)
      }).catch((error) => {
        console.log(error)
      })
    },
    goback() {
      // eslint-disable-next-line no-sequences
      this.isShow = false,
      this.$emit('gohome', { li: '返回成功' })
    },
    gohome() {
      this.isShow = false
      this.$emit('gohome', { a: 1 })
      // this.$router.push({ name: 'Login' })
    },
    toTab(index) {
      debugger
      this.tab = index
      this.isShow = !this.isShow
      console.log(this.tab)
    },
    // 下载文件
    downfile(urls) {
      urls = location.origin + '/static/userImport.xlsx'
      var elemIF = document.createElement('iframe')
      elemIF.src = urls
      elemIF.style.display = 'none'
      document.body.appendChild(elemIF)
    }
  }
}
</script>
<style lang="scss" scoped>
.staff {
  width: 98%;
  border: 1px solid #b6e0d8;
  // height: 160px;
  border-radius: 5px;
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
  height: 70px;
  margin-top: 20px;
  border-bottom: 1px solid #e3e1e1;
}
.importfile {
  width: 30%;
  height: 50px;
  // border: 1px solid red;
  float: left;
  padding-left: 23%;
  margin-top: 10px;
}
.down {
  width: 50%;
  display: grid;
}
.upload-demo {
  display: contents;
}
.truebuton {
  float: right;
  height:60px;
  line-height: 60px;
  margin-right: 10px;
  // border: 1px solid red;
}
.truebuton2:after {
  content: "."; /*生成内容作为最后一个元素，至于content里面是什么没有影响*/

  display: block; /*使生成的元素以块级元素显示，占满剩余空间*/

  height: 0; /*避免生成的内容破坏原有空间的高度*/

  clear: both; /*闭合浮动*/

  visibility: hidden; /*使生成内容不可见，并允许可能生成内容盖住的内容进行点击和交互*/
}

.truebuton2 {
  zoom: 1; /*触发IE6/7的haslayout*/
}
</style>
