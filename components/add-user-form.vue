<template>
  <section id="new-user" class="mt-4 pt-4">
    <h2 class="my-4">Add a new team member</h2>
    <p>Please provide details for this new user.</p>
    <hr>
    <form @submit.prevent="addUser({firstname, lastname, roleIds, managerOf, permissions: {admin: isAdmin}}); resetFields()">
      <div class="row">
        <div class="col-md-6 p-2">
          <label for="firstname">Firstname:</label>
          <input type="text" id="firstname" class="form-control" placeholder="Enter their firstname" v-model="firstname" v-bind:class="{invalid: firstname.length===0}" required>
        </div>
        <div class="col-md-6 p-2">
          <label for="lastname">Lastname:</label>
          <input type="text" id="lastname" class="form-control" placeholder="Enter their lastname" v-model="lastname" v-bind:class="{invalid: lastname.length===0}" required>
        </div>
      </div>
      <div class="row">
        <div class="col-12 py-2">
          <label for="job-roles">Which job(s) does this user have?</label>
          <select id="job-roles" class="form-control" name="roles" v-model="roleIds" multiple>
              <option v-for="role in roles" v-bind:value="role.id">{{role.title}}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-12 py-2">
          <label for="manager-of">Does this user manage any staff?</label>
          <select id="manager-of" class="form-control" name="managers" v-model="managerOf" multiple>
              <option v-for="user in users" v-bind:value="user.id">{{user.firstname}} {{user.lastname}}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-12 p-4">
          <label class="custom-control custom-checkbox">
            <input id="admin-status" type="checkbox" class="custom-control-input" v-bind:checked="isAdmin" v-model="isAdmin">
            <span class="custom-control-indicator"></span>
            <span class="custom-control-description">Is this user an admin?</span>
          </label>
        </div>
      </div>
      <button class="btn btn-primary" role="button" v-bind:disabled="firstname.length===0 || lastname.length===0">Submit</button>
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
