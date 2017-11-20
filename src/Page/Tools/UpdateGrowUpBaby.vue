<template>
  <div>
      <back-template :TopTitles="TopTitles" :SubTitles="SubTitles"></back-template>
      <div  v-show="!ShowLoading">
          <LabelInput :divClass="'label_one'" :labelTxt="'月 :'"
              :inputModel="AddBabyInfo.Month" v-model="AddBabyInfo.Month" :inputClass="'AddAndEditData_input'" :inputDefault="'1-12'"></LabelInput>
           <LabelInput :divClass="'label_one'" :labelTxt="'年 :'"
                :inputModel="AddBabyInfo.Year" v-model="AddBabyInfo.Year" :inputClass="'AddAndEditData_input'" :inputDefault="'1-12'"></LabelInput>
          <LabelSelect :divClass="'label_two'" :labelTxt="'性别 :'"
                :selectModel="AddBabyInfo.Sex" v-model="AddBabyInfo.Sex" :selectClass="'AddAndEditData_select'" :optionDataList="SexList"></LabelSelect>
           <LabelInput :divClass="'label_two'" :labelTxt="'体重 :'"
                :inputModel="AddBabyInfo.Weight" v-model="AddBabyInfo.Weight" :inputClass="'AddAndEditData_input'" :inputDefault="'请输入体重'"></LabelInput>
          <LabelInput :divClass="'label_two'" :labelTxt="'身高 :'"
                :inputModel="AddBabyInfo.Height" v-model="AddBabyInfo.Height" :inputClass="'AddAndEditData_input'" :inputDefault="'请输入身高'"></LabelInput>
          <LabelInput :divClass="'label_two'" :labelTxt="'头围 :'"
                :inputModel="AddBabyInfo.HeadCirc" v-model="AddBabyInfo.HeadCirc" :inputClass="'AddAndEditData_input'" :inputDefault="'请输入头围'"></LabelInput>
        <fieldset style="width:60%;border: 1px solid silver;margin-left:66px;padding: .35em .625em .75em;">
          <legend style="    width: auto; border-bottom: none;">宝宝行为能力</legend>
           <div v-if="IsShowDiv" id="capacity" class="capacity">
              {{AddBabyInfo.CapacityList.Title}}
               <LabelInput :divStyle="'float:left'" :labelTxt="'标题 :'"
                  :inputModel="AddBabyInfo.CapacityList.Title" :inputClass="'AddAndEditData_input'" :inputDefault="'请输入标题'"></LabelInput>
              <LabelInput :labelTxt="'备注 :'"
                  :inputModel="AddBabyInfo.CapacityList.Remarks" :inputClass="'AddAndEditData_input'" :inputDefault="'请输入备注'"></LabelInput>
              <LabelTextArea :labelTxt="'内容 :'"
                  :areaModel="AddBabyInfo.CapacityList.Content" :areaClass="'AddAndEditData_textarea'" :areaRow="4" :areaCol="45"></LabelTextArea>
              <LabelInput :divClass="'infoId'" :divStyle="'display:none'" :labelTxt="'编号 :'"
                  :inputModel="AddBabyInfo.CapacityList.ID" :inputClass="'AddAndEditData_input infoIdValue'"></LabelInput>
          </div>
          <div v-if="!IsShowDiv" v-for="var (item,index) in AddBabyInfo.CapacityList" :key="index" :id="index == 0 ?'capacity':('capacity'+index)" class="capacity">
              <LabelInput :divStyle="'float:left'" :labelTxt="'标题 :'"
                  :inputModel="item.Title" :inputClass="'AddAndEditData_input'" :inputDefault="'请输入标题'"></LabelInput>
              <LabelInput :labelTxt="'备注 :'"
                  :inputModel="item.Remarks" :inputClass="'AddAndEditData_input'" :inputDefault="'请输入备注'"></LabelInput>
              <LabelTextArea :labelTxt="'内容 :'"
                  :areaModel="item.Content" :areaClass="'AddAndEditData_textarea'" :areaRow="4" :areaCol="45"></LabelTextArea>
              <LabelInput :divClass="'infoId'" :divStyle="'display:none'" :labelTxt="'编号 :'"
                  :inputModel="item.ID" :inputClass="'AddAndEditData_input infoIdValue'"></LabelInput>
          </div>
          <div id="AddCapacity" style="width:100%;text-align:center">
            <input type="button" id="AddCapacity" class="btn btn-info" @click="InsertCapacity" value="添加宝宝行为能力" style="" />
            <input type="button" id="AddCapacity" class="btn btn-danger" @click="DeleteCapacity" value="删除宝宝行为能力" style="" />
          </div>
        </fieldset>
        <LabelBtn  :divClass="'label_two'" :btnValue="'修改'"
              :btnClass="'btn btn-primary'" :divStyle="'clear:both;text-align:center'"></LabelBtn>
      </div>
      <ClipLoader v-show="ShowLoading"></ClipLoader>
    </div>
</template>

