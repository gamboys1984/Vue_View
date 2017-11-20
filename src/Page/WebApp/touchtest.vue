<template>
  <div>
    <div @touchmove="touchMove" @touchstart="">
      <img src="../../assets/logo.png" />
    </div>
    <div v-html="html">
    </div>
  </div>
</template>
<script>
var oldX1,oldY1,oldX2,oldY2=0
export default {
  methods: {
    touchMove: function(touch) {
      var touchs = touch.changedTouches
      if (touchs.length == 1) {
        console.log(oldX1)
      }
    },
    touchStart: function(touch) {
      var touchs = touch.changedTouches
      if (touchs.length == 1) {
        oldX1=touchs[0].pageX
        // oldX2=touchs[1].pageX
        oldY1=touchs[0].pageY
        // oldY2=touchs[1].pageY
      }
    }
  },
  data: function(){
    return {
      html: ''
    }
  }
}
</script>
