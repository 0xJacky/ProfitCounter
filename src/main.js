import Vue from 'vue'
import App from './App.vue'
import utils from '@/lib/utils'

import './lazy'

Vue.use(utils)
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
