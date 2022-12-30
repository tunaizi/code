import * as React from "react"
export const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = true
    setTimeout(callback, 1000) // fake async
  },
  signout(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = false
    setTimeout(callback, 1000)
  }
}
export interface AuthContextType {
  user: any
  loading: boolean
  signin: (user: string, callback: VoidFunction) => void
  signout: (callback: VoidFunction) => void
  setLoading: Function
}

export const AuthContext = React.createContext<AuthContextType>(null!)

export function useAuth() {
  return React.useContext(AuthContext)
}
