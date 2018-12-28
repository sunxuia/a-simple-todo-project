import Vue from 'vue'
import './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'typeface-roboto/index.css'
import VueDateTime from 'vue-datetime'

import './common/date-utils'
import store from './store/store'
import createRouter from './router/router'
import ShowConfirmDialog from './components/common/showConfirmDialog'
import App from './views/App.vue'
import './styles/transitions.scss'

Vue.use(VueDateTime)
Vue.use(ShowConfirmDialog)

Vue.config.productionTip = false

new Vue({
  store,
  router: createRouter(),
  render: h => h(App)
}).$mount('#app')
