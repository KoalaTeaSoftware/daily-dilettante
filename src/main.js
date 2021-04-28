import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import {firebaseConfig} from './firebaseConfig'

import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(firebase) // maybe this needs to be made available everywhere, just the same as Bootstrap

Vue.config.productionTip = false

new Vue({
    router,
    created() {
        console.log("The router is being created, so set up firebase")
        firebase.initializeApp(firebaseConfig)
        firebase.analytics()
    },
    render: h => h(App)
}).$mount('#app')
