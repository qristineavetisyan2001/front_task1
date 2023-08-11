import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router';

import DashboardPage from './components/DashboardPage.vue';
import HelloWorld from "@/components/HelloWorld.vue";
import UserPage from './components/UserPage.vue';

Vue.component('user-page', UserPage);

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter);

Vue.use(VueAxios, axios)
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const routes = [
  { path: '/', component: HelloWorld, name: "HelloWorld"},
  { path: '/dashboard', component: DashboardPage, name: "DashboardPage"},
  { path: '/user-page', component: UserPage, name: "UserPage"},
];

const router = new VueRouter({
  mode: "history",
  routes,
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

export default router;
