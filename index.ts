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

// simple logger middleware
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  const start = Date.now()
  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms \n body ${req.body}`)
  })
  next()
})

app.use('/api/e', employeeRouter)
app.use('/api/d', departmentRouter)

app.listen(3000, () => console.log('listinign in http://localhost:3000'))
