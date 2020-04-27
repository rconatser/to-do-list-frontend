<template>
	<v-container>

		<ApolloMutation
			:mutation="require('../graphql/AddUser.gql')"
			:variables="{
				name: user.name,
				email: user.email,
				lives: user.lives
			}"
			@done="returnHome"
		>
			<template v-slot="{ mutate, loading, error }">
				<v-container>
					<v-row>
					<v-dialog v-model="addUserDialog" max-width="600px">
					<template v-slot:activator="{ on }">
						<v-btn color="primary" dark v-on="on">Add User</v-btn>
					</template>
					<v-card v-model="valid">
						<v-card-title>
						<span class="headline">Add a User</span>
						</v-card-title>
						<v-card-text>
						<v-container>
							<v-row>
								<v-col cols="12" sm="6" md="4">
									<v-text-field cols="col-xs-12 col-sm-6" v-model="user.name" label="Name"></v-text-field>
								</v-col>
								<v-col cols="12" sm="6" md="4">
									<v-text-field cols="col-xs-12 col-sm-6" class="text--primary" v-model="user.email" :rules="emailRules" label="Email"></v-text-field>
								</v-col>
								<v-col cols="12" sm="6" md="4">
									<v-select :items="states" label="Tags" v-model="user.lives"></v-select>
								</v-col>
							</v-row>
						</v-container>
						<small>* indicates required field</small>
						<p v-if="error">An error occurred: {{ error }}</p>
						</v-card-text>
						<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" text @click="addUserDialog = false">Close</v-btn>
						<v-btn color="blue darken-1" text @click="mutate()">Add User</v-btn>
						</v-card-actions>
					</v-card>
					</v-dialog>
					</v-row>
				</v-container>
			</template>
		</ApolloMutation>
	</v-container>

</template>

<script>
// import GraphQLTasks from '@/components/GraphQLTasks'

export default {
	name: 'TaskList',
/*
	components: {
		GraphQLTasks
	},
*/
	data: () => ({
		addUserDialog: false,
		editUserDialog: false,
		valid: false,
		user: {
			name: '',
			email: '',
			lives: ''
		},
		emailRules: [
			v => /.+@.+/.test(v) || 'E-mail must be valid',
		],
		states: [
			'Alabama',
			'Alaska',
			'American Samoa',
			'Arizona',
			'Arkansas',
			'California',
			'Colorado',
			'Connecticut',
			'Delaware',
			'District of Columbia',
			'Florida',
			'Georgia',
			'Guam',
			'Hawaii',
			'Idaho',
			'Illinois',
			'Indiana',
			'Iowa',
			'Kansas',
			'Kentucky',
			'Louisiana',
			'Maine',
			'Maryland',
			'Massachusetts',
			'Michigan',
			'Minnesota',
			'Minor Outlying Islands',
			'Mississippi',
			'Missouri',
			'Montana',
			'Nebraska',
			'Nevada',
			'New Hampshire',
			'New Jersey',
			'New Mexico',
			'New York',
			'North Carolina',
			'North Dakota',
			'Northern Mariana Islands',
			'Ohio',
			'Oklahoma',
			'Oregon',
			'Pennsylvania',
			'Puerto Rico',
			'Rhode Island',
			'South Carolina',
			'South Dakota',
			'Tennessee',
			'Texas',
			'U.S. Virgin Islands',
			'Utah',
			'Vermont',
			'Virginia',
			'Washington',
			'West Virginia',
			'Wisconsin',
			'Wyoming'
		]
	}),

	computed: {
		sendUser() {
			return (this.user);
		},
	},
	
	methods: {
		returnHome() {
			this.$router.push('/graphql');
		}
	},
};
</script>

<style scoped>

</style>