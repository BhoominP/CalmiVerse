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

// Auth + Screening
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Screening from "./pages/Screening"; // <- Combined steps

import { ThemeProvider } from './context/ThemeContext';
import './styles/theme.css';

function AppLayout() {
  const location = useLocation();

  // Hide sidebar on signin, signup, screening
  const hideSidebarAndHeader = ["/signin", "/signup", "/screening"].some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="app-layout">
      {!hideSidebarAndHeader && <Sidebar />}
      <div className="main-content">
        {!hideSidebarAndHeader && <Header />}
        <main className="app-content">
          <Routes>
            {/* Auth */}
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />

            {/* Screening (Step 1 → Step 7) */}
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
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppLayout />
      </Router>
    </ThemeProvider>
  );
}

export default App;
