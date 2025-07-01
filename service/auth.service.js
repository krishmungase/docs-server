import { UserModel } from "../models/index.js"

class AuthService {
  constructor() {
    this.userModel = UserModel;
  }

  async findUserByEmail(email) {
    return this.userModel.findOne({ email });
  }

  async createUser(user) {
    return this.userModel.create(user)
  }

  async findUserById(userId) {
    return this.userModel.findById(userId);
  }

  async updateUserPassword(userId, hashPassword) {
    return this.userModel.findByIdAndUpdate(userId, { hashPassword }, { new: true })
  }
}

export default AuthService