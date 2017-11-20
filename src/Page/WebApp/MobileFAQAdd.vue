<template>

<div id="all">
    <div class="first" id="first" v-show="!IsShow" style="margin-top:5%">
      <div class="titleDiv" style="padding:0px 0px"  @click="hideDis()">
        <label class="titleLable" style="font-weight: normal;">反馈类型</label>
      </div>
      <div>
        <div style="float:left;width:90%;min-height:24px;"   @click="hideDis()">
          <div class="label label-default margin-left fAQInfo" style="" v-for="(item,i) in FAQContent" :key="i">
                   {{item}}
          </div>
        </div>
        <div style="float:right;width:10%;text-align:right;">
          <label @click="showDis()" :class="ImgIcon" style="color: #cacacf;line-height:30px"></label>
        </div>
      </div>
      <div style="clear:both"></div>
    </div>
     <div class="checkDisplay" id="checkDisplay">
             <div class="divCheckList">
                <div v-for="(item,i) in options" :key="i" class="xuanxiang" style="" @click="AddFAQType(item,i)">
                  <span style="color: #4b4b4d;">{{item}}</span>
                  <span v-show="IsHide" class="glyphicon glyphicon-ok hideSpan2"></span>
                </div>
            </div>
        </div>
     <div class="first two" v-show="!IsShow"  @click="hideDis()">

         <label class="titleLable" style="font-weight: normal">详细描述</label>
         <hr style="margin-top:0px;margin-bottom:0px;" />
         <textarea placeholder="用的不爽，来吐吐槽吧~~" class="descInfo infoPlace" v-model="Description" rows="7" style="width:100%;border:none;resize:none;">

         </textarea>
     </div>
     <div class="three" v-show="!IsShow"  @click="hideDis()">
       <div class="btnInfo">{{MobileModel}}</div>
       <div class="btnInfo">{{MobileSystem}}</div>
       <div class="btnInfo">{{AppVersion}}</div>
     </div>
     <div class="first four" v-show="!IsShow"  @click="hideDis()">
        <label class="titleLable" style="font-weight: normal">联系方式(手机/邮箱)</label>
        <input type="mobile" class="mobile infoPlace" placeholder="选填" v-model="MobilePhone"  style=""/>
     </div>
     <!-- <div class="first five" v-show="!IsShow"  @click="hideDis()">
        <label class="titleLable" style="font-weight: normal">添加图片</label>
        <div style="padding-bottom:4px;">
            <div id="imgList">
                  <img v-for="(data,i) in imglist1" :src="data" :key="i" style="width:58px;height:58px;margin-right:2px;float:left;margin-top:4px;" />
            </div>
              <mt-palette-button for="file" content="+"
                    mainButtonStyle="color:darkgrey;border: 1px dashed darkgrey;border-radius: 0px;background-color:white;margin-top: 4px;-webkit-touch-callout: none;">
                    <input type="file" multiple="multiple" accept="image/jpeg,image/jpg,image/png,image/gif"
                        @change="handleFileChange" id="file" @click.native="hello" style="z-index: 99;opacity: 0;position: absolute;top: 2%;left: 32%; width: 100%;height: 100%;background-color: blue;overflow: overlay;" />
                </mt-palette-button>

        </div>
     </div> -->
     <div class="first five" id="imgDiv" v-show="!IsShow"   @click="hideDis()">
        <label class="titleLable" style="font-weight: normal">添加图片</label>
        <div style="clear:both"></div>
        <div id="imgDiv2">
          <img v-for="(data,i) in imglist1" :style="GetImgStyle(i)" :src="data" :key="i" style="width:56px;height:56px;float:left" />
          <!-- <img v-for="(data,i) in imglist1" :src="data" :key="i" style="width:56px;height:56px;margin-top:4px;margin-right:2px;float:left" /> -->
          <label id="realBtn" class="inputLabel" :class="((imglist1.length+1)/5>1)?'marginTop':''">
            <input type="file" id="file" name="file" multiple="multiple" accept="image/jpeg,image/jpg,image/png,image/gif"
                        @change="handleFileChange" @click.native="hello" style="left:-9999px;position:absolute;" />
              +
          </label>
        </div>

        <div style="clear:both"></div>
     </div>
     <div  v-show="!IsShow" class="first six btnSubmit" @click="SubmitInfo">
       提交
     </div>
     <div class="zhezhao" id="zhezhao" v-show="hide">

     </div>
     <MobileLoading v-show="IsShow" :word="DataF"></MobileLoading>
