<template>
	<v-container>

		<ApolloMutation
			:mutation="require('../graphql/AddTask.gql')"
			:variables="{
				name: task.title,
				content: task.content,
				dueDate: task.dueDate,
				priority: task.priority,
				tags: task.tags,
				createdBy: task.createdBy,
			}"
			@done="returnHome"
		>
			<template v-slot="{ mutate, loading, error }">
				<v-container>
					<v-row>
					<v-dialog v-model="addTaskDialog" max-width="600px">
					<template v-slot:activator="{ on }">
						<v-btn color="primary" dark v-on="on">Add Task</v-btn>
					</template>
					<v-card>
						<v-card-title>
						<span class="headline">Add a Task</span>
						</v-card-title>
						<v-card-text>
						<v-container>
							<v-row>
								<v-col cols="12" md="6">
									<v-text-field cols="col-xs-12 col-sm-6" v-model="task.title" label="Title"></v-text-field>
								</v-col>
								<v-col cols="12" md="6">
									<v-text-field cols="col-xs-12 col-sm-6" class="text--primary" v-model="task.content" label="Description"></v-text-field>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12" sm="6">
									<v-text-field v-model="task.dueDate" label="Due Date"></v-text-field>
								</v-col>
								<v-col cols="12" sm="6">
									<v-select :items="priorities" label="Priority" v-model="priority"></v-select>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12" sm="6">
									<v-select :items="tags" label="Tags" v-model="tags"></v-select>
								</v-col>									
								<v-col cols="12" sm="6">
									<v-text-field v-model="task.createdBy" label="Created By"></v-text-field>
								</v-col>
							</v-row>
						</v-container>
						<small>* indicates required field</small>
						<p v-if="error">An error occurred: {{ error }}</p>
						</v-card-text>
						<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" text @click="addTaskDialog = false">Close</v-btn>
						<v-btn color="blue darken-1" text @click="mutate()">Add Task</v-btn>
						</v-card-actions>
					</v-card>
					</v-dialog>
					</v-row>
				</v-container>
			</template>
		</ApolloMutation>

		<ApolloQuery
			:query="require('../graphql/AllTasks.gql')"
		>
			<template slot-scope="{ result: { loading, error, data } }">
				<!-- Loading -->
				<div v-if="loading" class="loading apollo">Loading...</div>

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
								<th class="text-center">Edit</th>
							</thead>

							<tbody>
								<tr v-for="task in tasks" :key="task._id">
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
				<div v-else class="no-result apollo">No result :(</div>
			</template>
		</ApolloQuery>
	</v-container>

</template>

<script>

export default {
	name: 'GraphQLTasks.vue',
	data: () => ({
		addTaskDialog: false,
		editTaskDialog: false,

		tagArr: '',
		task: {
			title: '',
			content: '',
			dueDate: '',
			priority: '',
			tags: '',
			createdBy: ''
		},

		tags: [
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
		]
	}),

	computed: {
		sendTask() {
			return (this.task);
		},
	},
	
	methods: {
		editTask(task) {
			this.$store.dispatch('editTask', task);
			this.$router.push(`/graphql-edit-task/${task._id}`);
		},
	},
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

@media only screen and (min-width: 768px) {
.table, .crud-cards {
	width: 70%;
	margin: 20px 15%;
}
}

@media only screen and (min-width: 996px) {
	
}

</style>