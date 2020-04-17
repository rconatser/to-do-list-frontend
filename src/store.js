import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editableTask: null,
  },
  getters: {
    currentTask: (state) => {
      return state.editableTask
    },
  },
  mutations: {
    editTask(state, editableTask) {
      state.editableTask = editableTask
    },
  },
  actions: {
    editTask(context, task) {
      context.commit('editTask', task)
    },
  },
})
