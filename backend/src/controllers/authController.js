import User from "../models/userModel.js"
import asyncHandler from "../middlewares/asyncHandler.js"
import tokenUtils from "../utils/tokenUtils.js"
import jwt from "jsonwebtoken"

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

  // tokenUtils sets refreshCookie and saves in db
  const accessToken = await tokenUtils(user._id, res)

  res.status(201).json({
    success: true,
    message: "User created successfully!",
    accessToken,
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

  // tokenUtils sets refreshCookie and saves in db
  const accessToken = await tokenUtils(user._id, res)

  res.status(200).json({
    success: true,
    message: "User logged in successfully!",
    accessToken,
    user: { _id: user._id, name: user.name, userName: user.userName },
  })
})

const refresh = asyncHandler(async (req, res) => {
  const oldRefreshToken = req.cookies.refreshToken
  if (!oldRefreshToken)
    return res
      .status(401)
      .json({ success: false, message: "Refresh token is missing!" })

  const decodeToken = jwt.verify(
    oldRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  )

  const user = await User.findById(decodeToken?._id)
  if (!user || oldRefreshToken !== user.refreshToken)
    return res
      .status(401)
      .json({ success: false, message: "Refresh token is invalid or expired!" })

  // tokenUtils sets refreshCookie and saves in db
  const newAccessToken = await tokenUtils(user._id, res)

  res.status(200).json({
    success: true,
    message: "Tokens refreshed and rotated successfully!",
    accessToken: newAccessToken,
  })
})

export { register, login, refresh }
