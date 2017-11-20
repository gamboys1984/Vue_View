<template>
  <div class="TopDiv"  >
      <div  class="head-content">
        来自{{ShareName}}的分享
      </div>

      <img class="commentAvatarImage" :src="LogoImgPath" >
      <div class="UserName">{{ShareName}}</div>
      <div class="Describe">宝宝的成长的点滴和您一起分享</div>
      
        <video-player 
          v-if="playerOptions.sources[0].src!=''" 
          class="vjs-matrix vjs-custom-skin"
          ref="videoPlayer"
          :options="playerOptions"
          :playsinline="true">
        </video-player>

      <div class="VideoText">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;视频描述:</div>
      <div class="VideoDescription">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{VideoDescription}}</div>

      <div class="BottomDiv">
        <img style="position: absolute;bottom: 14%;left: 5%;" 
        width="41px" height="41px" 
        src="../../assets/BabyDiaryIcon.png" />

      <div class="BabyDiary">成长日记</div>
      <div class="BabyDiaryText">记录宝宝成长的每一天</div>
        
        <a id="BotLabel" :href="DownloadHref" class="BottomLabel">{{GetOpenOrDownload}}</a>
        <img  class="OpenDownload" src="../../assets/RoundSquare.png" />
      </div>
  </div> 
</template>

<script>
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
import api from '@/fetch/api'
import {videoPlayer} from 'vue-video-player'
export default {
  name: 'ShareVideo',
  components: {
      videoPlayer
  },
  beforeCreate() {
    // let frm = document.createElement("iframe");
    // frm.src = 'weixin://'
    // frm.style.display='none'
    // // var kill = setTimeout(() => {console.log('失败')}, 5000)
    // frm.onload =  ()=> {
    //         // clearTimeout(kill);
    //         this.OpenOrDownload='打　开'
    //     }
    // document.body.appendChild(frm)
    
    let ShareID = this.$route.path.split("/")[this.$route.path.split("/").length-1]
    api.GetShareVideo(ShareID)
      .then((res)=>{
        let result
        result = res.ReturnValue
        this.ShareName = result.NickName
        this.VideoDescription = result.VideoDescription
        this.LogoImgPath = result.LogoPath
        this.playerOptions.sources[0].src = result.VideoUrl
        document.title=`来自${result.NickName}的视频分享`
      })
  },
  created () {
  //   let json = {
  //   userAgent: navigator.userAgent.toLowerCase(),
  //   isAndroid: Boolean(navigator.userAgent.match(/android/ig)),
  //   isIos: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
  //   isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/ig)),
  // }
  
  // if(this.OpenOrDownload.indexOf("下")==0){
    if(this.$route.path.split("/")[this.$route.path.split("/").length-2].toLowerCase().indexOf("store")>=0){
      this.DownloadHref = "http://czrj.iemylife.com/download/download"
    }else
    {
      if(process.env.NODE_ENV.indexOf("dev")>=0){
        this.DownloadHref = "http://diary.dev.chengzhangrj.com/download/download_V"
      }
      if(process.env.NODE_ENV.indexOf("int")>=0){
        this.DownloadHref = "http://czrjint.iemylife.com/download/download_V"
      }
      if(process.env.NODE_ENV.indexOf("prod")>=0){
        this.DownloadHref = "http://czrj.iemylife.com/download/download_V"
      }
    }
  // }
  // if(this.OpenOrDownload.indexOf("打")==0){
  //   if(json.isAndroid){
  //     this.DownloadHref = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.innovation.chengzhangriji'
  //   }
  //   if(json.isIos){
  //     this.DownloadHref = 'https://itunes.apple.com/cn/app/%E6%88%90%E9%95%BF%E6%97%A5%E8%AE%B0-%E8%AE%B0%E5%BD%95%E5%AE%9D%E5%AE%9D%E7%9A%84%E7%82%B9%E6%BB%B4%E6%88%90%E9%95%BF/id1003155568?mt=8'
  //   }
  // }
  
  },
  data () {
      return {
        DownloadHref: '',
        OpenOrDownload: '下　载',  
        LogoImgPath: '',
        ShareName: '',
        VideoDescription: '',
        playerOptions: {
        //   muted: true,
          language: 'zh-CN',
          sources: [{
            type: "video/mp4",
            src: ""
          }],
        }
      }
  },
  methods:{
  },
  computed: {
    GetOpenOrDownload: {
      get() {
        return this.OpenOrDownload
      },
      set(val) {
        this.OpenOrDownload = val
        return this.OpenOrDownload
      }
    }
  },
}
</script>

