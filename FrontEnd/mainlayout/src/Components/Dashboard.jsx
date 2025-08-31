import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Dashboard.css'; // Add your custom styling here
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const { mobile } = useParams(); // Get mobile number from URL params
  const [userDetails, setUserDetails] = useState(null);
  const [activeMenu, setActiveMenu] = useState('profile'); // Default active menu
  const [formData, setFormData] = useState({
    name: '',
    place: '',
    mobile: '',
    email: '',
    chooseevents: '',
    date: '',
    message: ''
  });

  useEffect(() => {
    // Fetch user details by mobile number
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/getitembyMobile/${mobile}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserDetails(data); // Set user details state
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [mobile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/eregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Request sent successfully');
        // Optionally clear the form or show a success message
      } else {
        console.error('Failed to send request');
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'profile':
        return (
          <div className="card shadow-sm">
            <div className="card-body">
              <h3>User Profile</h3>
              {userDetails ? (
                <div className="user-details">
                  <p><strong>Email:</strong> {userDetails.email}</p>
                  <p><strong>Mobile:</strong> {userDetails.mobile}</p>
                  <p><strong>Place:</strong> {userDetails.place}</p>
                  <p><strong>Date of Birth:</strong> {new Date(userDetails.dob).toLocaleDateString()}</p>
                </div>
              ) : (
                <p>Loading user details...</p>
              )}
            </div>
          </div>
        );
      case 'sendRequest':
        return (
          <div className="card shadow-sm" style={{ maxWidth: '70%', margin: 'auto' }}>
            <div className="card-body">
              <h3>Send Request</h3>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <label htmlFor="name" className="col-sm-3 col-form-label text-left">Name</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="place" className="col-sm-3 col-form-label text-left">Place</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="place"
                      name="place"
                      value={formData.place}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="mobile" className="col-sm-3 col-form-label text-left">Mobile</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="email" className="col-sm-3 col-form-label text-left">Email</label>
                  <div className="col-sm-9">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="chooseevents" className="col-sm-3 col-form-label text-left">Choose Event</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="chooseevents"
                      name="chooseevents"
                      value={formData.chooseevents}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="date" className="col-sm-3 col-form-label text-left">Date</label>
                  <div className="col-sm-9">
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="message" className="col-sm-3 col-form-label text-left">Message</label>
                  <div className="col-sm-9">
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Send</button>
              </form>
            </div>
          </div>
        );
      case 'receivedMessages':
        return (
          <div className="card shadow-sm">
            <div className="card-body">
              <h3>Received Messages</h3>
              <p>No messages yet.</p>
            </div>
          </div>
        );
      case 'eventDetails':
        return (
          <div className="card shadow-sm">
            <div className="card-body">
              <h3>Event Details</h3>
              <p>No events found.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!userDetails) {
    return <div>Loading...</div>; // Show loading while fetching data
  }

  return (
    <div className="container-fluid">
      <div className="jumbotron text-center bg-dark text-light">
        <h1 className="display-4">Welcome {userDetails.username}</h1>
        <p className="lead">Experience My Events</p>
        <a className="btn btn-primary btn-lg bg-danger" href="#features" role="button">Logout</a>
      </div>

      <div className="row">
        <div className="col-md-4 border-end">
          <div className="list-group">
            <button
              className={`list-group-item list-group-item-action d-flex align-items-left ${activeMenu === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveMenu('profile')}
            >
              My Profile
            </button>
            <button
              className={`list-group-item list-group-item-action d-flex align-items-left ${activeMenu === 'sendRequest' ? 'active' : ''}`}
              onClick={() => setActiveMenu('sendRequest')}
            >
              Send Request
            </button>
            <button
              className={`list-group-item list-group-item-action d-flex align-items-left ${activeMenu === 'receivedMessages' ? 'active' : ''}`}
              onClick={() => setActiveMenu('receivedMessages')}
            >
              Received Messages
            </button>
            <button
              className={`list-group-item list-group-item-action d-flex align-items-left ${activeMenu === 'eventDetails' ? 'active' : ''}`}
              onClick={() => setActiveMenu('eventDetails')}
            >
              Event Details
            </button>
          </div>
        </div>
        <div className="col-md-8">
          <div className="content-area">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
