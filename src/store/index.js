import Vue from 'vue'
import Vuex from 'vuex'
import routes from '../router/index'
import axios from '../auth-user'
import globalAxios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({

  /** APPLICATION GLOBAL STATE */
  state: {
    link: '',
    notes: [],
    idToken: null,
    userId: null,
    user: '',
    isModalView: false,
    currentEdit: {
      id: null,
      message: ''
    }

  },

  //Mutations..........................
  mutations: {
    /** USER MUTATIONS ******************************************* */
    authUser (state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
    },
    addUser(state, user){
      state.user = user
    },
    clearAuthData(state){
      state.idToken = null
      state.userId = null  
      state.notes = []
      state.link = ''
    },

    /** NOTE MUTATIONS ******************************************* */

    SAVE_NEW_NOTE(state, noteData){
      state.notes = [...noteData]
      state.link = ''
    },

    UPDATE_NOTE(state, noteData){
      state.notes.forEach((el) => {
        if(el.id === noteData.id){
          el.message = noteData.message
        } else{
          return false
        }
      })

    },

    CHANGE_COLOR(state, color){
      state.color = color
    },

    DELETE_NOTE(state, noteId){
      const noteIndex = state.notes.findIndex(el => el.id === noteId)
      state.notes.splice(noteIndex, 1)
      state.link = ''
    },

    CHANGE_LINK(state, link){
      if(link === 'readNotes'){
        state.link = 'Loading Notes'
      }

      if(link === 'deleteNote'){
        state.link = 'Deleting Note'
      }

      if(link === 'newNote'){
        state.link = 'Loading new Note'
      }

      if(link === 'signin'){
        state.link = 'Connecting hold on'
      }

      if(link === 'signed'){
        state.link = 'Connected'
      }

      if(link === 'signup'){
        state.link = 'hollup while we sign you'
      }

      if(link === 'signedup'){
        state.link = 'You have been signed'
      }

    },

    EMPTY_LINK(state){
      state.link = ''
    },

    OPEN_MODAL_VIEW(state, noteId){
      const foundNote = state.notes.find(el => el.id == noteId)
      if(foundNote){
        state.currentEdit.id = foundNote.id
        state.currentEdit.message = foundNote.message
        state.isModalView = true
      }else{
        return
      }
      
    },

    CLOSE_MODAL_VIEW(state){
      state.isModalView = false
      state.currentEdit.id = null
      state.currentEdit.message = ''
    }
    
  },

  //ACTIONS...........................................................
  actions: {

    /** USER ACTIONS ******************************************* */

    setLogoutTimer({commit}, expirationTime){
      setTimeout(() => {
        commit('clearAuthData')
      }, expirationTime * 1000)
    },

    //for sing up functionality
    signup({commit, dispatch}, userData){
      axios.post('/accounts:signUp?key=' + process.env.VUE_APP_FIREBASE_AUTH_KEY, {
        email: userData.email,
        password: userData.password,
        returnSecureToken: true
      })
      .then((res) => {
        commit('authUser', {
          token: res.data.idToken,
          userId: res.data.localId
        })
        const now = new Date()
        const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
        localStorage.setItem('token', res.data.idToken)
        localStorage.setItem('userId', res.data.localId)
        localStorage.setItem('expirationDate', expirationDate)
        dispatch('storeUser', userData)
        dispatch('setLogoutTimer', res.data.expiresIn)
        dispatch('alterLink', 'signedup')
        routes.push('/')
        setTimeout(() => {
          commit('EMPTY_LINK')
        }, 2000)
        

      })
      .catch((error) => {
        commit('EMPTY_LINK')
        
      })
    },

    //store user in database functionality
    storeUser({commit, state}, userData){
      if(!state.idToken){
        return
      }
      globalAxios.post('/users.json?auth=' + state.idToken, userData)
      .then(res => {})
      .catch(error => {})
    },

    //Log In functionality
    login({commit, dispatch}, authData){
      axios.post('/accounts:signInWithPassword?key=' + process.env.VUE_APP_FIREBASE_AUTH_KEY, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(res => {
        const now = new Date()
        const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
        localStorage.setItem('token', res.data.idToken)
        localStorage.setItem('userId', res.data.localId)
        localStorage.setItem('expirationDate', expirationDate)
        commit('authUser', {
          token: res.data.idToken,
          userId: res.data.localId
        })
        dispatch('setLogoutTimer', res.data.expiresIn)
        dispatch('alterLink', 'signed')
        routes.push('/')
        setTimeout(() => {
          commit('EMPTY_LINK')
        }, 2000)
          
      })
      .catch(error => {
        commit('EMPTY_LINK')
      })
      

    },

    //authenticate user when APP.vue reloads functionality
    tryAutoLogin({commit}){
      const token = localStorage.getItem('token')
      if(!token){
        return
      }
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if(now >= expirationDate){
        return
      }
      const userId = localStorage.getItem('userId')
      commit('authUser', {
        token: token,
        userId: userId
      })

    },

    //logout functionality
    logout({commit}){
      commit('clearAuthData')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('expirationDate')
      routes.replace('/login')
      
    },


    /** NOTE ACTIONS ******************************************* */
    //Add new note functionality
     addNewNote({commit, dispatch, state}, noteData){
      globalAxios.post('/notes.json?auth=' + state.idToken, noteData)
      .then(res => {
        dispatch('fetchNotes', noteData.userId)
        routes.push('/notes')
      })
      .catch((error) => {
  
      })
     },


     //fetch notes from database for a single user
     fetchNotes({commit,dispatch, state}, userId ){
       if(!state.idToken){
         return
       }
       globalAxios.get('/notes.json?auth=' + state.idToken + '&orderBy="userId"&equalTo="' + userId + '"')
       .then((res) => {
          const data = res.data
          const notes = []
          for(let key in data){
            const note = data[key]
            note.id = key
            notes.push(note)
          }
          commit('SAVE_NEW_NOTE', notes)
       })
       .catch(error => {
         dispatch('logout')
       })
     },

     //Edit and update a note functionality
     updateNote({commit, state}, editedNote){
        if(!editedNote){
          return
        }

        globalAxios.patch('/notes/' + editedNote.id + '.json?auth=' + state.idToken, {
          message: editedNote.message
        })
        .then((res) => {
          commit('UPDATE_NOTE', editedNote)
          commit('CLOSE_MODAL_VIEW')
          
        })
        .catch((error) => {
        })

     },

     //delete a note functionality
     deleteNote({commit, dispatch, state}, noteId){
       if(!noteId){
         return
       }
       if(confirm('Are you sure you want to remove this note?')){
        dispatch('alterLink', 'deleteNote')
        globalAxios.delete('/notes/' + noteId + '.json?auth=' + state.idToken)
        .then(res => {
        commit('DELETE_NOTE', noteId)
          
        })
      }
    },

    //backdrop loader commit functionality
    alterLink({commit}, link){
       commit('CHANGE_LINK', link)
    },

    //open modal functionality
     openModal({commit}, noteId){
      commit('OPEN_MODAL_VIEW', noteId)
    },

    //close modaL
    closeModal({commit}){
      commit('CLOSE_MODAL_VIEW')
    },

    //Change card color functionality
    changeColor({commit, dispatch, state}, newData){
      if(!newData.color || !newData.id){
        return
      }
      globalAxios.patch('/notes/' + newData.id + '.json?auth=' + state.idToken, {
        color: newData.color
      })
      .then((res) => {
        dispatch('fetchNotes', state.userId)
        
      })
      .catch((error) => {
      })
    }

  },



  //GETTERS....................

  getters: {
     /** USER GETTERS ******************************************* */
     //get current authentication state
    isAuthenticated(state){
      return state.idToken !== null
    },

    //get the current card edit state
    getCurrentEdit(state){
      return state.currentEdit
    }

  }
})


// export default new Vuex.Store({
//   state: {
//     notes: [
//       { id: 1, message: 'my new note'},
//       { id: 2, message: 'my second new note'}
//     ],

//     isModalView: false,
//     currentEdit: {
//       id: null,
//       message: ''
//     }
//   },

//   mutations: {
//     ADD_NOTE(state, newNote){
//       newNote.id = state.notes.length + 1
//       state.notes.push(newNote)
//     },

//     EDIT_NOTE(state, editedNote){
//       state.notes.forEach((el) => {
//         if(el.id == editedNote.id){
//           el.message = editedNote.message
          
//         }else{
//           return false
//         }
//       })
//     },
//     DELETE_NOTE(state, noteId){
//       if(confirm('Are you sure you want to remove this note?')){
//         const foundNote =  state.notes.find(el => el.id == noteId )
//         if(foundNote){
//           console.log(foundNote)
//           state.notes.splice(state.notes.indexOf(foundNote), 1)
//         }else{
//           return false
//         }
        
//       }else{
//         return
//       }
      
//     },
//     OPEN_MODAL_VIEW(state, noteId){
//       const foundNote = state.notes.find(el => el.id == noteId)
//       if(foundNote){
//         console.log(foundNote.id)
//         state.currentEdit.id = foundNote.id
//         state.currentEdit.message = foundNote.message
//         state.isModalView = true
//       }else{
//         return
//       }
     
//     },
//     CLOSE_MODAL_VIEW(state){
//       state.isModalView = false
//       state.currentEdit.id = null
//       state.currentEdit.message = ''
//     }

//   },

//   actions: {
//     addNewNote({commit}, newNote){
//       commit('ADD_NOTE', newNote)
//       routes.push('/notes')
//     },
//     deleteNote({commit}, noteId){
//       commit('DELETE_NOTE', noteId)
//     },
//     openModal({commit}, noteId){
//       commit('OPEN_MODAL_VIEW', noteId)
//     },
//     closeModal({commit}){
//       commit('CLOSE_MODAL_VIEW')
//     },
//     updateNote({commit, dispatch}, editedNote){
//       commit('EDIT_NOTE', editedNote)
//       dispatch('closeModal')
//     }
//   },
//   getters: {
//     getCurrentEdit(state){
//       return state.currentEdit
//     }
//   },
//   modules: {
//   }
// })
