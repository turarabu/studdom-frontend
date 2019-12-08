import Vue from 'vue'

import router from ':src/script/router'
import store from ':src/script/store'
import i18n from ':src/script/i18n'

import App from ':src/App.vue'

Vue.config.productionTip = false

new Vue({
    router, store, i18n,
    render: handle => handle(App)
}).$mount('#body')
