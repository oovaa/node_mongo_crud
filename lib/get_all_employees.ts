import type { Schema, Types } from 'mongoose'
import employee from '../db/employee'

export const get_all_employees = () => {
  return employee.find({}).populate('department_id')
}

export const get_employee_by_id = (id: string) => {
  return employee.find({ _id: id }).populate('department_id')
}

export const get_employee_by_name = (name: string) => {
  return employee.find({ name: name }).populate('department_id')
}

interface IEmployeeData {
  name: string
  DOB: Date
  department_id: Types.ObjectId | string
  department?: string
}

export const create_employee = (data: IEmployeeData) => {
  return employee.create(data)
}
