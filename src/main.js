import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import Vuelidator from 'vuelidate'


Vue.config.productionTip = false

Vue.use(Vuelidator)

axios.defaults.baseURL = process.env.VUE_APP_FIREBASE_DB_URL

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
