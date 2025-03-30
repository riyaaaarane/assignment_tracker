import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ViewAssignment = () => {
    const { id } = useParams(); // Get assignment ID from URL
    const [assignment, setAssignment] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) {
            setError("Invalid Assignment ID.");
            return;
        }

        axios.get(`http://127.0.0.1:5000/assignments/${id}`)
            .then(response => {
                setAssignment(response.data);
            })
            .catch(error => {
                console.error("Error fetching assignment:", error.response?.data || error.message);
                setError("Failed to load assignment.");
            });
    }, [id]);

    if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
    if (!assignment) return <p style={{ textAlign: "center" }}>Loading assignment details...</p>;

    return (
        <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px", backgroundColor: "#f9f9f9", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" }}>
            <h2>{assignment.title}</h2>
            <p><strong>Subject:</strong> {assignment.subject}</p>
            <p><strong>Assigned by:</strong> {assignment.teacher}</p>
            <p><strong>Description:</strong> {assignment.description}</p>
            <p><strong>Due Date:</strong> {assignment.due_date}</p>
            <p><strong>Marks:</strong> {assignment.marks}</p>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Link to="/dashboard" style={{ textDecoration: "none", backgroundColor: "#007BFF", color: "white", padding: "10px 15px", borderRadius: "5px" }}>
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default ViewAssignment;
