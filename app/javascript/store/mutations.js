export const STORAGE_KEY = 'toasts-vuejs'

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  window.localStorage.clear()
}

export const mutations = {
  addToast (state, toast) {
    state.toasts.push(toast)
  },

  removeToast (state, toast) {
    state.toasts.splice(state.toasts.indexOf(toast), 1)
  },
}
