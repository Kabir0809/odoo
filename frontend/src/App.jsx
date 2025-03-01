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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LocalGovernmentDashboard from "./Components/Home Page/home";
import PolicyDetails from "./Components/Home Page/PolicyDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LocalGovernmentDashboard />} />
        <Route path="/policy/:id" element={<PolicyDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

