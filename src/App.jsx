import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/pages/LoginForm'
import OTPVerification from './components/pages/OTPVerification';
import OTP from './components/pages/OTP'
import Register from './components/pages/RegisterForm'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/LoginForm' element={<LoginForm />} />
        <Route path="/OTPVerification" element={<OTPVerification />} />
        <Route path="/OTP" element={<OTP />} />
        <Route path='/RegisterForm' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
