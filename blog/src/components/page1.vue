<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>token:{{token}}</h2>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getToken } from '@/utils/auth'

  export default {
    name: 'page1',
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    data() {
      return {
        msg: 'Page 1',
        token: getToken()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
