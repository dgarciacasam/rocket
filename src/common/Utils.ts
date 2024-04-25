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
