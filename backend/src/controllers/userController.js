import asyncHandler from "../middlewares/asyncHandler.js"
import User from "../models/userModel.js"
import Friend from "../models/friendModel.js"

const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile fetched successfully!",
    user: req.user,
  })
}

const updateMyProfile = asyncHandler(async (req, res) => {
  const loggedInUser = req.user
  const { name, userName } = req.body

  const alreadyTaken = await User.findOne({ userName })
  if (alreadyTaken && userName !== loggedInUser.userName)
    return res.status(409).json({
      success: false,
      message: "Username is already taken. Please choose another one!",
    })

  const user = await User.findByIdAndUpdate(
    loggedInUser._id,
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

const getAllNonFriendUsers = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id

  const friendships = await Friend.find({
    $or: [{ sender: loggedInUserId }, { receiver: loggedInUserId }],
  })

  const friendUserIds = friendships
    .flatMap((friendship) => [
      friendship.sender.toString(),
      friendship.receiver.toString(),
    ])
    .filter((id) => id !== loggedInUserId.toString())

  const excludedUserIds = [
    ...new Set([loggedInUserId.toString(), ...friendUserIds]),
  ]

  const nonFriendUsers = await User.find({
    _id: { $nin: excludedUserIds },
  }).select("-password -refreshToken")

  res.status(200).json({
    success: true,
    message: "Non-friend users fetched successfully!",
    nonFriendUsers,
  })
})

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
