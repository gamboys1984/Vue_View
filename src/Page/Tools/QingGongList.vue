<template>
  <div>

    <BackTemplate :TopTitles="TopTitles" :SubTitles="SubTitles"></BackTemplate>
    <label id="realBtn" class="inputLabel btn btn-info" style="margin-bottom: 10px;">
      <input type="file" id="file" name="file"
          @change="importf"  @click.native="hello" style="left:-9999px;position:absolute;"  />
      导入清宫表
    </label>
    <br />
    <clip-loder v-show="ShowLoading"></clip-loder>
    <table v-show="!ShowLoading" class="table table-hover table-bordered table-striped">
      <thead>
      <tr>
        <th v-for="(item,index) in TableHeadF" :key="index">
          {{item}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,index) in TableListF" :key="index">
        <td v-for="(item2,index2) in item" :key="index2"
          :style="item2=='男'?'background-color: #ddebf7;':(item2=='女'?'background-color: #ffeafe;':'')">{{item2}}</td>
      </tr>
    </tbody>
    </table>

  </div>
</template>

<script>
  import tableList from './../../components/zujian/table'
  import BackTemplate from './../../components/Share/WebApp/BackTemplate'
  import ClipLoader from './../../components/Share/ClipLoader'
  import api from '@/fetch/api'
  export default {
    data() {
      return {
        TableListF:[],
        TableHeadF:[],
        TableClassF:"",
        BtnListF:[],
        NotIncludeF:[],
        PrimaryKeyF:'ID',
        ShowLoading:true,
        TopTitles: '清宫表管理',
        SubTitles: '清宫表列表',
        PageSize:10,
        TotalCount:12,
        PageIndex:1,
        TableArry:[,],
        Base64:""
      }
    },
    components: {
      tableList,
      BackTemplate,
      "clip-loder":ClipLoader
    },
    created() {
      this.GetGrowBabyList();
    },
    methods: {
      UploadQingGong:function(){
        var data = '{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"b68a1aa2807f4c5c84143da64da74cb7","UN":"' + this.$store.state.Backstage.UN + '","AccessToken":"' + this.$store.state.Backstage.AccessToken
                  + '","TableData":"'+this.Base64 +'"}'
        api.UploadQingGong(data)
          .then((res) => {
            this.GetGrowBabyList();
          })
      },
      GetGrowBabyList:function(){
        var data = '{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"2cc350c2c33d49f79e6a53ca0aca37c8","UN":"' + this.$store.state.Backstage.UN + '","AccessToken":"' + this.$store.state.Backstage.AccessToken +'"}'
        api.GetQingGongList(data,this)
          .then((res) => {
            var column = res.ReturnValue.Month.length+1;
            var row = res.ReturnValue.Ages.length+1;
            var myarray = new Array();
            var ages = res.ReturnValue.Ages;
            var months = res.ReturnValue.Month;
            var length = res.ReturnValue.ArrayResult.length;
            var k=0;
            var treeCol=new Array();
            for(var i=0;i<row;i++){
              treeCol[i]=new Array();
              for(var j=0;j<column;j++){
                treeCol[i][j]=res.ReturnValue.ArrayResult[k];
                k++;
                if(k%column == 0){
                  break;
                }
              }
              if(k == length){
                break;
              }
            }
            treeCol[0][0] = "年龄"
            for(var j=0;j<treeCol.length;j++){
              this.TableHeadF=treeCol[0];
              if(j!=0){
                this.TableListF.push(treeCol[j])
              }
            }
            this.ShowLoading =false
          }, (error) => {
            console.log(error)
          })
      },
      ToUpdate:function(id){
        this.$router.push({ name: 'UpdateGrowUpBaby', query: {id: id}})
      },
      ToDelete:function(id,curretnIndex){
        var data = '{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"6f1986db91e343168f5d1d0647ccaaef","UN":"' + this.$store.state.Backstage.UN + '","AccessToken":"' + this.$store.state.Backstage.AccessToken
                  + '","OperatienType":"Delete'+ '","GrowUpId":'+id+'}'
        api.OperationGrowUpBaby(data)
          .then((res) => {
            if (res.Result == 1) {
              alert("删除成功")
              this.TableListF.splice(curretnIndex,1);
            }
          }, (error) => {
            console.log(error)
          })
      },
      ToDetail:function(id,txt,index,curretnIndex){
        if(txt == "编辑"){
          this.ToUpdate(id);
        }else{
          var del = confirm('确认删除吗？');
          if (del === true) {
            this.ToDelete(id,curretnIndex)
          }
        }
      },
      Getpagination:function(pageIndex){
        this.PageIndex=pageIndex;
        this.ShowLoading = true;
        this.$store.commit('Set_PageIndex', pageIndex)
        this.GetGrowBabyList();
      },
      importf:function(){
        var wb;//读取完成的数据
        var rABS = false; //是否将文件读取为二进制字符串
        var obj = document.getElementById("file").files;
        var a = document.getElementById("file");
        var file = obj[0];
        this.GetBase64(file)
      },
      GetBase64:function(files){  //将图片信息转为Base64
          var reader = new FileReader();
          reader.readAsDataURL(files);
          reader.onload=(function(file){
              var c = file.target.result.split(',');
              var type =  file.target.result;
              this.Base64 = c[1];
              this.ShowLoading =true;
              this.UploadQingGong()
              return type;

          }.bind(this))
      },
    }
  }
</script>

<style scoped src="../../Common/Css/bootstrap.min.css">

</style>