<style>
a:link{
text-decoration:none;
}

.TopDiv{
  position: absolute;
    overflow: hidden;
    margin: 0;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/sharebackground.png');
    background-repeat: no-repeat;
    background-position: center top;
    background-size: 100% 100%;
    overflow: hidden;
}
/* html,body {
    height: 100%;
    overflow: hidden;
    margin: 0;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/sharebackground.png');
    background-repeat: no-repeat;
    background-position: center top;
    background-size: 100% 100%;
    overflow: hidden;
} */
.background{
    background-color: none;
}
.head-content {
  text-align: center;
  line-height: 48px;
  color: #fff;
  position: relative;
}
/* .commentAvatarDiv{
  position: absolute;
  top: 65px;
  width: 70px;
  left: 25px;
  height: 70px;   
  padding:2px;   
  background: #ececec;   
  border-radius:32px;   
  -moz-border-radius: 32px;   
  -webkit-border-radius: 32px;} */
.commentAvatarImage{
  position: relative;
  left: 17px;
  width:70px;    
  height:70px;    
  line-height: 0;		/* remove line-height */     
  display: inline-block;	/* circle wraps image */   
  border-radius: 50%;	/* relative value */   
  -moz-border-radius: 50%;   
  -webkit-border-radius: 50%;   
  transition: linear 0.25s;
}
.UserName{
  position: relative;
    /* font-size: 1.14em; */
  color: #fff;
  bottom: 65px;
  left: 100px;
}
.Describe{
  position: absolute;
  top: 90px;
  left: 100px;
  color: #fff;
}
.VideoText{
  color: #fff;
  margin-top: 4%
}
.BottomDiv {
  position: absolute;
  bottom: 0px;
  height: 9.8%;
  width: 100%;
  background:rgba(255,255,255,0.1) none repeat scroll !important;
}
.BabyDiary {
  color: #fff;
  position: absolute;
  bottom: 50%;
  left: 19%;
}
.BabyDiaryText{
  color: #fff;
  position: absolute;
    left: 19%;
    bottom: 16%;
  opacity: 0.5;
  font-size: 0.9em;
}
.OpenDownload{
  position: absolute;
  width: 71px;
  height: 34px;
  left: 77%;
  bottom: 17%;
  z-index: 0;
}
.Video{
    /* width: 400px; */
  height: 250px;
}
.VideoDescription{
  margin-top:2%;
  color: #fff;
}
.vjs-custom-skin{
  height: 38%;
}
.BottomLabel {
  position: absolute;
  bottom: 28%;
  color: #fff;
  left: 80%;
  z-index: 1;
}
.video-js {
  position: absolute;
  font-size: 6px;
}
.vjs_video_3-dimensions {
    height: 100%;
}
@media (device-height:480px) and (-webkit-min-device-pixel-ratio:2) {
  /* 兼容iphone4/4s */
  .class {}
}

@media (device-height:568px) and (-webkit-min-device-pixel-ratio:2) {
  /* 兼容iphone5 */

.vjs-custom-skin{
  height: 36%;
}
}
@media (device-height:640px) and (-webkit-min-device-pixel-ratio:2) {
  /* 兼容Samsung Note3 */


}
@media (device-height:667px) and (-webkit-min-device-pixel-ratio:2) {
  /* 兼容iphone6 */


}

@media (device-height:736px) and (-webkit-min-device-pixel-ratio:2) {
  /* 兼容iphone6 Plus */

}

</style>
