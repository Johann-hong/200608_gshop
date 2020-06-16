import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button} from 'mint-ui'

import './mock/mockServer'

import VueLazyload from 'vue-lazyload'
import loading from './common/imgs/loading.gif'

import './filters'

Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  loading
})

//注册全局组件标签
Vue.component(Button.name, Button)  //<mt-button>

new Vue ({
    el: '#app',
    render: h => h(App),
    router,
    store
})
