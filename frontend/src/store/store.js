import Vue from 'vue'
import Vuex from 'vuex'

import alert from './alert/alert'
import appbar from './appbar/appbar'
import user from './user/user'
import navigationdrawer from './navigationdrawer/navigationdrawer'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    alert,
    appbar,
    user,
    navigationdrawer
  }
});