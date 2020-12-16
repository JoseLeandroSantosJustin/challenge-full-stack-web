export default {
  namespaced: true,
  state: {
    alert: {
      show: false,
      type: 'info',
      message: ''
    }
  },
  getters: {
    getAlert(state) {
      return state.alert
    }
  },
  mutations: {
    setShow(state, show) {
      state.alert.show = show
    },
    setType(state, type) {
      state.alert.type = type
    },
    setMessage(state, message) {
      state.alert.message = message
    }
  },
  actions: {
    setAlert(context, { show, type, message }) {
      context.commit('setShow', show);
      context.commit('setType', type);
      context.commit('setMessage', message);
    }
  }
}
