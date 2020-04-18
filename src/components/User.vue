<template>
  <ApolloMutation
    :mutation="require('../graphql/UpdateTask.gql')"
    :variables="{
      id,
      title,
      description,
      dueDate,
      tags,
      user,
      }"
      @done="onDone"
  >
  <template v-slot="{ mutate, loading, error }">
    <!-- Form here -->
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="title" label="Task Title" required filled></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-textarea v-model="content" label="Task description" rows="4" filled clearable></v-textarea>
          </v-col>
        </v-row>
        <v-row >
          <v-col cols="12" md="5">
          <v-text-field v-model="dueDate" filled label="Due Date"></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
          <v-text-field v-model="tags" filled label="Tags"></v-text-field>
          </v-col>
          <v-col cols="12" md="5">
          <v-select :items="user" v-model="user" filled multiple label="Assigned User"></v-select>
          </v-col>
        </v-row>
        <v-btn large color="secondary" :disabled="loading" @click="returnHome">Cancel</v-btn>
        <v-btn large color="primary" :disabled="loading" @click="mutate()">Save</v-btn>
        <p v-if="error">An error occurred: {{ error }}</p>
      </v-container>
    </v-form>
  </template>
  </ApolloMutation>
</template>

<script>
export default {
  data: function() {
    return {
      id: this.$store.getters.tasks.id,
      title: this.$store.getters.tasks.title,
      content: this.$store.getters.tasks.content,
      dueDate: this.$store.getters.tasks.dueDate,
      tags: this.$store.getters.tasks.tags,
      createdBy: this.$store.getters.tasks.createdBy,
    }
  },
  methods: {
    onDone() {
      return console.log('Done')
    },
    returnHome() {
      console.log('Going home')
      this.$router.push('/')
    }
  }
}
</script>