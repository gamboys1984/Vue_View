<template>
  <div>
    <div>
      <span>项 目</span>
      <select v-model="Selectpro">
        <option v-for="(item,i) in project" :key="i">{{item.pro}}</option>
      </select>
      <br />
      <div class="AandE_span">

      </div>
      <span class="AandE_span">问 题</span>
      <br />
      <input placeholder="请输入问题" v-model="Titles"></input>

      <br />
      <div class="AandE_span">

      </div>
      <span>问 题 路 径</span>
      <br />
      <!-- <div class="div-bor">
                              <i class="icon-user" @click.stop="Show()"></i>
                              <input class="user" @click.stop="Show()" v-model="CascaderLabel" />
                            </div> -->
    </div>

    <!-- <el-tree @check-change="GetTreeNodeLabel" v-show="isShow" ref="tree" :data="quespaths" show-checkbox node-key="id" :default-expanded-keys="[GetExpand]" :default-checked-keys="[GetCheck]">
                          </el-tree> -->
    <el-cascader ref="cascader" :options="quespaths" v-model="CascaderLabel"></el-cascader>
    <router-link to="SetProblemPaths">
      <button class="btn btn-default btn-info" >添加/编辑</button>
    </router-link>
    <br />
    <span>帮 助 内 容</span>
    <ue-editor :width="width" :height="height" :data="ShowUeData" v-model="UeText"></ue-editor>
    <center>
      <button class="btn btn-default btn-info" :style="btnstyle" @click="Sendata(UeData,Selectpro,Titles)">提 交</button>
    </center>
  </div>
</template>
<script>
import UeEditor from '@/components/Share/UEeditor'
import api from '@/fetch/api'
export default {
  watch: {
    DefaultValue(newValue, oldValue) {
      this.CascaderLabel = newValue
    }
  },
  beforeCreate() {
    var data = '{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"a89911d051d341ccb29fa2a469b03ae8","UN":"'+ this.$store.state.Backstage.UN+'","AccessToken":"'+ this.$store.state.Backstage.AccessToken+'"}'
    api.GetProblemPath(data)
      .then((res) => {
        if (res.Result == 1) {
          let array = res.ReturnValue.Quespaths[0].children
          array.forEach(function(element) {
            element.value = element.ID
            element.value = element.value.toString()
            element.label = element.TypeName
            delete element.ID
            delete element.TypeName

            this.ForeachArray(element)
          }, this);

          this.quespaths = array
        }
      }, (error) => {
        console.log(error)
      })
  },
  name: 'addandedit',
  props: ['Selectpro', 'width', 'height', 'Titles', 'DefaultValue'],
  components: {
    UeEditor
  },
  data() {
    return {
      test: String,
      CascaderLabel: [],
      quespaths: [],// 问题路径
      TheSelected: 0,
      UeText: '', // 富文本编辑器输入内容
      UeData: '', // 富文本编辑器缓存内容
      // expandkey: 0,
      // checkkey: 0,
      btnstyle: {
        margin: '10px auto'
      },
      project: [   // 项目
        { pro: '成长日记' },
        { pro: '宜生活' },
        { pro: '关爱' }
      ]
    }
  },
  methods: {
    // 向接口传参数 
    // newData 富文本编辑器文本 
    // newSelectpro 选择的项目
    // newTitles 问题内容
    Sendata(newData, newSelectpro, newTitles) {
      newData = this.UeText.content
      this.TheSelected = this.$refs.cascader.value.pop()
      if(newTitles==''){
        this.$message({
          message: '问题不能为空, 请添加 !',
          type: 'warning'
        })
      }
      if(this.TheSelected==null){
        this.$message({
          message: '问题路径不能为空, 请添加 !',
          type: 'warning'
        })
      }
      else{
        localStorage.setItem('ContentText', JSON.stringify(newData))
        this.$emit("Sendata", this.TheSelected, JSON.stringify(newData).replace(/\"/g, "'"), newSelectpro, newTitles)
      }
      
    },
    ForeachArray(obj) {
      if (obj.hasOwnProperty('children')) {
        for (var index = 0; index < obj.children.length; index++) {
          obj.children[index].value = obj.children[index].ID
          obj.value = obj.value.toString()
          obj.children[index].label = obj.children[index].TypeName
          delete obj.children[index].ID
          delete obj.children[index].TypeName
          this.ForeachArray(obj.children[index])
        }
      }
      if (obj.ParentID > 0 && !obj.hasOwnProperty('children')) {
        obj.value = obj.value.toString()
      }
    },
    // GetTreeNodeLabel() {
    //   let TreeLabel = ''
    //   for (var index = 0; index < this.$refs.tree.getCheckedNodes().length; index++) {
    //     TreeLabel += this.$refs.tree.getCheckedNodes()[index].label + "，"
    //   }
    //   this.CascaderLabel = TreeLabel.substring(0, TreeLabel.length - 1)
    // }
  },
  destroyed() {
    localStorage.clear()
  },
  computed: {
    // 富文本编辑器显示内容
    ShowUeData() {
      switch (this.$route.name) {
        case 'edit':
          if (localStorage.getItem('ContentText').substring(0, 4).indexOf("'") > 0)
            this.UeData = localStorage.getItem('ContentText').substring(2, localStorage.getItem('ContentText').length - 2)
          else
            this.UeData = localStorage.getItem('ContentText').replace(/\"/g, "")
          break
        case 'add':
          this.UeData = ''
          break
        default:
          break;
      }
      return this.UeData
    }
    // ,
    // GetDefault: {
    //   get() {
    //     return this.DefaultValue
    //   },
    //   set(value) {
    //     this.CascaderLabel=value
    //   }
    // }
    // ,
    // GetTitles: {
    //   get() {
    //     return this.DefaultValue
    //   },
    //   set(value) {
    //     this.CascaderLabel=value
    //   }
    // }
    // this.expandkey = localStorage.getItem('PathTop').replace(/\"/g, "")
    //     this.checkkey = localStorage.getItem('PathBot').replace(/\"/g, "")

    // 树形展开节点
    // GetExpand() {
    //   switch (this.$route.name) {
    //     case 'edit':
    //       this.expandkey = localStorage.getItem('PathTop').replace(/\"/g, "")
    //       this.checkkey = localStorage.getItem('PathBot').replace(/\"/g, "")
    //       break
    //     case 'add':
    //       this.expandkey = 0
    //       break
    //     default:
    //       break;
    //   }
    //   return this.expandkey
    // },
    // 树形选中节点
    // GetCheck() {
    //   switch (this.$route.name) {
    //     case 'edit':
    //       this.checkkey = localStorage.getItem('PathBot').replace(/\"/g, "")

    //       break
    //     case 'add':
    //       this.checkkey = 0
    //       break
    //     default:
    //       break;
    //   }
    //   return this.checkkey
    // }
  }
}
</script>
<style scoped src="../../Common/Css/bootstrap.min.css">

</style>

<style scoped>
.button {
  margin: 10px auto
}

.div-bor {
  position: relative;
  width: 200px;
}

.AandE_span {
  margin: 10px auto;
}

.icon-user {
  position: absolute;
  left: 0;
  z-index: 5;
  background-image: url('/static/SearchButton.png');
  /*引入图片图片*/
  background-repeat: no-repeat;
  /*设置图片不重复*/
  background-position: 5px 5px;
  /*图片显示的位置*/
  width: 22px;
  /*设置图片显示的宽*/
  height: 22px;
  /*图片显示的高*/
}

.user {
  padding-left: 25px;
}
</style>

