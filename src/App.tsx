import { useEffect, useState } from 'react'
import { Home } from './pages/Home'
import { Login } from './pages/Login'

function App (): JSX.Element {
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState({ name: '', id: 0 })

  const handleLogin = (): void => {
    setIsLogged(!isLogged)
  }

  useEffect(() => {
    const IsAuthenticated = (): void => {
      fetch('http://localhost:8080/isAuthenticated', {
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
      }).then((data) => {
        if (data.ok === true) {
          setUser({ name: data.name, id: data.id })
          setIsLogged(true)
        } else {
          setIsLogged(false)
        }
      }).catch(error => {
        console.log(error)
      })
    }
    IsAuthenticated()
  }, [isLogged])

  return (
    (isLogged)
      ? <Home onLogout={handleLogin} user={user} />
      : <Login onLogin={handleLogin} />

  )
}

export default App
