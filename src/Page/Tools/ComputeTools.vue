<template>
    <div>
        <back-template :TopTitles="TopTitles" :SubTitles="SubTitles"></back-template>
        <span>内 容：</span>
        <input v-model="SearchInfo" placeholder="输入想要搜索的内容" class="ComputeTools_input" />
        <span>周 数：</span>
        <input v-model="SearchWeek" placeholder="输入想要搜索的内容" class="ComputeTools_input" />
        <button class="btn btn-primary" :style="inputstyle" @click="GetSearchList">
                搜 索
        </button>
        <router-link to="AddES">
            <button class="btn btn-primary" :style="inputstyle">
                添 加
            </button>
        </router-link>
        <table style="table-layout: fixed;  " border="1" class="table table-hover table-bordered table-striped">
            <tbody>
                <tr>
                    <td>周</td>
                    <td>天</td>
                    <td>头臂长</td>
                    <td>双顶径</td>
                    <td>股骨长</td>
                    <td>腹围</td>
                    <td title="今日宝宝变化">今日宝宝变化</td>
                    <td title="今日宝妈变化">今日宝妈变化</td>
                    <td title="宝妈注意事项">宝妈注意事项</td>
                    <td title="宝妈关注事宜">宝妈关注事宜</td>
                    <td title="宝妈所需营养">宝妈所需营养</td>
                    <td title="创建时间">创建时间</td>
                    <td title="修改时间">修改时间</td>
                    <td>操作</td>
                </tr>
                <tr v-for="(item ,index) in GetApiData " :key="index" v-show="index>=TheFlag&&index<(TheFlag+10)?true:false">
                    <td :title='item.Weeks' style="vertical-align: middle;">{{item.Weeks}}</td>
                    <td :title='item.Days' style="vertical-align: middle;">{{item.Days}}</td>
                    <td :title='item.CRL' style="vertical-align: middle;">{{item.CRL}}</td>
                    <td :title='item.BPD' style="vertical-align: middle;">{{item.BPD}}</td>
                    <td :title='item.FL' style="vertical-align: middle;">{{item.FL}}</td>
                    <td :title='item.AC' style="vertical-align: middle;">{{item.AC}}</td>
                    <td :title='item.BabyChanges' style="vertical-align: middle;">{{item.BabyChanges}}</td>
                    <td :title='item.MumChanges' style="vertical-align: middle;">{{item.MumChanges}}</td>
                    <td :title='item.MumAttention' style="vertical-align: middle;">{{item.MumAttention}}</td>
                    <td :title='item.MumFollow' style="vertical-align: middle;">{{item.MumFollow}}</td>
                    <td :title='item.MumNutrition' style="vertical-align: middle;">{{item.MumNutrition}}</td>
                    <td :title='item.CreateTime' style="vertical-align: middle;">{{item.CreateTime}}</td>
                    <td :title='item.ModifyTime' style="vertical-align: middle;">{{item.ModifyTime}}</td>
                    <button @click="DelAPIInfo(index,item.ID)" class="btn btn-default btn-info">
                        删 除
                    </button>
                    <router-link :to="'EditES/'+item.ID">
                        <button class="btn btn-default btn-info">
                            编 辑
                        </button>
                    </router-link>
                </tr>
            </tbody>
        </table>
        <el-pagination v-show="GetApiData==''?false:!IsLoading" ref="pagination" @current-change="Getpagination" :page-size="10" layout="prev, pager, next, jumper" :current-page="PageIndex" :total="TotalDatas">
        </el-pagination>

        <clip-loder v-show="IsLoading"></clip-loder>
    </div>
</template>

