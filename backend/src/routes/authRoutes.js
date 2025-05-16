import express from "express"
import {
  register,
  login,
  refresh,
  logout,
  changePassword,
} from "../controllers/authController.js"
import validate from "../middlewares/validateRequest.js"
import {
  changePasswordSchema,
  loginSchema,
  registerSchema,
} from "../validators/authValidator.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/register", validate(registerSchema), register)
router.post("/login", validate(loginSchema), login)
router.get("/refresh", refresh)
router.post(
  "/change-password",
  authMiddleware,
  validate(changePasswordSchema),
  changePassword
)
router.post("/logout", logout)

export default router
