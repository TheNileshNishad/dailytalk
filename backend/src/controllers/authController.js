import User from "../models/userModel.js"
import asyncHandler from "../middlewares/asyncHandler.js"

const register = asyncHandler(async (req, res) => {
  const { name, userName, password } = req.body
  const user = await User.create({
    name,
    userName,
    password,
  })
  res.send("created")
})

const login = (req, res) => {
  res.send("login")
}

export { register, login }
