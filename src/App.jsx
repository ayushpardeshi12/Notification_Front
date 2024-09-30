import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CabinSelection from "../src/components/CabinSelection";
import CabinDashboard from "../src/components/CabinDashboard";
import StaffDashboard from "../src/components/StaffDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CabinSelection />} />
        <Route path="/cabin/:cabinName" element={<CabinDashboard />} />
        <Route path="/staff" element={<StaffDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
