export const STORAGE_KEY = 'toasts-vuejs'

export const mutations = {
  addToast (state, toast) {
    state.toasts.push(toast)
  },

  removeToast (state, toast) {
    state.toasts.splice(state.toasts.indexOf(toast), 1)
  },
}
