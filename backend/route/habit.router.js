const express = require("express");

const {
  addHabit,
  allHabits,
  getHabitById,
  updateHabit,
  deleteHabit,
  getStreakLogsById,
  getHabitStatusByDate,
  getFrequencyById,
  updateStreakStatus,
} = require("../controller/habit.controller");
const authenticateUser = require("../middleware/auth.middleware");

const habitRouter = express.Router();
habitRouter.post("/", authenticateUser, addHabit);
habitRouter.get("/", authenticateUser, allHabits);
habitRouter.get("/:habitId", authenticateUser, getHabitById);
habitRouter.put("/:habitId", authenticateUser, updateHabit);
habitRouter.delete("/:habitId", authenticateUser, deleteHabit);
habitRouter.get("/streakLogs/:habitId", authenticateUser, getStreakLogsById);
habitRouter.get(
  "/streakLogs/:habitId/:date",
  authenticateUser,
  getHabitStatusByDate
);
habitRouter.get("/frequency/:habitId", authenticateUser, getFrequencyById);
// habitRouter.put(
//   "/streakLogs/:habitId/:date",
//   authenticateUser,
//   updateStreakStatus
// );
habitRouter.put("/streakLogs/:habitId/:date", updateStreakStatus);

module.exports = habitRouter;
