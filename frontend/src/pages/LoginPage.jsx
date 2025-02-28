import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css"; // Shared styles for Login & Register

const LoginPage = () => {
    const [user, setUser] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const login = async () => {
        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Login successful!");
                localStorage.setItem("user", JSON.stringify(user)); // Store user session
                navigate("/products"); // Redirect to ProductPage
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("Failed to log in. Try again.");
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} />

            <button onClick={login}>Login</button>
            <p>Don't have an account? <button className="toggle-btn" onClick={() => navigate("/register")}>Register</button></p>
        </div>
    );
};

export default LoginPage;
