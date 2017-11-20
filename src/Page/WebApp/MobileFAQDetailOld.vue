<template>
<!-- <router-link to="mobile/mint">asdfasdfsadfsadf</router-link>   -->
    <div id="all">
        <div class="content" id="content" v-show="!IsShow">
            <div class="appInfo">
                <div class="title">
                    <label v-html='Info.Content'></label>
                    <div id="imgDiv2" class="imglist" style="text-align:left;overflow:hidden">
                      <img v-for="(imgData,k) in Info.ImgList" :src="imgData" :style="GetImgStyle(k)" :key="k" style="width:56px;height:56px;" @click="Enlarge(imgData)" />
                    </div>
                </div>
                <mt-button type="default" size="small" disabled style="background-color:white;color: black;opacity:1">{{ QuestionDetail.MobileModel }}</mt-button>
                <mt-button type="default" size="small" disabled style="background-color:white;color: black;opacity:1">{{QuestionDetail.MobileSystem}}</mt-button>
                <mt-button type="default" size="small" disabled style="background-color:white;color: black;opacity:1">{{QuestionDetail.AppVersion}}</mt-button>
            </div>
            <div class="faqContent" v-show="IsShowDetailInfo">
                <div class="divCell" v-for="(data,i) in QuestionDetail.MessageDetailList" :key="i">
                    <div class="divCellTitle">
                        <label class="divCellTitleLeft" :class="data.MsgType=== '反馈' ? 'gray' : 'red' ">{{data.MsgType}}:</label>
                        <label class="divCellTitleRight gray">{{data.Time.slice(0,16)}}</label>
                    </div>
                    <div class="divCellValue">
                        <label v-html='data.Content' v-on:click="openImageProxy($event)"></label>
                        <div class="imglist">
                             <img v-for="(imgData,k) in data.ImgList" :src="imgData" :key="k" style="width:45%;" :style="(k%2)==0 ? 'margin-right:2%':''" @click="Enlarge(imgData)" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="footer" v-show="!IsShow">
            <router-link class="aLink" :to="'../../FAQAgain/'+FAQId+'/'+Title">问题仍未解决，我要继续反馈</router-link>
        </div>
        <div id="fillImg" style="width:100%;">
          <img :src="ImgSrc" id="img" />
        </div>
        <MobileImg v-show="hide" @hideImg="showlDialog" :CImgSrc="ImgSrc" :CImgStyle="ImgStyle" :CHeight="ImgHeight" :CWidth="ImgWidth"></MobileImg>
        <MobileLoading v-show="IsShow" :word="DataF"></MobileLoading>
    </div>
