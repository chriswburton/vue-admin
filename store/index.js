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
    roles: [
      {
        id: 0,
        title: 'Software Developer'
      },
      {
        id: 1,
        title: 'Business Development Manager'
      },
      {
        id: 2,
        title: 'Marketing Manager'
      },
      {
        id: 3,
        title: 'Help and Support'
      }
    ],
    users: [
      {
        id: 0,
        firstname: 'Chris',
        lastname: 'Burton',
        roleIds: [0],
        managerOf: [1, 2],
        permissions: {
          admin: true
        }
      },
      {
        id: 1,
        firstname: 'Michael',
        lastname: 'Statham',
        roleIds: [0],
        permissions: {
          admin: false
        }
      },
      {
        id: 2,
        firstname: 'Hayley',
        lastname: 'Puplett',
        roleIds: [2, 3],
        permissions: {
          admin: false
        }
      },
      {
        id: 3,
        firstname: 'David',
        lastname: 'Brown',
        roleIds: [3],
        permissions: {
          admin: false
        }
      },
      {
        id: 4,
        firstname: 'Jack',
        lastname: 'Tango',
        roleIds: [1],
        permissions: {
          admin: true
        }
      }
    ]
  }
}
