import mongoose from 'mongoose'

export default async function init() {
  mongoose.connect('mongodb://mongo-db:27017/node_mongo_crud')
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
