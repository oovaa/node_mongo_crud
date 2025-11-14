import axios from 'axios'

const api = axios.create({
  baseURL: '/api', // proxied by Vite to backend
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
