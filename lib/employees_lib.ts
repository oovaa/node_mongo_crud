import { Types } from 'mongoose'
import employee from '../db/employee'
import department from '../db/department'

// Add return types for better TypeScript support
interface IEmployeeData {
  name: string
  DOB: Date
  department_id: Types.ObjectId | string
  department?: string
}

export const get_all_employees = async (): Promise<any[]> => {
  return await employee.find({}).populate('department_id')
}

export const get_employee_by_id = async (id: string): Promise<any | null> => {
  // Use findById for single document queries
  if (!id || !Types.ObjectId.isValid(id)) throw new Error('Invalid employee ID')

  return await employee.findById(id).populate('department_id')
}

export const get_employee_by_name = async (name: string): Promise<any[]> => {
  if (!name?.trim()) throw new Error('Employee name is required')

  return await employee.find({ name: name.trim() }).populate('department_id')
}

export const create_employee = async (data: IEmployeeData): Promise<any> => {
  // Add validation
  if (!data.name?.trim() || !data.DOB || !data.department_id)
    throw new Error('Name, DOB, and department_id are required')

  return await employee.create(data)
}

export const update_employee = async (
  id: string,
  data: Partial<IEmployeeData>
): Promise<any> => {
  // Validate ID
  if (!id || !Types.ObjectId.isValid(id)) throw new Error('Invalid employee ID')

  // Check if employee exists
  const existingEmployee = await employee.findById(id)
  if (!existingEmployee) {
    throw new Error('Employee not found')
  }

  // Use Partial to allow updating only some fields
  const updateData = { ...data }

  return await employee.updateOne({ _id: id }, { $set: updateData })
}

export const delete_employee = async (id: string): Promise<any> => {
  if (!id || !Types.ObjectId.isValid(id)) throw new Error('Invalid employee ID')

  // Check if employee exists before deleting
  const existingEmployee = await employee.findById(id)
  if (!existingEmployee) throw new Error('Employee not found')

  return await employee.deleteOne({ _id: id })
}
