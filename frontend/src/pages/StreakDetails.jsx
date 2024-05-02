import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import habitApiService from "../ApiService/HabitApiService";
import StreakCard from "../components/StreakCard";

const StreakDetails = () => {
  const { id } = useParams();
  const [streaks, setStreaks] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  async function getStreakData(id) {
    let res = await habitApiService.getStreakLogsById(id);
    if (res.status) {
      setStreaks(res.data.streakLogs);
    }
  }

  useEffect(() => {
    getStreakData(id);
  }, [id]);

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
          Daily Habit Streaks !!
        </h1>
        <div className="row">
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
