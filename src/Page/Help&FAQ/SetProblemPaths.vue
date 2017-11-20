<template>
    <div>
        <back-template :TopTitles="TopTitles" :SubTitles="SubTitles"></back-template>
        <el-tree ref="tree" :data="questionPaths" show-checkbox node-key="ID" default-expand-all :expand-on-click-node="false" :render-content="renderContent">
        </el-tree>
    </div>
</template>

<script>
import api from '@/fetch/api'
import BackTemplate from '@/components/Share/WebApp/BackTemplate'
export default {
    beforeCreate() {
        var data = '{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"a89911d051d341ccb29fa2a469b03ae8","UN":"'+ this.$store.state.Backstage.UN+'","AccessToken":"'+ this.$store.state.Backstage.AccessToken+'"}'
        api.GetProblemPath(data)
            .then((res) => {
                let array = res.ReturnValue.Quespaths[0].children
                array.forEach(function(element) {
                    element.ID = element.ID
                    element.label = element.TypeName
                    delete element.TypeName
                    this.ForeachArray(element)
                }, this)
                this.questionPaths = array
                this.MaxID = res.ReturnValue.MaxID
            })
    },
    data() {
        return {
            TopTitles: '问题路径管理',
            SubTitles: '编辑问题路径',
            EditSomething: '',
            MaxID: 0,
            questionPaths: []
        }
    },
    components: {
        BackTemplate
    },
    methods: {
        LoopAdd(obj, array) {
            if (array.length > 0) {
                obj.children = []
                for (var i = 0; i < array.length; i++) {
                    let sonObj = {}
                    sonObj.ID = array[i].key
                    sonObj.level = array[i].level - 1
                    sonObj.label = array[i].label
                    obj.children.push(sonObj)
                    this.LoopAdd(obj.children[i], array[i].childNodes)
                }
            }
        },
        ForeachArray(obj) {
            if (obj.hasOwnProperty('children')) {
                for (var index = 0; index < obj.children.length; index++) {
                    obj.children[index].ID = obj.children[index].ID
                    obj.ID = obj.ID
                    obj.children[index].label = obj.children[index].TypeName
                    delete obj.children[index].TypeName
                    this.ForeachArray(obj.children[index])
                }
            }
            if (obj.ParentID > 0 && !obj.hasOwnProperty('children')) {
                obj.ID = obj.ID
            }
        },
        addroot(store) {
            this.$prompt('修改为', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
                this.EditSomething = value
                this.MaxID = this.MaxID + 1
                store.append({ ID: this.MaxID, label: this.EditSomething, children: [] })
                setTimeout(() => {
                    let array = this.$refs.tree.$children
                    let PostArray = []
                    array.forEach(function(element) {
                        let midObj = {}
                        midObj.ID = element.node.key
                        midObj.label = element.node.label
                        this.LoopAdd(midObj, element.node.childNodes)
                        PostArray.push(midObj)
                    }, this)
                    let params = '{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"a249fb3b110a42c1bccb468a98a96fa5","UN":"'+ this.$store.state.Backstage.UN+'","AccessToken":"'+ this.$store.state.Backstage.AccessToken+'","TreeArray":' + JSON.stringify(PostArray) + '}'
                    api.SetProblemPath(params)
                        .then((res) => {
                        }, (error) => {
                            console.log(error)
                        })
                }, 0);
            })


        },
        append(store, data) {
            this.$prompt('修改为', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
                this.EditSomething = value
                this.MaxID = this.MaxID + 1
                store.append({ ID: this.MaxID, label: this.EditSomething, children: [] }, data)

                let array = this.$refs.tree.$children
                let PostArray = []
                array.forEach(function(element) {
                    let midObj = {}
                    midObj.ID = element.node.key
                    midObj.label = element.node.label
                    this.LoopAdd(midObj, element.node.childNodes)
                    PostArray.push(midObj)
                }, this)
                let params = '{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"a249fb3b110a42c1bccb468a98a96fa5","UN":"'+ this.$store.state.Backstage.UN+'","AccessToken":"'+ this.$store.state.Backstage.AccessToken+'","TreeArray":' + JSON.stringify(PostArray) + '}'
                api.SetProblemPath(params)
                    .then((res) => {
                    }, (error) => {
                        console.log(error)
                    })

            })

        },
        remove(store, data) {
            let params = '{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"e15d7e1f39c445e0863dfaeee01319d0","UN":"'+ this.$store.state.Backstage.UN+'","AccessToken":"'+ this.$store.state.Backstage.AccessToken+'","DelID":' + data.ID + '}'
            this.$confirm('此操作将删除该项, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                api.DelProblemPath(params)
                    .then((res) => {
                    if(res.Result==1){
                        this.proinfo.splice(index, 1)
                        this.$message({
                        type: 'success',
                        message: '删除成功!'
                        })
                        store.remove(data)
                    }
                  }, (error) => {
                    console.log(error)
                  })
            })
        },
        renderContent(h, { node, data, store }) {
            return (
                <span>
                    <span>
                        <span>{node.label}</span>
                    </span>
                    <span style="float: right; margin-right: 20px">
                        <el-button size="mini" type="info" on-click={() => this.addroot(store)}>添加根</el-button>
                        <el-button size="mini" type="info" on-click={() => this.append(store, data)}>添加子</el-button>
                        <el-button size="mini" type="danger" on-click={() => this.remove(store, data)}>删除</el-button>
                    </span >
                </span>
            )
        }
    }
}
</script>