</div>
</template>
<script>
    import { Button } from 'mint-ui';
    import { Checklist } from 'mint-ui';
    import { PaletteButton } from 'mint-ui';
    import { Indicator } from 'mint-ui';
    import { MessageBox } from 'mint-ui';
    import {Cell} from 'mint-ui'
    import api from '@/fetch/api'
    import MobileLoading from '@/components/Share/MobileLoading'
    export default {
    name: 'test',
    data(){
        return {
            IsShow:true,
            DataF:"正在加载…",
            QuestionDetail:{
            },
            FAQId:0,
            value:[],
            options:[],
            FAQContent:[],
            ImageData:[],
            ImgList:[],
            Ext:[],
            ImageResult:[],
            MobileModel:"Iphone 7",
            MobileSystem:"IOS 10.0",
            MobilePhone:"",
            AppVersion:"IOS v-2.14.0",
            Description:"",
            QuestionType:0,   //问题类型(接收参数)
            QuestionTitle:"",
            FeedbackType:"",
            ProjectType:1,   //项目类型(固定)
            IsUser:true,
            IsStart:0,
            ImgLength:0,
            hide:false,
            Message:"感谢您的反馈，您的支持是我们最大的动力！",
            MsgTitle:"您的意见已经成功反馈，我们会尽快跟您联系！",
            ImgIcon:"glyphicon glyphicon-chevron-down",
            IsHide:"displayNone",
            imglist1:[],
            MarginLeft:""
        }
        },
    components: {
        MtButton:Button,
        MtChecklist:Checklist,
        MtPaletteButton:PaletteButton,
        MtCell:Cell,
        MobileLoading
    },
    created:function(){
           var title = this.$store.state.MobileBackstage.FAQtitile;
           console.log(title)
           this.QuestionType = this.$store.state.MobileBackstage.FAQtype
           this.QuestionTitle = title;
           if(title == "" || title == "问题反馈"){
               this.QuestionTitle = "问题反馈";
               this.options.push("操作问题");
               this.options.push("功能问题");
               this.options.push("建议");
               this.options.push("其他");
               this.IsShow = false;
           }else{
               this.GetSystemSetting();
           }
           if(this.QuestionType == ""){
               this.QuestionType = "1"
           }
            this.$emit('GetTitle',this.QuestionTitle);
    },
    watch:{
        value(){
            this.FAQContent = [];
            if(this.value.length > 0){
                this.value.forEach(function(element) {
                    this.FAQContent.push(element)
                }, this);
            }
            this.FeedbackType = this.FAQContent

        }
    },
    mounted:function(){

    },
    methods:{
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
        AddFAQType:function(element,index){
            var a = document.querySelectorAll(".hideSpan2");
            var b = a[index].style.display;
            if(b == "block"){
                var val = this.FAQContent;
                this.DelFAQContent(this.FAQContent,element)
                a[index].style.display="none";
            }else{
                this.FAQContent.push(element);
                a[index].style.display="block";
            }
            this.FeedbackType = this.FAQContent;
        },
        DelFAQContent:function removeByValue(arr, val) {
            for(var i=0; i<arr.length; i++) {
                if(arr[i] == val) {
                arr.splice(i, 1);
                break;
                }
            }
        },
        GetSystemSetting:function(){
            var content2='{"UN":"'+ process.env.UN+'","SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"9bd75cb66db64e62b3944f043f3fe6a5","AccessToken":"'+ process.env.AccessToken+'"}'
            api.GetSystemSetting(content2)
                .then((response) => {
                  if(response.Result == 1){
                    this.options = response.ReturnValue.FeedbackTypeList;
                    var length = response.ReturnValue.FeedbackTypeList.length
                    if(length > 0){
                        this.options = [];
                        for(var i=0;i<length;i++){
                            this.options.push(response.ReturnValue.FeedbackTypeList[i].Description)
                        }
                    }
                    if(this.QuestionTitle != "问题反馈"){
                        this.DelFAQContent(this.options,"操作问题");
                        this.DelFAQContent(this.options,"功能问题");
                    }
                    this.IsShow = false;
                  }else{
                    this.IsShowList = false;
                    MessageBox.alert("加载失败，请稍候重试","提示");
                  }

                }, (error) => {
                // alert("请求失败")
                console.log(error)
			        	this.IsShow = false;
                })
        },
        showDis:function(){  //显示问题类型
            var check = document.getElementById("checkDisplay");
            var style = check.style.display;
            if(style=="none" || style == ""){
                check.style.display="block";
                    this.ImgIcon="glyphicon glyphicon-chevron-up";
            }else{
                check.style.display="none";
                    this.ImgIcon="glyphicon glyphicon-chevron-down";
            }


        },
        hideDis:function(){   //隐藏问题类型
            var check = document.getElementById("checkDisplay");
            check.style.display="none";
                this.ImgIcon="glyphicon glyphicon-chevron-down";
        },
        SubmitInfo:function(){  //提交反馈
            this.FormValidate();
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
        GetMarginLeft:function(){
            var imgDiv = document.getElementById("imgDiv2");
            var pheight = window.innerWidth*0.9;
            var left = imgDiv.offsetLeft;
            var divWidth = imgDiv.offsetWidth-1;
            var marginLeft = (divWidth - (56*5))/4 + 'px'
            this.MarginLeft = marginLeft;
        },
        handleFileChange:function(){  //file文件改变事件
            this.GetMarginLeft();
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
        GetImgList:function(){      //调用上传图片接口
            if(this.Ext == ""){
                this.ImgList = "";
                this.InsertMainInfo();  //在主表插入信息  //在主表插入信息
            }else{
                var length = this.Ext.length;
                this.ImgLength = length;
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
                            this.InsertMainInfo();  //在主表插入信息
                        }
                      }else{
                        Indicator.close();
                        var zhezhao = document.getElementById("zhezhao");
                        var all = document.getElementById("all");
                        all.appendChild(zhezhao);
                        this.IsShow = false;
                        MessageBox.alert("图片上传失败，请稍候重试","提示");
                        this.hide=false;
                      }

                    }, (error) => {
                        console.log(error)
                    })
                }
            }

            return this.ImgList;
        },
        InsertMainInfo:function(){  //提交反馈接口
            var imgHtmlList = "<br />";
            for(var i=0;i<this.ImgList.length;i++){
                var img = "<img src='"+this.ImgList[i]+"' width='45%' style='margin-right:2px' />";
                imgHtmlList += img;
            }
            var content = '{"UN":"'+ process.env.UN+'","SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"13d76d3394b34a6da42b9b72cd0a6964","AccessToken":"'+ process.env.AccessToken+'",';
            content = content +'"MobilePhone":"'+this.MobilePhone+'"'+ ',"MobileModel":"'+this.MobileModel+'"'+ ',"MobileSystem":"'+this.MobileSystem+'"'+ ',"AppVersion":"'+this.AppVersion+'"'+ ',"Description":"'+this.Description+'"'
                    + ',"QuestionType":'+this.QuestionType+''+ ',"QuestionTitle":"'+this.QuestionTitle+'"'+ ',"FeedbackType":"'+this.FeedbackType+'"'+ ',"ProjectType":'+this.ProjectType+',"ImgList":"'+this.ImgList+'"' +'}';
                console.log(content)
                api.AddFAQInfo(content).then((response) => {
                  if(response.Result==1){
                    this.ImgList = [];
                    this.hide=false;
                    Indicator.close();
                    var zhezhao = document.getElementById("zhezhao");
                    var all = document.getElementById("all");
                    all.appendChild(zhezhao);
					        this.IsShow = false;
                    MessageBox.alert(this.Message, this.MsgTitle).then(action => {
                        window.history.go(-1)
                    });
                  }
                  else
                  {
                    this.ImgList = [];
                    this.hide=false;
                    Indicator.close();
                    var zhezhao = document.getElementById("zhezhao");
                    var all = document.getElementById("all");
                    all.appendChild(zhezhao);
					          this.IsShow = false;
                     MessageBox.alert("提交失败，请稍后重试");
                  }


                }, (error) => {
                    console.log(error)
                })
            },
        FormValidate:function(){
                if(this.FeedbackType == [] || this.FeedbackType == ""){
                    MessageBox.alert("请选择反馈类型", "提示");
                }else if( this.Description == ""){
                    MessageBox.alert("请填写详细描述", "提示");
                }else if(this.MobilePhone != "" && !this.checkPhone() && !this.checkEmail() ){
                    MessageBox.alert("联系方式有误，请重填", "提示");
                }else{
                   this.hide=true;
                   var zhezhao = document.getElementById("zhezhao");
                   document.body.appendChild(zhezhao);
                   Indicator.open('正在提交，请稍候...');
                   this.GetImgList();
                }
        },
        checkPhone : function(){
                var phone = this.MobilePhone;
                if(!(/^1(2|3|4|6|5|7|8|9)\d{9}$/.test(phone))){
                    return false;
                }else{
                    return true;  //验证错误，手机号输入格式错误
                }
        },
        checkEmail : function(){
                var email = this.MobilePhone;
                if(!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(email))){
                    return false;
                }else{
                    return true;  //验证错误，手机号输入格式错误
                }
        }
    }
    }
