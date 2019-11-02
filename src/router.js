import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/admin',
            name: 'admin',
            component: () =>
                import ('./views/Admin.vue')
        },
        {
            path: '/client',
            name: 'client',
            component: () =>
                import ('./views/Client.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () =>
                import ('./views/register.vue')
        },
    ]
})

