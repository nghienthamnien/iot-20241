import mongoose from "mongoose";

const { Schema } = mongoose;

const DataEsp32Schema = new Schema({
  from: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
  lightValue: {
    type: Number,
    required: true,
  },
  earthMoisture: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the model
export default mongoose.model("DataEsp32", DataEsp32Schema);
