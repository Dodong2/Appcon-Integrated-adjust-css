import logo from "../images/g39.png";
import { IoEyeSharp } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoginStyle from "./LoginForm.module.css";
import Load from './Loading';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when form is submitted

    try {
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      // Extract email and pin from the URL
      const searchParams = new URLSearchParams(window.location.search);
      const emailParam = searchParams.get('email');
      const pinParam = searchParams.get('pin');

      const formData = new FormData();
      formData.append('password', password);
      formData.append('confirm_password', confirmPassword);

      const response = await fetch(`https://hean.mchaexpress.com/web-app/appcon/api/reset-password?email=${emailParam}&pin=${pinParam}`, {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        // Password reset successful, handle accordingly (e.g., redirect to success page)
        alert(data.message);
        window.location.href = `./`;
      } else {
        // Error occurred, display error message in alert
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Reset loading state after request is complete
    }
  };

  return (
    <>
      <Load/>
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
          <form onSubmit={handleSubmit}>
            <div className={LoginStyle["password-div"]}>
              <h2>Password</h2>
            </div>
            <div className={LoginStyle["password-input"]}>
              <input
                className={LoginStyle["fill"]}
                type={showPassword ? "text" : "password"}
                id="password"
                required=""
                placeholder="Password"
              />
              <IoEyeSharp
                className={LoginStyle["eye-icon"]}
                onClick={togglePasswordVisibility}
              />
            </div>
            <div className={LoginStyle["password-div"]}>
              <h2>Confirm Password</h2>
            </div>
            <input
              className={LoginStyle["fill"]}
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              required=""
              placeholder="Confirm Password"
            />
            <button className={LoginStyle["button-submit"]} type="submit" disabled={isLoading}>
              {isLoading ? 'Resetting...' : 'Reset'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
