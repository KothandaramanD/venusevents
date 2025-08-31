import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './OurServices.css';
import { useNavigate } from 'react-router-dom';

const OurServices = () => {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3); // default web view
  const navigate = useNavigate();

  // Detect screen size for responsiveness
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth <= 768) {
        setVisibleCount(1); // Mobile → show single image
      } else {
        setVisibleCount(3); // Desktop/tablet → show 3 images
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  // Fetch events function
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/events/all');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching event data:', error);
    }
  };

  // Fetch initially + refresh every 1 second
  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (events.length <= visibleCount) return 0;
        return prevIndex + 1 >= events.length - visibleCount + 1 ? 0 : prevIndex + 1;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [events.length, visibleCount]);

  const nextSlide = () => {
    if (currentIndex < events.length - visibleCount) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleImageClick = (eventId) => {
    navigate(`/ourservicesdetail/${eventId}`);
  };

  return (
    <div className="our-services bg-dark text-white py-4">
      <h2 className="text-center mb-4 custom-font">Event Services</h2>

      {events.length === 0 ? (
        <div className="text-center text-light">No events found.</div>
      ) : (
        <div className="container-fluid position-relative">
          <div className="d-flex justify-content-between align-items-center">
            
            {/* Left Arrow */}
            {currentIndex > 0 && (
              <button className="btn btn-light" onClick={prevSlide}>❮</button>
            )}

            <div className="d-flex overflow-hidden flex-grow-1 mx-2">
              <div
                className="d-flex transition"
                style={{
                  transform: `translateX(-${(currentIndex * 100) / visibleCount}%)`,
                  transition: 'transform 0.5s ease-in-out'
                }}
              >
                {events.map((event) => (
                  <div
                    className="image-slide"
                    key={event._id}
                    style={{
                      flex: `0 0 calc(${100 / visibleCount}% - 20px)`,
                      margin: '0 10px',
                      position: 'relative',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleImageClick(event._id)}
                  >
                    <img
                      src={`http://localhost:8080/uploads/${event.eventphoto}`}
                      alt={event.eventname}
                      className="img-fluid"
                      style={{ height: '280px', width: '100%', objectFit: 'cover', borderRadius: '8px' }}
                    />
                    <div className="caption mt-2 text-center text-white">
                      {event.eventname}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            {currentIndex < events.length - visibleCount && (
              <button className="btn btn-light" onClick={nextSlide}>❯</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OurServices;
