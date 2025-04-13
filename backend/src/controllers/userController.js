import asyncHandler from "../middlewares/asyncHandler.js"
import User from "../models/userModel.js"

const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile fetched successfully!",
    user: req.user,
  })
}

const updateMyProfile = asyncHandler(async (req, res) => {
  const loggedUser = req.user
  const { name, userName } = req.body

  const alreadyTaken = await User.findOne({ userName })
  if (alreadyTaken && userName !== loggedUser.userName)
    return res.status(409).json({
      success: false,
      message: "Username is already taken. Please choose another one!",
    })

  const user = await User.findByIdAndUpdate(
    loggedUser._id,
    {
      name,
      userName,
    },
    { new: true }
  ).select("-password -refreshToken")

  res
    .status(200)
    .json({ success: true, message: "Profile updated successfully!", user })
})

const getAllNonFriendUsers = (req, res) => {
  res.send("getAllNonFriendUsers")
}

const searchUsers = (req, res) => {
  res.send("searchUsers")
}

const getUserProfileById = (req, res) => {
  res.send("getUserProfileById")
}

export {
  getMyProfile,
  updateMyProfile,
  getAllNonFriendUsers,
  searchUsers,
  getUserProfileById,
}
