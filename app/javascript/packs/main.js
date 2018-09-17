import Vue from 'vue/dist/vue.js';
import VueResource from 'vue-resource';
import App from '../app.vue';
import 'bootstrap/dist/js/bootstrap';

Vue.use(VueResource);

document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(document.createElement('app'));
  new Vue({
    el: 'app',
    template: '<App/>',
    components: { App }
  });
});
