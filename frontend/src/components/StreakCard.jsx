import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const StreakCard = ({ streak, habitId }) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchHabitStatus(habitId, streak);
  }, [habitId, streak]);

  async function fetchHabitStatus(habitId, streak) {
    try {
      const response = await axios.get(
        `http://localhost:5000/habit/streakLogs/${habitId}/${streak.date}`
      );
      // console.log(response);
      const data = response.data;
      console.log(data);
      if (response.status === 200 && data && data.streakLog) {
        const { status } = data.streakLog.status;
        setStatus(status);
      } else {
        // console.error("Failed to fetch habit status:", data.message);
      }
    } catch (error) {
      // console.error("Error:", error);
    }
  }
  async function updateStatus(habitId, streak) {
    try {
      const response = await axios.put(
        `http://localhost:5000/habit/streakLogs/${habitId}/${streak.date}`
      );
      const data = response.data;
      console.log(data);
      if (response.status === 200) {
        setStatus("Done");
        // fetchHabitStatus(habitId, streak);
      } else {
        alert(data.message); // Display error message if update fails
      }
    } catch (error) {
      // console.error("Error:", error);
      alert("Something went wrong. Please try again later.");
    }
  }
  //   return (
  //     <div className="card">
  //       <h3>Date: {streak.date}</h3>
  //       <p>Status: {streak.status}</p>
  //       {streak.status !== "Done" && streak.status !== "Missed" && (
  //         <button
  //           className="button"
  //           onClick={() => updateStatus(habitId, streak)}
  //         >
  //           Mark as Done
  //         </button>
  //       )}
  //     </div>
  //   );
  // };

  const isToday = (date) => {
    const today = new Date();
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
      <p>Status: {streak.status}</p>
      {streak.status !== "Done" &&
        streak.status !== "Missed" &&
        isToday(streak.date) && (
          <button
            className="button"
            onClick={() => updateStatus(habitId, streak)}
          >
            Mark as Done
          </button>
        )}
    </div>
  );
};

export default StreakCard;
