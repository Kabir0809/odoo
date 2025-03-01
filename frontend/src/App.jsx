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
import PolicyDetails from "./Components/Home Page/PolicyDetails";
import UserDashboard from "./Components/pages/UserDashboard";
import GovernmentDashboard from "./Components/pages/GovernmentDashboad";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LocalGovernmentDashboard />} />
        <Route path="/complaints" element={<ComplaintsPage />} />
        <Route path="/my-complaints" element={<MyComplaintsPage />} />
        <Route path="/policy/:id" element={<PolicyDetails/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/government-dashboard" element={<GovernmentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

