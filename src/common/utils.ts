import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { navigate } from 'wouter/use-browser-location'
import * as types from '@/common/types'
export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function updateParams (params, search): void {
  const searchParams = new URLSearchParams(search)
  Object.keys(params).forEach(key => {
    searchParams.set(key, params[key])
  })
  navigate(`${location.pathname}?${searchParams.toString()}`)
}

export function getCards (projects: types.Project[]): types.Task[][] {
  const tasks: types.Task[][] = []
  for (let i = 1; i <= 3; i++) {
    tasks.push(projects.flatMap(project => project.tasks.filter(task => task.columnId === i)))
  }
  return tasks
}

export function getCard (columnId: number, projects: types.Project[]): types.Task[] {
  return projects.flatMap(project => project.tasks.filter(task => task.columnId === columnId))
}
