import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import habitApiService from "../ApiService/HabitApiService";
import StreakCard from "../components/StreakCard";

const StreakDetails = () => {
  const { id } = useParams();
  const [streaks, setStreaks] = useState([]);
  const [showMessage, setShowMessage] = useState(true);

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
    <div className="container">
      <div className="mb-4">
        <button
          className="btn btn-sm btn-light"
          onClick={() => setShowMessage(!showMessage)}
        >
          {showMessage ? "Hide" : "Reminder"}
        </button>
      </div>
      {showMessage && (
        <div className="alert alert-info" role="alert">
          <p>
            <strong>Building a habit takes consistency.</strong> To truly solidify your habit,
            aim to maintain a streak of continuous completion that matches its
            frequency. Until you achieve this streak, consider your habit a
            work in progress. Stay committed, and you'll soon see the results
            you desire!
          </p>
        </div>
      )}
      <h1
        className="text-center mt-5 mb-4"
        style={{
          color: "#153448",
          fontFamily: "initial",
          fontSize: "60px",
        }}
      >
        Make today count with Daily Habits !!
      </h1>
      <div className="row">
        {streaks.map((streak) => (
          <div className="col-md-3 mb-4" key={streak._id}>
            <StreakCard streak={streak} habitId={id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreakDetails;
