<template>
  <section class="container">
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
