import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/pages/LoginForm'
import OTPVerification from './components/pages/OTPVerification';
import OTP from './components/pages/OTP'
import Register from './components/pages/RegisterForm'
import Home from './components/pages/Home'
import History from './components/pages/History'
import EditProfile from './components/pages/EditProfile';
import NotifAdmin from './components/pages/NotifAdmin';
import ServicesView from './components/pages/ServicesView';
import ResetPassword from './components/pages/ResetPassword';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      {<Route path='/NotifAdmin' element={<NotifAdmin/>}/>}
        <Route path='/' element={<LoginForm />} />
        <Route path='/LoginForm' element={<LoginForm />} />
        <Route path="/OTPVerification" element={<OTPVerification />} />
        <Route path="/OTP" element={<OTP />} />
        <Route path='/RegisterForm' element={<Register />} />
        <Route path='/Home' element={<Home/>} />
        <Route path='/History' element={<History/>}/>
        <Route path='/ServicesView' element={<ServicesView/>}/>
        <Route path='/EditProfile' element={<EditProfile/>}/>
        <Route path='/ResetPassword' element={<ResetPassword/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
