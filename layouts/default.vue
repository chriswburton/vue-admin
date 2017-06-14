<template>
  <div>
    <AppHeader></AppHeader>
    <nuxt/>
    <AppFooter></AppFooter>
  </div>
</template>
<script>
  import AppHeader from '~/components/app-header'
  import AppFooter from '~/components/app-footer'

  export default {
    components: {
      AppHeader,
      AppFooter
    }
  }
</script>
