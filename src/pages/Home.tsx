import { SideNav } from '../components/SideNav'
import { SecondarySideNav } from '../components/SecondarySideNav'
import { Content } from '../components/Content'
import { Route, useSearch } from 'wouter'
import * as types from '../common/types'
import { UserPage } from './UserPage'
import { useEffect, useState } from 'react'
import { createTask, deleteProject, deleteTask, getProjects, updateTask } from '@/common/Services'
import { BarLoader } from 'react-spinners'
interface homeProps {
  onLogout: () => void
  user: types.User
}

export const Home = (props: homeProps) => {
  const [projects, setProjects] = useState<types.Project[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [staticProjects, setStaticProjects] = useState<types.Project[]>([])
  const [selectedProjectName, setSelectedProjectName] = useState<String>('Todos')
  const search = useSearch()
  function handleLogin (): void {
    props.onLogout()
  }

  const sessionStorage = (window.sessionStorage.getItem('showSidenav') === 'true')
  const [showSidenav, setShowSidenav] = useState<boolean>(sessionStorage)

  const handleShowSecondaryNav = (): void => {
    const newShowSidenav = !showSidenav
    setShowSidenav(newShowSidenav)

    window.sessionStorage.setItem('showSidenav', newShowSidenav.toString())
  }

  const handleCreateTask = (userId: number, task: types.Task): void => {
    const params = new URLSearchParams(search)
    task.projectId = parseInt((params.get('project') ?? '0'))

    createTask(userId, task)
      .then((response) => {
        const projectId = response?.projectId ?? 0

        // Encontrar el índice del proyecto correspondiente
        const projectIndex = projects.findIndex(project => project.id === projectId)

        // Verificar que el projectIndex es válido

        // Crear una copia profunda de projects
        const updatedProjects = projects.map((project, index) => {
          if (index === projectIndex) {
            // Crear una copia del array de tareas y añadir la nueva tarea
            const updatedTasks = [...project.tasks, task]
            // Devolver el proyecto actualizado
            return {
              ...project,
              tasks: updatedTasks
            }
          }
          // Devolver el proyecto sin cambios
          return project
        })
        task.users.push(props.user)
        // Actualizar el estado con los proyectos modificados
        setProjects(updatedProjects)
      })
      .catch(() => { })
  }

  const handleDeleteTask = (id: number): void => {
    deleteTask(id).then(() => {
      const updatedProjects = projects.map((project: types.Project) => {
        return {
          ...project,
          tasks: project.tasks.filter((task: types.Task) => task.id !== id)
        }
      })
      setProjects(updatedProjects)
    }).catch(() => { })
  }

  const handleUpdateTask = (task: types.Task, id: number): void => {
    updateTask(task, id)
      .then((response) => {
        const updatedProjects = projects.map(project => {
          return {
            ...project,
            tasks: project.tasks.map(thisTask =>
              thisTask.id === id ? { ...thisTask, ...task } : thisTask
            )
          }
        })
        setProjects(updatedProjects)
      }).catch(() => { })
  }

  const handleCreateProject = (): void => {

  }

  const handleUpdateProject = (): void => {

  }

  const handleDeleteProject = (projectId: number): void => {
    deleteProject(projectId)
      .then((response) => {
        if (response) {
          setProjects(projects.filter((project: types.Project) => project.id !== projectId))
        }
      }).catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (props.user.id !== 0) {
      getProjects(props.user.id).then(async (response: types.Project[]) => {
        setProjects(response)
        setStaticProjects(response)
        setIsLoading(false)
      }).catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
    }
  }, [props.user])

  useEffect(() => {
    const param = new URLSearchParams(search)
    const projectFilter = param.get('project') ?? ''
    if (projectFilter !== '') {
      if (projectFilter === 'all') {
        setProjects(staticProjects)
        setSelectedProjectName('Todos')
      } else {
        const filteredProjects = staticProjects.filter((project: types.Project) => project.id.toString() === projectFilter)
        setProjects(filteredProjects)
        setSelectedProjectName(filteredProjects.at(0)?.name ?? 'Sin nombre')
      }
    }
  }, [search, selectedProjectName])

  const Router = (): any => {
    return (
      <div className='h-dvh w-screen bg-[#2a2b2f]'>
        <SideNav onLogout={handleLogin} />
        <Route path='/user' component={(propiedades) => <UserPage {...propiedades} user={props.user} projects={projects} showSidenav={showSidenav} handleCreateProject={handleCreateProject} handleUpdateProject={handleUpdateProject} handleDeleteProject={handleDeleteProject} />} />
        <Route
          path='/' component={(propiedades) => <>
            {(!isLoading && projects.length > 0)
              ? <div>
                <SecondarySideNav handlerIsShown={handleShowSecondaryNav} isShown={showSidenav} data={staticProjects} />
                <section className={'pt-[1.5rem] px-8 flex h-dvh flex-col' + (showSidenav ? ' lg:ml-[23rem] ml-20 ' : ' lg:ml-20 ml-0')}>
                  <Content {...propiedades} user={props.user} projects={projects} selectedProjectName={selectedProjectName} handleDeleteTask={handleDeleteTask} handleCreateTask={handleCreateTask} handleUpdateTask={handleUpdateTask} />
                </section>
              </div>
              : <div className='flex h-dvh px-8 lg:ml-[23rem] ml-20 items-center'>
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
