import React from "react";
import { useState, useRef } from "react";
import habitApiService from "../ApiService/HabitApiService";

const AddHabit = () => {
  const descriptionRef = useRef(null);
  const dateRef = useRef(null);
  const frequencyRef = useRef(null);

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
    } else {
      setMessage("Error");
    }
  }
  return (
    <div className="row">
      <div className="col-md-6 mx-auto">
        <div className="card">
          <div className="card-body">
            <h3 className="text-center my-2">Add Habit</h3>
            <p className="text-center">{message}</p>
            <form action="" method="post" onSubmit={handleSubmit}>
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
    </div>
  );
};

export default AddHabit;
