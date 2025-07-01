import createHttpError from "http-errors";
import logger from "../config/logger.js";
import EVENTS from "../constants/events.js"
import Config from "../config/index.js";
import URLS from "../constants/urls.js"
import htmlTemplates from "../html/index.js"
import bcrypt from "bcrypt"

import {
  AuthService,
  TokenService,
  NotificationService
} from "../service/index.js"

export class AuthController {
  constructor() {
    this.logger = logger
    this.authService = new AuthService()
    this.tokenService = new TokenService()
    this.notificationService = new NotificationService()
  }

  async sendVerificationEmailForRegistration(req, res, next) {
    const { fullName, email } = req.body || {}

    console.log("fullname: ", fullName);
    console.log("email: ", email);

    if (!fullName || !email)
      return next(createHttpError(400, "Full name and email are required"));

    this.logger.info({ event: EVENTS.SIGN_UP, data: { email } })

    const user = await this.authService.findUserByEmail(email);

    if (user)
      return next(
        createHttpError(
          400,
          "Email already exists. Please use a different email address."
        )
      );

    const EXP = 1000 * 60 * 5;
    const verifyEmailToken = await this.tokenService.signToken(
      { email, fullName },
      EXP
    );

    const verificationLink = `${Config.FRONTEND_URL}${URLS.createPasswordUrl
      }?token=${verifyEmailToken} `;

    await this.notificationService.send({
      to: email,
      text: "Send mail",
      subject: "Codify: Please Verify Your Email to Complete Registration",
      html: htmlTemplates.verifyEmail({
        fullName,
        verificationLink,
      }),
    })

    return res.json({
      messsage: "Send verification email.",
    });
  }

  async createPassword(req, res, next) {
    const { password, confirmPassword, token } = req.body || {}

    this.logger.info({ event: EVENTS.SIGN_UP, data: { token } });

    if (password !== confirmPassword) {
      return next(createHttpError(400, "Password and confirm password does not match."));
    }

    const user = await this.tokenService.verifyToken(token);
    if (!user || !user.fullName || !user.email) {
      return next(
        createHttpError(400, "Invalid token. Please provide a valid token.")
      );
    }

    if ((user?.exp || 0) * 1000 <= Date.now())
      return next(createHttpError(400, "Sorry, your token has expired."));

    const isUserExist = await this.authService.findUserByEmail(user?.email);
    if (isUserExist) return next(createHttpError(400, "User already exists"));

    const SALT = 10;
    const hashPassword = await bcrypt.hash(password, SALT);

    const updatedUser = await this.authService.createUser({
      email: user.email,
      fullName: user.fullName,
      password: hashPassword,
    })

    this.logger.info({
      event: EVENTS.CREATE_PASSWORD,
      data: { email: updatedUser.email, userId: updatedUser._id },
    });

    const jwtToken = await this.tokenService.signToken({
      userId: updatedUser._id
    })

    return res.json({ message: { user: updatedUser, authToken: jwtToken } });
  }

  async login(req, res, next) {
    const { email, password } = req.body || {};

    if (!email || !password) return next(createHttpError(400, "password and email are required"));

    const user = await this.authService.findUserByEmail(email);

    if (!user) return next(createHttpError(400, "User not found."));

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch)
      return next(
        createHttpError(
          400,
          "Email or password entered is incorrect. Please try again."
        )
      );

    const jwtToken = await this.tokenService.signToken({
      userId: user._id
    });

    return res.json({ message: { user, authToken: jwtToken } });
  }

  async self(req, res, next) {
    const { authToken } = req.body;

    if (!authToken) return next(createHttpError(401, "Unauthorized user"));

    const token = await this.tokenService.verifyToken(authToken);
    if (!token || !token.userId)
      return next(createHttpError(401, "Unauthorized user"));

    const user = await this.authService.findUserById(token.userId);
    if (!user) return next(createHttpError(401, "Unauthorized user"));

    return res.json({ message: { user, authToken } });
  }

  async forgotPassword(req, res, next) {
    const { email } = req.body;

    if (!email) return next(createHttpError(400, "Email is required"));

    const user = await this.authService.findUserByEmail(email);

    if (!user) return next(createHttpError(400, "user not found"));

    const EXP = 1000 * 60 * 60;
    const verifyEmailToken = await this.tokenService.signToken(
      { userId: user._id },
      EXP
    );

    const verificationLink = `${Config.FRONTEND_URL}${URLS.resetPasswordUrl
      }?token=${verifyEmailToken}`;

    await this.notificationService.send({
      to: email,
      text: "Send mail",
      subject: "Reset Your BL Sheet Password",
      html: htmlTemplates.resetPassword({
        fullName: user.fullName,
        verificationLink,
      }),
    });

    return res.json({
      messsage: "Sent reset password verification link email.",
    });
  }

  async resetPassword(req, res, next) {
    const { password, confirmPassword, token } = req.body || {}

    if (password !== confirmPassword) {
      return next(createHttpError(400, "Password and confirm password does not match."));
    }


    const user = await this.tokenService.verifyToken(token);
    if (!user || !user.userId)
      return next(createHttpError(400, "Invalid token"));

    if ((user?.exp || 0) * 1000 <= Date.now())
      return next(createHttpError(400, "Sorry, your token has expired."));


    const existedUser = await this.authService.findUserById(user?.userId);
    if (!existedUser) return next(createHttpError(400, "User not existed"));

    const SALT = 10;
    const hashPassword = await bcrypt.hash(password, SALT);

    await this.authService.updateUserPassword(
      existedUser._id,
      hashPassword
    )

    this.logger.info({
      event: EVENTS.FORGOT_PASSWORD,
      data: { email: existedUser.email, userId: existedUser._id },
    });

    const jwtToken = await this.tokenService.signToken({
      userId: existedUser._id
    })

    return res.json({ message: { user: existedUser, authToken: jwtToken } });
  }
}
