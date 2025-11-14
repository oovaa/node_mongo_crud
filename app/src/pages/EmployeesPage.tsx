import React, { useEffect, useState } from 'react'
import api from '../api'

type Department = { _id?: string; name: string }

type Employee = {
  _id?: string
  name: string
  surename?: string
  DOB?: string
  department?: string
  department_id?: string
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState<Partial<Employee>>({
    name: '',
    surename: '',
    DOB: '',
    department: '',
    department_id: '',
  })
  const [editingId, setEditingId] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const [empRes, depRes] = await Promise.all([api.get('/e'), api.get('/d')])
      setEmployees(empRes.data.data || [])
      setDepartments(depRes.data.data || [])
    } catch (err: any) {
      setError(err.message || 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const resetForm = () => {
    setForm({
      name: '',
      surename: '',
      DOB: '',
      department: '',
      department_id: '',
    })
    setEditingId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const payload: any = {
        name: form.name,
        surename: form.surename,
        DOB: form.DOB,
        department: form.department,
        department_id: form.department_id,
      }
      if (editingId) {
        await api.put(`/e/${editingId}`, payload)
      } else {
        await api.post('/e', payload)
      }
      await load()
      resetForm()
    } catch (err: any) {
      setError(err.message || 'Save failed')
    }
  }

  const handleEdit = (e: Employee) => {
    setEditingId(e._id || null)
    setForm({
      name: e.name,
      surename: e.surename,
      DOB: e.DOB ? new Date(e.DOB).toISOString().slice(0, 10) : '',
      department: e.department,
      department_id: e.department_id || '',
    })
  }

  const handleDelete = async (id?: string) => {
    if (!id) return
    if (!confirm('Delete this employee?')) return
    try {
      await api.delete(`/e/${id}`)
      await load()
    } catch (err: any) {
      setError(err.message || 'Delete failed')
    }
  }

  return (
    <div className='card'>
      <h2>Employees</h2>
      {loading && <div className='small'>Loading…</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <div className='grid'>
        <div>
          <form onSubmit={handleSubmit}>
            <div className='form-row'>
              <label>Name</label>
              <input
                value={form.name || ''}
                onChange={(ev: any) =>
                  setForm({ ...form, name: ev.target.value })
                }
                required
              />
            </div>

            <div className='form-row'>
              <label>Surname</label>
              <input
                value={form.surename || ''}
                onChange={(ev: any) =>
                  setForm({ ...form, surename: ev.target.value })
                }
              />
            </div>

            <div className='form-row'>
              <label>DOB</label>
              <input
                type='date'
                value={form.DOB || ''}
                onChange={(ev: any) =>
                  setForm({ ...form, DOB: ev.target.value })
                }
              />
            </div>

            <div className='form-row'>
              <label>Department</label>
              <select
                value={form.department_id || ''}
                onChange={(ev: any) => {
                  const id = ev.target.value
                  const found = departments.find((d) => d._id === id)
                  setForm({
                    ...form,
                    department_id: id,
                    department: found ? found.name : '',
                  })
                }}
              >
                <option value=''>— Unassigned —</option>
                {departments.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button className='btn btn-primary' type='submit'>
                {editingId ? 'Update' : 'Create'}
              </button>
              {editingId ? (
                <button
                  type='button'
                  className='btn btn-ghost'
                  onClick={resetForm}
                >
                  Cancel
                </button>
              ) : null}
            </div>
          </form>
        </div>

        <div>
          {employees.length === 0 ? (
            <div className='muted'>No employees found.</div>
          ) : (
            employees.map((emp) => (
              <div key={emp._id} className='list-item'>
                <div>
                  <div className='list-title'>
                    {emp.name} {emp.surename}
                  </div>
                  <div className='muted small'>
                    {emp.department || '—'}{' '}
                    {emp.DOB
                      ? `· ${new Date(emp.DOB).toLocaleDateString()}`
                      : ''}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    className='btn btn-ghost'
                    onClick={() => handleEdit(emp)}
                  >
                    Edit
                  </button>
                  <button
                    className='btn btn-danger'
                    onClick={() => handleDelete(emp._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
