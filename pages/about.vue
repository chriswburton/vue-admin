<template>
  <section>
    <div class="jumbotron">
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <img id="profile-pic" class="img-fluid rounded-circle mx-auto d-block" src="~assets/images/chris.jpg">
            </div>
            <div class="col-md-7 offset-md-1">
              <h1 class="display-3 pt-4">Hi, I'm Chris.</h1>
              <p class="pt-3">I'm a full-stack software developer with a passion for JS.</p>
              <p>Vue is my "go to" framework whenever I need to throw together a simple, standalone web application. It's straightforward, lightweight and fast to get up and running.</p>
              <p>Nuxt/Vue.js/Vuex is an awesome front-end stack and I feel the code I've put together in this mini project showcases the features I really love about it.</p>             
            </div>          
          </div>          
        </div>
      </div>         
    </section>
</template>
<script>
  import { init } from './shared'

  export default {
    // bind the 'fetch' lifecycle method to our shared initialisation function
    fetch: init
  }
</script>
<style scoped>
  #profile-pic { max-height: 280px }
</style>
