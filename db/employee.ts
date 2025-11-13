import { model, Schema, SchemaType, SchemaTypes } from 'mongoose'

const employeeSchecma = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surename: String,
    DOB: {
      type: Date,
      default: Date.now(),
    },

    department: String,
    department_id: {
      type: SchemaTypes.ObjectId,
      ref: 'department',
    },
  },
  { timestamps: true }
)

export default model('employee', employeeSchecma)
