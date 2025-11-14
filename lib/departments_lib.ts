// services/departmentService.ts

import init from '../db'
import department from '../db/department'

export const departmentService = {
  async getAllDepartments() {
    return await department.find({})
  },

  async getDepartmentById(id: string) {
    return await department.findById(id)
  },

  async createDepartment(data: {
    name: string
    location?: string
    numberOfEmployees?: number
  }) {
    return await department.create(data)
  },

  async updateDepartment(
    id: string,
    updates: Partial<{
      name: string
      location: string
      numberOfEmployees: number
    }>
  ) {
    return await department.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })
  },

  async deleteDepartment(id: string) {
    return await department.findByIdAndDelete(id)
  },

  async searchDepartmentsByName(name: string) {
    return await department.find({ name: { $regex: name, $options: 'i' } })
  },
}

// init()
// const department_name = department
//   .findOne({ _id: '69158c91b5727af72a4430f3' })
//   .select('name')

// console.log(await department_name)
