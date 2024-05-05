const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    frequency: {
      type: Number,
      required: true,
    },
    streakLogs: [
      {
        date: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          default: "Not done",
        },
      },
    ],
    compensatedDates: {
      type: [String],
      default: [],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Habit = mongoose.model("Habit", habitSchema);
module.exports = Habit;
