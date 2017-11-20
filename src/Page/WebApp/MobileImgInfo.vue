<template>
<!--z暂时不用的页面  -->
  <div>
    <div class="first five" id="imgDiv" style="background-color: lightyellow;">
        <label class="titleLable" style="font-weight: normal">添加图片</label>
        <div style="clear:both"></div>
        <div id="imgDiv2">
          <img v-for="(data,i) in imglist1" :style="GetImgStyle(i)"  :src="data" :key="i" style="width:56px;height:56px;float:left" />
          <label id="realBtn" class="inputLabel" :class="((imglist1.length+1)/5>1)?'marginTop':''">
            <input type="file" id="file" name="file" multiple="multiple" accept="image/jpeg,image/jpg,image/png,image/gif"
                        @change="handleFileChange" @click.native="hello" style="left:-9999px;position:absolute;" />
              +
          </label>
        </div>

        <div style="clear:both"></div>
     </div>
     <div id="imgDiv3">
        <img v-for="(imgData,k) in InfoImgList" :src="imgData" :style="GetImgStyle(k)" :key="k" style="width:56px;height:56px;" @click="Enlarge(imgData)" />
     </div>
     <div class=" six btnSubmit" @click="SubmitInfo">
       提交
     </div>
     <div class=" six btnSubmit" >
       click测试
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
          imglist1:[],
          Ext:[],
          ImageData:[],
          ImgList:[],
          ImgStyle:"",
          ImgStyle2:"",
          MarginLeft:'',
          InfoImgList:[],
          Message:"感谢您的反馈，您的支持是我们最大的动力！",
          MsgTitle:"您的意见已经成功反馈，我们会尽快跟您联系！",
          hide:false
        }
    },
    created:function(){


    },
    mounted:function(){
      var imgDiv = document.getElementById("imgDiv2");
      var divWidth = imgDiv.offsetWidth-1;
      var marginLeft = (divWidth - (56*5))/4 + 'px'
      this.MarginLeft = marginLeft;
      console.log(divWidth)
      console.log(this.MarginLeft)
       //MessageBox.alert(this.Message, this.MsgTitle)
    },
    methods:{
      GetImgList2:function(){
        this.InfoImgList.push('http://czrjdevimg6.iemylife.com/images/1141/08079e36149d44e48f17d3c0de0f4dbe.jpeg');
        this.InfoImgList.push('http://czrjdevimg8.iemylife.com/images/1141/5adc4fa8ca1445a29359215f3badba8a.jpeg')
        this.InfoImgList.push('http://czrjdevimg5.iemylife.com/images/1141/9afd463c2d62421eabecefb136493e36.jpeg')
        this.InfoImgList.push('http://czrjdevimg8.iemylife.com/images/1141/916b572497db45409bef0c37ca2128ec.jpeg')
        this.InfoImgList.push('http://czrjdevimg7.iemylife.com/images/1141/6c8ce8bcaba84d70b6b09071e1c90ead.jpeg')
        this.InfoImgList.push('http://czrjdevimg6.iemylife.com/images/1141/287759307a4e4244927faa318a89c2cc.jpeg')
        this.InfoImgList.push('http://czrjdevimg6.iemylife.com/images/1141/287759307a4e4244927faa318a89c2cc.jpeg')
        this.InfoImgList.push('http://czrjdevimg6.iemylife.com/images/1141/287759307a4e4244927faa318a89c2cc.jpeg')
        this.InfoImgList.push('http://czrjdevimg6.iemylife.com/images/1141/287759307a4e4244927faa318a89c2cc.jpeg')
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
            var files = document.getElementById("file").files;
            var num = document.querySelectorAll("img").length;

           // ((imglist1.length-1)%5 == 0)?'':
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
                         // this.InsertReply();  //在主表插入信息
                      }
                    }else{
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
      SubmitInfo:function(){
        alert("进来了")

      },
      ShowZhezhao:function(){
        var zhezhao = document.createElement("div");
        zhezhao.setAttribute("class","zhezhao");
        zhezhao.setAttribute("style","background-color:black;width:100%;height:100%;position: fixed;top: 0px;left:0px;opacity: 0.7;z-index:999;cursor: pointer");
        document.body.appendChild(zhezhao)
        zhezhao.addEventListener("click",function(){
          zhezhao.remove();
        })
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
    .inputLabel{
        width: 56px;
        height: 56px;
        text-align: center;
        line-height: 1.432;
        font-size: 32px;
        /* margin-top: 4px; */
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
  .marginTop{
    margin-top:5px;
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
        overflow:hidden;
        letter-spacing:4px;
  }
  .zhezhao{
      background-color:black;
      width:100%;
      height:100%;
      position: fixed;
      top: 0px;
      opacity: 0.7;
      z-index:999;
  }
</style>
