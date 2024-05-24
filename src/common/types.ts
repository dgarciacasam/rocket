import { ReactNode } from 'react'

export interface LoginObject {
  username: string
  password: string
}

export interface RegisterObject extends LoginObject {
  email: string
}

export interface Task {
  id: number
  title: string
  description: string
  finishDate: Date
  users: User[]
  onDeleteTask: (id: number) => void
  onUpdateTask: (task: Task, id: number) => void
  columnId: number
  projectId: number | null
}

export interface Card {
  id: number
  title: string
  data: Task[] | null
  userId: number
  handleCreateTask: (id: number, task: Task) => void
  handleDeleteTask: (id: number) => void
  handleUpdateTask: (task: Task, id: number) => void
}

export interface User {
  email?: string
  id: number
  name: string
  profilePic: string
}

export interface Column {
  id: number
  name: string
  taskList: Task[] | null
}

export interface SideNavButton {
  href: string
  children: ReactNode
}

export interface TopContentProps {
  username: string
  imageUrl: string
}

export interface ImageUrls {
  [key: number]: string
}

export interface Project {
  id: number
  name: string
  description: string
  adminId: number
  users: User[]
  tasks: Task[]
}

export interface AnimatedTooltipData {
  id: number
  name: string
  designation: string
  image: string
}

export interface response {
  ok: boolean
  message: string
}
