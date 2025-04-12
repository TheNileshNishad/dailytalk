import asyncHandler from "../middlewares/asyncHandler.js"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization header missing!",
    })
  }

  const token = authHeader.split(" ")[1]

  // if jwt throws error it gonna caught by errorHandler middleware
  const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

  const user = await User.findById(decodeToken?._id).select(
    "-password -refreshToken"
  )
  if (!user)
    return res.status(400).json({ success: false, message: "User not found!" })

  req.user = user
  next()
})

export default authMiddleware
