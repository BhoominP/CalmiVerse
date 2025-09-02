import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Smile,
  BookOpen,
  MessageSquare,
  Calendar,
  AlertCircle,
  Settings,
} from "lucide-react";
import "../styles/components.css";
import CalmiVerseLogo from "../assets/icons/CalmiVerse.svg";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={18} /> },
    { name: "Mood Mirror", path: "/mood-mirror", icon: <Smile size={18} /> },
    { name: "Resources", path: "/resources", icon: <BookOpen size={18} /> },
    { name: "Forum", path: "/forum", icon: <MessageSquare size={18} /> },
    { name: "Consolation", path: "/booking", icon: <Calendar size={18} /> },
    { name: "SOS", path: "/sos", icon: <AlertCircle size={18} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={18} /> },
  ];

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

      {/* === Profile Section === */}
      <div className="sidebar-profile">
        <img
          src="https://i.pravatar.cc/40?img=12" // placeholder avatar
          alt="User Avatar"
          className="profile-avatar"
        />
        <div className="profile-info">
          <span className="profile-name">Student #123</span>
          <span className="profile-role">University Student</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
