<template>
<div>

  <div class="content">
    <BackTemplate :TopTitles="TopTitlesData" :SubTitles="SubTitlesData"></BackTemplate>
    <clip-loder v-show="ShowLoading"></clip-loder>
    <div  v-show="!ShowLoading" class="pull-left">
      <div class="clearfix col-lg-12">
        <div class="wentimiaoshu clearfix">
          <label>问题详细描述</label>
          <br />
          <div class="desc">
            {{QuestionDetail.Description}}
          </div>
        </div>
        <div style="margin-top:20px;">
          <label class="btn btn-info disabled">{{ QuestionDetail.MobileModel }}</label>
          <label class="btn btn-success disabled">{{QuestionDetail.MobileSystem}}</label>
          <label class="btn btn-primary disabled">{{QuestionDetail.AppVersion}}</label>
        </div>
        <div  class="clearfix" style="margin-top:20px;">
          <div class="form-group clearfix">
            <label class="col-sm-5 control-label">联系方式：</label>
            <label>{{QuestionDetail.MobilePhone}}</label>
          </div>
          <div class="form-group clearfix">
            <label class="col-sm-5 control-label">问题时间：</label>
            <label>{{QuestionDetail.FeedbackTime}}</label>
          </div>
          <div class="form-group clearfix">
            <label class="col-sm-5 control-label">问题类型：</label>
            <label>{{QuestionDetail.QuestionType}}</label>
          </div>
          <div class="form-group clearfix">
            <label class="col-sm-5 control-label">反馈次数：</label>
            <label>{{QuestionDetail.FeedbackTimes}}</label>
          </div>
          <div class="form-group clearfix">
            <label class="col-sm-5 control-label">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</label>
            <label>{{QuestionDetail.State}}</label>
          </div>
          <div class="form-group clearfix">
            <label class="col-sm-5 control-label">问题标题：</label>
            <label>{{QuestionDetail.QuestionTitle}}</label>
          </div>
          <div class="form-group clearfix">
            <label class="col-sm-5 control-label">反馈类型：</label>
            <label>{{QuestionDetail.FeedbackType}}</label>
          </div>
        </div>
      </div>
    </div>
    <div  v-show="!ShowLoading" class="pull-left" style="width:500px">
      <div class="list-group">
        <a href="javascript:void(0)" class="list-group-item margin-top"  v-for="(item2,index) in QuestionDetail.MessageDetailList" :key="index">
          <h4 class="list-group-item-heading">
            <label style="float:left" :class=" item2.MsgType === '反馈' ? 'gray' : 'red'">{{ item2.MsgType }}</label>
            <label  style="float:right;font-size:12px;font-weight:normal">{{item2.Time}}</label>
          </h4>
          <p class="list-group-item-text" style="clear:both" v-html='item2.Content.replace(/\"/g,"")'>

          </p>
        </a>
      </div>
      <div class="margin-top">
        <ue-editor :width="width" :height="height" :data="Data" @input="UeText">

        </ue-editor>
        <br/>
        <!-- <div>输出项为：{{inputData}}</div> -->
        <input class="btn btn-primary" type="button" value="回复" @click="Submit()" />
      </div>
      <img id="img" />
      <ul id="content"></ul>
    </div>
  </div>
  </div>
</template>

<script scoped>
  import api from '@/fetch/api'
  import UeEditor from '@/components/Share/UEeditor'
  import BackTemplate from './../../components/Share/WebApp/BackTemplate'
  import ClipLoader from './../../components/Share/ClipLoader'
