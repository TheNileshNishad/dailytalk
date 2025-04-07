import express from "express"
import dotenv from "dotenv"

const app = express()
dotenv.config()

app.get("/", (req, res) => {
  res.send("Hello there! The server is up and running!🚀✨")
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server successfully started on PORT ${PORT}!✔️`)
})
