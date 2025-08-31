import React, { useState, useEffect } from "react";
import { Table, Button, Form, Col } from "react-bootstrap";
import { FaTrash, FaEnvelope } from "react-icons/fa";
import "./EventRequest.css";

const EventRequest = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    mobile: "",
    message: "",
  });

  const [eventList, setEventList] = useState([]);
  const [editCell, setEditCell] = useState({ rowId: null, field: "" });
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [organizers, setOrganizers] = useState([]);

  // Fetch event requests every 1 sec
  useEffect(() => {
    const fetchEventList = () => {
      fetch("http://localhost:8080/api/eventservice/getservice")
        .then((res) => res.json())
        .then((data) => setEventList(data))
        .catch((err) => console.error("Fetch error:", err));
    };

    fetchEventList();
    const interval = setInterval(fetchEventList, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch organizers once
  useEffect(() => {
    fetch("http://localhost:8080/api/organizers/all")
      .then((res) => res.json())
      .then((data) => setOrganizers(data))
      .catch((err) => console.error("Organizer fetch error:", err));
  }, []);

  const handleCellClick = (rowId, field) => {
    setEditCell({ rowId, field });
  };

  const handleCellChange = (e, rowId, field) => {
    let updatedValue;

    if (field === "ac") {
      updatedValue = e.target.value === "Yes";
    } else if (field === "eventorganizer") {
      updatedValue = e.target.value === "Not Assigned" ? "" : e.target.value;
    } else {
      updatedValue = e.target.value;
    }

    const updatedList = eventList.map((item) =>
      item._id === rowId ? { ...item, [field]: updatedValue } : item
    );
    setEventList(updatedList);

    // Update backend
    fetch(`http://localhost:8080/api/eventservice/updateservice/${rowId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: updatedValue }),
    }).catch((err) => console.error("Update error:", err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/eventservice/deleteservice/${id}`, {
      method: "DELETE",
    })
      .then(() => setEventList(eventList.filter((item) => item._id !== id)))
      .catch((err) => console.error("Delete error:", err));
  };

  const handleReply = (item) => {
    setFormData({
      id: item._id,
      name: item.name,
      mobile: item.mobilenumber,
      message: item.message || "",
    });
    setHighlightedRow(item._id);
  };

  const handleMessageChange = (e) => {
    setFormData((prev) => ({ ...prev, message: e.target.value }));
  };

  const handleReplySubmit = () => {
    if (!formData.id || !formData.message.trim()) {
      alert("Message cannot be empty.");
      return;
    }

    fetch(`http://localhost:8080/api/eventservice/updateservice/${formData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: formData.message }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to send message");
        return res.json();
      })
      .then(() => {
        alert("Message sent successfully!");
        setFormData({ id: "", name: "", mobile: "", message: "" });
        setHighlightedRow(null);
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Error sending message.");
      });
  };

  return (
    <div className="container mt-4 event-request">
      <h2 className="text-center mb-4">Event Requests</h2>

      {/* Reply Form */}
      <Form className="event-form mx-auto mb-4">
        <Form.Group className="mb-3 row align-items-center">
          <Form.Label className="col-sm-3 col-form-label">ID</Form.Label>
          <Col sm={9}>
            <Form.Control type="text" name="id" value={formData.id} readOnly />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3 row align-items-center">
          <Form.Label className="col-sm-3 col-form-label">Name</Form.Label>
          <Col sm={9}>
            <Form.Control type="text" name="name" value={formData.name} readOnly />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3 row align-items-center">
          <Form.Label className="col-sm-3 col-form-label">Mobile Number</Form.Label>
          <Col sm={9}>
            <Form.Control type="text" name="mobile" value={formData.mobile} readOnly />
          </Col>
        </Form.Group>

        <Form.Group className="mb-4 row">
          <Form.Label className="col-sm-3 col-form-label">Message</Form.Label>
          <Col sm={9}>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.message}
              onChange={handleMessageChange}
            />
          </Col>
        </Form.Group>

        <div className="text-center d-flex justify-content-center gap-4 p-1">
          <Button variant="danger" type="button" className="m-3" onClick={handleReplySubmit}>
            Reply
          </Button>
        </div>
      </Form>

      {/* Table */}
      <Table striped bordered hover responsive>
        <thead className="bg-primary text-white">
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Address</th>
            <th>Event Name</th>
            <th>Event Organizer</th>
            <th>Member</th>
            <th>Budget</th>
            <th>AC</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {eventList.map((item, index) => (
            <tr
              key={item._id}
              style={{
                backgroundColor: highlightedRow === item._id ? "#fff3cd" : "transparent",
              }}
            >
              <td>{index + 1}</td>

              {/* Normal fields */}
              {["name", "mobilenumber", "email", "address", "eventname"].map((field) => (
                <td key={field} onClick={() => handleCellClick(item._id, field)}>
                  {editCell.rowId === item._id && editCell.field === field ? (
                    <Form.Control
                      type="text"
                      value={item[field]}
                      onChange={(e) => handleCellChange(e, item._id, field)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") setEditCell({ rowId: null, field: "" });
                      }}
                      autoFocus
                    />
                  ) : (
                    item[field]
                  )}
                </td>
              ))}

              {/* Event Organizer column (Dropdown) */}
              <td onClick={() => handleCellClick(item._id, "eventorganizer")}>
                {editCell.rowId === item._id && editCell.field === "eventorganizer" ? (
                  <Form.Select
                    value={item.eventorganizer || "Not Assigned"}
                    onChange={(e) => handleCellChange(e, item._id, "eventorganizer")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setEditCell({ rowId: null, field: "" });
                    }}
                    autoFocus
                  >
                    <option value="Not Assigned">Not Assigned</option>
                    {organizers.map((org) => (
                      <option key={org._id} value={org.organizer}>
                        {org.organizer}
                      </option>
                    ))}
                  </Form.Select>
                ) : (
                  item.eventorganizer || "Not Assigned"
                )}
              </td>

              {/* Members */}
              <td onClick={() => handleCellClick(item._id, "members")}>
                {editCell.rowId === item._id && editCell.field === "members" ? (
                  <Form.Control
                    type="number"
                    value={item.members}
                    onChange={(e) => handleCellChange(e, item._id, "members")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setEditCell({ rowId: null, field: "" });
                    }}
                    autoFocus
                  />
                ) : (
                  item.members
                )}
              </td>

              {/* Budget */}
              <td onClick={() => handleCellClick(item._id, "budgetrange")}>
                {editCell.rowId === item._id && editCell.field === "budgetrange" ? (
                  <Form.Control
                    type="text"
                    value={item.budgetrange}
                    onChange={(e) => handleCellChange(e, item._id, "budgetrange")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setEditCell({ rowId: null, field: "" });
                    }}
                    autoFocus
                  />
                ) : (
                  item.budgetrange
                )}
              </td>

              {/* AC */}
              <td onClick={() => handleCellClick(item._id, "ac")}>
                {editCell.rowId === item._id && editCell.field === "ac" ? (
                  <Form.Select
                    value={item.ac ? "Yes" : "No"}
                    onChange={(e) => handleCellChange(e, item._id, "ac")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setEditCell({ rowId: null, field: "" });
                    }}
                    autoFocus
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Form.Select>
                ) : item.ac ? (
                  "Yes"
                ) : (
                  "No"
                )}
              </td>

              {/* Actions */}
              <td>
                <div className="action-buttons d-flex gap-2">
                  <Button variant="danger" onClick={() => handleDelete(item._id)}>
                    <FaTrash />
                  </Button>
                  <Button variant="dark" onClick={() => handleReply(item)}>
                    <FaEnvelope />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EventRequest;
