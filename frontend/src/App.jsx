import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import ForumPage from "./pages/ForumPage";
import Booking from "./pages/Booking";
import Resources from "./pages/Resources";
import SOSCircle from "./pages/SOSCircle";
import Settings from "./pages/Settings";
import MoodMirror from "./components/MoodMirror";
import ResourceDetail from "./pages/ResourceDetail";

function App() {
  return (
    <Router>
      <div className="app-layout">
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main content on the right */}
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/:id" element={<ResourceDetail />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/mood-mirror" element={<MoodMirror />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/sos" element={<SOSCircle />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