</template>
<script>
    import { Button } from 'mint-ui';
    import api from '@/fetch/api'
    import MobileLoading from '@/components/Share/MobileLoading'
    import MobileImg from '@/components/WebApp/MobileImg'
    import { MessageBox } from 'mint-ui';
    export default {
    name: 'test',
    data() {
        return {
            QuestionDetail: {
            },
            FAQId: 0,
            IsShow:true,
            DataF:"正在加载…",
            Title:"",
            hide:false,
            ImgSrc:"",
            Info:{},
            IsShowDetailInfo:false,
            FImgSrc:'',
            ImgHeight:'',
            ImgWidth:'',
            ImgStyle:{},
            MarginLeft:"",
         }
        },
    components: {
        MtButton: Button,
         MobileLoading,
         MobileImg
    },
    created: function() {
        var a = this.$route.path.split('/');
        var length = a.length;
        this.FAQId = parseInt(a[length-2]);
        this.Title = decodeURI(a[length-1]);
        this.$emit('GetTitle',decodeURI(a[length-1]));
        this.GetOnlineHelpDetail();
    },
    watch:{
    },
    methods: {
        GetMarginLeft:function(){
          var imgDiv = document.getElementById("imgDiv2");
          var pheight = window.innerWidth;
          var divWidth = (pheight*0.9);
          var marginLeft = (divWidth - (56*5))/4 + 'px'
          this.MarginLeft = marginLeft;
        },
        GetImgStyle:function(num){
          var style="";
          num = num+1;
          if((num)/5>1){
            style="margin-top:5px;margin-right:"+this.MarginLeft;
          }
          if(num%5 == 0 && (num)/5>1){
            style="margin-top:5px;margin-right:"+this.MarginLeft;
          }else if(num%5 == 0 && (num)/5<=1){
            style="";
          }else if(num%5 != 0 && (num)/5<=1){
            style="margin-right:"+this.MarginLeft;
          }else if(num%5 != 0 && (num)/5>1){
            style="margin-top:5px;margin-right:"+this.MarginLeft;
          }
          return style;
        },
        GetOnlineHelpDetail: function() {
            var content = '{"UN":"'+ process.env.UN+'","SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"2b75deeccdac4afebb82b8b372add6b7","AccessToken":"'+ process.env.AccessToken+'","FAQId":' + this.FAQId + '}';
            api.GetOnlineHelpDetail(content)
            .then((response) => {
              if(response.Result == 1){
                this.QuestionDetail = response.ReturnValue;
                this.Info = this.QuestionDetail.MessageDetailList[0];
                this.QuestionDetail.MessageDetailList.splice(0, 1);
                var length = this.QuestionDetail.MessageDetailList.length;
                if(length > 0){
                  this.IsShowDetailInfo = true;
                }
                localStorage.setItem(process.env.UN+this.FAQId, this.QuestionDetail.ReadTime)
                this.IsShow = false;
                this.GetMarginLeft();
              }else{
                this.IsShow = false;
                MessageBox.alert("加载失败，请稍候重试","提示");
              }
            }, (error) => {
                //alert("请求失败")
                console.log(error)
            })
        },
        Enlarge: function(imgsrc){ //点击图片放大
            this.ImgSrc =imgsrc;
            var int=self.setInterval(function(){
              var img=document.getElementById("img");
              img.src=imgsrc;
              if(img.height != 0){
                window.clearInterval(int)
                this.JiSuanImg(imgsrc);
                this.FImgSrc = imgsrc;
                this.ShowZhezhao();
              }
            }.bind(this),50)
        },
        openImageProxy: function (event) {
            if (event.target.nodeName === 'IMG') {
              // console.log(event.target.src)
              // console.log("图片点击进来了")
              this.Enlarge(event.target.src)
              // event.target.src 这里做处理
            }
        },
        ShowZhezhao:function(){
          var zhezhao=document.getElementById("zhezhao3")
          zhezhao.style.display="block"
          document.body.appendChild(zhezhao)
        },
        hideImg: function(){
            this.ImgSrc ="";
            this.hide = false;
        },
        showlDialog:function(data){
            if(data == "false"){
              var div=document.getElementById("fillImg");
              var img=document.getElementById("img");
              img.src="";
              img.style.height="";
              img.style.width="";
              this.ImgHeight = '';
              this.ImgWidth='';
              this.hide = false;
              var zhezhao=document.getElementById("zhezhao3")
              zhezhao.style.display="none"
              var all=document.getElementById("all")
              all.appendChild(zhezhao);
            }
        },
        JiSuanImg:function(imgsrc){
          var img=document.getElementById("img");
          var div=document.getElementById("fillImg");
          div.style.display="block"
          var iheight = img.height;
          var iwidth = img.width;
          var pheight = window.innerHeight;
          var pwidth = window.innerWidth;
          img.style.overflow="hidden";
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
          var marginTop =  ((pheight - img.offsetHeight)/2)+"px"
          this.ImgStyle = {'margin-top':marginTop}
          div.style.display="none"
        }
    }
    }
</script>


<style>
  a{
    color:#19c9db;
    text-decoration: none;
  }
  .imglist{
      text-align:center;
      margin-top: 4px;
      margin-bottom: 4px;
  }
  .divCell {
          border-bottom: 1px solid #d9d9d9;
          font-size: 16px;
          line-height: 1.5;
          min-height: inherit;
          overflow: hidden;
          width: 100%;
      padding: 14px 1px;
      }

  .divCell:last-child {
          border-bottom: none;
      }

  .divCell .divCellTitle {
          margin-bottom: 8px;
      }

  .divCell .divCellTitle .divCellTitleLeft {
          width: 40%;
          display: inline-block;
          text-align: left;
      }

  .divCell .divCellTitle .divCellTitleRight {
          width: 58%;
          display: inline-block;
          text-align: right;
      }
  .divCellValue label{
      word-wrap: break-word;
  }
  .gray {
      color: gray;
      }

  .red {
      color: #be5ce3;
      }

  .divCell .divCellValue p {
          margin: 0px 0px;
      }

  .footer {
      margin-top: 2em;
        padding-bottom: 2em;
        font-size: 14px;
        text-align: center;
    }

  .content {
      width: 90%;
      background-color: white;
      margin-left: 5%;
    }

  .appInfo {
      width: 100%;
      background-color: #f0f0f6;
      padding-bottom: 20px;
      padding-top: 10px
    }

  .title {
          padding-bottom: 0.8em;
          color: darkgray;
          width: 100%;
          word-break: break-word;
    }

  .faqContent {
      overflow: auto;
      padding: 0px 2%;
      padding-bottom: 6px;
          border-radius: 5px;
    }

  .aLink {
        color: #19c9db;
          text-decoration: none;
    }

</style>
