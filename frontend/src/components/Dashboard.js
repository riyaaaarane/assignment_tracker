import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const { token } = useContext(AuthContext);
    const [subjects, setSubjects] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        console.log("Token being sent:", token); // Debugging log
    
        if (!token) {
            setError("You are not authenticated.");
            return;
        }
    
        axios.get("http://localhost:5000/assignments/dashboard", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            setSubjects(response.data);
        }).catch(error => {
            console.error("Error fetching assignments:", error);
            setError("Failed to load subjects and assignments.");
        });
    }, [token]);
    

        

    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="dashboard-container">
            <h2>Your Subjects</h2>
            <div className="subjects-grid">
                {subjects.map((subject) => (
                    <div key={subject.id} className="subject-card">
                        <h3>{subject.name}</h3>
                        <p>Assigned Teacher: {subject.teacher}</p>
                        <p>Pending Assignments: {subject.pending_assignments}</p>
                        <Link to={`/assignments/${subject.id}`} className="view-btn">View Assignments</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
