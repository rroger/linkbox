import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import { mutations, STORAGE_KEY } from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toasts: []
  },
  actions,
  mutations,
})
