<template>
  <v-app>
    <v-app-bar
      app
      dark
    >
    <v-spacer></v-spacer>
    <div>
        <router-link class="routerLink" to="/">Home</router-link><span class="routerLink"> | </span>
        <router-link class="routerLink" to="/user">Users</router-link><span class="routerLink"> | </span>
        <router-link class="routerLink" to="/task">Tasks</router-link>
      </div>
    <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
//import ApolloExample from './components/ApolloExample';

export default {
  name: 'App',

  components: {
    //ApolloExample,
    //User
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
}
.routerLink {
  color: #fff;
  font-size: 1.5rem;
  text-decoration: none;
}
</style>
