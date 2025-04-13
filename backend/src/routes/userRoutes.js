import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import {
  getAllNonFriendUsers,
  getMyProfile,
  getUserProfileById,
  searchUsers,
  updateMyProfile,
} from "../controllers/userController.js"
import validate from "../middlewares/validateRequest.js"
import updateUserSchema from "../validators/userValidator.js"

const router = express.Router()
router.use(authMiddleware)

// user profile routes
router.get("/me", getMyProfile)
router.put("/me", validate(updateUserSchema), updateMyProfile)

// user discovery routes
router.get("/discover", getAllNonFriendUsers)
router.get("/search", searchUsers)

// specific user route
router.get("/:userId", getUserProfileById)

export default router
