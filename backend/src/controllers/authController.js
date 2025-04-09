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

const login = asyncHandler(async (req, res) => {
  const { userName, password } = req.body
  const user = await User.findOne({ userName })
  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials!" })

  const comparedPassword = await user.comparePassword(password)
  if (!comparedPassword)
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials!" })

  res
    .status(200)
    .json({ success: true, message: "User valididated successfully!" })
})

export { register, login }