</script>
<style scoped src="../../Common/Css/bootstrap.min.css">

</style>

<style scoped>
    .btnInfo{
      display: inline-block;
      font-size: 14px;
      padding: 0 12px;
      height: 33px;
      background-color: white;
      line-height: 33px;
      border-radius: 4px;
      color: #4b4b4d;
      border: 1px solid #dedede;
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
    .infoPlace::-webkit-input-placeholder {
      color:#d5d5d9;
    }
    .xuanxiang{
        color:black;
        display:block;
        padding: 10px 4px;
        width: 90%;
        border-bottom: 1px solid #eee;
        margin: 0 auto;
    }
    .fAQInfo{
      font-weight: normal;
      background-color: #efefef;
      float:left;
      margin-top:4px;
      color:#4b4b4d;
      padding: 4px 8px;
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
    .hideSpan{
        color:#19c9db;
        padding-right: 10px;
        display:none
    }
    .hideSpan2{
        color:#19c9db;
        padding-right: 10px;
        float:right;
        display:none;
    }
    .mobile{
        border:none;
        width:100%;
        border-bottom: 1px solid #eee;
        height: 34px;
        padding-top:12px;
        padding-bottom:12px;
    }
    .arrow{
        border-width: 11px;
        top: -11px;
        left: 50%;
        margin-left: -11px;
        border-top-width: 0;
        border-bottom-color: #999;
        border-bottom-color: rgba(0,0,0,.25);
    }
    .arrow, .arrow:after {
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
    }
    .mint-cell-title{
        text-align:left;
    }
    .mint-cell-text{
        color:black;
    }
    .margin-left{
        margin-left:0.1em;
    }
    .mint-main-button{
        background-color:white;
    }
    .mint-cell-title {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: inherit;
        padding: 0 10px;
        width: 100%;
    }
    .mint-checklist-title{
        margin:0px;
    }
    .red{
        color: #be5ce3;
    }
    .gray{
        color:#888;
    }
    .mint-tabbar{
        bottom: -6em
    }
    .mint-cell-wrapper{
        font-size:14px;
    }
    .mint-cell-title{
        width:2050%
    }
    .form-control{
        width:50%;
        display: inline;
    }
    a[data-v-43de94fb]:hover, a[data-v-43de94fb]:focus {
        color: #23527c;
        text-decoration: none;
    }
    .checkDisplay{
        width: 40%;
        position: absolute;
        right: 5%;
        display:none;
        margin-top: 5%;
    }
    .first{
        width:90%;
        background-color:white;
        padding:3% 2%;
        /* margin-top:5%; */
        border-radius:4px;
        margin:0 auto;
    }
    .firstOne{
        width:100%;
        background-color:white;
        padding-bottom:20px;
    }
    .two{
        margin-top:5%;
    }
    .marginLeft{
        margin-left:2%;
    }
    textarea:focus,textarea{
        border: none;
    }
    .three{
        width:90%;
        margin-left:5%;
        padding-left:2%;
        margin-top:5%;
    }
    .four{
        margin-top:5%;
    }
    .five{
        margin-top:5%;
    }
    .six{
        margin-top:5%;
        padding-left:0px;
    }
    .titleLable{
        color: darkgrey;
        font-weight: normal;
        padding-bottom: 4px;
        margin-bottom:0px
    }
    #imgIcon{
        float: right;
        margin-right: 2em;
        padding: 4px 0px;
        color: lightgray;
        position: relative;
        right: -25px;
        top: 1.7em;
        z-index: 99;
    }
    .divCheckList{
        width:100%;
        position:relative;
        /* left:40%; */
        border-left: 1px solid #d9d9d9;
        border-radius: 4px;
        box-shadow: #666 0px 0px 10px;
        background-color:white;
        padding: 0px 4px;
        z-index:9;
        font-size:0.8em;
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
  .marginTop{
    margin-top:5px;
  }
  label{
    margin-bottom:0px
  }
</style>
