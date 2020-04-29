<template>
	<v-container>
		<v-row class="mb-8 pa-12 d-block">
			<h1>Showing tasks under "{{ priorityVal }}" Priority...</h1>
			<h2 v-if="tasks.length === 0">There are no tasks to display</h2>
			<v-btn to="https://to-do-list-ria2.netlify.app/rest-tasks" class="mt-5 white--text" color="blue">Go Back</v-btn>
		</v-row>	
		
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
					<th class="text-center">Edit/Delete</th>
				</thead>

				<tbody>
					<tr v-for="task in tasks" :key="task._id">
						<td>{{ task.title }}</td>
						<td>{{ task.content }}</td>
						<td>{{ task.dueDate }}</td>
						<td>{{ task.tags }}</td>
						<td>{{ task.priority }}</td>
						<td class="action-btns">
							<v-btn class="mr-3" icon :to="'https://to-do-list-ria2.netlify.app/rest-edit-task/' + task._id"><v-icon>mdi-pencil-outline</v-icon></v-btn>
						</td>
					</tr>
				</tbody>
			</v-simple-table>
		</v-row>
				
	</v-container>
</template>


<script>
import axios from 'axios';
export default {
	name: 'RESTTasksByPriority.vue',
	data() {
		return {
			priorityVal: this.$route.params.priority,
			tasks: [] || 'No data',
		}
	},
	methods: {
		
	},
	created() {
		axios.get(`https://powerful-oasis-42318.herokuapp.com/bypriority?priority=${this.priorityVal}`)
		.then((response) => {
			this.tasks = response.data;
		})
		.catch((err) => {
			console.error(err);
		})
		.catch((err) => {
			return console.error(err);
		})
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
.table {
	width: 70%;
	margin: 20px 15%;
}
}

@media only screen and (min-width: 996px) {
	
}

</style>