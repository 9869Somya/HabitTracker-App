import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import habitApiService from "../ApiService/HabitApiService";
import formatDate from "../Utils/helperFunction";
import { useAuth } from "../contexts/AuthContext";

const StreakDetails = () => {
  const { id } = useParams();
  const [streaks, setStreaks] = useState([]);
  const [habitName, setHabitName] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const token = localStorage.getItem("pptoken");
  const authContext = useAuth();
  const { isLoggedIn } = authContext;

  async function getStreakData(id, token) {
    // const a = "21";
    // console.log(parseInt(a) / 10);
    let res1 = await habitApiService.getStreakLogsById(id, token);
    if (res1.status) {
      setStreaks(res1.data.streakLogs);

      const doneStreaks = res1.data.streakLogs.filter(
        (streak) => streak.status === "Done"
      );
      const res = await habitApiService.getHabitFrequencyById(id, token);
      console.log(res);

      const progress = (parseFloat(doneStreaks.length) / res.frequency) * 100;

      console.log(`progress:${progress}`);

      setOverallProgress(progress);
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
      const updatedStreaks = streaks.map((streak) => {
        if (streak.date === date) {
          return { ...streak, status: "Done" };
        }
        return streak;
      });
      setStreaks(updatedStreaks);
      // Calculate overall progress again after status update
      const doneStreaks = updatedStreaks.filter(
        (streak) => streak.status === "Done"
      );
      const frequency =
        updatedStreaks.length > 0 ? updatedStreaks[0].frequency : 0;
      const progress = (doneStreaks.length / frequency) * 100;
      setOverallProgress(progress);
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
          {showMessage ? "Hide up" : "Show tip"}
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
        <div className="row" id="streakCard">
          <div className="col-md-12 mb-4">
            <div className="progress-circle">
              <svg width="100" height="100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#088F8F"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#0A57C4"
                  strokeWidth="10"
                  strokeDasharray={`${overallProgress}, 100`}
                />
              </svg>
              <div className="progress-circle-percentage">
                {overallProgress}%
              </div>
            </div>
          </div>
          {streaks.map((streak) => (
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StreakDetails;
