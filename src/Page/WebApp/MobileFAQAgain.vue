
<template>

<div id="all">
      <div class="first two" v-show="!IsShow">
         <label class="titleLable" style="font-weight: normal">详细描述</label>
         <hr style="margin-top:0px;margin-bottom:0px;" />
         <textarea placeholder="用的不爽，来吐吐槽吧~~" class="descInfo" v-model="Description" rows="7" style="width:100%;border:none;resize:none;">
         </textarea>
     </div>
     <div class="first five" id="imgDiv" v-show="!IsShow">
        <label class="titleLable" style="font-weight: normal">添加图片</label>
        <div style="clear:both"></div>
        <div id="imgDiv2" style="width:100%">
          <img v-for="(data,i) in imglist1" :style="GetImgStyle(i)" :src="data" :key="i" style="width:56px;height:56px;float:left" />
          <label id="realBtn" class="inputLabel" :class="((imglist1.length+1)/5>1)?'marginTop':''">
            <input type="file" id="file" name="file" multiple="multiple" accept="image/jpeg,image/jpg,image/png,image/gif"
                        @change="handleFileChange" @click.native="hello" style="left:-9999px;position:absolute;" />
              +
          </label>
          <div style="clear:both"></div>
        </div>

        <div style="clear:both"></div>
     </div>
     <div style="clear:both"></div>
     <div class=" six btnSubmit" @click="SubmitInfo">
       提交
     </div>
     <div class="zhezhao" id="zhezhao" v-show="hide">

     </div>
