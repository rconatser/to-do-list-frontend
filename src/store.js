import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		editingTask: null,
		editingUser: null
	},
	mutations: {
		editTask(state, task) {
			state.editingTask = task;
		},
		editUser(state, user) {
			state.editingUser = user;
		},
	},
	actions: {
		editTask(context, task) {
			context.commit('editTask', task);
		},
		editUser(context, user) {
			context.commit('editUser', user);
		},
	},
});