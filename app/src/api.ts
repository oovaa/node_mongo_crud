import axios from 'axios'

// Prefer build-time env var VITE_API_URL, fall back to the host:port used by the
// backend in docker-compose. Using an absolute URL ensures the production
// build calls the backend on port 3232 instead of the frontend's origin port.
const API_URL = (import.meta as any).env?.VITE_API_URL
console.log(API_URL)

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
