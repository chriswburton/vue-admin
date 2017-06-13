<template>
  <section class="container">
    <h1>My Team</h1>
    <ul>
      <li v-for="user in users">{{user.firstname}} {{user.lastname}}</li>
    </ul>
    <h2>Add a new team member</h2>
    <form @submit.prevent="addUser({firstname, lastname}); resetFields()">
      <input type="text" placeholder="Enter their firstname" v-model="firstname">
      <input type="text" placeholder="Enter their lastname" v-model="lastname">
      <button role="button">Submit</button>
    </form> 
  </section>
</template>
<script>
  // get our required helpers from vuex
  import { mapState, mapActions } from 'vuex'

  export default {
    // create data fields that we can bind values within our template to
    data () {
      return {
        firstname: '',
        lastname: ''
      }
    },
    // spread the necessary props from our vuex state into this component
    computed: {
      ...mapState({
        roles: state => state.roles,
        users: state => state.users
      })
    },
    methods: {
      ...mapActions([
        'addUser'
      ]),
      resetFields () {
        // clear our inputs by re-merging a fresh copy of our initial component data
        Object.assign(this.$data, this.$options.data())
      }
    }
  }
</script>
