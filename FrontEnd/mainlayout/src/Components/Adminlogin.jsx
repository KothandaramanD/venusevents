import React, { useState } from "react";
import loginimage from "./Images/admin-illustration.png";
import { FaPhone, FaLock } from "react-icons/fa";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import "./Adminlogin.css";
import { Link, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (mobile === "1234567890" && password === "1234") {
//      const newTab = window.open("/adminboard", "_blank");  
      navigate ("/adminboard", "_blank");
//      if (!newTab || newTab.closed || typeof newTab.closed === "undefined") {
//        alert("Popup blocked! Please allow popups for this site.");
//      }
    } else {
      alert("Invalid Mobile Number or Password");
    }
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <Row className="bg-white shadow-lg rounded-4 p-4 w-75">
        {/* Left Side - Image */}
        <Col md={6} className="d-flex justify-content-center align-items-center p-4">
          <img src={loginimage} alt="Admin Login" className="img-fluid" />
        </Col>

        {/* Right Side - Login Form */}
        <Col md={6} className="d-flex flex-column justify-content-center p-4">
          <h2 className="text-center mb-4">Login as an Admin User</h2>

          <Form onSubmit={handleLogin}>
            {/* Mobile Number Field */}
            <Form.Group className="mb-3" controlId="mobile">
              <Form.Label>Mobile Number</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-white border rounded-start">
                  <FaPhone />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="rounded-end"
                />
              </InputGroup>
            </Form.Group>

            {/* Password Field */}
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-white border rounded-start">
                  <FaLock />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-end"
                />
              </InputGroup>
            </Form.Group>

            {/* Login Button */}
            <Button type="submit" variant="primary" className="w-100">LOGIN</Button>
          </Form>

          {/* Links */}
          <div className="text-center mt-3">
            <a href="#" className="text-muted small">Hi admin!</a>
            <br />
          </div>

          {/* Footer */}
          <p className="text-center text-muted small mt-3">
            Welcome! • Venus Events
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLogin;
