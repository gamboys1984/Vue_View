<template>
    <div>
        <back-template :TopTitles="TopTitles" :SubTitles="SubTitles"></back-template>
        <div class="editDetails">
            <addandedit :Selectpro="proinfo[0].ProName" :DefaultValue="DefaultValue" :width="width" :height="height" :Titles="proinfo[0].helpDetailList.Title" :pathdetail="proinfo[0].QueString" @Sendata="updateHD" :checkkey="proinfo[0].PathTop" :expandkey="proinfo[0].PathBot">
            </addandedit>
        </div>
    </div>
</template>

<script>
import addandedit from '@/components/Help&FAQ/addandedit'
import BackTemplate from '@/components/Share/WebApp/BackTemplate'
import api from '@/fetch/api'
export default {
    name: 'edit',
    beforeCreate() {
        var data = '{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"ec1c30a71e864e8eb3d7f577b655eb14","UN":"' + this.$store.state.Backstage.UN + '","AccessToken":"' + this.$store.state.Backstage.AccessToken + '","QuestionID":"' + this.$route.query.QuestionID + '"}'
        api.GetHelpDetail(data, this)
            .then((res) => {
                this.proinfo = res.ReturnValue
                let defaultValue = []
                let Bigeer = this.proinfo[0].PathBot
                let Smaller = this.proinfo[0].PathTop
                defaultValue.push(Smaller)
                for (var index = 0; index < Bigeer - Smaller; index++) {
                    Smaller++
                    defaultValue.push('' + Smaller + '')
                }
                defaultValue.push(Bigeer)
                this.DefaultValue = defaultValue
                // let array = this.proinfo[0].Quespaths[0].children
                // array.forEach(function(element) {
                //     element.value = element.ID
                //     element.label = element.TypeName
                //     delete element.ID
                //     delete element.TypeName

                //     this.ForeachArray(element)
                // }, this);
                // this.quespaths = array

                localStorage.setItem('ContentText', JSON.stringify(this.proinfo[0].helpDetailList.Content))
                /* this.$store.commit('Get_UeContent',JSON.stringify(this.proinfo[0].helpDetailList.Content))
                this.test.PathBot=JSON.stringify(this.proinfo[0].PathBot).replace(/\"/g,"")
                this.test.PathTop=JSON.stringify(this.proinfo[0].PathTop).replace(/\"/g,"")
                this.$store.commit('Get_Path',this.test) */
            }, (error) => {
                console.log(error)
            })
    },
    components: {
        addandedit,
        BackTemplate
    },
    methods: {
        updateHD(upQueId, upData, upSelectpro, upTitles) {
            this.QuePathsID = upQueId
            this.UeTextData = upData
            this.UpProject = upSelectpro
            this.Titles = upTitles
            var data = '{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"ded2ab7b24034ada8f02f7c7c1e739d4","UN":"' + this.$store.state.Backstage.UN + '","AccessToken":"' + this.$store.state.Backstage.AccessToken + '","QuestionID":"' + this.$route.query.QuestionID + '","Project":"' + this.UpProject + '","Title":"' + this.Titles + '","Content":"' + this.UeTextData + '","QuePathsID":"' + this.QuePathsID + '"}'
            api.SetHelpDetail(data)
                .then((res) => {
                    if (res.Result != 1) {
                        this.$message({
                            showClose: true,
                            message: '编辑失败',
                            type: 'error'
                        })
                    }
                    else {
                        this.$message({
                            showClose: true,
                            message: '编辑成功',
                            type: 'success'
                        })
                    }
                    this.$router.replace('maintain')
                }, (error) => {
                    console.log(error)
                })
        }
        // ,
        // ForeachArray(obj) {
        //     if (obj.hasOwnProperty('children')) {
        //         obj.children[0].value = obj.children[0].ID
        //         obj.children[0].label = obj.children[0].TypeName
        //         delete obj.children[0].ID
        //         delete obj.children[0].TypeName
        //         this.ForeachArray(obj.children[0])
        //     }
        // }
    },
    data() {
        return {
            DefaultValue: [],
            TopTitles: '问题管理',
            SubTitles: '编辑问题',
            UeTextData: '',
            Titles: '',
            UpProject: '',
            QuePathsID: 0,
            selectquestion: '',
            width: 730,
            height: 223,
            inputData: '',
            proinfo: [
                {
                    PathBot: 0,
                    PathTop: 0,
                    QueString: '',
                    helpDetailList: {
                        Title: '',
                        Content: ''
                    }
                }
            ]
        }
    }
}
</script>

<style>

</style>
