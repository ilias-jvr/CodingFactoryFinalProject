import Vue from 'vue';
import App from './App.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import NotFound from './components/NotFound.vue';
import BootstrapVue from 'bootstrap-vue';
import Logout from './components/Logout.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueRouter from 'vue-router';
Vue.use(BootstrapVue);
Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = {
    '/': App,
    '/login': Login,
    '/register': Register,
    '/404': NotFound,
    '/logout': Logout,
    '*': NotFound,
};

new Vue({
    el: '#app',
    data: {
        currentRoute: window.location.pathname,
    },
    computed: {
        ViewComponent() {
            return routes[this.currentRoute] || NotFound;
        },
    },
    render(h) {
        return h(this.ViewComponent);
    },
});
