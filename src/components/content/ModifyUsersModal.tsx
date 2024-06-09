import { convertProfilePic } from '@/common/utils'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import * as types from '@/common/types'
import { useEffect, useState } from 'react'

interface modifyUserModalProps {
  isOpen: boolean
  setIsOpen: (state: boolean) => void
  staticUsers: types.User[]
  users: types.User[]
  taskInfo: types.Task
  updateTask: (task: types.Task, taskId: number) => void
}

export const ModifyUserModal: React.FC<modifyUserModalProps> = ({ isOpen, setIsOpen, staticUsers, users, taskInfo, updateTask }) => {
  const [filteredUsers, setFilteredUsers] = useState<types.User[]>([])

  useEffect(() => {
    const userFilter = staticUsers.filter((user: types.User) => !users.some((u: types.User) => u.id === user.id))
    setFilteredUsers(userFilter)
  }, [staticUsers])

  const updateTasksUsers = (addUser: boolean, user: types.User): void => {
    if (addUser) {
      const newUsers: types.User[] = users
      newUsers.push(user)
      taskInfo.users = newUsers
      updateTask(taskInfo, taskInfo.id)
    } else {
      const newUsers: types.User[] = users.filter((u: types.User) => u.id !== user.id)
      taskInfo.users = newUsers
      updateTask(taskInfo, taskInfo.id)
    }
  }

  if (isOpen) {
    return (
      <div className='swal2-container swal2-center swal2-backdrop-show overflow-y-auto '>
        <div
          aria-labelledby='swal2-title'
          aria-describedby='swal2-html-container'
          className='swal2-popup swal2-modal swal2-show grid bg-[#111215]'
          tabIndex={-1}
          role='dialog'
          aria-live='assertive' aria-modal='true'
        >
          <h2 className='swal2-title block text-white' id='swal2-title '>Participantes de la tarea</h2>

          <div className='swal2-html-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[calc(100px*4+16px*3)]' style={{ paddingInline: '0.5rem' }}>
            {users.map((user: types.User) => (
              <article key={user.id} className='flex flex-col justify-between items-center border border-white rounded pt-1 h-[100px] cursor-pointer hover:bg-[#ffe3e3]' onClick={async () => updateTasksUsers(false, user)}>
                <div className='flex flex-col justify-center items-center'>
                  <Avatar className='size-12 border-2 border-stone-300 mb-2 rounded-full'>
                    <AvatarImage src={convertProfilePic(user.profilePic)} className='rounded-full' />
                  </Avatar>
                  <span>{user.name}</span>
                </div>
              </article>
            ))}
          </div>

          <h2 className='swal2-title block text-white' id='swal2-title '>Usuarios del proyecto</h2>
          <div className='swal2-html-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[calc(100px*4+16px*3)]' style={{ paddingInline: '0.5rem' }}>
            {filteredUsers.map((user: types.User) => (
              <article key={user.id} className='flex flex-col justify-between items-center border border-white rounded pt-1 h-[100px] cursor-pointer hover:bg-[#dcebfc]' onClick={async () => updateTasksUsers(true, user)}>
                <div className='flex flex-col justify-center items-center'>
                  <Avatar className='size-12 border-2 border-stone-300 mb-2 rounded-full'>
                    <AvatarImage className='rounded-full' src={convertProfilePic(user.profilePic)} />
                  </Avatar>
                  <span>{user.name}</span>
                </div>
              </article>
            ))}
          </div>
          <div className='swal2-actions flex '>
            <div className='swal2-loader' />

            <button type='button' className='swal2-cancel swal2-styled swal2-default-outline inline-block' onClick={() => { setIsOpen(false) }}>Guardar cambios</button>
          </div>
        </div>
      </div>
    )
  }
  return (<></>)
}
