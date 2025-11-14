import { Router } from 'express'
import {
  create_employee,
  delete_employee,
  get_all_employees,
  get_employee_by_id,
  get_employee_by_name,
  update_employee,
} from '../lib/employees_lib'

export const employeeRouter = Router()

employeeRouter.get('/', async (req, res) => {
  const all_employees = await get_all_employees()
  res.json({ status: 'success', data: all_employees })
})

employeeRouter.get('/id/:id', async (req, res) => {
  const id = req.params.id
  const all_employees = await get_employee_by_id(id)
  res.json({ status: 'success', data: all_employees })
})

employeeRouter.get('/name/:name', async (req, res) => {
  const name: string = req.params.name
  const all_employees = await get_employee_by_name(name)
  res.json({ status: 'success', data: all_employees })
})

employeeRouter.post('/', async (req, res) => {

  const new_employee = await create_employee(req.body)
  res.json({ status: 'success', data: new_employee })
})

employeeRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const updated_employee = await update_employee(id, req.body)
  res.json({ status: 'success', data: updated_employee })
})

employeeRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  const deleted_employee = await delete_employee(id)
  res.json({ status: 'success', data: deleted_employee })
})
