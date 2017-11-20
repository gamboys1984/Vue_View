<template>
  <div>
    <back-template :TopTitles="TopTitles" :SubTitles="SubTitles"></back-template>
    <label>标签名称：</label> <input v-model="GetTagName" class="inpput" placeholder="请输入标签名称" />
    <br />
    <label>标签位置：</label> <input v-model="GetTagPosition" class="inpput" placeholder="请输入标签位置"/>

    <br />
    <el-button type="primary" @click="PostApi(TagName,TagPosition)" >提  交</el-button>
  </div>
</template>

<script>
import api from '@/fetch/api'
import BackTemplate from '@/components/Share/WebApp/BackTemplate'
export default {
  name: 'SetStickerLabel',
  components: {
    BackTemplate
  },
  data () {
    return {
      TopTitles: '贴纸标签管理',
      SubTitles: '添加贴纸标签',
      TagName: '',
      TagPosition: 0,
    }
  },
  created() {
    if(this.$route.path.toLowerCase().indexOf("edit")>0){
      this.SubTitles = '编辑贴纸标签'
      let StickerID = this.$route.path.replace(/[^0-9]/ig,"")
      let params = `{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"e8d0086cab684c9daeb38b09b8f8b88c","UN":"${this.$store.state.Backstage.UN}","AccessToken":"${this.$store.state.Backstage.AccessToken}","StickerID":"${StickerID}","PageID":"0"}`
      api.GetStickerTags(params,this)
        .then((res)=>{
          let Result
          Result = res.ReturnValue
          this.TagName = Result.label
          this.TagPosition = Result.position
        })
    }
  },
  computed: {
    GetTagName:{
      get(){
        return this.TagName
      },
      set(value){
        this.TagName = value
      }
    },
    GetTagPosition:{
      get(){
        return this.TagPosition==0?'':this.TagPosition
      },
      set(value){
        if(value.replace(/[^0-9]/ig,"")=='' && value!=''){
          this.$message({
            message: '请输入数字',
            type: 'warning'
          })
        }
        else
          this.TagPosition = value
      }
    }
  },
  methods: {
    PostApi(TagName,TagPosition){
      let data
      if(this.$route.path.replace(/[^0-9]/ig,"")=='')
        data = `{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"ca72ebcdcdc7425bafc48b3ca2e6aa00","UN":"${this.$store.state.Backstage.UN}","AccessToken":"${this.$store.state.Backstage.AccessToken}","TagsName":"${TagName}","CurrentPosition":"${TagPosition}"}`
      else
        data = `{"SC":"001cfe2fe044aa691d4e6eff9bfb56c","SV":"ca72ebcdcdc7425bafc48b3ca2e6aa00","UN":"${this.$store.state.Backstage.UN}","AccessToken":"${this.$store.state.Backstage.AccessToken}","TagsName":"${TagName}","CurrentPosition":${TagPosition},"EditID":${this.$route.path.replace(/[^0-9]/ig,"")}}`

      api.SetStickerTags(data)
        .then((res)=>{
          if(res.Result==1){
            this.$message({
              message: '成功',
              type: 'success'
            })
          }
          else{
            this.$message.error('失败')
          }
        })
    }
  },
  mounted () {
    setTimeout(()=>{
        this.$emit('frameHeight')
    }, 500)
  }
}
</script>

<style scoped>
.inpput {
    margin: 8px;
    height: 28px;
    padding: 3px 6px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>
