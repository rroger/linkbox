import { Toast } from '../../models/toast'

const TOAST_DURATION = 5000

const state = {
  toasts: []
}

// getters
const getters = {
  toasts: state => {
    return state.toasts
  }
}

const actions = {
  addToast ({ commit }, raw_toast ) {
    const toast = new Toast(... raw_toast)
    commit('addToast', toast)
    setTimeout(() => commit('removeToast', toast), TOAST_DURATION)
  },

  removeToast ({ commit }, toast) {
    commit('removeToast', toast)
  },
}

const mutations = {
  addToast (state, toast) {
    state.toasts.push(toast)
  },

  removeToast (state, toast) {
    state.toasts.splice(state.toasts.indexOf(toast), 1)
  },
}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}
