import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Task from '../views/Task.vue'
import User from '../views/User.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        { 
            path: '/',
            name: "home",
            component: Home
        },
        {
            path: '/task',
            name: "task",
            component: Task
        },
        {
            path: '/user',
            name: "user",
            component: User
        }
    ]
})