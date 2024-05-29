import { Card } from './Card'
import { TopContent } from './TopContent'
import styles from '../css/Content.module.css'
import { useEffect, useState } from 'react'
import * as types from '../common/types'
import { convertProfilePic } from '../common/Services'
import { useSearch } from 'wouter'
import { getCard, updateParams } from '@/common/utils'
import { SectionIcon } from '@radix-ui/react-icons'

export interface Props {
  user: types.User
  projects: types.Project[]
  selectedProject: number
  handleDeleteTask: (id: number) => void
  handleCreateTask: (id: number, task: types.Task) => void
  handleUpdateTask: (task: types.Task, id: number) => void
}

export const Content: React.FC<Props> = ({ user, projects, selectedProject, handleDeleteTask, handleCreateTask, handleUpdateTask }) => {
  const [imageUrl, setImageUrl] = useState('')
  const [view, setView] = useState('board')
  const search = useSearch()

  useEffect(() => {
    if (user != null) {
      setImageUrl(convertProfilePic(user.profilePic))
    }
  }, [user.id])

  useEffect(() => {
    const param = new URLSearchParams(search)
    setView(param.get('view') ?? 'board')
  }, [search])

  return (
    <div className='bg-[#2a2b2f]'>
      <TopContent username={user.name} imageUrl={imageUrl} />
      <section className=' flex flex-col pt-4'>
        <section className='flex justify-between border-b-2 border-solid border-[rgba(255,255,255,0.1)] mb-6'>
          <div className='flex'>
            <button
              className={`button hover:rounded ${(view === 'board') ? styles.active : 'flex items-center'}`}
              onClick={() => { updateParams({ view: 'board' }, search) }}
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

            <button className={`button ml-1 hover:rounded ${(view === 'table') ? styles.active : 'flex items-center ml-1 '}`} onClick={() => { updateParams({ view: 'table' }, search) }}>
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
          <div>
            <p className='text-xl'>Proyecto - {selectedProject}</p>
          </div>

        </section>

        {(view === 'board')
          ? <section className='grid md:grid-cols-3 gap-8 grid-cols-2 h-fit'>
            <Card
              key={1}
              title='Sin empezar'
              id={1}
              data={getCard(1, projects)}
              userId={user.id}
              handleCreateTask={handleCreateTask}
              handleDeleteTask={handleDeleteTask}
              handleUpdateTask={handleUpdateTask}
            />
            <Card
              key={2}
              title='En proceso'
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
              id={3}
              data={getCard(3, projects)}
              userId={user.id}
              handleCreateTask={handleCreateTask}
              handleDeleteTask={handleDeleteTask}
              handleUpdateTask={handleUpdateTask}
            />
          </section>

          : <section />}
      </section>
    </div>
  )
}
