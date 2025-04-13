import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import {
  acceptFriendRequest,
  cancelFriendRequest,
  getFriends,
  getIncomingRequests,
  getSentRequests,
  rejectFriendRequest,
  removeFriend,
  sendFriendRequest,
} from "../controllers/friendController.js"

const router = express.Router()
router.use(authMiddleware)

// get all your friends
router.get("/", getFriends)

// check incoming and sent friend requests
router.get("/requests/incoming", getIncomingRequests)
router.get("/requests/sent", getSentRequests)

// send or cancel a request to someone
router.post("/requests/:receiverId", sendFriendRequest)
router.put("/requests/:receiverId", cancelFriendRequest)

// accept or reject a request you received
router.put("/requests/:senderId/accept", acceptFriendRequest)
router.put("/requests/:senderId/reject", rejectFriendRequest)

// unfriend someone
router.delete("/:friendId", removeFriend)

export default router
