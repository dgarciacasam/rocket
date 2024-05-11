import { ReactNode } from 'react'

export interface Task {
  id: number
  title: string
  description: string
  finishDate: Date
  users: User[]
  onDeleteTask?: (id: number) => void
  columnId: number
}

export interface Card {
  id: number
  title: string
  datosTarjetas: Task[] | null
}

export interface User {
  email?: string
  id: number
  name: string
  image: string
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
  adminId: number
}
