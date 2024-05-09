import React, { useEffect } from "react";
import { useState } from "react";
import userApiService from "../ApiService/UserApiService";

import usernameIcon from "../assets/person.png";
import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/password.png";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
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
    const newUser = {
      name,
      email,
      password,
    };
    const res = await userApiService.addUser(newUser);
    console.log(res);
    if (res.status) {
      alert("Registeration Succesfull");
      navigate("/login");
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
              Register
            </h3>
          </div>
          <div className="card-body">
            <form action="" method="post" onSubmit={handleSubmit}>
              <div className="mb-1" style={{ position: "relative" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{
                    paddingLeft: "40px",
                    borderRadius: "20px",
                    marginBottom: "20px",
                    fontSize: "20px",
                  }}
                />
                <img
                  src={usernameIcon}
                  alt="Username"
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
                  src={passwordIcon}
                  alt="Password"
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
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
