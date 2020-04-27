<template>
	<div class="background">
	<ApolloMutation
		:mutation="require('../graphql/AddTask.gql')"
		:variables="{
			title: task.title,
			content: task.content,
			dueDate: task.dueDate,
			priority: task.priority,
			tags: task.tags,
			createdBy: task.createdBy,
		}"
		@done="goHome"
	>
		<template v-slot="{ mutate, loading }">
				<v-container>
					<v-row>
						<v-col>
							<v-card class="add-task">
								<v-form @submit.prevent="mutate()">
								<v-card-title>
								<span class="headline">Add a Task</span>
								</v-card-title>
								<v-card-text>
								<v-container>
									<!-- Loading -->
									<div v-if="loading" class="loading apollo">Loading...</div>
									<v-row>
										<v-col cols="12" md="6">
											<v-text-field cols="col-xs-12 col-sm-6" v-model="task.title" label="Title*"></v-text-field>
										</v-col>
										<v-col cols="12" md="6">
											<v-text-field cols="col-xs-12 col-sm-6" class="text--primary" v-model="task.content" label="Description*"></v-text-field>
										</v-col>
									</v-row>
									<v-row>
										<v-col cols="12" sm="6">
											<v-text-field v-model="task.dueDate" label="Due Date*"></v-text-field>
										</v-col>
										<v-col cols="12" sm="6">
											<v-select :items="priorities" label="Priority*" v-model="task.priority"></v-select>
										</v-col>
									</v-row>
									<v-row>
										<v-col cols="12" sm="6">
											<v-select :items="tags" label="Tags*" v-model="task.tags"></v-select>
										</v-col>									
										<v-col cols="12" sm="6">
											<v-text-field v-model="task.createdBy" label="Created By*"></v-text-field>
										</v-col>
									</v-row>
								</v-container>
								<small>* indicates required field</small>
								</v-card-text>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn color="grey darken-1" text @click="goHome">Cancel</v-btn>
									<v-btn color="blue darken-1" text type="submit">Add Task</v-btn>
								</v-card-actions>
							</v-form>
							</v-card>
						</v-col>
					</v-row>
				</v-container>
		</template>
	</ApolloMutation>
	</div>
</template>

<script>
export default {
	name: "GraphQLAddTask.vue",
	data: () => ({
		task: {
			title: '',
			content: '',
			dueDate: '',
			tags: '',
			priority: '',
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
		],
	}),
	methods: {
		goHome() {
			return this.$router.push('/graphql-tasks');
		}
	},
	
}
</script>

<style scoped>
	.add-task {
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