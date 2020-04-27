<template>
	<div class="background">
		<v-container>



			<ApolloMutation
				:mutation="require('../graphql/UpdateTask.gql')"
				:variables="{
					id,
					title,
					content,
					dueDate,
					priority,
					tags,
					createdBy
				}"
				@done="goHome"
			>
				<template v-slot="{ mutate, loading, error }">
					<v-container>
						<v-row>
							<v-col>
								<v-card class="edit-task">
								<v-card-title>
									<span class="headline">Edit a Task</span>
								</v-card-title>
								<v-card-text>
									<v-container>
										<v-row>
											<v-col cols="12" sm="6" md="4">
												<v-text-field cols="col-xs-12 col-sm-6" v-model="title" label="Title*"></v-text-field>
											</v-col>
											<v-col cols="12" sm="6" md="4">
												<v-text-field cols="col-xs-12 col-sm-6" class="text--primary" v-model="content" label="Description*"></v-text-field>
											</v-col>
											<v-col cols="12" sm="6" md="4">
												<v-text-field v-model="dueDate" label="Due Date*"></v-text-field>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="12" sm="6" md="4">
												<v-select :items="priorities" label="Priority*" v-model="priority"></v-select>
											</v-col>
											<v-col cols="12" sm="6" md="4">
												<v-select :items="tagz" label="Tags*" v-model="tags"></v-select>
											</v-col>
											<v-col cols="12" sm="6" md="4">
												<v-text-field v-model="createdBy" label="Created By*"></v-text-field>
											</v-col>
										</v-row>
									</v-container>
									<small>* indicates required field</small>
								</v-card-text>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn color="grey darken-1" text @click="goHome">Cancel</v-btn>
									<v-btn color="blue darken-1" text @click="mutate()">Edit Task</v-btn>
									<v-btn color="red darken-1" text @click="deleteTask">Delete Task</v-btn>
								</v-card-actions>
								</v-card>
							</v-col>
						</v-row>
					</v-container>
				</template>
			</ApolloMutation>
		</v-container>
	</div>
</template>

<script>
import DELETE_TASK from '../graphql/DeleteTask.gql';

export default {
	name: "GraphQLEditTask.vue",
	data() {
		return {
			id: this.$route.params.id,
			title: this.$store.state.editingTask.title,
			content: this.$store.state.editingTask.content,
			dueDate: this.$store.state.editingTask.dueDate,
			priority: this.$store.state.editingTask.priority,
			tags: this.$store.state.editingTask.tags,
			createdBy: this.$store.state.editingTask.createdBy,

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
		}
	},
	methods: {
		async deleteTask() {
			await this.$apollo.mutate({
				mutation: DELETE_TASK,
				variables: {
					id: this.id,
				},
			});
			await this.goHome();
		},
		goHome() {
			return this.$router.push('/graphql-tasks');
		}
	},
	
}
</script>

<style scoped>
	.edit-task {
		width: 60%;
		margin: 60px auto;
	}

	.background {
		background-image: url('https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
		background-size: cover;
		background-repeat: no-repeat;
		height: 100%;
	}
</style>