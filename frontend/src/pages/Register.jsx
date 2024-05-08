import React , { useEffect }from "react";
import { useState } from "react";
import userApiService from "../ApiService/UserApiService";

import usernameIcon from "../assets/person.png";
import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/password.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

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
      setMessage("Registeration Succesfull");
    } else {
      setMessage(res.message);
    }
    setError(!res.status);
  };
  return (
    <div className="row" style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <div className="col-md-6 mx-auto">
        <div className="card" style={{ backgroundColor: "rgba(255, 255, 255, 0.2)", color: "white", borderRadius:"20px" }}>
          <div className="card-header text-center">
            <h3  style={{ color: "white", fontWeight: "bold", marginBottom: "15px", fontSize: "44px" }}>Register</h3>
            <p className={error ? "text-danger" : "text-success"}>{message}</p>
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
                  style={{ paddingLeft: "40px" , borderRadius: "20px", marginBottom: "20px", fontSize: "20px"  }}
                />
                 <img src={usernameIcon} alt="Username" style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", left: "10px", width: "20px", height: "20px" }} />
              </div>
              <div className="mb-1" style={{ position: "relative" }}>
              <input
                  type="email"
                  className="form-control"
                  placeholder="Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ paddingLeft: "40px" , borderRadius: "20px", marginBottom: "20px", fontSize: "20px"  }}
                />
                <img src={emailIcon} alt="Email" style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", left: "10px", width: "20px", height: "20px" }} />
              </div>
              <div className="mb-1" style={{ position: "relative" }}>
              <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ paddingLeft: "40px" , borderRadius: "20px", marginBottom: "20px", fontSize: "20px" }}
                  />
                <img src={passwordIcon} alt="Password" style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", left: "10px", width: "20px", height: "20px" }} />

               
              </div>
              <div className="my-1">
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-primary w-100"
                  style={{borderRadius: "20px", fontSize: "20px", transition: "box-shadow 0.3s"  }}
                  onMouseOver={(e) => e.target.style.boxShadow = "0px 0px 10px 0px rgba(0,0,0,0.75)"} 
                  onMouseOut={(e) => e.target.style.boxShadow = "none"} 
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
