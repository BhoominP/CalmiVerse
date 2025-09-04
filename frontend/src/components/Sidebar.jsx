import React, { useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Smile,
  BookOpen,
  MessageSquare,
  Calendar,
  AlertCircle,
  Settings,
  LogOut,
} from "lucide-react";
import "../styles/components.css";
import CalmiVerseLogo from "../assets/icons/CalmiVerse.svg";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={18} /> },
    { name: "Resources", path: "/resources", icon: <BookOpen size={18} /> },
    { name: "Forum", path: "/forum", icon: <MessageSquare size={18} /> },
    { name: "Mood Mirror", path: "/mood-mirror", icon: <Smile size={18} /> },
    { name: "Booking", path: "/booking", icon: <Calendar size={18} /> },
    { name: "SOS", path: "/sos", icon: <AlertCircle size={18} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={18} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user"); // clear session
    navigate("/signin"); // redirect to signin
  };

  return (
    <aside className="sidebar">
      {/* === Logo Section === */}
      <div className="sidebar-header">
        <img src={CalmiVerseLogo} alt="CalmiVerse Logo" className="logo-icon" />
        <h1 className="logo-text">CalmiVerse</h1>
      </div>
      <hr className="divider" />

      {/* === Navigation === */}
      <nav className="menu">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`menu-item ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-text">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* === Sign Out Above Avatar === */}
      <div className="signout-section">
        <button className="signout-btn" onClick={handleLogout}>
          <LogOut size={18} /> <span>Sign Out</span>
        </button>
      </div>

      {/* === Profile Section === */}
      <div className="sidebar-profile" ref={profileRef}>
        <img
          src="https://i.pravatar.cc/40?img=12"
          alt="User Avatar"
          className="profile-avatar"
        />
        <div className="profile-info">
          <span className="profile-name">Student #582</span>
          <span className="profile-role">Uni Student</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
