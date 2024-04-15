// import React from "react";
// import AddHabit from "../components/AddHabit";
// import HabitDetails from "../components/HabitDetails";

// const AddShowHabits = () => {
//   return (
//     <div className="row">
//       <div className="col-md-6 mx-auto">
//         <AddHabit />
//         <HabitDetails />
//       </div>
//     </div>
//   );
// };

// export default AddShowHabits;

import React, { useState, useEffect, useRef } from "react";
import habitApiService from "../ApiService/HabitApiService";
import HabitCard from "../components/HabitCard";

const AddShowHabits = () => {
  const descriptionRef = useRef(null);
  const dateRef = useRef(null);
  const frequencyRef = useRef(null);

  const [habits, setHabits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    const newHabit = {
      name: descriptionRef.current.value,
      startDate: dateRef.current.value,
      frequency: frequencyRef.current.value,
    };
    console.log(newHabit);
    let res = await habitApiService.addHabit(newHabit);
    if (res.status) {
      setMessage("Added Successfully");
      descriptionRef.current.value = "";
      dateRef.current.value = "";
      frequencyRef.current.value = "";
      // Refresh habits after adding new habit
      getData();
    } else {
      setMessage("Error");
    }
  }

  async function getData() {
    let res = await habitApiService.allHabits();
    if (res.status) {
      setHabits(res.data);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter habits based on search term
  const filteredHabits = habits.filter((habit) =>
    habit.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="row">
      <div className="col-md-6 mx-auto">
        <div className="card">
          <div className="card-body">
            <h3 className="text-center my-2">Add Habit</h3>
            <p className="text-center">{message}</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-1">
                <label>Description</label>
                <input
                  ref={descriptionRef}
                  type="text"
                  className="form-control"
                  placeholder="Name of the Habit"
                  required
                />
              </div>
              <div className="mb-1">
                <label>Date</label>
                <input
                  ref={dateRef}
                  type="date"
                  className="form-control"
                  placeholder="Start Date"
                  required
                />
              </div>
              <div className="mb-1">
                <label>Frequency</label>
                <input
                  ref={frequencyRef}
                  type="number"
                  className="form-control"
                  required
                />
              </div>
              <div className="my-2">
                <input type="submit" className="btn btn-primary w-100" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-md-6 mx-auto">
        <input
          type="text"
          placeholder="Search habits"
          value={searchTerm}
          onChange={handleSearch}
        />
        {searchTerm === ""
          ? habits.map((habit) => <HabitCard key={habit._id} habit={habit} />)
          : filteredHabits.map((habit) => (
              <HabitCard key={habit._id} habit={habit} />
            ))}
      </div>
    </div>
  );
};

export default AddShowHabits;
