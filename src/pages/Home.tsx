import { SideNav } from '../components/SideNav'
import { SecondarySideNav } from '../components/SecondarySideNav'
import { Content } from '../components/content/Content'
import { Route } from 'wouter'
import * as types from '../common/types'
import { UserPage } from './UserPage'
import { useEffect, useState } from 'react'
import { createProject, createTask, deleteProject, deleteTask, getProjects, getUsers, updateProject, updateTask } from '@/common/Services'
import { BarLoader } from 'react-spinners'
import { filterProjectTasks } from '@/common/utils'
interface homeProps {
  onLogout: () => void
  user: types.User
  handleUserUpdate: () => void
}

export const Home: React.FC<homeProps> = ({ onLogout, user, handleUserUpdate }) => {
  const [projects, setProjects] = useState<types.Project[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [staticProjects, setStaticProjects] = useState<types.Project[]>([])
  const [selectedProject, setSelectedProject] = useState(0)
  const [staticUsers, setStaticUsers] = useState<types.User[]>([])
  function handleLogin (): void {
    onLogout()
  }

  const sessionStorage = (window.sessionStorage.getItem('showSidenav') === 'true')
  const [showSidenav, setShowSidenav] = useState<boolean>(sessionStorage)

  const handleShowSecondaryNav = (): void => {
    const newShowSidenav = !showSidenav
    setShowSidenav(newShowSidenav)
    window.sessionStorage.setItem('showSidenav', newShowSidenav.toString())
  }

  const handleCreateTask = (userId: number, task: types.Task): void => {
    task.projectId = selectedProject

    createTask(userId, task)
      .then((response) => {
        const projectId = response?.projectId ?? 0

        // Crear una copia del array de proyectos
        const updatedProjects = staticProjects.map((project) => {
          if (project.id === projectId) {
            // Crear una copia del array de tareas y añadir la nueva tarea
            const updatedTasks = [...project.tasks, task]
            // Devolver el proyecto actualizado
            return {
              ...project,
              tasks: updatedTasks
            }
          }
          // Devolver el proyecto sin cambios
          console.log(project)
          return project
        })

        task.users.push(user)
        // Actualizar el estado con los proyectos modificados
        setStaticProjects(updatedProjects)
      })
      .catch(() => { })
  }

  const handleDeleteTask = (id: number): void => {
    deleteTask(id).then(() => {
      const updatedProjects = staticProjects.map((project: types.Project) => {
        return {
          ...project,
          tasks: project.tasks.filter((task: types.Task) => task.id !== id)
        }
      })
      setStaticProjects(updatedProjects)
    }).catch(() => { })
  }

  const handleUpdateTask = async (task: types.Task, id: number): Promise<void> => {
    const response = await updateTask(task, id)
    if (response) {
      const updatedProjects = staticProjects.map(project => {
        return {
          ...project,
          tasks: project.tasks.map(thisTask =>
            thisTask.id === id ? { ...thisTask, ...task } : thisTask
          )
        }
      })
      setStaticProjects(updatedProjects)
    }
  }

  const handleCreateProject = async (): Promise<void> => {
    const newProject = {
      name: 'Nuevo proyecto',
      description: 'Añade una descripción al nuevo proyecto',
      adminId: user.id
    }

    const response = await createProject(user.id, newProject)

    if (response !== null) {
      const projectResponse: types.Project = response
      projectResponse.users = [user]
      for (const task of projectResponse.tasks) {
        task.users = [user]
      }
      setStaticProjects(projects => [...projects, projectResponse])
      setSelectedProject(projectResponse.id)
    }
  }

  const handleUpdateProject = async (project: types.Project): Promise<void> => {
    const response = await updateProject(project)
    if (response != null) {
      setStaticProjects(prevProjects => {
        return prevProjects.map(p => p.id === project.id ? { ...p, ...project } : p)
      })
    }
  }

  const handleDeleteProject = async (projectId: number): Promise<void> => {
    const response = await deleteProject(projectId)
    if (response) {
      setStaticProjects(staticProjects.filter((project: types.Project) => project.id !== projectId))
      setSelectedProject(0)
    }
  }

  useEffect(() => {
    if (user.id !== 0) {
      getProjects(user.id).then(async (response: types.Project[]) => {
        const filtProjects = filterProjectTasks(response, user.id)
        setStaticProjects(filtProjects)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        setIsLoading(false)
      })

      getUsers()
        .then((response) => {
          setStaticUsers(response)
        }).catch((error) => {
          console.log(error)
        })
    }
  }, [user.id])

  const handleSelectedProject = (projectId: number): void => {
    setSelectedProject(projectId)
  }

  useEffect(() => {
    if (staticProjects.length > 0) {
      const filteredProjects = staticProjects.filter((project: types.Project) => project.id === selectedProject)
      setProjects(filteredProjects)
    }
  }, [selectedProject, staticProjects])

  const Router = (): any => {
    return (
      <div className='h-dvh w-screen bg-[#2a2b2f]'>
        <SideNav onLogout={handleLogin} />
        <Route path='/user' component={(propiedades) => <UserPage {...propiedades} user={user} staticUsers={staticUsers} projects={staticProjects} handleCreateProject={handleCreateProject} handleUpdateProject={handleUpdateProject} handleDeleteProject={handleDeleteProject} handleUserUpdate={handleUserUpdate} />} />
        <Route
          path='/' component={(propiedades) => <>
            {(!isLoading)
              ? <div>
                <SecondarySideNav handlerIsShown={handleShowSecondaryNav} isShown={showSidenav} data={staticProjects} handlerSelectedProject={handleSelectedProject} selectedProject={selectedProject} />
                <section className={'pt-[1.5rem] px-8 flex h-dvh flex-col' + (showSidenav ? ' lg:ml-[23rem] ml-20 ' : ' lg:ml-20 ml-0')}>
                  <Content {...propiedades} user={user} staticUsers={staticUsers} projects={projects} handleDeleteTask={handleDeleteTask} handleCreateTask={handleCreateTask} handleUpdateTask={handleUpdateTask} handleCreateProject={handleCreateProject} handleDeleteProject={handleDeleteProject} />
                </section>
              </div>
              : <div className='flex h-dvh w-full px-8 items-center justify-center'>
                <BarLoader color='#ffffff' width='400px' height='8px' />
              </div>}

          </>}
        />

      </div>
    )
  }

  return (
    <Router />
  )
}
