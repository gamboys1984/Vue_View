<template>
    <div>
        <back-template :TopTitles="TopTitles" :SubTitles="SubTitles"></back-template>
        <div class="label_one">
            <label>周 :</label> <input v-model="weeks" :style="inputStyle" placeholder="0-40" class="AddAndEditData_input" /> <br />
            <label>天 :</label> <input v-model="days" :style="inputStyle" placeholder="1-6" class="AddAndEditData_input" /> <br />
        </div>
        <div class="label_two">
            <label>腹围 :</label><input v-model="AC" placeholder="cm" class="AddAndEditData_input" /><br />

        </div>
        <div class="label_three">
            <label>头臂长 :</label><input v-model="CRL" placeholder="cm" class="AddAndEditData_input" /><br />
            <label>双顶径 :</label><input v-model="BPD" placeholder="cm" class="AddAndEditData_input" /><br />
            <label>股骨长 :</label><input v-model="FL" placeholder="cm" class="AddAndEditData_input" /><br />
        </div>

        <label class="label_six">今日宝宝变化 :</label>
        <textarea v-model="BabyChanges" class="AddAndEditData_textarea" rows="4" cols="25" placeholder="请在这里输入文本"></textarea><br />
        <label class="label_six">今日宝妈变化 :</label>
        <textarea v-model="MumChanges" class="AddAndEditData_textarea" rows="4" cols="25" placeholder="请在这里输入文本"></textarea><br />
        <label class="label_six">宝妈注意事项 :</label>
        <textarea v-model="MumAttention" class="AddAndEditData_textarea" rows="4" cols="25" placeholder="请在这里输入文本"></textarea><br />
        <label class="label_six">宝妈关注事宜 :</label>
        <textarea v-model="MumFollow" class="AddAndEditData_textarea" rows="4" cols="25" placeholder="请在这里输入文本"></textarea><br />
        <label class="label_six">宝妈所需营养 :</label>
        <textarea v-model="MumNutrition" class="AddAndEditData_textarea" rows="4" cols="25" placeholder="请在这里输入文本"></textarea><br />

        <center>
            <button class="btn btn-primary" @click="CallApi(weeks,days,AC,CRL,BPD,FL,BabyChanges,MumChanges,MumAttention,MumFollow,MumNutrition)">提 交</button>
        </center>
        <clip-loder v-show="IsLoading" style="position: fixed;top: 50%;left: 50%;"></clip-loder>

    </div>
</template>

