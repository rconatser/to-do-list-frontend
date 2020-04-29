<template>
	<v-container class="pb-12">
		<v-row class="mb-8">
			<v-row>
				<v-container>
					<h1 class="text-center mt-8">Today's Tasks...</h1>
					<h2 class="text-center">RESTful API - It will take a while to load</h2>
				</v-container>
			</v-row>
			
			<template>
				<v-container>
					<v-row class="crud-cards">
						<v-col cols="12" sm="6" lg="4">
							<v-card class="pa-6 align-center d-flex flex-column justify-end" height="100%">
								<h2 class="d-block text-center mb-4 mb-md-8 grey--text">Thought of something to add?</h2>
								<v-dialog v-model="addTaskDialog" max-width="600px">
									<template v-slot:activator="{ on }">
										<v-btn color="blue" dark v-on="on">Add Task</v-btn>
									</template>
									<v-card>
										<v-card-title>
										<span class="headline">Add Task</span>
										</v-card-title>
										<v-card-text>
										<v-container>
											<v-row>
												<v-col cols="12" md="6">
													<v-text-field cols="col-xs-12 col-sm-6" v-model="newTask.title" label="Title*" :rules="[rules.required]"></v-text-field>
												</v-col>
												<v-col cols="12" md="6">
													<v-text-field cols="col-xs-12 col-sm-6" v-model="newTask.content" label="Description*" :rules="[rules.required]"></v-text-field>
												</v-col>
											</v-row>
											<v-row>
												<v-col cols="12" sm="6" md="4">
													<v-text-field v-model="newTask.dueDate" label="Due Date*" :rules="[rules.required]"></v-text-field>
												</v-col>
												<v-col cols="12" sm="6" md="4">
													<v-select :items="priorities" label="Priority*" v-model="newTask.priority" :rules="[rules.required]"></v-select>
												</v-col>
												<v-col cols="12" sm="6" md="4">
													<v-select :items="tagz" label="Tags*" v-model="newTask.tags" :rules="[rules.required]"></v-select>
												</v-col>
											</v-row>
										</v-container>
										<small>* indicates required field</small>
										</v-card-text>
										<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn color="blue" text @click="addTaskDialog = false">Close</v-btn>
										<v-btn color="blue" text @click="addTask">Add Task</v-btn>
										</v-card-actions>
									</v-card>
								</v-dialog>
							</v-card>
						</v-col>
						<v-col cols="12" sm="6" lg="4">
							<v-card class="pa-6 align-center d-flex flex-column" height="100%">
								<v-select :items="tagz" label="Tags*" v-model="tagName"></v-select>
								<v-btn color="blue" class="white--text justify-end" @click="sortByTags(tagName)">Sort by Tag Name</v-btn>
							</v-card>
						</v-col>
						<v-col cols="12" sm="6" lg="4">
							<v-card class="pa-6 align-center d-flex flex-column" height="100%">
								<v-select :items="priorities" label="Priority*" v-model="priorityVal"></v-select>
								<v-btn color="blue" class="white--text justify-end" @click="sortByPriority(priorityVal)">Sort by Priority</v-btn>
							</v-card>
						</v-col>
					</v-row>
				</v-container>
			</template>
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
					<div v-if="tasks.length === 0" class="loading-btn">
						<v-progress-circular
						indeterminate
						color="blue"
						></v-progress-circular>
					</div>
					<tr v-else v-for="task in tasks" :key="task._id">
					<td>{{ task.title }}</td>
					<td>{{ task.content }}</td>
					<td>{{ task.dueDate }}</td>
					<td>{{ task.tags }}</td>
					<td>{{ task.priority }}</td>
					<td class="action-btns">
						<v-btn class="mr-3" icon :to="'/rest-edit-task/' + task._id"><v-icon>mdi-pencil-outline</v-icon></v-btn>
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
	name: 'RESTTasks.vue',
	data: () => ({
		addTaskDialog: false,
		newTask: [],
		tasks: [],
		tagName: '',
		priorityVal: '',

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
	created() {
		axios.get('https://powerful-oasis-42318.herokuapp.com/tasks')
		.then((response) => {
			this.tasks = response.data;
			console.log(response.data);
		})
		.catch((err) => {
			return console.error(err);
		})
	},
	methods: {
		addTask() {
			axios.post('https://powerful-oasis-42318.herokuapp.com/create', this.newTask)
			.then(() => {
				this.addTaskDialog = false;
			})
			.then((response) => {
				axios.get('https://powerful-oasis-42318.herokuapp.com/tasks')
				.then((response) => {
					this.tasks = response.data;
					console.log(response.data);
				})
			})
			.catch((err) => {
				return console.error(err);
			})
		},
		sortByTags(tagName) {
			tagName = this.tagName;
			return this.$router.push('/by-tag/' + tagName);
		},
		sortByPriority(priorityVal) {
			priorityVal = this.priorityVal;
			return this.$router.push('/by-priority/' + priorityVal);
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