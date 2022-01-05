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
    }, {
        path: '/novels',
        name: 'Novels',
        component: () => import(/* webpackChunkName: "chapters" */ '../views/Novels')
    }, {
        path: '/storyworlds/wessex/podcasts',
        name: 'WessexPodcasts',
        component: () => import(/* webpackChunkName: "chapters" */ '../views/StoryWorldsWessexPodcasts')
    }, {
        path: '/storyworlds/wessex/features',
        name: 'WessexFeatures',
        component: () => import(/* webpackChunkName: "chapters" */ '../views/StoryWorldsWessexFeatures')
    }, {
        path: '/policies',
        name: 'Policies',
        component: () => import(/* webpackChunkName: "chapters" */ '../views/Policies.vue')
    }, {
        path: '/contact',
        name: 'Contact',
        component: () => import(/* webpackChunkName: "chapters" */ '../views/Contact.vue')
    }, {
        path: '/:author/:book/:medium?',
        name: 'InfoPage ',
        component: () => import(/* webpackChunkName: "chapters" */ '../views/InfoPage.vue')
    }, {
        // deal with a 404 (assuming that ths will be the same as 'unknown' to this set of routes)
        // by sending the user back to the welcome page
        // NB: the name given could be used by the code to show the user a 'not found' message, as it is known on
        // arrival, but does not actually affect navigation (the '1-component-tests. achieves that)
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
