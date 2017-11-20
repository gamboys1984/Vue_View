<template>
  <form class="form-inline form-search">
    <div class="form-group" style="margin-right: 30px;margin-bottom: 15px;">
        <strong class="SelTit">项目类型:</strong>
        <select v-model="Search.XiangmuType" class="form-control" style="width:200px;">
            <option value="0" selected="">全部</option>
            <option v-for="(item,index) in SearchDetail.ProjectTypeList" :key="index" :value="item.Value">
              {{item.Description}}
            </option>
          </select>
    </div>
    <div class="form-group" style="margin-right: 30px;margin-bottom: 15px;">
        <strong class="SelTit">反馈类型:</strong>
        <select v-model="Search.FAQType" class="form-control" style="width:200px;">
            <option value="0" selected="">全部</option>
            <option v-for="(item,index) in SearchDetail.FeedbackTypeList" :key="index" :value="item.Value">
              {{item.Description}}
            </option>
          </select>
    </div>
    <div class="form-group" style="margin-right: 30px;margin-bottom: 15px;">
        <strong class="SelTit">状&emsp;&emsp;态:</strong>
        <select v-model="Search.State" class="form-control" style="width:200px;">
            <option v-for="(item,index) in zhuangtaiList" :key="index" :value="index">{{item}}</option>
          </select>
    </div>
    <div class="form-group" style="margin-right: 30px;margin-bottom: 15px;">
        <strong class="SelTit">问题标题:</strong>
        <input type="text" v-model="Search.QuestionTitle" class="form-control"  style="width:200px;">
    </div>
    <div class="form-group" style="margin-right: 30px;margin-bottom: 15px;">
        <strong class="SelTit">版本号:&emsp;</strong>
        <input type="text" class="form-control" v-model="Search.AppVersion"  style="width:200px;" />
    </div>
    <div class="form-group" style="margin-right: 30px;margin-bottom: 15px;">
        <strong class="SelTit">手机型号:</strong>
        <input type="text" class="form-control" v-model="Search.MobileModel" style="width:200px;" />
    </div>
    <div class="form-group" style="margin-right: 30px;margin-bottom: 15px;">
        <strong class="SelTit">手机系统:</strong>
        <input type="text" class="form-control" v-model="Search.MobileSystem"  style="width:200px;" />
    </div>
    <div class="form-group" style="margin-right: 30px;margin-bottom: 15px;" >
        <strong class="SelTit">问题日期:</strong>
         <el-date-picker v-model="value1" type="date" placeholder="选择日期" :picker-options="pickerOptions0" @change="GetValue">
          </el-date-picker>
    </div>
    <div class="form-group" style="margin-right: 30px;margin-bottom: 15px;">
        <input class="btn btn-primary" type="button"  value="查找" @click="SearchMetond" />
    </div>
  </form>
</template>

<script>
export default {
  data () {
      return {
        pickerOptions0: {
          // disabledDate(time) {
          //   return time.getTime() < Date.now() - 8.64e7;
          // }
        },
        value1: '',
        zhuangtaiList:[
          '待回复','已回复','全部'
          ],
        Search:{
          QuestionTitle:'',
          MobileModel:'',
          MobileSystem:'',
          AppVersion:'',
          FAQType :'0',
          State :'2',
          XiangmuType:'0',
          CreateTime:''
      }
    }
  },
  props:['SearchDetail'],
  methods: {
    GetValue(datevalue) {
        console.log(datevalue)
       // alert(datevalue);
        this.Search.CreateTime = datevalue
        if((this.Search.CreateTime === undefined)){
          this.Search.CreateTime=''
        }
    },
    SearchMetond: function() {
        this.Search.SearchDetail = this.SearchDetail;
        this.$emit('SearchData',this.Search)
      }
  }
}
</script>
<style scoped src="../../Common/Css/bootstrap.min.css">

</style>
<style scoped>
.SelTit{
  font-weight:normal;
}
</style>


