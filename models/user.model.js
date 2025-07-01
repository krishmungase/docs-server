import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true
    },
    profileImg: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
