import React from 'react';
import cellimage1 from './Images/pic1.jpg';
import cellimage2 from './Images/pic2.jpg';
import cellimage3 from './Images/pic3.jpg';
import cellimage4 from './Images/pic4.jpg';
import './Aboutus.css'; // Import CSS only

const Aboutus = () => {
  return (
    <div className="container-fluid bg-white" id="aboutus">
      <div className="container p-3">
        <div className="row align-items-start">
          <div className="col text-center">
            <img src={cellimage1} className="aboutus-img rounded-circle p-2" alt="pic1" />
            <img src={cellimage3} className="aboutus-img rounded-circle p-2" alt="pic3" />
            <br/>
            <img src={cellimage2} className="aboutus-img rounded-circle p-2" alt="pic2" />
            <img src={cellimage4} className="aboutus-img rounded-circle p-2" alt="pic4" />
          </div>
          <div className="col">
            <h2 className="display-6 text-muted">About Us</h2>
            <p className="text-muted">
              Welcome to Venusevents, where creativity meets precision in the world of event management. With a passion for crafting memorable experiences, we specialize in turning your ideas into unforgettable moments. From corporate events and conferences to weddings, parties, and bespoke celebrations, we bring your vision to life with meticulous planning, innovative concepts, and flawless execution.
            </p>

            <ul className="custom-list text-muted">
              <li>
                We believe that every event tells a story, and we are committed to making yours extraordinary. With years of experience and a deep understanding of industry trends, we leverage our strong vendor partnerships, cutting-edge technology, and creative solutions to deliver events that leave a lasting impression.
              </li>
              <li>
                At Venusevents, we pride ourselves on our personal approach, treating every event as if it were our own. Your vision becomes our mission, and we work tirelessly to ensure that your event is not only successful but also remembered for all the right reasons.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
