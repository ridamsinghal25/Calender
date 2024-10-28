import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  start: {
    type: Date,
    required: [true, "Start date is required"],
  },
  end: {
    type: Date,
    required: [true, "End date is required"],
  },
  description: {
    type: String,
    required: [false, "Description is required"],
  },
  allDay: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Event = mongoose.model("Event", eventSchema);
