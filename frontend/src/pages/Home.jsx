import React from "react";

const habitCardStyle = {
  width: "300px",
  margin: "20px",
  padding: "20px",
  backgroundColor: "rgba(21, 52, 72, 0.9)",
  borderRadius: "10px",
  color: "white",
};

const imageContainerStyle = {
  width: "calc(50% - 20px)",
  margin: "10px",
};

const imageStyle = {
  width: "100px",
  height: "100px",
  borderRadius: "10px",
};

const headerStyle = {
  marginBottom: "20px",
  textAlign: "center",
  padding: "10px 0",
  borderRadius: "5px",
};
const footerStyle = {
  marginTop: "20px",
  textAlign: "center",
  borderTop: "1px solid #ccc",
  paddingTop: "20px",
  color: "black",
};

const addButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#2ecc71",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const habitsContainerStyle = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
};

function Home() {
  const handleAddHabit = () => {
    // Logic to add new habit
    console.log("Add habit button clicked");
  };

  return (
    <div className="homePage">
      <header style={headerStyle}>
        <br></br>
        <h1>
          <b>Build Better Habits, Build a Better Life</b>
        </h1>
        <p>
          Harness the power of our personalized habit tracker app to streamline
          your everyday routines and achieve your goals.
        </p>
        <br></br>
        <br></br>
        <button style={addButtonStyle} onClick={handleAddHabit}>
          Add Habit
        </button>
      </header>
      <h1>
        <b>
          Organize your chaos, execute your plan, and triumph over adversity.
        </b>
      </h1>
      <p>
        Start your day right with a clear, organized schedule that keeps you on
        track for success. Here’s an example of how your day with our website
        could look:
      </p>
      <div style={{ display: "flex" }}>
        <div style={imageContainerStyle}>
          <img
            src="https://assets-global.website-files.com/5d3aa39f8474c472841a7dfc/6480a0be71bc812f55132e88_Frame%20671.jpg"
            alt="Image 1"
            style={{ width: "400px", opacity: "0.8" }}
          />
        </div>
        <div style={imageContainerStyle}>
          <img
            src="https://assets-global.website-files.com/5d3aa39f8474c472841a7dfc/6480a277275ec417eb65c134_Frame%20678.jpg"
            alt="Image 2"
            style={{ width: "400px", opacity: "0.8" }}
          />
        </div>
      </div>
      <h1></h1>
      <h1></h1>
      <h1>
        <b>Stay Empowered by Your Progress</b>
      </h1>
      <div style={habitsContainerStyle}>
        <div style={habitCardStyle}>
          <h2>Exercise</h2>
          <p>The only bad workout is the one that didn’t happen.</p>
          <img
            src="https://www.pngmart.com/files/21/Exercise-PNG-Isolated-Free-Download.png"
            alt="Exercise"
            style={imageStyle}
          />
        </div>
        <div style={habitCardStyle}>
          <h2>Reading</h2>
          <p>A reader lives a thousand lives before he dies.</p>
          <img
            src="https://www.pngmart.com/files/21/Exercise-PNG-Isolated-Free-Download.png"
            alt="Reading"
            style={imageStyle}
          />
        </div>
        <div style={habitCardStyle}>
          <h2>Meditation</h2>
          <p>Quiet the mind, and the soul will speak.</p>
          <img
            src="https://www.pngmart.com/files/21/Exercise-PNG-Isolated-Free-Download.png"
            alt="Meditation"
            style={imageStyle}
          />
        </div>
        <div style={habitCardStyle}>
          <h2>Coding</h2>
          <p>Coding is today’s literacy.</p>
          <img
            src="https://www.pngmart.com/files/21/Exercise-PNG-Isolated-Free-Download.png"
            alt="Meditation"
            style={imageStyle}
          />
        </div>
        <div style={habitCardStyle}>
          <h2>Cooking</h2>
          <p>Cooking is love made visible.</p>
          <img
            src="https://www.pngmart.com/files/21/Exercise-PNG-Isolated-Free-Download.png"
            alt="Meditation"
            style={imageStyle}
          />
        </div>
        <div style={habitCardStyle}>
          <h2>Yoga</h2>
          <p>Yoga is the journey of the self, through the self, to the self.</p>
          <img
            src="https://www.pngmart.com/files/21/Exercise-PNG-Isolated-Free-Download.png"
            alt="Yoga"
            style={imageStyle}
          />
        </div>
      </div>
    </div>
  );
}
export default Home;
