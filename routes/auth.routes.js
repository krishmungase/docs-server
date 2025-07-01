import express from "express";
import { AuthController } from "../controllers/index.js"
const authRoutes = express.Router();
const authcontroller = new AuthController();

authRoutes.post(
  '/sendVerificationEmailForRegistration',
  (req, res, next) => authcontroller.sendVerificationEmailForRegistration(req, res, next)
);

authRoutes.post(
  '/createPassword',
  (req, res, next) => authcontroller.createPassword(req, res, next)
)

authRoutes.post(
  '/login',
  (req, res, next) => authcontroller.login(req, res, next)
)

authRoutes.post(
  '/self',
  (req, res, next) => authcontroller.self(req, res, next)
)

authRoutes.post(
  '/forgotPassword',
  (req, res, next) => authcontroller.forgotPassword(req, res, next)
)

authRoutes.post(
  '/resetPassword',
  (req, res, next) => authcontroller.resetPassword(req, res, next)
)

export default authRoutes;
