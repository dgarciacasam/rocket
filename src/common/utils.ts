import * as types from '@/common/types'

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

// Función que convierte la imagen en base64 en un blob que utilizar como imagen
export const convertProfilePic = (base64Image: string): string => {
  const decodedImage = atob(base64Image)
  const ab = new ArrayBuffer(decodedImage.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < decodedImage.length; i++) {
    ia[i] = decodedImage.charCodeAt(i)
  }
  const blob = new Blob([ab], { type: 'image/jpeg' })
  const imageUrl = window.URL.createObjectURL(blob)
  return imageUrl
}

export function getUsersData (users: types.Users[], userId: number) {
  const userData = users.filter((user: types.User) => user.id !== userId)
  const dataAvatar = userData.map((usuario: types.User) => ({
    id: usuario.id,
    name: usuario.name ?? 'Nombre',
    designation: usuario.email ?? 'Email',
    image: convertProfilePic(usuario.profilePic)
  }))

  return dataAvatar
}

export function filterProjectTasks (projects: types.Project[], userId: number): types.Project[] {
  return projects.map(project => {
    const filteredTasks = project.tasks.filter(task =>
      task.users.some(user => user.id === userId)
    )

    return {
      ...project,
      tasks: filteredTasks
    }
  })
}
