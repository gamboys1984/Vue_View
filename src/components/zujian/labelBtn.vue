<template>
  <div :class="divClass" :style="divStyle">
    <label :class="labelClass" :style="labelStyle">{{labelTxt}}</label>
    <input type="button" :class="btnClass" :value="btnValue"  :style="btnStyle" @click="BtnClick(btnValue)">
  </div>
</template>

<script scoped>
  export default {
    props:['divClass','divStyle','labelClass','labelStyle','labelTxt','btnValue','btnClass','btnStyle'],
    methods:{
      BtnClick:function(txt){
        this.$parent.BtnClickF(txt);
      }
    }
  }
</script>

 <style scoped>

 </style>
