import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

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
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div
            className="text-light me-5"
            style={{ width: "40%", margin: "0 4%" }}
          >
            <h3>Sample Habits for a Healthier Lifestyle</h3>
            <p className="me-5 mt-3">
              Explore these simple habits to enrich your daily routine: from
              staying hydrated to taking short breaks for stretching, each small
              change can lead to a healthier you.
            </p>
          </div>
          <div
            id="carouselExampleIndicators"
            className="carousel slide mx-5 my-5"
            style={{ width: "50%", margin: "0 auto" }}
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="3"
                aria-label="Slide 4"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="4"
                aria-label="Slide 5"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://www.eatthis.com/wp-content/uploads/sites/4/2022/05/woman-jogging-bridge-e1652818996620.jpg?quality=82&strip=1"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://www.approachablemusic.com/images/longform-images/the-3-levels-of-guitar-proficiency.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://blog.smartabroad.in/wp-content/uploads/2022/08/studying-student-on-desk.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://i0.wp.com/nenow.in/wp-content/uploads/2022/06/Drinking-too-much-of-water.jpg?fit=1200%2C675&ssl=1"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://assets-varnish.triblive.com/2021/09/4249436_web1_web-weights.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <h1 className="text-center text-light">
          Organize your chaos, execute your plan, and triumph over adversity.
        </h1>
        <p className="text-center text-light pb-4">
          Start your day right with a clear, organized schedule that keeps you
          on track for success. Here’s an example of how your day with our
          website could look:
        </p>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div
            id="carouselExample"
            className="carousel slide"
            style={{ width: "40%", margin: "0 4%" }}
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://i.ibb.co/2jqqhsr/Screenshot-2024-05-11-010532.png"
                  className="d-block w-100"
                  alt="Jogging"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://i.ibb.co/M2zJ6YN/Screenshot-2024-05-11-010555.png"
                  className="d-block w-100"
                  alt="Coding"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://i.ibb.co/68N485V/Screenshot-2024-05-11-010617.png"
                  className="d-block w-100"
                  alt="Studying"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://i.ibb.co/Mn7zFkc/Screenshot-2024-05-11-010632.png"
                  className="d-block w-100"
                  alt="Studying"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://i.ibb.co/HgY2DzM/Screenshot-2024-05-11-010645.png"
                  className="d-block w-100"
                  alt="Studying"
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <div
            className="text-light me-5"
            style={{ width: "40%", margin: "0 4%" }}
          >
            <h3>Turn Goals into Habits, Habits into Reality!</h3>
            <p className="me-5">
              With our habit tracker, streamline your routines effortlessly and
              watch as small changes lead to big achievements. Start your
              journey towards a better you today.
            </p>
          </div>
        </div>
      </div>
      {/* Added container for the icons */}
      <div className="px-5 py-5" style={{ backgroundColor: "#ffec9e" }}>
        <h2 className="text-center pb-4" style={{ color: "#153448" }}>
          Our Members
        </h2>
        <div className="d-flex justify-content-between align-items-center ps-4 pe-4">
          {/* Icon container 1 */}
          <div className="icon-container square d-flex flex-column justify-content-center align-items-center px-5 py-4">
            {/* Icon */}
            <FontAwesomeIcon
              icon={faUser}
              size="3x"
              style={{ color: "#153448" }}
            />
            {/* Tile */}
            <div
              className="icon-title text-center mt-2"
              style={{ color: "#153448" }}
            >
              Somya Parida
            </div>
          </div>
          {/* Icon container 2 */}
          <div className="icon-container square d-flex flex-column justify-content-center align-items-center px-5 py-4">
            {/* Icon */}
            <FontAwesomeIcon
              icon={faUser}
              size="3x"
              style={{ color: "#153448" }}
            />
            {/* Tile */}
            <div
              className="icon-title text-center mt-2"
              style={{ color: "#153448" }}
            >
              Ananya Das
            </div>
          </div>
          {/* Icon container 3 */}
          <div className="icon-container square d-flex flex-column justify-content-center align-items-center px-5 py-4">
            {/* Icon */}
            <FontAwesomeIcon
              icon={faUser}
              size="3x"
              style={{ color: "#153448" }}
            />
            {/* Tile */}
            <div
              className="icon-title text-center mt-2"
              style={{ color: "#153448" }}
            >
              Sonal Patra
            </div>
          </div>
          {/* Icon container 4 */}
          <div className="icon-container square d-flex flex-column justify-content-center align-items-center px-4 py-4">
            {/* Icon */}
            <FontAwesomeIcon
              icon={faUser}
              size="3x"
              style={{ color: "#153448" }}
            />
            {/* Tile */}
            <div
              className="icon-title text-center mt-2"
              style={{ color: "#153448" }}
            >
              Abhipsa Acharya
            </div>
          </div>
        </div>
      </div>

      <div className=" text-light">
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
