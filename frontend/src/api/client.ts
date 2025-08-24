import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
})


export default apiClient
