import { useEffect, useState } from 'react'
import EmployeesPage from './pages/EmployeesPage'
import DepartmentsPage from './pages/DepartmentsPage'
import api from './api'

export default function App() {
  const [message, setMessage] = useState<string>('')
  const [tab, setTab] = useState<'departments' | 'employees'>('departments')

  useEffect(() => {
    // quick check to departments endpoint mounted at /api/d
    api
      .get('/d')
      .then(() => setMessage('Backend reachable at /api'))
      .catch(() =>
        setMessage(
          'Backend not reachable — make sure backend is running on http://localhost:3000'
        )
      )
  }, [])

  return (
    <div className='app'>
      <header className='app-header card'>
        <div>
          <h1 className='app-title'>Node Mongo CRUD — Admin</h1>
          <p className='muted small'>{message}</p>
        </div>
        <nav className='nav'>
          <button
            onClick={() => setTab('departments')}
            disabled={tab === 'departments'}
          >
            Departments
          </button>
          <button
            onClick={() => setTab('employees')}
            disabled={tab === 'employees'}
            style={{ marginLeft: 8 }}
          >
            Employees
          </button>
        </nav>
      </header>

      <main style={{ marginTop: 16 }}>
        {tab === 'departments' ? <DepartmentsPage /> : <EmployeesPage />}
      </main>
    </div>
  )
}