var i = 0;
  export default {
    data(){
      return {
        IsActive:true,
        QuestionDetail:{
        },
        FAQId:1,
        ImgList:[],
        Content:"",
        Ext:"",
        ImageData:"",
        ImageResult:[],
        IsUser:false,
        Data: '',
        width: 500,
        height: 230,
        inputData: null,
        TopTitlesData:'帮助与反馈',
        SubTitlesData:'反馈详情'
      }
    },
    components:{
        UeEditor,
        BackTemplate,
        "clip-loder":ClipLoader
      },
    created:function(){
      this.FAQId = this.$route.query.FAQId;
      this.GetOnlineHelpDetail();
    },
    watch:{
      ImgList() {
          i++;
          this.ImageResult = this.ImgList
          var files = document.getElementById("file").files;
          if(i == files.length){
              this.InsertReply();
              i = 0;
          }
      }
    },

    methods:{
      loading(val) {
          this.ShowLoading=val
        },
      GetOnlineHelpDetail:function(){
        this.loading(true);
        var content = '{"UN":"'+ this.$store.state.Backstage.UN+'","SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"2b75deeccdac4afebb82b8b372add6b7","AccessToken":"'+ this.$store.state.Backstage.AccessToken+'","FAQId":'+this.FAQId+'}';
        api.GetOnlineHelpDetail(content,this)
          .then((response) => {
              this.QuestionDetail = response.ReturnValue;
              this.loading(false);
          }, (error) => {
            console.log(error)

          })
      },
      GetImgList:function(){ //调用上传图片接口
        var content = '{"UN":"'+ this.$store.state.Backstage.UN+'","SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"14161847aa344ceeab98b5fa1d7c9f78","AccessToken":"'+ this.$store.state.Backstage.AccessToken+'",';
        content = content + '"Ext":"'+this.Ext+'"'+ ',"ImageData":"'+this.ImageData+'"'+'}';
        api.UploadImg(content)
          .then((response) => {
              this.ImgList.push(response.ReturnValue)
          }, (error) => {
            //alert("请求失败")
            console.log(error)
          })
         return this.ImgList;
      },
      UeText: function (UEobj) {
            this.inputData = UEobj.content;
      },
      Submit:function(){
        this.InsertReply();
      },
      GetImgUrlList:function(){
        var files = document.getElementById("file").files;
        for(var i=0;i<files.length;i++){
          this.ImageData = "";
          var reader = new FileReader();
          reader.readAsDataURL(files[i]);
          reader.onload=(function(file){
              this.ImageData = file.target.result;
              var c = this.ImageData.split(',');
              var type =  this.ImageData.split(',')[0].split(';')[0].split('/')[1]
              this.Ext = type;
              this.ImageData = c[1];
              this.GetImgList();
          }.bind(this))
        }
      },
      InsertReply:function() {
        if(this.inputData == ""){
          alert("请输入回复内容")
        }else{
          this.inputData = JSON.stringify(this.inputData).replace(/\"/g,"'")
          var content = '{"UN":"'+ this.$store.state.Backstage.UN+'","SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"23d76d3394b34a6da42b9b72cd0a5857","AccessToken":"'+this.$store.state.Backstage.AccessToken+'",';
          content = content +'"DetailID":'+this.FAQId+',"Content":'+this.inputData+',"IsUser":'+this.IsUser+'}';
          api.AddOnlineHelp(content).then((response) => {
            this.GetOnlineHelpDetail();
            alert("回复成功")
            this.Data = "";
          }, (response) => {
            alert("失败")
          });
        }

      }

    }
  }
</script>

<style scoped src="./../../Common/Css/bootstrap.min.css">

</style>
<style scoped>
 label{
     font-weight:normal;
 }
  .content{

  }
  .margin-top{
    margin-top: 20px;
    word-wrap: break-word;
  }
  .list-group > a{
  border-radius: 8px;
  }
  .list-group > a:nth-child(odd) {
  background-color: #f9f9f9;
  /* color: purple; */
  }
  .list-group > a:nth-child(even) {
  background-color: white;
  /* color: black; */
  }
  /* .list-group > a:nth-child(odd) > h4 > label {
  color: #be5ce3;
  }
  .list-group > a:nth-child(even) > h4 > label {
  color: black;
  } */
  img{
  margin-left: 4px;
  }
  .desc{
  width:350px;
  min-height:100px;
  height: auto !important;
  border: 1px solid #ccc;
  border-radius:8px;
  padding-left: 6px;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-right: 4px;
  word-wrap:break-word
  }
  .red{
    color: #be5ce3;
}
.gray{
    color:black;
}
</style>

