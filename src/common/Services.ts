import * as types from './types'

/* export const getProfilePic = async (userId: number): Promise<string> => {
  try {
    const response = await fetch(`http://localhost:8080/user/getProfilePic/${userId}`, { method: 'GET' })
    const data = await response.blob()
    const imageUrl = URL.createObjectURL(data)
    return imageUrl
  } catch (error) {
    console.error('Error fetching profile picture:', error)
    throw error
  }
} */

export const getProjects = async (userId: number): Promise<types.Project[]> => {
  const response = await fetch(`http://localhost:8080/project/getProjecstByUser/${userId}`)
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
