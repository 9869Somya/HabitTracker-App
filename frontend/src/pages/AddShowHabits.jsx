import React, { useState, useEffect, useRef } from "react";
import habitApiService from "../ApiService/HabitApiService";
import HabitCard from "../components/HabitCard";

const AddShowHabits = () => {
  const descriptionRef = useRef(null);
  const dateRef = useRef(null);
  const frequencyRef = useRef(null);

  const [habits, setHabits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [habitsStreakCount, setHabitsStreakCount] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    const newHabit = {
      name: descriptionRef.current.value,
      startDate: dateRef.current.value,
      frequency: frequencyRef.current.value,
    };
    console.log(newHabit);
    let res = await habitApiService.addHabit(newHabit);
    if (res.status) {
      setMessage("Added Successfully");
      descriptionRef.current.value = "";
      dateRef.current.value = "";
      frequencyRef.current.value = "";
      getData();
    } else {
      setMessage("Error");
    }
  }

  async function getData() {
    let res = await habitApiService.allHabits();
    if (res.status) {
      setHabits(res.data);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const fetchHabitStreakCount = async () => {
      try {
        const streakCountPromises = habits.map(async (habit) => {
          const streakCount = await getStreakCount(habit._id);
          return { name: habit.name, streakCount };
        });
        const streakCounts = await Promise.all(streakCountPromises);
        setHabitsStreakCount(streakCounts);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchHabitStreakCount();
  }, [habits]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const getStreakCount = async (habitId) => {
    try {
      const response = await habitApiService.getStreakLogsById(habitId);
      if (response.status) {
        const streakLogs = response.data.streakLogs;
        const frequency = await habitApiService.getHabitFrequencyById(habitId);
        const habitFrequency = frequency.data.frequency;
        let streakCount = 0;
        let consecutiveDays = 0;

        const today = new Date().toISOString().slice(0, 10);
        for (let i = 0; i < streakLogs.length; i++) {
          if (streakLogs[i].date > today) {
            break;
          }
          const streakLogDate = streakLogs[i].date.slice(0, 10);

          if (streakLogDate === today) {
            console.log(today);

            if (streakLogs[i].status === "Done") {
              consecutiveDays++;
              streakCount++;
            } else {
              consecutiveDays = 0;
            }
          } else if (new Date(streakLogDate) < new Date(today)) {
            if (streakLogs[i].status === "Done") {
              streakCount++;
              consecutiveDays++;
            } else {
              consecutiveDays = 0;
              streakCount = 0;
            }
          }
          if (consecutiveDays === habitFrequency) {
            break;
          }
        }
        // return `${streakCount}/${habitFrequency}`;
        return `${streakCount}`;
      }
    } catch (error) {
      console.error("Error:", error);
      // return `0/0`;
      return `0`;
    }
  };

  const filterHabitsByMonth = (habits) => {
    if (!selectedMonth) {
      return habits;
    }
    const filteredHabits = habits.filter((habit) => {
      const habitDate = new Date(habit.startDate);
      const habitMonth = habitDate.getMonth() + 1;
      return habitMonth.toString() === selectedMonth;
    });
    return filteredHabits;
  };

  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(0, i).toLocaleString("en", { month: "long" });
    return { value: i + 1, label: month };
  });

  const deleteHabit = async (habitId) => {
    try {
      const response = await habitApiService.deleteHabit(habitId);
      if (response.status) {
        console.log("Habit deleted successfully");
        // Refresh data after deletion
        getData();
      } else {
        console.error("Failed to delete habit");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filteredHabits = filterHabitsByMonth(
    habits.filter((habit) =>
      habit.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container">
      <div className="col-md-6 mx-auto ">
        {/* Search*/}
        <div className="mr-2">
          <input
            type="text"
            placeholder="Search habits"
            value={searchTerm}
            onChange={handleSearch}
            className="form-control"
          />
        </div>
        {/* Filter*/}
        <div>
          <label className="mr-1">Month</label>
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="form-control"
          >
            <option value="">All Months</option>
            {monthOptions.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Habit Form */}
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card" id="habit_form">
            <div className="card-body">
              <h3 className="text-center my-2">Add Habit</h3>
              <p className="text-center">{message}</p>
              <form onSubmit={handleSubmit}>
                <div className="mb-1">
                  <label>Description</label>
                  <input
                    ref={descriptionRef}
                    type="text"
                    className="form-control"
                    placeholder="Name of the Habit"
                    required
                  />
                </div>
                <div className="mb-1">
                  <label>Date</label>
                  <input
                    ref={dateRef}
                    type="date"
                    className="form-control"
                    placeholder="Start Date"
                    required
                  />
                </div>
                <div className="mb-1">
                  <label>Frequency</label>
                  <input
                    ref={frequencyRef}
                    type="number"
                    className="form-control"
                    required
                  />
                </div>
                <div className="my-2">
                  <input type="submit" className="btn btn-primary w-100" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* All habits */}
      <div className="row">
        <div className="col-md mx-auto">
          {searchTerm === ""
            ? filteredHabits.map((habit) => (
                <HabitCard
                  key={habit._id}
                  habit={habit}
                  streakCount={
                    habitsStreakCount.find((item) => item.name === habit.name)
                      ?.streakCount
                  }
                  deleteHabit={deleteHabit}
                />
              ))
            : filteredHabits.map((habit) => (
                <HabitCard
                  key={habit._id}
                  habit={habit}
                  streakCount={
                    habitsStreakCount.find((item) => item.name === habit.name)
                      ?.streakCount
                  }
                  deleteHabit={deleteHabit}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default AddShowHabits;
