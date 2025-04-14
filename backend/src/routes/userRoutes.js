import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import {
  getAllNonFriendUsers,
  getMyProfile,
  getUserProfileById,
  updateMyProfile,
} from "../controllers/userController.js"
import validate from "../middlewares/validateRequest.js"
import updateUserSchema from "../validators/userValidator.js"

const router = express.Router()
router.use(authMiddleware)

// user profile routes
router.get("/me", getMyProfile)
router.put("/me", validate(updateUserSchema), updateMyProfile)

// search user (queries -> page, limit, search)
router.get("/search", getAllNonFriendUsers)

// get specific user profile
router.get("/:userId", getUserProfileById)

export default router
