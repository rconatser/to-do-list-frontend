import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'
import { createProvider } from './vue-apollo'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	apolloProvider: createProvider(),
	vuetify,
	render: (h) => h(App),
}).$mount('#app');