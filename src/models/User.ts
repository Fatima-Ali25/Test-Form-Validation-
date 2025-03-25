import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  phone: { type: String, required: true, minlength: 10 },
  message: { type: String, required: true },
  fileUrl: { type: String, required: true },
  isVarified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyTopkenExpiry: Date,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
