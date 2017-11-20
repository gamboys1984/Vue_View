<template>
<div>
  <div @click="goback">返回</div>
</div>
</template>

<script>
export default {
  name: 'test1',
  methods: {
    goback () {
      this.$router.goBack()
    }
  },
  created:function(){
        this.$emit('GetTitle','456')
    }
}
</script>