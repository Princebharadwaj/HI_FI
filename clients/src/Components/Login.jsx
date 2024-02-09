import React, { useState } from "react";
import axios from "axios";
import Chat from "./Chat";
import Contacts from "./Contacts";

export default function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const [clientName, setClientName] = useState("unknown");
  const sendData = (e) => {
    e.preventDefault();
    try {
      const user_name = e.target.uname.value;
      const user_password = e.target.password.value;
      const data = { user_name, user_password };
      axios.post("http://localhost:9001/login", data).then((response) => {
        if (response.data !== "Invalid input") {
          setClientName(response.data[0].user_name);
          setIsLogin(true);
        } else {
          window.alert("Invalid User_name or Password...");
        }
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {isLogin === true ? (
        <div style={{ display: "flex" }}>
          <Contacts />
          <Chat clientName={clientName} />
        </div>
      ) : (
        <div>
          <h1
            style={{
              margin: "20px",
              textAlign: "center",
              fontFamily: "monospace",
            }}
          >
            Log in
          </h1>
          <form
            onSubmit={(e) => sendData(e)}
            className="was-validated"
            style={{
              width: "50%",
              margin: "5% auto",
              border: "2px solid black",
              borderRadius: "12px",
              padding: "12px",
            }}
          >
            <div className="mb-3 mt-3">
              <label htmlFor="uname" className="form-label">
                Username:
              </label>
              <input
                type="text"
                className="form-control"
                id="uname"
                placeholder="Enter username"
                name="uname"
                required
              />
              <div className="valid-feedback">Valid.</div>
              <div className="invalid-feedback">
                Please fill out this field.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="pwd" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="pwd"
                placeholder="Enter password"
                name="password"
                required
              />
              <div className="valid-feedback">Valid.</div>
              <div className="invalid-feedback">
                Please fill out this field.
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
