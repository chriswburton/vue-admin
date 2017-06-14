<template>
  <section>
    <h2>Add a new team member</h2>
    <form @submit.prevent="addUser({firstname, lastname, roleIds, managerOf, permissions: {admin: isAdmin}}); resetFields()">
      <input type="text" placeholder="Enter their firstname" v-model="firstname" v-bind:class="{invalid: firstname.length===0}">
      <input type="text" placeholder="Enter their lastname" v-model="lastname" v-bind:class="{invalid: lastname.length===0}">
      <select name="roles" v-model="roleIds" multiple>
          <option v-for="role in roles" v-bind:value="role.id">{{role.title}}</option>
      </select>
      <select name="managers" v-model="managerOf" multiple>
          <option v-for="user in users" v-bind:value="user.id">{{user.firstname}} {{user.lastname}}</option>
      </select>
      <input id="admin-status" type="checkbox" v-bind:checked="isAdmin" v-model="isAdmin"> <label for="admin-status">Is this user an admin?</label>
      <button role="button" v-bind:disabled="firstname.length===0 || lastname.length===0">Submit</button>
    </form> 
  </section>
</template>
<style scoped>
  .invalid { border: 2px solid red }
</style>
<script>
  // import required modules and components
  import { mapState, mapActions } from 'vuex'

  export default {
    // create data fields that we can bind values within our template to
    data () {
      return {
        firstname: '',
        lastname: '',
        roleIds: [],
        managerOf: [],
        isAdmin: false
      }
    },
    // spread the necessary props from our vuex state into this component
    computed: {
      ...mapState({
        roles: state => state.roles,
        users: state => state.users
      })
    },
    // create access to/declare the methods this component utilises
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
