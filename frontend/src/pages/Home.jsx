import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "react-bootstrap"; // Import Button component from react-bootstrap

const Home = () => {
  const authContext = useAuth();
  const { user, isLoggedIn } = authContext;
  return (
    <div className="homepage">
      <div className="background pt-3">
        <h1 className="text-center text-light mt-4">
          Build Better Habits, Build a Better Life
        </h1>
        <p className="text-center text-light">
          Harness the power of our personalized habit tracker app to streamline
          your everyday routines and achieve your goals.
        </p>
        <br />
        <div className="d-flex justify-content-center">
          {isLoggedIn && (
            <>
              {/* Replace Link with Button */}
              <Button variant="success">
                <Link
                  to={"/habits"}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Add Habit
                </Link>
              </Button>
            </>
          )}
        </div>
        <br />
        <h1 className="text-center text-light">
          Organize your chaos, execute your plan, and triumph over adversity.
        </h1>
        <p className="text-center text-light pb-4">
          Start your day right with a clear, organized schedule that keeps you
          on track for success. Here’s an example of how your day with our
          website could look:
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

        <h1 className="text-center text-light my-4">
          Stay Empowered by Your Progress
        </h1>
        <div className="d-flex justify-content-center mb-5">
          <div className="card me-3 mb-5" style={{ width: "18rem" }}>
            <img
              src="https://www.pngmart.com/files/21/Exercise-PNG-Isolated-Free-Download.png"
              className="card-img-top"
              alt="Exercise"
            />
            <div className="card-body">
              <h5 className="card-title">Exercise</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
          <div className="card mt-5 mx-5" style={{ width: "18rem" }}>
            <img
              src="https://www.pngmart.com/files/21/Exercise-PNG-Isolated-Free-Download.png"
              className="card-img-top"
              alt="Exercise"
            />
            <div className="card-body">
              <h5 className="card-title">Exercise</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
          <div className="card mb-5 ms-3" style={{ width: "18rem" }}>
            <img
              src="https://www.pngmart.com/files/21/Exercise-PNG-Isolated-Free-Download.png"
              className="card-img-top"
              alt="Exercise"
            />
            <div className="card-body">
              <h5 className="card-title">Exercise</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="my-5 text-light">
        <footer style={{ backgroundColor: "#153448" }}>
          <div className="container p-4">
            <div className="row">
              <div className="col-lg-5 col-md-12 mt-3">
                <h3 className="mb-3"> About Us</h3>
                <p>
                  Our habit tracker app is your key to unlocking daily success.
                  Stay motivated, build positive habits, and reach your goals
                  with ease. Join us on the path to personal growth and
                  achievement.
                </p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2  mt-3">
                <h3 className=" mb-4">Follow Us</h3>

                <a
                  className="btn btn-primary btn-floating m-1"
                  style={{ backgroundColor: "#3b5998" }}
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>

                <a
                  className="btn btn-primary btn-floating m-1"
                  style={{ backgroundColor: "#55acee" }}
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-twitter"></i>
                </a>

                <a
                  className="btn btn-primary btn-floating m-1"
                  style={{ backgroundColor: "#dd4b39" }}
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-google"></i>
                </a>

                <a
                  className="btn btn-primary btn-floating m-1"
                  style={{ backgroundColor: "#ac2bac" }}
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-instagram"></i>
                </a>

                <a
                  className="btn btn-primary btn-floating m-1"
                  style={{ backgroundColor: "#0082ca" }}
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>

                <a
                  className="btn btn-primary btn-floating m-1"
                  style={{ backgroundColor: "#333333" }}
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-github"></i>
                </a>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h3 className=" mb-4">Contact</h3>
                <p>
                  <i className="fas fa-home mr-3"></i> New York, NY 10012, US
                </p>
                <p>
                  <i className="fas fa-envelope mr-3"></i> habitinfo@gmail.com
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i> + 01 234 567 88
                </p>
              </div>
            </div>
          </div>
          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            <p>&copy; 2024 Your Website. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
