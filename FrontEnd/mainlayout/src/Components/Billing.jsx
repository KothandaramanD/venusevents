import React, { useEffect, useState, useRef } from "react";
import { FaEdit, FaTrashAlt, FaPrint } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Billing.css";
import jsPDF from "jspdf";

const Billing = () => {
  const [orderList, setOrderList] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [billingData, setBillingData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [printData, setPrintData] = useState(null);

  const printRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    eventname: "",
    eventorganizer: "",
    members: "",
    budget: "",
    ac: "",
  });

  const [costs, setCosts] = useState({
    organizer: 0,
    worker: 0,
    food: 0,
    current: 0,
    ac: 0,
    decoration: 0,
    travel: 0,
    other: 0,
  });

  const [total, setTotal] = useState(0);
  const [gst, setGst] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/api/eventservice/getservice")
      .then((res) => res.json())
      .then((data) => setOrderList(data))
      .catch((err) => console.error("Failed to fetch order IDs:", err));

    fetchBillingData();
  }, []);

  const fetchBillingData = () => {
    fetch("http://localhost:8080/api/billing/getbilling")
      .then((res) => res.json())
      .then((data) => setBillingData(data))
      .catch((err) => console.error("Error fetching billing data:", err));
  };

  useEffect(() => {
    const totalCost = Object.values(costs).reduce((a, b) => +a + +b, 0);
    const gstAmount = totalCost * 0.18;
    setTotal(totalCost);
    setGst(gstAmount);
  }, [costs]);

  const handleImport = () => {
    if (!selectedId) return alert("Please select an Order ID.");
    const selected = orderList.find((item) => item._id === selectedId);
    if (selected) {
      setFormData({
        name: selected.name || "",
        mobile: selected.mobilenumber || "",
        email: selected.email || "",
        address: selected.address || "",
        eventname: selected.eventname || "",
        eventorganizer: selected.eventorganizer || "",
        members: selected.members || "",
        budget: selected.budgetrange || "",
        ac: selected.ac ? "Yes" : "No",
      });
    }
  };

  const handleSendUser = async () => {
    const payload = {
      orderid: selectedId,
      name: formData.name,
      mobilenumber: formData.mobile,
      email: formData.email,
      address: formData.address,
      eventname: formData.eventname,
      eventorganizer: formData.eventorganizer,
      members: formData.members,
      budgetrange: formData.budget,
      ac: formData.ac === "Yes",
      message: "hai",
      eventorganizercost: costs.organizer,
      workercost: costs.worker,
      foodcost: costs.food,
      currentcost: costs.current,
      accost: costs.ac,
      decorationcost: costs.decoration,
      travelcost: costs.travel,
      othercost: costs.other,
      totalcost: total,
      gstcgst: gst.toFixed(2),
    };

    try {
      const res = await fetch("http://localhost:8080/api/billing/registerbilling", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to send billing data");
      alert("Billing data sent successfully!");
      fetchBillingData();
    } catch (err) {
      console.error(err);
      alert("Error sending data. Please try again.");
    }
  };

  const handleEdit = (id) => setEditingId(id);

  const handleChange = (id, key, value) => {
    setBillingData((prev) =>
      prev.map((item) => (item._id === id ? { ...item, [key]: value } : item))
    );
  };

  const handleUpdate = async (id) => {
    const updatedRecord = billingData.find((item) => item._id === id);
    try {
      const res = await fetch(`http://localhost:8080/api/billing/updatebilling/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRecord),
      });
      if (!res.ok) throw new Error("Update failed");
      alert("Record updated successfully.");
      setEditingId(null);
      fetchBillingData();
    } catch (err) {
      console.error(err);
      alert("Error updating record.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      const res = await fetch(`http://localhost:8080/api/billing/deletebilling/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      alert("Record deleted successfully.");
      fetchBillingData();
    } catch (err) {
      console.error(err);
      alert("Error deleting record.");
    }
  };

  const handlePrint = (row) => {
    const doc = new jsPDF();
    const fontSize = 9;         // Reduced font size (20% smaller)
    const maxWidth = 180;          // Wrap width for long lines
    const lineHeight = 1;        // Line height multiplier
    const spacing = fontSize * lineHeight; // Calculated vertical spacing
  
    doc.setFontSize(fontSize);
    let y = 10;
  
    Object.entries(row).forEach(([key, val]) => {
      if (!["_id", "__v", "message", "createdAt", "updatedAt"].includes(key)) {
        const label = key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase());
        const text = `${label}: ${String(val)}`;
        const lines = doc.splitTextToSize(text, maxWidth);
        doc.text(lines, 10, y);
        y += lines.length * spacing;
      }
    });
  
    doc.save(`${row.orderid || "billing"}.pdf`);
  };
      

  return (
    <div className="container-fluid mt-5 event-form">
      <h3 className="text-center">Billing</h3>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="mb-3 row align-items-center">
            <label className="col-sm-4 col-form-label">Order ID</label>
            <div className="col-sm-8 d-flex gap-2">
              <select
                className="form-select"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
              >
                <option value="">Select</option>
                {orderList.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item._id}
                  </option>
                ))}
              </select>
              <button className="btn btn-secondary" onClick={handleImport}>
                Import Data
              </button>
            </div>
          </div>
          {[
            { label: "Name", key: "name", type: "text" },
            { label: "Mobile", key: "mobile", type: "tel" },
            { label: "Email", key: "email", type: "email" },
            { label: "Address", key: "address", type: "text" },
            { label: "Event Name", key: "eventname", type: "text" },
            { label: "Event Organizer", key: "eventorganizer", type: "text" },
            { label: "Members", key: "members", type: "number" },
            { label: "Budget", key: "budget", type: "text" },
          ].map((field, index) => (
            <div className="mb-3 row align-items-center" key={index}>
              <label className="col-sm-4 col-form-label">{field.label}</label>
              <div className="col-sm-8">
                <input
                  type={field.type}
                  className="form-control"
                  value={formData[field.key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.key]: e.target.value })
                  }
                />
              </div>
            </div>
          ))}

