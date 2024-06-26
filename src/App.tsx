import React from 'react'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import * as types from '../src/common/types'
import { Toaster } from 'sonner'
import { isAuthenticated, logout } from './common/Services'
import { BarLoader } from 'react-spinners'
import useSWR from 'swr'

async function getLoginStatus (_key: string): Promise<types.User | null> {
  const loggedUser = await isAuthenticated()
  if (loggedUser !== null) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return loggedUser
  }

  return null
}

function App (): JSX.Element {
  const {
    data: user,
    isLoading,
    mutate
  } = useSWR('user-data', getLoginStatus)

  const isLogged = !(user == null)
  const handleLogin = async (): Promise<void> => {
    await mutate()
  }

  const handleLogout = (): void => {
    logout()
      .then(async (result) => {
        if (result.ok) {
          await mutate()
          location.reload()
          // window.history.replaceState({}, '', API_HOST)
        }
      })
      .catch((error) => {
        throw error
      })
  }

  const handleUserUpdate = async (): Promise<void> => {
    await mutate()
  }

  if (isLoading) {
    return (
      <div className='w-full h-screen flex items-center justify-center bg-[#111215]'>
        <div className='lg:hidden'>
          <BarLoader color='#ffffff' width='200px' height='8px' />
        </div>

        <div className='hidden md:block'>
          <BarLoader color='#ffffff' width='600px' height='8px' />
        </div>
      </div>
    )
  }

  return (
    <React.StrictMode>
      <Toaster />
      {isLogged
        ? (
          <Home onLogout={handleLogout} handleUserUpdate={() => handleUserUpdate} user={user} />
        )
        : (
          <Login onLogin={handleLogin as any} />
        )}
    </React.StrictMode>
  )
}

export default App
