import React, { useEffect, useState, useRef } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Button, Form } from "react-bootstrap";
import "./Userdata.css";

const Userdata = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const intervalRef = useRef(null);

  // Load users
  const fetchUsers = () => {
    fetch("http://localhost:8080/api/getusers")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        // Keep selected user updated only if editing the same user
        if (selectedUser) {
          const updated = data.find((u) => u._id === selectedUser._id);
          if (updated) setSelectedUser((prev) => ({ ...prev, ...updated }));
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  };

  // Polling effect
  useEffect(() => {
    // Only poll if no user is being edited
    if (!selectedUser) {
      fetchUsers(); // initial fetch
      intervalRef.current = setInterval(fetchUsers, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [selectedUser]);

  const handleEdit = (user) => {
    clearInterval(intervalRef.current); // stop polling while editing
    setSelectedUser({ ...user });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/deleteusers/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete");
        return res.json();
      })
      .then(() => {
        alert("User deleted successfully");
        if (selectedUser?._id === id) setSelectedUser(null);
        fetchUsers();
      })
      .catch((err) => console.error("Delete error:", err));
  };

  const handleUpdate = () => {
    if (!selectedUser?._id) return;

    fetch(`http://localhost:8080/api/updateusers/${selectedUser._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedUser),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(() => {
        alert("User updated successfully");
        setSelectedUser(null); // close form
        fetchUsers();
      })
      .catch((err) => console.error("Update error:", err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="userdata-container p-4">
      <h3 className="text-center mb-4">User Details</h3>

      {selectedUser && (
        <div className="selected-user mb-4 p-3">
          <h5 className="text-center fw-bold">Edit User</h5>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={selectedUser.username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={selectedUser.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Mobile:</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                value={selectedUser.mobile}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Place:</Form.Label>
              <Form.Control
                type="text"
                name="place"
                value={selectedUser.place}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Date of Birth:</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={selectedUser.dob?.slice(0, 10) || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="text"
                name="password"
                value={selectedUser.password}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="text-center mt-3">
              <button type="button" className="btn-update" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </Form>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-bordered table-hover custom-table text-center">
          <thead className="bg-primary">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Place</th>
              <th>DOB</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.place}</td>
                <td>{user.dob?.slice(0, 10)}</td>
                <td>{user.password}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="me-2 mb-1"
                    onClick={() => handleEdit(user)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    className="mb-1"
                    onClick={() => handleDelete(user._id)}
                  >
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Userdata;
