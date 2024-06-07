import * as types from '@/common/types'
import { ColumnDef } from '@tanstack/react-table'

type HandleUpdateTaskFunction = (task: types.Task, id: number) => void

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
    header: 'Title'
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    accessorKey: 'finishDate',
    header: 'FinishDate'
  },
  {
    accessorKey: 'users',
    header: 'Users',
    cell: info => {
      const users = info.getValue() as types.User[]
      return users.map(user => user.name).join(', ')
    }
  },
  {
    accessorKey: 'columnId',
    header: 'Estado',
    cell: info => {
      const currentStatus = info.getValue() as number
      const task = info.row.original
      return (
        <select
          value={currentStatus}
          className='bg-transparent rounded'
          onChange={(e) => handleChangeColumn(e, task, handleUpdateTask)}
        >
          <option value='1'>Sin empezar</option>
          <option value='2'>En proceso</option>
          <option value='3'>Finalizado</option>
        </select>
      )
    }
  }
]
