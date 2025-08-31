// Components/Navigation.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navigation.css';

const Navigation = ({ scrollToSection }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        {/* Brand - left on desktop, center on mobile */}
        <a className="navbar-brand d-none d-lg-block customevent">venusevents.com</a>

        {/* Toggle + Center brand for mobile */}
        <div className="d-flex d-lg-none w-100 justify-content-between align-items-center">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand mx-auto">venusevents.com</a>
          <div></div> {/* Filler to balance layout */}
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-lg-auto text-start text-lg-center">
            <li className="nav-item">
              <span onClick={() => scrollToSection('home')} className="nav-link">Home</span>
            </li>
            <li className="nav-item">
              <span onClick={() => scrollToSection('aboutus')} className="nav-link">About Us</span>
            </li>
            <li className="nav-item">
              <span onClick={() => scrollToSection('ourservices')} className="nav-link">Our Services</span>
            </li>
            <li className="nav-item">
              <span onClick={() => scrollToSection('organizer')} className="nav-link">Organizer</span>
            </li>
            <li className="nav-item">
              <span onClick={() => scrollToSection('contactus')} className="nav-link">Contact Us</span>
            </li>
            <li className="nav-item">
              <span onClick={() => scrollToSection('faqs')} className="nav-link">FAQs</span>
            </li>
          </ul>
          <div className="d-flex flex-wrap justify-content-center justify-content-lg-end ms-lg-auto gap-2 px-3 px-lg-0 ml-4">
          <button onClick={() => navigate('/userlogin')} className="buttonm btn btn-outline-light">User</button>
          <button onClick={() => navigate('/adminlogin')} className="buttonm btn btn-outline-light">Admin</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
