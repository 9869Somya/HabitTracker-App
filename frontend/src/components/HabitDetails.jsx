// import React, { useState, useEffect } from "react";
// import habitApiService from "../ApiService/HabitApiService";
// import HabitCard from "./HabitCard";

// const HabitDetails = () => {
//   const [habits, setHabits] = useState([]);

//   async function getData() {
//     let res = await habitApiService.allHabits();
//     if (res.status) {
//       setHabits(res.data);
//     }
//   }
//   useEffect(() => {
//     getData();
//   }, []);
//   return (
//     <div>
//       {habits.map((habit) => (
//         <HabitCard key={habit._id} habit={habit} />
//       ))}
//     </div>
//   );
// };

// export default HabitDetails;

import React, { useState, useEffect } from "react";
import habitApiService from "../ApiService/HabitApiService";
import HabitCard from "./HabitCard";

const HabitDetails = () => {
  const [habits, setHabits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
    <div>
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
  );
};

export default HabitDetails;
