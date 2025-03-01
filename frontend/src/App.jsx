// import React from "react";
// import "./index.css"; // Ensure Tailwind is imported
// import LocalGovernmentDashboard from "./Components/Home Page/home";

// function App() {
//   return (
//     <div>
//       <LocalGovernmentDashboard />
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LocalGovernmentDashboard from "./Components/Home Page/home";
import ComplaintsPage from "./Components/Complaint/ComplaintsPage";
import MyComplaintsPage from "./Components/Complaint/MyComplaintsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LocalGovernmentDashboard />} />
        <Route path="/complaints" element={<ComplaintsPage />} />
        <Route path="/my-complaints" element={<MyComplaintsPage />} />
        <Route path="/policy/:id" element={<div>Policy details page (to be implemented)</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

