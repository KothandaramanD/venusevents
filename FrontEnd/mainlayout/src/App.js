// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import App1 from './App1';
import Dashboard from './Components/Dashboard';
import Adminboard from './Components/Adminboard';
import AdminLogin from './Components/Adminlogin';
import Userlogin from './Components/Userlogin';
import Userboard from './Components/Userboard';
import Learnmore from './Components/Learnmore';
import OurServicesDetailPage from './Components/OurServicesDetailPage';
import OrganizerDetailPage from './Components/OrganizerDetailPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard/:mobile" element={<Dashboard />} />
        <Route path="/adminboard" element={<Adminboard />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/userlogin" element={<Userlogin />} />
        <Route path="/userboard" element={<Userboard />} />
        <Route path="/learnmore" element={<Learnmore />} />
        <Route path="/ourservicesdetail/:id" element={<OurServicesDetailPage />} />
        <Route path="/organizerdetail/:id" element={<OrganizerDetailPage />} />
        <Route path="*" element={<App1 />} />
      </Routes>
    </Router>
  );
};

export default App;
