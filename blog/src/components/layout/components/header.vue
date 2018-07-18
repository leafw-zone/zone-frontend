<template>
    <el-header style="margin-top: 3%;">
      <el-dropdown >
        <!--<a href="" style="font-size: 200%;color: #808080;margin-left: -30px">leafw</a>-->
          <span style="font-size: 120%;margin-left: 500px">categories</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>编程</el-dropdown-item>
            <el-dropdown-item>随笔</el-dropdown-item>
          </el-dropdown-menu>
        &nbsp;&nbsp;&nbsp;
        <span style="font-size: 120%">tags</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>Java</el-dropdown-item>
          <el-dropdown-item>Python</el-dropdown-item>
        </el-dropdown-menu>
        &nbsp;&nbsp;&nbsp;
        <span style="font-size: 120%">about</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>Java</el-dropdown-item>
          <el-dropdown-item>Python</el-dropdown-item>
        </el-dropdown-menu>
        &nbsp;&nbsp;&nbsp;
        <a @click="goBackend" style="font-size: 120%">backend</a>
        &nbsp;&nbsp;&nbsp;
        <a @click="goPage1" style="font-size: 120%">page</a>
        &nbsp;&nbsp;&nbsp;
        <a @click="goHome" style="font-size: 120%">goHome</a>
      </el-dropdown>
    </el-header>
</template>

<script>
  import ElSubmenu from '../../../../node_modules/element-ui/packages/menu/src/submenu.vue'
  import ElMenu from '../../../../node_modules/element-ui/packages/menu/src/menu.vue'
  import ElDropdown from '../../../../node_modules/element-ui/packages/dropdown/src/dropdown.vue'
  import ElDropdownMenu from '../../../../node_modules/element-ui/packages/dropdown/src/dropdown-menu.vue'
  import ElDropdownItem from '../../../../node_modules/element-ui/packages/dropdown/src/dropdown-item.vue'

  export default {
    components: {
      ElDropdownItem,
      ElDropdownMenu,
      ElDropdown,
      ElMenu,
      ElSubmenu
    },
    name: 'headerBar',
    methods: {
      goPage1() {
        this.$router.push('/page1')
      },
      goHome() {
        this.$router.push('/home')
      },
      goBackend() {
        window.location = 'http://localhost:9528/#/'
      }
    }
  }

</script>

<style>
  a {
    font-weight: 400
  }
</style>
