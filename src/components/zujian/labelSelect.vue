<template>
  <div :class="divClass" :style="divStyle">
    <label :class="labelClass" :style="labelStyle">{{labelTxt}}</label>
    <select v-model="value" :class="selectClass" :style="selectStyle">
      <option v-for="(item,index) in optionDataList" :key="index" :value="index">{{item}}</option>
    </select>
  </div>
</template>

<script scoped>
  export default {
    props:['divClass','divStyle','labelClass','labelStyle','labelTxt','selectModel','selectClass','optionDataList','selectStyle'],
    data() {
      return {
        value:this.selectModel
      }
    },
    watch:{
        value : function (val) {
          this.$emit('input', val)
        },
        selectModel:function(val){
          this.value=this.selectModel
        //  console.log(this.value)
        }
    }
  }
</script>

 <style scoped>

 </style>
