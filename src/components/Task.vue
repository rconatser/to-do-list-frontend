<template>
<v-container>
<h1>What tasks do you have in store for you today?</h1>
<v-btn @click="getAllTasks">Get Task List</v-btn>
</v-container>
</template>

<script>

export default {
	name: 'task',

	data: () => ({
		
	}),
	methods: {
		getAllTasks() {
		fetch('http://localhost:5000/tasks',
		{
			method: 'GET',
		})
		.then(response => {
			response.json().then(data => {
					return console.log(data)
			})
		})
		.catch(error => {
			return console.error(error)
		})
		}
	}
}
</script>

<style scoped>

</style>
