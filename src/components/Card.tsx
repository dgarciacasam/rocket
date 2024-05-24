import { useEffect, useState } from 'react'
import { Task } from './Task'
import * as types from '../common/types'
export const Card: React.FC<types.Card> = ({
  id,
  title,
  data,
  userId,
  handleDeleteTask,
  handleCreateTask,
  handleUpdateTask
}) => {
  const [counter, setCounter] = useState(data?.length ?? 0)

  useEffect(() => {
    setCounter(data?.length ?? 0)
  }, [data])

  const task: types.Task = {
    id: 0,
    title: 'Nueva tarea',
    description: 'Esto es una nueva tarea',
    finishDate: new Date(),
    users: [],
    columnId: id,
    projectId: null,
    onDeleteTask: handleDeleteTask,
    onUpdateTask: handleUpdateTask
  }

  return (
    <article className='bg-[#24262c] rounded-xl p-4 h-fit'>
      <div className='flex justify-between mb-2'>
        <div className='flex'>
          <span>({counter})</span>
          <p className='text-[rgba(255,255,255,0.4)] bg-[#24262c] ml-2 text-lg'>{title}</p>

        </div>
        <button className='flex items-center button' onClick={() => { handleCreateTask(userId, task) }}>
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
          Añadir tarea
        </button>

      </div>
      {data != null
        ? data.map((datos) => (
          <Task
            key={datos.id}
            id={datos.id}
            title={datos.title}
            description={datos.description}
            finishDate={datos.finishDate}
            onDeleteTask={handleDeleteTask}
            users={datos.users}
            columnId={datos.columnId}
            projectId={datos.projectId}
            onUpdateTask={handleUpdateTask}
          />
        ))
        : ''}
    </article>
  )
}
