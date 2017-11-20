<template>
<div>
    <back-template :TopTitles="TopTitles" :SubTitles="SubTitles"></back-template>
    <router-link to="AddSP">
      <button class="btn btn-primary" style="position: relative;bottom: 4px;">添 加</button>
    </router-link>
    <ul class="list-group">
      <li class="list-group-item" style="float: left;width: 200px;text-align: center;">所属标签</li>
      <li class="list-group-item" style="float: left;width: 200px;text-align: center;">贴纸名称</li>
      <li class="list-group-item" style="float: left;width: 200px;text-align: center;">位置</li>
      <li class="list-group-item" style="float: left;width: 200px;text-align: center;">图片</li>
      <li class="list-group-item" style="float: left;width: 200px;text-align: center;">操作</li>
    </ul>
    <draggable   class="list-group" style="bottom: 10px;position: relative;" element="ul" v-model="myArray"  @update="datadragEnd" > 
      <transition-group  type="transition" :name="'flip-list'">
        <span  class="list-group-item" style="top: 8px; " v-for="element in myArray" :key="element.id">
          <span style="position: relative;left: 65px;">{{element.tags}}</span>
          <span style="position: absolute;top: 28%;left: 28%;transform: translate(-20%,20%);">{{element.name}}</span>
          <span class="id_span" >{{element.id}}</span>
          <span style="position: absolute;bottom: 2px;left: 838px;font-size: 14px;color: white;">
            <el-button size="small" type="primary">编 辑</el-button>
            <el-button size="small" type="danger" >删 除</el-button>
          </span>
          <img :src="element.imgs" 
          style="position: absolute;
          width: 30px;
          height: 30px;
          left: 685px;
          top: 6px;" /> 
        </span>
      </transition-group>
    </draggable>
</div>  
</template>

<script>
let clonearray
import draggable from "vuedraggable"
import BackTemplate from '@/components/Share/WebApp/BackTemplate'
export default {
  name: 'StickerPicture',
  components: {
    draggable,
    BackTemplate
  },
  data() {
    return {
      TopTitles: '贴纸图片管理',
      SubTitles: '贴纸图片列表',
      myArray: [
        { id: 1, tags: "风景", name: "奇怪", imgs: "http://czrjdevimg8.iemylife.com/babydiary/17/36dfc6220a6d48bc9df25da6adec1398.png"},
        { id: 2, tags: "风景", name: "￥#%@&#*", imgs: "http://czrjdevimg8.iemylife.com/babydiary/17/36dfc6220a6d48bc9df25da6adec1398.png"},
        { id: 3, tags: "风景", name: "星期三", imgs: "http://czrjdevimg6.iemylife.com/babydiary/17/c567f4976a144f94a7486ca932b9e1b1.png"},
        { id: 4, tags: "风景", name: "我在哪", imgs: "http://czrjdevimg6.iemylife.com/babydiary/17/c567f4976a144f94a7486ca932b9e1b1.png"},
        { id: 1, tags: "人文", name: "发生了什么", imgs: "http://czrjdevimg6.iemylife.com/babydiary/17/c567f4976a144f94a7486ca932b9e1b1.png"},
        { id: 2, tags: "人文", name: "其他人呢", imgs: "http://czrjdevimg6.iemylife.com/babydiary/17/c567f4976a144f94a7486ca932b9e1b1.png"},
        { id: 3, tags: "人文", name: "我失忆了", imgs: "http://czrjdevimg6.iemylife.com/babydiary/17/c567f4976a144f94a7486ca932b9e1b1.png"},
        { id: 4, tags: "人文", name: "好难过", imgs: "http://czrjdevimg6.iemylife.com/babydiary/17/c567f4976a144f94a7486ca932b9e1b1.png"},
        { id: 5, tags: "人文", name: "成功了", imgs: "http://czrjdevimg6.iemylife.com/babydiary/17/c567f4976a144f94a7486ca932b9e1b1.png"},
        { id: 6, tags: "人文", name: "开心吗", imgs: "http://czrjdevimg6.iemylife.com/babydiary/17/c567f4976a144f94a7486ca932b9e1b1.png"}
      ],
      style: {
        position: 'relative',
        left: '10px'
      },
      pStyle: {
        'border-top' : '0px'
      },
      Pstyle: {
        'border': '1px solid #ddd'
      }
    }
  },
  created () {
    clonearray = this.myArray
  },
  methods: {
    datadragEnd (evt) {
      let copyArray
      copyArray = this.myArray
      let oldId = evt.oldIndex
      let newId = evt.newIndex
      let left = 0
      let right = 0
      let dragname = copyArray[oldId].tags
      
      if(clonearray[oldId].tags!=clonearray[newId].tags){
        this.myArray = clonearray
      }else{
        if(oldId-newId>0){
          left = clonearray[newId].id
          right = clonearray[oldId].id
          setTimeout(()=> {
          copyArray.forEach(function(element) {
            if(element.tags==dragname){
              if(element.id>=left && element.id<right){
              element.id=element.id+1
              }
            }
          }, this)
          // copyArray[newId-1].id = newId
          copyArray[newId].id=left
          this.myArray = copyArray
          }, 500)
        }else{
          left = clonearray[oldId].id
          right = clonearray[newId].id
          setTimeout(()=> {
            copyArray.forEach(function(element) {
              if(element.tags==dragname){
                if(element.id>=left && element.id<right){
                element.id=element.id-1
                }
              }
            }, this)
            copyArray[newId-1].id = right-1
            copyArray[newId].id=right
            this.myArray = copyArray
          }, 500)
        }
        clonearray = copyArray
      }
    }
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
  width: 1000px;
  
}

.list-group-item i{
  cursor: pointer;
}
.btnStyle {
position: relative;
    bottom: 31px;
}

.id_span{
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
    position: absolute;
    left: 485px;
}
</style>
