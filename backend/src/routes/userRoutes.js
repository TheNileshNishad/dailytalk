import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import { getMyProfile } from "../controllers/userController.js"

const router = express()

router.get("/me", authMiddleware, getMyProfile)

export default router
