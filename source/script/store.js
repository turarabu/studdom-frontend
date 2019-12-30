import Vue from 'vue'
import Vuex from 'vuex'

import user from './store/user'
import dormitories from './store/dormitories'
import students from './store/students'

Vue.use(Vuex)

export default {
    modules: { user, dormitories, students },
    state: {
        actions: [],
        cities: {},
        modals: [],
    },

    mutations: {
        openModal, closeModal,
        'cities-set': setCities,
        'set-actions': setActions
    },
}

function setCities (state, list) {
    state.cities = list
}

function setActions (state, data) {
    state.actions = data
}

function openModal (state, modal) {
    state.modals.push(modal)
}

function closeModal (state, id) {
    state.modals.splice(id, 1)
}





function usersList () {
    return [
        ['Попов', 'Машрал', '', 'Президент', 'Администратор', 'admin', 324, '', ''],
        ['Алиев', 'Берен', '', 'Зам. президент', 'Администратор', 'admin', 234, '', ''],
        ['Султанов', 'Ахан', '', 'IT Администратор', 'Управляющий', 'editor', 121, '', ''],
        ['Амангельды', 'Ордабай', '', 'Бухгалтер', 'Управляющий', 'editor', 345, '', ''],
        ['Абдуллаев', 'Кайыргали', '', 'IT Администратор', 'Управляющий', 'editor', 243, '', ''],
        ['Ахметов', 'Рашит', '', 'IT Администратор', 'Управляющий', 'editor', 342, '', ''],
        ['Калиев', 'Медеу', '', 'Специалист', 'Пользователь', 'user', 124, '', ''],
        ['Оспанов', 'Мардан', '', 'Специалист', 'Пользователь', 'user', 123, '', ''],
        ['Амангельды', 'Дандай', '', 'Специалист', 'Пользователь', 'user', 215, '', ''],
        ['Сулейменов', 'Уали', '', 'Специалист', 'Пользователь', 'user', 142, '', ''],
        ['Амангельды', 'Бахыт', '', 'Специалист', 'Пользователь', 'user', 214, '', ''],
        ['Сулейменов', 'Нахып', '', 'Специалист', 'Пользователь', 'user', 124, '', ''],
        ['Каримов', 'Монке', '', 'Специалист', 'Пользователь', 'user', 451, '', ''],
        ['Омаров', 'Наби', '', 'Специалист', 'Пользователь', 'user', 683, '', ''],
        ['Смагулов', 'Асан', '', 'Специалист', 'Пользователь', 'user', 214, '', ''],
        ['Искаков', 'Азамат', '', 'Специалист', 'Пользователь', 'user', 351, '', ''],
        ['Калиев', 'Шона', '', 'Специалист', 'Пользователь', 'user', 241, '', ''],
        ['Ибрагимов', 'Сырым', '', 'Специалист', 'Пользователь', 'user', 335, '', ''],
        ['Садыков', 'Бактияр', '', 'Специалист', 'Пользователь', 'user', 222, '', ''],
        ['Мурат', 'Ахмет', '', 'Специалист', 'Пользователь', 'user', 453, '', ''],
        ['Каримов', 'Нурпейіс', '', 'Специалист', 'Пользователь', 'user', 251, '', ''],
        ['Садыков', 'Арыстан', '', 'Специалист', 'Пользователь', 'user', 345, '', '']
    ]
}

function citiesList () {
    return {
        'uskg': 'Усть-Каменогорск',
        'krg': 'Караганда',
        'sm': 'Семей',
        'msk': 'Москва',
        'spbg': 'Санкт-Петергбург',
        'astn': 'Нур-Султан (Астана)'
    }
}

function dormitoriesList () {
    return {
        // '0': {
        //     name: 'ВКГТУ',
        //     city: 'uskg',
        //     students: 2456,
        //     activity: 23,
        //     auths: 14156,
        //     max: 10000
        // },

        // '1': {
        //     name: 'КАРГУ',
        //     city: 'krg',
        //     students: 1245,
        //     activity: 34,
        //     auths: 54861,
        //     max: 10000
        // },

        // '2': {
        //     name: 'СГРК',
        //     city: 'sm',
        //     students: 6546,
        //     activity: 13,
        //     auths: 23156,
        //     max: 10000
        // },

        // '3': {
        //     name: 'МГУ',
        //     city: 'msk',
        //     students: 7685,
        //     activity: 1,
        //     auths: 14167,
        //     max: 10000
        // },

        // '4': {
        //     name: 'СГПИ',
        //     city: 'spbg',
        //     students: 2182,
        //     activity:23,
        //     auths: 56441,
        //     max: 10000
        // },

        // '5': {
        //     name: 'МУА',
        //     city: 'astn',
        //     students: 2253,
        //     activity:23,
        //     auths: 54646,
        //     max: 10000
        // },

        // '6': {
        //     name: 'ЕНУ',
        //     city: 'astn',
        //     students: 4223,
        //     activity:23,
        //     auths: 4562,
        //     max: 10000
        // }
    }
}