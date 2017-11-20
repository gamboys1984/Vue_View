import Vue from 'vue'
import Vuex from 'vuex'
import Version from './modules/Version'
import MobileBackstage from './modules/MobileBackstage'
import Backstage from './modules/Backstage'
import Detail from './modules/Detail'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Version,
    MobileBackstage,
    Backstage,
    Detail
  }
})
