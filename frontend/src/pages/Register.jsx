import React from "react";
import { useState } from "react";
import userApiService from "../ApiService/UserApiService";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

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
      setMessage("Registeration Succesfull");
    } else {
      setMessage(res.message);
    }
    setError(!res.status);
  };
  return (
    <div className="row">
      <div className="col-md-6 mx-auto">
        <div className="card">
          <div className="card-header">
            <h3>Signup</h3>
            <p className={error ? "text-danger" : "text-success"}>{message}</p>
          </div>
          <div className="card-body">
            <form action="" method="post" onSubmit={handleSubmit}>
              <div className="mb-1">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-1">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-1">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="my-1">
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-primary w-100"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
