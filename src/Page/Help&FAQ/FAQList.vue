<template>
<div id="app1">

    <BackTemplate :TopTitles="TopTitlesData" :SubTitles="SubTitlesData"></BackTemplate>
    <search v-on:SearchData="SearchDataHome" :SearchDetail="Search.SearchSelectHome"></search>
    <clip-loder v-show="ShowLoading"></clip-loder>
    <tableList v-show="!ShowLoading" :tableStyle="'font-size:12px;'" :TableHead="TableHeadF"
        :TableList="filterShoppingList"  :tableClass="'table table-hover table-bordered'"
        :NotInclude="NotIncludeF" :BtnList="BtnListF" :PrimaryKey="PrimaryKeyF"></tableList>
    <el-pagination v-show="!ShowLoading" ref="pagination"
      @current-change="Getpagination"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="TotalCount">
    </el-pagination>
</div>
</template>


<script scoped>
import api from '@/fetch/api'
import search from './../../components/Help&FAQ/search'
import tableList from './../../components/zujian/table'
import BackTemplate from './../../components/Share/WebApp/BackTemplate'
import ClipLoader from './../../components/Share/ClipLoader'
export default {
  data() {
        return {
            ShowLoading: true,
            tableList: [],
            filterShoppingList: [],
            Search: {
              QuestionTitle: '',
              MobileModel: '',
              MobileSystem: '',
              AppVersion: '',
              FAQType: '0',
              XiangmuType: '0',
              State: '2',
              CreateTime: '',
              SearchSelectHome: []
                  },
            CurrentPageIndex: 0,
            TotalCount: 0,
            pageSize: 10,
            TopTitlesData: '帮助与反馈',
            SubTitlesData: '反馈列表',
            TableHeadF:["APP版本","反馈类型","问题类型","问题标题","详细描述","手机型号","手机系统","状态","问题时间","处理时间","反馈次数","操作"],
            PrimaryKeyF:"FAQID",
            NotIncludeF:["FAQID","Time","Count"],
            BtnListF:[]
        }
    },
  components: {
        search,
        tableList,
        BackTemplate,
        "clip-loder":ClipLoader
      },
    methods: {
        ToDetail:function (obj) {
          //   var a = confirm('确认跳转页面吗？');
          //   if ( a === true) {
          this.$router.push({ name: 'Detail', query: {FAQId: obj}})
          //   }
        },
        loading(val) {
          this.ShowLoading=val
        },
        Getpagination(CurrentID) {
           this.CurrentPageIndex = CurrentID
           this.GetOnlineHelpList();
        },
        GetOnlineHelpList:function(){
          this.loading(true);
          var searchInfo = this.Search
          var pageIndex = this.CurrentPageIndex
          var content = '{"UN":"'+ this.$store.state.Backstage.UN+'","SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"f2ee47b19ef949a5b0c27d51b1e043c6","AccessToken":"'+ this.$store.state.Backstage.AccessToken+'","IsAdmin":"admin",';
          content = content + '"XiangmuType":"'+searchInfo.XiangmuType+'"'+ ',"FAQType":"'+searchInfo.FAQType+'"'+ ',"QuestionTitle":"'+searchInfo.QuestionTitle+'"'+ ',"State":"'+searchInfo.State
          + '","MobileModel":"'+searchInfo.MobileModel+ '","MobileSystem":"'+searchInfo.MobileSystem+ '","AppVersion":"'+searchInfo.AppVersion+'","CreateTime":"'+searchInfo.CreateTime
          + '","PageIndex":"'+pageIndex+'"'+'}';
          api.GetOnlineHelpList(content,this)
            .then((response) => {
              this.tableList = response.ReturnValue;
              this.filterShoppingList = response.ReturnValue;
              if (response.ReturnValue.length > 0) {
                this.TotalCount = response.ReturnValue[0].Count
          } else {
                this.TotalCount = 0
              }
              this.loading(false);
              // }
            }, (error) => {
              //alert("请求失败")
              console.log(error)
            })
        },
        SearchDataHome: function(data) {
          this.CurrentPageIndex = 1;
          this.Search = data
          this.Search.SearchSelectHome = data.SearchDetail
          this.GetOnlineHelpList()
        },
        GetSystemSetting:function(){
          var content2='{"UN":"'+ this.$store.state.Backstage.UN+'","SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"9bd75cb66db64e62b3944f043f3fe6a5","AccessToken":"'+ this.$store.state.Backstage.AccessToken+'"}'
          api.GetSystemSetting(content2,this)
            .then((response) => {
               this.Search.SearchSelectHome = response.ReturnValue;
            }, (error) => {
             // alert("请求失败")
              console.log(error)
            })
        }
    },
  created: function() {
      this.GetSystemSetting()
      this.GetOnlineHelpList()
      var btn = {BtnText:"",BtnClass:"",BtnStyle:""}
      btn.BtnText="查看"
      btn.BtnClass="btn btn-info"
      this.BtnListF.push(btn)
  }
}
</script>

<style scoped src="../../Common/Css/bootstrap.min.css">

</style>
