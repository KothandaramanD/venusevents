import React from 'react';
import './Footer.css'; // Importing the stylesheet
import facebook from '../images/facebook.png';
import twitter from '../images/twitter.png';
import whatsapp from '../images/whatsapp.png';
import instagram from '../images/instagram.png';
import linkedin from '../images/linkedin.png';
import location from '../images/location.png';

const Footer = () => {
  return (
    <footer>
      <div className="container-fluid p-3 image-container1">
        <div className="row">
          {/* Follow Us */}
          <div className="col-12 col-md-4 mb-4">
            <h2 className='followus'>Follow Us</h2>
            <div className="caption11 image-wrapper1">
              <img src={facebook} alt="facebook" />
              <img src={twitter} alt="twitter" />
              <img src={whatsapp} alt="whatsapp" />
              <img src={instagram} alt="instagram" />
              <img src={linkedin} alt="linkedin" />
            </div>
          </div>

          {/* About Us */}
          <div className="col-12 col-md-4 mb-4">
            <div className="image-wrapper1">
              <h2 className='aboutus'>About Us</h2>
              <div className="caption12">Where creativity meets precision in the world of event management. With a passion for crafting memorable experiences, we specialize in turning your ideas into unforgettable moments.</div>
            </div>
          </div>

          {/* Find Us */}
          <div className="col-12 col-md-4 mb-4">
            <div className="image-wrapper1">
              <div className="image-wrapper11">
                <h2 className='f1'>Find Us</h2>
                <div className="caption12">
                  <div className="caption121">
                    <img src={location} alt="location" />
                  </div>
                  <div className="caption122">
                    No.9/74, Perumal Temple Street, Vedavakkam, Chengalpattu, +917373296431.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
