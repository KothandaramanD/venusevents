import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './OurServicesDetailPage.css';

const OurServicesDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/events/${id}`);
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error('Failed to load event', error);
      }
    };
    fetchEvent();
  }, [id]);

  if (!event) {
    return <div className="text-center text-light mt-5">Loading...</div>;
  }

  return (
    <div className="event-detail-container">
      <div className="event-detail-card">
        <img
          src={`http://localhost:8080/uploads/${event.eventphoto}`}
          alt={event.eventname}
          className="event-detail-image"
        />
        <h2 className="event-detail-title">{event.eventname}</h2>
        <p className="event-detail-description">{event.eventdescription}</p>
        <Link to="/" className="btn btn-outline-light mt-3">← Back to Services</Link>
      </div>
    </div>
  );
};

export default OurServicesDetailPage;
