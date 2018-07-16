<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <header></header>
    <router-view/>
  </div>
</template>

<script>
  import { headerBar } from './components/layout/index'

export default {
    name: 'App',
    components: {
      headerBar
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
