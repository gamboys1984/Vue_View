export default {
  state: {
    URL: '',
    LastUrl: '',
    PageIndex:'',
    SearchInfo:'',
    SearchWeek:''
  },
  mutations: {
    Set_URL (state, val) {
      state.URL = val
    },
    Set_LastUrl (state, val) {
      state.LastUrl = val
    },
    Set_PageIndex (state, val) {
      state.PageIndex = val
    },
    Set_SearchInfo (state, val) {
      state.SearchInfo = val
    },
    Set_SearchWeek (state, val) {
      state.SearchWeek = val
    }
  }
}
