import React from 'react';

const Home = () => {
  return (
    <div className='homePage'>
      <div className='background pt-3'>
        <h1 className='text-center text-light mt-4'>
          Build Better Habits, Build a Better Life
        </h1>
        <p className='text-center text-light'>
          Harness the power of our personalized habit tracker app to streamline
          your everyday routines and achieve your goals.
        </p>
        <br />
        <div className="d-flex justify-content-center">
          <button type="button" className='btn btn-success'>
            Add Habit
          </button>
        </div>
        <br />
        <h1 className="text-center text-light">
          Organize your chaos, execute your plan, and triumph over adversity.
        </h1>
        <p className="text-center text-light pb-4">
          Start your day right with a clear, organized schedule that keeps you on
          track for success. Here’s an example of how your day with our website
          could look:
        </p>
        <div className="d-flex justify-content-center py-3">
          <img
            src="https://assets-global.website-files.com/5d3aa39f8474c472841a7dfc/6480a0be71bc812f55132e88_Frame%20671.jpg"
            alt="Image 1"
            className="img-fluid me-4"
            style={{ width: "400px", opacity: 0.8 }}
          />
          <img
            src="https://assets-global.website-files.com/5d3aa39f8474c472841a7dfc/6480a277275ec417eb65c134_Frame%20678.jpg"
            alt="Image 2"
            className="img-fluid ms-4"
            style={{ width: "400px", opacity: 0.8 }}
          />
        </div>
      
      <h1 className='text-center text-light my-4'>
        Stay Empowered by Your Progress
      </h1>
      <div className='d-flex justify-content-center'>
        <div className="card mx-3 my-4" style={{ width: "18rem" }}>
          <img src="https://www.pngmart.com/files/21/Exercise-PNG-Isolated-Free-Download.png"
            className="card-img-top"
            alt="Exercise" />
        </div>
        <div className="card mx-3 my-4" style={{ width: "18rem" }}>
          <img src="https://www.pngmart.com/files/21/Exercise-PNG-Isolated-Free-Download.png"
            className="card-img-top"
            alt="Exercise" />
        </div>
        <div className="card mx-3 my-4" style={{ width: "18rem" }}>
          <img src="https://www.pngmart.com/files/21/Exercise-PNG-Isolated-Free-Download.png"
            className="card-img-top"
            alt="Exercise" />
        </div>
      </div>
      <div className='d-flex justify-content-center'>
        <div className="card mx-3 my-4" style={{ width: "18rem" }}>
          <img src="https://www.pngmart.com/files/21/Exercise-PNG-Isolated-Free-Download.png"
            className="card-img-top"
            alt="Exercise" />
        </div>
        <div className="card mx-3 my-4" style={{ width: "18rem" }}>
          <img src="https://www.pngmart.com/files/21/Exercise-PNG-Isolated-Free-Download.png"
            className="card-img-top"
            alt="Exercise" />
        </div>
        <div className="card mx-3 my-4" style={{ width: "18rem" }}>
          <img src="https://www.pngmart.com/files/21/Exercise-PNG-Isolated-Free-Download.png"
            className="card-img-top"
            alt="Exercise" />
        </div>
        </div>
      </div>
      <div>
        <footer className='text-center text-light' style={{ backgroundColor: '#153448', padding: '40px' }}>
          <h3>Contact Us</h3>
          <p>Email: contact@example.com</p>
          <p>Phone: +1234567890</p>
          <p>&copy; 2024 Your Website. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default Home;
