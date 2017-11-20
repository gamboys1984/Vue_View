<template>
  <div class="backStyle">
    <mt-cell v-for="(data,i) in DataSource" :key="i" :title="data" is-link :to="LinkTo.length>i?LinkTo[i]:''" :listStyle="'mint-list'"></mt-cell>
  </div>
</template>
<script>
import {Cell} from 'mint-ui'
import 'mint-ui/lib/style.css'

export default {
  name: 'list',
  components: {
    MtCell: Cell
  },
  props: ['DataSource', 'LinkTo']
}
</script>
<style scoped>
.backStyle {
  margin: 10px;
  box-shadow: 0px 2px 5px #e1e1e1;
  border-radius: 5px;
}
</style>
