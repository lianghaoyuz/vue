import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './index'
import axios from 'axios'
import './element'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/gobal/global.css'
Vue.use(VueRouter)
axios.defaults.baseURL = 'http://localhost:3000'
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('ac_token');
    config.headers['Authorization'] = token;
    return config;
})
axios.interceptors.response.use(response => {
    let { data } = response
    if (data.meta.status === 444) {
        window.location.pathname = '/login'
    }
    return data
})
axios.defaults.timeout = 30000
Vue.prototype.$http = axios



Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')