import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import store from './stores/index'
import router from './router'
import vuetify from './plugins/vuetify'


Vue.config.productionTip = false
Vue.use(require('vue-moment'))

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
