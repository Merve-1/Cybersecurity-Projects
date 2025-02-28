import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css"; // Shared styles for Login & Register

const RegisterPage = () => {
    const [user, setUser] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const register = async () => {
        try {
            const response = await fetch("http://localhost:8080/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registration successful! Please log in.");
                navigate("/"); // Redirect to login page
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error registering:", error);
            alert("Failed to register. Try again.");
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} />

            <button onClick={register}>Register</button>
            <p>Already have an account? <button className="toggle-btn" onClick={() => navigate("/")}>Login</button></p>
        </div>
    );
};

export default RegisterPage;
