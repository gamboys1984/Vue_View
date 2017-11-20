<template>
  <div class="background">
    <div v-if="fixHead" class="fixHead"></div>
    <div class="head">
      <div class="head-content">
        {{title}}
      </div>
    </div>
    <transition :name="transitionName" v-on:after-leave="afterLeave">
      <keep-alive>
        <router-view class="child-view" @GetTitle="GetTitle" :style="{height:height+'px'}" ref="ChildView"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: 'slide-left',
      title: '',
      height: 0,
      fixHead: false
    }
  },
  /*   watch: {
      '$route'(to, from) {
        var toLevel = 2
        var fromLevel = 1
        for (var prep in this.$router.$map) {
          if (from.path.toLowerCase().indexOf(prep.toLowerCase()) > -1) {
            fromLevel = this.$router.$map[prep]
            continue;
          }
          if (to.path.toLowerCase().indexOf(prep.toLowerCase()) > -1) {
            toLevel = this.$router.$map[prep]
          }
        }
        if (fromLevel > toLevel) {
          this.transitionName = 'slide-right'
        }
        else {
          this.transitionName = 'slide-left'
        }
      }
    }, */
  beforeRouteUpdate(to, from, next) {
    if (!from.meta.keepAlive)
      this.$refs.ChildView.$destroy()
    var toLevel = 2
    var fromLevel = 1
    for (var prep in this.$router.$map) {
      if (from.path.toLowerCase().indexOf(prep.toLowerCase()) > -1) {
        fromLevel = this.$router.$map[prep]
        continue;
      }
      if (to.path.toLowerCase().indexOf(prep.toLowerCase()) > -1) {
        toLevel = this.$router.$map[prep]
      }
    }
    if (fromLevel > toLevel) {
      this.transitionName = 'slide-right'
    }
    else {
      this.transitionName = 'slide-left'
    }
    next()
  },
  methods: {
    GetTitle: function(title) {
      this.title = title;
    },
    goback: function() {
      this.$router.goBack();
    },
    afterLeave: function(el) {
      if (this.$refs.ChildView.create)
        this.$refs.ChildView.create()
    }
  },
  created: function() {
    var fixHeight = 48
    if (this.$route.params.phoneType) {
      if (this.$route.params.phoneType.toLowerCase() == 'ios') {
        if (this.$route.params.isProp) {
          console.log(process.env.IOS_PROP_SCHEMAIOS_URL)
          this.$store.commit('Set_SCHEMAIOS_URL', process.env.IOS_PROP_SCHEMAIOS_URL)
          this.fixHead = true
          fixHeight = fixHeight + 20
        }
        else {
          this.$store.commit('Set_SCHEMAIOS_URL', process.env.IOS_SCHEMAIOS_URL)
          this.fixHead = true
          fixHeight = fixHeight + 20
        }
      }
      else {
        if (this.$route.params.isProp) {
          this.$store.commit('Set_SCHEMAIOS_URL', process.env.ANDROID_PROP_SCHEMAIOS_URL)
          this.fixHead = false
        }
        else {
          this.$store.commit('Set_SCHEMAIOS_URL', process.env.ANDROID_SCHEMAIOS_URL)
          this.fixHead = false
        }
      }
    }
    this.height = window.innerHeight - fixHeight
  }
}
</script>

<style scoped>
.head {
  height: 48px;
  width: 100%;
  background-color: #be5ce3;
  font-size: 1.14em;
}

.fixHead {
  height: 20px;
  width: 100%;
  background-color: #be5ce3;
}

.head-content {
  text-align: center;
  line-height: 48px;
  color: #fff;
  position: relative;
}

.head-content-arrow {
  border: solid 2px #fff;
  border-top: 0;
  border-right: 0;
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%) rotate(45deg);
  height: 8px;
  width: 8px;
  cursor: pointer;
}

.head-content-left {
  position: absolute;
  left: 26px;
  cursor: pointer;
}

.child-view {
  position: absolute;
  width: 100%;
  transition: all 0.5s ease;
  -webkit-overflow-scrolling: touch;
  overflow: auto;
}

.slide-left-enter,
.slide-right-leave-active {
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
  width: 100%;
}

.slide-left-leave-active,
.slide-right-enter {
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
  width: 100%;
}

.background {
  background-color: #f0f0f6;
  position: absolute;
  bottom: 0;
  width: 100%;
  top: 0px;
  left: 0;
  -webkit-overflow-scrolling: touch;
}
</style>
