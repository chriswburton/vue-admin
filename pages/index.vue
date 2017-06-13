<template>
  <section class="container">
    {{users}}
  </section>
</template>
<script>
  // get our required methods from vuex
  import { mapState } from 'vuex'

  export default {
    // spread the necessary props from our vuex state into this component
    computed: {
      ...mapState({
        roles: state => state.roles,
        users: state => state.users
      })
    }
  }
</script>
