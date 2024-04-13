import React from "react";
import AddHabit from "../components/AddHabit";
import HabitDetails from "../components/HabitDetails";

const AddShowHabits = () => {
  return (
    <div className="row">
      <div className="col-md-6 mx-auto">
        <AddHabit />
        <HabitDetails />
      </div>
    </div>
  );
};

export default AddShowHabits;
