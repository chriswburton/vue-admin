// import API data and our axios module for reaching out to our simple JSON server
import axios from 'axios'
import API from '../api.js'

// we'll declare an initialisation function for our app to get our data on first load
export async function init ({store, redirect, isClient}) {
  // 'isClient' is true during app navigation - prevents GET requests on every navigation
  if (isClient) return

  // because we're using server-side rendering, we should try/catch to handle any API errors non-fatally
  try {
    // reach out to our server for data
    const userResponse = await axios.get(`${API.baseURL}/users`)
    const roleResponse = await axios.get(`${API.baseURL}/roles`)
    // push our API data into our vuex store
    store.commit('init', {
      users: userResponse.data,
      roles: roleResponse.data
    })
  } catch (e) {
    // we'll redirect to our 'error.vue' page
    redirect('/error')
  }
}
