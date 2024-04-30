import { useState } from 'react';
import { FaHashtag } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import LoginStyle from './LoginForm.module.css';

const OTPVerification = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when form is submitted
    
    try {
      const formData = new FormData();
      formData.append('email', email);

      const response = await fetch("https://hean.mchaexpress.com/web-app/appcon/api/forgot-password", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        // OTP sent successfully, redirect to OTP page
        alert(data.message);
        window.location.href = `/OTP?email=${email}`; // Change this to your actual OTP page route
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
    <div className={LoginStyle['login-body']}>
      <div className={LoginStyle['form-container']}>
        <div className={LoginStyle['header-container']}>
          <div className={LoginStyle['otp-pulse']}></div>
        </div>
        <div className={LoginStyle['otp-container']}>
          <div className={LoginStyle['otp-info']}>
            <h1>OTP Verification</h1>
            <p>Please enter your email</p>
          </div>
          <form onSubmit={handleFormSubmit} className={LoginStyle['otp-input']}>
            <input
              className={LoginStyle['mobile-tel']}
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              required
            />
            <div className={LoginStyle['otp-button']}>
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Continue'} 
              </button>
              <Link to="/LoginForm" style={{ textDecoration: 'none' }}>
                <p>Back</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
