import Vue from 'vue'
import Vuex from 'vuex'

const abc = {
    "ru": {
        "activity": "Активность"
    },

    "en": {
        "activity": "Activity"
    }
}

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            status: true
        }
    },

    mutations: {  },
    actions: { },
    modules: { }
})