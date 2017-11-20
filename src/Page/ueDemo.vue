<template>
    <div>
        <ue-editor :width="width" :height="height" :data="Data" @input="UeText"></ue-editor>
        <div>输出项为：{{inputData}}</div>
         <router-link to="./static/FAQList" class="lp_li_a">
                        帮助列表页
                    </router-link>
    </div>
</template>
<script>
import UeEditor from '@/components/Share/UEeditor'
export default {
    name: "ueDemo",
    components: {
        UeEditor
    },
    data() {
        return {
            Data: 'test111',
            width: 1230,
            height: 123,
            inputData: null
        }
    },
    methods: {
        UeText: function (UEobj) {
            this.inputData = UEobj.content;
        }
    }
}
</script>