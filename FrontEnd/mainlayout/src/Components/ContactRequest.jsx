import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { FaTrash, FaEnvelope } from "react-icons/fa";
import "./ContactRequest.css";

const ContactRequest = () => {
  const [contactData, setContactData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");

  // Fetch all contact items
  const fetchData = () => {
    fetch("http://localhost:8080/api/getallitems")
      .then((res) => res.json())
      .then((data) => {
        setContactData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  // Fetch data on mount and every 1 second
  useEffect(() => {
    fetchData(); // initial fetch
    const interval = setInterval(fetchData, 1000); // fetch every 1 second
    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  // Handle delete
  const handleDelete = async (_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/deleteitem/${_id}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setContactData((prev) => prev.filter((item) => item._id !== _id));
        if (selectedContact?._id === _id) {
          setSelectedContact(null);
          setReplyMessage("");
        }
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Handle email reply
  const handleReply = async (e) => {
    e.preventDefault();

    if (!selectedContact) {
      alert("Please select a contact to reply.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: selectedContact.email,
          subject: `Re: ${selectedContact.subject}`,
          message: replyMessage,
          from: "techpton@gmail.com",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Email sent successfully.");
        setReplyMessage("");
        setSelectedContact(null);
      } else {
        alert("Failed to send email: " + data.error);
      }
    } catch (err) {
      console.error("Email send error:", err);
      alert("Error sending email.");
    }
  };

  return (
    <div className="container mt-4 contact-request">
      <h2 className="text-center p-3">Contact Request</h2>

      <Form className="mb-4" onSubmit={handleReply}>
        <Form.Group className="mb-3 row">
          <Form.Label className="col-sm-2 col-form-label custom-label">
            Message
          </Form.Label>
          <div className="col-sm-10">
            <Form.Control
              as="textarea"
              rows={3}
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              disabled={!selectedContact}
              placeholder={
                selectedContact
                  ? `Replying to: ${selectedContact.email}`
                  : "Select a contact to reply"
              }
            />
          </div>
        </Form.Group>
        <div className="text-center">
          <Button
            variant="danger"
            type="submit"
            disabled={!selectedContact || !replyMessage}
          >
            Reply
          </Button>
        </div>
      </Form>

      <Table striped bordered hover responsive>
        <thead className="bg-primary text-white">
          <tr>
            <th>User Name</th>
            <th>Mobile No.</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center">
                Loading...
              </td>
            </tr>
          ) : contactData.length > 0 ? (
            contactData.map((item) => (
              <tr
                key={item._id}
                style={{
                  backgroundColor:
                    selectedContact?._id === item._id ? "#fff3cd" : "",
                }}
              >
                <td>{item.username}</td>
                <td>{item.mobilenumber}</td>
                <td>{item.email}</td>
                <td>{item.subject}</td>
                <td>{item.message}</td>
                <td>
                  <div className="action-buttons">
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      <FaTrash />
                    </Button>
                    <Button
                      variant="dark"
                      onClick={() => setSelectedContact(item)}
                    >
                      <FaEnvelope />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ContactRequest;
