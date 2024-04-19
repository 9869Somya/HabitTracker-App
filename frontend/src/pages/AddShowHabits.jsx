// import React, { useState, useEffect, useRef } from "react";
// import habitApiService from "../ApiService/HabitApiService";
// import HabitCard from "../components/HabitCard";

// const AddShowHabits = () => {
//   const descriptionRef = useRef(null);
//   const dateRef = useRef(null);
//   const frequencyRef = useRef(null);

//   const [habits, setHabits] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [message, setMessage] = useState("");
//   const [habitsStreakCount, setHabitsStreakCount] = useState([]);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setMessage("");
//     const newHabit = {
//       name: descriptionRef.current.value,
//       startDate: dateRef.current.value,
//       frequency: frequencyRef.current.value,
//     };
//     console.log(newHabit);
//     let res = await habitApiService.addHabit(newHabit);
//     if (res.status) {
//       setMessage("Added Successfully");
//       descriptionRef.current.value = "";
//       dateRef.current.value = "";
//       frequencyRef.current.value = "";
//       // Refresh habits after adding new habit
//       getData();
//     } else {
//       setMessage("Error");
//     }
//   }

//   async function getData() {
//     let res = await habitApiService.allHabits();
//     if (res.status) {
//       setHabits(res.data);
//     }
//   }

//   useEffect(() => {
//     getData();
//   }, []);

//   useEffect(() => {
//     const fetchHabitStreakCount = async () => {
//       try {
//         const streakCountPromises = habits.map(async (habit) => {
//           const streakCount = await getStreakCount(habit._id);
//           return { name: habit.name, streakCount };
//         });
//         const streakCounts = await Promise.all(streakCountPromises);
//         setHabitsStreakCount(streakCounts);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchHabitStreakCount();
//   }, [habits]); // Update streak count whenever habits change

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const getStreakCount = async (habitId) => {
//     try {
//       const response = await habitApiService.getStreakLogsById(habitId);
//       if (response.status) {
//         const streakLogs = response.data.streakLogs;
//         const doneStreaks = streakLogs.filter(
//           (streak) => streak.status === "Done"
//         );
//         return doneStreaks.length;
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       return 0;
//     }
//   };

//   // Filter habits based on search term
//   const filteredHabits = habits.filter((habit) =>
//     habit.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="row">
//       <div className="col-md-6 mx-auto">
//         <div className="card">
//           <div className="card-body">
//             <h3 className="text-center my-2">Add Habit</h3>
//             <p className="text-center">{message}</p>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-1">
//                 <label>Description</label>
//                 <input
//                   ref={descriptionRef}
//                   type="text"
//                   className="form-control"
//                   placeholder="Name of the Habit"
//                   required
//                 />
//               </div>
//               <div className="mb-1">
//                 <label>Date</label>
//                 <input
//                   ref={dateRef}
//                   type="date"
//                   className="form-control"
//                   placeholder="Start Date"
//                   required
//                 />
//               </div>
//               <div className="mb-1">
//                 <label>Frequency</label>
//                 <input
//                   ref={frequencyRef}
//                   type="number"
//                   className="form-control"
//                   required
//                 />
//               </div>
//               <div className="my-2">
//                 <input type="submit" className="btn btn-primary w-100" />
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       <div className="col-md-6 mx-auto">
//         <input
//           type="text"
//           placeholder="Search habits"
//           value={searchTerm}
//           onChange={handleSearch}
//         />
//         {searchTerm === ""
//           ? habits.map((habit) => <HabitCard key={habit._id} habit={habit} />)
//           : filteredHabits.map((habit) => (
//               <HabitCard key={habit._id} habit={habit} />
//             ))}
//         <div>
//           <h3>Habit Streak Counts</h3>
//           <ul>
//             {habitsStreakCount.map((habit, index) => (
//               <li key={index}>
//                 {habit.name}: {habit.streakCount}
//               </li>
//             ))}
//           </ul>
//         </div>
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
  const [habitsStreakCount, setHabitsStreakCount] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

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

  useEffect(() => {
    const fetchHabitStreakCount = async () => {
      try {
        const streakCountPromises = habits.map(async (habit) => {
          const streakCount = await getStreakCount(habit._id);
          return { name: habit.name, streakCount };
        });
        const streakCounts = await Promise.all(streakCountPromises);
        setHabitsStreakCount(streakCounts);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchHabitStreakCount();
  }, [habits]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const getStreakCount = async (habitId) => {
    try {
      const response = await habitApiService.getStreakLogsById(habitId);
      if (response.status) {
        const streakLogs = response.data.streakLogs;
        const doneStreaks = streakLogs.filter(
          (streak) => streak.status === "Done"
        );
        return doneStreaks.length;
      }
    } catch (error) {
      console.error("Error:", error);
      return 0;
    }
  };

  const filterHabitsByMonth = (habits) => {
    if (!selectedMonth) {
      return habits;
    }
    const filteredHabits = habits.filter((habit) => {
      const habitDate = new Date(habit.startDate);
      const habitMonth = habitDate.getMonth() + 1; // Month is zero-based
      return habitMonth.toString() === selectedMonth;
    });
    return filteredHabits;
  };

  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(0, i).toLocaleString("en", { month: "long" });
    return { value: i + 1, label: month };
  });

  const filteredHabits = filterHabitsByMonth(
    habits.filter((habit) =>
      habit.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
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
        <div>
          <input
            type="text"
            placeholder="Search habits"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="mb-1">
          <label>Month</label>
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="form-control"
          >
            <option value="">All Months</option>
            {monthOptions.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
        {searchTerm === ""
          ? filteredHabits.map((habit) => (
              <HabitCard key={habit._id} habit={habit} />
            ))
          : filteredHabits.map((habit) => (
              <HabitCard key={habit._id} habit={habit} />
            ))}
        <div>
          <h3>Habit Streak Counts</h3>
          <ul>
            {habitsStreakCount.map((habit, index) => (
              <li key={index}>
                {habit.name}: {habit.streakCount}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddShowHabits;
