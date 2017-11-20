<template>
  <div>

    <BackTemplate :TopTitles="TopTitles" :SubTitles="SubTitles"></BackTemplate>
    <router-link to="AddGrowUpBaby">
      <button class="btn btn-primary" style="margin-bottom:10px">
        添 加
      </button>
    </router-link>
    <clip-loder v-show="ShowLoading"></clip-loder>
    <tableList v-show="!ShowLoading" :BtnList="BtnListF" :tableList="TableListF" :NotInclude="NotIncludeF" :PrimaryKey="PrimaryKeyF"
      :tableHead="TableHeadF" :tableClass="'table table-hover table-bordered table-striped'"></tableList>
     <el-pagination v-show="!ShowLoading" ref="pagination"
      @current-change="Getpagination"
      :page-size="PageSize"
      layout="prev, pager, next, jumper"
      :current-page="PageIndex"
      :total="TotalCount">
    </el-pagination>
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
        TableHeadF:["体重(KG)","身高(CM)","头围(CM)","宝宝年份","宝宝月份","宝宝性别","创建时间","操作"],
        TableClassF:"",
        BtnListF:[],
        NotIncludeF:[],
        PrimaryKeyF:'ID',
        ShowLoading:true,
        TopTitles: '宝宝发育指标管理',
        SubTitles: '宝宝发育指标列表',
        PageSize:10,
        TotalCount:12,
        PageIndex:1
      }
    },
    components: {
      tableList,
      BackTemplate,
      "clip-loder":ClipLoader
    },
    created() {
      var pageIndex= this.$store.state.Detail.PageIndex
      if(pageIndex==""){
          this.$store.commit('Set_PageIndex', 1)
          pageIndex=1;
      }
      console.log(this.PageIndex)
      this.PageIndex=pageIndex
      this.GetGrowBabyList();
      var btn={BtnText:"",BtnClass:"",BtnStyle:""}
      btn.BtnText="编辑";
      btn.BtnClass="btn btn-primary";
      var btn2={BtnText:"",BtnClass:"",BtnStyle:""}
      btn2.BtnText="删除";
      btn2.BtnClass="btn btn-danger";
      this.BtnListF.push(btn)
      this.BtnListF.push(btn2)
    },
    methods: {
      GetGrowBabyList:function(){
        var data = '{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"24cd1672efe64a3b84031eecd6723221","UN":"' + this.$store.state.Backstage.UN + '","AccessToken":"' + this.$store.state.Backstage.AccessToken +'","GrowUpBabyId":"'+0+'","PageIndex":'+this.PageIndex+'}'
        console.log(data)
        api.GetGrowBabyList(data,this)
          .then((res) => {
            if (res.Result == 1) {
              this.TotalCount = res.ReturnValue.Count
              this.TableListF = res.ReturnValue.GrowUpBabyInfoListInfo
              this.NotIncludeF.push("ID");
            }
            this.ShowLoading =false
          }, (error) => {
            console.log(error)
          })
      },
      ToUpdate:function(id){
        console.log(this.$router)
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
        console.log(pageIndex)
        this.PageIndex=pageIndex;
        this.ShowLoading = true;
        this.$store.commit('Set_PageIndex', pageIndex)
        this.GetGrowBabyList();
      }
    }
  }
</script>

<style scoped src="../../Common/Css/bootstrap.min.css">

</style>
