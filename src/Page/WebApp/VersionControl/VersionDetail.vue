<template>
    <div>
        <div class="detail" v-html="VerContent"></div>
        <MobileLoading v-show="IsShow" :word="DataF"></MobileLoading>
    </div>
</template>
<script scoped>
import api from '@/fetch/api'
import MobileLoading from '@/components/Share/MobileLoading'
export default {
    data: function() {
        return {
            VerContent: '',
            IsShow:true,
            DataF:"正在加载…"
        }
    },
    components: {
        MobileLoading
    },
    methods: {
        create: function() {
            var content = '{     "sc": "001cfe2fe7044aa691d4e6eff9bfb56c",     "sv": "55e86439af6648499a50f16633c6c9c8",     "SchemaIosUrl": "' + this.$store.state.Version.SCHEMAIOS_URL + '", "VersionNum":"' + this.$route.params.id + '" }'
            api.GetVersionDetail(content).then((res) => {
                this.VerContent = res.ReturnValue.VersionHtml;
                if (res.ReturnValue.VersionHtml == '' || res.ReturnValue.VersionHtml == '<br />') {
                    this.VerContent = '暂无版本更新内容'
                }
                this.IsShow = false;
            }, (error) => {
                this.VerContent = '暂无版本更新内容'
                this.IsShow = false;
            })
        }
    },
    activated: function() {
        this.$emit('GetTitle', this.$route.params.DisplayNum + " 版本介绍")
    }
}
</script>
<style scoped>
.detail {
    padding: 18px;
}
</style>
