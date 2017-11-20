<template>
  <table :class="tableClass" :style="tableStyle">
    <thead>
      <tr>
        <th v-for="(item,index) in tableHead" :key="index">
          {{item}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,index) in tableList" :key="index">
        <td v-if="IsShow(index2)" v-for="(item2,index2) in (index=GetIndex(item),item)"  :key="index2">
          {{ item2 }}
        </td>
         <td v-if="BtnList!=undefined&&BtnList.length>0">
          <button v-for="(btn,index3) in BtnList" :key="index3" @click="BtnClick(index,btn.BtnText,index3)" :class="btn.BtnClass" :style="btn.BtnStyle" style="margin-right:4px">
             {{btn.BtnText}}
          </button>
        </td>

      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['tableList','tableHead','tableClass','tableStyle','BtnList','NotInclude','PrimaryKey'],
  data() {
    return {
      TableComputed:[]
    }
  },
  methods:{
    GetIndex:function(item){        //获取指定的主键列的值，并赋值
      return item[this.PrimaryKey];
    },
    IsShow:function(item2){     //判断当前列是否显示
      if(this.NotInclude==undefined){
        return true;
      }else{
        var isshow2 = this.NotInclude.indexOf(item2)
        if(isshow2>=0){
          return false;
        }else{
          return true;
        }
      }

    },
    BtnClick:function(id,txt,index){  //id为唯一标识，txt为按钮上的文字，index为当前按钮的索引值
      var curretnIndex=0;  //当前数据的索引
      console.log("id前="+id)
      for(var i=0;i<this.tableList.length;i++){
        // console.log("i="+i)
        // console.log(this.TableList[i])
        if(this.tableList[i][this.PrimaryKey]==id){
          // console.log("来获取索引了啊"+i)
          curretnIndex=i;
        }
      }
      this.$parent.ToDetail(id,txt,index,curretnIndex)
    },
  },
}
</script>

<style scoped src="../../Common/Css/bootstrap.min.css">

</style>
<style>
.table th{
    font-weight: normal;
}
.table{
    font-size:14px;
}
</style>
