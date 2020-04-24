<template>
  <div id="app">
    <div id="nav">
      <v-container>
			<router-link to="/">Home</router-link>
			<router-link to="/tasks">Tasks</router-link>
			<router-link to="/users">Users</router-link>
      </v-container>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
	font-family: 'Roboto', sans-serif;
	font-weight: 400;
}

#nav {
	font-family: 'Roboto', sans-serif;
	font-weight: 700;

	display: flex;
	justify-content: space-evenly;
}
</style>
