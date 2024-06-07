import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../@/components/ui/table'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { tableColumn } from './TableColumns'
import * as types from '@/common/types'

interface DataTableProps {
  data: types.Task[]
  handleUpdateTask: (task: types.Task, id: number) => void
}

export const TableView: React.FC<DataTableProps> = ({ data, handleUpdateTask }) => {
  const columns = tableColumn({ handleUpdateTask }) // Pasamos handleUpdateTask como parte de un objeto
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })
  return (
    <Table className=''>
      <TableHeader className='bg-[#24262c]'>
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
      <TableBody>
        {table.getRowModel().rows.map((row, index) => (
          <TableRow key={row.id} className={(index % 2 === 0) ? 'hover:bg-none' : 'bg-[#24262c] hover:bg-[#24262c]'}>
            {row.getVisibleCells().map(cell => (
              <TableCell key={cell.id} className='text-[#]'>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>

  )
}
