import express from "express"
import {
  register,
  login,
  refresh,
  logout,
} from "../controllers/authController.js"
import validate from "../middlewares/validateRequest.js"
import { loginSchema, registerSchema } from "../validators/authValidator.js"

const router = express.Router()

router.post("/register", validate(registerSchema), register)
router.post("/login", validate(loginSchema), login)
router.get("/refresh", refresh)
router.post("/logout", logout)

export default router
