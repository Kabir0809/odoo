import React from "react";
import "./index.css"; // Ensure Tailwind is imported
import AuthCard from "./component/login";

function App() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <AuthCard />
    </div>
  );
}

export default App;