</div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  import { Indicator } from 'mint-ui';
  import api from '@/fetch/api'
  export default {
    data(){
        return {
          IsShow:false,
          Description:'',
          FAQId:0,
          imglist1:[],
          Ext:[],
          ImageData:[],
          hide:false,
          ImgList:[],
          IsUser:true,
          Message:"感谢您的反馈，您的支持是我们最大的动力！",
          MsgTitle:"您的意见已经成功反馈，我们会尽快跟您联系！",
          MarginLeft:""
        }
    },
    created:function(){
        var url = this.$route.path.split('/');
        var length = url.length;
        this.FAQId = parseInt(url[length-2]);
        this.$emit('GetTitle',decodeURI(url[length-1]));
    },
    mounted:function(){
       // this.GetLeft()
    },
    methods:{
      GetLeft:function(){
          var imgDiv = document.getElementById("imgDiv2");
          var divWidth = imgDiv.offsetWidth-1;
          console.log(divWidth)
          var marginLeft = (divWidth - (56*5))/4 + 'px'
          console.log(marginLeft)
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
      handleFileChange:function(){  //file文件改变事件
            this.GetLeft()
            var files = document.getElementById("file").files;
            var num = document.querySelectorAll("img").length;
            if(num <= 9 && files.length <= 9 && (num+files.length) <= 9){
                for(var i=0;i<files.length;i++){
                    var url = "";
                    var type = files[i].type;
                    if (window.createObjectURL != undefined) { // basic
                        url = window.createObjectURL(files[i]);
                    } else if (window.URL != undefined) { // mozilla(firefox)
                        url = window.URL.createObjectURL(files[i]);
                    } else if (window.webkitURL != undefined) { // webkit or chrome
                        url = window.webkitURL.createObjectURL(files[i]);
                    }
                    if(type === "image/jpg"||type==="image/jpeg"||type==="image/png"||type==="image/gif"){
                        this.imglist1.push(url)
                        this.GetImgUrl(files[i])
                    }else{
                        MessageBox.alert("只能上传图片", "提示");
                    }
                }
            }else{
                MessageBox.alert("最多上传9张", "提示");
            }
      },
      SubmitInfo:function(){  //提交反馈
          if(this.Description == ""){
              MessageBox.alert("请输入详细描述", "提示");
          }else{
              var zhezhao=document.getElementById("zhezhao");
              document.body.appendChild(zhezhao);
              Indicator.open('正在提交，请稍候...');
              this.hide=true;
              this.GetImgList();       //获取上传的图片路径
          }
      },
      GetImgList:function(){      //调用上传图片接口
            var length = this.Ext.length;
            this.ImgLength = length;
            if(this.ImgLength == 0){
                this.InsertReply();  //在主表插入信息
            }
            for(var i=0;i<length;i++){
                var a = length;
                var b = 1;
                var content = '{"UN":"'+ process.env.UN+'","SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"14161847aa344ceeab98b5fa1d7c9f78","AccessToken":"'+ process.env.AccessToken+'",';
                content = content + '"Ext":"'+this.Ext[i]+'"'+ ',"ImageData":"'+this.ImageData[i]+'"'+'}';
                api.UploadImg(content)
                .then((response) => {
                    if(response.Result == 1){
                      this.ImgList.push(response.ReturnValue)
                      b++;
                      if(b==(a+1)){
                          this.InsertReply();  //在主表插入信息
                      }
                    }else{
                        Indicator.close();
                        var all=document.getElementById("all");
                        var zhezhao=document.getElementById("all");
                        all.appendChild(zhezhao)
                        this.hide = false;
                        MessageBox.alert("提交失败，请稍候重试","提示");
                    }

                }, (error) => {
                    //alert("请求失败")
                    console.log(error)
                })
            }
            return this.ImgList;
      },
      GetImgUrl:function(files){  //将图片信息转为Base64
          var reader = new FileReader();
          reader.readAsDataURL(files);
          reader.onload=(function(file){
              var c = file.target.result.split(',');
              var type =  file.target.result.split(',')[0].split(';')[0].split('/')[1]
              if(type == "jpg"||type=="jpeg"||type=="gif"||type=="png"){
                  this.Ext.push(type);
                  this.ImageData.push(c[1]);
              }
          }.bind(this))
      },
      GetStyle:function(obj,attr){
          if(obj.currentStyle){
            return obj.currentStyle[attr];
          }
          else{
            return document.defaultView.getComputedStyle(obj,null)[attr];
          }
      },
      InsertReply:function() {
            var content = '{"UN":"'+ process.env.UN+'","SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"23d76d3394b34a6da42b9b72cd0a5857","AccessToken":"'+ process.env.AccessToken+'",';
            content = content +'"DetailID":'+this.FAQId+',"Content":"'+this.Description+'","ImgList":"' + this.ImgList +'","IsUser":'+this.IsUser+'}';
            api.AddOnlineHelp(content).then((response) => {
                Indicator.close();
                var all=document.getElementById("all");
                var zhezhao=document.getElementById("zhezhao");
                all.appendChild(zhezhao)
                this.hide = false;
                if(response.Result == 1){
                  this.inputData = "";
                  MessageBox.alert(this.Message, this.MsgTitle).then(action => {
                          window.history.go(-1)
                  });
                }else{
                  MessageBox.alert("提交失败，请稍候重试","提示");
                }

              }, (response) => {
                  alert("失败")
            });
        }
    }
  }
</script>
<style scoped src="../../Common/Css/bootstrap.min.css">

</style>

<style scoped>
    .first{
        width:90%;
        background-color:white;
        margin: 0 auto;
        padding:3% 2%;
        margin-top:5%;
        border-radius:4px;
    }
    .two{
        margin-top:5%;
        padding-left:2%;
    }
    .btnSubmit{
        text-align: center;
        background-color: #eaeaea;
        height: 30px;
        border-radius: 4px;
        background-image:url("../../assets/submit.png");
        background-size: 100% 100%;
        margin-bottom:5%;
        color: white;
        text-align: center;
        line-height: 0.4;
        overflow:hidden;
        letter-spacing:4px;
    }
    .six{
      width:90%;
      background-color:white;
      margin: 0 auto;
      margin-top:5%;
      border-radius:4px;
      margin-top:5%;
      line-height: 30px;
    }
    .descInfo::-webkit-input-placeholder {
			  color:#c6c6cc
	  }
    .inputLabel{
        width: 56px;
        height: 56px;
        text-align: center;
        line-height: 1.432;
        font-size: 32px;
        /* margin-top: 5px; */
        display:block;
        border: 1px dashed #dbdbdc;
        color: #dad9d7;
        float:left;
        -webkit-touch-callout: none;
        font-weight: normal;
    }

  .five{
     margin-top:5%;
  }
  .titleLable{
      color: #8e8e93;
      font-weight: normal;
      padding: 4px 0px;
  }
  .zhezhao{
        background-color:black;
        width:100%;
        height:100%;
        position: fixed;
        top: 0px;
        left:0px;
        opacity: 0.5;
        z-index:999;
  }
  .marginTop{
    margin-top:5px;
  }
</style>
