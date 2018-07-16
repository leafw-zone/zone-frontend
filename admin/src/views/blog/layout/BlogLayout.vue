<template>
  <div>
    <headerBar></headerBar>
    <div class="main-container">
      <blog-app></blog-app>
    </div>
  </div>
</template>

<script>
  import { headerBar, blogApp } from './components/index'

  export default {
    name: 'BlogLayout',
    components: {
      blogApp,
      headerBar
    },
    data() {
      return {
      }
    }
  }
</script>

