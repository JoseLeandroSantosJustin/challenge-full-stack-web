export default {
	namespaced: true,
	state: {
    id: undefined,
    email: undefined,
    token: undefined
  },
  getters: {
    getId(state) {
      return state.id
    },
    getEmail(state) {
      return state.email
    },
    getToken(state) {
      return state.token
    }
  },
  mutations: {
    setId(state, id) {
      state.id = id
    },
    setEmail(state, email) {
      state.email = email
    },
    setToken(state, token) {
      state.token = token
    },
    removeUserData(state) {
      state.id = undefined
      state.email = undefined
      state.token = undefined
    }
  },
  actions: {
    setId(context, id) {
      context.commit('setId', id)
    },
    setEmail(context, email) {
      context.commit('setEmail', email)
    },
    setToken(context, token) {
      context.commit('setToken', token)
    },
    removeUserData(context) {
      context.commit('removeUserData')
    }
  }
}
