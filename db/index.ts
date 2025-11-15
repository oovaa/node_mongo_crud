import mongoose from 'mongoose'

const DEFAULT_URI = 'mongodb://mongo-db:27017/node_mongo_crud'

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default async function init() {
  const uri = process.env.MONGO_URI || DEFAULT_URI
  const maxAttempts = 6
  let attempt = 0

  while (attempt < maxAttempts) {
    try {
      attempt++
      // mongoose.connect returns a promise
      await mongoose.connect(uri, {
        // keep defaults but be explicit about the modern options
        // (options object left mostly empty for mongoose v6+)
      } as mongoose.ConnectOptions)
      console.log('MongoDB connected to', uri)
      return
    } catch (err: any) {
      const wait = Math.min(1000 * Math.pow(2, attempt), 15000)
      console.warn(
        `MongoDB connection attempt ${attempt} failed: ${
          err.message || err
        }. retrying in ${wait}ms`
      )
      // last attempt -> rethrow
      if (attempt >= maxAttempts) {
        console.error('MongoDB connection failed after', attempt, 'attempts')
        throw err
      }
      await sleep(wait)
    }
  }
}
