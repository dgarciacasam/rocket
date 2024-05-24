import React, { useEffect, useState } from 'react'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import * as types from '../src/common/types'
import { Toaster } from 'sonner'
import { isAuthenticated, logout } from './common/Services'
function App (): JSX.Element {
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState<types.User>({ id: 0, name: '', profilePic: '' })
  const handleLogin = (): void => {
    setIsLogged(!isLogged)
  }

  const handleLogout = (): void => {
    logout().then((result) => {
      if (result.ok) {
        setIsLogged(false)
      }
    }).catch((error) => {
      throw error
    })
  }

  useEffect(() => {
    isAuthenticated()
      .then((currentUser) => {
        if (currentUser !== null) {
          setUser(currentUser)
          setIsLogged(true)
        }
      }).catch((e) => {

      })
  }, [isLogged])

  return (
    <React.StrictMode>
      <Toaster />
      {isLogged
        ? (
          <Home onLogout={handleLogout} user={user} />
        )
        : (
          <Login onLogin={handleLogin} />
        )}
    </React.StrictMode>
  )
}

export default App
