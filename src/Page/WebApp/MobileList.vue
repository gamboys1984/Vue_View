<template>
    <div>
        <mobile-data-list v-show="!IsShowList" :DataSource="DataSource" :LinkTo="LinkTo"></mobile-data-list>
        <MobileLoading v-show="IsShowList" :word="DataF"></MobileLoading>
    </div>
</template>

<script>
import MobileDataList from '@/components/WebApp/questionDataList'
import MobileLoading from '@/components/Share/MobileLoading'
import api from '@/fetch/api'
import { Spinner } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
    name: 'test',
    components: {
        MobileDataList,
        MobileLoading
    },
    data: function () {
        return {
            DataSource: '' ,
            LinkTo:'FAQDetail',
            IsShowList:true,
            DataF:"正在加载…"
        }
    },
    created:function(){
        this.$emit('GetTitle','我的问题');
        this.GetQuestionList();
    },
    methods: {
        GetQuestionList:function(){
          var content = '{"UN":"'+process.env.UN+'","SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"f2ee47b19ef949a5b0c27d51b1e043c6","AccessToken":"'+process.env.AccessToken+'","IsAdmin":""}';
          api.GetOnlineHelpList(content)
            .then((response) => {
              if(response.Result == 1){
                this.DataSource = response.ReturnValue;
                this.IsShowList = false;
              }else{
                this.IsShowList = false;
                MessageBox.alert("加载失败，请稍候重试","提示");
              }
            }, (error) => {
              console.log(error)
              this.IsShowList = false;
            })
        }
    }
}
</script>

<style scoped>

</style>
