import React from "react";
import { Link } from "react-router-dom";
import "../styles/resources.css";

function ResourceCard({ id, title, description, type, image }) {
  return (
    <div className="resource-card">
      <img src={image} alt={title} />
      <div className="resource-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <span className={`badge badge-${type.toLowerCase()}`}>{type}</span>
        <Link to={`/resources/${id}`} className="explore-link">Explore →</Link>
      </div>
    </div>
  );
}

export default ResourceCard;
