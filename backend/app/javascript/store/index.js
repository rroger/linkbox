import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import links from './modules/links'
import toasts from './modules/toasts'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    toasts,
    links
  },
})
