import Vue from 'vue'

import router from ':src/script/router'
import store from ':src/script/store'

import App from ':src/App.vue'

Vue.config.productionTip = false

new Vue({
    router, store,
    render: handle => handle(App)
}).$mount('#body')
