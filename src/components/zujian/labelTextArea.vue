<template>
  <div :class="divClass" :style="divStyle">
    <label :class="labelClass" :style="labelStyle">{{labelTxt}}</label>
    <textarea v-model="value" :class="areaClass" :rows="areaRow" :cols="areaCol" :placeholder="areaDefault" :style="areaStyle"></textarea>
  </div>
</template>

<script scoped>
  export default {
    props:['divClass','divStyle','labelClass','labelStyle','labelTxt','areaModel','areaClass','areaDefault','areaStyle','areaRow','areaCol'],
    data() {
      return {
        value:this.areaModel
      }
    },
    watch:{
        value : function (val) {
          this.$emit('input', this.value)
        },
        areaModel:function(val){
          this.value=this.areaModel
        }
    }
  }
</script>

 <style scoped>

 </style>
