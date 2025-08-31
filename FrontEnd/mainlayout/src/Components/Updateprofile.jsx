import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaTrashAlt, FaEdit, FaSave } from 'react-icons/fa';

const UpdateProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const storedUser = sessionStorage.getItem("loggedInUser"); // ✅ sessionStorage
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setEditData(userData);
    }
  }, []);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/updateusers/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData)
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
        sessionStorage.setItem("loggedInUser", JSON.stringify(updatedUser)); // ✅ sessionStorage
        setIsEditing(false);
        alert("Profile updated successfully.");
      } else {
        alert("Update failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      const res = await fetch(`http://localhost:8080/api/deleteusers/${user._id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        sessionStorage.removeItem("loggedInUser"); // ✅ sessionStorage
        alert("Account deleted.");
        window.location.href = "/";
      } else {
        alert("Delete failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error.");
    }
  };

  if (!user) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <FaUserCircle size={100} className="text-primary mb-3" />
        <h3 className="fw-bold">User Profile</h3>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <ul className="list-group list-group-flush mb-4">
            <li className="list-group-item">
              <strong>Name:</strong>{" "}
              {isEditing ? (
                <input
                  name="username"
                  value={editData.username}
                  onChange={handleChange}
                  className="form-control"
                />
              ) : (
                user.username
              )}
            </li>
            <li className="list-group-item">
              <strong>Email:</strong>{" "}
              {isEditing ? (
                <input
                  name="email"
                  value={editData.email}
                  onChange={handleChange}
                  className="form-control"
                />
              ) : (
                <a href={`mailto:${user.email}`}>{user.email}</a>
              )}
            </li>
            <li className="list-group-item">
              <strong>Phone:</strong>{" "}
              {isEditing ? (
                <input
                  name="mobile"
                  value={editData.mobile}
                  onChange={handleChange}
                  className="form-control"
                />
              ) : (
                user.mobile
              )}
            </li>
            <li className="list-group-item">
              <strong>Place:</strong>{" "}
              {isEditing ? (
                <input
                  name="place"
                  value={editData.place}
                  onChange={handleChange}
                  className="form-control"
                />
              ) : (
                user.place
              )}
            </li>
            <li className="list-group-item">
              <strong>Date of Birth:</strong>{" "}
              {isEditing ? (
                <input
                  name="dob"
                  type="date"
                  value={editData.dob}
                  onChange={handleChange}
                  className="form-control"
                />
              ) : (
                formatDate(user.dob)
              )}
            </li>
            <li className="list-group-item">
              <strong>Password:</strong>{" "}
              {isEditing ? (
                <input
                  name="password"
                  type="text"
                  value={editData.password}
                  onChange={handleChange}
                  className="form-control"
                />
              ) : (
                user.password
              )}
            </li>
          </ul>

          <div className="d-flex justify-content-center gap-4">
            {isEditing ? (
              <button className="btn btn-outline-success" onClick={handleUpdate}>
                <FaSave /> Update
              </button>
            ) : (
              <button className="btn btn-outline-primary" onClick={() => setIsEditing(true)}>
                <FaEdit /> Edit
              </button>
            )}
            <button className="btn btn-outline-danger" onClick={handleDelete}>
              <FaTrashAlt /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