<script>
import api from '@/fetch/api'
import ClipLoader from '@/components/Share/ClipLoader'
import BackTemplate from '@/components/Share/WebApp/BackTemplate'
export default {
    name: 'ComputeTools',
    components: {
        BackTemplate,
        "clip-loder": ClipLoader
    },
    created() {
        var pageIndex= this.$store.state.Detail.PageIndex
        var searchInfo= this.$store.state.Detail.SearchInfo
        var searchWeek= this.$store.state.Detail.SearchWeek
        if(pageIndex==""){
          this.$store.commit('Set_PageIndex', 1)
          pageIndex=1;
        }
        this.PageIndex=pageIndex
        this.SearchInfo = searchInfo
        this.SearchWeek = searchWeek
        this.GetDueDataInfo(this.PageIndex)
    },
    data() {
        return {
            SearchInfo: '',
            SearchWeek:'',
            IsLoading: true,
            TheFlag: 0,
            TotalDatas: 0,
            GetApiData: [],
            TopTitles: '工具箱/胎儿宝妈数据列表',
            SubTitles: '胎儿宝妈数据列表',
            inputstyle: {
                position: 'relative',
                bottom: '1px'
            },
            style: {
                position: 'relative',
                left: '10px'
            },
            PageIndex:0
        }
    },
    methods: {
        GetSearchList(){
            this.$store.commit('Set_SearchInfo', this.SearchInfo)
            this.$store.commit('Set_SearchWeek', this.SearchWeek)
            this.GetDueDataInfo(0)
        },
        DelApi(index, val) {
            var data = '{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"2bb6a8a7bff341edbcd3487cfe582e6c","UN":"' + this.$store.state.Backstage.UN + '","AccessToken":"' + this.$store.state.Backstage.AccessToken + '","DueDataID":"' + val + '"}'
            api.DelDueDataInfo(data)
                .then((res) => {
                    if (res.Result == 1) {
                        this.$message({
                            showClose: true,
                            message: '删除成功',
                            type: 'success'
                        })
                        this.GetApiData.splice(index, 1)
                    }
                    else{
                        this.$message({
                            showClose: true,
                            message: '删除失败',
                            type: 'error'
                        })
                    }
                    if(this.GetApiData.length==0&&this.PageIndex>1){
                        this.GetDueDataInfo(this.PageIndex-1)
                    }
                    console.log(this.GetApiData)

                }, (error) => {
                    console.log(error)
                })
        },
        DelAPIInfo(index, val){
            this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.DelApi(index,val)
            }).catch(() => {

            });
        },
        Getpagination(val) {
           // this.TheFlag = 10 * (val - 1)
           this.GetDueDataInfo(val)
           this.PageIndex=val
           this.$store.commit('Set_PageIndex', val)
        },
        IsShowLoading(val) {
            this.IsLoading = val
        },
        GetDueDataInfo(val){
            var data = '{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"6c186070eb874b14a52315bd0b72efcf","UN":"' + this.$store.state.Backstage.UN + '","AccessToken":"'
                        + this.$store.state.Backstage.AccessToken + '","DueDataID":"0","PageID":"'
                        +val+'","SearchInfo":"'+this.SearchInfo+'","SearchWeek":"'+this.SearchWeek+'"}'
            console.log(data)
            api.GetDueDataInfo(data, this).then((res) => {
                if (res.Result == 1) {
                    console.log(res.ReturnValue)
                    this.GetApiData = res.ReturnValue.ResultList
                    this.TotalDatas = res.ReturnValue.Count
                }
                this.IsShowLoading(false)
            }, (error) => {
                console.log(error)
            })
        },
        GetSearch() {
            var search = this.SearchInfo
            // 搜索内容与问题对比 返回匹配问题
            if (search !== '' && search != null) {
                return this.GetApiData.filter((product) => {
                    return Object.keys(product).some((key) => {
                        return String(product[key]).toLowerCase().indexOf(search) > -1
                    })
                })
            }
            return this.GetApiData;
        }
    },
    computed: {

    }
}
</script>

<style scoped src="../../Common/Css/bootstrap.min.css">

</style>

<style scoped>
.ComputeTools_input {
    margin: 8px;
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

td {
    text-align: center;
    white-space: nowrap;
    /*控制单行显示*/
    overflow: hidden;
    /*超出隐藏*/
    text-overflow: ellipsis;
    /*隐藏的字符用省略号表示*/
    vertical-align: middle;
}
table > tr >td{
  vertical-align: middle
}
</style>
