import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import GraphQLTasks from './views/GraphQLTasks.vue'
import GraphQLEditTask from './views/GraphQLEditTask.vue'
import GraphQLAddTask from './views/GraphQLAddTask.vue'
import GraphQLSortTasks from './views/GraphQLSortTasks.vue'

import RESTTasks from './views/RESTTasks.vue'
import RESTEditTask from './views/RESTEditTask.vue'
import RESTTasksByTags from './views/RESTTasksByTags.vue'
import RESTTasksByPriority from './views/RESTTasksByPriority.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/graphql-tasks',
    name: 'GraphQL Tasks',
    component: GraphQLTasks
  },
  {
	path: '/graphql-edit/:id',
	name: 'GraphQL Edit Task',
	component: GraphQLEditTask
  },
  {
	path: '/graphql-add',
	name: 'GraphQL Add Task',
	component: GraphQLAddTask
  },
  {
	path: '/graphql-sort/:filter/:string',
	name: 'GraphQL Sort Tasks',
	component: GraphQLSortTasks
  },
  {
    path: '/rest-tasks',
    name: 'REST Tasks',
    component: RESTTasks
  },
  {
	path: '/rest-edit-task/:id',
	name: 'Edit Task',
	component: RESTEditTask
  },
  {
	path: '/by-tag/:tag',
	name: 'Sort By Tag',
	component: RESTTasksByTags
  },
  {
	path: '/by-priority/:priority',
	name: 'Sort By Priority',
	component: RESTTasksByPriority
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
