import Vue from 'vue'
import Vuex from 'vuex'

import alert from './alert/alert'
import user from './user/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    alert,
    user
  }
});