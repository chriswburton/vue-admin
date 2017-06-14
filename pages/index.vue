<template>
  <section class="container mt-4 pt-4">
    <ul class="nav justify-content-end my-3">
      <li class="nav-item">
        <nuxt-link class="nav-link" to="/#new-user">Add New User</nuxt-link>
      </li>      
    </ul>
    <UserTable></UserTable>
    <AddUserForm></AddUserForm>
  </section>
</template>
<script>
  // import required modules and components
  import { mapMutations } from 'vuex'

  import UserTable from '~/components/user-table'
  import AddUserForm from '~/components/add-user-form'

  import { init } from './shared'

  export default {
    // bind the 'fetch' lifecycle method to our shared initialisation function
    fetch: init,
    // declare components used within this vue
    components: {
      UserTable,
      AddUserForm
    },
    // declare the relevant methods for this page
    methods: {
      ...mapMutations([
        'init'
      ])
    }
  }
</script>
