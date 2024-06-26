import { Card } from '../Card'
import { TopContent } from '../TopContent'
import styles from '@/css/Content.module.css'
import { useEffect, useState } from 'react'
import * as types from '../../common/types'
import { convertProfilePic, getCard } from '@/common/utils'
import { TableView } from '@/components/content/tableView/TableView'
export interface Props {
  user: types.User
  staticUsers: types.User[]
  projects: types.Project[]
  handleDeleteTask: (id: number) => void
  handleCreateTask: (id: number, task: types.Task) => void
  handleUpdateTask: (task: types.Task, id: number) => void
  handleCreateProject: () => void
  handleDeleteProject: (id: number) => void
}

export const Content: React.FC<Props> = ({ user, staticUsers, projects, handleDeleteTask, handleCreateTask, handleUpdateTask, handleCreateProject, handleDeleteProject }) => {
  const [imageUrl, setImageUrl] = useState('/user.jpg')
  const [view, setView] = useState(sessionStorage.getItem('view') ?? 'board')
  const projectName = projects[0]?.name ?? ''

  useEffect(() => {
    console.log(projects[0])
    if (user != null) {
      if (user.profilePic !== null && user.profilePic !== '') {
        setImageUrl(convertProfilePic(user.profilePic))
      }
    }
  }, [user.id])

  const putView = (view: string): void => {
    setView(view)
    sessionStorage.setItem('view', view)
  }

  if (projects.length === 0) {
    return (
      <></>
    )
  }

  return (
    <div className='bg-[#2a2b2f]'>
      <TopContent username={user.name} imageUrl={imageUrl} />
      <section className=' flex flex-col pt-4 pb-20 md:pb-0'>
        <section className='flex flex-col lg:flex-row justify-between border-b-2 border-solid border-[rgba(255,255,255,0.1)] mb-6'>
          <div className='hidden lg:flex flex-grow basis-0 '>
            <button
              className={`button hover:rounded  ${(view === 'board') ? styles.active : 'flex items-center'}`}
              onClick={() => { putView('board') }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-layout-list mr-1'
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
                <path d='M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z' />
                <path d='M4 14m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z' />
              </svg>
              Vista tarjetas
            </button>

            <button className={`button ml-1  hover:rounded ${(view === 'table') ? styles.active : 'flex items-center ml-1 '}`} onClick={() => { putView('table') }}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-brand-trello mr-1'
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
                <path d='M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z' />
                <path d='M7 7h3v10h-3z' />
                <path d='M14 7h3v6h-3z' />
              </svg>
              Vista de tabla
            </button>
          </div>
          <div className='flex items-center pb-1'>
            <p className='text-2xl'>{projectName}</p>
          </div>

          <div className='flex lg:flex-grow lg:basis-0 lg:justify-end mt-2 lg:mt-0'>

            <button className='flex items-center button hover:rounded text-sm lg:text-base' onClick={handleCreateProject}>
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round' className='icon icon-tabler icons-tabler-outline icon-tabler-table-plus mr-1'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M12.5 21h-7.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5' />
                <path d='M3 10h18' />
                <path d='M10 3v18' />
                <path d='M16 19h6' />
                <path d='M19 16v6' />
              </svg>
              Añadir proyecto
            </button>
            {(projects[0]?.id === 0)
              ? <></>
              : <button className='flex items-center button hover:rounded text-sm lg:text-base' onClick={() => handleDeleteProject(projects[0].id)}>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='icon icon-tabler icons-tabler-outline icon-tabler-table-minus mr-1'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M12.5 21h-7.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10' />
                  <path d='M3 10h18' />
                  <path d='M10 3v18' />
                  <path d='M16 19h6' />
                </svg>
                Eliminar proyecto
              </button>}

          </div>

        </section>

        {(view === 'board')
          ? <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  h-fit'>
            <Card
              key={1}
              title='Sin empezar'
              staticUsers={projects[0].users}
              id={1}
              data={getCard(1, projects)}
              userId={user.id}
              handleCreateTask={handleCreateTask}
              handleDeleteTask={handleDeleteTask}
              handleUpdateTask={handleUpdateTask}
            />
            <Card
              key={2}
              title='Pendiente'
              staticUsers={projects[0].users}
              id={2}
              data={getCard(2, projects)}
              userId={user.id}
              handleCreateTask={handleCreateTask}
              handleDeleteTask={handleDeleteTask}
              handleUpdateTask={handleUpdateTask}
            />
            <Card
              key={3}
              title='Finalizado'
              staticUsers={projects[0].users}
              id={3}
              data={getCard(3, projects)}
              userId={user.id}
              handleCreateTask={handleCreateTask}
              handleDeleteTask={handleDeleteTask}
              handleUpdateTask={handleUpdateTask}
            />
          </section>

          : <TableView data={projects[0].tasks} staticUsers={staticUsers} userId={user.id} handleUpdateTask={handleUpdateTask} handleDeleteTask={handleDeleteTask} handleCreateTask={handleCreateTask} />}
      </section>
    </div>
  )
}
