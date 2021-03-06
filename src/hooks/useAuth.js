import React, { createContext, useContext, useReducer } from 'react'
import axios from 'axios'
//const apiURL = `${process.env.DISCODIARY_API_URL}`
const apiURL = 'https://discodiary.herokuapp.com'

const DEFAULT_STATE = {
  jwt: null,
  user: {},
  loggedIn: false 
}

const reducer = (state, action) => {
  switch(action.type){
    case 'LOGIN': 
      const { jwt, user } = action.payload
      return { ...state, jwt, user, loggedIn: true }
    case 'LOGOUT': 
      return { ...state, jwt: null, user: {}, loggedIn: false }
    default:
      return DEFAULT_STATE
  }
}

const AuthContext = createContext(DEFAULT_STATE)

const AuthProvider = ({ children }) => (
  <AuthContext.Provider value={useReducer(reducer, DEFAULT_STATE)}>
    { children }
  </AuthContext.Provider>
)

export const wrapRootElement = ({ element }) => (
  <AuthProvider>
    { element }
  </AuthProvider>
)

const useAuth = () => {
  const [state, dispatcher] = useContext(AuthContext)
  const isAuthenticated = state.loggedIn && Object.keys(state.user).length

  const login = (credentials) => new Promise(async (resolve, reject) => {
    try{
      console.log(`${apiURL}/auth/local`, credentials)
      const { data: payload } = await axios.post(`${apiURL}/auth/local`, credentials)
      dispatcher({ type: 'LOGIN', payload })
      resolve(payload)
    }catch(e){
      reject(e)
    }
  })
  const logout = () => {
    dispatcher({ type: 'LOGOUT' })
  }
  return { state, isAuthenticated, login, logout } 
}

export default useAuth