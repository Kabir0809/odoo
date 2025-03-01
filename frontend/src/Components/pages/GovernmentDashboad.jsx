import React from "react";
import { useNavigate } from "react-router-dom";

const GovernmentDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Government Dashboard</h1>
      <button onClick={logout} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">Logout</button>
    </div>
  );
};

export default GovernmentDashboard;
