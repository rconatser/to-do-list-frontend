<template>
	<v-container class="pb-12">
		<v-row>
			<v-container>
				<h1 class="text-center mt-8">Today's Tasks...</h1>
				<h2 class="text-center">GraphQL API</h2>
			</v-container>
		</v-row>

		<v-row class="crud-cards">
			<v-col cols="12" sm="6" lg="4">
				<v-card class="pa-6 align-center d-flex flex-column" height="100%">
					<h2 class="d-block text-center mb-4 mb-md-8 grey--text">Thought of something to add?</h2>
					<v-btn color="blue" class="white--text justify-end" to='/graphql-add'>Add Task</v-btn>
				</v-card>
			</v-col>
			<v-col cols="12" sm="6" lg="4">
				<v-card class="pa-6 align-center d-flex flex-column" height="100%">
					<v-select :items="tagz" label="Tags*" v-model="tagName"></v-select>
					<p class="grey--text" :v-if="this.formErrorTag != ''">{{ formErrorTag }}</p>
					<v-btn color="blue" class="white--text justify-end" @click="sortByTags(tagName)">Sort by Tag Name</v-btn>
				</v-card>
			</v-col>
			<v-col cols="12" sm="6" lg="4">
				<v-card class="pa-6 align-center d-flex flex-column" height="100%">
					<v-select :items="priorities" label="Priority*" v-model="priorityVal"></v-select>
					<p class="grey--text" :v-if="this.formErrorPriority != ''">{{ formErrorPriority }}</p>
					<v-btn color="blue" class="white--text justify-end" @click="sortByPriority(priorityVal)">Sort by Priority</v-btn>
				</v-card>
			</v-col>
		</v-row>

		<ApolloQuery
			:query="require('../graphql/AllTasks.gql')"
			fetchPolicy="no-cache"
		>
			<template slot-scope="{ result: { loading, error, data } }">
				<!-- Loading -->
				<div v-if="loading" class="loading apollo">
					<v-progress-circular
					indeterminate
					color="blue"
					class="loading-btn"
					></v-progress-circular>
				</div>

				<!-- Error -->
				<div v-else-if="error" class="error apollo">An error occurred</div>

				<!-- Result -->
				<div v-else-if="data" class="result apollo">
					<v-row>
						<v-simple-table
						fixed-header
						light
						height="500px"
						class="table"
						>
							<thead>
								<th class="text-center">Title</th>
								<th class="text-center">Description</th>
								<th class="text-center">Due Date</th>
								<th class="text-center">Tags</th>
								<th class="text-center">Priority</th>
								<th class="text-center">Created By</th>
								<th class="text-center">Edit/Delete</th>
							</thead>

							<tbody>
								<tr v-for="task in data.Tasks" :key="task._id">
									<td>{{ task.title }}</td>
									<td>{{ task.content }}</td>
									<td>{{ task.dueDate }}</td>
									<td>{{ task.tags }}</td>
									<td>{{ task.priority }}</td>
									<td>{{ task.createdBy }}</td>
									<td class="action-btns">
										<v-btn class="mr-3" icon @click="editTask(task)"><v-icon>mdi-pencil-outline</v-icon></v-btn>
									</td>
								</tr>
							</tbody>
						</v-simple-table>
					</v-row>
				</div>

				<!-- No result -->
				<div v-else-if="data.Tasks.length === 0" class="no-result apollo">
					<v-card class="d-flex align-center justify-center pa-6" elevation="9" color="orange lighten-4 mt-8">
						<h2 class="text-center">There is are no tasks to show.</h2>
					</v-card>
				</div>
			</template>
		</ApolloQuery>
	</v-container>

</template>

<script>
export default {
	name: 'GraphQLTasks.vue',
	data: () => ({
		dialog: false,
		task: {},
		tagName: '',
		priorityVal: '',
		formErrorTag: '',
		formErrorPriority: '',

		tagz: [
			'Home',
			'School',
			'Homework',
			'Work',
			'Chores',
			'Groceries',
			'General',
			'Other'
		],
		priorities: [
			'Low',
			'Medium',
			'High'
		],
		rules: {
			required: value => !!value || 'Required input.',
		}
	}),

	computed: {
		sendTask() {
			return (this.task);
		},
	},
	
	methods: {
		editTask(task) {
			this.$store.dispatch('editTask', task);
			this.$router.push(`/graphql-edit/${task.id}`);
		},
		sortByTags(tagName) {
			tagName = this.tagName;
			if(tagName != '') {
				this.formErrorTag = '';
				return this.$router.push('/graphql-sort/Tag/' + tagName)
			} else if (tagName === ''){
				this.formErrorTag = 'Must select an option before continuing';
			}
		},
		sortByPriority(priorityVal) {
			priorityVal = this.priorityVal;
			if(priorityVal != '') {
				this.formErrorPriority = '';
				return this.$router.push('/graphql-sort/Priority/' + priorityVal)
			} else if (priorityVal === ''){
				this.formErrorPriority = 'Must select an option before continuing';
			}
		},
		goHome() {
			return this.$router.push('/graphql-tasks')
		}
	}
};
</script>

<style scoped>
.table {
	width: 90%;
	margin: 20px 5%;
	box-shadow: 0 0 4px rgba(0,0,0,.25);
	overflow-x: auto;
}

.table tr:nth-child(odd) {
	background-color: #f7f7f7;
}

.table .action-btns {
	display: flex;
	justify-content: center;
	align-items: center;
}

.loading-btn {
	display: block;
	position: absolute;
	left: 48%;
	padding-top: 80px;
}

@media only screen and (min-width: 768px) {
.table, .crud-cards {
	width: 70%;
	margin: 20px 15%;
}
}

@media only screen and (min-width: 996px) {
	
}

</style>