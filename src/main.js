import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import store from "@/store/index.js"
import router from './router'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui'

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
