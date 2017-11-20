<template>
  <div id="app">
    <!-- <img src="../assets/logo.png"> -->
<router-view></router-view>

  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0px;
  padding: 0px;
  color: black;
  font-size: 1em;
  overflow: hidden;
}
</style>
