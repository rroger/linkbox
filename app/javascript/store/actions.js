const TOAST_DURATION = 5000

export default {
  addToast ({ commit }, text) {
    const toast = { text: text, createdAt: Date.now() }
    commit('addToast', toast)
    setTimeout(() => commit('removeToast', toast), TOAST_DURATION)
  },

  removeToast ({ commit }, toast) {
    commit('removeToast', toast)
  },
}
