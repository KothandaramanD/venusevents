import React, { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Billing.css";

const Ubilling = () => {
  const [orderList, setOrderList] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const printRef = useRef();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/billing/getbilling");
        const data = await res.json();

        const storedUser = sessionStorage.getItem("loggedInUser");
        const storedMobile = sessionStorage.getItem("mobile");

        let mobile = null;
        if (storedUser) {
          try {
            mobile = JSON.parse(storedUser).mobile;
          } catch {
            mobile = storedMobile;
          }
        } else {
          mobile = storedMobile;
        }

        const userOrders = data.filter(order => order.mobilenumber === mobile);
        setOrderList(userOrders);
      } catch (err) {
        console.error("Error fetching billing data:", err);
      }
    };

    fetchOrders();
  }, []);

  const handleFetch = () => {
    const selected = orderList.find(order => order._id === selectedOrderId);
    setOrderDetails(selected || null);
  };

  const handlePrint = async () => {
    const input = printRef.current;
    if (!input) return;

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "pt", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pageWidth - 30;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 15, 15, pdfWidth, pdfHeight);
    pdf.save(`billing_${orderDetails.orderid}.pdf`);
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Billing Summary</h3>

      <div className="mb-4 d-flex justify-content-center no-print">
        <select
          className="form-select w-auto me-2"
          value={selectedOrderId}
          onChange={(e) => setSelectedOrderId(e.target.value)}
        >
          <option value="">Select Order ID</option>
          {orderList.map((order) => (
            <option key={order._id} value={order._id}>{order.orderid}</option>
          ))}
        </select>
        <button className="btn btn-secondary" onClick={handleFetch}>Fetch</button>
      </div>

      {orderDetails && (
        <div className="billing-frame" ref={printRef}>
          <div className="mb-3"><strong>Order ID:</strong> {orderDetails.orderid}</div>
          <div className="mb-3"><strong>Name:</strong> {orderDetails.name}</div>
          <div className="mb-3"><strong>Mobile Number:</strong> {orderDetails.mobilenumber}</div>
          <div className="mb-3"><strong>Email:</strong> {orderDetails.email}</div>
          <div className="mb-3"><strong>Address:</strong> {orderDetails.address}</div>
          <div className="mb-3"><strong>Event Name:</strong> {orderDetails.eventname}</div>
          <div className="mb-3"><strong>Event Organizer:</strong> {orderDetails.eventorganizer}</div>
          <div className="mb-3"><strong>Members:</strong> {orderDetails.members}</div>
          <div className="mb-3"><strong>Budget Range:</strong> {orderDetails.budgetrange}</div>
          <div className="mb-3"><strong>AC:</strong> {orderDetails.ac ? "Yes" : "No"}</div>

          {[
            { label: "Event Organizer Cost", key: "eventorganizercost" },
            { label: "Worker Cost", key: "workercost" },
            { label: "Food Cost", key: "foodcost" },
            { label: "Current Cost", key: "currentcost" },
            { label: "AC Cost", key: "accost" },
            { label: "Decoration Cost", key: "decorationcost" },
            { label: "Travel Cost", key: "travelcost" },
            { label: "Other Cost", key: "othercost" },
            { label: "Total Cost", key: "totalcost" },
            { label: "GST/CGST (18%)", key: "gstcgst" }
          ].map((item, idx) => (
            <div className="mb-2" key={idx}>
              <strong>{item.label}:</strong> ₹ {orderDetails[item.key] ?? 0}
            </div>
          ))}
        </div>
      )}

      {orderDetails && (
        <div className="text-center mt-4 no-print">
          <button className="btn btn-danger" onClick={handlePrint}>🖨️ Download PDF</button>
        </div>
      )}
    </div>
  );
};

export default Ubilling;
