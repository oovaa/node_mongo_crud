// getting-started.js

import mongoose, { model, Schema } from 'mongoose'

const departmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  numberOfEmployees: { type: Number, default: 0 },
  location: String,
})

export default model('department', departmentSchema)


