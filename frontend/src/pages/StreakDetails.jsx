import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import habitApiService from "../ApiService/HabitApiService";
import StreakCard from "../components/StreakCard";

const StreakDetails = () => {
  const { id } = useParams();
  const [streaks, setStreaks] = useState([]);

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
      <h1
        className="text-center mt-5 mb-4"
        style={{ color: "153448", fontFamily: "initial", fontSize: "60px" }}
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
