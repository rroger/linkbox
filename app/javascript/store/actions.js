import { Toast } from '../models/toast'

const TOAST_DURATION = 5000

export default {
  addToast ({ commit }, raw_toast ) {
    const toast = new Toast(... raw_toast)
    commit('addToast', toast)
    setTimeout(() => commit('removeToast', toast), TOAST_DURATION)
  },

  removeToast ({ commit }, toast) {
    commit('removeToast', toast)
  },
}
