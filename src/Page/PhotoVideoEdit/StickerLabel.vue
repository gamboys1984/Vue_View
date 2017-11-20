<template>
<div>
    <back-template :TopTitles="TopTitles" :SubTitles="SubTitles"></back-template>
    <router-link to="AddSL">
      <button class="btn btn-primary" style="position: relative;bottom: 4px;">添 加</button>
    </router-link>
    
    <ul class="list-group">
      <li class="list-group-item" style="float: left;width: 300px;text-align: center;">标签</li>
      <li class="list-group-item" style="float: left;width: 300px;text-align: center;">位置</li>
      <li class="list-group-item" style="float: left;width: 300px;text-align: center;">操作</li>
    </ul>
    <draggable class="list-group" style="bottom: 10px;position: relative;" element="ul" v-model="myArray"  @update="datadragEnd" > 
      <transition-group type="transition" :name="'flip-list'">
        <p class="list-group-item" style="top: 8px; " v-for="(element,index) in myArray" :key="element.ID"> 
          {{element.label}}
          <span style="position: absolute;bottom: 2px;left: 685px;font-size: 14px;color: white;">
            <router-link :to="'EditSL/'+element.ID">
              <el-button size="small" type="primary" style="color: white;">编 辑</el-button>
            </router-link>
            <el-button size="small" type="danger" @click="PostDelApi(element.ID,index)">删 除</el-button>
          </span>
          <span class="position" style="position: absolute;left: 440px;">{{element.position}}</span>
        </p>
      </transition-group>
    </draggable>
</div>  
</template>

<script>
let clonearray
import draggable from "vuedraggable"
import api from '@/fetch/api'
import BackTemplate from '@/components/Share/WebApp/BackTemplate'
export default {
  name: 'StickerLabel',
  components: {
    draggable,
    BackTemplate
  },
  data() {
    return {
      TopTitles: '贴纸标签管理',
      SubTitles: '贴纸标签列表',
      myArray: [
      ],
      style: {
        position: 'relative',
        left: '10px'
      }
    }
  },
  beforeCreate () {
    let params = `{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"e8d0086cab684c9daeb38b09b8f8b88c","UN":"${this.$store.state.Backstage.UN}","AccessToken":"${this.$store.state.Backstage.AccessToken}","StickerID":"0","PageID":"0"}`
    api.GetStickerTags(params,this)
      .then((res)=>{
        this.myArray = res.ReturnValue
        clonearray = res.ReturnValue
      })
  },
  methods: {
    datadragEnd (evt) {
      let copyArray =this.myArray
      let oldId = evt.oldIndex ,newId = evt.newIndex
      let left = 0,right = 0
      if(oldId>newId){
        left = clonearray[newId].position
        right = clonearray[oldId].position
        setTimeout(()=> {
          copyArray.forEach((element) => {
            if(element.position>=left && element.position<right){
              element.position=element.position+1
            }
          })
        copyArray[newId].position=left
        }, 500)
       }else{
         left = clonearray[oldId].position
         right = clonearray[newId].position
         setTimeout(()=> {
           copyArray.forEach((element) => {
             if(element.position>=left && element.position<right){
               element.position=element.position-1
             }
           })
           copyArray[newId-1].position = right-1
           copyArray[newId].position=right
          }, 500)
       }
       clonearray = this.myArray

      let params = `{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"ca72ebcdcdc7425bafc48b3ca2e6aa00","UN":"${this.$store.state.Backstage.UN}","AccessToken":"${this.$store.state.Backstage.AccessToken}","DragStartIndex":"${oldId}","DragEndIndex":"${newId}"}`
      api.SetStickerTags(params)
        .then((res)=>{
        })

    },
    PostDelApi(ID,index) {
      let params = `{"SC":"001cfe2fe7044aa691d4e6eff9bfb56c","SV":"ee176c5611b14a5993d6207491876605","UN":"${this.$store.state.Backstage.UN}","AccessToken":"${this.$store.state.Backstage.AccessToken}","StickerID":"${ID}"}`
      
      this.$confirm('此操作将删除该项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            api.DelStickerTags(params)
            .then((res)=>{
              if(res.ReturnValue==1){
                this.myArray.splice(index, 1)
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
              }else{
                this.$message.error('删除失败')
              }
            })
        })
    },
  },
  mounted () {
  }
}
</script>

<style scoped src="./../../Common/Css/bootstrap.min.css">

</style>

<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: .5;
  background: #C8EBFB;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
  width: 900px;
}

.list-group-item i{
  cursor: pointer;
}
.btnStyle {
position: relative;
    bottom: 31px;
}

.position{
  min-width: 10px;
    padding: 3px 7px;
    font-weight: bold;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    background-color: #777;
    border-radius: 10px;
}
</style>
