export default {
  namespaced: true,
  state: {
    showMenuIcon: true
  },
  getters: {
    showMenuIcon(state) {
      return state.showMenuIcon
    }
  },
  mutations: {
    switchIconState(state, visibility) {
      state.showMenuIcon = visibility
    }
  },
  actions: {
    switchIconState(context, visibility) {
      context.commit('switchIconState', visibility)
    }
  }
}
