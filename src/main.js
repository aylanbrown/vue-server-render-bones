// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'


Vue.use(ElementUI, { size: 'small' })


export function createApp() {
	const router = createRouter()
	const store = createStore()

	sync(store, router)

	const app = new Vue({
	  router,
	  store,
	  render: h => h(App)
	})
	return { app, router, store }
}
