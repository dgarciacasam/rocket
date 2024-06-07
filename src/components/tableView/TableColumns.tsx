import { Calendar } from '@/@/components/ui/calendar'
import * as types from '@/common/types'
import { convertProfilePic } from '@/common/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { ColumnDef } from '@tanstack/react-table'
import { AnimatedTooltip } from '../AvatarGroup'
import { Button } from '@/@/components/ui/button'
import { ChangeEvent } from 'react'
type HandleUpdateTaskFunction = (task: types.Task, id: number) => void

const dias = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const handleChangeColumn = (e: ChangeEvent<HTMLSelectElement>, task: types.Task, handleUpdateTask: HandleUpdateTaskFunction): void => {
  task.columnId = +e.target.value
  handleUpdateTask(task, task.id)
}

const handleChangeDate = (newFinishDate: Date, task: types.Task, handleUpdateTask: HandleUpdateTaskFunction): void => {
  task.finishDate = newFinishDate
  handleUpdateTask(task, task.id)
}

interface TableColumnProps {
  handleUpdateTask: HandleUpdateTaskFunction
  handleDeleteTask: (taskId: number) => void
}

export const tableColumn = ({ handleUpdateTask, handleDeleteTask }: TableColumnProps): Array<ColumnDef<types.Task>> => [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='text-base'
        >
          Título
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-arrow-up-down'
          >
            <path d='m21 16-4 4-4-4' />
            <path d='M17 20V4' />
            <path d='m3 8 4-4 4 4' />
            <path d='M7 4v16' />
          </svg>
        </Button>
      )
    }
  },
  {
    accessorKey: 'description',
    header: 'Descripción'
  },
  {
    accessorKey: 'finishDate',
    header: ({ column }) => {
      return (
        <div className='text-center'>
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='text-base'
          >
            Fecha finalización
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='lucide lucide-arrow-up-down'
            >
              <path d='m21 16-4 4-4-4' />
              <path d='M17 20V4' />
              <path d='m3 8 4-4 4 4' />
              <path d='M7 4v16' />
            </svg>
          </Button>
        </div>
      )
    },
    cell: info => {
      const FinishDate = info.getValue() as Date
      const task = info.row.original
      return (
        <div className='flex justify-center '>
          <Popover>
            <PopoverTrigger asChild>
              <button className='font-bold text-[rgba(255,255,255,0.7)] bg-[rgba(54,55,60,255)] rounded-full py-2 px-4 text-[14px] flex hover:text-white'>
                <svg
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
                  <path d='M8 2v4' />
                  <path d='M16 2v4' />
                  <rect width='18' height='18' x='3' y='4' rx='2' />
                  <path d='M3 10h18' />
                  <path d='M8 14h.01' />
                  <path d='M12 14h.01' />
                  <path d='M16 14h.01' />
                  <path d='M8 18h.01' />
                  <path d='M12 18h.01' />
                  <path d='M16 18h.01' />
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
                    handleChangeDate(date, task, handleUpdateTask)
                  }
                }}
                initialFocus
                className='bg-[#24262c]'
              />
            </PopoverContent>
          </Popover>
        </div>
      )
    }
  },
  {
    accessorKey: 'users',
    header: 'Usuarios',
    cell: info => {
      const users = info.getValue() as types.User[]
      const dataAvatar = users.map((usuario: types.User) => ({
        id: usuario.id,
        name: usuario.name ?? 'Nombre',
        designation: usuario.email ?? 'Email',
        image: convertProfilePic(usuario.profilePic) ?? ''
      }))
      return <div className='flex'><AnimatedTooltip items={dataAvatar} /></div>
    }
  },
  {
    accessorKey: 'columnId',
    header: ({ column }) => {
      return (
        <div className='text-center'>
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='text-base'
          >
            Estado
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='lucide lucide-arrow-up-down'
            >
              <path d='m21 16-4 4-4-4' />
              <path d='M17 20V4' />
              <path d='m3 8 4-4 4 4' />
              <path d='M7 4v16' />
            </svg>
          </Button>
        </div>
      )
    },
    cell: info => {
      const currentStatus = info.getValue() as number
      const task = info.row.original

      let bgColor = 'bg-emerald-50'
      let textColor = 'text-green-800'
      if (currentStatus === 2) {
        bgColor = 'bg-yellow-50'
        textColor = 'text-yellow-600'
      }
      if (currentStatus === 3) {
        bgColor = 'bg-red-50'
        textColor = 'text-red-700'
      }

      return (
        <div className='flex justify-center'>
          <select
            value={currentStatus}
            className={`${bgColor} ${textColor} rounded-full px-2 py-1 font-bold`}
            onChange={(e) => handleChangeColumn(e, task, handleUpdateTask)}
          >
            <option value='1'>Sin empezar</option>
            <option value='2'>Pendiente</option>
            <option value='3'>Finalizado</option>
          </select>
        </div>
      )
    }
  },
  {
    accessorKey: 'delete',
    header: () => (
      <div className='text-center'>Eliminar</div>
    ),
    cell: (info) => {
      const taskId = info.row.original.id
      return (
        <div className='flex justify-center'>
          <button
            className='flex justify-center items-center p-0 m-0 w-11 h-11 bg-[#24262c] rounded-full border-solid border-[2px] border-[rgba(255,255,255,0.1)] button '
            onClick={() => { handleDeleteTask(taskId) }}
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
      )
    }
  }
]
