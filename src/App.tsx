import { useEffect, useState } from 'react'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { API_HOST } from './config'
import * as types from '../src/common/types'

function App (): JSX.Element {
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState<types.User>({ id: 0, name: '', email: '', profilePic: '' })
  const [userId, setUserId] = useState<number>(0)
  const handleLogin = (): void => {
    setIsLogged(!isLogged)
  }

  useEffect(() => {
    const IsAuthenticated = (): void => {
      fetch(`${API_HOST}/isAuthenticated`, {
        method: 'GET',
        headers: {},
        credentials: 'include'
      }).then(async (response) => {
        if (!response.ok) {
          throw Error('Error en la solicitud')
        }
        if (response.status === 200) {
          return await response.json()
        }
      }).then(async (data) => {
        if (data.ok === true) {
          setUserId(data.id)
          const getUserData = async (): Promise<void> => {
            await fetch(`${API_HOST}/user/${userId}`, {
              method: 'GET'
            }).then(async (response) => {
              return await response.json()
            }).then((data) => {
              if (data.response === true) {
                const usuario: types.User = data.data
                console.log(usuario)
                setUser(usuario)
              }
            })
          }
          await getUserData()

          setIsLogged(true)
        } else {
          setIsLogged(false)
        }
      }).catch(error => {
        console.log(error)
      })
    }
    IsAuthenticated()
  }, [isLogged, userId])

  return (
    (isLogged)
      ? <Home onLogout={handleLogin} user={user} />
      : <Login onLogin={handleLogin} />

  )
}

export default App
