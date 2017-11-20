<template>
    <div>
        <div class="cell" v-show="!IsShowLoading">
            <Search v-model="search" :style="searchStyle" @click.native="search==''?isShows():blankFunction()" >
            </Search>
            
            <div v-if="search!=''">
                <div class="wow">
                    <cell v-show="SearchInfo!=''" label="相关问题" class="top_radius"></cell>
                </div>
                <cell v-for="(item,i) in Convert" :key="i" :title="item.helpDetailList.Title" is-link :to="'details/'+item.helpDetailList.ID">
                </cell>
            </div>
            <div v-show="isShow" >
                <div>
                    <cell style="margin-top:1px;margin-bottom:1px;" label="您的问题"></cell>
                    <your-data-list :style="woStyle" :DataSource="your_question" :LinkTo="your_question_link"></your-data-list>
                    <cell style="text-align: center;" class="bot_radius" :label="'更多问题'" :to="'List'"></cell>
                    </div>
                </div>
        </div>
        <div v-if="isShow" v-show="!IsShowLoading">
            <div class="quetype">
                <cell label="问题类型" class="top_radius"></cell>
            </div>
            <mobile-data-list :DataSource="DataSource" :LinkTo="LinkTo"></mobile-data-list>
            <router-link class="que_back" to="AddFAQInfo">
                <div>问题反馈</div>
            </router-link>
        </div>
        <MobileLoading v-show="search==''?IsShowLoading:IsShowSearchLoading" :word="DataF"></MobileLoading>
    </div>
</template>

<script>
import YourDataList from '@/components/WebApp/questionDataList'
import MobileDataList from '@/components/Share/WebApp/MobileDataList'
import MobileLoading from '@/components/Share/MobileLoading'
import { Cell, Search } from 'mint-ui'
import api from '@/fetch/api'
export default {
    name: 'MobileHome',
    components: {
        MobileDataList,
        Search,
        Cell,
        MobileLoading,
        YourDataList
    },
    data() {
        return {
            IsShowSearchLoading: true,
            IsShowLoading: true,
            DataF: "正在加载…",
            search: '',
            isShow: true,
            SearchInfo: [
                {
                    helpDetailList: {}
                }
            ],
            DataSource: [], 
            LinkTo: [],
            SimpleOrMore: false,
            searchStyle: {
                margin: '10px auto',
                height: '100%',
                padding: '0px 0px',
                'z-index': '-1'
            },
            your_question: [],
            your_question_link: '../mobile/FAQDetail',
            woStyle: {
                margin: '0px',
                'border-radius':'0px',
                padding: '0 0',
                'margin-top':'0px',
                'margin-bottom':'-1px'

            }
        }
    },
    beforeCreate() {
        var content = '{"UN":"' + process.env.UN + '","SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"f2ee47b19ef949a5b0c27d51b1e043c6","AccessToken":"' + process.env.AccessToken + '"}'
        api.GetOnlineHelpList(content)
            .then((res) => {
                if (res.Result == 1) {
                    this.your_question.push(res.ReturnValue[0])
                }                   
                this.IsShowLoading = false;
            }, (error) => {
                console.log(error)
                this.IsShowLoading = false;
            })
    },
    created () {
        var data = '{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"a89911d051d341ccb29fa2a469b03ae8","UN":"' + process.env.UN + '","AccessToken":"' + process.env.AccessToken + '"}'
        api.GetProblemPath(data)
            .then((res) => {
                let array = res.ReturnValue.Quespaths[0].children
                array.forEach(function(element) {
                    let LinkStr="toDetail/"+element.ID
                    this.DataSource.push(element.TypeName)
                    this.LinkTo.push(LinkStr)
                }, this)
                console.log(this.LinkTo)
                })
    },
    mounted() {
        // 取出全部问题
        var data = '{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"ec1c30a71e864e8eb3d7f577b655eb14","UN":"' + process.env.UN + '","AccessToken":"' + process.env.AccessToken + '","QuestionID":-1,"PageID":"0"}'
        api.GetHelpDetail(data)
            .then((res) => {
                if (res.Result == 1)
                    this.SearchInfo = res.ReturnValue

                this.IsShowSearchLoading = false;        
            }, (error) => {
                console.log(error)
                this.IsShowSearchLoading = false;
            })
    },
    computed: {
        Convert() {
            var search = this.search
            // 搜索内容与问题对比 返回匹配问题
            if (search !== '' && search != null) {
                return this.SearchInfo.filter((product) => {
                    return Object.keys(product).some((key) => {
                        return String(product[key].Title).toLowerCase().indexOf(search) > -1
                    })
                })
            }
            return this.SearchInfo;
        }
    },
    methods: {
        isShows() {
            if (this.isShow)
                this.isShow = false
            else
                this.isShow = true
        },
        hoho() {
            if (this.SimpleOrMore)
                this.SimpleOrMore = false
            else
                this.SimpleOrMore = true
        },
        blankFunction() {}
    },
    activated() {
        this.$emit('GetTitle', '帮助与反馈')
        this.$store.commit('Set_FAQtitle', '问题反馈')
    }
}
</script>

<style scoped>
input::-webkit-input-placeholder {
			    text-align: center;
			}
/* .gq {
    position: relative;
    left: 35px;
    margin-bottom: 20px;
    font-size: 14px;
}

.test {
    position: relative;
    top: 12px;
    right: 15px;
    font-size: 14px;
} */

.cell {
    margin: 10px;
    box-shadow: 0px 2px 5px #e1e1e1;
    border-radius: 5px;
}

.search {
    color: white;
    width: 32px;
    left: 323px;
    position: relative;
    top: 37px;
    z-index: 9999;
}

.wow {
    position: relative;
    top: 5px;
}

.quetype {
    position: relative;
    margin: 10px;
    box-shadow: 0px 2px 5px #e1e1e1;
    border-radius: 5px;
    top: 10px;
}

.bot_radius {
    border-bottom-right-radius: 1px;
    border-bottom-left-radius: 1px;
}

.top_radius {
    border-top-left-radius: 1px;
    border-top-right-radius: 1px;
}

.que_back {
    color: #888;
    text-align: center;
    text-decoration: none;
}
</style>
