import React, { useState, useEffect } from "react";
import axios from "axios";
import formatDate from "../Utils/helperFunction";

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

  let backgroundColor = "";
  let textColor = "white";
  switch (status) {
    case "Done":
      backgroundColor = "green";
      break;
    case "Missed":
      backgroundColor = "red";
      break;
    default:
      backgroundColor = "orange";
  }

  return (
    <div className="card" id="streak-card">
      <h3 style={{ marginBottom: "30px" }}>{formatDate(streak.date)}</h3>
      <p>
        <span
          style={{
            backgroundColor,
            color: textColor,
            padding: "10px 10px",
            borderRadius: "3px",
          }}
        >
          {status}
        </span>
      </p>
      {status !== "Done" && status !== "Missed" && isToday(streak.date) && (
        <button className="button" onClick={updateStatus}>
          Mark as Done
        </button>
      )}
    </div>
  );
};

export default StreakCard;
