<template>
    <div class="Mobile_Details_head">
        <MobileLoading v-show="IsShow" :word="DataF"></MobileLoading>
        <div class="Mobile_Details_body" v-show="!IsShow">
            <span>{{QuestionTitle}}</span>
            <br />
            <span v-html="ContentText"></span>
        </div>
        <div v-show="QuestionTitle==''?false:!IsShow" class="button">
            <router-link to="../home">
                <button class="Mobile_Details_OK"></button>
            </router-link>
                <button class="Mobile_Details_NO" @click="ShowBack"></button>
            <br />
            <br />
            <router-link v-if="IsBack" style="color: #19c9db; text-decoration: none;" :to="'../AddFAQInfo'">
                <label >继续反馈未解决原因</label>
            </router-link>
        </div>
        <div>
            
        </div>
    </div>
</template>

<script>
import api from '@/fetch/api'
import MobileLoading from '@/components/Share/MobileLoading'
import { MessageBox } from 'mint-ui'
export default {
    name:'MobileDetails',
    data() {
        return {
            IsShow: true,
            DataF: "正在加载…",
            QuestionDetails: [{
                helpDetailList: {}
            }],
            QuestionTitle: "",
            ContentText: "",
            IsBack: false
        }
    },
    components: {
        MobileLoading
    },
    created() {
        this.$emit('GetTitle', "")
        let QuestionID = this.$route.path.replace(/[^0-9]/ig, "")
        let data = '{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"ec1c30a71e864e8eb3d7f577b655eb14","UN":"' + process.env.UN + '","AccessToken":"' + process.env.AccessToken + '","QuestionID":"' + QuestionID + '"}'
        api.GetHelpDetail(data)
            .then((res) => {
                if (res.Result == 1) {
                    this.QuestionDetails = res.ReturnValue
                    this.QuestionTitle = this.QuestionDetails[0].helpDetailList.Title
                    if (JSON.stringify(this.QuestionDetails[0].helpDetailList.Content).substring(0, 4).indexOf("'") > 0)
                        this.ContentText = this.QuestionDetails[0].helpDetailList.Content.substring(1, this.QuestionDetails[0].helpDetailList.Content.length - 2).replace(/\\/g, "")
                    else
                        this.ContentText = this.QuestionDetails[0].helpDetailList.Content.replace(/\"/g, "")
                    // replace(/\\/g, "")

                    //     console.log(this.ContentText.replace(/<img[^>]*>/gi,"")) // 文字
                    //     console.log(this.ContentText.match(/<img[^>]*>/gi)) // 图片

                    this.$store.commit('Set_FAQtitle', this.QuestionDetails[0].helpDetailList.Title)
                    this.$emit('GetTitle', this.QuestionDetails[0].helpDetailList.Title)
                }
                else {
                    MessageBox('提示', '获取超时')
                }
                this.IsShow = false;
            }, (error) => {
                console.log(error)
                this.IsShow = false;
            })
    },
    methods: {
        ShowBack() {
            this.IsBack=true
        }
    }
}
</script>

<style>
.button {
    position: relative;
    text-align: center;
    top: 266px;
}

.Mobile_Details_head {
    background-color: white;
}

.Mobile_Details_body {
    position: relative;
    left: 20px;
    top: 20px;
    font-size: 0.8em;
}

.Mobile_Details_OK {
    background: url('../../assets/isok.png') no-repeat;
    position: relative;
    right: 10px;
    width: 100px;
    height: 33px;
    border: none;
}
.Mobile_Details_NO {
    background: url('../../assets/isno.png') no-repeat;
    position: relative;
    left: 10px;
    width: 100px;
    height: 33px;
    border: none;
}
</style>
