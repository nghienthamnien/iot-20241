import mongoose from "mongoose";

const { Schema } = mongoose;

const AverageSensorDataSchema = new Schema({
  avgLightValue: {
    type: Number,
    required: true,
  },
  avgTemperature: {
    type: Number,
    required: true,
  },
  avgHumidity: {
    type: Number,
    required: true,
  },
  avgEarthMoisture: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the current date and time
  },
});

// Export the model
export default mongoose.model("AverageSensorData", AverageSensorDataSchema);
