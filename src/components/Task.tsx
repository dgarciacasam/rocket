import { useEffect, useState } from 'react'
import * as types from '../common/types'
import { useDebounce } from '@uidotdev/usehooks'
import { Calendar } from '@/@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/@/components/ui/popover'

import { AnimatedTooltip } from './AvatarGroup'
import { convertProfilePic } from '@/common/utils'
const DEBOUNCE_TIME = 500

export const Task: React.FC<types.Task> = ({ id, title, description, finishDate, onDeleteTask, onUpdateTask, users, columnId, projectId }) => {
  const [Title, setTitle] = useState(title)
  const [Description, setDescription] = useState(description)
  const [FinishDate, setFinishDate] = useState(finishDate)
  const [data, setData] = useState<types.AnimatedTooltipData[]>([])

  const dias = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

  const debouncedTitle = useDebounce(Title, DEBOUNCE_TIME)
  const debouncedDescription = useDebounce(Description, DEBOUNCE_TIME)
  const debouncedFinishDate = useDebounce(FinishDate, DEBOUNCE_TIME)

  const handleDelete = (id: number): void => {
    onDeleteTask(id)
  }

  useEffect(() => {
    const newTask: types.Task = {
      id,
      title: debouncedTitle !== '' ? debouncedTitle : title,
      description: debouncedDescription !== '' ? debouncedDescription : description,
      finishDate: debouncedFinishDate !== undefined ? debouncedFinishDate : finishDate,
      columnId,
      projectId,
      onDeleteTask,
      onUpdateTask,
      users
    }

    // Llama a la función de actualización cuando cualquiera de las propiedades cambie
    if (
      (debouncedTitle !== '' && debouncedTitle !== title) ||
      (debouncedDescription !== '' && debouncedDescription !== description) ||
      (debouncedFinishDate !== undefined && debouncedFinishDate !== finishDate)
    ) {
      onUpdateTask(newTask, id)
    }
  }, [debouncedTitle, debouncedDescription, debouncedFinishDate])

  useEffect(() => {
    const dataAvatar = users.map((usuario: types.User) => ({
      id: usuario.id,
      name: usuario.name ?? 'Nombre',
      designation: usuario.email ?? 'Email',
      image: convertProfilePic(usuario.profilePic) ?? 'https://github.com/dgarciacasam.png'
    }))
    setData(dataAvatar)
  }, [users])

  return (
    <div className='bg-[#292b31] p-4 mb-3 rounded-xl mx-2' id={id.toString()}>
      <div>
        <div className='flex  justify-between'>
          <input
            type='text'
            className='font-bold text-pretty bg-[#292b31] w-[70%]'
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Escribe un nombre...'
          />
          <button
            className='flex justify-center items-center p-0 m-0 w-11 h-11 bg-[#24262c] rounded-full border-solid border-[2px] border-[rgba(255,255,255,0.1)] button '
            onClick={() => { handleDelete(id) }}
          >
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
        </div>
        <textarea
          className=' text-pretty bg-[#292b31] w-[70%] resize-none' rows={3}
          onChange={(e) => setDescription(e.target.value)}
          defaultValue={description}
        />

      </div>
      <div className='flex pt-4'>
        <div className='mt-2 w-[60%]'>
          <Popover>
            <PopoverTrigger asChild>
              <button className='font-bold text-[rgba(255,255,255,0.7)] bg-[rgba(54,55,60,255)] rounded-full py-2 px-4 text-[14px] flex hover:text-white'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='lucide lucide-calendar-days mr-1'
                >
                  <path d='M8 2v4' /><path d='M16 2v4' /><rect width='18' height='18' x='3' y='4' rx='2' /><path d='M3 10h18' /><path d='M8 14h.01' /><path d='M12 14h.01' /><path d='M16 14h.01' /><path d='M8 18h.01' /><path d='M12 18h.01' /><path d='M16 18h.01' />
                </svg>
                {
                  (FinishDate !== null) ? `${dias[new Date(FinishDate).getDay()]} ${new Date(FinishDate).getDate()} de ${meses[new Date(FinishDate).getMonth()]} de ${new Date(FinishDate).getFullYear()}` : 'Sin fecha'
                }
              </button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <Calendar
                mode='single'
                selected={FinishDate}
                onSelect={(date) => {
                  if (date instanceof Date && !isNaN(date.getTime())) { // Verifica si date es una instancia de Date válida
                    setFinishDate(date) // Establece la fecha seleccionada
                  }
                }}
                initialFocus
                className='bg-[#24262c]'
              />
            </PopoverContent>
          </Popover>
        </div>
        <AnimatedTooltip items={data} />

      </div>
    </div>
  )
}
