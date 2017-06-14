// import axios for communicating with our server
import axios from 'axios'
import API from './../api'

// outline our actions and mutations
export const actions = {
  async addUser ({commit}, newUser) {
    // we'll POST our newUser off to our API to be saved permanently
    const response = await axios.post(`${API.baseURL}/users`, newUser)
    // pass our value args into our addUser 'mutation' method
    commit('addUser', response.data)
  },
  async deleteUser ({commit}, targetUserId) {
    // we'll issue a DELETE request to our API to ensure this user is removed permanently
    await axios.delete(`${API.baseURL}/users/${targetUserId}`)
    // dispatch
    commit('deleteUser', targetUserId)
  },
  async editUser ({commit}, updatedUserData) {
    // update document on server
    await axios.put(`${API.baseURL}/users/${updatedUserData.id}`, updatedUserData)
    // dispatch
    commit('editUser', updatedUserData)
  }
}

export const mutations = {
  init (state, initialState) {
    state.users = initialState.users
    state.roles = initialState.roles
  },
  addUser (state, newUser) {
    state.users = [...state.users, newUser]
  },
  deleteUser (state, targetUserId) {
    state.users = state.users.filter(user => user.id !== targetUserId)
  },
  editUser (state, updatedUser) {
    state.users = state.users.map(
      user => user.id === updatedUser.id
        ? updatedUser
        : user
    )
  }
}

// declare a mock initial state for our app
export const state = () => {
  return {
    users: [],
    roles: []
  }
}
