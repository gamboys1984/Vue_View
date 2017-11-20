<template>
  <div>
    <back-template :TopTitles="TopTitles" :SubTitles="SubTitles"></back-template>
    <div class="addDetails">
      <addandedit :expandkey="0" :checkkey="0" :Titles="titles" :width="width" :height="height" :Selectpro="selectpro" @Sendata="addHD">
      </addandedit>
    </div>
  </div>
</template>
<script>
import addandedit from '@/components/Help&FAQ/addandedit'
import BackTemplate from '@/components/Share/WebApp/BackTemplate'
import api from '@/fetch/api'
export default {
  name: 'add',
  components: {
    addandedit,
    BackTemplate
  },
  methods: {
    // 接收子组件传来的参数 调用接口
    // upQueId 选中的树形节点
    // upData 富文本编辑器文本 
    // upSelectpro 选择的项目
    // upTitles 问题内容
    addHD(upQueId, upData, upSelectpro, upTitles) {
      this.QuePathsID = upQueId
      this.UeTextData = upData
      this.UpProject = upSelectpro
      this.Titles = upTitles
      var data = '{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"ded2ab7b24034ada8f02f7c7c1e739d4","UN":"' + this.$store.state.Backstage.UN + '","AccessToken":"' + this.$store.state.Backstage.AccessToken + '","QuestionID":"0","Project":"' + this.UpProject + '","Title":"' + this.Titles + '","Content":' + this.UeTextData + ',"QuePathsID":"' + this.QuePathsID + '"}'

      api.SetHelpDetail(data, this)
        .then((res) => {
          if (res.Result != 1) {
            this.$message({
              showClose: true,
              message: '添加失败',
              type: 'error'
            })
          }
          else {
            this.$message({
              showClose: true,
              message: '添加成功',
              type: 'success',
            })
          }
          this.$router.replace('maintain')
        }, (error) => {
          console.log(error)
        })
    }
  },
  data() {
    return {
      TopTitles: '问题管理',
      SubTitles: '添加问题',
      QuePathsID: 0,
      UeTextData: '',
      Titles: '',
      UpProject: '',
      selectpro: '成长日记', // 默认选择项目
      titles: '', // 问题
      proinfo: [], // 存放所有数据
      width: 730,
      height: 223,
    }
  },
  mounted: function() {
    setTimeout(function() { this.$emit('frameHeight') }.bind(this), 100)
    //this.$emit('frameHeight')
  }
}
</script>


