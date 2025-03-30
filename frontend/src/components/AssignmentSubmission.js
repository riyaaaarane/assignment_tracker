import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SubmitAssignment = () => {
    const { assignmentId } = useParams();
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("assignment_id", assignmentId);

        try {
            const response = await axios.post("http://127.0.0.1:5000/assignments/upload", formData);
            setMessage(response.data.message);
        } catch (error) {
            console.error("Upload error:", error);
        }
    };

    return (
        <div className="upload-container">
            <h2>Submit Assignment</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SubmitAssignment;
