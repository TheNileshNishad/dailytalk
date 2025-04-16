import asyncHandler from "../middlewares/asyncHandler.js"
import mongoose from "mongoose"
import User from "../models/userModel.js"
import Friend from "../models/friendModel.js"

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
    message: `Friend request to ${receiverExists.name} sent successfully!`,
    requestId: newRequest._id,
  })
})

const cancelFriendRequest = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id
  const { requestId } = req.params

  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a valid requestId!" })
  }

  const cancelRequest = await Friend.findOneAndDelete({
    _id: requestId,
    sender: loggedInUserId,
    status: "pending",
  }).populate("receiver", "name")

  if (!cancelRequest)
    return res.status(400).json({
      success: false,
      message:
        "No pending friend request found, or you are not authorized to cancel it!",
    })

  res.status(200).json({
    success: true,
    message: `Friend request to ${cancelRequest.receiver.name} cancelled successfully!`,
  })
})

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

const getOutgoingRequests = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id

  const sentRequests = await Friend.find({
    sender: loggedInUserId,
    status: "pending",
  }).populate("receiver", "-password -refreshToken")

  if (sentRequests.length === 0)
    return res.status(200).json({
      success: true,
      message: "No outgoing friend request found!",
    })

  res.status(200).json({
    success: true,
    message: "Outgoing friend requests fetched successfully!",
    sentRequests,
  })
})

const handleFriendRequest = (req, res) => {
  res.send("handleFriendRequest")
}

const getFriends = (req, res) => {
  res.send("getFriends")
}

const removeAcceptedFriend = (req, res) => {
  res.send("removeFriend")
}

export {
  sendFriendRequest,
  cancelFriendRequest,
  getIncomingRequests,
  getOutgoingRequests,
  handleFriendRequest,
  getFriends,
  removeAcceptedFriend,
}
