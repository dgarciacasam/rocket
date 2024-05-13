import { useEffect, useState } from 'react'
import { Task } from './Task'
import * as types from '../common/types'
import { API_HOST } from '@/config'
export const Card: React.FC<types.Card> = ({
  id,
  title,
  datosTarjetas
}) => {
  const [datosTarjeta, setDatosTarjetas] = useState(datosTarjetas)
  const [counter, setCounter] = useState(datosTarjeta?.length ?? 0)
  const [titulo, setTitle] = useState(title)

  useEffect(() => {
    setCounter(datosTarjeta?.length ?? 0)
  }, [datosTarjeta])

  const handleDeleteTask = (taskId: any): void => {
    const updatedDatosTarjetas = datosTarjeta?.filter(task => task.id !== taskId)
    if (updatedDatosTarjetas != null) {
      setDatosTarjetas(updatedDatosTarjetas)
    }
  }

  const addNewTask = (): void => {
    const newTask: types.Task = {
      id: 0,
      title: 'Nueva tarea',
      description: 'Esto es una nueva tarea',
      finishDate: new Date(),
      onDeleteTask: handleDeleteTask,
      users: [],
      columnId: id
    }

    fetch(`${API_HOST}/task`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
        credentials: 'include'
      }
    ).then(async (response) => {
      const data = await response.text()
      newTask.id = +data
      if (datosTarjeta != null) {
        console.log('nueva tarea creada')
        setDatosTarjetas([...datosTarjeta, newTask])
        return
      }
      console.log(newTask.id)
    })
      .catch((error) => { throw error })

    // setDatosTarjetas([newTask])
  }

  return (
    <article className='bg-[#24262c] rounded-xl p-4 h-fit'>
      <div className='flex justify-between mb-2'>
        <div className='flex'>
          <span>({counter})</span>
          <p className='text-[rgba(255,255,255,0.4)] bg-[#24262c] ml-2 text-lg'>{titulo}</p>

        </div>
        <button className='flex items-center' onClick={addNewTask}>
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
      {datosTarjeta != null
        ? datosTarjeta.map((datos) => (

          <Task
            key={datos.id}
            id={datos.id}
            title={datos.title}
            description={datos.description}
            finishDate={datos.finishDate}
            onDeleteTask={handleDeleteTask}
            users={datos.users}
            columnId={datos.columnId}
          />
        ))
        : ''}
    </article>
  )
}
