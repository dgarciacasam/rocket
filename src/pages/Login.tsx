import { KeyboardEvent, useState } from 'react'
import { BarLoader } from 'react-spinners'
import { login, register } from '@/common/Services'
interface loginProps {
  onLogin: (() => void) | any
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
      })
      .catch(() => {
        // toast.error('Error de conexión')
      })
      .finally(() => {
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
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className='flex justify-center h-screen w-screen bg-[#111215] lg:items-center'>
      {isLoading
        ? (
          <div>
            <BarLoader color='#ffffff' width='400px' height='8px' className='' />
          </div>
        )
        : isRegistering
          ? (
            <div className='flex flex-col h-full w-full'>
              <div className='flex self-center lg:hidden mt-4 pl-6 '>
                <svg
                  className='icon icon-tabler icon-tabler-rocket md:w-[90px] md:h-[90px]'
                  width='60'
                  height='60'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='#ffffff'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3' />
                  <path d='M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3' />
                  <path d='M15 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' />
                </svg>
              </div>
              <div className='hidden lg:table-cell absolute'>
                <div className='flex items-center pt-12 pl-12'>
                  <svg
                    className='icon icon-tabler icon-tabler-rocket md:w-[90px] md:h-[90px]'
                    width='60'
                    height='60'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='#ffffff'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <path d='M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3' />
                    <path d='M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3' />
                    <path d='M15 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' />
                  </svg>
                  <h1 className='text-5xl font-semibold ml-2'>ROCKET</h1>
                </div>

              </div>
              <div className='flex h-full w-full align-center justify-center mb-12'>
                <div className='flex flex-col bg-[#111215] w-full rounded-xl lg:border lg:border-white p-10 sm:w-[400px] self-center'>
                  <h1 className='text-2xl font-semibold mb-4'>REGISTRAR</h1>
                  <span className='mb-1'>Email</span>
                  <input
                    className='mb-4 text-black rounded p-1'
                    type='text'
                    name='email'
                    placeholder='Email'
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                  />

                  <span className='mb-1'>Nombre</span>

                  <input
                    className='mb-4 text-black rounded p-1'
                    type='text'
                    name='username'
                    placeholder='Nombre de usuario'
                    value={username}
                    onChange={(ev) => setUsername(ev.target.value)}
                  />
                  <span className='mb-1'>Contraseña</span>
                  <input
                    className='mb-4 text-black rounded p-1'
                    type='password'
                    name='password'
                    onKeyDown={function (event: KeyboardEvent) {
                      if (event.key === 'Enter') handleRegister()
                    }}
                    placeholder='Contraseña'
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                  />

                  <button
                    className=' border-white bg-black rounded-full mb-2 button'
                    onClick={handleRegister}
                  >
                    Registrar
                  </button>
                  <p className='flex align-center mb-4'>
                    ¿Ya tienes una cuenta?
                    <a
                      className='ml-2 underline cursor-pointer '
                      onClick={handleLoginMode}
                    >
                      {' '}
                      Inicia sesión
                    </a>
                  </p>
                </div>
              </div>

            </div>

          )
          : (
            <div className='flex flex-col h-full w-full'>
              <div className='flex self-center lg:hidden mt-4  pl-6'>
                <svg
                  className='icon icon-tabler icon-tabler-rocket md:w-[90px] md:h-[90px]'
                  width='60'
                  height='60'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='#ffffff'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3' />
                  <path d='M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3' />
                  <path d='M15 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' />
                </svg>
              </div>
              <div className='hidden lg:table-cell absolute'>
                <div className='flex items-center pt-12 pl-12'>
                  <svg
                    className='icon icon-tabler icon-tabler-rocket md:w-[90px] md:h-[90px]'
                    width='60'
                    height='60'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='#ffffff'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <path d='M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3' />
                    <path d='M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3' />
                    <path d='M15 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' />
                  </svg>
                  <h1 className='text-5xl font-semibold ml-2'>ROCKET</h1>
                </div>

              </div>
              <div className='flex h-full w-full align-center justify-center mb-12'>
                <div className='flex flex-col bg-[#111215] lg:border lg:border-white w-full rounded-xl p-10 sm:w-[400px] self-center'>
                  <h1 className='text-2xl font-semibold mb-4'>INICIAR SESIÓN </h1>
                  <span className='mb-1'>Usuario</span>

                  <input
                    className='mb-4 text-black rounded p-1'
                    type='text'
                    name='username'
                    placeholder='Nombre de usuario'
                    value={username}
                    onChange={(ev) => setUsername(ev.target.value)}
                  />
                  <span className='mb-1'>Contraseña</span>
                  <input
                    className='mb-4 text-black rounded p-1'
                    type='password'
                    name='password'
                    onKeyDown={function (event: KeyboardEvent) {
                      if (event.key === 'Enter') handleLogin()
                    }}
                    placeholder='Contraseña'
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                  />

                  <button
                    className=' border-white bg-black rounded-full mb-2 button'
                    onClick={handleLogin}
                  >
                    Inicar sesión
                  </button>

                  <p className='flex align-center mb-4'>
                    ¿Aún no tienes una cuenta?
                    <a
                      className='ml-2 underline cursor-pointer '
                      onClick={handleLoginMode}
                    >
                      {' '}
                      Regístrate
                    </a>
                  </p>
                </div>
              </div>

            </div>

          )}
    </div>
  )
}
