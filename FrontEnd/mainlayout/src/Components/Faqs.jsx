import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import cellimage from './Images/faq.jpeg';
import './Faqs.css'; // Importing the custom CSS for styling the ticks

const Faqs = () => {
  return (
    <div className="container-fluid bg-white" id="faqs">
      <div className="container p-3">
        <div className="row align-items-start">
          <div className="col">
            <h2 className="display-6 text-muted">FAQs</h2>
            
            <ul className="faq-list text-muted">
              <li>
                <strong>What types of events do you manage?</strong><br />
                We manage a variety of events, including weddings, corporate events, conferences, trade shows, private parties, and more.
              </li>
              <li>
                <strong>How far in advance should I book your services?</strong><br />
                We recommend booking at least 6-12 months in advance for larger events, but we can accommodate shorter timelines depending on availability.
              </li>
            </ul>
          </div>

          <div className="col text-center">
            <img src={cellimage} className="rounded-circle" width="230" height="186" alt="FAQ" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
