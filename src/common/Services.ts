import * as types from './types'

export const getProfilePic = async (userId: number): Promise<string> => {
  try {
    const response = await fetch(`http://localhost:8080/user/getProfilePic/${userId}`, { method: 'GET' })
    const data = await response.blob()
    const imageUrl = URL.createObjectURL(data)
    return imageUrl
  } catch (error) {
    console.error('Error fetching profile picture:', error)
    throw error
  }
}

export const getProjects = async (userId: number): Promise<types.Project[]> => {
  const response = await fetch(`http://localhost:8080/project/getProjecstByUser/${userId}`)
  const projects = await response.json()
  return projects
}
