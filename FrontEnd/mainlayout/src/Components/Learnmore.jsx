import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Learnmore.css'; // Only for minor custom styles if needed

import Birthday from './Images/Birthday.jpg';
import Bussiness from './Images/Bussiness.jpg';
import Poltics from './Images/Poltics.jpg';
import Surprise from './Images/Surprise.jpg';
import Wedding from './Images/Wedding.jpg';


const Learnmore = () => {
  return (
    <div className="learnmore-page">
      <header className="text-center bg-dark text-white py-5">
        <h1 className="display-4">Venus Events</h1>
        <p className="lead">Turning moments into memories with elegance and creativity.</p>
      </header>

      <div className="container my-5">
        <div className="row mb-4">
          <div className="col">
            <img
              src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce"
              alt="Event"
              className="img-fluid rounded"
            />
          </div>
        </div>

        <div className="row text-center mb-5">
          <div className="col-md-4">
            <div className="card h-100 shadow">
              <img
                src= {Bussiness}
                className="card-img-top"
                alt="Business Events"
              />
              <div className="card-body">
                <h5 className="card-title">Business Events</h5>
                <p className="card-text">
                  Professional planning and execution for conferences, product launches, and corporate meetings.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mt-4 mt-md-0">
            <div className="card h-100 shadow">
              <img
                src= {Poltics}
                className="card-img-top"
                alt="Political Events"
              />
              <div className="card-body">
                <h5 className="card-title">Political Events</h5>
                <p className="card-text">
                  Organizing secure, high-impact rallies, speeches, and campaigns with full media support.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mt-4 mt-md-0">
            <div className="card h-100 shadow">
              <img
                src={Surprise}
                className="card-img-top"
                alt="Surprise Parties"
              />
              <div className="card-body">
                <h5 className="card-title">Surprise Parties</h5>
                <p className="card-text">
                  Memorable and personalized surprise setups for your loved ones with complete secrecy!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row text-center">
          <div className="col-md-6 mb-4">
            <div className="card h-100 shadow">
              <img
                src={Birthday}
                className="card-img-top"
                alt="Birthday Parties"
              />
              <div className="card-body">
                <h5 className="card-title">Birthday Parties</h5>
                <p className="card-text">
                  Themed birthday celebrations with décor, games, and cakes tailored for all age groups.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card h-100 shadow">
              <img
                src={Wedding}
                className="card-img-top"
                alt="Wedding Celebrations"
              />
              <div className="card-body">
                <h5 className="card-title">Wedding Celebrations</h5>
                <p className="card-text">
                  From Mehendi to Reception, we manage every detail of your big day to make it unforgettable.
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer className="text-center py-4 mt-5 border-top">
          <p className="mb-0">&copy; 2025 Venus Events. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Learnmore;