<div className="mb-3 row align-items-center">
            <label className="col-sm-4 col-form-label">AC</label>
            <div className="col-sm-8">
              <select
                className="form-select full-width-input"
                value={formData.ac}
                onChange={(e) => setFormData({ ...formData, ac: e.target.value })}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>


          {[
            { label: "Event Organizer Cost", key: "organizer" },
            { label: "Worker Cost", key: "worker" },
            { label: "Food Cost", key: "food" },
            { label: "Current Cost", key: "current" },
            { label: "AC Cost", key: "ac" },
            { label: "Decoration Cost", key: "decoration" },
            { label: "Travel Cost", key: "travel" },
            { label: "Other Cost", key: "other" },
          ].map((field, index) => (
            <div className="mb-3 row align-items-center" key={index}>
              <label className="col-sm-4 col-form-label">{field.label}</label>
              <div className="col-sm-8">
                <input
                  type="number"
                  className="form-control"
                  value={costs[field.key]}
                  onChange={(e) =>
                    setCosts({ ...costs, [field.key]: Number(e.target.value) })
                  }
                />
              </div>
            </div>
          ))}

          <div className="mb-3 row align-items-center">
            <label className="col-sm-4 col-form-label">Total Cost</label>
            <div className="col-sm-8">
              <input type="number" className="form-control" value={total} disabled />
            </div>
          </div>

          <div className="mb-3 row align-items-center">
            <label className="col-sm-4 col-form-label">GST/CGST (18%)</label>
            <div className="col-sm-8">
              <input type="number" className="form-control" value={gst.toFixed(2)} disabled />
            </div>
          </div>        

          <div className="row mt-4">
            <div className="col text-center">
              <button className="btn btn-primary me-2" onClick={handleSendUser}>
                Send User
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive mt-4">
        <table className="table table-bordered">
          <thead className="table-primary text-nowrap">
            <tr>
              <th>Order ID</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Address</th>
              <th>Event</th>
              <th>Organizer</th>
              <th>Members</th>
              <th>Budget</th>
              <th>AC</th>
              <th>Event Organizer Cost</th>
              <th>Worker Cost</th>
              <th>Food Cost</th>
              <th>Current Cost</th>
              <th>AC Cost</th>
              <th>Decoration Cost</th>
              <th>Travel Cost</th>
              <th>Other Cost</th>
              <th>Total</th>
              <th>GST</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {billingData.map((item) => (
              <tr key={item._id}>
                {Object.keys(item)
                  .filter((k) => !["_id", "__v", "message", "createdAt", "updatedAt"].includes(k))
                  .map((key) => (
                    <td key={key}>
                      {editingId === item._id ? (
                        key === "ac" ? (
                          <select
                            className="form-select"
                            value={item[key] ? "Yes" : "No"}
                            onChange={(e) =>
                              handleChange(item._id, key, e.target.value === "Yes")
                            }
                          >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            value={item[key]}
                            onChange={(e) =>
                              handleChange(item._id, key, e.target.value)
                            }
                          />
                        )
                      ) : key === "ac" ? (
                        item[key] ? "Yes" : "No"
                      ) : (
                        item[key]
                      )}
                    </td>
                  ))}
                <td className="text-center">
                  {editingId === item._id ? (
                    <button
                      className="btn btn-success btn-sm me-1"
                      onClick={() => handleUpdate(item._id)}
                    >
                      Update
                    </button>
                  ) : (
                    <>
                      <button
                        className="btn btn-outline-primary btn-sm me-1"
                        onClick={() => handleEdit(item._id)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm me-1"
                        onClick={() => handleDelete(item._id)}
                      >
                        <FaTrashAlt />
                      </button>
                      <button
                        className="btn btn-outline-dark btn-sm"
                        onClick={() => handlePrint(item)}
                      >
                        <FaPrint />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {printData && (
        <div className="print-section d-none d-print-block" ref={printRef}>
          <div className="print-content">
            {Object.entries(printData).map(([key, val]) =>
              ["_id", "__v", "message", "createdAt", "updatedAt"].includes(key) ? null : (
                <p key={key}>
                  <strong>{key.replace(/([A-Z])/g, " $1")}:</strong> {String(val)}
                </p>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
