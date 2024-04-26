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
//

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import habitApiService from "../ApiService/HabitApiService";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";

// const StreakDetails = () => {
//   const { id } = useParams();
//   const [streaks, setStreaks] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   // const [consecutiveDoneCount, setConsecutiveDoneCount] = useState(0);

//   useEffect(() => {
//     const fetchStreakData = async () => {
//       try {
//         const res = await habitApiService.getStreakLogsById(id);
//         if (res.status) {
//           const streakLogs = res.data.streakLogs;
//           setStreaks(streakLogs);

//           let consecutiveCount = 0;
//           for (let i = 0; i < streakLogs.length; i++) {
//             if (streakLogs[i].status === "Done") {
//               consecutiveCount++;
//             } else {
//               break;
//             }
//           }
//           console.log(consecutiveCount);
//           // setConsecutiveDoneCount(consecutiveCount);

//           checkConsecutiveDoneFrequency(consecutiveCount);
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchStreakData();
//   }, [id]);

//   const checkConsecutiveDoneFrequency = async (consecutiveCount) => {
//     try {
//       if (consecutiveCount > 0) {
//         const res = await habitApiService.getHabitFrequencyById(id);
//         if (res.status) {
//           const frequency = res.data.frequency;
//           if (consecutiveCount === frequency) {
//             setShowModal(true);
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };
//   const handleClose = () => {
//     setShowModal(false);
//   };

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

//   const updateStatus = async (habitId, streakDate) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:5000/habit/streakLogs/${habitId}/${streakDate}`
//       );
//       const data = response.data;
//       if (response.status === 200) {
//         // Update status locally
//         const updatedStreaks = streaks.map((streak) => {
//           if (streak.date === streakDate) {
//             return { ...streak, status: "Done" };
//           }
//           return streak;
//         });
//         setStreaks(updatedStreaks);
//         const count = countConsecutiveDoneStreaks(updatedStreaks);
//         checkConsecutiveDoneFrequency(count);
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Something went wrong. Please try again later.");
//     }
//   };

//   return (
//     <>
//       <div className="d-flex flex-wrap">
//         {streaks.map((streak) => (
//           <div key={streak._id} className="card">
//             <h3>{streak.date}</h3>
//             <p>{streak.status}</p>
//             {streak.status !== "Done" &&
//               streak.status !== "Missed" &&
//               isToday(streak.date) && (
//                 <button
//                   className="button"
//                   onClick={() => updateStatus(id, streak.date)}
//                 >
//                   Mark as Done
//                 </button>
//               )}
//           </div>
//         ))}
//       </div>
//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Success!</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Yay! You successfully maintained the streak.</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default StreakDetails;
