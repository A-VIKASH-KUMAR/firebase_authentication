import express from "express";
import { register, login, googlelogin } from "../controllers/auth.controller";
import { validateRegister, validateLogin } from "../middlewares/auth.validate";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/google", googlelogin);
router.post("/google-user")

export default router;