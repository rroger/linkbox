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
    commit('ADD_TOAST', toast)
    setTimeout(() => commit('REMOVE_TOAST', toast), TOAST_DURATION)
  },
}

const mutations = {
  ADD_TOAST (state, toast) {
    state.toasts.push(toast)
  },

  REMOVE_TOAST (state, toast) {
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
