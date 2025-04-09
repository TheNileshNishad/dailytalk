import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import errorHandler from "./middlewares/errorHandler.js"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/authRoutes.js"

const app = express()
app.use(express.json())
app.use(cookieParser())
dotenv.config()

app.get("/", (req, res) => {
  res.send("Hello there! The server is up and running!🚀✨")
})
app.use("/api/auth", authRoutes)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server successfully started on PORT ${PORT}!✔️`)
  connectDb()
})
