import React, { useState } from "react";
import loginimage from "./Images/admin-illustration.png";
import { FaPhone, FaLock, FaUser, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import "./Adminlogin.css";
import { useNavigate } from 'react-router-dom';

const Userlogin = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    mobile: "",
    place: "",
    dob: "",
    password: ""
  });

  const navigate = useNavigate();

  // Login logic
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/getusers");
      const users = await response.json();
      const user = users.find(
        (u) => u.mobile === mobile && u.password === password
      );

      if (user) {
        alert("Login Successful");
        sessionStorage.setItem("loggedInUser", JSON.stringify(user)); // ✅ sessionStorage
        sessionStorage.setItem("mobile", user.mobile); // ✅ per tab storage
        navigate("/userboard");
      } else {
        alert("Invalid Mobile Number or Password");
      }
      
    } catch (error) {
      console.error("Login error:", error);
      alert("Error connecting to server");
    }
  };

  // Registration logic
  // Registration logic
const handleRegister = async (e) => {
  e.preventDefault();
  try {
    // fetch all users first
    const res = await fetch("http://localhost:8080/api/getusers");
    const users = await res.json();

    // check if email or mobile already exists
    const emailExists = users.some((u) => u.email === registerData.email);
    const mobileExists = users.some((u) => u.mobile === registerData.mobile);

    if (emailExists) {
      alert("This email is already registered. Please use another one.");
      return;
    }
    if (mobileExists) {
      alert("This mobile number is already registered. Please use another one.");
      return;
    }

    // if no duplicates → proceed with registration
    const response = await fetch("http://localhost:8080/api/registerusers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    });

    if (response.ok) {
      alert("Registration Successful!");
      setIsRegistering(false);
      setRegisterData({
        username: "",
        email: "",
        mobile: "",
        place: "",
        dob: "",
        password: ""
      });
    } else {
      alert("Registration Failed!");
    }
  } catch (error) {
    console.error("Registration error:", error);
    alert("Error connecting to server");
  }
};


  const handleRegisterInput = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <Row className="bg-white shadow-lg rounded-4 p-4 w-75">
        <Col md={6} className="d-flex justify-content-center align-items-center p-4">
          <img src={loginimage} alt="User Login" className="img-fluid" />
        </Col>
        <Col md={6} className="d-flex flex-column justify-content-center p-4">
          {isRegistering ? (
            <>
              <h2 className="text-center mb-4">Register</h2>
              <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaUser /></InputGroup.Text>
                    <Form.Control type="text" name="username" value={registerData.username} onChange={handleRegisterInput} placeholder="Enter username" required className="rounded-end" />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                    <Form.Control type="email" name="email" value={registerData.email} onChange={handleRegisterInput} placeholder="Enter email" required className="rounded-end" />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="mobile">
                  <Form.Label>Mobile Number</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaPhone /></InputGroup.Text>
                    <Form.Control type="text" name="mobile" value={registerData.mobile} onChange={handleRegisterInput} placeholder="Enter mobile number" required className="rounded-end" />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="place">
                  <Form.Label>Place</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaMapMarkerAlt /></InputGroup.Text>
                    <Form.Control type="text" name="place" value={registerData.place} onChange={handleRegisterInput} placeholder="Enter your place" required className="rounded-end" />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="dob">
                  <Form.Label>Date of Birth</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaCalendarAlt /></InputGroup.Text>
                    <Form.Control type="date" name="dob" value={registerData.dob} onChange={handleRegisterInput} required className="rounded-end" />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaLock /></InputGroup.Text>
                    <Form.Control type="password" name="password" value={registerData.password} onChange={handleRegisterInput} placeholder="********" required className="rounded-end" />
                  </InputGroup>
                </Form.Group>
                <Button type="submit" variant="success" className="w-100">REGISTER</Button>
              </Form>
              <div className="text-center mt-3">
                <a href="#" className="text-primary small" onClick={() => setIsRegistering(false)}>Already have an account? Login</a>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-center mb-4">Login as an User</h2>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="mobile">
                  <Form.Label>Mobile Number</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaPhone /></InputGroup.Text>
                    <Form.Control type="text" className="rounded-end" placeholder="Enter mobile number" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaLock /></InputGroup.Text>
                    <Form.Control type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required className="rounded-end" />
                  </InputGroup>
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100">LOGIN</Button>
              </Form>
              <div className="text-center mt-3">
                <a href="#" className="text-primary small" onClick={() => setIsRegistering(true)}>Create an account</a>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Userlogin;
