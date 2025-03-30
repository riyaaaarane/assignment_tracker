import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");  // Default role
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:5000/auth/signup", {
                email,
                password,
                role,
            });
            setMessage(response.data.message);
            if (response.data.success) {
                navigate("/login");
            }
        } catch (error) {
            setMessage("Signup failed. Try again.");
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="faculty">Faculty</option>
                </select>
                <button type="submit">Signup</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Signup;
