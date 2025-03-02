import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  userName: { type: String, required: [true, "Хэрэглэгчийн нэрийг оруулах"] },
  email: {
    type: String,
    unique: true,
    required: [true, "Хэрэглэгчийн имейл оруулах"],
  },
  password: {
    type: String,
    minlength: [8, "Хэрэглэгчийн пасс хамгийн багадаа 8 тэмдэгт байна"],
    required: [true, "Хэрэглэгчийн түлхүүр үг оруулах"],
  },
  image: {
    type: String,
    default: null,
  },
  occupation: [
    {
      type: String,
      default: null,
    },
  ],
  about: {
    type: String,
    default: null,
  },
  skills: {
    type: String,
    default: null,
  },
  hobby: {
    type: String,
    default: null,
  },
  slogan: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "admin",
  },
  otp: {
    type: String,
    default: null,
  },
  passwordResetToken: { type: String, default: "" },
  passwordResetTokenExpire: { type: Date, default: undefined },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const User = models.User || model("User", userSchema);

export default User;
