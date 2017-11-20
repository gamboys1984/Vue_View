<template>
  <div>
      <mobile-data-list :DataSource="DataSource" :LinkTo="LinkTo"></mobile-data-list>
      <MobileLoading v-show="IsShow" :word="DataF"></MobileLoading>
  </div>
</template>

<script>
import api from "@/fetch/api"
import MobileLoading from '@/components/Share/MobileLoading'
import MobileDataList from "@/components/Share/WebApp/MobileDataList"
export default {
  name: "MobileProblemToDetail",
  components: {
    MobileDataList,
    MobileLoading
  },
  data() {
    return {
      DataSource: [],
      LinkTo: [],
      DataF:"正在加载…",
      IsShow:true
    }
  },
  beforeCreate() {
    let PageID = this.$route.path.replace(/[^0-9]/ig,"")
    let data =
      '{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"ec1c30a71e864e8eb3d7f577b655eb14","UN":"' + process.env.UN + '","AccessToken":"' + process.env.AccessToken + '","QuestionID":-1,"PageID":"0","PathID":' +
      PageID +
      "}"
    api.GetHelpDetail(data).then(
      res => 
      {
          if(res.Result==1 && res.ReturnValue!=0 ){
              let strArray=res.ReturnValue[0].QueString.split("/")

              if(strArray.length>0)
                this.$emit('GetTitle', strArray[0])
              else
                this.$emit('GetTitle', res.ReturnValue[0].QueString)

              let DataString=''
              let LinkString=''
              for (var key in res.ReturnValue) {
              this.DataSource.push(res.ReturnValue[key].helpDetailList.Title)
              this.LinkTo.push("../../mobile/details/" + res.ReturnValue[key].helpDetailList.ID)
              }
          }
            let params ='{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"a89911d051d341ccb29fa2a469b03ae8","UN":"' + process.env.UN + '","AccessToken":"' + process.env.AccessToken + '"}'
            api.GetProblemPath(params).then(res => {
                let array = res.ReturnValue.Quespaths[0].children
                
                array.forEach(function(element) {
                    if (element.ID == PageID) 
                    {
                        this.$emit('GetTitle', element.TypeName)
                        if (element.hasOwnProperty("children")) {
                            for (var index = 0; index < element.children.length; index++) {
                            let LinkStr = "../toDetail/" + element.children[index].ID
                            this.DataSource.push(element.children[index].TypeName)
                            this.LinkTo.push(LinkStr)
                            }
                        }
                    } 
                    else 
                    {
                        if (element.hasOwnProperty("children")) {
                            this.$emit('GetTitle', element.TypeName)
                            this.ForEachArray(element,PageID)
                        }
                    }
                }, this)
            })
          this.IsShow = false
      },error => {console.log(error)}
    )
    
  },
  methods: {
    ForEachArray(obj, ID) {
        if (obj.ID == ID) {
            if(obj.hasOwnProperty("children")){
                for (var index = 0; index < obj.children.length; index++) {
                let LinkStr = "../toDetail/" + obj.children[index].ID
                this.DataSource.push(obj.children[index].TypeName)
                this.LinkTo.push(LinkStr)
                }
            }
        }
        else
        {
            
            if(obj.hasOwnProperty("children")){
                for (var index = 0; index < obj.children.length; index++) {
                this.ForEachArray(obj.children[index],ID)
                }
            }
        }
    }
  }
};
</script>

<style>

</style>
