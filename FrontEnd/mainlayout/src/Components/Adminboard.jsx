import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  FaChartPie,
  FaPhone,
  FaCalendarCheck,
  FaClipboardList,
  FaUsers,
  FaFileInvoiceDollar,
  FaPowerOff
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ContactRequest from "./ContactRequest";
import EventRequest from "./EventRequest";
import Events from "./Events";
import EventOrganizer from "./EventOrganizer";
import Billing from "./Billing";
import Userdata from "./Userdata";
import "./Adminboard.css";
import adminlogo from "./Images/adminlogo.png";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("");
  const [counts, setCounts] = useState({
    contact: 0,
    eventRequest: 0,
    userdata: 0,
    billing: 0,
    events: 0,
    organizers: 0,
  });

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const renderContent = () => {
    switch (activePage) {
      case "contact":
        return <ContactRequest />;
      case "eventRequest":
        return <EventRequest />;
      case "events":
        return <Events />;
      case "organizers":
        return <EventOrganizer />;
      case "userdata":
        return <Userdata />;
      case "billing":
        return <Billing />;
      default:
        return null;
    }
  };

  // ✅ Function to fetch dashboard counts
  const fetchCounts = async () => {
    try {
      const [
        contactRes,
        eventReqRes,
        userRes,
        billingRes,
        eventRes,
        organizerRes
      ] = await Promise.all([
        fetch("http://localhost:8080/api/getallitems"),
        fetch("http://localhost:8080/api/eventservice/getservice"),
        fetch("http://localhost:8080/api/getusers"),
        fetch("http://localhost:8080/api/billing/getbilling"),
        fetch("http://localhost:8080/api/events/all"),
        fetch("http://localhost:8080/api/organizers/all"),
      ]);

      const contactData = await contactRes.json();
      const eventReqData = await eventReqRes.json();
      const userData = await userRes.json();
      const billingData = await billingRes.json();
      const eventData = await eventRes.json();
      const organizerData = await organizerRes.json();

      setCounts({
        contact: contactData.length,
        eventRequest: eventReqData.length,
        userdata: userData.length,
        billing: billingData.length,
        events: eventData.length,
        organizers: organizerData.length,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchCounts(); // Initial load
    const interval = setInterval(fetchCounts, 1000); // ✅ Refresh every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <Container fluid className="p-0">
      {/* Header */}
      <header className="bg-set text-center p-3 d-flex justify-content-between align-items-center">
        <div className="adminlogoset p-1 d-flex align-items-center">
          <img src={adminlogo} alt="Admin Logo" width="100" />
        </div>
        <div className="text-center flex-grow-1">
          <h1 className="text-white mb-1">Welcome Admin!</h1>
          <p className="text-white mb-0">Manage Your Events</p>
        </div>
        <div className="d-flex align-items-center">
          <Button variant="danger" onClick={handleLogout}>
            <FaPowerOff size={24} />
          </Button>
        </div>
      </header>

      {/* Sidebar + Content */}
      <Row className="m-0 flex-column flex-md-row">
        {/* Sidebar */}
        <Col sm={12} md={3} className="sidebanner p-4 text-white d-flex flex-column admin-board-sidebar">
          <ul className="list-unstyled">
            <li className={`sidebar-item ${activePage === "" ? "active-item" : ""}`} onClick={() => handlePageChange("")}>
              <FaChartPie className="iconsize" />
              <span className="menufontsize">Overview</span>
            </li>
            <li className={`sidebar-item ${activePage === "contact" ? "active-item" : ""}`} onClick={() => handlePageChange("contact")}>
              <FaPhone className="iconsize" />
              <span className="menufontsize">Contact Requests</span>
            </li>
            <li className={`sidebar-item ${activePage === "eventRequest" ? "active-item" : ""}`} onClick={() => handlePageChange("eventRequest")}>
              <FaCalendarCheck className="iconsize" />
              <span className="menufontsize">Event Requests</span>
            </li>
            <li className={`sidebar-item ${activePage === "events" ? "active-item" : ""}`} onClick={() => handlePageChange("events")}>
              <FaClipboardList className="iconsize" />
              <span className="menufontsize">Events</span>
            </li>
            <li className={`sidebar-item ${activePage === "organizers" ? "active-item" : ""}`} onClick={() => handlePageChange("organizers")}>
              <FaUsers className="iconsize" />
              <span className="menufontsize">Event Organizers</span>
            </li>
            <li className={`sidebar-item ${activePage === "userdata" ? "active-item" : ""}`} onClick={() => handlePageChange("userdata")}>
              <FaUsers className="iconsize" />
              <span className="menufontsize">User Data</span>
            </li>
            <li className={`sidebar-item ${activePage === "billing" ? "active-item" : ""}`} onClick={() => handlePageChange("billing")}>
              <FaFileInvoiceDollar className="iconsize" />
              <span className="menufontsize">Billing</span>
            </li>
          </ul>
        </Col>

        {/* Main Content Area */}
        <Col sm={12} md={9} className="p-1" style={{ height: "100vh", overflowY: "auto" }}>
          {activePage === "" && (
            <Row className="p-5">
              <Col sm={6} className="mb-3">
                <div className="single-rounded-box text-white p-3 text-center notfit">
                  <h5>Contact Requests</h5>
                  <h6>{counts.contact}</h6>
                </div>
              </Col>
              <Col sm={6} className="mb-3">
                <div className="single-rounded-box text-white p-3 text-center notfit">
                  <h5>Event Requests</h5>
                  <h6>{counts.eventRequest}</h6>
                </div>
              </Col>
              <Col sm={6} className="mb-3">
                <div className="single-rounded-box text-white p-3 text-center notfit">
                  <h5>Total User Data</h5>
                  <h6>{counts.userdata}</h6>
                </div>
              </Col>
              <Col sm={6} className="mb-3">
                <div className="single-rounded-box text-white p-3 text-center notfit">
                  <h5>Total Billing Count</h5>
                  <h6>{counts.billing}</h6>
                </div>
              </Col>
              <Col sm={6} className="mb-3">
                <div className="single-rounded-box text-white p-3 text-center notfit">
                  <h5>Total Events</h5>
                  <h6>{counts.events}</h6>
                </div>
              </Col>
              <Col sm={6} className="mb-3">
                <div className="single-rounded-box text-white p-3 text-center notfit">
                  <h5>Total Event Organizers</h5>
                  <h6>{counts.organizers}</h6>
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

export default AdminDashboard;
