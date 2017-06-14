<template>
	<section>
		<h1>My Team ({{users.length}} total)</h1>
		<input type="text" v-model="search" placeholder="Filter staff by typing...">
		<table>
			<thead>
				<tr>
					<th>Employee Name</th>
					<th>Employee Role(s)</th>
					<th>This user manages:</th>
					<th>Is this user an admin?</th>
					<th>Actions</th>      
				</tr>
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
					<td>
					<button role="button" @click="deleteUser(user.id)">Delete <img src="https:icon.now.sh/trash" alt="Delete this user?"></button>
					<nuxt-link :to="'edit/' + user.id">Edit <img src="https:icon.now.sh/compose" alt="Click to edit this user"></nuxt-link>
					</td>
				</tr>
			</tbody>
		</table>
	</section>
</template>
<script>
  // import required modules and components
  import { mapState, mapActions } from 'vuex'

  // create data fields that we can bind values within our template to
  export default {
    data () {
      return {
        search: ''
      }
    },
    // define our custom filters
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
    // get access to the methods this component needs
    methods: {
      ...mapActions([
        'deleteUser'
      ])
    }
  }
</script>
