<template>
  <div>
    <router-view v-if="loaded"  @frameHeight="frameHeight"></router-view>
  </div>
</template>
<script>

export default {
  data:function(){
    return {
      loaded:false
    }
  },
  created: function() {
    // console.log(this.login)
    window.login = this.login
  },
  methods: {
    login: function(user) {
      // console.log(user)
      this.$store.commit('Set_UN', user[0].UN)
      this.$store.commit('Set_AccessToken', user[1].AccessToken)
      this.loaded=true
    },
    frameHeight: function(){
      // parent.window.postMessage(document.body.offsetHeight, "http://localhost:39370")
      parent.window.postMessage(document.body.offsetHeight, process.env.Admin_URL)
    }
  }
}
window.addEventListener('message', function(event) {
  window[event.data.method](event.data.props);
}, false)
</script>
