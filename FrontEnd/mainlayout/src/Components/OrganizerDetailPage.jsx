import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './OrganizerDetailPage.css';

const OrganizerDetailPage = () => {
  const { id } = useParams();
  const [organizer, setOrganizer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganizer = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/organizers/${id}`);
        const data = await response.json();

        if (data && data._id) {
          setOrganizer(data);
        } else {
          console.error('Organizer not found or invalid data:', data);
        }
      } catch (error) {
        console.error('Error fetching organizer details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizer();
  }, [id]);

  if (loading) {
    return <div className="text-center text-light mt-5">Loading...</div>;
  }

  if (!organizer) {
    return <div className="text-center text-danger mt-5">Organizer not found</div>;
  }

  return (
    <div className="organizer-detail-container">
      <div className="organizer-detail-card">
        <img
          src={`http://localhost:8080/uploads/${organizer.organizerphoto}`}
          alt={organizer.organizer}
          className="organizer-detail-image"
        />
        <h2 className="organizer-detail-title">{organizer.organizer}</h2>
        <h5 className="organizer-eventname">Event: {organizer.eventname}</h5>
        <p className="organizer-detail-description">{organizer.organizerdescription}</p>
        <Link to="/" className="btn btn-outline-light mt-3">← Back to Organizers</Link>
      </div>
    </div>
  );
};

export default OrganizerDetailPage;
