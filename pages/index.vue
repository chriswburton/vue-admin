<template>
  <section class="container">
    <h1>My Team ({{users.length}} total)</h1>
    <input type="text" v-model="search" placeholder="Filter staff by typing...">
    <table>
      <thead>
        <th>Employee Name</th>
        <th>Employee Role(s)</th>
        <th>This user manages:</th>
        <th>Is this user an admin?</th>      
      </thead>
      <tbody>
        <tr v-for="user in users" v-show="user.firstname.toLowerCase().includes(search.toLowerCase()) || user.lastname.toLowerCase().includes(search.toLowerCase())">
          <td>{{user.firstname}} {{user.lastname}}</td>
          <td>
            <template v-if="user.roleIds && user.roleIds.length > 0">{{user.roleIds | findById(roles)}}</template>
            <template v-else>This user does not have a role</template>
          </td>          
          <td>
            <template v-if="user.managerOf && user.managerOf.length > 0">{{user.managerOf | findById(users)}}</template>
            <template v-else>This user does not manage any staff</template>
          </td>   
          <td>{{user.permissions.admin ? 'Yes' : 'No'}}</td> 
        </tr>
      </tbody>
    </table>
    <h2>Add a new team member</h2>
    <form @submit.prevent="addUser({firstname, lastname, roleIds, managerOf}); resetFields()">
      <input type="text" placeholder="Enter their firstname" v-model="firstname" v-bind:class="{invalid: firstname.length===0}">
      <input type="text" placeholder="Enter their lastname" v-model="lastname" v-bind:class="{invalid: lastname.length===0}">
      <select name="roles" v-model="roleIds" multiple>
        <option v-for="role in roles" v-bind:value="role.id">{{role.title}}</option>
      </select>
      <select name="managers" v-model="managerOf" multiple>
        <option v-for="user in users" v-bind:value="user.id">{{user.firstname}} {{user.lastname}}</option>
      </select>
      <input id="admin-status" type="checkbox" v-bind:checked="isAdmin"> <label for="admin-status">Is this user an admin?</label>
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
        search: '',
        firstname: '',
        lastname: '',
        roleIds: [],
        managerOf: [],
        isAdmin: false
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
