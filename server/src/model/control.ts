import mongoose from "mongoose";

const { Schema } = mongoose;

const DeviceControlSchema = new Schema({
  ledMode: {
    type: Number,
    required: true,
    enum: [0, 1], // Restrict values to 0 or 1
  },
  pumpMode: {
    type: Number,
    required: true,
    enum: [0, 1], // Restrict values to 0 or 1
  },
  ledAutoMode: {
    type: Number,
    required: true,
    enum: [0, 1], // Restrict values to 0 or 1
  },
  pumpAutoMode: {
    type: Number,
    required: true,
    enum: [0, 1], // Restrict values to 0 or 1
  },
});

// Export the model
export default mongoose.model("DeviceControl", DeviceControlSchema);
