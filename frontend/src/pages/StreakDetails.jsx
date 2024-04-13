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

  if (!streaks) return;

  return (
    <div className="d-flex flex-wrap">
      {streaks.map((streak) => (
        <StreakCard key={streak._id} streak={streak} habitId={id} />
      ))}
    </div>
  );
};

export default StreakDetails;
