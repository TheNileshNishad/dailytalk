import mongoose from "mongoose"

const connectDb = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "dailytalk",
    })
    console.log(`Database connected successfully, host: ${db.connection.host}`)
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`)
    process.exit(1)
  }
}

export default connectDb