<script>
import api from '@/fetch/api'
import ClipLoader from '@/components/Share/ClipLoader'
import BackTemplate from '@/components/Share/WebApp/BackTemplate'
import { MessageBox } from 'mint-ui';
export default {
    name: 'ExpectedSettings',
    components: {
        BackTemplate,
        "clip-loder": ClipLoader
    },
    created() {
        var pageIndex= this.$store.state.Detail.PageIndex
        if (this.$route.path.toLowerCase().indexOf("addes") > 0) {
            this.SubTitles = '添加胎儿宝妈数据'
            this.DueDataID = 0
            this.IsShowLoading(false)
        }
        if (this.$route.path.toLowerCase().indexOf("edites") > 0) {
            this.SubTitles = '编辑胎儿宝妈数据'
            console.log(this.$route.path.split('/')[this.$route.path.split('/').length-1])
            this.DueDataID = this.$route.path.split('/')[this.$route.path.split('/').length-1]
            var data = '{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"6c186070eb874b14a52315bd0b72efcf","UN":"' + this.$store.state.Backstage.UN + '","AccessToken":"' + this.$store.state.Backstage.AccessToken + '","DueDataID":"' + this.DueDataID + '"}'
            api.GetDueDataInfo(data)
                .then((res) => {
                    this.weeks = res.ReturnValue.Weeks
                    this.days = res.ReturnValue.Days
                    this.AC = res.ReturnValue.AC
                    this.CRL = res.ReturnValue.CRL
                    this.BPD = res.ReturnValue.BPD
                    this.FL = res.ReturnValue.FL
                    this.BabyChanges = res.ReturnValue.BabyChanges
                    this.MumChanges = res.ReturnValue.MumChanges
                    this.MumAttention = res.ReturnValue.MumAttention
                    this.MumFollow = res.ReturnValue.MumFollow
                    this.MumNutrition = res.ReturnValue.MumNutrition
                    this.IsShowLoading(false)
                }, (error) => {
                    console.log(error)
                })
        }
    },
    mounted () {
        setTimeout(()=>{
            this.$emit('frameHeight')
        }, 500)
    },
    data() {
        return {
            IsLoading: true,
            DueDataID: 0,
            weeks: 0,
            days: 0,
            AC: 0,
            CRL: 0,
            BPD: 0,
            FL: 0,
            BabyChanges: '',
            MumChanges: '',
            MumAttention: '',
            MumFollow: '',
            MumNutrition: '',
            inputStyle: {
                position: 'relative',
                right: '4px'
            },
            TopTitles: '胎儿宝妈数据列表',
            SubTitles: '',
        }
    },
    methods: {
        CallApi(weeks, days, AC, CRL, BPD, FL, BabyChanges, MumChanges, MumAttention, MumFollow, MumNutrition) {
            if(!(weeks<=40&&weeks>=0)){
                this.$alert('请输入0-40之内的周数', '提示信息', {
                    confirmButtonText: '确定',
                });
            }else if(!(days>=0&&days<=6)){
                this.$alert('请输入0-6之内的天数', '提示信息', {
                    confirmButtonText: '确定',
                });
            }else{
                var data = '{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"d95e86c8ac484c2da35f04d2fc500167","UN":"' + this.$store.state.Backstage.UN + '","AccessToken":"' + this.$store.state.Backstage.AccessToken + '","DueDataID":"' + this.DueDataID + '","Weeks":"' + weeks + '","days":"' + days + '","AC":"' + AC + '","CRL":"' + CRL + '","BPD":"' + BPD + '","FL":"' + FL + '","BabyChanges":"' + BabyChanges + '","MumChanges":"' + MumChanges + '","MumAttention":"' + MumAttention + '","MumFollow":"' + MumFollow + '","MumNutrition":"' + MumNutrition + '"}'
                this.IsShowLoading(true)

                api.SetDueDataInfo(data).then((res) => {
                    if(res.ReturnValue == 0 && this.DueDataID == 0){
                        this.$alert('已存在相同的周期，请重新填写周期', '提示信息', {
                            confirmButtonText: '确定',
                            callback: action => {
                            }
                        });
                    }else if(res.ReturnValue == 0 && this.DueDataID != 0){
                        this.$alert('已存在相同的周期，请重新填写周期', '提示信息', {
                            confirmButtonText: '确定',
                            callback: action => {
                            }
                        });
                    }else{
                        if (res.Result == 1 && this.DueDataID == 0) {
                            this.$alert('添加成功', '提示信息', {
                                confirmButtonText: '确定',
                                callback: action => {
                                window.history.go(-1)
                                }
                            });
                        }
                        if (res.Result != 1 && this.DueDataID == 0) {
                            // MessageBox.alert("添加失败", "提示信息")
                            this.$alert('添加失败', '提示信息', {
                                confirmButtonText: '确定'
                            });
                        }
                        if (res.Result == 1 && this.DueDataID != 0) {
                            this.$alert('编辑成功', '提示信息', {
                                confirmButtonText: '确定',
                                callback: action => {
                                window.history.go(-1)
                                }
                            });
                        }
                        if (res.Result != 1 && this.DueDataID != 0) {
                            this.$alert('编辑失败', '提示信息', {
                                confirmButtonText: '确定'
                            });
                        }

                    }
                     this.IsShowLoading(false)
                }, (error) => {
                    console.log(error)
                })
            }
        },
        IsShowLoading(val) {
            this.IsLoading = val
        }
    }
}
</script>

<style scoped src="../../Common/Css/bootstrap.min.css">

</style>

<style scoped>
.AddAndEditData_input {
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

.AddAndEditData_textarea {
    margin: 8px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.label_one {
    position: relative;
    left: 83px;
}

.label_two {
    position: relative;
    left: 67px;
}

.label_three {
    position: relative;
    left: 52px;
}

.label_six {
    position: relative;
    bottom: 88px;
}
</style>

