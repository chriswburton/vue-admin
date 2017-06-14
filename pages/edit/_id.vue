<template>
    <section>
        <h1>Edit details</h1>
        <h2 v-if="saved" class="success">User data saved!</h2>
        <form @submit.prevent="editUser({id,firstname,lastname,roleIds,managerOf,permissions}); notifyUser()">
          <p>Firstname:</p>
          <input type="text" v-model="firstname">
          <p>Lastname:</p>
          <input type="text" v-model="lastname">
          <p>Job roles:</p>
          <select name="roles" v-model="roleIds" multiple>
            <option v-for="role in roles" v-bind:value="role.id">{{role.title}}</option>
          </select>
          <select name="managers" v-model="managerOf" multiple>
              <option v-for="user in users" v-bind:value="user.id">{{user.firstname}} {{user.lastname}}</option>
          </select>
          <input id="admin-status" type="checkbox" v-bind:checked="permissions.admin" v-model="permissions.admin"> <label for="admin-status">Is this user an admin?</label>
          <button role="button">Save changes</button>
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
        setTimeout(() => { this.$data.saved = false }, 2000)
      }
    }
  }
</script>
<style scoped>
  .success { color: green; }  
</style>
