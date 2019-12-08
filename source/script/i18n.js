import Vue from 'vue'
import locales from ':src/script/locales'

const i18n = { install }

Vue.use(i18n)

export default i18n

function install (Vue) {
    Vue.prototype.setLangVuex = function (store) {
        store.state.i18n = {
            locales,
            current: 'ru'
        }

        Vue.prototype.dic = store.state.i18n.locales[ store.state.i18n.current ]
        store.mutations.setLang = function (state, lang) {
            state.i18n.current = lang
        }
    }
}