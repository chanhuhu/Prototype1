import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);

export default new Router({
<<<<<<< HEAD
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
        }
    ]
})
=======
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import( './views/Admin.vue')
    },
    {
      path: '/client',
      name: 'client',
      component: () => import( './views/Client.vue')
    },
    {
      path: '/ListPage',
      name: 'ListPage',
      component: () => import( './views/ListPage.vue')
    }
  ]
})
>>>>>>> fbb03fd1ba594dccb204fe55d3f0dbdba53d295a
