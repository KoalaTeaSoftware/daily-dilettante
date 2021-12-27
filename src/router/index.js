import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from "@/views/Welcome";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Welcome',
        component: Welcome
    }, {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "chapters" */ '../views/About')
    },
    {
        path: '/novels',
        name: 'Novels',
        component: () => import(/* webpackChunkName: "chapters" */ '../views/Novels')
    },
    {
        path: '/storyworlds',
        name: 'StoryWorlds',
        component: () => import(/* webpackChunkName: "chapters" */ '../views/StoryWorlds')
    },
    {
        path: '/policies',
        name: 'Policies',
        component: () => import(/* webpackChunkName: "chapters" */ '../views/Policies.vue')
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import(/* webpackChunkName: "chapters" */ '../views/Contact.vue')
    },
    {
        path: '/hardy/desperate-remedies',
        name: 'DesperateRemedies',
        component: () => import(/* webpackChunkName: "chapters" */ '../views/hardy/DesperateRemedies.vue')
    },
    {
        path: '/hardy/the-hand-of-ethelberta',
        name: 'TheHandOfEthelberta',
        component: () => import(/* webpackChunkName: "chapters" */ '../views/hardy/TheHandOfEthelBerta')
    },
    {
        // deal with a 404 (assuming that ths will be the same as 'unknown' to this set of routes)
        // by sending the user back to the welcome page
        path: '*',
        name: 'Not Found',
        component: Welcome

    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
