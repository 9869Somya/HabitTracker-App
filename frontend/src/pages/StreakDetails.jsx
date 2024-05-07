import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import habitApiService from "../ApiService/HabitApiService";
import StreakCard from "../components/StreakCard";

const StreakDetails = () => {
  const { id } = useParams();
  const [streaks, setStreaks] = useState([]);
  const [habitName, setHabitName] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const token = localStorage.getItem("pptoken");

  async function getStreakData(id, token) {
    let res1 = await habitApiService.getStreakLogsById(id, token);
    if (res1.status) {
      setStreaks(res1.data.streakLogs);
    }
    let res2 = await habitApiService.getHabitById(id, token);
    if (res2.status) {
      // setStreaks(res2.data.streakLogs);
      setHabitName(res2.data.name);
    }
  }

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
              and you'll soon see the results you desire!
            </p>
          </div>
        )}
        <h1 className="text-center mt-5 mb-4" id="streak_header">
          Daily Habit Streaks of{" "}
          <span id="streak_header_habitName">{habitName}</span>
        </h1>
        <div className="row" id="streakCard">
          {streaks.map((streak) => (
            <div className="col-md-3 mb-4" key={streak._id}>
              <StreakCard streak={streak} habitId={id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StreakDetails;
