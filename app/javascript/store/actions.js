export default {
  addToast ({ commit }, text) {
    const toast = { text: text, createdAt: Date.now() }
    commit('addToast', toast)
    setTimeout(() => commit('removeToast', toast), 3000)
  },

  removeToast ({ commit }, toast) {
    commit('removeToast', toast)
  },
}
