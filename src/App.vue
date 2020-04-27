<template>
  <v-app id="app">	
	<div id="nav">
		<v-app-bar 
		:clipped-left="$vuetify.breakpoint.lgAndUp"
		app
		color="#1E88E5"
		dark
		>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" />
			<v-toolbar-title>To Do List</v-toolbar-title>
		</v-app-bar>
		<v-navigation-drawer
		v-model="drawer"
		absolute
		temporary
		>
			<v-list nav>
				<v-list-item-group>
					<router-link class="routerLink" to="/">
						<v-list-item link>
							<v-list-item-icon class="mr-4">
								<v-icon>mdi-home</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>Home</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</router-link>
					<router-link class="routerLink" to="/rest-tasks">
						<v-list-item link>
							<v-list-item-icon class="mr-4">
								<v-icon>mdi-format-list-checks</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>View Tasks (REST)</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</router-link>
					<router-link class="routerLink" to="/graphql-tasks">
						<v-list-item link>
							<v-list-item-icon class="mr-4">
								<v-icon>mdi-graphql</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>Tasks (GraphQL)</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</router-link>
					<router-link class="routerLink" to="/graphql-users">
						<v-list-item link>
							<v-list-item-icon class="mr-4">
								<v-icon>mdi-account-circle</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>Users (GraphQL)</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</router-link>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>
	</div>

	<v-content>
		<router-view/>
	</v-content>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
    }),
  }
</script>

<style>
#app {
	font-family: 'Roboto', sans-serif;
	font-weight: 400;
}
#nav {
	font-family: 'Roboto', sans-serif;
	font-weight: 700;
}

#nav .routerLink {
	text-decoration: none;
}

#nav .routerLink.router-link-active {
	color: #1976D2;
}

#nav .routerLink i {
	margin-right: 10px;
}

</style>
