import { useEffect, useState } from 'react'
import { getProfilePic } from '../common/Utils'
import * as types from '../common/types'

export interface Props {
  user: types.User
}

export const UserPage: React.FC<Props> = ({ user }) => {
  const [imageUrl, setImageUrl] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassowrd] = useState('')
  useEffect(() => {
    getProfilePic(user.id)
      .then((url) => {
        setImageUrl(url)
      }).catch((error) => { throw error })
  }, [user])

  const saveUser = async () => {
    const usuario = {
      id: user.id,
      email,
      name,
      password
    }

    if (password !== '' && password === repeatPassword) {
      console.log('se modifica la contraseña: ' + password)
    }

    if (name !== '') {
      console.log('se modifica nombre:' + name)
    }

    /* await fetch(`http://localhost:8080/user/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario),
      credentials: 'include'
    }) */
  }
  return (
    <div className='flex flex-col'>
      <h1 className='text-6xl mb-2'>{user.name}</h1>
      <img src={imageUrl} alt='' className='size-32' />
      <h1 className='text-xl mt-4'>Modificar nombre de usuario</h1>
      <input type='text' placeholder='Nuevo nombre' className='p-1 mb-4 w-48 text-black' onChange={(ev) => setName(ev.target.value)} />
      <h1 className='text-xl'>Modificar contraseña</h1>
      <input type='text' placeholder='Nueva contraseña' className='p-1 mb-4 w-48 text-black' onChange={(ev) => setPassword(ev.target.value)} />
      <input type='text' placeholder='Repita nueva contraseña' className='p-1 w-48 text-black' onChange={(ev) => setRepeatPassowrd(ev.target.value)} />
      <p>Las contraseñas deben coincidir</p>
      <button className='w-48 rounded-none bg-white text-black hover:rounded-none' onClick={saveUser}>Guardar cambios</button>
    </div>
  )
}
