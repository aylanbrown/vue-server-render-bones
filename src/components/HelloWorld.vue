<template>
  <el-button type="primary" @click="handleNodeClick">按钮</el-button>
</template>

<script>
export default {
  name: 'HelloWorld',
  asyncData({ store, route }) {
    // console.log(store, route)
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    handleNodeClick() {
      console.log(this)
    }
  }
}
</script>

<style>
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
