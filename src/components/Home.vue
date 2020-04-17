<template>
  <!-- Apollo watched Graphql query -->
  <ApolloQuery :query="require('../graphql/AllTasks.gql')"
   :variables="{ searchString }">
    <template v-slot="{ result: { loading, error, data } }">
      <!-- Loading -->
      <div v-if="loading" class="loading apollo">Loading...</div>

      <!-- Error -->
      <div v-else-if="error" class="error apollo">An error occured</div>

      <!-- Result -->
      <div v-else-if="data" class="result apollo">
        <v-row>
          <v-col cols="4" v-for="(item, i) in data.tasks" :key="i">
            <v-card class="mx-auto" max-width="350">
              <v-card-text>
                <p class="taskTitle">
                  {{ item.title }}
                </p>
                <p>{{ item.content }}</p>
                <div class="text--primary">
                  {{ item.content | truncate(200) }}
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" fab x-small dark @click="editTask(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- No result -->
      <div v-else class="no-result apollo">No result :(</div>
    </template>
  </ApolloQuery>
</template>

<script>
//import vue-truncate-filter from 'vue-truncate-filter'

export default {
  name: 'Home',

  data: () => ({
    searchString: ""
  }),
  methods: {
    editTask(task) {
      this.$store.dispatch('editTask', task)
      this.$router.push('task')
    }
  }
}
</script>

<style scoped>
.result {
  padding: 1rem;
}

.taskTitle {
  font-size: 1.25rem;
  font-weight: 600;
}
</style>