<script>
  import LabelInput from './../../components/zujian/labelInput'
  import LabelSelect from './../../components/zujian/labelSelect'
  import LabelTextArea from './../../components/zujian/labelTextArea'
  import LabelBtn from './../../components/zujian/labelBtn'
  import BackTemplate from './../../components/Share/WebApp/BackTemplate'
  import api from '@/fetch/api'
  import ClipLoader from './../../components/Share/ClipLoader'
  export default {
    data() {
      return {
        TopTitles: '宝宝发育指标管理',
        SubTitles: '修改宝宝发育指标信息',
        SexList:['男','女'],
        AddBabyInfo:{},
        NumCapacity:1,
        CapacityList:[],
        BabyId:0,
        IsShowDiv:false,
        ShowLoading:true
      }
    },
    components: {
      LabelInput,
      BackTemplate,
      LabelSelect,
      LabelTextArea,
      LabelBtn,
      ClipLoader
    },
    created() {
      var id = this.$route.query.id;
      this.BabyId=id;
      this.GetInfo(id)
      var capacitylist=document.querySelectorAll(".capacity")
      if(capacitylist.length>=1){
        this.NumCapacity = (capacitylist.length-1)
      }
    },
    methods: {
      InsertCapacity:function(){
        var node=document.getElementById("capacity").cloneNode(true);
        node.id="capacity"+this.NumCapacity;
        node.children[0].children[1].value = ""
        node.children[1].children[1].value = ""
        node.children[2].children[1].value = ""
        node.children[3].children[1].value = ""
        document.getElementById("AddCapacity").before(node);
        setTimeout(()=>{
          this.$emit('frameHeight')
        }, 100)
        this.NumCapacity++;
      },
      DeleteCapacity:function(){
        if(this.NumCapacity<=1){
          alert("至少保留一个")
        }else{
          var pre = document.getElementById("AddCapacity").previousSibling;
          pre.remove();
          setTimeout(()=>{
            this.$emit('frameHeight')
          }, 100)
          this.NumCapacity--;
        }
      },
      BtnClickF:function(txt){
          this.CapacityList=[]
          var capacitylist=document.querySelectorAll(".capacity")
          for(var i=0;i<capacitylist.length;i++){
            var biaoti = capacitylist[i].children[0].children[1].value
            var beizhu = capacitylist[i].children[1].children[1].value
            var neirong = capacitylist[i].children[2].children[1].value
            var id = capacitylist[i].children[3].children[1].value
            if(id == ""){
              id="0"
            }
            var capa = {Title:biaoti,Remarks:beizhu,Content:neirong,Id:id};
            this.CapacityList.push(capa)
            // console.l
          }
          var year = parseInt(this.AddBabyInfo.Year);
          var month = parseInt(this.AddBabyInfo.Month);
          if(year<0){
            alert("请输入不小于0的正确年数")
          }else if(month<0 || month>=12){
            alert("请输入0-11内正确月数")
          }else{
            this.ShowLoading=true
            this.OperationInfo();
          }
      },
      OperationInfo:function(){
        //console.log(this.AddBabyInfo)
        var capacity = "'"+JSON.stringify(this.CapacityList)+"'"
        var data = '{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"6f1986db91e343168f5d1d0647ccaaef","UN":"' + this.$store.state.Backstage.UN + '","AccessToken":"' + this.$store.state.Backstage.AccessToken
                  + '","OperatienType":"Update'+ '","Sex":"'+(this.AddBabyInfo.Sex+1)+ '","Month":"'+parseInt(this.AddBabyInfo.Month)
                  + '","Year":"'+parseInt(this.AddBabyInfo.Year)+ '","Weight":"'+this.AddBabyInfo.Weight+ '","Height":"'+this.AddBabyInfo.Height
                  + '","HeadCirc":"'+this.AddBabyInfo.HeadCirc+'","Capacity":' +capacity+',"GrowUpId":'+this.BabyId+'}'
        console.log(data)
        api.OperationGrowUpBaby(data)
          .then((res) => {
            this.ShowLoading=false;
            if (res.ReturnValue == 1) {
              //alert("添加成功")
              this.$router.push({ name: 'GrowUpBabyList'})
            }else if(res.ReturnValue == 0){
              alert("已存在相同的周期，请重新填写周期")
            }
          }, (error) => {
            console.log(error)
          })
      },
      GetInfo:function(id){
        var data = '{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"24cd1672efe64a3b84031eecd6723221","UN":"' + this.$store.state.Backstage.UN + '","AccessToken":"' + this.$store.state.Backstage.AccessToken +'","GrowUpBabyId":"'+id+'"}'
        api.GetGrowBabyList(data,this)
          .then((res) => {
            this.ShowLoading = false;
            if (res.Result == 1) {
              this.AddBabyInfo = res.ReturnValue
              this.AddBabyInfo.Sex = parseInt(res.ReturnValue.Sex)-1
              if(this.AddBabyInfo.CapacityList.length == 0){
                this.IsShowDiv=true
                this.AddBabyInfo.CapacityList.Title="";
                this.AddBabyInfo.CapacityList.Remarks="";
                this.AddBabyInfo.CapacityList.Content="";
                this.AddBabyInfo.CapacityList.ID="";
              }
            }
          }, (error) => {
            console.log(error)
          })
      }
    }
  }
</script>

<style src="../../Common/Css/bootstrap.min.css">

</style>
<style>
.AddAndEditData_input {
    margin: 8px;
    height: 34px;
    padding: 3px 6px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.AddAndEditData_select {
    margin: 8px;
    height: 34px;
    padding: 3px 6px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.AddAndEditData_textarea {
    margin: 8px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.label_one {
    position: relative;
    left: 83px;
}

.label_two {
    position: relative;
    left: 67px;
}

.label_three {
    position: relative;
    left: 52px;
}

.label_six {
    position: relative;
    bottom: 88px;
}
.capacity{
    border-bottom: 1px solid #cecece;
    margin-bottom: 4px
}
</style>

