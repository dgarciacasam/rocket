import { useEffect, useState } from 'react'
import { convertProfilePic, getProjects } from '../common/Services'
import { Avatar, AvatarFallback, AvatarImage } from '@/@/components/ui/avatar'
import * as types from '../common/types'
import AvatarGroup, { AvatarProps } from '@atlaskit/avatar-group'
import { API_HOST } from '@/config'

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
  const [data, setData] = useState<AvatarProps[]>([])
  useEffect(() => {
    setImageUrl(convertProfilePic(user.profilePic))
    getProjects(user.id)
      .then(async (response: types.Project[]) => {
        const projectsResponse = response
        setProjects(projectsResponse)
        console.log(projectsResponse)
        projectsResponse.forEach((proyecto: types.Project) => {
          const dataAvatar: AvatarProps[] = proyecto.users.map((usuario: types.User) => ({
            key: usuario.id,
            name: usuario.name,
            src: convertProfilePic(usuario.profilePic)
          }))
          setData(dataAvatar)
        })
      }).catch((error) => { throw error })
  }, [user])

  const saveUser = async (): Promise<void> => {
    /* const usuario = {
      id: user.id,
      email,
      name,
      password
    } */

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

  const changeAvatar = (): void => {
    console.log('merequetengue')
  }

  return (
    <section className={'pt-[1.5rem] px-72  flex h-screen flex-col' + (showSidenav ? 'lg:ml-[23rem] ml-20 ' : 'lg:ml-[20rem] ml-20')}>
      <div className='flex w-full'>
        <div className='flex flex-col content-center w-80 p-4'>
          <div className='flex flex-col items-center justify-center cursor-pointer' onClick={changeAvatar}>
            <div className='flex flex-col group relative'>
              <Avatar className='size-72 border-2 border-stone-300'>
                <AvatarImage src={imageUrl} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className='text-center bg-[#111215] w-[50%] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-0.5 mt-1 justify-self-center self-center'>Modificar avatar</p>
            </div>
          </div>
          <h1 className='text-2xl '>{user.name}</h1>
          <h1>{user.email}</h1>
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
            : <button className='bg-[#1F2022] rounded mt-2 p-2 hover:rounded hover:bg-[#111215]' onClick={() => { setIsEditing(!isEditing) }}>Editar perfil</button>}
        </div>
        <div className='flex flex-col  w-full p-4'>
          <section className='h-full flex flex-col '>
            <h1 className='mb-2 text-xl'>Proyectos</h1>
            <section className='grid grid-cols-2 gap-2'>
              {
                projects.map((project: types.Project) => (

                  <article className='border border-white rounded w-6/12 p-2 w-full' key={project.id}>
                    <h2>{project.name}</h2>
                    <p className='pt-2 text-gray-300'>{project.description ?? 'Esto es un ejemplo de una descripción del proyecto'}</p>
                    <AvatarGroup data={data} appearance='stack' />
                  </article>
                ))
              }
            </section>

          </section>
        </div>
      </div>
    </section>
  )
}
