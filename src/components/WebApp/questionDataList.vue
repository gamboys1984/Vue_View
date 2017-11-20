<template>
    <div  class="backStyle">
        <mt-cell v-for="(data,i) in DataSource" :key="i" :title="data.QuestionTitle" :label="data.Description"
             :to="LinkTo+'/'+data.FAQID+'/'+data.QuestionTitle">
             <div class="mtValue" style="display:block;text-align:right;padding-right: 10px;">
                <div>{{data.ProcessingTime.substring(0,10)}}</div>
                <div class="marginTop"
                    :style=" (GetSessionValue(data.FAQID,data.State,data.Time) == true) ? 'color:gray' :  (data.State=='待回复'?'color:#26a2ff' : 'color:red') ">{{data.State}}</div>
             </div>
        </mt-cell>
    </div>
</template>
<script>
import { Cell  } from 'mint-ui'
import 'mint-ui/lib/style.css'
export default {
    name:'list',
    components:{
        MtCell:Cell
    },
    props:['DataSource','LinkTo'],
    methods: {
        ToDetail:function (obj) {
          var a = confirm('确认跳转页面吗？');
          if ( a === true) {
              this.$router.push({ name: 'QuestionDetail', query: {FAQId: obj}})
          }
        },
        GetSessionValue:function(FAQId,state,time){
            var sessionValue = localStorage.getItem(process.env.UN+FAQId) ;
            if(sessionValue == time && state == "已回复"){
                return true;
            }else{
                return false;
            }
        }
    }
}
</script>
<style scoped>
.backStyle{
    margin:10px;
    box-shadow: 0px 2px 5px #e1e1e1;
    border-radius:5px;
    padding: 0 2%;
    background-color: white;
    overflow:auto;
}
.marginTop{
  margin-top:6px;
  font-size: 12px;
}
.mint-cell-wrapper{
    padding: 10px 5px;
}
</style>
