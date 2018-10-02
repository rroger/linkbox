import Vue from 'vue/dist/vue.js'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from '../app.vue'
import 'bootstrap/dist/js/bootstrap'

import { routes } from '../routes'
import store from '../store'
import LbConfirmation from '../components/lb-confirmation'


Vue.use(VueResource)
Vue.use(VueRouter)
const router = new VueRouter({
  routes
})

// Global Component registration:
Vue.component('lb-confirmation', LbConfirmation)

document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(document.createElement('app'))
  new Vue({
    el: 'app',
    router,
    store, // inject store to all children
    template: '<App/>',
    components: { App }
  })
})
