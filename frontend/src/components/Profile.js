import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <p>Loading profile...</p>;
    }

    return (
        <div className="profile-container">
            <h2>Welcome, {user.name}</h2>
            <h3>Your Recommended Courses:</h3>
            <ul>
                {user.recommended_courses.length > 0 ? (
                    user.recommended_courses.map((course, index) => (
                        <li key={index}>{course}</li>
                    ))
                ) : (
                    <p>No course recommendations available.</p>
                )}
            </ul>
        </div>
    );
};

export default Profile;
