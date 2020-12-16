export default {
  namespaced: true,
  state: {
    isVisible: false
  },
  getters: {
    isVisible(state) {
      return state.isVisible
    }
  },
  mutations: {
    setVisibility(state, visibility) {
      state.isVisible = visibility
    }
  },
  actions: {
    setVisibility(context, visibility) {
      context.commit('setVisibility', visibility)
    }
  }
}
