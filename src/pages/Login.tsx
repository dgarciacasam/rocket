import { KeyboardEvent, useState } from 'react'
import { BarLoader } from 'react-spinners'
import { login, register } from '@/common/Services'
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
  }

  const handleLogin = async (): Promise<void> => {
    setIsLoading(true)
    login({ username, password })
      .then((data) => {
        if (data != null) {
          props.onLogin()
        }
      }).catch(
        () => {
          // toast.error('Error de conexión')
        }
      ).finally(() => {
        setIsLoading(false)
      })
  }

  const handleRegister = (): void => {
    setIsLoading(true)
    register({ email, username, password })
      .then((data) => {
        if (data != null) {
          props.onLogin()
        }
      }).catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className='flex justify-center items-center h-screen w-screen bg-[#2a2b2f]'>

      {(isLoading)
        ? <div>
          <BarLoader color='#ffffff' width='400px' height='8px' />
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
              onKeyDown={function (event: KeyboardEvent) { if (event.key === 'Enter') handleRegister() }}
              placeholder='Password'
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />

            <button
              className='flex align-center border-white bg-black rounded-full mb-2 button'
              onClick={handleRegister}
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
              onKeyDown={function (event: KeyboardEvent) { if (event.key === 'Enter') handleLogin() }}
              placeholder='Password'
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />

            <button
              className='flex align-center border-white bg-black rounded-full mb-2 button'
              onClick={handleLogin}
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
