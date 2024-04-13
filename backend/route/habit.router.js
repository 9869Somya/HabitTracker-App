const express = require("express");

const {
  addHabit,
  allHabits,
  getHabitById,
  updateHabit,
  deleteHabit,
  getStreakLogsById,
  getHabitStatusByDate,
  updateStreakStatus,
} = require("../controller/habit.controller");

const habitRouter = express.Router();
habitRouter.post("/", addHabit);
habitRouter.get("/", allHabits);
habitRouter.get("/:habitId", getHabitById);
habitRouter.put("/:habitId", updateHabit);
habitRouter.delete("/:habitId", deleteHabit);
habitRouter.get("/streakLogs/:habitId", getStreakLogsById);
habitRouter.get("/streakLogs/:habitId/:date", getHabitStatusByDate);
habitRouter.put("/streakLogs/:habitId/:date", updateStreakStatus);

module.exports = habitRouter;
