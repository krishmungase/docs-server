import createHttpError from "http-errors";
import { TokenService } from "../service/index.js";

const jwtToken = new TokenService();

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("No auth header found");
    return next(createHttpError(401, "Unauthorized user"));
  }

  try {
    const token = authHeader.split(" ")[1];
    const user = await jwtToken.verifyToken(token);

    req.userId = user.userId;

    next();
  } catch (error) {
    return next(createHttpError(401, "Unauthorized user"));
  }
};


export default authenticate;