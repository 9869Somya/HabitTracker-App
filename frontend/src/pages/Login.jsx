import React, { useEffect } from "react";
import userApiService from "../ApiService/UserApiService";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import usernameIcon from "../assets/person.png";
import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/password.png";

const Login = () => {
  const navigate = useNavigate();
  const authContext = useAuth();
  const { login } = authContext;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    const res = await userApiService.loginUser(user);
    if (res.status) {
      login(res.data.token);
      navigate("/habits");
      alert("LoggedIn succesfully");
    } else {
      alert(res.message);
    }
  };
  return (
    <div
      className="row"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="col-md-6 mx-auto">
        <div
          className="card"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: "white",
            borderRadius: "20px",
          }}
        >
          <div className="card-header text-center">
            <h3
              style={{
                color: "white",
                fontWeight: "bold",
                marginBottom: "15px",
                fontSize: "44px",
              }}
            >
              Login
            </h3>
          </div>
          <div className="card-body">
            <form action="" method="post" onSubmit={handleSubmit}>
              <div className="mb-1" style={{ position: "relative" }}>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    paddingLeft: "40px",
                    borderRadius: "20px",
                    marginBottom: "20px",
                    fontSize: "20px",
                  }}
                />
                <img
                  src={emailIcon}
                  alt="Email"
                  style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    left: "10px",
                    width: "20px",
                    height: "20px",
                  }}
                />
              </div>
              <div className="mb-1" style={{ position: "relative" }}>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    paddingLeft: "40px",
                    borderRadius: "20px",
                    marginBottom: "20px",
                    fontSize: "20px",
                  }}
                />
                <img
                  src={emailIcon}
                  alt="Email"
                  style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    left: "10px",
                    width: "20px",
                    height: "20px",
                  }}
                />
              </div>
              <p className="px-3" style={{ fontWeight: "bolder" }}>
                Don't you have an account?{" "}
                <Link to={"/register"} style={{ textDecoration: "none" }}>
                  Register Now
                </Link>
              </p>
              <div className="my-2 d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    background: "#153448",
                    color: "white",
                    border: "1px",
                    borderRadius: "4px",
                    padding: "8px 30px",
                    marginTop: "10px",
                  }}
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
