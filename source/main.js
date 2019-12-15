import Vue from 'vue'
import Vuex from 'vuex'

import router from ':src/script/router'
import Store from ':src/script/store'
import api from ':src/script/api'
import lib from ':src/script/lib'

Vue.use(api)
Vue.use(lib)

const store = new Vuex.Store(Store)

import App from ':src/App.vue'

Vue.config.productionTip = false

new Vue({
    router, store, api, lib,
    render: handle => handle(App)
}).$mount('#body')
