<template>
  <section class="container">
    <h1>My Team</h1>
    <table>
      <thead>
        <th>Employee Name</th>
        <th>Employee Role(s)</th>
        <th>This user manages:</th>        
      </thead>
      <tbody>
        <tr v-for="user in users">
          <td>{{user.firstname}} {{user.lastname}}</td>
          <td>
            <template v-if="user.roleIds && user.roleIds.length > 0">{{user.roleIds | findById(roles)}}</template>
            <template v-else>This user does not have a role</template>
          </td>          
          <td>
            <span v-if="user.managerOf && user.managerOf.length > 0">{{user.managerOf | findById(users)}}</span>
            <span v-else>This user does not manage any staff</span>
          </td>       
        </tr>
      </tbody>
    </table>
    <h2>Add a new team member</h2>
    <form @submit.prevent="addUser({firstname, lastname}); resetFields()">
      <input type="text" placeholder="Enter their firstname" v-model="firstname" v-bind:class="{invalid: firstname.length===0}">
      <input type="text" placeholder="Enter their lastname" v-model="lastname" v-bind:class="{invalid: lastname.length===0}">
      <button role="button" v-bind:disabled="firstname.length===0 || lastname.length===0">Submit</button>
    </form> 
  </section>
</template>
<style scoped>
  .invalid { border: 2px solid red }
</style>
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
    // define filters to help us
    filters: {
      findById: (chosen, all) => all.filter(
        item => chosen.includes(item.id)
      ).map(
        item => item.firstname ? item.firstname + ' ' + item.lastname : item.title
      ).join(', ')
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
