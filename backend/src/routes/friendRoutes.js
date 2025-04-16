import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import {
  cancelFriendRequest,
  getFriends,
  getIncomingRequests,
  getOutgoingRequests,
  handleFriendRequest,
  removeAcceptedFriend,
  sendFriendRequest,
} from "../controllers/friendController.js"

const router = express.Router()
router.use(authMiddleware)

// send or cancel a friend request
router.post("/requests/:receiverId", sendFriendRequest)
router.delete("/requests/:requestId", cancelFriendRequest)

// check incoming or outgoing friend requests
router.get("/requests/incoming", getIncomingRequests)
router.get("/requests/outgoing", getOutgoingRequests)

// handle friend requests, status -> (accept or reject)
router.patch("/requests/:requestId/:status", handleFriendRequest)

// get or remove accepted friends
router.get("/", getFriends)
router.delete("/:acceptedRequestId", removeAcceptedFriend)

export default router
