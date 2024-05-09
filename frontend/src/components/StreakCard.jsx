// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import formatDate from "../Utils/helperFunction";
// import habitApiService from "../ApiService/HabitApiService";
// import { useAuth } from "../contexts/AuthContext";

// const StreakCard = ({ streak, habitId }) => {
//   const [status, setStatus] = useState(streak.status);
//   const authContext = useAuth();
//   const { isLoggedIn } = authContext;

//   async function updateStatus(habitId, date) {
//     let res = await habitApiService.updateStatus(habitId, date);
//     if (res.status) {
//       setStatus("Done");
//     } else {
//       alert("Cannot validate the status");
//     }
//   }

//   const isToday = (date) => {
//     const today = new Date();
//     today.setUTCHours(0, 0, 0, 0);
//     const streakDate = new Date(date);
//     return (
//       streakDate.getDate() === today.getDate() &&
//       streakDate.getMonth() === today.getMonth() &&
//       streakDate.getFullYear() === today.getFullYear()
//     );
//   };

//   let backgroundColor = "";
//   let textColor = "white";
//   switch (status) {
//     case "Done":
//       backgroundColor = "green";
//       break;
//     case "Missed":
//       backgroundColor = "red";
//       break;
//     default:
//       backgroundColor = "orange";
//   }

//   return (
//     <>
//       {isLoggedIn && (
//         <div className="card" id="streak-card">
//           <h3 style={{ marginBottom: "30px" }}>{formatDate(streak.date)}</h3>
//           <p>
//             <span
//               style={{
//                 backgroundColor,
//                 color: textColor,
//                 padding: "10px 10px",
//                 borderRadius: "3px",
//               }}
//             >
//               {status}
//             </span>
//           </p>
//           {status !== "Done" && status !== "Missed" && isToday(streak.date) && (
//             <button
//               className="button"
//               onClick={() => updateStatus(habitId, streak.date)}
//             >
//               Mark as Done
//             </button>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default StreakCard;

import React from "react";

const StreakCard = ({ streak, habitId }) => {
  const { frequency, done } = streak;

  // Calculate progress percentage
  const progress = done ? (100 / frequency) * 1 : 0;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Streak</h5>
        <p className="card-text">Frequency: {frequency}</p>
        <p className="card-text">Status: {done ? "Done" : "Not Done"}</p>
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
              strokeDasharray={`${progress}, 100`}
            />
          </svg>
          <div className="progress-circle-percentage">
            {Math.round(progress)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakCard;
