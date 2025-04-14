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
  const { page = 1, limit = 10, search = "" } = req.query
  const skip = (page - 1) * limit

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

const getUserProfileById = (req, res) => {
  res.send("getUserProfileById")
}

export {
  getMyProfile,
  updateMyProfile,
  getAllNonFriendUsers,
  getUserProfileById,
}
