import asyncHandler from "../middlewares/asyncHandler.js"
import User from "../models/userModel.js"
import Friend from "../models/friendModel.js"
import mongoose from "mongoose"

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

  const avatar = req.file
  console.log(avatar)

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
  const { page = 1, limit = 10, search = "" } = req.query
  const skip = (page - 1) * limit

  const friendships = await Friend.find({
    $and: [
      { $or: [{ sender: loggedInUserId }, { receiver: loggedInUserId }] },
      { status: { $ne: "rejected" } },
    ],
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

  const query = {
    _id: { $nin: excludedUserIds },
  }

  if (search.trim()) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { userName: { $regex: search, $options: "i" } },
    ]
  }

  const users = await User.find(query)
    .select("-password -refreshToken")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)

  const total = await User.countDocuments(query)

  res.status(200).json({
    success: true,
    message: "Users profile fetched successfully!",
    users,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  })
})

const getUserProfileById = asyncHandler(async (req, res) => {
  const { userId } = req.params

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a valid user ID!" })
  }

  const user = await User.findById(userId).select("-password -refreshToken")
  if (!user)
    return res
      .status(404)
      .json({ success: false, message: "No user found with that ID!" })

  res
    .status(200)
    .json({ success: true, message: "User detail fetched successfully!", user })
})

export {
  getMyProfile,
  updateMyProfile,
  getAllNonFriendUsers,
  getUserProfileById,
}
