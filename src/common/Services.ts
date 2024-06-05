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
          const errorResponse = await response.json()
          if (response.status === 400 && errorResponse.errores !== null) {
            // Lanza un error por cada error en la respuesta
            console.log(errorResponse.errores)
            for (const [field, message] of Object.entries(errorResponse.errores)) {
              toast.error(message)
            }
            return
          }
          throw new Error('Error al registrar el usuario')
        }
        toast.success('Se ha creado el usuario con éxito')
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

export const getUsers = async (): Promise<types.User[]> => {
  return await fetch(`${API_HOST}/user`, {
    method: 'GET',
    credentials: 'include'
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error('Error al recoger los usuarios')
    }
    return await response.json()
  }).catch((error) => {
    toast.error(error.message)
    throw error
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

export const updateProject = async (project: types.Project): Promise<void> => {
  return await fetch(`${API_HOST}/project/${project.id} `, {
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify(project),
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

export const createProject = async (userId: number, project: { name: string, description: string, adminId: number }): Promise<types.Project | null> => {
  return await fetch(`${API_HOST}/project/${userId}`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(project),
    headers: { 'Content-Type': 'application/json' }
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error('Error al crear la tarea')
    }
    return await response.json()
  }).catch((error) => {
    toast.error(error.message)
    return null
  })
}

export const deleteProject = async (projectId: number): Promise<boolean> => {
  return await fetch(`${API_HOST}/project/${projectId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error('Error al eliminar el proyecto')
    }
    toast.success('Se ha eliminado el proyecto con éxito')
    return true
  }).catch((error) => {
    toast.error(error.message)
    return false
  })
}

export const changeProfilePic = async (userId: number, profilePic: File): Promise<void> => {
  const formData = new FormData()
  formData.append('image', profilePic)

  return await fetch(`${API_HOST}/user/setProfilePic/${userId}`, {
    method: 'POST',
    credentials: 'include',
    body: formData
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Error al modificar la imagen de perfil')
    }
    toast.success('Se ha modificado la imagen con éxito')
  }).catch((error) => {
    toast.error(error.message)
  })
}
