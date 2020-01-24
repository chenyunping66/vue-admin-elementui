<template>
  <div class="">
    <div class="main-footer">
      <!-- <hr> -->
      <span class="copydata">Copyright © 2008-2019 深圳市中鹏教育科技股份有限公司 版权所有 All rights reserved.</span>
      <span class="versions">版本 1.0.0</span>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {

    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {}
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.main-footer {
  height: 60px;
  position: fixed;
  float: right;
  z-index: 10;
  right: 0;
  bottom: 0;
  width: 100%;
  background: white;
color: #525759;
  margin: 0; /*很重要*/
  border-top: 1px solid rgb(184, 179, 179);
}
.main-footer span{
  margin-left: 15%;
  line-height: 60px;
}
.versions{
  float: right;
  margin-right: 10px;
}
</style>
