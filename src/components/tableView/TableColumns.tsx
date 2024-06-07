import { Calendar } from '@/@/components/ui/calendar'
import * as types from '@/common/types'
import { convertProfilePic } from '@/common/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { ColumnDef } from '@tanstack/react-table'
import { AnimatedTooltip } from '../AvatarGroup'
import { Button } from '@/@/components/ui/button'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

type HandleUpdateTaskFunction = (task: types.Task, id: number) => void

const dias = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const handleChangeColumn = (e, task: types.Task, handleUpdateTask: HandleUpdateTaskFunction) => {
  task.columnId = e.target.value
  handleUpdateTask(task, task.id)
}

interface TableColumnProps {
  handleUpdateTask: HandleUpdateTaskFunction
}

export const tableColumn = ({ handleUpdateTask }: TableColumnProps): Array<ColumnDef<types.Task>> => [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
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
    header: 'Fecha finalización',
    cell: info => {
      const FinishDate = info.getValue() as Date
      return (
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
                  console.log(date)
                }
              }}
              initialFocus
              className='bg-[#24262c]'
            />
          </PopoverContent>
        </Popover>
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
    header: 'Estado',
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

        <select
          value={currentStatus}
          className={`${bgColor} ${textColor} rounded-full px-2 py-1 font-bold`}
          onChange={(e) => handleChangeColumn(e, task, handleUpdateTask)}
        >
          <option value='1'>Sin empezar</option>
          <option value='2'>Pendiente</option>
          <option value='3'>Finalizado</option>
        </select>
      )
    }
  },
  {
    header: 'Opciones',
    cell: () => {
      return (
        <div>Opciones</div>
      )
    }
  }
]
