<template>
    <div><mt-cell v-for="(data,i) in DataSource" :key="i" :title="data[DataRule.title]" :label="convertDatatime(data[DataRule.timeTS])" is-link :to="LinkTo+'/'+data[DataRule.id]+(DataRule.param?('/'+data[DataRule.param]):'')"></mt-cell></div>
</template>
<script>
import { Cell } from 'mint-ui'
import { InfiniteScroll } from 'mint-ui';
import 'mint-ui/lib/style.css'
import Vue from 'vue'

Vue.use(InfiniteScroll);

export default {
  name: 'list',
  components: {
    MtCell: Cell
  },
  props: ['DataSource', 'DataRule', 'LinkTo'],
  data: function() {
    return {
      localData: []
    }
  },
  methods: {
    convertDatatime: function(data) {
      var date = new Date(data);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? ('0' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      return y + '-' + m + '-' + d;
    }
  }
}
</script>