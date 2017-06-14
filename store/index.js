// outline our actions and mutations
export const actions = {
  addUser ({commit}, newUser) {
    // generate a psuedo-random 'id' for our newUser
    newUser.id = Math.floor(Math.random() * 1000) + 1
    // pass our value args into our addUser 'mutation' method
    commit('addUser', newUser)
  },
  deleteUser ({commit}, targetUserId) {
    // TEMP - we'll come back and implement an API dispatch here shortly
    commit('deleteUser', targetUserId)
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
  }
}

// declare a mock initial state for our app
export const state = () => {
  return {
    users: [],
    roles: []
  }
}
