import React, { useEffect, useState } from 'react'
import api from '../api'

type Department = {
  _id?: string
  name: string
  location?: string
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState<Department>({ name: '', location: '' })
  const [editingId, setEditingId] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get('/d')
      setDepartments(res.data.data || [])
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
    setForm({ name: '', location: '' })
    setEditingId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      if (editingId) {
        await api.put(`/d/${editingId}`, form)
      } else {
        await api.post('/d', form)
      }
      await load()
      resetForm()
    } catch (err: any) {
      setError(err.message || 'Save failed')
    }
  }

  const handleEdit = (d: Department) => {
    setEditingId(d._id || null)
    setForm({ name: d.name, location: d.location })
  }

  const handleDelete = async (id?: string) => {
    if (!id) return
    if (!confirm('Delete this department?')) return
    try {
      await api.delete(`/d/${id}`)
      await load()
    } catch (err: any) {
      setError(err.message || 'Delete failed')
    }
  }

  return (
    <div className='card'>
      <h2>Departments</h2>
      {loading && <div className='small'>Loading…</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <div className='grid'>
        <div>
          <form onSubmit={handleSubmit}>
            <div className='form-row'>
              <label>Name</label>
              <input
                value={form.name}
                onChange={(e: any) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />
            </div>

            <div className='form-row'>
              <label>Location</label>
              <input
                value={form.location}
                onChange={(e: any) =>
                  setForm({ ...form, location: e.target.value })
                }
              />
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
          {departments.length === 0 ? (
            <div className='muted'>No departments found.</div>
          ) : (
            departments.map((d) => (
              <div key={d._id} className='list-item'>
                <div>
                  <div className='list-title'>{d.name}</div>
                  {d.location ? (
                    <div className='muted small'>{d.location}</div>
                  ) : null}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    className='btn btn-ghost'
                    onClick={() => handleEdit(d)}
                  >
                    Edit
                  </button>
                  <button
                    className='btn btn-danger'
                    onClick={() => handleDelete(d._id)}
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
