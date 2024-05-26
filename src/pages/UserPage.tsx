import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/@/components/ui/avatar'
import * as types from '../common/types'
import { AnimatedTooltip } from '@/components/AvatarGroup'
import { convertProfilePic, getUsers } from '@/common/Services'
import Swal from 'sweetalert2'

interface Props {
  user: types.User
  showSidenav: boolean
  projects: types.Project[]
  handleCreateProject: (project: types.Project) => void
  handleUpdateProject: (project: types.Project) => void
  handleDeleteProject: (id: number) => void
}

export const UserPage: React.FC<Props> = ({ user, showSidenav, projects, handleCreateProject, handleUpdateProject, handleDeleteProject }) => {
  const [imageUrl, setImageUrl] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassowrd] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [data, setData] = useState<types.AnimatedTooltipData[]>([])
  const [editingUsers, setEditingUsers] = useState<boolean>(false)
  const [users, setUsers] = useState<types.User[]>([])
  useEffect(() => {
    setImageUrl(convertProfilePic(user.profilePic))
    projects.forEach((proyecto: types.Project) => {
      const dataAvatar = proyecto.users.map((usuario: types.User) => ({
        id: usuario.id,
        name: usuario.name ?? 'Nombre',
        designation: usuario.email ?? 'Email',
        image: convertProfilePic(usuario.profilePic)
      }))
      setData(dataAvatar)
    })

    getUsers()
      .then((response) => {
        setUsers(response)
      }).catch((error) => {
        console.log(error)
      })
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

  const updateUsers = (): void => {
    setEditingUsers(!editingUsers)
  }

  const deleteProject = (projectId: number): void => {
    Swal.fire({
      title: '¿Elimina proyecto?',
      text: 'Se borrarán todas las tareas asociadas',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar proyecto!',
      cancelButtonText: 'Cancelar',
      background: '#111215',
      color: '#ffffff'
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleDeleteProject(projectId)
      }
    }).catch((error) => {
      console.log(error)
    })
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
            <div className='flex justify-between mb-2'>
              <h1 className=' text-xl'>Proyectos</h1>
              <button className='button flex items-center hover:rounded' onClick={handleCreateProject}>
                <svg
                  className='icon icon-tabler icon-tabler-plus bg-[rgba(255,255,255,0.1)] rounded-full p-1 mr-2'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='#ffffff'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M12 5l0 14' />
                  <path d='M5 12l14 0' />
                </svg>
                Añadir proyecto
              </button>
            </div>
            <section className='grid grid-cols-2 gap-2'>
              {
                projects.map((project: types.Project) => (
                  <article className='border border-white rounded w-6/12 p-2 w-full' key={project.id}>
                    <div className='flex justify-between'>
                      <h2>{project.name}</h2>
                      <div>
                        <button className='p-1 rounded mr-1 hover:bg-[#111215]' onClick={() => { deleteProject(project.id) }}>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='icon icon-tabler icon-tabler-trash'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            strokeWidth='2'
                            stroke='currentColor'
                            fill='none'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          >
                            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                            <path d='M4 7l16 0' />
                            <path d='M10 11l0 6' />
                            <path d='M14 11l0 6' />
                            <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
                            <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
                          </svg>
                        </button>
                        <button className='p-1 rounded hover:bg-[#111215]'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            className='icon icon-tabler icons-tabler-outline icon-tabler-edit'
                          >
                            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                            <path d='M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1' />
                            <path d='M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z' />
                            <path d='M16 5l3 3' />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <p className='pt-2 text-gray-300 max-w-72 mb-4'>{project.description ?? 'Esto es un ejemplo de una descripción del proyecto'}</p>
                    <div className='cursor-pointer inline-flex' onClick={updateUsers}>
                      <AnimatedTooltip items={data} />
                    </div>
                  </article>
                ))
              }
            </section>

          </section>
        </div>
      </div>
      {(editingUsers)
        ? <div className='swal2-container swal2-center swal2-backdrop-show overflow-y-auto '>
          <div
            aria-labelledby='swal2-title'
            aria-describedby='swal2-html-container'
            className='swal2-popup swal2-modal swal2-show grid bg-[#111215]'
            tabIndex={-1}
            role='dialog'
            aria-live='assertive' aria-modal='true'
          >
            <h2 className='swal2-title block text-white' id='swal2-title '>Participantes del proyecto</h2>

            <div className='swal2-html-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[calc(100px*4+16px*3)]' style={{ paddingInline: '0.5rem' }}>
              {users.map((user: types.User) => (
                <article key={user.id} className='flex flex-col justify-between items-center border border-white rounded pt-1 h-[100px]'>
                  <div className='flex flex-col justify-center items-center'>
                    <Avatar className='size-12 border-2 border-stone-300 mb-2'>
                      <AvatarImage src={convertProfilePic(user.profilePic)} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                  </div>
                </article>
              ))}
            </div>
            <div className='swal2-actions flex '>
              <div className='swal2-loader' />
              <button type='button' className='swal2-confirm swal2-styled swal2-default-outline inline-block' style={{ backgroundColor: '#3085d6' }}>Si, eliminar proyecto!</button>
              <button type='button' className='swal2-cancel swal2-styled swal2-default-outline inline-block' onClick={updateUsers}>Cancelar</button>
            </div>
          </div>
        </div>
        : <></>}

    </section>
  )
}
