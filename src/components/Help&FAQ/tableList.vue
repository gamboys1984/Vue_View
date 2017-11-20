<template>
<table class="table table-hover table-bordered table-striped" style="font-size:12px;">
        <thead>
            <tr>
                <th>APP版本</th>
                <th>反馈类型</th>
                <th>问题类型</th>
                <th>问题标题</th>
                <th>详细描述</th>
                <th>手机型号</th>
                <th>手机系统</th>
                <th>状态</th>
                <th>问题时间</th>
                <th>处理时间</th>
                <th>反馈次数</th>
                <th>查看</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in List" :key="index">
                <td>{{ item.AppVersion }}</td>
                <td>{{ item.FeedbackType }}</td>
                <td>{{ item.QuestionType }}</td>
                <td>{{ item.QuestionTitle }}</td>
                <td>{{ item.Description }}</td>
                <td>{{ item.MobileModel }}</td>
                <td>{{ item.MobileSystem }}</td>
                <td>{{ item.State }}</td>
                <td>{{ item.CreateTime }}</td>
                <td>{{ item.ProcessingTime }}</td>
                <td>{{ item.FeedbackTimes }}</td>
                <td>
                    <button @click="ToDetail(item.FAQID)" class="btn btn-default btn-info">
                        查看
                    </button>
                </td>
            </tr>
        </tbody>
</table>  
</template>
<script>
export default {
  props: ['List'],
  methods:{
      ToDetail:function (obj) {
        //   var a = confirm('确认跳转页面吗？');
        //   if ( a === true) {
              this.$router.push({ name: 'Detail', query: {FAQId: obj}})
        //   }
          
      }
  }
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
