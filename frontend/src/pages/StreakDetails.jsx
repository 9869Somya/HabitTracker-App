import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import habitApiService from "../ApiService/HabitApiService";
import formatDate from "../Utils/helperFunction";
import { useAuth } from "../contexts/AuthContext";
import "./StreakDetails.css";

const StreakDetails = () => {
  const { id } = useParams();
  const [streaks, setStreaks] = useState([]);
  const [habitName, setHabitName] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const token = localStorage.getItem("pptoken");
  const authContext = useAuth();
  const { isLoggedIn } = authContext;

  async function getStreakData(id, token) {
    let res1 = await habitApiService.getStreakLogsById(id, token);
    if (res1.status) {
      setStreaks(res1.data.streakLogs);
    }
    let res2 = await habitApiService.getHabitById(id, token);
    if (res2.status) {
      setHabitName(res2.data.name);
    }
  }

  async function updateStatus(habitId, date) {
    let res = await habitApiService.updateStatus(habitId, date);
    if (res.status) {
      // Update the streaks after status update
      getStreakData(id, token);
    } else {
      alert("Cannot validate the status");
    }
  }

  const isToday = (date) => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const streakDate = new Date(date);
    return (
      streakDate.getDate() === today.getDate() &&
      streakDate.getMonth() === today.getMonth() &&
      streakDate.getFullYear() === today.getFullYear()
    );
  };

  useEffect(() => {
    getStreakData(id, token);
  }, [id, token]);

  // Calculate streak flags
  const calculateStreaks = () => {
    let streakFlags = [];
    let streakCount = 0;
    streaks.forEach((streak) => {
      if (streak.status === "Done") {
        streakCount++;
      } else {
        streakFlags.push(streakCount);
        streakCount = 0;
      }
    });
    streakFlags.push(streakCount);
    return streakFlags;
  };

  if (!streaks) return null;

  return (
    <div style={{ background: "rgba(0, 0, 0, 0.5)" }}>
      <div className="mb-4">
        <button
          className="btn btn-sm btn-light"
          onClick={() => setShowMessage(!showMessage)}
          style={{
            width: "15%",
            backgroundColor: "#088F8F",
            color: "white",
            padding: "10px",
          }}
        >
          {showMessage ? "Hide tip" : "Show tip"}
        </button>
      </div>
      <div className="container" id="streakDetail">
        {showMessage && (
          <div className="alert alert-info" role="alert">
            <p>
              <strong>Building a habit takes consistency.</strong> To truly
              solidify your habit, aim to maintain a streak of continuous
              completion that matches its frequency. Until you achieve this
              streak, consider your habit a work in progress. Stay committed,
              and you will soon see the results you desire!
            </p>
          </div>
        )}
        <h1 className="text-center mt-5 mb-4" id="streak_header">
          Daily Habit Streaks of{" "}
          <span id="streak_header_habitName">{habitName}</span>
        </h1>
        <div className="streak-box-container">
          {streaks.map((streak, index) => (
            <div
              key={index}
              className={`streak-box ${
                streak.status === "Done" ? "done" : "not-done"
              }`}
              onClick={() =>
                isLoggedIn &&
                isToday(streak.date) &&
                updateStatus(id, streak.date)
              }
            />
          ))}
        </div>
        <div className="row" id="streakCard">
          {streaks.map((streak, index) => (
            <div className="col-md-3 mb-4" key={streak._id}>
              <div className="card" id="streak-card">
                <h3 style={{ marginBottom: "30px" }}>
                  {formatDate(streak.date)}
                </h3>
                <p>
                  <span
                    style={{
                      backgroundColor:
                        streak.status === "Done"
                          ? "green"
                          : streak.status === "Missed"
                          ? "red"
                          : "orange",
                      color: "white",
                      padding: "10px 10px",
                      borderRadius: "3px",
                    }}
                  >
                    {streak.status}
                  </span>
                </p>
                {isLoggedIn &&
                  streak.status !== "Done" &&
                  streak.status !== "Missed" &&
                  isToday(streak.date) && (
                    <button
                      className="button"
                      onClick={() => updateStatus(id, streak.date)}
                    >
                      Mark as Done
                    </button>
                  )}
                <p>Streak: {calculateStreaks()[index]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StreakDetails;
