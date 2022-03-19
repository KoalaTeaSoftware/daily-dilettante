import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import VueCookies from 'vue-cookies'
// Vue.use(VueCookies)
import firebase from "firebase/app"; // so that the next statement works
import "firebase/analytics" // so that we can initiate the analytics
// Import Bootstrap an BootstrapVue CSS files (order is important) at this point so that everyone gets it
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make various things available throughout your project
// Vue.use(BootstrapVue)
// Vue.use(IconsPlugin)
// Vue.use(firebase) // maybe this needs to be made available everywhere, just the same as Bootstrap
import {firebaseConfig} from './firebaseConfig' // this is my own file
Vue.config.productionTip = false

new Vue({
    router,
    created: function () {
        // console.log("The router is being created, so set up auth")
        firebase.initializeApp(firebaseConfig)
        firebase.analytics()
    },
    render: h => h(App)
}).$mount('#app')
