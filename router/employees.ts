import { Router } from 'express'
import {
  create_employee,
  get_all_employees,
  get_employee_by_id,
} from '../lib/get_all_employees'

const employeeRouter = Router()

employeeRouter.get('/', (req, res) => {
  const all_employees = get_all_employees()
  res.json({ status: 'sucess', data: all_employees })
})

employeeRouter.get('/:id', (req, res) => {
  const id = req.params.id
  const all_employees = get_employee_by_id(id)
  res.json({ status: 'sucess', data: all_employees })
})

employeeRouter.get('/:name', (req, res) => {
  const name = req.params.name
  const all_employees = get_employee_by_id(name)
  res.json({ status: 'sucess', data: all_employees })
})

employeeRouter.post('/', (req, res) => {
  const new_employee = create_employee(req.body)
})
