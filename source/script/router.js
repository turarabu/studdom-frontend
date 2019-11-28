import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from ':src/views/Home.vue'
import About from ':src/views/About.vue'


export default router()

function router () {
    Vue.use(VueRouter)

    return new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes: routesList()
    })
}

function routesList () {
    return [
        {
            path: '/',
            name: 'home',
            component: Home
        },
    
        {
            path: '/about',
            name: 'about',
            component: About
        }
    ]
}