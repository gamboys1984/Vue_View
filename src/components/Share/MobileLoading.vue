<template>
  <div class="loading">
      <mt-spinner type="fading-circle" color="gray" :size="40"></mt-spinner>
      <div class="worddiv">{{word}}</div>
  </div>
</template>

<script>
import { Spinner } from 'mint-ui';
export default {
    components: {
        MtSpinner:Spinner
    },
    props:["word"]
}
</script>

<style scoped>
    .loading{
        top: 50%;
        left: 50%;
        position: fixed;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        border-radius: 5px;
        /* background: rgba(0, 0, 0, 0.7); */
        color: white;
        box-sizing: border-box;
        text-align: center;
        z-index: 9999;
    }
    .worddiv{
        color: black;
        padding-top: 10px;
        margin-left: -10px;
    }
</style>
