import React from "react";
import { Link } from "react-router-dom";

const HabitCard = ({ habit }) => {
  const { name, _id, frequency } = habit;
  return (
    <div className="habit-card">
      <div className="habit-info">
        <h3>
          {name} - {frequency}
        </h3>
      </div>
      <div className="habit-actions">
        <Link to="#">Update</Link>
        <Link to="#">Delete</Link>
        <Link to={`habit/streakLogs/${_id}`}>View</Link>
      </div>
    </div>
  );
};

export default HabitCard;
