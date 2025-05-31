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

    if (existingRequest.status === "rejected") {
      const rejectedTime = new Date(existingRequest.updatedAt)
      const now = new Date()
      const timeDiff = now - rejectedTime
      const oneHour = 60 * 60 * 1000

      if (timeDiff < oneHour) {
        const remaining = oneHour - timeDiff
        const minutes = Math.floor(remaining / (60 * 1000))
        const seconds = Math.floor((remaining % (60 * 1000)) / 1000)

        return res.status(429).json({
          success: false,
          message: `Your friend request recenlty rejected. Try again in ${minutes} minutes and ${seconds} seconds!`,
        })
      }

      existingRequest.status = "pending"
      await existingRequest.save()

      return res.status(200).json({
        success: true,
        message: `Friend request to ${receiverExists.name} re-sent successfully!`,
        requestId: existingRequest._id,
      })
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

  res.status(200).json({
    success: true,
    message:
      incomingRequests.length === 0
        ? "No pending friend requests found!"
        : "Pending friend requests fetched successfully!",
    incomingRequests,
  })
})

const getOutgoingRequests = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id

  const outgoingRequests = await Friend.find({
    sender: loggedInUserId,
    status: "pending",
  }).populate("receiver", "-password -refreshToken")

  res.status(200).json({
    success: true,
    message:
      outgoingRequests.length === 0
        ? "No outgoing friend request found!"
        : "Outgoing friend requests fetched successfully!",
    outgoingRequests,
  })
})

const handleFriendRequest = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id
  const { requestId, status } = req.params

  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a valid requestId!" })
  }

  const validStatus = ["accepted", "rejected"]
  if (!validStatus.includes(status))
    return res
      .status(400)
      .json({ success: false, message: `${status} is not a valid status!` })

  const updateRequest = await Friend.findOneAndUpdate(
    {
      _id: requestId,
      receiver: loggedInUserId,
      status: "pending",
    },
    { status },
    { new: true, runValidators: true }
  ).populate("sender", "name")

  if (!updateRequest)
    return res.status(400).json({
      success: false,
      message:
        "No pending friend request found, or you are not authorized to accept or reject it!",
    })

  res.status(200).json({
    success: true,
    message: `Friend request from ${updateRequest.sender.name} ${status} successfully!`,
  })
})

const getFriends = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id

  const friends = await Friend.find({
    $or: [
      { sender: loggedInUserId, status: "accepted" },
      { receiver: loggedInUserId, status: "accepted" },
    ],
  })

  if (friends.length === 0)
    return res
      .status(200)
      .json({ success: true, message: "No friends found!", friends: [] })

  res
    .status(200)
    .json({ success: true, message: "Friends fetched successfully!", friends })
})

const removeAcceptedFriend = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id
  const { acceptedRequestId } = req.params

  if (!mongoose.Types.ObjectId.isValid(acceptedRequestId)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid acceptedRequestId!",
    })
  }

  const removedFriend = await Friend.findOneAndDelete({
    $or: [
      { _id: acceptedRequestId, sender: loggedInUserId },
      { _id: acceptedRequestId, receiver: loggedInUserId },
    ],
  })

  if (!removedFriend)
    return res.status(400).json({
      success: false,
      message: "Request Id not found, or you are not authorized to unfriend!",
    })

  res.status(200).json({ success: true, message: "Unfriended successfully!" })
})

export {
  sendFriendRequest,
  cancelFriendRequest,
  getIncomingRequests,
  getOutgoingRequests,
  handleFriendRequest,
  getFriends,
  removeAcceptedFriend,
}
