import Vue from 'vue/dist/vue.js'

export default {
  inserted: function (el) {
    Vue.nextTick(function() {
      el.focus()
    })
  }
}
