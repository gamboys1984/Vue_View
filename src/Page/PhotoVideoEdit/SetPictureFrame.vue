<template>
  <div>
    <back-template :TopTitles="TopTitles" :SubTitles="SubTitles"></back-template>

    <label>画框名称：</label> <input class="inpput" placeholder="请输入画框名称" />
    <br />
    <label>在画框中的位置：</label> <input class="inpput" placeholder="请输入画框位置"/>

    <br />
    <label style="float: left;">上传图片：</label>
    <el-upload
    class="upload-demo"
    ref="upload"
    action="https://jsonplaceholder.typicode.com/posts/"
    list-type="picture"
    :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="handleFileChange" >上传到服务器</el-button>
    </el-upload>

    <br />
    <el-button type="primary" >提  交</el-button>
  </div>
</template>

<script>
import BackTemplate from '@/components/Share/WebApp/BackTemplate'
export default {
  name: 'SetPictureFrame',
  components: {
    BackTemplate
  },
  data () {
    return {
      TopTitles: '画框管理',
      SubTitles: '画框编辑',
      ImageData:[],
      Ext:[],
      imglist1:[],
    }
  },
  methods: {
    GetImgUrl(files){  //将图片信息转为Base64
        var reader = new FileReader();
        reader.readAsDataURL(files);
        reader.onload=((file) => {
            var c = file.target.result.split(',');
            var type =  file.target.result.split(',')[0].split(';')[0].split('/')[1]
            if(type == "jpg"||type=="jpeg"||type=="gif"||type=="png"){
                this.Ext.push(type);
                this.ImageData.push(c[1]);
            }
        })
    },
    handleFileChange(){  //file文件改变事件
        var files = this.$refs.upload.uploadFiles[0].raw
        var url = ""
        var type = files.type
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(files)
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(files)
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(files)
        }
        if(type === "image/jpg"||type==="image/jpeg"||type==="image/png"||type==="image/gif"){
            this.imglist1.push(url)
            this.GetImgUrl(files)
        }else{
            MessageBox.alert("不支持该类型文件", "提示")
        }
        console.log(this.ImageData)
        console.log(this.Ext)
    }
  },
  mounted () {
    setTimeout(()=>{
        this.$emit('frameHeight')
    }, 500)
  }
}
</script>

<style scoped>
.inpput {
    margin: 8px;
    height: 28px;
    padding: 3px 6px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.inputLabel{
    width: 56px;
    height: 56px;
    text-align: center;
    line-height: 1.432;
    font-size: 32px;
    display:block;
    border: 1px dashed #dbdbdc;
    color: #dad9d7;
    float:left;
    -webkit-touch-callout: none;
    font-weight: normal;
}
</style>
