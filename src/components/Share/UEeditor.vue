<template>
    <div class="UEeditor">
    
        <div id="editor" type="text/plain" :style="outStyle()"></div>
    </div>
</template> 
<script> 

export default {

    name: 'UEeditor',
    data() {
        return {
            ue: null
        }
    },
    props: ['width', 'height', 'data'],
    mounted() {
        require('../../../static/utf8-net/ueditor.config')
        require('../../../static/utf8-net/ueditor.all')
        require('../../../static/utf8-net/lang/zh-cn/zh-cn')
        this.ue = UE.getEditor('editor', {

            BaseUrl: '',
            scaleEnabled:true,
            UEDITOR_HOME_URL: '../static/utf8-net/',

            //       toolbars:[] 

        });
        this.ue.ready(function () {
            UE.getEditor('editor').setContent(this.data);
        }.bind(this));
        this.ue.addListener("contentChange", function () {
            const wordCount = this.ue.getContentLength(true);
            const content = this.ue.getContent();
            const plainTxt = this.ue.getPlainTxt();
            this.$emit('input', { wordCount: wordCount, content: content, plainTxt: plainTxt });
        }.bind(this));
    },
    methods: {
        outStyle: function () {
            return 'width:' + this.width + 'px;height:' + this.height + 'px';
        },
        submits() {

            this.uedata.push(UE.getEditor('editor').getContent());

            console.log(this.uedata.join("\n"));

        }
    },
    destroyed() {
        this.ue.destroy();
    }

}

</script> 