import express from "express"
import { register, login, refresh } from "../controllers/authController.js"
import validateRequest from "../middlewares/validateRequest.js"
import { loginSchema, registerSchema } from "../validators/authValidator.js"

const router = express.Router()

router.post("/register", validateRequest(registerSchema), register)
router.post("/login", validateRequest(loginSchema), login)
router.post("/refresh", refresh)

export default router
