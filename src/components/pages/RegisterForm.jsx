import { IoEyeSharp } from "react-icons/io5";
import LoginStyle from "./LoginForm.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Load from './Loading';

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
      const response = await fetch("https://hean.mchaexpress.com/web-app/appcon/api/register", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        // Registration successful, redirect to login page
        window.location.href = "/LoginForm"; // Change this to your actual login page route
      } else {
        // Registration failed, display error message
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Load />
      <div className={LoginStyle['login-body']}>
        <div className={LoginStyle["form-container"]}>
          <div className={LoginStyle["register-headers"]}>
            <div className={LoginStyle["register-pulse"]}></div>
          </div>

          <form onSubmit={handleFormSubmit} className={LoginStyle['reg-form']}>
            {errorMessage && (
              <div
                className="error"
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  padding: "5px",
                  borderRadius: "5px",
                  textAlign: "center"
                }}
              >
                {errorMessage}
              </div>
            )}
            <div className={LoginStyle["register-text"]}>
              <h1 className={LoginStyle["new-account-text"]}>
                New <br />
                Account
              </h1>
            </div>
            <div className={LoginStyle["name-header"]}>
              <h2>First Name</h2>
              <h2>Last Name</h2>
            </div>
            <div className={LoginStyle["name-form"]}>
              <input
                className={LoginStyle["fill"]}
                type="text"
                id="first_name"
                required=""
                placeholder="Juan"
                name="first_name"
              />
              <input
                className={LoginStyle["fill"]}
                type="text"
                id="last_name"
                required=""
                placeholder="Dela Cruz"
                name="last_name"
              />
            </div>

            <h2>Username</h2>
            <input
              className={LoginStyle["fill"]}
              type="text"
              id="email"
              required=""
              placeholder="hello@example.com"
              name="email"
            />
            <div className={LoginStyle["password-div"]}>
              <h2>Create Password</h2>
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
            <div className={LoginStyle["password-div"]}>
              <h2>Re-type Password</h2>
            </div>
            <div className={LoginStyle["password-input"]}>
              <input
                className={LoginStyle["fill"]}
                type={showPassword ? "text" : "password"}
                id="confirm_password"
                required=""
                placeholder="Confirm Password"
                name="confirm_password"
              />
              <IoEyeSharp
                className={LoginStyle["eye-icon"]}
                onClick={togglePasswordVisibility}
              />
            </div>
            <h2>Mobile No.</h2>
            <input
              className={LoginStyle["fill"]}
              type="tel"
              id="phone_number"
              required=""
              placeholder="Phone Number"
              name="phone_number"
            />
            <h2>Profile Picture</h2>
            <input
              className={LoginStyle["fill"]}
              type="file"
              id="profile_picture"
              required=""
              accept="image/*"
              name="profile_picture"
            />
            <div className={LoginStyle["checkbox"]}>
              <input type="checkbox" /> Keep me sign in
            </div>
            <button className={LoginStyle["button-submit"]} type="submit">
              Sign Up
            </button>
            <p>
              Already have an account? <Link to="/LoginForm">Sign in here</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
