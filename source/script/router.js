import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from ':src/views/Home.vue'
import Activity from ':src/views/Activity.vue'
import Dormitories from ':src/views/Dormitories.vue'
import Students from ':src/views/Students.vue'
import Users from ':src/views/Users.vue'
import Records from ':src/views/Records.vue'
import Settings from ':src/views/Settings.vue'

import DormitoriesAll from ':src/views/Dormitories/All.vue'
import Dormitory from ':src/views/Dormitories/Dormitory.vue'


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
            path: '/activity',
            name: 'activity',
            component: Activity
        },
    
        {
            path: '/dormitories',
            name: 'dormitories',
            redirect: '/dormitories/all',
            component: Dormitories,
            children: [

                {
                    path: 'all',
                    component: DormitoriesAll
                },

                {
                    path: 'id/:id',
                    component: Dormitory
                }
            ]
        },
    
        {
            path: '/students',
            name: 'students',
            component: Students
        },
    
        {
            path: '/users',
            name: 'users',
            component: Users
        },
    
        {
            path: '/records',
            name: 'records',
            component: Records
        },
    
        {
            path: '/settings',
            name: 'settings',
            component: Settings
        }
    ]
}