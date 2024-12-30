import mongoose from "mongoose";

const { Schema } = mongoose;

const HistorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the current timestamp if not provided
  },
});

// Export the model
export default mongoose.model("History", HistorySchema);
