import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add userName"],
    },
    email: {
      type: String,
      required: [true, "Please add user email"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add user password"],
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("User", UserSchema);
