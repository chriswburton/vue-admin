<template>
    <section class="container mt-4 pt-4">
        <h1>Edit details</h1>
        <div v-if="saved" class="alert alert-success p-4 my-4" role="alert">
          <h4 class="alert-heading">Well done! This user has now been updated.</h4>
          <p class="mb-0">You will be able to see these updates the next time you visit the "Home" page.</p>
        </div>
        <form @submit.prevent="editUser({id,firstname,lastname,roleIds,managerOf,permissions}); notifyUser()">
          <div class="row">
            <div class="col-md-6 p-2">
              <label for="firstname">Firstname:</label>
              <input type="text" id="firstname" class="form-control" placeholder="Enter their firstname" v-model="firstname">
            </div>
            <div class="col-md-6 p-2">
              <label for="lastname">Lastname:</label>
              <input type="text" id="lastname" class="form-control" placeholder="Enter their lastname" v-model="lastname">
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
                <input id="admin-status" type="checkbox" class="custom-control-input" v-bind:checked="permissions.admin" v-model="permissions.admin">
                <span class="custom-control-indicator"></span>
                <span class="custom-control-description">Is this user an admin?</span>
              </label>
            </div>
          </div>
          <button class="btn btn-primary" role="button">Save changes</button>
        </form>        
    </section>
</template>
<script>
  // get our required helpers from vuex
  import { mapState, mapActions } from 'vuex'
  import { init } from '../shared'
  import axios from 'axios'
  import API from './../../api'

  export default {
    fetch: init,
    // destructure our asyncData arg to give us access to our URL param
    asyncData ({params}) {
      // request our target user document from our API, resolving it to form the data structure of this component
      return axios.get(`${API.baseURL}/users/${params.id}`).then(response => Object.assign(response.data, { saved: false }))
    },
    // compute the data for the user we wish to edit
    computed: {
      ...mapState({
        roles: state => state.roles,
        users: state => state.users
      })
    },
    // methods for this component
    methods: {
      ...mapActions([
        'editUser'
      ]),
      notifyUser () {
        this.$data.saved = true
        setTimeout(() => { this.$data.saved = false }, 4500)
      }
    }
  }
</script>
