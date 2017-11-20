export default {
  state: {
    UN: '',
    AccessToken: ''
  },
  mutations: {
    Set_UN (state, val) {
      state.UN = val
    },
    Set_AccessToken (state, val) {
      state.AccessToken = val
    }
  }
}
