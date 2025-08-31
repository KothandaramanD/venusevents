import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./EventOrganizer.css";

const EventOrganizer = () => {
  const [organizer, setOrganizer] = useState("");
  const [eventname, setEventname] = useState("");
  const [organizerphoto, setOrganizerphoto] = useState(null);
  const [organizerdescription, setOrganizerdescription] = useState("");
  const [organizers, setOrganizers] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/organizers/all")
      .then((res) => res.json())
      .then((data) => setOrganizers(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("organizer", organizer);
    formData.append("eventname", eventname);
    formData.append("organizerdescription", organizerdescription);
    if (organizerphoto) formData.append("organizerphoto", organizerphoto);

    try {
      const url = editId
        ? `http://localhost:8080/api/organizers/update/${editId}`
        : "http://localhost:8080/api/organizers/add";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      const data = await res.json();

      if (editId) {
        setOrganizers((prev) =>
          prev.map((org) => (org._id === editId ? data : org))
        );
      } else {
        setOrganizers((prev) => [...prev, data]);
      }

      // Reset fields
      setOrganizer("");
      setEventname("");
      setOrganizerphoto(null);
      setOrganizerdescription("");
      setEditId(null);
      document.getElementById("photoInput").value = "";
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleEdit = (org) => {
    setOrganizer(org.organizer);
    setEventname(org.eventname);
    setOrganizerdescription(org.organizerdescription || "");
    setEditId(org._id);
    setOrganizerphoto(null);
    document.getElementById("photoInput").value = "";
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/organizers/delete/${id}`, {
        method: "DELETE",
      });
      setOrganizers(organizers.filter((org) => org._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center">Add Event Organizer</h3>
      <form onSubmit={handleSubmit} className="mb-4 mx-auto event-form">
        <div className="row mb-3 event-form1">
          <label className="col-md-3 col-form-label text-md-end">Organizer</label>
          <div className="col-md-9">
            <input
              type="text"
              className="form-control"
              value={organizer}
              onChange={(e) => setOrganizer(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-md-3 col-form-label text-md-end">Event Name</label>
          <div className="col-md-9">
            <input
              type="text"
              className="form-control"
              value={eventname}
              onChange={(e) => setEventname(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-md-3 col-form-label text-md-end">Photo</label>
          <div className="col-md-9">
            <input
              type="file"
              className="form-control"
              id="photoInput"
              onChange={(e) => setOrganizerphoto(e.target.files[0])}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-md-3 col-form-label text-md-end">Description</label>
          <div className="col-md-9">
            <textarea
              className="form-control"
              rows={3}
              value={organizerdescription}
              onChange={(e) => setOrganizerdescription(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="text-center">
          <Button type="submit" variant="danger">
            {editId ? "Update" : "Add"}
          </Button>
        </div>
      </form>

      <table className="table table-bordered text-center">
        <thead className="bg-primary text-white">
          <tr>
            <th>No</th>
            <th>Organizer</th>
            <th>Event Name</th>
            <th>Photo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {organizers.map((org, index) => (
            <tr key={org._id}>
              <td>{index + 1}</td>
              <td>{org.organizer}</td>
              <td>{org.eventname}</td>
              <td>
                {org.organizerphoto ? (
                  <img
                    src={`http://localhost:8080/uploads/${org.organizerphoto}`}
                    alt="Organizer"
                    width="50"
                    height="50"
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
                  onClick={() => handleEdit(org)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  className="m-1"
                  onClick={() => handleDelete(org._id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventOrganizer;
