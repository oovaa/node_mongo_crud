import express, { json } from 'express'
import cors from 'cors'
import init from './db'
import { employeeRouter } from './router/employees'
import departmentRouter from './router/departments'
const app = express()

app.use(json())
app.use(cors())

init()

app.get('/', (req, res) => {
  res.json({ status: 'sucess' })
})

app.use('/api/e', employeeRouter)
app.use('/api/d', departmentRouter)

app.listen(3000, () => console.log('listinign in http://localhost:3000'))
