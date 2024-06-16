import { useEffect, useState } from 'react'
import { Avatar, AvatarImage } from '@/@/components/ui/avatar'
import * as types from '../common/types'
import { AnimatedTooltip } from '@/components/AvatarGroup'
import { createUserProject, deleteUserProject, updateUser } from '@/common/Services'
import Swal from 'sweetalert2'
import { Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { convertProfilePic, getUsersData } from '@/common/utils'
import { ProjectUsersModal } from '@/components/userPage/ProjectUsersModal'
import { ImageCropper } from '@/components/userPage/ImageCropper'

interface Props {
  user: types.User
  staticUsers: types.User[]
  projects: types.Project[]
  handleCreateProject: () => void
  handleUpdateProject: (project: types.Project) => void
  handleDeleteProject: (id: number) => void
  handleUserUpdate: () => void
}

export const UserPage: React.FC<Props> = ({ user, staticUsers, projects, handleCreateProject, handleUpdateProject, handleDeleteProject, handleUserUpdate }) => {
  const [name, setName] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editingUsers, setEditingUsers] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [imgSrc, setImgSrc] = useState<string>()
  const [croppedImg, setCroppedImg] = useState<string>()
  const [crop, setCrop] = useState<Crop>()
  const [filteredProjects, setFilteredProjects] = useState<types.Project[]>([])
  const [projectUsers, setProjectUsers] = useState<types.User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<types.User[]>([])
  const [editingProject, setEditingProject] = useState<types.Project>()

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if ((e.target.files != null) && e.target.files.length > 0) {
      setCrop(undefined)
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        const result = reader.result as string
        if (result !== null && result !== undefined) {
          setImgSrc(result)
          console.log(user.profilePic)
        } else {
          setImgSrc('')
        }
      })
      reader.readAsDataURL(e.target.files[0])
      setModalOpen(true)
    }
  }

  useEffect(() => {
    const filtered = projects.filter((filterProject: types.Project) => filterProject.id !== 0)
    setFilteredProjects(filtered)
  }, [])

  const saveUser = async (): Promise<void> => {
    let save = false
    const newUser = {
      id: user.id,
      name: '',
      password: '',
      profilePic: ''
    }
    if (name !== '' && name !== user.name) {
      save = true
      newUser.name = name
    }

    if (save !== null) {
      Swal.fire({
        title: 'Modificar proyecto',
        html: `<input type="password" id="confirmPassword" class="swal2-input" placeholder="Introduce la contraseña">
          `,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Modificar proyecto',
        cancelButtonText: 'Cancelar',
        background: '#111215',
        color: '#ffffff'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const confirmPassword = document.querySelector('#confirmPassword') as HTMLInputElement
          if (confirmPassword !== null && confirmPassword.value !== '') {
            newUser.password = confirmPassword.value
            await updateUser(newUser)
            await handleUserUpdate()
          }
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  const updateUsers = (currentProjectUsers: types.User[], currentProject: types.Project): void => {
    setProjectUsers(currentProjectUsers)
    setEditingProject(currentProject)
    const userFilter = staticUsers.filter((user: types.User) => !currentProjectUsers.some((u: types.User) => u.id === user.id))
    setFilteredUsers(userFilter)
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
        await handleDeleteProject(projectId)
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  const updateProject = (project: types.Project) => {
    Swal.fire({
      title: 'Modificar proyecto',
      html: `<input type="text" id="projectName" class="swal2-input" placeholder="${project.name}">
      <textarea id='projectDescription' class='swal2-textarea' placeholder="${project.description}">`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Modificar proyecto',
      cancelButtonText: 'Cancelar',
      background: '#111215',
      color: '#ffffff'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const projectName = document.querySelector('#projectName') as HTMLInputElement
        const projectDescription = document.querySelector('#projectDescription') as HTMLInputElement
        let update = false
        if (projectName.value !== '' && projectName.value !== project.name) {
          project.name = projectName.value
          update = true
        }
        if (projectDescription.value !== '' && projectDescription.value !== project.description) {
          project.description = projectDescription.value
          update = true
        }

        if (update) {
          await handleUpdateProject(project)
        }
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  const updateProjectUsers = async (addUser: boolean, updatedUser: types.User, updatedProject: types.Project): Promise<void> => {
    if (addUser) {
      const response = await createUserProject(updatedUser.id, updatedProject.id)
      if (response) {
        const newUserList: types.User[] = projectUsers
        newUserList.push(updatedUser)
        updatedProject.users = newUserList
        await handleUpdateProject(updatedProject)
      }
    } else {
      const response = await deleteUserProject(updatedUser.id, updatedProject.id)
      if (response) {
        const newUserList: types.User[] = projectUsers.filter((user: types.User) => user.id !== updatedUser.id)
        updatedProject.users = newUserList
        await handleUpdateProject(updatedProject)
      }
    }
  }

  const triggerFileInput = (): void => {
    document.getElementById('inputFile')?.click()
  }

  return (
    <section className='pt-[1.5rem] pb-[3rem] lg:px-4 xl:px-10 flex justify-center lg:justify-start lg:h-screen lg:flex-col lg:ml-[5rem] '>
      <div className='flex flex-col lg:flex-row lg:items-start justify-center items-center lg:w-full'>
        <div className='flex flex-col content-center lg:w-[30%] p-4'>
          <div className='flex flex-col items-center justify-center cursor-pointer mb-2' onClick={triggerFileInput}>
            <div className='flex flex-col group relative'>
              <Avatar className='size-72 border-2 border-stone-300'>
                <AvatarImage src={(croppedImg != null) ? croppedImg : convertProfilePic(user.profilePic)} />
              </Avatar>
              <span className='absolute bottom-0 text-center bg-[#111215] lg:w-[50%] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-0.5 mt-1 justify-self-center self-center'>Modificar avatar</span>
            </div>
            <input type='file' id='inputFile' style={{ display: 'none' }} onChange={onSelectFile} />
          </div>
          <ImageCropper isModalOpen={modalOpen} setIsModalOpen={setModalOpen} user={user} setCroppedImg={setCroppedImg} setCrop={setCrop} crop={crop} imgSrc={imgSrc} />
          {(isEditing)
            ? <div>
              <div>
                <h1 className='text-xl mt-4'>Modificar nombre de usuario</h1>
                <input type='text' placeholder='Nuevo nombre' className='p-1 mb-4 text-black w-full rounded' onChange={(ev) => setName(ev.target.value)} />
              </div>
              <div className='flex justify-between'>
                <button className='py-2 px-4 rounded bg-white text-black hover:rounded hover:bg-[#111215] hover:text-white' onClick={saveUser}>Guardar cambios</button>
                <button className='py-2 px-4 rounded bg-white text-black hover:rounded hover:bg-[#111215] hover:text-white' onClick={() => { setIsEditing(!isEditing) }}>Cancelar</button>
              </div>
            </div>
            : <div>
              <h1 className='text-2xl '>{user.name}</h1>
              <h2>{user.email}</h2>
              <button className='bg-[#1F2022] rounded mt-2 p-2 hover:rounded hover:bg-[#111215]' onClick={() => { setIsEditing(!isEditing) }}>Editar perfil</button>
            </div>}
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
            <section className='grid md:grid-cols-2 gap-2'>
              {
                filteredProjects.map((project: types.Project) => (
                  <article className='border border-white rounded w-6/12 p-2 w-full' key={project.id}>
                    <div className='flex justify-between'>
                      <h2>{project.name}</h2>
                      <div>
                        <button className='p-1 rounded mr-1 hover:bg-[#111215]' onClick={() => { deleteProject(project.id) }}>
                          <svg
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
                        <button className='p-1 rounded hover:bg-[#111215]' onClick={() => updateProject(project)}>
                          <svg
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
                        <button className='p-1 rounded mr-1 hover:bg-[#111215]' onClick={() => updateUsers(project.users, project)}>
                          <svg
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            className='icon icon-tabler icons-tabler-outline icon-tabler-users-plus'
                          >
                            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                            <path d='M5 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0' />
                            <path d='M3 21v-2a4 4 0 0 1 4 -4h4c.96 0 1.84 .338 2.53 .901' />
                            <path d='M16 3.13a4 4 0 0 1 0 7.75' />
                            <path d='M16 19h6' />
                            <path d='M19 16v6' />
                          </svg>
                        </button>

                      </div>
                    </div>

                    <p className='pt-2 text-gray-300 max-w-72 mb-4'>{project.description ?? 'Esto es un ejemplo de una descripción del proyecto'}</p>
                    <div className='cursor-pointer inline-flex' onClick={() => updateUsers(project.users, project)}>
                      <AnimatedTooltip items={getUsersData(project.users, user.id)} />
                    </div>
                  </article>
                ))
              }
            </section>
          </section>
        </div>
      </div>
      <ProjectUsersModal filteredUsers={filteredUsers} projectUsers={projectUsers} isModalOpen={editingUsers} setIsModalOpen={setEditingUsers} editingProject={editingProject} updateProjectUsers={updateProjectUsers} />
    </section>
  )
}
