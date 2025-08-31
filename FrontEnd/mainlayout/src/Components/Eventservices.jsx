import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./Eventservices.css";

const Eventservices = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobilenumber: "",
    email: "",
    address: "",
    eventname: "Choose events",
    eventorganizer: "",
    members: 0,
    budgetrange: "0 – 0",
    ac: "No",
    message: "",
  });

  const [eventOptions, setEventOptions] = useState(["Choose events"]);

  // Fetch event names every 1 second
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/events/all");
        const data = await res.json();
        // Extract only eventname field
        const names = data.map((e) => e.eventname);
        setEventOptions(["Choose events", ...names]);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };

    fetchEvents(); // initial fetch
    const interval = setInterval(fetchEvents, 1000); // fetch every 1 second
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const increaseMembers = () => {
    setFormData({ ...formData, members: formData.members + 1 });
  };

  const decreaseMembers = () => {
    if (formData.members > 0) {
      setFormData({ ...formData, members: formData.members - 1 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      ac: formData.ac === "Yes",
    };

    try {
      const res = await fetch("http://localhost:8080/api/eventservice/registerservice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Form submitted successfully!");
        handleClear();
      } else {
        alert(`Error: ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      alert("Failed to submit. Please try again.");
      console.error(error);
    }
  };

  const handleClear = () => {
    setFormData({
      name: "",
      mobilenumber: "",
      email: "",
      address: "",
      eventname: "Choose events",
      eventorganizer: "",
      members: 0,
      budgetrange: "0 – 0",
      ac: "No",
      message: "",
    });
  };

  return (
    <Container className="p-4 custom-container">
      <h2 className="text-center mb-4">Event Services</h2>
      <Form onSubmit={handleSubmit} className="event-form">
      <Form.Group as={Row} className="mb-3" controlId="name">
          <Form.Label column sm={3}>Name</Form.Label>
          <Col sm={9}>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="mobilenumber">
          <Form.Label column sm={3}>Mobile No</Form.Label>
          <Col sm={9}>
            <Form.Control type="text" name="mobilenumber" value={formData.mobilenumber} onChange={handleChange} required />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="email">
          <Form.Label column sm={3}>E-mail</Form.Label>
          <Col sm={9}>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="address">
          <Form.Label column sm={3}>Address</Form.Label>
          <Col sm={9}>
            <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} required />
          </Col>
        </Form.Group>


        <Form.Group as={Row} className="mb-3" controlId="eventname">
          <Form.Label column sm={3}>Event Name</Form.Label>
          <Col sm={9}>
            <Form.Select
              name="eventname"
              value={formData.eventname}
              onChange={handleChange}
              className="custom-select"
              required
            >
              {eventOptions.map((name, idx) => (
                <option key={idx} value={name}>{name}</option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Members, Budget, AC, Message fields remain unchanged */}

        <Form.Group as={Row} className="mb-3" controlId="members">
          <Form.Label column sm={3}>Members</Form.Label>
          <Col sm={9} className="d-flex align-items-center">
            <Form.Control type="text" value={formData.members} readOnly className="me-2 members-input"/>
            <Button variant="outline-primary" size="sm" className="me-2 space1" onClick={increaseMembers}>+</Button>
            <Button variant="outline-secondary" size="sm" onClick={decreaseMembers}>-</Button>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="budgetrange">
          <Form.Label column sm={3}>Budget range</Form.Label>
          <Col sm={9}>
            <Form.Control type="text" name="budgetrange" value={formData.budgetrange} onChange={handleChange} required />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="ac">
          <Form.Label column sm={3}>AC / NON AC</Form.Label>
          <Col sm={9}>
            <Form.Select name="ac" value={formData.ac} onChange={handleChange} className="custom-select" required>
              <option>Yes</option>
              <option>No</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4" controlId="message">
          <Form.Label column sm={3}>Message</Form.Label>
          <Col sm={9}>
            <Form.Control as="textarea" name="message" rows={3} value={formData.message} onChange={handleChange} required />
          </Col>
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit" className="me-3 space1">Send</Button>
          <Button variant="secondary" type="button" onClick={handleClear}>Clear</Button>
        </div>
      </Form>
    </Container>
  );
};

export default Eventservices;
