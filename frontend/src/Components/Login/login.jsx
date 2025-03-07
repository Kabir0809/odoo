import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const AuthCard = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user", // Default role
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  /* 🔹 Handle Login */
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", loginData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      if (res.data.user.role === "government") {
        navigate("/government-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  /* 🔹 Handle Signup */
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/auth/signup", {
        name: signupData.fullName,
        email: signupData.email,
        password: signupData.password,
        role: signupData.role,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      if (res.data.user.role === "government") {
        navigate("/government-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      alert("Signup failed! Email might be taken.");
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-card">
        <div className="auth-tabs">
          <button className={`tab-button ${activeTab === "login" ? "active" : ""}`} onClick={() => setActiveTab("login")}>
            Login
          </button>
          <button className={`tab-button ${activeTab === "signup" ? "active" : ""}`} onClick={() => setActiveTab("signup")}>
            Sign Up
          </button>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="auth-content">
          {activeTab === "login" ? (
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" placeholder="Enter email" value={loginData.email} onChange={handleLoginChange} required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" placeholder="Enter password" value={loginData.password} onChange={handleLoginChange} required />
              </div>
              <button type="submit" className="submit-button">Login</button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="fullName" placeholder="Enter full name" value={signupData.fullName} onChange={handleSignupChange} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" placeholder="Enter email" value={signupData.email} onChange={handleSignupChange} required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" placeholder="Create password" value={signupData.password} onChange={handleSignupChange} required />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" placeholder="Confirm password" value={signupData.confirmPassword} onChange={handleSignupChange} required />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select name="role" value={signupData.role} onChange={handleSignupChange}>
                  <option value="user">Citizen</option>
                  <option value="government">Government</option>
                </select>
              </div>
              <button type="submit" className="submit-button">Sign Up</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
