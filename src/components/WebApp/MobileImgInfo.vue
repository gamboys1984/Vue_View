<template>
  <div class="zhezhao3" id="zhezhao3" @click="hideImg" :style="Style">
      <img id="imgInfo" :src="CImgSrc" :height="ImgHeight" :width="ImgWidth" :style="ImgStyle" style="z-index:99999" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      Pheight:'',
      Style:{},
      ImgHeight:'',
      Pheight:'',
      Style:'',
      ImgWidth:'',
      ImgStyle:'',
      CImgSrc:'',
      hideC:false
    }
  },
  mounted:function(){
    // var pHeight=window.innerHeight;
    // this.Pheight=pHeight+"px";
    // this.Style={height:(this.Pheight)}
    // console.log(this.Pheight)
    // console.log(this.Style)
  },
  props: [],
  methods: {
    hideImg: function(){
        this.CImgSrc=""
        this.ImgHeight=""
        this.ImgWidth=""
        this.$emit('hideImg','false');//调用父组件的自定义事件，并传值
    },
    JiSuanImg:function(imgsrc){
      console.log("图片路径="+imgsrc)

      var img=document.getElementById("img");
      console.log(img)
      var div=document.getElementById("fillImg");
      div.style.display="block"
      console.log(div)
      var iheight = img.height;
      var iwidth = img.width;
      var pheight = window.innerHeight;
      var pwidth = window.innerWidth;
      console.log(iheight)
      console.log(iwidth)
      console.log(pheight)
      console.log(pwidth)
      if(pheight<iheight || pwidth<iwidth){
        if(iheight>iwidth){
          img.style.height=pheight+"px";
          this.ImgHeight = pheight+"px";
        }else{
          img.style.width=pwidth+"px";
          this.ImgWidth = pwidth+"px";
        }
      }else{
        this.ImgHeight = img.offsetHeight;
        this.ImgWidth = img.offsetWidth;
      }
      if(img.offsetWidth>pwidth){
        img.style.width=pwidth+"px";
        img.style.height="";
      }
      if(img.offsetHeight>pheight){
        img.style.height=pheight+"px";
        img.style.width="";
      }
      var imgNew = document.getElementById("img");
      this.ImgHeight = img.offsetHeight;
      this.ImgWidth = img.offsetWidth;
      console.log("页面高度="+pheight)
      console.log("图片高度="+img.offsetHeight)
      var marginTop =  ((pheight - img.offsetHeight)/2)+"px"
      console.log("marginTop="+marginTop)
      this.ImgStyle = {'margin-top':marginTop}
      console.log(this.ImgStyle)
      
      div.style.display="none";
      this.ShowZhezhao(imgsrc);
    },
    ShowZhezhao:function(imgsrc){
      this.CImgSrc = imgsrc
      var img=document.getElementById("img");
      img.src=imgsrc;
      setTimeout(function () {
          var zhezhao=document.getElementById("zhezhao3")
          console.log(zhezhao)
          console.log(zhezhao.innerHTML)
          zhezhao.style.display="block";
          zhezhao.style.backgroundColor="black";
          zhezhao.style.position="fixed";
          zhezhao.style.top="0px";
          zhezhao.style.left="0px";
          zhezhao.style.opacity="1";
          zhezhao.style.zIndex="0";
          zhezhao.style.textAlign="center";
          console.log(zhezhao)
          document.body.appendChild(zhezhao)
      }, 100)
    },
  },
}
</script>

<style scoped>
  .zhezhao3{
          width:100%;
          height:100%;
       /* background-color:black;
          
          position: fixed;
          top: 0px;
          left:0px;
          opacity: 1;
          z-index:0;
          text-align:center;  */
  }
</style>
