import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  FaChartPie,
  FaCalendarCheck,
  FaClipboardList,
  FaUsers,
  FaFileInvoiceDollar,
  FaPowerOff,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ for smooth logout navigation
import "bootstrap/dist/css/bootstrap.min.css";
import Eventservices from "./Eventservices";
import "./Userboard.css";
import adminlogo from "./Images/adminlogo.png";
import AdminMessage from "./Adminmessage";
import UpdateProfile from "./Updateprofile";
import Ubilling from "./Ubilling";

const Userboard = () => {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("");
  const [username, setUsername] = useState("User");
  const [eventCount, setEventCount] = useState(0);
  const [billingCount, setBillingCount] = useState(0);

  const loggedInMobile = sessionStorage.getItem("mobile"); // ✅ session-based login

  // ✅ Function to fetch dynamic counts & username
  const fetchUserData = async () => {
    if (!loggedInMobile) return;

    try {
      // Fetch all users to get username
      const userRes = await fetch("http://localhost:8080/api/getusers");
      const users = await userRes.json();
      const matchedUser = users.find(user => user.mobile === loggedInMobile);
      if (matchedUser) setUsername(matchedUser.username);

      // Fetch event services for this user
      const eventRes = await fetch("http://localhost:8080/api/eventservice/getservice");
      const events = await eventRes.json();
      const userEvents = events.filter(event => event.mobilenumber === loggedInMobile);
      setEventCount(userEvents.length);

      // Fetch billing details for this user
      const billingRes = await fetch("http://localhost:8080/api/billing/getbilling");
      const billings = await billingRes.json();
      const userBillings = billings.filter(bill => bill.mobilenumber === loggedInMobile);
      setBillingCount(userBillings.length);
    } catch (err) {
      console.error("❌ Error fetching user data:", err);
    }
  };

  useEffect(() => {
    fetchUserData(); // Initial fetch
    const interval = setInterval(fetchUserData, 1000); // ✅ Refresh every 5 seconds
    return () => clearInterval(interval); // Cleanup
  }, []);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const handleLogout = () => {
    sessionStorage.clear(); // ✅ Clear only this tab’s session
    navigate("/");
  };

  const renderContent = () => {
    switch (activePage) {
      case "eventservices":
        return <Eventservices />;
      case "adminmessage":
        return <AdminMessage />;
      case "updateprofile":
        return <UpdateProfile />;
      case "ubilling":
        return <Ubilling />;
      default:
        return null;
    }
  };

  return (
    <Container fluid className="p-0">
      {/* Header Section */}
      <header className="bg-set text-center p-3 d-flex justify-content-between align-items-center">
        <div className="adminlogoset p-1 d-flex align-items-center">
          <img src={adminlogo} alt="Admin Logo" width="100" />
        </div>
        <div className="text-center flex-grow-1">
          <h1 className="text-white mb-1">Welcome {username}!</h1>
          <p className="text-white mb-0">Register Your Events</p>
        </div>
        <div className="d-flex align-items-center">
          <Button variant="danger" onClick={handleLogout}>
            <FaPowerOff size={24} />
          </Button>
        </div>
      </header>

      {/* Sidebar and Content */}
      <Row className="m-0 flex-column flex-md-row">
        {/* Sidebar */}
        <Col sm={12} md={3} className="sidebanner p-4 text-white d-flex flex-column userboard-sidebar">
          <ul className="list-unstyled">
            <li className={`sidebar-item ${activePage === "" ? "active-item" : ""}`} onClick={() => handlePageChange("")}>
              <FaChartPie className="iconsize" />
              <span className="menufontsize">Overview</span>
            </li>
            <li className={`sidebar-item ${activePage === "eventservices" ? "active-item" : ""}`} onClick={() => handlePageChange("eventservices")}>
              <FaCalendarCheck className="iconsize" />
              <span className="menufontsize">Event Services</span>
            </li>
            <li className={`sidebar-item ${activePage === "adminmessage" ? "active-item" : ""}`} onClick={() => handlePageChange("adminmessage")}>
              <FaClipboardList className="iconsize" />
              <span className="menufontsize">Admin Message</span>
            </li>
            <li className={`sidebar-item ${activePage === "updateprofile" ? "active-item" : ""}`} onClick={() => handlePageChange("updateprofile")}>
              <FaUsers className="iconsize" />
              <span className="menufontsize">Update Profile</span>
            </li>
            <li className={`sidebar-item ${activePage === "ubilling" ? "active-item" : ""}`} onClick={() => handlePageChange("ubilling")}>
              <FaFileInvoiceDollar className="iconsize" />
              <span className="menufontsize">Billing</span>
            </li>
          </ul>
        </Col>

        {/* Main Content Area */}
        <Col sm={12} md={9} className="p-5" style={{ height: "100vh", overflowY: "auto" }}>
          {activePage === "" && (
            <Row>
              <Col sm={12} className="mb-4 d-flex justify-content-center">
                <div className="p-4 text-center border border-2 text-white" style={{
                  borderColor: "#0e7c61",
                  borderRadius: "40px",
                  backgroundColor: "#0e7c61"
                }}>
                  <p className="m-0 fw-semibold text-white">
                    Planning a memorable event? We’ve got you covered! Whether you're celebrating a
                    birthday, organizing a corporate event, or hosting a private gathering, we
                    specialize in turning your vision into reality.
                  </p>
                </div>
              </Col>
              <Col xs={12} md={6} className="mb-3">
              <div className="single-rounded-box nofit p-3 text-center text-white">
                <h5>Total Events</h5>
                <h6>{eventCount}</h6>
              </div>
            </Col>
            <Col xs={12} md={6} className="mb-3">
              <div className="single-rounded-box nofit p-3 text-center text-white">
                <h5>Billing Received</h5>
                <h6>{billingCount}</h6>
              </div>
            </Col>

            </Row>
          )}
          {renderContent()}
        </Col>
      </Row>
    </Container>
  );
};

export default Userboard;
