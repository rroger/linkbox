import Vue from 'vue/dist/vue.js'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import 'bootstrap/dist/js/bootstrap'
import App from '../app.vue'
import { routes } from '../routes'
import store from '../store'
import focus from '../directives/focus'
import LbConfirmation from '../components/lb-confirmation'

Vue.use(VueResource)
Vue.use(VueRouter)
const router = new VueRouter({
  routes
})
Vue.directive('focus', focus)
Vue.component('lb-confirmation', LbConfirmation)

document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(document.createElement('app'))
  new Vue({
    el: 'app',
    router,
    store,
    template: '<App/>',
    components: { App }
  })
})
