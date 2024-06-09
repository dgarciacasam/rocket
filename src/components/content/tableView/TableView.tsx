import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/@/components/ui/table'
import { ColumnFiltersState, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { tableColumn } from './TableColumns'
import * as types from '@/common/types'
import { Button } from '@/@/components/ui/button'
import { useState } from 'react'
import { Input } from '@/@/components/ui/input'

interface DataTableProps {
  data: types.Task[]
  userId: number
  staticUsers: types.User[]
  handleUpdateTask: (task: types.Task, id: number) => void
  handleDeleteTask: (taskId: number) => void
  handleCreateTask: (userId: number, task: types.Task) => void
}

export const TableView: React.FC<DataTableProps> = ({ data, userId, staticUsers, handleUpdateTask, handleDeleteTask, handleCreateTask }) => {
  const columns = tableColumn({ handleUpdateTask, handleDeleteTask })
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const task: types.Task = {
    id: 0,
    title: 'Nueva tarea',
    description: 'Esto es una nueva tarea',
    finishDate: new Date(),
    users: [],
    columnId: 1,
    projectId: null,
    staticUsers,
    onDeleteTask: handleDeleteTask,
    onUpdateTask: handleUpdateTask
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters
    }
  })
  return (
    <section>
      <div className='flex items-center py-4 justify-between'>
        <Input
          placeholder='Filtrar tareas...'
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)}
          className='max-w-sm rounded'
        />
        <button className='flex items-center button max-w-sm rounded hover:rounded' onClick={() => { handleCreateTask(userId, task) }}>
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
      <Table className=''>
        <TableHeader className='bg-[#24262c] font-bold text-base'>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className='font-light text-base'>
          {table.getRowModel().rows.map((row, index) => (
            <TableRow key={row.id} className={(index % 2 === 0) ? 'hover:bg-none' : 'bg-[#24262c] hover:bg-[#24262c]'}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id} className='py-4'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className='rounded'
        >
          Anterior
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className='rounded'
        >
          Siguiente
        </Button>
      </div>
    </section>
  )
}
