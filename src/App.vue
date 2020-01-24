<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Dashboard from '../src/views/dashboard/index'
export default {
  name: 'App',
  components: {
    Dashboard }
}
</script>
<style  lang="scss" scoped>

>>> .svg-icon {
  width: 2em !important;
  height: 1.6em !important;
  // margin-right: -20px;
}
</style>
