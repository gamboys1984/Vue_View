<template>
  <div class="zhezhao3" id="zhezhao3" @click="hideImg" :style="Style">
      <img id="imgInfo" :src="CImgSrc" :height="CHeight" :width="CWidth" :style="CImgStyle" style="z-index:99999" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      Pheight:'',
      Style:{}
    }
  },
  mounted:function(){
    var pHeight=window.innerHeight;
    this.Pheight=pHeight+"px";
    this.Style={height:(this.Pheight)}
    console.log(this.Pheight)
    console.log(this.Style)

  },
  props: ['CImgSrc','CHeight','CWidth','CImgStyle'],
  methods: {
    hideImg: function(){
        this.$emit('hideImg','false');//调用父组件的自定义事件，并传值
    }
  },
}
</script>

<style scoped>
  .zhezhao3{
      background-color:black;
          width:100%;
          height:100%;
          position: fixed;
          top: 0px;
          left:0px;
          opacity: 1;
          z-index:0;
          text-align:center;
  }
</style>
