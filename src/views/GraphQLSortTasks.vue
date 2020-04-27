<template>
	<v-container class="pb-12">
		<v-row>
			<v-container class="text-center">
				<h1 class="text-center mt-8">Sorting Tasks by "{{ filter }}: {{ searchString }}"</h1>
				<v-btn to="/graphql-tasks" class="mt-4">Go Back</v-btn>
			</v-container>
		</v-row>

		<ApolloQuery
			:query="require('../graphql/AllTasks.gql')"
			:variables="{ searchString }"
			fetchPolicy="no-cache"
		>
			<template slot-scope="{ result: { loading, error, data } }">
				<!-- Loading -->
				<div v-if="loading" class="loading apollo">Loading...</div>

				<!-- Error -->
				<div v-else-if="error" class="error apollo">An error occurred</div>

				<!-- No result -->
				<div v-else-if="data.Tasks.length === 0" class="no-result apollo">
					<v-card class="d-flex align-center justify-center pa-6" elevation="9" color="orange lighten-4 mt-8">
						<h2 class="text-center">There is are no tasks by that {{ filter }}.</h2>
					</v-card>
				</div>

				

				<!-- Result -->
				<div v-else-if="data.Tasks.length > 1" class="result apollo">
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

				
			</template>
		</ApolloQuery>
	</v-container>
</template>

<script>
export default {
	name: 'GraphQLSortTasks.vue',
	data() {
		return {
			searchString: this.$route.params.string,
			filter: this.$route.params.filter,
			task: {},
		}
	},
	methods: {
		editTask(task) {
			this.$store.dispatch('editTask', task);
			this.$router.push(`/graphql-edit/${task.id}`);
		},
		returnHome() {
			this.$router.push('/graphql-tasks');
		}
	},
	beforeMount() {
		console.log('FILTER: ' +this.filter);
		console.log('TAG: ' +this.searchString);
		if(this.filter === 'Tag'){
			this.task.tags = this.searchString;
		} else if (this.filter === 'Priority') {
			this.task.priority = this.searchString;
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

@media only screen and (min-width: 768px) {
.table {
	width: 70%;
	margin: 20px 15%;
}
}
</style>