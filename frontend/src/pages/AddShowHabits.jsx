import React, { useState, useEffect, useRef } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
import habitApiService from "../ApiService/HabitApiService";
import HabitCard from "../components/HabitCard";
import { useAuth } from "../contexts/AuthContext";
import Chart from "chart.js/auto";

const AddShowHabits = () => {
  const authContext = useAuth();
  const { user, isLoggedIn } = authContext;
  const descriptionRef = useRef(null);
  const dateRef = useRef(null);
  const frequencyRef = useRef(null);

  const [habits, setHabits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [habitsStreakCount, setHabitsStreakCount] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [habitChartData, setHabitChartData] = useState(null);
  const [chartInstance, setChartInstance] = useState(null);
  const token = localStorage.getItem("pptoken");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    const frequencyValue = parseInt(frequencyRef.current.value);
    if (frequencyValue < 0) {
      alert("Frequency cannot be negative.");
      return;
    }
    const newHabit = {
      userId: user.id,
      name: descriptionRef.current.value,
      startDate: dateRef.current.value,
      frequency: frequencyRef.current.value,
    };
    console.log(newHabit);
    let res = await habitApiService.addHabit(newHabit, token);
    if (res.status) {
      setMessage("Added Successfully!!!");
      descriptionRef.current.value = "";
      dateRef.current.value = "";
      frequencyRef.current.value = "";
      getData(token);
    } else {
      setMessage("Error");
    }
  }

  async function getData(token) {
    let res = await habitApiService.allHabits(token);
    if (res.status) {
      const userHabits = res.data.filter((habit) => habit.userId === user.id);
      setHabits(userHabits);
    }
  }

  useEffect(() => {
    if (user) {
      getData(token);
    }
  }, [token, user]);

  useEffect(() => {
    const fetchHabitStreakCount = async (token) => {
      try {
        const streakCountPromises = habits.map(async (habit) => {
          const streakCount = await getStreakCount(habit._id, token);
          return { name: habit.name, streakCount };
        });
        const streakCounts = await Promise.all(streakCountPromises);
        setHabitsStreakCount(streakCounts);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchHabitStreakCount(token);
  }, [habits]);

  useEffect(() => {
    if (habitsStreakCount.length > 0) {
      const habitNames = habits.map((habit) => habit.name);
      const streakCounts = habitsStreakCount.map((habit) => habit.streakCount);
      const backgroundColors = Array.from(
        { length: habits.length },
        () =>
          `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
          )}, ${Math.floor(Math.random() * 256)}, 0.8)`
      );

      const chartData = {
        labels: habitNames,
        datasets: [
          {
            label: "Streak Count",
            data: streakCounts,
            backgroundColor: backgroundColors,
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      };

      setHabitChartData(chartData);
    }
  }, [habitsStreakCount]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const getStreakCount = async (habitId, token) => {
    try {
      const response = await habitApiService.getStreakLogsById(habitId, token);
      if (response.status) {
        const streakLogs = response.data.streakLogs;
        const frequency = await habitApiService.getHabitFrequencyById(
          habitId,
          token
        );
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

  const deleteHabit = async (habitId, token) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this habit?"
      );
      if (isConfirmed) {
        const response = await habitApiService.deleteHabit(habitId, token);
        if (response.status) {
          console.log("Habit deleted successfully");
          getData(token);
          window.location.reload();
        } else {
          console.error("Failed to delete habit");
        }
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

  useEffect(() => {
    let newChartInstance = null;

    if (habitChartData) {
      if (chartInstance) {
        console.log("Destroying previous chart instance");
        chartInstance.destroy();
      }
      const ctx = document.getElementById("habitChart");
      newChartInstance = new Chart(ctx, {
        type: "bar",
        data: habitChartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      console.log("Setting new chart instance");
      setChartInstance(newChartInstance);
    }

    return () => {
      if (newChartInstance) {
        console.log("Destroying new chart instance");
        newChartInstance.destroy();
      }
    };
  }, [habitChartData]);

  return (
    <div
      className="container"
      style={{ minHeight: "100vh", padding: "20px", color: "black" }}
    >
      {isLoggedIn && (
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              placeholder={`Search habits`}
              value={searchTerm}
              onChange={handleSearch}
              className="form-control"
              style={{
                background: "rgba(255, 255, 255, 0.8)",
                color: "black",
                border: "2px solid white",
                paddingLeft: "35px",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23000' width='24px' height='24px'%3E%3Cpath d='M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "10px center",
                backgroundSize: "20px",
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
      )}

      {habits.length === 0 && (
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
        </div>
      )}

      {habits.length > 0 && (
        <div className="row mt-4" id="chartDiv">
          <div className="col">
            <canvas id="habitChart" className="chart"></canvas>
          </div>
        </div>
      )}

      {habits.length > 0 && (
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
                        habitsStreakCount.find(
                          (item) => item.name === habit.name
                        )?.streakCount
                      }
                      deleteHabit={() => deleteHabit(habit._id, token)}
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
      )}
    </div>
  );
};

export default AddShowHabits;
