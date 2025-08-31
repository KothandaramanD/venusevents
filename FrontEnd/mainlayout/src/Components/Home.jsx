// Components/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Body.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div id="home" className="home-section container-fluid d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-md-12 text-white d-flex flex-column align-items-center justify-content-center">
          <div className='w-50 text-center'>
            <h2>Venus Events</h2><br />
            <p>Looking for reliable experts to assist in crafting unforgettable moments for you and your loved ones? You've found your destination.</p>
            <button className="btn btn-outline-dark mb-3 text-white w-50" onClick={() => navigate('/learnmore')}>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
