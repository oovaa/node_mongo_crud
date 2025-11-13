import express, { json } from 'express'
import cors from 'cors'
import init from './db'
const app = express()

app.use(json())
app.use(cors())

init()

app.get('/', (req, res) => {
  res.json({ status: 'sucess' })
})






app.listen(4000, () => console.log('listinign in http://localhost:4000'))
