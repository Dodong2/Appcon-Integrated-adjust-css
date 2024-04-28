import React, { useState, useRef } from 'react';
import { SlArrowLeft } from "react-icons/sl";
import { Link, useParams } from 'react-router-dom';
import LoginStyle from './LoginForm.module.css'

const LoginForm = () => {
  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const inputRefs = useRef([...Array(4)].map(() => React.createRef()));
  const searchParams = new URLSearchParams(window.location.search);
  const emailParam = searchParams.get('email');

  const handleChange = (index, value) => {
    if (/^[0-9]*$/.test(value)) {
      const newOtpDigits = [...otpDigits];
      newOtpDigits[index] = value;
      setOtpDigits(newOtpDigits);
      if (value !== '' && index < 3) {
        inputRefs.current[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace' && index > 0 && otpDigits[index] === '') {
      inputRefs.current[index - 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when form is submitted
    
    try {
      const pin = otpDigits.join('');
      const formData = new FormData();
      formData.append('pin', pin); // Append PIN to FormData
  
      // Extract email from the URL
      const searchParams = new URLSearchParams(window.location.search);
      const emailParam = searchParams.get('email');
  
      const response = await fetch(`https://hean.mchaexpress.com/web-app/appcon/api/validate-pin?email=${emailParam}`, {
        method: "POST",
        body: formData, // Send FormData instead of JSON body
      });
  
      const data = await response.json();
      if (data.success) {
        // PIN validation successful, redirect or handle accordingly
        alert(data.message);
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
        <div className={LoginStyle['otp-header']}>
          <Link to="/LoginForm" style={{textDecoration: 'none'}}><SlArrowLeft /></Link>
          <Link to="/OTPVerification" style={{textDecoration: 'none'}}><h1>Change email</h1></Link>
        </div>
        <div className={LoginStyle['otp-container']}>
          <div className={LoginStyle['otp-info']}>
            <h1>Enter authentication code</h1>
            <p>Enter the 4-digit code that we have sent via the email <br /> {emailParam}</p>
          </div>
          <form onSubmit={handleSubmit} className={LoginStyle['otp-input']}>
            {otpDigits.map((digit, index) => (
              <input
                key={index}
                className={LoginStyle['otp-num']}
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={inputRefs.current[index]}
              />
            ))}
            <div className={LoginStyle['otp-button']}>
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Continue'} {/* Change button text based on loading state */}
              </button>
              <p>Resend code</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
