import React, { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import LoginStyle from "./LoginForm.module.css";
import Load from './Loading';
import logo from "../images/g39.png"; // Assuming this is the correct path to your logo image

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch("https://hean.mchaexpress.com/web-app/appcon/api/login", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        // Login successful, log user data and redirect to home page
        console.log("User Data:", data.user_data);
        localStorage.setItem("userData", JSON.stringify(data.user_data));
        window.location.href = "/Home"; // Change this to your actual home page route
      } else {
        // Login failed, display error message
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Load />
      <div className={LoginStyle["login-body"]}>
        <div className={LoginStyle["form-container"]}>
          <div className={LoginStyle["header-container"]}>
            <img src={logo} className={LoginStyle["logos"]} alt="Logo" />
            <div className={LoginStyle["pulse"]}></div>

            <div className={LoginStyle["text-form"]}>
              <h1>HEAN</h1>
              <p>Health Electronic Alert Network</p>
            </div>
          </div>
          <form onSubmit={handleFormSubmit}>
            {errorMessage && (
              <div
                className="error"
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  padding: "5px",
                  borderRadius: "5px",
                  textAlign: "center",
                  marginBottom: "12px"
                }}
              >
                {errorMessage}
              </div>
            )}
            <h2>Username</h2>
            <input
              className={LoginStyle["fill"]}
              type="email"
              id="email"
              required=""
              placeholder="hello@example.com"
              name="email_or_phone"
            />
            <div className={LoginStyle["password-div"]}>
              <h2>Password</h2>
              <Link to="/OTPVerification">Forgot Password</Link>
            </div>
            <div className={LoginStyle["password-input"]}>
              <input
                className={LoginStyle["fill"]}
                type={showPassword ? "text" : "password"}
                id="password"
                required=""
                placeholder="Password"
                name="password"
              />
              <IoEyeSharp
                className={LoginStyle["eye-icon"]}
                onClick={togglePasswordVisibility}
              />
            </div>
            <div className={LoginStyle["checkbox"]}>
              <input type="checkbox" />
              Keep me sign in
            </div>
            <button className={LoginStyle["button-submit"]} type="submit">Login</button>
            <p>
              Don't have an account? <Link to="/RegisterForm">Sign Up Here</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
