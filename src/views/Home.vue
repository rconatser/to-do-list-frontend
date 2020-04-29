<template>
	<div>
		<div class="home">
			<v-container class="py-12">
				<h1 class="white--text display-2 mb-4">To Do List Final Project</h1>
				<h2 class="white--text display-1 font-weight-light">Project for Rich Internet Applications 2</h2>
			</v-container>
		</div>

		<v-row class="mt-8 pb-12">
			<v-container class="d-flex justify-center align-start">
				<v-col cols="12" sm="6" md="4">
					<v-card hover="elevation-9" to="/rest-tasks">
						<v-img src="https://wp-statistics.com/wp-content/uploads/edd/2017/08/wp-statistics-rest-api.png" alt="To do list image" class="ma-0 pa-0" height="300px" />
						<h2 class="px-6 py-8 text-center">Manipulate Tasks using a REST Api</h2>
						<v-content class="mt-0 py-6 px-6 pt-0">
							<ul class="ul-checkmark">
								<li>CREATE a meaningful (at least 5 data fields) resource through a REST endpoint that is stored in the datastore</li>
								<li>Read or GET meaningful data from 3 different REST endpoints</li>
								<li>UPDATE at least 1 portion of meaningful data through the appropriate endpoint</li>
								<li>DELETE some resource via the proper endpoint</li>
							</ul>
						</v-content>
					</v-card>
				</v-col>

				<v-col cols="12" sm="6" md="4">
					<v-card hover="elevation-9" to="/graphql-tasks">
						<v-img src="https://cdn-images-1.medium.com/max/750/1*XK-d3dgy4uvykEtXmON06A.png" alt="To do list image" class="ma-0 pa-0" height="300px" />
						<h2 class="px-6 py-8 text-center">Manipulate Tasks using a GraphQL Api</h2>
						<v-content class="mt-0 py-6 px-6 pt-0">
							<ul class="ul-checkmark">
								<li>CREATE a meaningful (at least 5 data fields) resource through a GraphQL endpoint that is stored in the datastore</li>
								<li>Read or GET meaningful data from with at least 3 different query options from the GraphQL endpoint.</li>
								<li>UPDATE at least 1 portion of meaningful data through an appropriate GraphQL mutation.</li>
								<li>DELETE some resource using a proper GraphQL mutation.</li>
							</ul>
						</v-content>
						<v-card-actions>
							<v-btn hidden>Learn More</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-container>
		</v-row>
	</div>
</template>

<script>
export default {
  name: 'Home',
  
}
</script>

<style scoped>
.home {
	background-image: url('https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
	background-size: cover;
	background-repeat: no-repeat;
	height: 300px;
	background-position: center;
	display: flex;
	justify-content: center;
	align-items: center;
}

ul.ul-checkmark {
  list-style: none;
}

ul.ul-checkmark li:before {
  content: '✓';
  font-size: 22px;
  margin-right: 10px;
  margin-top: 5px;
  font-weight: 900;
  color: #2196F3;
}

@media only screen and (min-width: 768px) {

}

@media only screen and (min-width: 960px) {
	
}
</style>
