import User from "../models/userModel.js"
import asyncHandler from "../middlewares/asyncHandler.js"

const register = asyncHandler(async (req, res) => {
  const { name, userName, password } = req.body
  const existingUser = await User.findOne({ userName })

  if (existingUser)
    return res
      .status(409)
      .json({ success: false, message: "User already exists!" })

  // User model hashes password in pre-save
  const user = await User.create({
    name,
    userName,
    password,
  })

  res.status(201).json({
    success: true,
    message: "User registered successfully!",
    user: { _id: user._id, name: user.name, userName: user.userName },
  })
})

const login = (req, res) => {
  res.send("login")
}

export { register, login }
