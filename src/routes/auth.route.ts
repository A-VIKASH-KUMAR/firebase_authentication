/**
 * Express router instance for authentication routes.
 * @typedef {import('express').Router} Router
 */

import express from "express";
import { register, login, googlelogin, googleUser } from "../controllers/auth.controller";
import { validateRegister, validateLogin } from "../middlewares/auth.validate";

const router = express.Router();

/**
 * Route for user registration.
 * @name POST /api/auth/register
 * @function
 * @memberof Router
 * @param {string} path - The route path.
 * @param {Function} middleware - Middleware for validating registration data.
 * @param {Function} handler - Controller function for handling registration logic.
 */
router.post("/register", validateRegister, register);

/**
 * Route for user login.
 * @name POST /api/auth/login
 * @function
 * @memberof Router
 * @param {string} path - The route path.
 * @param {Function} middleware - Middleware for validating login data.
 * @param {Function} handler - Controller function for handling login logic.
 */
router.post("/login", validateLogin, login);

/**
 * Route for initiating Google login.
 * @name GET /api/auth/google
 * @function
 * @memberof Router
 * @param {string} path - The route path.
 * @param {Function} handler - Controller function for initiating Google login.
 */
router.get("/google", googlelogin);

/**
 * Route for handling Google user data after authentication.
 * @name POST /api/auth/google-user
 * @function
 * @memberof Router
 * @param {string} path - The route path.
 * @param {Function} handler - Controller function for handling Google user data.
 */
router.post("/google-user", googleUser)

export default router;