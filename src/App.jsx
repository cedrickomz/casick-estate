import {BroswerRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';

export default function App() {
  return  <BroswerRouter >
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/sign-in" element={<SignIn />} /> 
    <Route path="/profile" element={<Profile />} />
    <Route path="/sign-up" element={<SignUp />} />

  </Routes> 
    </BroswerRouter>
  
}
