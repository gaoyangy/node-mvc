import Vue from 'vue'
import App from './App'
import router from './router'
const app = new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app')