// routes/departmentRoutes.ts
import { Router } from 'express'
import { departmentService } from '../lib/departments_lib'

export const departmentRouter = Router()

// GET /departments - Get all departments
departmentRouter.get('/', async (req, res) => {
  try {
    const departments = await departmentService.getAllDepartments()
    res.json({
      status: 'success',
      data: departments,
      count: departments.length,
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch departments',
    })
  }
})

// GET /departments/:id - Get department by ID
departmentRouter.get('/:id', async (req, res) => {
  try {
    const one_department = await departmentService.getDepartmentById(
      req.params.id
    )

    if (!one_department) {
      return res.status(404).json({
        status: 'error',
        message: 'Department not found',
      })
    }

    res.json({ status: 'success', data: one_department })
  } catch (error) {
    res.status(400).json({
      status: 'error',

      message: error.message,
    })
  }
})

// POST /departments - Create new department
departmentRouter.post('/', async (req, res) => {
  try {
    const newDepartment = await departmentService.createDepartment(req.body)
    res.status(201).json({
      status: 'success',
      data: newDepartment,
    })
  } catch (error) {
    const statusCode = error.message.includes('already exists') ? 409 : 400
    res.status(statusCode).json({
      status: 'error',
      message: error.message,
    })
  }
})

// PUT /departments/:id - Update department
departmentRouter.put('/:id', async (req, res) => {
  try {
    const updatedDepartment = await departmentService.updateDepartment(
      req.params.id,
      req.body
    )
    res.json({
      status: 'success',
      data: updatedDepartment,
    })
  } catch (error) {
    const statusCode = error.message.includes('not found')
      ? 404
      : error.message.includes('already exists')
      ? 409
      : 400
    res.status(statusCode).json({
      status: 'error',
      message: error.message,
    })
  }
})

// PATCH /departments/:id - Partial update department
departmentRouter.patch('/:id', async (req, res) => {
  try {
    const updatedDepartment = await departmentService.updateDepartment(
      req.params.id,
      req.body
    )
    res.json({
      status: 'success',
      data: updatedDepartment,
    })
  } catch (error) {
    const statusCode = error.message.includes('not found')
      ? 404
      : error.message.includes('already exists')
      ? 409
      : 400
    res.status(statusCode).json({
      status: 'error',
      message: error.message,
    })
  }
})

// DELETE /departments/:id - Delete department
departmentRouter.delete('/:id', async (req, res) => {
  try {
    const deleted_department = await departmentService.deleteDepartment(
      req.params.id
    )
    res.json({
      status: 'success',
      message: 'Department deleted successfully',
      data: deleted_department,
    })
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 : 400
    res.status(statusCode).json({
      status: 'error',
      message: error.message,
    })
  }
})

// GET /departments/search/:name - Search departments by name
departmentRouter.get('/search/:name', async (req, res) => {
  try {
    const departments = await departmentService.searchDepartmentsByName(
      req.params.name
    )
    res.json({
      status: 'success',
      data: departments,
      count: departments.length,
    })
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    })
  }
})

export default departmentRouter
