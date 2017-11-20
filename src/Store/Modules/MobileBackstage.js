export default{
  state: {
    FAQtitile: '',
    FAQtype: 0
  },
  mutations: {
    Set_FAQtitle (state, val) {
      state.FAQtitile = val
    },
    Set_FAQtype (state, val) {
      state.FAQtype = val
    }
  },
  getters: {
  }
}
