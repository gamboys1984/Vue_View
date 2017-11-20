<template>
  <div :class="divClass" :style="divStyle">
    <label :class="labelClass" :style="labelStyle">{{labelTxt}}</label>
    <input type="text" :class="inputClass" :placeholder="inputDefault" v-model="inputValue"  :style="inputStyle">
  </div>
</template>

<script scoped>
  export default {
    props:['divClass','divStyle','labelClass','labelStyle','labelTxt','inputModel','inputClass','inputDefault','inputStyle'],
    data() {
      return {
        inputValue:this.inputModel
      }
    },
    watch:{
        inputValue : function (val) {
          this.$emit('input', this.inputValue)
        },
        inputModel:function(val){
          this.inputValue = this.inputModel
        }
    }
  }
</script>

 <style scoped>

 </style>
