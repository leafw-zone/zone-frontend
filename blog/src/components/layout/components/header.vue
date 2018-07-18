<template>
    <el-header style="margin-top: 3%;">
      <el-dropdown style="margin-left: 15%;">
        <!--<a href="" style="font-size: 200%;color: #808080;margin-left: -30px">leafw</a>-->
          <span style="font-size: 120%;margin-left: 500px">categories</span>
          <el-dropdown-menu slot="dropdown" style="margin-left: 1000px">
            <el-dropdown-item v-for="category in categories">
              <span>{{ category.categoryName }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        &nbsp;&nbsp;&nbsp;
      </el-dropdown>
      <el-dropdown>
        <a @click="goBackend" style="font-size: 120%">backend</a>
        &nbsp;&nbsp;&nbsp;
        <a @click="goPage1" style="font-size: 120%">page</a>
        &nbsp;&nbsp;&nbsp;
        <a @click="goHome" style="font-size: 120%">home</a>
      </el-dropdown>
      <div style="width: 1000px;height: 25px;margin-top: 3%;margin-left: 9%">
        <img src='@/assets/header-line.png' style="width: 100%;height: 100%"/>
      </div>

    </el-header>
</template>

<script>
  import ElSubmenu from '../../../../node_modules/element-ui/packages/menu/src/submenu.vue'
  import ElMenu from '../../../../node_modules/element-ui/packages/menu/src/menu.vue'
  import ElDropdown from '../../../../node_modules/element-ui/packages/dropdown/src/dropdown.vue'
  import ElDropdownMenu from '../../../../node_modules/element-ui/packages/dropdown/src/dropdown-menu.vue'
  import ElDropdownItem from '../../../../node_modules/element-ui/packages/dropdown/src/dropdown-item.vue'
  import { queryCategoryList } from '@/api/article/category'
  import { queryTagList } from '@/api/article/tag'

  export default {
    components: {
      ElDropdownItem,
      ElDropdownMenu,
      ElDropdown,
      ElMenu,
      ElSubmenu
    },
    name: 'headerBar',
    data() {
      return {
        categories: []
      }
    },
    mounted: function() {
      this.queryCategoryList()
      this.queryTagList()
    },
    methods: {
      goPage1() {
        this.$router.push('/page1')
      },
      goHome() {
        this.$router.push('/')
      },
      goBackend() {
        window.location = 'http://localhost:9528/#/'
      },
      queryCategoryList() {
        const categoryQueryDto = {}
        queryCategoryList(categoryQueryDto).then(response => {
          this.categories = response.data
        })
      },
      queryTagList() {
        const tagQueryDto = {}
        queryTagList(tagQueryDto).then(response => {
          this.categories = response.data
        })
      }
    }
  }

</script>

<style>
  a {
    font-weight: 400
  }
</style>
