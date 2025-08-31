import React, { useState, useEffect } from "react";
import { Table, Button, Form, Col } from "react-bootstrap";
import { FaTrash, FaEnvelope } from "react-icons/fa";
import "./AdminMessage.css";

const AdminMessage = () => {
  const [formData, setFormData] = useState({
    id: "",
    message: "",
  });

  const [eventList, setEventList] = useState([]);
  const [editCell, setEditCell] = useState({ rowId: null, field: "" });
  const [highlightedRow, setHighlightedRow] = useState(null);

  // Fetch data dynamically every 1 second
  useEffect(() => {
    const fetchEventList = () => {
      const storedUser = sessionStorage.getItem("loggedInUser"); // ✅ sessionStorage
      if (!storedUser) return;
      
      const user = JSON.parse(storedUser);
      const userMobile = user?.mobile;

      fetch("http://localhost:8080/api/eventservice/getservice")
        .then((res) => res.json())
        .then((data) => {
          const filteredData = data.filter(
            (item) => item.mobilenumber === userMobile
          );
          setEventList(filteredData);
        })
        .catch((err) => console.error("Fetch error:", err));
    };

    fetchEventList(); // initial fetch
    const interval = setInterval(fetchEventList, 1000); // refresh every 1 second
    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const handleCellClick = (rowId, field) => {
    if (field === "eventorganizer") return;
    setEditCell({ rowId, field });
  };

  const handleCellChange = (e, rowId, field) => {
    const updatedValue = field === "ac" ? e.target.value === "Yes" : e.target.value;

    const updatedList = eventList.map((item) =>
      item._id === rowId ? { ...item, [field]: updatedValue } : item
    );
    setEventList(updatedList);

    fetch(`http://localhost:8080/api/eventservice/updateservice/${rowId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: updatedValue }),
    });
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
        setFormData({ id: "", message: "" });
        setHighlightedRow(null);
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Error sending message.");
      });
  };

  return (
    <div className="container mt-4 event-request">
      <h2 className="text-center mb-4 text-danger">Admin Message</h2>

      <Form className="event-form mx-auto mb-4">
        <Form.Group className="mb-3 row align-items-center">
          <Form.Label className="col-sm-3 col-form-label">ID</Form.Label>
          <Col sm={9}>
            <Form.Control type="text" name="id" value={formData.id} readOnly />
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
          <Button
            variant="danger"
            type="button"
            className="m-3"
            onClick={handleReplySubmit}
          >
            Reply
          </Button>
        </div>
      </Form>

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

              {[
                "name",
                "mobilenumber",
                "email",
                "address",
                "eventname",
                "eventorganizer",
                "members",
                "budgetrange",
                "ac",
              ].map((field) => (
                <td
                  key={field}
                  onClick={() => handleCellClick(item._id, field)}
                  style={{
                    cursor: field === "eventorganizer" ? "default" : "pointer",
                  }}
                >
                  {editCell.rowId === item._id &&
                  editCell.field === field &&
                  field !== "eventorganizer" ? (
                    field === "ac" ? (
                      <Form.Select
                        value={item.ac ? "Yes" : "No"}
                        onChange={(e) => handleCellChange(e, item._id, field)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter")
                            setEditCell({ rowId: null, field: "" });
                        }}
                        autoFocus
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </Form.Select>
                    ) : (
                      <Form.Control
                        type={field === "members" ? "number" : "text"}
                        value={item[field]}
                        onChange={(e) => handleCellChange(e, item._id, field)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter")
                            setEditCell({ rowId: null, field: "" });
                        }}
                        autoFocus
                      />
                    )
                  ) : field === "ac" ? (
                    item.ac ? "Yes" : "No"
                  ) : (
                    item[field]
                  )}
                </td>
              ))}

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

export default AdminMessage;
