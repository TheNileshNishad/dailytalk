import express from "express"
import auth from "../middlewares/authMiddleware.js"
import { getMyProfile, updateMyProfile } from "../controllers/userController.js"
import validate from "../middlewares/validateRequest.js"
import updateUserSchema from "../validators/userValidator.js"

const router = express()

router.get("/me", auth, getMyProfile)
router.put("/me", auth, validate(updateUserSchema), updateMyProfile)

export default router
