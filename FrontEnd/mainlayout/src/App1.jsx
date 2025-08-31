// App1.jsx
import React from 'react';
import Navigation from './Components/Navigation';
import Home from './Components/Home';
import Aboutus from './Components/Aboutus';
import Ourservices from './Components/Ourservices';
import Organizer from './Components/Organizer';
import Contactus from './Components/Contactus';
import Faqs from './Components/Faqs';
import Footer from './Components/Footer';

const App1 = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <Navigation scrollToSection={scrollToSection} />
      <div id="home"><Home /></div>
      <div id="aboutus"><Aboutus /></div>
      <div id="ourservices"><Ourservices /></div>
      <div id="organizer"><Organizer /></div>
      <div id="contactus"><Contactus /></div>
      <div id="faqs"><Faqs /></div>
      <Footer />
    </div>
  );
};

export default App1;
