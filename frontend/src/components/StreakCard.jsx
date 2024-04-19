import React, { useState, useEffect } from "react";
import axios from "axios";

const StreakCard = ({ streak, habitId }) => {
  const [status, setStatus] = useState(streak.status);

  async function updateStatus() {
    try {
      const response = await axios.put(
        `http://localhost:5000/habit/streakLogs/${habitId}/${streak.date}`
      );
      const data = response.data;
      if (response.status === 200) {
        setStatus("Done");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again later.");
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

  return (
    <div className="card">
      <h3>Date: {streak.date}</h3>
      <p>Status: {status}</p>
      {status !== "Done" && status !== "Missed" && isToday(streak.date) && (
        <button className="button" onClick={updateStatus}>
          Mark as Done
        </button>
      )}
    </div>
  );
};

export default StreakCard;
