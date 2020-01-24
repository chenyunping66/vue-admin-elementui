<template>
  <div class="navbar">

    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <!-- <Search2 id="search"></Search2> -->

    <div class="right-menu">

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <!-- <div class="avatar-wrapper">
          <i class="el-icon-bell" />

          <i class="el-icon-user"></i>
         <i class="el-icon-s-home"></i>
         <i class="el-icon-share"></i>
        </div> -->

        <div class="avatar-wrapper">
          <i class="el-icon-bell" />
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <!-- <i class="el-icon-caret-bottom" /> -->
          <!-- <i class="el-icon-edit" /> -->
          <span class="mine" @click="jampmin">{{ username }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <router-link to="/profile/index">
            <el-dropdown-item>Profile</el-dropdown-item>
          </router-link> -->
          <!-- <router-link to="/">
            <el-dropdown-item>Dashboard</el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a> -->
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import Search2 from './TagsView/search'
import { getCookie, clearCookie } from './cookie'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search,
    // eslint-disable-next-line vue/no-unused-components
    Search2
  },
  data() {
    return {
      username: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  mounted() {
    var info = getCookie()
    this.username = info.username
    this.remeberFlag = info.remeberFlag
    // console.log(this.username)
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      // console.log(this)
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    // 读取cookie
    // getCookie() {
    //   debugger
    //   // var _this =this
    //   // console.log(this)
    //   if (document.cookie.length > 0) {
    //     // console.log(this.ruleForm)
    //     var arr = document.cookie.split('; ') // 这里显示的格式需要切割一下自己可输出看下
    //     // console.log(arr)
    //     for (var i = 0; i < arr.length; i++) {
    //       var arr2 = arr[i].split('=') // 再次切割
    //       // console.log(arr2)

    //       // 判断查找相对应的值
    //       if (arr2[0] === 'username') {
    //         this.loginForm.username = arr2[1] // 保存到保存数据的地方
    //       } else if (arr2[0] === 'password') {
    //         this.loginForm.password = arr2[1]
    //       }
    //       // console.log(this.loginForm.username)
    //     }
    //   }
    // },
    jampmin() {
      // 获取cookie值
      // debugger
      // this.username = getCookie('username')
      // // console.log(this.username)
      // if (this.username === '' || this.username === 'undefind') {
      //   this.$router.push({
      //     path: '/login'
      //   })
      // } else {
      //   this.$router.push({
      //     // path: '/dashboard'
      //   })
      // }
      if (this.username === '' || this.username === 'undefind') {
        this.$router.push({
          path: '/login'
        })
        // console.log(this.remeberFlag)
        // if (this.remeberFlag === 'false') {
        //   console.log('清空Cookie')
        //   clearCookie()
        // }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
        .search{
          background: red;
          position: absolute;
        }
      }
    }
  }
}
</style>
