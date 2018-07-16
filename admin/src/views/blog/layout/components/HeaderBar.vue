<template>
  <el-menu class="navbar" mode="horizontal">
    <el-header>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper" style="margin-right: 500px">
            <span>分类目录</span>
            <i class="el-icon-caret-bottom" trigger="click"></i>
          </div>
          <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/test">
            <el-dropdown-item>
              aa
            </el-dropdown-item>
          </router-link>
          </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">LogOut</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>

  </el-menu>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import ElHeader from '../../../../../node_modules/element-ui/packages/header/src/main.vue'
  import ElDropdown from '../../../../../node_modules/element-ui/packages/dropdown/src/dropdown.vue'

export default {
    name: 'headerBar',
    components: {
      ElDropdown,
      ElHeader,
      Breadcrumb,
      Hamburger
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar'
      ]),
      routes() {
        return this.$router.options.routes
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      },
      test() {
        this.$router.push({ path: '/test' })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }
    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
</style>

