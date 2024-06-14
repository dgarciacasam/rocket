import React from 'react'
import * as types from '@/common/types'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { convertProfilePic } from '@/common/utils'

interface ProjectUsersModalProps {
  filteredUsers: types.User[]
  projectUsers: types.User[]
  isModalOpen: boolean
  setIsModalOpen: (isOpen: boolean) => void
  editingProject: types.Project | undefined
  updateProjectUsers: (isEditing: boolean, user: types.User, editingProject: types.Project) => void
}

export const ProjectUsersModal: React.FC<ProjectUsersModalProps> = ({ filteredUsers, projectUsers, isModalOpen, setIsModalOpen, editingProject, updateProjectUsers }) => {
  if (!isModalOpen) {
    return (
      <></>
    )
  }

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
        <h2 className='swal2-title block text-white' id='swal2-title '>Participantes del proyecto</h2>

        <div className='swal2-html-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[calc(100px*4+16px*3)]' style={{ paddingInline: '0.5rem' }}>
          {projectUsers.map((user: types.User) => (
            <article
              key={user.id} className='flex flex-col justify-between items-center border border-white rounded pt-1 h-[100px] cursor-pointer hover:bg-[#ffe3e3]'
              onClick={() => {
                if (editingProject != null) {
                  updateProjectUsers(false, user, editingProject)
                }
              }}
            >
              <div className='flex flex-col justify-center items-center'>
                <Avatar className='size-12 border-2 border-stone-300 mb-2 rounded-full'>
                  <AvatarImage src={convertProfilePic(user.profilePic)} className='rounded-full' />
                </Avatar>
                <span>{user.name}</span>
              </div>
            </article>
          ))}
        </div>

        <h2 className='swal2-title block text-white' id='swal2-title '>Todos los usuarios</h2>
        <div className='swal2-html-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[calc(100px*4+16px*3)]' style={{ paddingInline: '0.5rem' }}>
          {filteredUsers.map((user: types.User) => (
            <article
              key={user.id} className='flex flex-col justify-between items-center border border-white rounded pt-1 h-[100px] cursor-pointer hover:bg-[#dcebfc]'
              onClick={() => {
                if (editingProject != null) {
                  updateProjectUsers(true, user, editingProject)
                }
              }}
            >
              <div className='flex flex-col justify-center items-center'>
                <Avatar className='size-12 border-2 border-stone-300 mb-2 rounded-full'>
                  <AvatarImage src={convertProfilePic(user.profilePic)} className='rounded-full' />
                </Avatar>
                <span>{user.name}</span>
              </div>
            </article>
          ))}
        </div>
        <div className='swal2-actions flex '>
          <div className='swal2-loader' />

          <button type='button' className='swal2-cancel swal2-styled swal2-default-outline inline-block' onClick={() => { setIsModalOpen(false) }}>Guardar cambios</button>
        </div>
      </div>
    </div>
  )
}
