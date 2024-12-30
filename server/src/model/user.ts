import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  gmail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", UserSchema);
