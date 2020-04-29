<template>
	<div class="background">
		<v-container>
			<v-card class="edit-task">
				<v-card-title>
					<span class="headline">Edit a Task</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>
							<v-col cols="12" md="6">
								<v-text-field cols="col-xs-12 col-sm-6" v-model="task.title" label="Title*"></v-text-field>
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field cols="col-xs-12 col-sm-6" class="text--primary" v-model="task.content" label="Description*"></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12" sm="6" md="4">
								<v-text-field v-model="task.dueDate" label="Due Date*"></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="4">
								<v-select :items="priorities" label="Priority*" v-model="task.priority"></v-select>
							</v-col>
							<v-col cols="12" sm="6" md="4">
								<v-select :items="tags" label="Tags*" v-model="task.tags"></v-select>
							</v-col>
						</v-row>
					</v-container>
					<small>* indicates required field</small>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="grey darken-1" text @click="goHome">Cancel</v-btn>
					<v-btn color="blue darken-1" text @click="updateTask">Edit Task</v-btn>
					<v-btn color="red darken-1" text @click="deleteTask">Delete Task</v-btn>
				</v-card-actions>
			</v-card>
		</v-container>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	name: "RESTEditTask.vue",
	data() {
		return {
			taskId: this.$route.params.id,
			tasks: [],
			task: [],

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
			],
		}
	},
	methods: {
		updateTask() {
			axios.put('https://powerful-oasis-42318.herokuapp.com/update/'+ this.taskId, {
				body: {
					id: this.taskId,
					title: this.task.title,
					content: this.task.content,
					dueDate: this.task.dueDate,
					priority: this.task.priority,
					tags: this.task.tags,
				}
			})
			.then((response) => {
				this.tasks = response.data;
			})
			.then(() => {
				this.goHome()
			})
		},
		deleteTask() {
			axios.delete('https://powerful-oasis-42318.herokuapp.com/delete/'+ this.taskId, {
				body: {
					id: this.taskId
				}
			})
			.then(() => {
				this.goHome()
			})
		},
		goHome() {
			return this.$router.push('/rest-tasks')
		}
	},
	beforeMount() {
		axios.get(`https://powerful-oasis-42318.herokuapp.com/task/${this.taskId}`)
		.then((response) => {
			this.tasks = response.data;
		})
	},

}
</script>

<style scoped>
	.edit-task {
		width: 60%;
		margin: 60px auto;
	}

	.background {
		background-image: url('https://images.pexels.com/photos/9754/mountains-clouds-forest-fog.jpg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
		background-size: cover;
		background-repeat: no-repeat;
		height: 100%;
	}
</style>