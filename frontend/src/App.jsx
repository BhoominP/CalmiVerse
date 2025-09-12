import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import ForumPage from "./pages/ForumPage";
import Booking from "./pages/Booking";
import Resources from "./pages/Resources";
import SOSCircle from "./pages/SOSCircle";
import Settings from "./pages/Settings";
import MoodMirror from "./components/MoodMirror";
import ResourceDetail from "./pages/ResourceDetail";

import PointsTasks from "./components/PointsTasks";
import Toaster from "./components/Toaster";

// Auth + Screening
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Screening from "./pages/Screening"; // <- Combined steps

function AppLayout() {
  const location = useLocation();

  // Hide sidebar + header on signin, signup, screening
  const hideSidebarAndHeader = ["/signin", "/signup", "/screening"].some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="flex h-screen">
      {!hideSidebarAndHeader && <Sidebar />}
      <div className="flex flex-col flex-1">
        {!hideSidebarAndHeader && <Header />}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <Routes>
            {/* Auth */}
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />

            {/* Screening */}
            <Route path="/screening" element={<Screening />} />

            {/* Main App */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/:id" element={<ResourceDetail />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/mood-mirror" element={<MoodMirror />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/sos" element={<SOSCircle />} />
            <Route path="/settings" element={<Settings />} />

            {/* Gamification */}
            <Route path="/tasks" element={<PointsTasks />} />
          </Routes>
        </main>
      </div>

      {/* Global Toasts */}
      <Toaster />
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
