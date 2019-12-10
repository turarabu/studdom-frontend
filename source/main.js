import Vue from 'vue'

import router from ':src/script/router'
import store from ':src/script/store'
import api from ':src/script/api'

Vue.use(api)

import App from ':src/App.vue'

Vue.config.productionTip = false

new Vue({
    router, store, api,
    render: handle => handle(App)
}).$mount('#body')
