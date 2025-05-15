import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const generateTokens = async (_id, res) => {
  const accessToken = jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  })

  const refreshToken = jwt.sign({ _id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  })

  const user = await User.findById(_id)
  user.refreshToken = refreshToken
  await user.save()

  res.cookie("refreshToken", refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  })

  return accessToken
}

export default generateTokens
