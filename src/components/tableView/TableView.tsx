import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../@/components/ui/table'
import { SortingState, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { tableColumn } from './TableColumns'
import * as types from '@/common/types'
import { Button } from '@/@/components/ui/button'
import { useState } from 'react'

interface DataTableProps {
  data: types.Task[]
  handleUpdateTask: (task: types.Task, id: number) => void
}

export const TableView: React.FC<DataTableProps> = ({ data, handleUpdateTask }) => {
  const columns = tableColumn({ handleUpdateTask })
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting
    }
  })
  return (
    <section>
      <div />
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
        >
          Previous
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </section>
  )
}
function setSorting (updaterOrValue: Updater<SortingState>): void {
  throw new Error('Function not implemented.')
}
