import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './OurServices.css'; 
import { useNavigate } from 'react-router-dom';

const Organizer = () => {
  const [organizers, setOrganizers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3); // default desktop
  const navigate = useNavigate();

  // Responsive visible count (mobile → 1, desktop → 3)
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth <= 768) {
        setVisibleCount(1);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  // Fetch organizer data
  const fetchOrganizers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/organizers/all');
      const data = await response.json();
      setOrganizers(data);
    } catch (error) {
      console.error('Error fetching organizer data:', error);
    }
  };

  useEffect(() => {
    // Fetch initially
    fetchOrganizers();

    // Auto refresh every 1 second
    const interval = setInterval(fetchOrganizers, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (organizers.length <= visibleCount) return 0;
        return prevIndex + 1 >= organizers.length - visibleCount + 1 ? 0 : prevIndex + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [organizers.length, visibleCount]);

  const nextSlide = () => {
    if (currentIndex < organizers.length - visibleCount) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleClick = (id) => {
    navigate(`/organizerdetail/${id}`);
  };

  return (
    <div className="our-services bg-dark text-white py-4">
      <h2 className="text-center mb-4 custom-font">Event Organizers</h2>

      {organizers.length === 0 ? (
        <div className="text-center text-light">No organizers found.</div>
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
                  transition: 'transform 0.5s ease-in-out',
                }}
              >
                {organizers.map((item) => (
                  <div
                    className="image-slide"
                    key={item._id}
                    style={{
                      flex: `0 0 calc(${100 / visibleCount}% - 20px)`,
                      margin: '0 10px',
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                    onClick={() => handleClick(item._id)}
                  >
                    <img
                      src={`http://localhost:8080/uploads/${item.organizerphoto}`}
                      alt={item.eventname}
                      className="img-fluid"
                      style={{ height: '280px', width: '100%', objectFit: 'cover', borderRadius: '8px' }}
                    />
                    <div className="caption mt-2 text-center text-white">
                      <strong>{item.organizer}</strong> | {item.eventname}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            {currentIndex < organizers.length - visibleCount && (
              <button className="btn btn-light" onClick={nextSlide}>❯</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Organizer;
