<template>
	<div class="background">
		<v-container>
			<v-card class="edit-task">
				<v-form @submit.prevent="updateTask">
					<v-card-title>
					<span class="headline">Edit a Task</span>
					</v-card-title>
					<v-card-text>
						<v-container>
							<v-row>
								<v-col cols="12" md="6">
									<v-text-field cols="col-xs-12 col-sm-6" v-model="tasks.title" label="Title*"></v-text-field>
								</v-col>
								<v-col cols="12" md="6">
									<v-text-field cols="col-xs-12 col-sm-6" class="text--primary" v-model="tasks.content" label="Description*"></v-text-field>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12" sm="6" md="4">
									<v-text-field v-model="tasks.dueDate" label="Due Date*"></v-text-field>
								</v-col>
								<v-col cols="12" sm="6" md="4">
									<v-select :items="priorities" label="Priority*" v-model="tasks.priority"></v-select>
								</v-col>
								<v-col cols="12" sm="6" md="4">
									<v-select :items="tags" label="Tags*" v-model="tasks.tags"></v-select>
								</v-col>
							</v-row>
						</v-container>
						<small>* indicates required field</small>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="grey darken-1" text @click="goHome">Cancel</v-btn>
						<v-btn color="blue darken-1" text type="submit">Edit Task</v-btn>
						<v-btn color="red darken-1" text @click="deleteTask">Delete Task</v-btn>
					</v-card-actions>
				</v-form>
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
				id: this.taskId,
				title: this.tasks.title,
				content: this.tasks.content,
				dueDate: this.tasks.dueDate,
				priority: this.tasks.priority,
				tags: this.tasks.tags
			})
			.then((response) => {
				this.tasks = response.data;
			})
			.then(() => {
				this.goHome()
			})
			.catch((err) => {
				return console.error(err);
			})
		},
		deleteTask() {
			axios.delete('https://powerful-oasis-42318.herokuapp.com/delete/'+ this.taskId, this.taskId)
			.then(() => {
				this.goHome()
			})
			.catch((err) => {
				return console.error(err);
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
			console.log(this.taskId);
		})
		.catch((err) => {
			console.error(err);
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