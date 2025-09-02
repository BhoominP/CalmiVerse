import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import ForumPage from "./pages/ForumPage";
import Booking from "./pages/Booking";
import Resources from "./pages/Resources";
import SOSCircle from "./pages/SOSCircle";
import Settings from "./pages/Settings";
import MoodMirror from "./components/MoodMirror";
import ResourceDetail from "./pages/ResourceDetail";

// Sign in/up
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function AppLayout() {
  const location = useLocation();

  // Hide sidebar for auth pages
  const hideSidebar = ["/signin", "/signup"].includes(location.pathname);

  return (
    <div className="app-layout">
      {!hideSidebar && <Sidebar />}

      <main className="app-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected/Main Routes */}
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
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
