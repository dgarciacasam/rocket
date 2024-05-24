import { API_HOST } from '@/config'
import * as types from './types'
import { toast } from 'sonner'

export const login = async (loginObject: types.LoginObject): Promise<void> => {
  if (loginObject.username !== '' && loginObject.password !== '') {
    return await fetch(`${API_HOST}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginObject),
      credentials: 'include'
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('El usuario o la contraseña son incorrectos')
        }
        return await response.json()
      })
      .catch((error) => {
        toast.error(error.message)
      })
  } else {
    const error = new Error('El usuario y contraseña no pueden estar vacíos')
    toast.error(error.message)
    return await Promise.reject(error)
  }
}

export const register = async (registerObject: types.RegisterObject): Promise<void> => {
  if (registerObject.username !== '' && registerObject.password !== '' && registerObject.email !== '') {
    return await fetch(`${API_HOST}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerObject),
      credentials: 'include'
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('El usuario o la contraseña son incorrectos')
        }
        return await response.json()
      }).catch((error) => {
        toast.error(error.message)
        throw error
      })
  } else {
    const error = new Error('No pueden haber campos vacíos')
    toast.error(error.message)
    return await Promise.reject(error)
  }
}

export const isAuthenticated = async (): Promise<types.User | null> => {
  return await fetch(`${API_HOST}/auth/me`, {
    method: 'GET',
    headers: {},
    credentials: 'include'
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error('Error al autenticar')
      }
      return await response.json()
    })
    .then(async (userData) => {
      return await fetch(`${API_HOST}/user/${userData.id as number}`, {
        method: 'GET',
        credentials: 'include'
      })
    })
    .then(async (userResponse) => {
      if (!userResponse.ok) {
        throw new Error('Se ha producido un error al recoger la información del usuario')
      }

      return await userResponse.json()
    }).then((data) => {
      return data.data as types.User
    })
    .catch(() => {
      return null
    })
}

export const logout = async (): Promise<{ ok: boolean }> => {
  return await fetch(`${API_HOST}/auth/logout`, {
    method: 'DELETE',
    credentials: 'include'
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error('Se ha producido un error al cerrar la sesión')
    }
    return await response.json()
  }).catch((e) => {
    toast.error(e.message)
    return { ok: false }
  })
}

export const getProjects = async (userId: number): Promise<types.Project[]> => {
  const response = await fetch(`${API_HOST}/project/getProjecstByUser/${userId}`, {
    method: 'GET',
    credentials: 'include'
  })
  const projects = await response.json()
  return projects
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

export const createTask = async (userId: number, newTask: any): Promise<types.Task | null> => {
  return await fetch(`${API_HOST}/task/${userId}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
      credentials: 'include'
    }
  ).then(async (response) => {
    if (!response.ok) {
      throw new Error('Se ha producido un error al crear la tarea')
    }
    toast.success('Tarea creada con éxito')
    const data = await response.text()
    newTask.id = +data

    return newTask
  })
    .catch((error) => {
      toast.error(error.message)
      return null
    })
}

export const deleteTask = async (id: number): Promise<boolean> => {
  return await fetch(`${API_HOST}/task/deleteTask/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error('Se ha producido un error al eliminar la tarea')
      }
      toast.success('Se ha eliminado la tarea con éxito')
      return true
    })
    .catch((error) => {
      toast.error(error.message)
      return false
    })
}

export const updateTask = async (task: types.Task, taskId: number): Promise<void> => {
  return await fetch(`${API_HOST}/task/${taskId} `, {
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify(task),
    headers: { 'Content-Type': 'application/json' }
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error('Error al actualizar la tarea')
    }
    toast.success('Se ha actualizado la tarea con éxito')
  }).catch((error) => {
    toast.error(error.message)
    throw error
  })
}
