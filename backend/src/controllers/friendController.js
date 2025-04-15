import asyncHandler from "../middlewares/asyncHandler.js"
import mongoose from "mongoose"
import User from "../models/userModel.js"
import Friend from "../models/friendModel.js"

const getFriends = (req, res) => {
  res.send("getFriends")
}

const getIncomingRequests = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id

  const incomingRequests = await Friend.find({
    receiver: loggedInUserId,
    status: "pending",
  }).populate("sender", "-password -refreshToken")

  if (incomingRequests.length === 0)
    return res
      .status(200)
      .json({ success: true, message: "No pending friend requests found!" })

  res.status(200).json({
    success: true,
    message: "Pending friend requests fetched successfully!",
    incomingRequests,
  })
})

const getSentRequests = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id

  const sentRequests = await Friend.find({
    sender: loggedInUserId,
    status: "pending",
  }).populate("receiver", "-password -refreshToken")

  if (sentRequests.length === 0)
    return res.status(200).json({
      success: true,
      message: "No sent pending friend requests found!",
    })

  res.status(200).json({
    success: true,
    message: "Sent pending friend requests fetched successfully!",
    sentRequests,
  })
})

const sendFriendRequest = asyncHandler(async (req, res) => {
  const sender = req.user._id
  const receiver = req.params.receiverId

  if (!mongoose.Types.ObjectId.isValid(receiver))
    return res
      .status(400)
      .json({ success: false, message: "Please provide a valid user ID!" })

  if (sender.toString() === receiver)
    return res.status(400).json({
      success: false,
      message: "You cannot send a friend request to yourself!",
    })

  const receiverExists = await User.findById(receiver)
  if (!receiverExists)
    return res
      .status(404)
      .json({ success: false, message: "No user found with that ID!" })

  const existingRequest = await Friend.findOne({
    $or: [
      { sender, receiver },
      { sender: receiver, receiver: sender },
    ],
  })

  if (existingRequest) {
    if (existingRequest.status === "pending") {
      return res.status(409).json({
        success: false,
        message: existingRequest.sender.equals(sender)
          ? "Friend request already sent!"
          : "You have a pending request from this user!",
      })
    }
    if (existingRequest.status === "accepted") {
      return res
        .status(400)
        .json({ success: false, message: "You are already friends!" })
    }
  }

  const newRequest = await Friend.create({
    sender,
    receiver,
  })

  res.status(201).json({
    success: true,
    message: `Friend request sent to ${receiverExists.name}!`,
    requestId: newRequest._id,
  })
})

const cancelFriendRequest = (req, res) => {
  res.send("cancelFriendRequest")
}

const acceptFriendRequest = (req, res) => {
  res.send("acceptFriendRequest")
}

const rejectFriendRequest = (req, res) => {
  res.send("rejectFriendRequest")
}

const removeFriend = (req, res) => {
  res.send("removeFriend")
}

export {
  getFriends,
  getIncomingRequests,
  getSentRequests,
  sendFriendRequest,
  cancelFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
}
