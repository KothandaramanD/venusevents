import React, { useState, useEffect } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./Events.css";

const Events = () => {
  const [eventName, setEventName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [events, setEvents] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/events/all")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      alert("Please upload a photo.");
      return;
    }

    const formData = new FormData();
    formData.append("eventname", eventName);
    formData.append("eventdescription", description);
    formData.append("eventphoto", photo); // Required field

    try {
      const url = editId
        ? `http://localhost:8080/api/events/update/${editId}`
        : "http://localhost:8080/api/events/add";
      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        if (editId) {
          setEvents((prev) =>
            prev.map((ev) => (ev._id === editId ? data : ev))
          );
        } else {
          setEvents((prev) => [...prev, data]);
        }

        // Reset form
        setEventName("");
        setDescription("");
        setPhoto(null);
        setEditId(null);
        document.getElementById("photoInput").value = "";
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleEdit = (event) => {
    setEventName(event.eventname);
    setDescription(event.eventdescription || "");
    setEditId(event._id);
    setPhoto(null);
    document.getElementById("photoInput").value = "";
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/events/delete/${id}`, {
        method: "DELETE",
      });
      setEvents(events.filter((ev) => ev._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Add Events</h2>
      <Form onSubmit={handleSubmit} className="mb-4 mx-auto event-form">
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2} className="d-flex align-items-center">
            <strong className="left1">Event Name</strong>
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2} className="d-flex align-items-center">
            <strong className="left1">Photo</strong>
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="file"
              onChange={handleFileChange}
              id="photoInput"
              required={!editId}
            />
          </Col>
        </Form.Group>

        {/* Description after photo */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2} className="d-flex align-items-center">
            <strong className="left1">Description</strong>
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Col>
        </Form.Group>

        <div className="text-center">
          <Button type="submit" variant="danger">
            {editId ? "Update" : "Add"}
          </Button>
        </div>
      </Form>

      <Table striped bordered hover>
        <thead className="bg-primary text-white">
          <tr>
            <th>No</th>
            <th>Event Name</th>
            <th>Photo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={event._id}>
              <td>{index + 1}</td>
              <td>{event.eventname}</td>
              <td>
                {event.eventphoto ? (
                  <img
                    src={`http://localhost:8080/uploads/${event.eventphoto}`}
                    alt={event.eventname}
                    width="60"
                    height="40"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="logoalign">
                <Button
                  variant="secondary"
                  className="me-2 m-1"
                  onClick={() => handleEdit(event)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(event._id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Events;
