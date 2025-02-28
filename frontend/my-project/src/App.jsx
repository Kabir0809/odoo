import React from "react";
import "./index.css"; // Ensure Tailwind is imported

function App() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <button className="px-6 py-3 bg-blue-500 text-white text-xl font-bold rounded-lg shadow-lg hover:bg-blue-600 transition">
        Hello World
      </button>
    </div>
  );
}

export default App;
