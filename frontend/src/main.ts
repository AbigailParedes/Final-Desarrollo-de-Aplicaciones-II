import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router/router';
import '@fortawesome/fontawesome-free/css/all.css';
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

