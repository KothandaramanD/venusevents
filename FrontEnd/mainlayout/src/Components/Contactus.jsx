import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Contactus.css';

function Contactus() {
  const [username, setusername] = useState('');
  const [mobilenumber, setmobilenumber] = useState('');
  const [email, setemail] = useState('');
  const [subject, setsubject] = useState('');
  const [message, setmessage] = useState('');
  const [showAlert1, setShowAlert1] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [submittedUsername, setSubmittedUsername] = useState('');
  const [submittedMobilenumber, setSubmittedMobilenumber] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [submittedSubject, setSubmittedSubject] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { username, mobilenumber, email, subject, message };

    try {
      const response = await fetch('http://localhost:8080/api/createitem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setAlertMessage('Item created successfully!');
        setSubmittedUsername(username);
        setSubmittedMobilenumber(mobilenumber);
        setSubmittedEmail(email);
        setSubmittedSubject(subject);
        setSubmittedMessage(message);
        setShowAlert1(true);

        // Reset form
        setusername('');
        setmobilenumber('');
        setemail('');
        setsubject('');
        setmessage('');
      } else {
        setAlertMessage(`Failed to create item. Status: ${response.status} - ${response.statusText}`);
        setShowAlert1(true);
      }
    } catch (error) {
      setAlertMessage('There was an error creating the item!');
      setShowAlert1(true);
    }
  };

  return (
    <div className="contact container-fluid py-5" id="contactus">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Text Section */}
          <div className="col-lg-6 col-md-12 mb-4 d-flex align-items-center justify-content-start">
            <div className="text-section">
              <h3 className="text-white display-6 section-heading">Contact You Close With Me...</h3>
              <ul className="contact-info1 text-white mt-3">
                <li>
                  By filling out the form, your message goes directly to our team, who will ensure that your inquiry is addressed as quickly as possible.
                </li>
                <li>
                  Please provide as much detail as possible in your message to help us understand your request better.
                </li>
              </ul>
            </div>
          </div>

          {/* Right Form Section */}
          <div className="col-lg-6 col-md-12 d-flex justify-content-center">
            <div className="contact-form1">
              <form onSubmit={handleSubmit}>
                <h2 className="text-white mb-4 text-center">Contact Me</h2>

                <div className="form-group1 mb-3">
                  <label htmlFor="username" className="form-label1 text-white">User Name</label>
                  <input
                    type="text"
                    className="form-control1"
                    id="username"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group1 mb-3">
                  <label htmlFor="mobilenumber" className="form-label1 text-white">Mobile No.</label>
                  <input
                    type="tel"
                    className="form-control1"
                    id="mobilenumber"
                    value={mobilenumber}
                    onChange={(e) => setmobilenumber(e.target.value)}
                    pattern="\d{10}"
                    title="Please enter a valid 10-digit mobile number"
                    required
                  />
                </div>

                <div className="form-group1 mb-3">
                  <label htmlFor="email" className="form-label1 text-white">Email</label>
                  <input
                    type="email"
                    className="form-control1"
                    id="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group1 mb-3">
                  <label htmlFor="subject" className="form-label1 text-white">Subject</label>
                  <input
                    type="text"
                    className="form-control1"
                    id="subject"
                    value={subject}
                    onChange={(e) => setsubject(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group1 mb-4">
                  <label htmlFor="message" className="form-label1 text-white">Message</label>
                  <textarea
                    className="form-control2"
                    id="message"
                    rows="4"
                    value={message}
                    onChange={(e) => setmessage(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn1 btn-primary w-100">Send</button>
              </form>

              {/* Modal */}
              {showAlert1 && (
                <div className="custom-modal-overlay">
                  <div className="custom-modal">
                    <button className="custom-close-button" onClick={() => setShowAlert1(false)}>×</button>
                    <div className="custom-modal-body">
                      <div className="custom-success-icon">&#10004;</div>
                      <h5 className="custom-modal-title">{alertMessage}</h5>
                      <p>User Name: {submittedUsername}</p>
                      <p>Mobile No: {submittedMobilenumber}</p>
                      <p>Email: {submittedEmail}</p>
                      <p>Subject: {submittedSubject}</p>
                      <p>Message: {submittedMessage}</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contactus;
