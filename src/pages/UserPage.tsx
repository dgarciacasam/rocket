import { useEffect, useState } from 'react'
import { convertProfilePic, getProjects } from '../common/Services'
import { Avatar, AvatarFallback, AvatarImage } from '@/@/components/ui/avatar'
import * as types from '../common/types'
export interface Props {
  user: types.User
  showSidenav: boolean
}

export const UserPage: React.FC<Props> = ({ user, showSidenav }) => {
  const [imageUrl, setImageUrl] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassowrd] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [projects, setProjects] = useState<types.Project[]>([])

  useEffect(() => {
    setImageUrl(convertProfilePic(user.image))
    getProjects(user.id)
      .then((response) => {
        setProjects(response)
        console.log(response)
      }).catch((error) => { throw error })
  }, [user])

  const saveUser = async (): Promise<void> => {
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
    <section className={'pt-[1.5rem] px-40   flex h-screen flex-col' + (showSidenav ? 'lg:ml-[23rem] ml-20 ' : 'lg:ml-[20rem] ml-20')}>
      <div className='flex w-full'>
        <div className='flex flex-col content-center w-80 p-4'>
          <Avatar className='size-72'>
            <AvatarImage src={imageUrl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className='text-2xl '>{user.name}</h1>
          <h1>dgarciacasam@gmail.com</h1>
          {(isEditing)
            ? <div>
              <h1 className='text-xl mt-4'>Modificar nombre de usuario</h1>
              <input type='text' placeholder='Nuevo nombre' className='p-1 mb-4 w-48 text-black' onChange={(ev) => setName(ev.target.value)} />
              <h1 className='text-xl'>Modificar contraseña</h1>
              <input type='text' placeholder='Nueva contraseña' className='p-1 mb-4 w-48 text-black' onChange={(ev) => setPassword(ev.target.value)} />
              <input type='text' placeholder='Repita nueva contraseña' className='p-1 w-48 text-black' onChange={(ev) => setRepeatPassowrd(ev.target.value)} />
              <p>Las contraseñas deben coincidir</p>
              <button className='w-48 rounded-none bg-white text-black hover:rounded-none' onClick={saveUser}>Guardar cambios</button>
              <button onClick={() => { setIsEditing(!isEditing) }}>Cancelar</button>
            </div>
            : <button onClick={() => { setIsEditing(!isEditing) }}>Editar perfil</button>}
        </div>
        <div className='flex flex-col  w-full p-4'>
          <section className='h-full flex flex-col '>
            <p className='mb-2'>Proyectos</p>
            <section className='grid grid-cols-2 gap-2'>
              {

                projects.map((project: types.Project) => (

                  <article className='border border-white w-6/12 m-2 p-2 w-full' key={project.id}>
                    <h2>{project.name}</h2>
                  </article>
                ))

              }
            </section>

          </section>

          <section className='h-full'>
            <h1 className='text-3xl'>Equipos</h1>
            <section className='flex'>
              <article className='border border-white w-6/12 m-2 p-2'>
                <h2>Equipo 1</h2>
                <p>Esto es el proyecto 1 </p>
              </article>
              <article className='border border-white w-6/12 m-2 p-2'>
                <h2>Equipo 1</h2>
                <p>Esto es el proyecto 1 </p>
              </article>
            </section>
          </section>
        </div>
      </div>
    </section>
  )
}
