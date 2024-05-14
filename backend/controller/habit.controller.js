const mongoose = require("mongoose");
const Habit = require("../model/habit.model");

async function addHabit(req, res) {
  try {
    const { name, startDate, frequency, userId } = req.body;
    const startDateObj = new Date(startDate);
    const standardizedStartDate = startDateObj.toISOString().split("T")[0];
    const habit = new Habit({
      name,
      startDate: standardizedStartDate,
      frequency,
      userId,
      streakLogs: [],
    });
    for (let i = 0; i < frequency; i++) {
      const date = new Date(startDateObj);
      date.setDate(startDateObj.getDate() + i);
      date.setUTCHours(0, 0, 0, 0);
      const standardizedDate = date.toISOString().split("T")[0];
      habit.streakLogs.push({
        date: standardizedDate,
        status: "Not done",
      });
    }
    await habit.save();
    res.status(201).json({ message: "Habit created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

function compensateMissedDate(habit) {
  const lastLogDate = new Date(
    habit.streakLogs[habit.streakLogs.length - 1].date
  );
  lastLogDate.setDate(lastLogDate.getDate() + 1);
  const standardizedDate = lastLogDate.toISOString().split("T")[0];
  habit.streakLogs.push({
    date: standardizedDate,
    status: "Not done",
  });
}

async function allHabits(req, res) {
  try {
    const userId = req.user.id;
    let habits = await Habit.find({ userId });

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    for (let i = 0; i < habits.length; i++) {
      const habit = habits[i];
      if (!habit.userId) {
        console.log(`Habit with ID ${habit._id} is missing userId`);
        continue;
      }
      for (let j = 0; j < habit.streakLogs.length; j++) {
        const logDate = new Date(habit.streakLogs[j].date);
        const logStatus = habit.streakLogs[j].status;
        if (logDate < today && logStatus === "Not done") {
          habit.streakLogs[j].status = "Missed";
          const missedDate = logDate.toISOString().split("T")[0];
          if (!habit.compensatedDates.includes(missedDate)) {
            compensateMissedDate(habit);
            habit.compensatedDates.push(missedDate);
          }
        }
      }

      habits[i] = habit;
      await habit.save();
    }
    res.status(200).json(habits);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

async function getHabitById(req, res) {
  try {
    let { habitId } = req.params;
    let habit = await Habit.find({ _id: habitId });
    if (habit.length > 0) {
      res.status(200).json(habit);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

async function updateHabit(req, res) {
  const { habitId } = req.params;
  const { frequency } = req.body;
  try {
    let habit = await Habit.findById(habitId);
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const additionalFrequency = frequency - habit.frequency;

    habit.frequency = frequency;

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const lastStreakLogDate =
      habit.streakLogs[habit.streakLogs.length - 1].date;
    const lastStreakLogDateTime = new Date(lastStreakLogDate).getTime();

    for (let i = 1; i <= additionalFrequency; i++) {
      const nextStreakLogDate = new Date(
        lastStreakLogDateTime + i * 24 * 60 * 60 * 1000
      );
      const standardizedDate = nextStreakLogDate.toISOString().split("T")[0];
      habit.streakLogs.push({ date: standardizedDate, status: "Not done" });
    }

    await habit.save();

    res
      .status(200)
      .json({ message: "Habit frequency updated successfully", habit });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

async function deleteHabit(req, res) {
  try {
    let { habitId } = req.params;
    let habit = await Habit.findByIdAndDelete({ _id: habitId });
    res.status(200).json(habit);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

async function getStreakLogsById(req, res) {
  const { habitId } = req.params;

  try {
    const habit = await Habit.findById(habitId);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }
    const updatedStreakLogs = calculateStreakLogs(
      habit.streakLogs,
      habit.startDate,
      habit.frequency
    );
    habit.streakLogs = updatedStreakLogs;
    await habit.save();

    res.status(200).json({ streakLogs: updatedStreakLogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

function calculateStreakLogs(streakLogs, startDate, frequency) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const startDateObj = new Date(startDate);
  startDateObj.setUTCHours(0, 0, 0, 0);

  let missedCount = 0;
  let doneCount = 0;

  for (let i = 0; i < streakLogs.length; i++) {
    const logDate = new Date(streakLogs[i].date);
    logDate.setUTCHours(0, 0, 0, 0);

    if (logDate < today) {
      if (streakLogs[i].status === "Missed") {
        missedCount++;
        doneCount = 0;
      } else if (streakLogs[i].status === "Done") {
        doneCount++;
        missedCount = 0;
      }

      if (doneCount >= frequency) {
        break;
      }

      if (missedCount > 0) {
        const daysToAdd = frequency - doneCount;
        for (let j = 1; j <= daysToAdd; j++) {
          const date = new Date(startDateObj);
          date.setDate(startDateObj.getDate() + i + j);

          const standardizedDate = date.toISOString().split("T")[0];
          const existingDateIndex = streakLogs.findIndex(
            (log) => log.date === standardizedDate
          );
          if (existingDateIndex === -1) {
            streakLogs.push({ date: standardizedDate, status: "Not done" }); // Add extra day for the missed day
          }
        }
      }
    }
  }

  return streakLogs;
}

async function getHabitStatusByDate(req, res) {
  const { habitId, date } = req.params;

  try {
    const habit = await Habit.findById(habitId);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const streakLog = habit.streakLogs.find((log) => log.date === date);

    if (!streakLog) {
      return res.status(404).json({ message: "Streak log entry not found" });
    }

    res.status(200).json({ streakLog });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
async function getFrequencyById(req, res) {
  try {
    const { habitId } = req.params;
    const habit = await Habit.findById(habitId);
    if (habit) {
      res.status(200).json({ frequency: habit.frequency });
    } else {
      res.status(404).json({ message: "Habit not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//triggered only when the user clicked on the checkbox to update the status
async function updateStreakStatus(req, res) {
  const { habitId, date } = req.params;
  console.log(req);
  try {
    const habit = await Habit.findById(habitId);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const streakLog = habit.streakLogs.find((log) => log.date === date);

    if (!streakLog) {
      return res.status(404).json({ message: "Streak log entry not found" });
    }

    streakLog.status = "Done";

    await habit.save();

    res
      .status(200)
      .json({ message: "Streak log entry updated successfully", streakLog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
module.exports = {
  addHabit,
  allHabits,
  getHabitById,
  updateHabit,
  deleteHabit,
  getStreakLogsById,
  getHabitStatusByDate,
  getFrequencyById,
  updateStreakStatus,
};
