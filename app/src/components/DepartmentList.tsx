import React, { useEffect, useState } from 'react'
import api from '../api'

type Department = {
  _id?: string
  name: string
  location?: string
}

type DepartmentsResponse = {
  status: string
  data: Department[]
  count?: number
}

export default function DepartmentList() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    api
      .get<DepartmentsResponse>('/d') // calls /api/d via axios baseURL
      .then((res) => setDepartments(res.data.data || []))
      .catch((err: any) => setError(err.message || 'Failed to load'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading departments…</div>
  if (error) return <div style={{ color: 'red' }}>{error}</div>

  if (!departments.length) return <div>No departments found.</div>

  return (
    <div className='department-list'>
      {departments.map((d) => (
        <div key={d._id} className='department-item'>
          <strong>{d.name}</strong>
          {d.location ? <div>{d.location}</div> : null}
        </div>
      ))}
    </div>
  )
}
