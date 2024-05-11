import { KeyboardEvent, useState } from 'react'
import { API_HOST } from '@/config'
interface loginProps {
  onLogin: () => void

}

export const Login = (props: loginProps): any => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [email, setEmail] = useState('')

  const handleLoginMode = (): void => {
    setIsRegistering(!isRegistering)
    setEmail('')
  }

  async function login (): Promise<void> {
    if (username !== '' && password !== '') {
      setIsLoading(true)
      const usuario = {
        name: username,
        password
      }
      await fetch(`${API_HOST}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
        credentials: 'include'
      })
        .then((response) => {
          setIsLoading(false)
          if (response.status === 200) {
            props.onLogin()
          } else {
            console.log('Ha ocurrido un error')
          }
        })
    }
  }

  async function register (): Promise<void> {
    if (username !== '' && password !== '' && email !== '') {
      setIsLoading(true)
      const usuario = {
        email,
        name: username,
        password
      }
      await fetch(`${API_HOST}/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
        credentials: 'include'
      })
        .then(async (response) => {
          setIsLoading(false)
          if (response.status === 200) {
            return await response.json()
          } else {
            console.log('Ha ocurrido un error')
          }
        }).then((data) => {
          if (data.response === true) {
            props.onLogin()
          }
          console.log(data)
        })
    }
  }

  return (
    <div className='flex justify-center items-center h-screen w-screen bg-[#2a2b2f]'>

      {(isLoading)
        ? <div>
          <h1>SPINNERQWEOFWQUUOHQWOUHOEUHFQUFOQ</h1>
        </div>
        : (isRegistering)
          ? <div className='flex flex-col bg-[#111215] rounded-xl w-96 p-8'>
            <h1 className='text-2xl font-semibold mb-4'>Register</h1>
            <span className='mb-1'>EMAIL:</span>
            <input
              className='mb-4 text-black rounded-l p-1'
              type='text'
              name='email'
              placeholder='Email'
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />

            <span className='mb-1'>USERNAME:</span>

            <input
              className='mb-4 text-black rounded-l p-1'
              type='text'
              name='username'
              placeholder='Username'
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
            />
            <span className='mb-1'>PASSWORD:</span>
            <input
              className='mb-4 text-black rounded-l p-1'
              type='password'
              name='password'
              onKeyDown={function (event: KeyboardEvent) { if (event.key === 'Enter') register() }}
              placeholder='Password'
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />

            <button
              className='flex align-center border-white bg-black rounded-full mb-2'
              onClick={register}
            >
              Register
            </button>
            <p
              className='flex align-center mb-4'
            >
              Ya tienes una cuenta?<a className='ml-2 underline cursor-pointer ' onClick={handleLoginMode}> Login Here</a>
            </p>

          </div>
          : <div className='flex flex-col bg-[#111215] rounded-xl w-96 p-8'>
            <h1 className='text-2xl font-semibold mb-4'>Login</h1>
            <span className='mb-1'>USERNAME:</span>

            <input
              className='mb-4 text-black rounded-l p-1'
              type='text'
              name='username'
              placeholder='Username'
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
            />
            <span className='mb-1'>PASSWORD:</span>
            <input
              className='mb-4 text-black rounded-l p-1'
              type='password'
              name='password'
              onKeyDown={function (event: KeyboardEvent) { if (event.key === 'Enter') login() }}
              placeholder='Password'
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />

            <button
              className='flex align-center border-white bg-black rounded-full mb-2'
              onClick={login}
            >
              Log in
            </button>

            <p
              className='flex align-center mb-4'
            >
              Don't have an account?<a className='ml-2 underline cursor-pointer ' onClick={handleLoginMode}> Register Here</a>
            </p>

          </div>}

    </div>
  )
}
