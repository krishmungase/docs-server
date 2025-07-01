import jwt from "jsonwebtoken"
import Config from "../config/index.js"

class TokenService {
  constructor() { }

  async signToken(payload, exp = '30d') {
    return await jwt.sign(payload, Config.JWT_SECRET, {
      expiresIn: exp,
      algorithm: "HS256"
    })
  }

  async verifyToken(token) {
    return await jwt.verify(token, Config.JWT_SECRET)
  }
}

export default TokenService;
