import Vue from 'vue/dist/vue.js';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import App from '../app.vue';
import { routes } from '../routes';
import 'bootstrap/dist/js/bootstrap';

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(document.createElement('app'));
  new Vue({
    el: 'app',
    router,
    template: '<App/>',
    components: { App }
  });
});
