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
      setMessage("Added Successfully!!!");
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
        return `${streakCount}`;
      }
    } catch (error) {
      console.error("Error:", error);
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
    <div
      className="container"
      style={{ minHeight: "100vh", padding: "20px", color: "black" }}
    >
      <div className="row">
        <div className="col-md-6">
          <input
            type="text"
            placeholder="Search habits"
            value={searchTerm}
            onChange={handleSearch}
            className="form-control"
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              color: "black",
              border: "2px solid white",
            }}
          />
        </div>
        <div className="col-md-6 text-right">
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="form-control"
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              color: "black",
              border: "2px solid white",
            }}
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

      <div className="row mt-4">
        <div className="col-md-6">
          <div
            className="card"
            id="habit_form"
            style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)" }}
          >
            <div className="card-body">
              <h3 className="text-center my-2" style={{ color: "#153448" }}>
                Add Habit
              </h3>
              <p className="text-center" style={{ color: "#153448" }}>
                {message}
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Description</label>
                  <input
                    ref={descriptionRef}
                    type="text"
                    className="form-control"
                    placeholder="Name of the Habit"
                    required
                    style={{
                      background: "rgba(255, 255, 255, 0.8)",
                      color: "black",
                      border: "2px solid white",
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label>Date</label>
                  <input
                    ref={dateRef}
                    type="date"
                    className="form-control"
                    placeholder="Start Date"
                    required
                    style={{
                      background: "rgba(255, 255, 255, 0.8)",
                      color: "black",
                      border: "2px solid white",
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label>Frequency</label>
                  <input
                    ref={frequencyRef}
                    type="number"
                    className="form-control"
                    required
                    style={{
                      background: "rgba(255, 255, 255, 0.8)",
                      color: "black",
                      border: "2px solid white",
                    }}
                  />
                </div>
                <div className="my-2 d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      background: "#153448",
                      color: "white",
                      border: "1px",
                      borderRadius: "4px",
                      padding: "8px 30px",
                      marginTop: "10px",
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-6 mt-4">
          <div className="row">
            {filteredHabits
              .slice()
              .reverse()
              .map((habit) => (
                <div className="col-md-6 mb-3" key={habit._id}>
                  <HabitCard
                    habit={habit}
                    streakCount={
                      habitsStreakCount.find((item) => item.name === habit.name)
                        ?.streakCount
                    }
                    deleteHabit={deleteHabit}
                    textColor="black"
                    deleteColor="red"
                    updateColor="yellow"
                    viewColor="blue"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddShowHabits;
