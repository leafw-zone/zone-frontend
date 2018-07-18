<template>
  <div id="app" style="margin-top: 0">
    <el-container>
      <el-header>
      <headerBar></headerBar>
      </el-header>
      <el-main style="margin-top: 2%;margin-left: 8%">
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import { headerBar } from './components/layout/index'
  import ElContainer from '../node_modules/element-ui/packages/container/src/main.vue'
  import ElHeader from '../node_modules/element-ui/packages/header/src/main.vue'

export default {
    name: 'App',
    components: {
      ElHeader,
      ElContainer,
      headerBar
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
}
  /*.el-container {*/
    /*background-image: url("./assets/hd.jpg");*/
    /*background-size: 100%;*/
    /*height: 548px;*/
    /*width: 1274px;*/
  /*}*/
</style>
