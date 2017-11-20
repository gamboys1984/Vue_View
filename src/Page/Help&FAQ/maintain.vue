<template>
  <div>
    <back-template :TopTitles="TopTitles" :SubTitles="SubTitles"></back-template>
    <div class="maintain">
      <div class="matain_spin">
        <span>内 容：</span>
        <input placeholder="输入想要搜索的内容" class="matain_input" v-model="search" />
        <router-link to="add">
          <button class="btn btn-primary" :style="inputstyle">
            添 加
          </button>
        </router-link>
      </div>
      <table border="1" class="table table-hover table-bordered table-striped" :style="tablestyle">
        <tbody>
          <tr>
            <td>项 目</td>
            <td>问 题</td>
            <td>问 题 路 径</td>
            <td>详 情 链 接</td>
            <td>修 改 人</td>
            <td>修 改 时 间</td>
            <td>操 作</td>
          </tr>
          <tr v-show="!ShowLoading" v-for="(item ,index) in Convert " :key="index">
            <td>{{item.ProName}}</td>
            <td>{{item.helpDetailList.Title}}</td>
            <td>{{item.QueString}}</td>
            <td>{{current_url}}/{{item.helpDetailList.ID}}</td>
            <td>{{item.ModifyName}}</td>
            <td>{{item.ModifyTime}}</td>
            <button class="btn btn-default btn-info" @click="DelTable(index,item.helpDetailList.ID)">
              删 除
            </button>
            <button class="btn btn-default btn-info" :style="style" @click="Send(item.helpDetailList.ID)">
              编 辑
            </button>
          </tr>
        </tbody>
      </table>  
      <el-pagination v-show="proinfo!=''?!ShowLoading:false" class="maintain_pagination" ref="pagination" @current-change="Getpagination" :page-size="10" layout="prev, pager, next, jumper" :total="search==''?proinfo!=''?proinfo[0].PageCount:0:SearchCount">
      </el-pagination>
    </div>
    <clip-loder v-show="ShowLoading"></clip-loder>
  </div>
</template>

<script scoped>
import api from '@/fetch/api'
import ClipLoader from '@/components/Share/ClipLoader'
import BackTemplate from '@/components/Share/WebApp/BackTemplate'
export default {
  name: 'maintain',
  components: {
    BackTemplate,
    "clip-loder": ClipLoader
  },

  created() {
    //  调用详情接口
    if(process.env.API_URL.indexOf('dev')>0)
    {
      this.current_url="192.168.10.13:811/mobile/details"
    }
    if(process.env.API_URL.indexOf('int')>0)
    {
      this.current_url="czrjint.iemylife.com/webapp/mobile/details"
    }
    var data = `{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"ec1c30a71e864e8eb3d7f577b655eb14","UN":"${this.$store.state.Backstage.UN}","AccessToken":"${this.$store.state.Backstage.AccessToken}","QuestionID":0,"PageID":"0"}`
    api.GetHelpDetail(data)
      .then((res) => {
        if (res.Result == 1) {  
          this.proinfo = res.ReturnValue
        }
        this.loading(false)
      }, (error) => {
        console.log(error)
      })
  },
  beforeMount() {
    // 取出全部问题
    var data = '{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"ec1c30a71e864e8eb3d7f577b655eb14","UN":"' + this.$store.state.Backstage.UN + '","AccessToken":"' + this.$store.state.Backstage.AccessToken + '","QuestionID":-1,"PageID":"0"}'
    api.GetHelpDetail(data,this)
      .then((res) => {
        this.ShowSearch = res.ReturnValue
      }, (error) => {
        console.log(error)
      })
  },
  data() {
    return {
      ShowLoading: true,
      TopTitles: '问题管理',
      SubTitles: '问题列表',
      SearchCount: 0,
      proinfo: [],// 存放所有数据
      search: '', // 搜索内容
      Questionid: 0, //传到edit页面的参数
      PageID: 1, // 分页 当前页 页码
      ShowSearch: [],
      booool: 0,
      current_url: '',
      style: {
        position: 'relative',
        left: '10px'
      },
      inputstyle: {
        position: 'relative',
        bottom: '1px'
      },
      tablestyle: {
        margin: '15px auto'
      }
    }
  },
  methods: {
    // 删除
    DelTable(index, ID) {
      // 调用删除接口
       let data = '{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"006ebdca37d141b8a85c04eb30eb6450","UN":"' + this.$store.state.Backstage.UN + '","AccessToken":"' + this.$store.state.Backstage.AccessToken + '","QuestionID":"' + ID + '"}'
      
      this.$confirm('此操作将删除该项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.DelHelpDetail(data)
            .then((res) => {
              if(res.Result==1){
                this.proinfo.splice(index, 1)
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
              }
            }, (error) => {
              console.log(error)
            })
        })
    },
    // 向edit页面传参数
    Send(Id) {
      this.Questionid = Id
      this.$router.push({
        name: 'edit',
        query: { QuestionID: this.Questionid }
      })
    },
    // 获取要显示的分页数据
    Getpagination(CurrentID) {
      this.loading(true)
      this.PageID = CurrentID
      if(this.search==''){
        // 调用详情接口 
        let data = '{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"ec1c30a71e864e8eb3d7f577b655eb14","UN":"' + this.$store.state.Backstage.UN + '","AccessToken":"' + this.$store.state.Backstage.AccessToken + '","QuestionID":"0","PageID":"' + this.PageID + '"}'
        api.GetHelpDetail(data,this)
          .then((res) => {
            this.loading(false)
            this.proinfo = res.ReturnValue
          }, (error) => {
            console.log(error)
        })
      }
    },
    loading(val) {
      this.ShowLoading = val
    }
  },
  computed: {
    // 与问题匹配搜索
    Convert() {
      var search = this.search
      // 搜索内容与问题对比 返回匹配问题
      if (search !== '' && search != null) {
        this.loading(true)
        let SearchArray = this.ShowSearch.filter((product) => {
        return Object.keys(product).some((key) => {
          return String(product[key].Title).toLowerCase().indexOf(search) > -1
          })
        })
        this.SearchCount = SearchArray.length
        if(SearchArray.length<10){
          this.loading(false)
          return SearchArray
        }
        else{
          this.loading(false)
          let left=(this.PageID-1)*10
          return SearchArray.slice(left,this.PageID*10)
        }
      }
      return this.proinfo
    }
  }
}

</script>
<style scoped src="../../Common/Css/bootstrap.min.css">

</style>

<style scope>
@media (device-height:480px) and (-webkit-min-device-pixel-ratio:2) {
  /* 兼容iphone4/4s */
  .class {}
}

@media (device-height:568px) and (-webkit-min-device-pixel-ratio:2) {
  /* 兼容iphone5 */
  .class {}
}


@media (device-height:667px) and (-webkit-min-device-pixel-ratio:2) {
  /* 兼容iphone6 */
  .class {}
}

@media (device-height:736px) and (-webkit-min-device-pixel-ratio:2) {
  /* 兼容iphone6 Plus */
  .class {}
}

.maintain {}

.matain_input {
  height: 34px;
  padding: 3px 6px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
}




/* .maintain_table {
  margin: 15px auto;
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #E1E6EB;
}

.maintain_table tbody td {
  line-height: 20px;
  padding: 8px 10px;
  font-size: 13px;
  border-bottom: 1px solid #E1E6EB;
  border-left: 1px solid #E1E6EB;
}
 */

.maintain_pagination {
  margin: 15px auto
}

</style>


